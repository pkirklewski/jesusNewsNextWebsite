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

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    bitcoin: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    ethereum: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    defi: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    regulacje: 'bg-red-500/20 text-red-400 border-red-500/30',
    rynek: 'bg-green-500/20 text-green-400 border-green-500/30',
    nft: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    altcoiny: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    technologia: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    'analiza-wideo': 'bg-red-600/20 text-red-300 border-red-600/30',
    'regulacje-pl': 'bg-red-500/20 text-red-400 border-red-500/30',
    'regulacje-eu': 'bg-red-500/20 text-red-400 border-red-500/30',
    'bezpieczenstwo': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'edukacja': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  }
  return colors[category.toLowerCase()] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    bitcoin: 'Bitcoin',
    ethereum: 'Ethereum',
    defi: 'DeFi',
    regulacje: 'Regulacje',
    rynek: 'Rynek',
    nft: 'NFT',
    altcoiny: 'Altcoiny',
    technologia: 'Technologia',
    wszystko: 'Wszystko',
    'analiza-wideo': 'Analiza Wideo',
    'regulacje-pl': 'Regulacje PL',
    'regulacje-eu': 'Regulacje EU',
    mining: 'Mining',
    'bezpieczenstwo': 'Bezpieczeństwo',
    'edukacja': 'Edukacja',
  }
  return labels[category.toLowerCase()] || category
}
