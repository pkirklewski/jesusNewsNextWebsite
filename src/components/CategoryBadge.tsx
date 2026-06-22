import Link from 'next/link'
import { getCategoryColor, getCategoryLabel } from '@/lib/utils'

interface CategoryBadgeProps {
  category: string
  clickable?: boolean
}

export default function CategoryBadge({
  category,
  clickable = true,
}: CategoryBadgeProps) {
  const colorClass = getCategoryColor(category)
  const label = getCategoryLabel(category)

  const className = `inline-block px-2.5 py-0.5 rounded-md text-xs font-medium border ${colorClass}`

  if (clickable) {
    return (
      <Link href={`/kategoria/${category}`} className={className}>
        {label}
      </Link>
    )
  }

  return <span className={className}>{label}</span>
}
