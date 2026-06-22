import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import ArticleCard from '@/components/ArticleCard'

const ARTICLES_PER_PAGE = 30

export default function HomePage() {
  const allArticles = getAllArticles()
  const articles = allArticles.slice(0, ARTICLES_PER_PAGE)
  const featured = articles[0]
  const secondary = articles.slice(1, 5)
  const sidebar = articles.slice(5, 9)
  const remaining = articles.slice(9)

  if (!featured) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
        <p className="text-sepia font-serif">Brak artykułów do wyświetlenia.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      {/* ============== MASTHEAD / FEATURED ============== */}
      <section className="pt-12 lg:pt-16 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Featured — large article */}
          <article className="lg:col-span-8">
            {/* Eyebrow */}
            <div className="eyebrow mb-5">
              {featured.categories[0] === 'chrzescijanstwo' && 'Chrześcijaństwo'}
              {featured.categories[0] === 'wiadomosci' && 'Wiadomości'}
              {featured.categories[0] === 'usa' && 'Świat'}
              {featured.categories[0] === 'art-design' && 'Kultura'}
              {!['chrzescijanstwo', 'wiadomosci', 'usa', 'art-design'].includes(featured.categories[0]) && 'Artykuł dnia'}
            </div>

            <Link href={`/artykul/${featured.slug}/`} className="block group">
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-semibold text-ink leading-[1.08] tracking-[-0.018em] mb-5 group-hover:text-oxblood transition-colors">
                {featured.title}
              </h1>

              {featured.image && (
                <div className="my-8">
                  <img
                    src={featured.image}
                    alt={featured.image_alt || featured.title}
                    className="w-full aspect-[16/9] object-cover"
                    loading="eager"
                  />
                </div>
              )}

              <p className="font-serif text-xl lg:text-[1.375rem] text-graphite leading-[1.55] mb-5 max-w-3xl">
                {featured.meta_description}
              </p>
            </Link>

            <div className="meta uppercase tracking-[0.08em]">
              {formatDate(featured.date)}
            </div>
          </article>

          {/* Sidebar — 4 secondary articles, list style */}
          <aside className="lg:col-span-4 lg:border-l lg:border-rule lg:pl-10">
            <div className="eyebrow mb-6">Najnowsze</div>
            <div className="space-y-7">
              {sidebar.map((article, i) => (
                <article key={article.slug} className={i > 0 ? 'pt-7 border-t border-rule' : ''}>
                  <Link href={`/artykul/${article.slug}/`} className="group block">
                    <div className="meta uppercase tracking-[0.08em] mb-2">
                      {formatDate(article.date)}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink leading-snug group-hover:text-oxblood transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <hr className="rule" />

      {/* ============== SECONDARY GRID — 4 articles below masthead ============== */}
      <section className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {secondary.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              slug={article.slug}
              date={article.date}
              categories={article.categories}
              image={article.image}
              image_alt={article.image_alt}
              meta_description={article.meta_description}
              variant="grid"
            />
          ))}
        </div>
      </section>

      {/* ============== SOFT CTA — newsletter signup ============== */}
      <section className="py-16 lg:py-24 bg-parchment border-y border-rule -mx-6 lg:-mx-12 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow mb-4">Codzienny newsletter</div>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-ink leading-tight mb-4">
            Słowo Boże — prosto do Twojej skrzynki o&nbsp;7:00 rano.
          </h2>
          <p className="font-serif text-lg text-graphite leading-relaxed max-w-xl mx-auto mb-8">
            Krótki werset, rozważanie, modlitwa i jedna dobra wiadomość ze świata wiary.
            Trzy minuty kawy. Bezpłatnie.
          </p>
          <Link href="/newsletter/" className="btn-primary">
            Zasubskrybuj
          </Link>
        </div>
      </section>

      {/* ============== REMAINING ARTICLES ============== */}
      {remaining.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-ink">
              Wszystkie artykuły
            </h2>
            <div className="hidden md:block flex-1 mx-8 border-t border-rule" />
            <div className="meta uppercase tracking-[0.08em]">
              {remaining.length} {remaining.length === 1 ? 'tekst' : remaining.length < 5 ? 'teksty' : 'tekstów'}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {remaining.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                slug={article.slug}
                date={article.date}
                categories={article.categories}
                image={article.image}
                image_alt={article.image_alt}
                meta_description={article.meta_description}
                variant="grid"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
