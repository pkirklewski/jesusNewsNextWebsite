import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getArticlesByCategory, getCategories } from '@/lib/articles'
import { getCategoryLabel } from '@/lib/utils'
import ArticleCard from '@/components/ArticleCard'
import CategoryFilter from '@/components/CategoryFilter'
import NewsletterSignup from '@/components/NewsletterSignup'

interface CategoryPageProps {
  params: {
    cat: string
  }
}

const validCategories = [
  'bitcoin',
  'ethereum',
  'defi',
  'regulacje',
  'rynek',
  'altcoiny',
  'nft',
  'technologia',
  'analiza-wideo',
  'regulacje-pl',
  'regulacje-eu',
  'mining',
  'bezpieczenstwo',
  'edukacja',
]

export function generateStaticParams() {
  const categories = getCategories()
  // Include both dynamic categories and predefined ones
  const allCategories = new Set([...categories, ...validCategories])
  return Array.from(allCategories).map((cat) => ({
    cat: cat,
  }))
}

export function generateMetadata({ params }: CategoryPageProps) {
  const label = getCategoryLabel(params.cat)
  return {
    title: `${label} - Wiadomości krypto - JesusNews`,
    description: `Najnowsze wiadomości z kategorii ${label}. Śledź najważniejsze informacje ze świata kryptowalut na JesusNews.`,
    alternates: {
      canonical: `/kategoria/${params.cat}/`,
    },
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { cat } = params
  const label = getCategoryLabel(cat)
  const articles = getArticlesByCategory(cat)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-text-secondary hover:text-accent mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Powrót do wiadomości</span>
      </Link>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
          {label}
        </h1>
        <p className="text-text-secondary">
          {articles.length > 0
            ? `${articles.length} ${
                articles.length === 1
                  ? 'artykuł'
                  : articles.length < 5
                  ? 'artykuły'
                  : 'artykułów'
              } w tej kategorii`
            : 'Brak artykułów w tej kategorii'}
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter activeCategory={cat} />

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                slug={article.slug}
                date={article.date}
                categories={article.categories}
                image={article.image}
                image_alt={article.image_alt}
                meta_description={article.meta_description}
              />
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-20 bg-card rounded-xl border border-border">
          <p className="text-text-secondary text-lg mb-4">
            Brak artykułów w kategorii &quot;{label}&quot;.
          </p>
          <Link
            href="/"
            className="text-accent hover:text-accent/80 font-medium"
          >
            Zobacz wszystkie wiadomości
          </Link>
        </div>
      )}

      {/* Newsletter */}
      <section className="mb-12">
        <NewsletterSignup />
      </section>
    </div>
  )
}
