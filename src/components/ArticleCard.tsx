import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface ArticleCardProps {
  title: string
  slug: string
  date: string
  categories: string[]
  image?: string
  image_alt?: string
  meta_description: string
  variant?: 'grid' | 'featured'
  featured?: boolean  // legacy
  eager?: boolean
}

const CAT_LABELS: Record<string, string> = {
  'chrzescijanstwo': 'Chrześcijaństwo',
  'wiadomosci': 'Wiadomości',
  'usa': 'Świat',
  'art-design': 'Kultura',
}

export default function ArticleCard({
  title,
  slug,
  date,
  categories,
  image,
  image_alt,
  meta_description,
  variant = 'grid',
  eager,
}: ArticleCardProps) {
  const primaryCat = categories?.[0] || 'wiadomosci'
  const catLabel = CAT_LABELS[primaryCat] || 'Artykuł'

  return (
    <article className="group flex flex-col h-full">
      <Link href={`/artykul/${slug}/`} className="block">
        {/* Image */}
        {image && (
          <div className="mb-5 overflow-hidden">
            <img
              src={image}
              alt={image_alt || title}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Category eyebrow */}
        <div className="eyebrow mb-3">{catLabel}</div>

        {/* Title */}
        <h2 className="font-display text-[1.5rem] lg:text-[1.625rem] font-semibold text-ink leading-[1.18] tracking-[-0.012em] mb-3 group-hover:text-oxblood transition-colors">
          {title}
        </h2>

        {/* Description */}
        <p className="font-serif text-[15px] text-graphite leading-[1.65] line-clamp-3 mb-4">
          {meta_description}
        </p>
      </Link>

      {/* Date meta */}
      <div className="mt-auto pt-3 border-t border-rule">
        <div className="meta uppercase tracking-[0.08em]">
          {formatDate(date)}
        </div>
      </div>
    </article>
  )
}
