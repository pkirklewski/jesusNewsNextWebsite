import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import { BookOpen, Mail, Heart, Globe, Cross, Newspaper } from 'lucide-react'
import ArticleCard from '@/components/ArticleCard'
import CategoryFilter from '@/components/CategoryFilter'
import NewsletterSignup from '@/components/NewsletterSignup'

const ARTICLES_PER_PAGE = 30

export default function HomePage() {
  const allArticles = getAllArticles()
  const articles = allArticles.slice(0, ARTICLES_PER_PAGE)
  const featuredArticle = articles[0]
  const belowHeroArticles = articles.slice(1, 5)
  const sideArticles = articles.slice(5, 9)
  const remainingArticles = articles.slice(9)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ================== GUIDES SECTION ================== */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/newsletter/"
            className="group bg-parchment border border-oxblood/30 p-3.5 hover:border-oxblood transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-oxblood/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-oxblood" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-semibold text-oxblood group-hover:text-oxblood-hover transition-colors leading-tight">
                  Newsletter
                </h3>
                <p className="font-sans text-[10.5px] text-sepia hidden sm:block leading-tight mt-0.5">
                  Codziennie o 7:00 rano
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/kategoria/chrzescijanstwo/"
            className="group bg-paper border border-rule p-3.5 hover:border-oxblood transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-parchment flex items-center justify-center shrink-0">
                <Cross className="w-4 h-4 text-ink" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-semibold text-ink group-hover:text-oxblood transition-colors leading-tight">
                  Chrześcijaństwo
                </h3>
                <p className="font-sans text-[10.5px] text-sepia hidden sm:block leading-tight mt-0.5">
                  Wiara, teologia, świadectwa
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/kategoria/wiadomosci/"
            className="group bg-paper border border-rule p-3.5 hover:border-oxblood transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-parchment flex items-center justify-center shrink-0">
                <Newspaper className="w-4 h-4 text-ink" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-semibold text-ink group-hover:text-oxblood transition-colors leading-tight">
                  Wiadomości
                </h3>
                <p className="font-sans text-[10.5px] text-sepia hidden sm:block leading-tight mt-0.5">
                  Aktualne wydarzenia
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/kategoria/usa/"
            className="group bg-paper border border-rule p-3.5 hover:border-oxblood transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-parchment flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-ink" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-semibold text-ink group-hover:text-oxblood transition-colors leading-tight">
                  Świat
                </h3>
                <p className="font-sans text-[10.5px] text-sepia hidden sm:block leading-tight mt-0.5">
                  Prześladowania i misje
                </p>
              </div>
            </div>
          </Link>

          <a
            href="https://ulicaswojewie.org.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-paper border border-rule p-3.5 hover:border-oxblood transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-parchment flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-ink" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-semibold text-ink group-hover:text-oxblood transition-colors leading-tight">
                  Wesprzyj USW
                </h3>
                <p className="font-sans text-[10.5px] text-sepia hidden sm:block leading-tight mt-0.5">
                  1,5% podatku · KRS 0000498479
                </p>
              </div>
            </div>
          </a>

          <Link
            href="/o-nas/"
            className="group bg-paper border border-rule p-3.5 hover:border-oxblood transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-parchment flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-ink" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-semibold text-ink group-hover:text-oxblood transition-colors leading-tight">
                  O nas
                </h3>
                <p className="font-sans text-[10.5px] text-sepia hidden sm:block leading-tight mt-0.5">
                  Misja i wartości
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ================== HERO SECTION ================== */}
      {articles.length > 0 && featuredArticle && (
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured + Below */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <ArticleCard
                title={featuredArticle.title}
                slug={featuredArticle.slug}
                date={featuredArticle.date}
                categories={featuredArticle.categories}
                image={featuredArticle.image}
                image_alt={featuredArticle.image_alt}
                meta_description={featuredArticle.meta_description}
                featured={true}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {belowHeroArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    title={article.title}
                    slug={article.slug}
                    date={article.date}
                    categories={article.categories}
                    image={article.image}
                    image_alt={article.image_alt}
                    meta_description={article.meta_description}
                    eager={true}
                  />
                ))}
              </div>

              {/* Foundation Banner — premium editorial style, not loud */}
              <a
                href="https://ulicaswojewie.org.pl/wesprzyj-nas/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-parchment border border-rule hover:border-oxblood transition-colors p-6 lg:p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-oxblood flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-paper" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="eyebrow mb-1.5">Wsparcie</div>
                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-ink leading-snug mb-1.5">
                      Fundacja Ulica Swoje Wie
                    </h3>
                    <p className="font-serif text-[15px] text-graphite leading-relaxed">
                      Przekaż 1,5% podatku — to Cię nic nie kosztuje, a dla nich to konkretna pomoc.
                      <span className="block mt-2 font-sans text-xs uppercase tracking-[0.08em] text-sepia">
                        KRS 0000498479 →
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {sideArticles.map((article, i) => (
                <ArticleCard
                  key={article.slug}
                  title={article.title}
                  slug={article.slug}
                  date={article.date}
                  categories={article.categories}
                  image={article.image}
                  image_alt={article.image_alt}
                  meta_description={article.meta_description}
                  eager={i < 2}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================== CATEGORY FILTER ================== */}
      <CategoryFilter />

      {/* ================== REMAINING ARTICLES GRID ================== */}
      {remainingArticles.length > 0 && (
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingArticles.map((article) => (
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
      )}

      {/* ================== NEWSLETTER SIGNUP ================== */}
      <section className="mb-12">
        <NewsletterSignup />
      </section>

      {/* ================== EMPTY STATE ================== */}
      {articles.length === 0 && (
        <div className="text-center py-20">
          <p className="font-serif text-lg text-sepia">
            Brak artykułów. Wkrótce pojawią się nowe wiadomości.
          </p>
        </div>
      )}
    </div>
  )
}
