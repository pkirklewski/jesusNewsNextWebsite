import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import CategoryBadge from './CategoryBadge'

interface ArticleCardProps {
  title: string
  slug: string
  date: string
  categories: string[]
  image: string
  image_alt?: string
  meta_description: string
  featured?: boolean
  eager?: boolean
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
  const avifSrc = image.replace('.webp', '.avif')

  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={image} type="image/webp" />
      <img
        src={image}
        alt={alt}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
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
}: ArticleCardProps) {
  const altText = image_alt || title

  if (featured) {
    return (
      <Link href={`/artykul/${slug}`} className="block group" role="article">
        <div className="article-card relative rounded-2xl overflow-hidden border border-border hover:border-accent/30 bg-card min-h-[400px] lg:min-h-[500px]">
          {/* Background image */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-blue/5">
            <ArticleImage
              image={image}
              alt={altText}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
            />
            <div className="gradient-overlay absolute inset-0" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <CategoryBadge key={cat} category={cat} clickable={false} />
              ))}
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors leading-tight">
              {title}
            </h2>
            <p className="text-text-secondary text-sm lg:text-base mb-4 line-clamp-2">
              {meta_description}
            </p>
            <time className="text-text-secondary/60 text-sm">
              {formatDate(date)}
            </time>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/artykul/${slug}`} className="block group" role="article">
      <div className="article-card rounded-xl overflow-hidden border border-border hover:border-accent/30 bg-card h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-accent/10 to-accent-blue/10 overflow-hidden">
          <ArticleImage
            image={image}
            alt={altText}
            loading={eager ? 'eager' : 'lazy'}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <CategoryBadge key={cat} category={cat} clickable={false} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="text-text-secondary text-sm mb-3 line-clamp-2 flex-1">
            {meta_description}
          </p>
          <time className="text-text-secondary/60 text-xs">
            {formatDate(date)}
          </time>
        </div>
      </div>
    </Link>
  )
}
