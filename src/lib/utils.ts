const POLISH_MONTHS: Record<number, string> = {
  0: 'stycznia',
  1: 'lutego',
  2: 'marca',
  3: 'kwietnia',
  4: 'maja',
  5: 'czerwca',
  6: 'lipca',
  7: 'sierpnia',
  8: 'września',
  9: 'października',
  10: 'listopada',
  11: 'grudnia',
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = POLISH_MONTHS[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

/**
 * Category color classes — all in oxblood/parchment palette.
 * Consistent restraint per Council guidance ("oszczędnie, dyskretnie").
 * Backgrounds use parchment tints, borders use rule color, text uses oxblood.
 */
export function getCategoryColor(category: string): string {
  // One unified style — premium publication doesn't color-code categories
  // with rainbow palettes. Subtle differentiation via subtle bg shift only.
  const tints: Record<string, string> = {
    'chrzescijanstwo': 'bg-parchment text-oxblood border-rule',
    'wiadomosci':      'bg-parchment text-ink border-rule',
    'usa':             'bg-parchment text-ink border-rule',
    'art-design':      'bg-parchment text-forest border-rule',
  }
  return tints[category.toLowerCase()] || 'bg-parchment text-sepia border-rule'
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'chrzescijanstwo': 'Chrześcijaństwo',
    'wiadomosci':      'Wiadomości',
    'usa':             'Świat',
    'art-design':      'Kultura',
    'wszystko':        'Wszystko',
  }
  return labels[category.toLowerCase()] || category
}
