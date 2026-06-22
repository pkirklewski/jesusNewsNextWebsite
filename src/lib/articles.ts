import fs from 'fs'
import path from 'path'

export interface Article {
  title: string
  slug: string
  date: string
  categories: string[]
  meta_description: string
  content: string
  image: string
  image_alt?: string
  tldr?: string[]
  youtube_url?: string
  analyst_name?: string
  source_url: string
  source_name: string
  hidden?: boolean
}

const articlesDirectory = path.join(process.cwd(), 'content', 'articles')

export function getAllArticles(includeHidden: boolean = false): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(articlesDirectory)
  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const article: Article = JSON.parse(fileContents)
      return article
    })
    .filter((article) => includeHidden || !article.hidden)

  // Sort by date descending
  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return articles
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles(true)
  return articles.find((article) => article.slug === slug) || null
}

export function getArticlesByCategory(category: string): Article[] {
  const articles = getAllArticles()
  const cat = category.toLowerCase()

  // "regulacje" is a parent category that includes both regulacje-pl and regulacje-eu
  if (cat === 'regulacje') {
    return articles.filter((article) =>
      article.categories.some((c) => c === 'regulacje' || c === 'regulacje-pl' || c === 'regulacje-eu')
    )
  }

  return articles.filter((article) =>
    article.categories.includes(cat)
  )
}

export function getCategories(): string[] {
  const articles = getAllArticles()
  const categorySet = new Set<string>()
  articles.forEach((article) => {
    article.categories.forEach((cat) => categorySet.add(cat))
  })
  return Array.from(categorySet).sort()
}

export function getRelatedArticles(
  currentSlug: string,
  categories: string[],
  limit: number = 4
): Article[] {
  const articles = getAllArticles()
  const related = articles
    .filter(
      (article) =>
        article.slug !== currentSlug &&
        article.categories.some((cat) => categories.includes(cat))
    )
    .slice(0, limit)

  // If not enough related articles, fill with recent ones
  if (related.length < limit) {
    const remaining = articles
      .filter(
        (article) =>
          article.slug !== currentSlug &&
          !related.some((r) => r.slug === article.slug)
      )
      .slice(0, limit - related.length)
    related.push(...remaining)
  }

  return related.slice(0, limit)
}
