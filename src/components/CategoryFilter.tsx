import Link from 'next/link'

const categories = [
  { slug: 'wszystko',        label: 'Wszystko',        href: '/' },
  { slug: 'chrzescijanstwo', label: 'Chrześcijaństwo', href: '/kategoria/chrzescijanstwo/' },
  { slug: 'wiadomosci',      label: 'Wiadomości',      href: '/kategoria/wiadomosci/' },
  { slug: 'usa',             label: 'Świat',           href: '/kategoria/usa/' },
  { slug: 'art-design',      label: 'Kultura',         href: '/kategoria/art-design/' },
]

interface CategoryFilterProps {
  activeCategory?: string
}

export default function CategoryFilter({
  activeCategory = 'wszystko',
}: CategoryFilterProps) {
  return (
    <section className="mb-10">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug
          return (
            <Link
              key={cat.slug}
              href={cat.href}
              className={`px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] font-semibold border transition-colors ${
                isActive
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-graphite border-rule hover:border-oxblood hover:text-oxblood'
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
