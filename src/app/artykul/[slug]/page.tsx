import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/articles'
import { formatDate } from '@/lib/utils'

import CategoryBadge from '@/components/CategoryBadge'
import ShareButtons from '@/components/ShareButtons'
import ArticleCard from '@/components/ArticleCard'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  const articles = getAllArticles(true)
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export function generateMetadata({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)
  if (!article) {
    return { title: 'Artykuł nie znaleziony - JesusNews' }
  }

  return {
    title: `${article.title} - JesusNews`,
    description: article.meta_description,
    alternates: {
      canonical: `/artykul/${article.slug}/`,
    },
    openGraph: {
      title: article.title,
      description: article.meta_description,
      type: 'article',
      url: `https://jesusnews.pl/artykul/${article.slug}/`,
      locale: 'pl_PL',
      siteName: 'JesusNews',
      publishedTime: article.date,
      authors: ['https://jesusnews.pl/o-nas'],
      images: article.image
        ? [
            {
              url: article.image.replace('.webp', '.jpg'),
              width: 1200,
              height: 675,
              alt: article.image_alt || article.meta_description,
              type: 'image/jpeg',
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: article.title,
      description: article.meta_description,
      images: article.image ? [article.image.replace('.webp', '.jpg')] : [],
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(
    article.slug,
    article.categories,
    4
  )

  const articleUrl = `https://jesusnews.pl/artykul/${article.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.meta_description,
    image: article.image
      ? `https://jesusnews.pl${article.image}`
      : undefined,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'Kirk Peter Johanson',
      jobTitle: 'Redaktor',
      url: 'https://jesusnews.pl/o-nas',
    },
    publisher: {
      '@type': 'Organization',
      name: 'JesusNews',
      url: 'https://jesusnews.pl',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    inLanguage: 'pl',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Strona główna',
        item: 'https://jesusnews.pl',
      },
      ...(article.categories.length > 0
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: article.categories[0],
              item: `https://jesusnews.pl/kategoria/${article.categories[0]}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: article.categories.length > 0 ? 3 : 2,
        name: article.title,
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-text-secondary hover:text-accent mb-8 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Powrót do wiadomości</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <article className="lg:col-span-3">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.map((cat) => (
                <CategoryBadge key={cat} category={cat} />
              ))}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-text-secondary text-lg mb-6">
              {article.meta_description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span className="flex items-center space-x-1.5">
                  <User className="w-4 h-4" />
                  <span>Kirk Peter Johanson</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </span>
              </div>

              <ShareButtons url={articleUrl} title={article.title} />
            </div>
          </header>

          {/* Article Image or YouTube Video (video articles show embed instead of thumbnail) */}
          {article.youtube_url ? (
            <div className="rounded-xl overflow-hidden mb-8 aspect-video">
              <iframe
                src={article.youtube_url.replace('watch?v=', 'embed/').replace('youtube.com', 'youtube-nocookie.com')}
                title={article.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          ) : article.image ? (
            <div className="rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-accent/10 to-accent-blue/10">
              <picture>
                <source srcSet={article.image.replace('.webp', '.avif')} type="image/avif" />
                <source srcSet={article.image} type="image/webp" />
                <img
                  src={article.image}
                  alt={article.image_alt || article.title}
                  loading="eager"
                  decoding="async"
                  className="w-full aspect-video object-cover"
                />
              </picture>
            </div>
          ) : null}

          {/* TL;DR Summary */}
          {article.tldr && article.tldr.length > 0 && (
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8">
              <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                W skrócie
              </h2>
              <ul className="space-y-2">
                {article.tldr.map((point, i) => (
                  <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                    <span className="text-accent mt-0.5 shrink-0">&#8226;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Content (with glossary term tooltips) */}
          <div
            className="article-content max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Foundation Banner */}
          <div className="my-8">
            <a
              href="https://ulicaswojewie.org.pl/wesprzyj-nas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture>
                <source srcSet="/static/banner-usw-v3.avif" type="image/avif" />
                <source srcSet="/static/banner-usw-v3.webp" type="image/webp" />
                <img
                  src="/static/banner-usw-v3.webp"
                  alt="Fundacja Ulica Swojewie - Wesprzyj nas 1,5%"
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-xl hover:opacity-90 transition-opacity"
                />
              </picture>
            </a>
          </div>

          {/* Share buttons at bottom */}
          <div className="mt-8 pt-6 border-t border-border">
            <ShareButtons url={articleUrl} title={article.title} />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-lg font-bold text-text-primary mb-4 pb-2 border-b border-border">
              Powiązane artykuły
            </h3>
            <div className="space-y-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/artykul/${related.slug}`}
                  className="block group"
                >
                  <div className="bg-card border border-border rounded-lg p-3 hover:border-accent/30 transition-all">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {related.categories.slice(0, 2).map((cat) => (
                        <CategoryBadge
                          key={cat}
                          category={cat}
                          clickable={false}
                        />
                      ))}
                    </div>
                    <h4 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                      {related.title}
                    </h4>
                    <time className="text-xs text-text-secondary/60 mt-1 block">
                      {formatDate(related.date)}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Related articles grid (bottom) */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Więcej wiadomości
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedArticles.map((related) => (
              <ArticleCard
                key={related.slug}
                title={related.title}
                slug={related.slug}
                date={related.date}
                categories={related.categories}
                image={related.image}
                meta_description={related.meta_description}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
