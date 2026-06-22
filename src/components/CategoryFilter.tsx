import Link from 'next/link'

const categories = [
  { slug: 'wszystko', label: 'Wszystko', href: '/' },
  { slug: 'bitcoin', label: 'Bitcoin', href: '/kategoria/bitcoin' },
  { slug: 'ethereum', label: 'Ethereum', href: '/kategoria/ethereum' },
  { slug: 'defi', label: 'DeFi', href: '/kategoria/defi' },
  { slug: 'regulacje', label: 'Regulacje', href: '/kategoria/regulacje' },
  { slug: 'rynek', label: 'Rynek', href: '/kategoria/rynek' },
  { slug: 'analiza-wideo', label: 'Analiza Wideo', href: '/kategoria/analiza-wideo' },
  { slug: 'bezpieczenstwo', label: 'Bezpieczeństwo', href: '/kategoria/bezpieczenstwo' },
  { slug: 'edukacja', label: 'Edukacja', href: '/kategoria/edukacja' },
]

interface CategoryFilterProps {
  activeCategory?: string
}

export default function CategoryFilter({
  activeCategory = 'wszystko',
}: CategoryFilterProps) {
  return (
    <section className="mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug
          return (
            <Link
              key={cat.slug}
              href={cat.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                isActive
                  ? 'bg-accent text-background border-accent'
                  : 'bg-card text-text-secondary border-border hover:border-accent/30 hover:text-text-primary'
              }`}
            >
              {cat.label}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
