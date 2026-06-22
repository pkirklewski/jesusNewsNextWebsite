import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white/90 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + mission */}
          <div>
            <div className="text-2xl font-bold tracking-tight mb-3">
              <span className="text-white">JESUSNEWS</span>
              <span className="text-accent-gold-warm">.PL</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Codzienne wiadomości chrześcijańskie z perspektywy Słowa Bożego.
              Newsletter o 7:00 rano. Bezpłatnie.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-accent-gold-warm mb-3 uppercase tracking-wider">
              Linki
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-accent-gold-warm transition-colors">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/newsletter/" className="hover:text-accent-gold-warm transition-colors">
                  Zasubskrybuj newsletter
                </Link>
              </li>
              <li>
                <Link href="/o-nas/" className="hover:text-accent-gold-warm transition-colors">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/polityka-prywatnosci/" className="hover:text-accent-gold-warm transition-colors">
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link href="/regulamin/" className="hover:text-accent-gold-warm transition-colors">
                  Regulamin
                </Link>
              </li>
            </ul>
          </div>

          {/* Wesprzyj nas */}
          <div>
            <h3 className="text-sm font-semibold text-accent-gold-warm mb-3 uppercase tracking-wider flex items-center gap-1">
              <Heart className="w-4 h-4" /> Wspieramy
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-3">
              Fundacja <span className="font-semibold">Ulica Swoje Wie</span><br />
              KRS 0000498479
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Przekaż 1,5% podatku — to Cię nic nie kosztuje,
              a dla nich to konkretna pomoc.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/60">
          © {new Date().getFullYear()} JesusNews.pl · Pismo Święte jest najwyższym autorytetem
        </div>
      </div>
    </footer>
  )
}
