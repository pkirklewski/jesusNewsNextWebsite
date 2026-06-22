import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-parchment border-t border-rule mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand + mission */}
          <div className="md:col-span-5">
            <div className="font-display text-2xl font-bold text-ink leading-tight">
              JesusNews<span className="text-oxblood">.pl</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-sepia mt-1 font-sans">
              Codzienna publikacja chrześcijańska
            </div>
            <hr className="rule-thick mt-6 mb-6" />
            <p className="font-serif text-base text-graphite leading-relaxed max-w-md">
              Codzienne rozważanie Słowa Bożego — krótki werset, refleksja, modlitwa,
              jedna dobra wiadomość ze świata wiary. Bezpłatnie, o 7:00 rano.
            </p>
            <Link href="/newsletter/" className="btn-ghost mt-6">
              Zasubskrybuj newsletter
            </Link>
          </div>

          {/* Linki */}
          <div className="md:col-span-3">
            <h3 className="eyebrow mb-4">Strona</h3>
            <ul className="space-y-2.5 font-sans text-[0.9375rem] text-graphite">
              <li><Link href="/" className="hover:text-oxblood">Strona główna</Link></li>
              <li><Link href="/kategoria/chrzescijanstwo/" className="hover:text-oxblood">Chrześcijaństwo</Link></li>
              <li><Link href="/kategoria/wiadomosci/" className="hover:text-oxblood">Wiadomości</Link></li>
              <li><Link href="/kategoria/usa/" className="hover:text-oxblood">Świat</Link></li>
              <li><Link href="/newsletter/" className="hover:text-oxblood">Newsletter</Link></li>
              <li><Link href="/o-nas/" className="hover:text-oxblood">O nas</Link></li>
              <li><Link href="/polityka-prywatnosci/" className="hover:text-oxblood">Polityka prywatności</Link></li>
              <li><Link href="/regulamin/" className="hover:text-oxblood">Regulamin</Link></li>
            </ul>
          </div>

          {/* Wesprzyj */}
          <div className="md:col-span-4">
            <h3 className="eyebrow mb-4">Wspieramy</h3>
            <p className="font-display text-xl font-semibold text-ink leading-snug mb-2">
              Fundacja Ulica Swoje Wie
            </p>
            <p className="meta mb-4 normal-case tracking-normal">
              KRS 0000498479
            </p>
            <p className="font-serif text-[0.9375rem] text-graphite leading-relaxed">
              Przekaż 1,5% podatku — to Cię nic nie kosztuje,
              a dla nich to konkretna pomoc.
            </p>
          </div>
        </div>

        <hr className="rule mt-12 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-sepia font-sans">
          <div>© {new Date().getFullYear()} JesusNews.pl</div>
          <div className="italic font-serif text-[13px]">
            Pismo Święte jest najwyższym autorytetem
          </div>
        </div>
      </div>
    </footer>
  )
}
