import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import { Mail, BookOpen, Heart } from 'lucide-react'
import ArticleCard from '@/components/ArticleCard'

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
      {/* Hero — newsletter signup CTA */}
      <section className="mb-10 bg-navy text-white rounded-2xl p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-accent-gold-warm/20 text-accent-gold-warm px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
              ✨ Newsletter codziennie o 7:00
            </div>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Codzienne rozważanie Słowa Bożego — prosto do skrzynki.
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Krótki werset, refleksja, modlitwa, jedna dobra wiadomość ze świata wiary.
              Wszystko w 3 minuty kawy. Bezpłatnie.
            </p>
            <Link
              href="/newsletter/"
              className="inline-flex items-center gap-2 bg-accent-gold-warm hover:bg-accent text-navy font-bold px-6 py-3 rounded-lg text-base transition-colors"
            >
              <Mail className="w-5 h-5" /> Zasubskrybuj newsletter
            </Link>
          </div>
          <div className="hidden lg:block text-center text-white/30 text-9xl font-serif leading-none">
            &ldquo;
          </div>
        </div>
      </section>

      {/* Hero Articles */}
      {articles.length > 0 && (
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured + below */}
            {featuredArticle && (
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
              </div>
            )}

            {/* Side */}
            <div className="flex flex-col gap-4">
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

      {/* Remaining articles grid */}
      {remainingArticles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-serif text-navy mb-6 pb-3 border-b-2 border-accent">
            Więcej wiadomości
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* About section */}
      <section className="bg-card border border-border rounded-2xl p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-navy mb-3">
              O JesusNews
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Codzienne wiadomości chrześcijańskie z perspektywy Słowa Bożego.
              Niezależny portal informacyjny pisany przez polskich chrześcijan
              dla polskich chrześcijan. Bez polemiki konfesyjnej. Bez sensacji.
              Tylko to, co naprawdę warto wiedzieć.
            </p>
            <Link
              href="/o-nas/"
              className="text-accent font-semibold hover:underline"
            >
              Dowiedz się więcej o naszej misji →
            </Link>
          </div>
          <div className="bg-ivory border border-border rounded-xl p-6">
            <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 flex items-center gap-1">
              <Heart className="w-4 h-4" /> Wspieramy
            </div>
            <p className="font-serif text-lg text-navy mb-2">
              Fundacja Ulica Swoje Wie
            </p>
            <p className="text-sm text-text-secondary mb-4">
              KRS 0000498479 · Przekaż 1,5% podatku — to Cię nic nie kosztuje,
              a dla nich to konkretna pomoc.
            </p>
            <a
              href="https://ulicaswojewie.org.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Poznaj fundację →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
