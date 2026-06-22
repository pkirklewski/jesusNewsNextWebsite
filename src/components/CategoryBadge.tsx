import Link from 'next/link'
import { getCategoryLabel } from '@/lib/utils'

interface CategoryBadgeProps {
  category: string
  clickable?: boolean
}

export default function CategoryBadge({
  category,
  clickable = true,
}: CategoryBadgeProps) {
  const label = getCategoryLabel(category)
  // Premium editorial: small uppercase eyebrow, no colorful badges
  // Just oxblood text with subtle tracking — like NYT/Atlantic
  const className =
    'inline-block font-sans text-[10.5px] font-semibold uppercase tracking-[0.12em] text-oxblood'

  if (clickable) {
    return (
      <Link
        href={`/kategoria/${category}/`}
        className={className + ' hover:underline'}
      >
        {label}
      </Link>
    )
  }

  return <span className={className}>{label}</span>
}
