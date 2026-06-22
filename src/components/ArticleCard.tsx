import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import CategoryBadge from './CategoryBadge'

interface ArticleCardProps {
  title: string
  slug: string
  date: string
  categories: string[]
  image?: string
  image_alt?: string
  meta_description: string
  featured?: boolean
  eager?: boolean
  variant?: 'grid' | 'featured'  // legacy compat
}

function ArticleImage({
  image,
  alt,
  loading = 'lazy',
  className,
}: {
  image: string
  alt: string
  loading?: 'eager' | 'lazy'
  className?: string
}) {
  // We only have .jpg from migration — no .webp/.avif yet, so keep it simple
  return (
    <img
      src={image}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
    />
  )
}

export default function ArticleCard({
  title,
  slug,
  date,
  categories,
  image,
  image_alt,
  meta_description,
  featured = false,
  eager = false,
  variant,
}: ArticleCardProps) {
  const altText = image_alt || title
  const isFeatured = featured || variant === 'featured'

  // ===== FEATURED — big overlay card with background image =====
  if (isFeatured) {
    return (
      <Link
        href={`/artykul/${slug}/`}
        className="block group editorial-card"
        role="article"
      >
        <div className="relative overflow-hidden min-h-[460px] lg:min-h-[540px] bg-parchment">
          {/* Background image full-bleed */}
          {image && (
            <div className="absolute inset-0">
              <ArticleImage
                image={image}
                alt={altText}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Dark gradient overlay — paper ↑ ink ↓ for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(28,28,30,0) 0%, rgba(28,28,30,0.35) 55%, rgba(28,28,30,0.92) 100%)',
                }}
              />
            </div>
          )}

          {/* Content over image */}
          <div className="relative h-full flex flex-col justify-end p-8 lg:p-10 min-h-[460px] lg:min-h-[540px]">
            <div className="flex flex-wrap gap-3 mb-4">
              {categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-paper bg-oxblood px-2.5 py-1"
                >
                  {cat === 'chrzescijanstwo' && 'Chrześcijaństwo'}
                  {cat === 'wiadomosci' && 'Wiadomości'}
                  {cat === 'usa' && 'Świat'}
                  {cat === 'art-design' && 'Kultura'}
                </span>
              ))}
            </div>
            <h2 className="font-display text-3xl lg:text-5xl font-semibold text-paper leading-[1.08] tracking-[-0.018em] mb-4 group-hover:text-paper transition-colors">
              {title}
            </h2>
            <p className="font-serif text-base lg:text-lg text-paper/90 leading-snug mb-4 line-clamp-3 max-w-2xl">
              {meta_description}
            </p>
            <time className="font-sans text-xs uppercase tracking-[0.1em] text-paper/70">
              {formatDate(date)}
            </time>
          </div>
        </div>
      </Link>
    )
  }

  // ===== REGULAR GRID CARD — image top, content bottom =====
  return (
    <Link
      href={`/artykul/${slug}/`}
      className="group editorial-card flex flex-col h-full"
      role="article"
    >
      {/* Image */}
      {image && (
        <div className="relative overflow-hidden bg-parchment aspect-[16/10]">
          <ArticleImage
            image={image}
            alt={altText}
            loading={eager ? 'eager' : 'lazy'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 lg:p-6 flex flex-col flex-1">
        <div className="mb-2">
          <CategoryBadge category={categories[0] || 'wiadomosci'} clickable={false} />
        </div>
        <h3 className="font-display text-xl lg:text-[1.375rem] font-semibold text-ink leading-[1.2] tracking-[-0.012em] mb-3 group-hover:text-oxblood transition-colors line-clamp-3">
          {title}
        </h3>
        <p className="font-serif text-[15px] text-graphite leading-[1.6] mb-4 line-clamp-3 flex-1">
          {meta_description}
        </p>
        <time className="font-sans text-xs uppercase tracking-[0.08em] text-sepia mt-auto pt-3 border-t border-rule">
          {formatDate(date)}
        </time>
      </div>
    </Link>
  )
}
