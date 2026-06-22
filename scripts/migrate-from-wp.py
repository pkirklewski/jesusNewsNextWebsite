#!/usr/bin/env python3
"""
Migrate articles from WordPress (jesusnews.pl) to Next.js JSON format.

For each WP post:
  - Fetch full data via WP REST API (admin credentials)
  - Convert HTML content (cleanup, strip wpautop artifacts)
  - Download featured image, save to public/images/{slug}.jpg
  - Build article JSON matching kryptopuls schema
  - Save to content/articles/{date}-{slug}.json

Usage:
  python3 migrate-from-wp.py --limit 30          # 30 latest
  python3 migrate-from-wp.py --limit 30 --skip-images   # text only (faster)
  python3 migrate-from-wp.py --post-id 17394    # specific post
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

import requests
from requests.auth import HTTPBasicAuth

WP_API = "https://www.jesusnews.pl/wp-json/wp/v2"
AUTH = HTTPBasicAuth("admin2339", "da4z z07V TOcO sYUf Evt3 EoTm")

REPO_ROOT = Path(__file__).parent.parent
ARTICLES_DIR = REPO_ROOT / "content" / "articles"
IMAGES_DIR = REPO_ROOT / "public" / "images"


def slug_from_title(title: str) -> str:
    pl_map = {
        'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
        'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
        'Ą': 'a', 'Ć': 'c', 'Ę': 'e', 'Ł': 'l', 'Ń': 'n',
        'Ó': 'o', 'Ś': 's', 'Ź': 'z', 'Ż': 'z',
    }
    s = title.lower()
    for pl, en in pl_map.items():
        s = s.replace(pl, en)
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'\s+', '-', s)
    s = re.sub(r'-+', '-', s)
    return s.strip('-')[:80]


def map_wp_categories_to_strings(cat_ids: list) -> list:
    """Convert WP category IDs to string slugs for our schema."""
    mapping = {1: "wiadomosci", 109: "chrzescijanstwo", 57: "usa", 32: "art-design"}
    return [mapping.get(c) for c in cat_ids if c in mapping] or ["wiadomosci"]


def clean_html(html: str) -> str:
    """Light cleanup of WP HTML content."""
    if not html:
        return ""
    # Strip <body>, <div class="container">, <p class="description"> wrapper artifacts
    html = re.sub(r'<body[^>]*>', '', html, flags=re.I)
    html = re.sub(r'</body>', '', html, flags=re.I)
    html = re.sub(r'<div class="container">', '', html)
    html = re.sub(r'<div class="article-content">', '', html)
    html = re.sub(r'<div class="original-link">.*?</div>', '', html, flags=re.DOTALL)
    # Remove last </div></div> from container/article-content close
    html = re.sub(r'</div>\s*</div>\s*$', '', html.strip(), flags=re.MULTILINE)
    # Strip word-count comments
    html = re.sub(r'\(Word count: \d+\)', '', html)
    # Normalize multiple newlines
    html = re.sub(r'\n{3,}', '\n\n', html)
    return html.strip()


def download_image(url: str, slug: str, skip_images: bool = False) -> str:
    """Download image from WP, save to public/images/{slug}.jpg. Returns relative path."""
    if skip_images:
        return f"/images/{slug}.jpg"
    if not url:
        return ""
    try:
        r = requests.get(url, timeout=30, stream=True)
        if r.status_code != 200:
            print(f"  [WARN] Image download HTTP {r.status_code}: {url}")
            return ""
        IMAGES_DIR.mkdir(parents=True, exist_ok=True)
        # Save based on URL extension, but prefer .jpg for consistency
        ext = url.split('.')[-1].lower()
        if ext not in ('jpg', 'jpeg', 'webp', 'png'):
            ext = 'jpg'
        out_path = IMAGES_DIR / f"{slug}.{ext}"
        with open(out_path, "wb") as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)
        size_kb = out_path.stat().st_size / 1024
        print(f"  [IMG] {out_path.name} ({size_kb:.0f} KB)")
        return f"/images/{slug}.{ext}"
    except Exception as e:
        print(f"  [WARN] Image download exception: {e}")
        return ""


def fetch_media_url(media_id: int) -> str:
    """Get source_url of a WP media item."""
    if not media_id:
        return ""
    try:
        r = requests.get(f"{WP_API}/media/{media_id}", auth=AUTH, timeout=15)
        if r.status_code == 200:
            return r.json().get("source_url", "")
    except Exception:
        pass
    return ""


def fetch_yoast_meta(post: dict) -> dict:
    """Extract Yoast meta from post if available (in 'meta' or yoast_head_json field)."""
    yoast = {}
    meta = post.get("meta") or {}
    if isinstance(meta, dict):
        yoast["meta_description"] = meta.get("_yoast_wpseo_metadesc", "")
        yoast["og_title"] = meta.get("_yoast_wpseo_opengraph-title", "")
        yoast["og_description"] = meta.get("_yoast_wpseo_opengraph-description", "")
    return yoast


def migrate_post(post: dict, skip_images: bool = False) -> dict | None:
    """Convert one WP post to Next.js article JSON."""
    post_id = post["id"]
    title_raw = post.get("title", {}).get("rendered", "") or ""
    # Strip HTML entities + tags from title
    title_raw = re.sub(r'<[^>]+>', '', title_raw)
    title_raw = (title_raw
                 .replace('&#8222;', '„').replace('&#8221;', '"')
                 .replace('&#8220;', '"').replace('&#8211;', '–')
                 .replace('&#8212;', '—').replace('&#8230;', '…')
                 .replace('&amp;', '&').replace('&quot;', '"')
                 .replace('&#039;', "'"))
    if not title_raw:
        print(f"[SKIP] Post {post_id}: empty title")
        return None

    slug = post.get("slug") or slug_from_title(title_raw)
    date = post.get("date", "") or datetime.utcnow().isoformat()
    date_ymd = date[:10]  # YYYY-MM-DD

    content_html = (post.get("content", {}).get("rendered", "")
                    or post.get("content", {}).get("raw", ""))
    content_clean = clean_html(content_html)

    excerpt_html = post.get("excerpt", {}).get("rendered", "")
    excerpt_text = re.sub(r'<[^>]+>', '', excerpt_html).strip()
    excerpt_text = re.sub(r'Czytaj dalej.*$', '', excerpt_text, flags=re.IGNORECASE).strip()

    # Categories
    cat_ids = post.get("categories", [1])
    categories = map_wp_categories_to_strings(cat_ids)

    # Featured image
    media_id = post.get("featured_media", 0)
    image_path = ""
    image_alt = ""
    if media_id:
        media_url = fetch_media_url(media_id)
        if media_url:
            image_path = download_image(media_url, slug, skip_images=skip_images)
            # Fetch alt text
            try:
                m = requests.get(f"{WP_API}/media/{media_id}", auth=AUTH, timeout=10).json()
                image_alt = m.get("alt_text", "") or title_raw
            except Exception:
                image_alt = title_raw

    # Yoast meta
    yoast = fetch_yoast_meta(post)
    meta_description = (yoast.get("meta_description") or excerpt_text
                        or content_clean[:160].strip())
    meta_description = re.sub(r'<[^>]+>', '', meta_description)[:200]

    article = {
        "title": title_raw,
        "slug": slug,
        "date": date,
        "categories": categories,
        "meta_description": meta_description,
        "content": content_clean,
        "image": image_path,
        "image_alt": image_alt,
        "tldr": [],
        "author": "Kirk Peter Johanson",
        "source_url": post.get("link", ""),
        "source_name": "jesusnews.pl (WP migration)",
        "_wp_id": post_id,
        "_migrated_at": datetime.utcnow().isoformat() + "Z",
    }
    return article


def save_article(article: dict):
    ARTICLES_DIR.mkdir(parents=True, exist_ok=True)
    date_ymd = article["date"][:10]
    slug = article["slug"]
    out_path = ARTICLES_DIR / f"{date_ymd}-{slug}.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(article, f, ensure_ascii=False, indent=2)
    print(f"  [SAVE] {out_path.name}")


def fetch_posts(limit: int = 30, post_id: int = None) -> list:
    """Fetch posts from WP REST API."""
    posts = []
    if post_id:
        r = requests.get(f"{WP_API}/posts/{post_id}", params={"context": "edit"},
                         auth=AUTH, timeout=30)
        if r.status_code == 200:
            posts = [r.json()]
        return posts

    # Fetch latest published posts (most recent first)
    per_page = min(limit, 100)
    page = 1
    while len(posts) < limit:
        r = requests.get(
            f"{WP_API}/posts",
            params={
                "status": "publish",
                "per_page": per_page,
                "page": page,
                "orderby": "date",
                "order": "desc",
                "context": "edit",
            },
            auth=AUTH,
            timeout=30,
        )
        if r.status_code != 200:
            print(f"[ERROR] Fetch HTTP {r.status_code}: {r.text[:200]}")
            break
        batch = r.json()
        if not batch:
            break
        posts.extend(batch)
        if len(batch) < per_page:
            break
        page += 1
    return posts[:limit]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=30,
                        help="How many latest posts to migrate (default 30)")
    parser.add_argument("--post-id", type=int, help="Migrate specific WP post ID")
    parser.add_argument("--skip-images", action="store_true",
                        help="Don't download images (text-only migration)")
    args = parser.parse_args()

    print(f"=== Migrating {args.limit if not args.post_id else 1} post(s) from jesusnews.pl ===\n")
    print(f"Target dir: {ARTICLES_DIR}")
    print(f"Images dir: {IMAGES_DIR}")
    print(f"Skip images: {args.skip_images}\n")

    posts = fetch_posts(limit=args.limit, post_id=args.post_id)
    print(f"Fetched {len(posts)} posts from WP\n")

    success = 0
    skipped = 0
    for i, post in enumerate(posts, 1):
        title = post.get("title", {}).get("rendered", "?")[:60]
        print(f"\n[{i}/{len(posts)}] WP id={post['id']}: {title}")
        try:
            article = migrate_post(post, skip_images=args.skip_images)
            if article:
                save_article(article)
                success += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"  [ERROR] {e}")
            skipped += 1

    print(f"\n{'='*60}")
    print(f"DONE: {success} migrated, {skipped} skipped")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
