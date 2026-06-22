# JesusNews Next.js POC

Proof-of-concept migration of [jesusnews.pl](https://jesusnews.pl) from WordPress to Next.js static site, mirroring the [kryptopuls.pl](https://kryptopuls.pl) tech stack.

## Stack

- **Next.js 14** (App Router, static export)
- **Cloudflare Pages** (deployment, free tier)
- **Tailwind CSS** (warm navy/gold palette matching newsletter v5 branding)
- **Content**: JSON files in `content/articles/`
- **Images**: static assets in `public/images/`

## Quick start

```bash
npm install
npm run dev    # local dev server on http://localhost:3000
npm run build  # static export to ./out
```

## Content migration

The script `scripts/migrate-from-wp.py` reads articles from `jesusnews.pl` WordPress REST API and converts them to Next.js JSON format:

```bash
python3 scripts/migrate-from-wp.py --limit 30          # 30 latest
python3 scripts/migrate-from-wp.py --post-id 17394    # specific post
python3 scripts/migrate-from-wp.py --skip-images       # text only (faster)
```

Currently 30 articles migrated (latest from production WP).

## Branding

Palette (matches newsletter v5):
- `navy` `#17233A` — primary text, header background
- `accent-gold-warm` `#D6B25E` — accent (headlines on navy)
- `accent` `#b8923e` — body accents, gold links
- `background` `#f5f1ea` — warm cream page background
- `ivory` `#fbf6ec` — soft section backgrounds

Typography: Inter (sans, UI) + Georgia (serif, article body)

## Architecture

```
/
├── content/articles/        # JSON per article (read at build time)
├── public/images/           # Static images served as /images/{slug}.jpg
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Homepage (featured + grid of 30)
│   │   ├── artykul/[slug]/page.tsx   # Single article (SSG)
│   │   ├── kategoria/[cat]/page.tsx  # Category listing
│   │   ├── newsletter/page.tsx       # Subscribe form
│   │   ├── o-nas/                    # About
│   │   ├── polityka-prywatnosci/
│   │   └── regulamin/
│   ├── components/
│   │   ├── Header.tsx               # Navy nav with categories
│   │   ├── Footer.tsx               # USW foundation mention
│   │   ├── ArticleCard.tsx          # Article tile (hero + grid)
│   │   ├── CategoryBadge.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── NewsletterSignup.tsx
│   │   └── NewsletterSlideIn.tsx    # Sticky bottom CTA
│   └── lib/
│       ├── articles.ts              # getAllArticles, getArticleBySlug, etc.
│       └── utils.ts                 # formatDate
└── scripts/
    ├── migrate-from-wp.py           # WP → JSON migration
    └── generate-sitemap.mjs         # Auto-generated on build
```

## Cloudflare Pages setup

1. Connect repo to Cloudflare Pages
2. Build command: `npm run build && npm run export`
3. Build output: `out`
4. Environment variables: none required (yet)
5. Custom domain: `test.jesusnews.pl` (CNAME to `<project>.pages.dev`)

## Status

- ✅ 30 articles migrated from production WP
- ✅ Build passes (Next.js 14 static export)
- ✅ Sitemap auto-generated
- ✅ All pages prerendered (no SSR needed)
- ⏳ Cloudflare Pages deploy (manual step by Piotr)
- ⏳ Custom domain test.jesusnews.pl (DNS in OVH)
