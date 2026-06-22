'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const categories = [
  { slug: 'chrzescijanstwo', label: 'Chrześcijaństwo' },
  { slug: 'wiadomosci', label: 'Wiadomości' },
  { slug: 'usa', label: 'Świat' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-rule">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo — Cormorant Garamond, refined */}
          <Link href="/" className="group">
            <div className="font-display text-2xl lg:text-[1.75rem] font-bold tracking-tight text-ink leading-none">
              JesusNews<span className="text-oxblood">.pl</span>
            </div>
            <div className="hidden lg:block text-[10px] uppercase tracking-[0.18em] text-sepia mt-1 font-sans">
              Codzienna publikacja chrześcijańska
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategoria/${cat.slug}/`}
                className="font-sans text-sm font-normal uppercase tracking-[0.08em] text-graphite hover:text-oxblood transition-colors"
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/newsletter/"
              className="font-sans text-sm font-normal uppercase tracking-[0.08em] text-graphite hover:text-oxblood transition-colors"
            >
              Newsletter
            </Link>
            <Link
              href="/o-nas/"
              className="font-sans text-sm font-normal uppercase tracking-[0.08em] text-graphite hover:text-oxblood transition-colors"
            >
              O nas
            </Link>
            <Link href="/newsletter/" className="btn-primary">
              Zasubskrybuj
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-ink p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-6 space-y-1 border-t border-rule pt-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategoria/${cat.slug}/`}
                onClick={() => setMobileOpen(false)}
                className="block font-sans text-sm uppercase tracking-[0.08em] text-graphite hover:text-oxblood py-3"
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/newsletter/"
              onClick={() => setMobileOpen(false)}
              className="block font-sans text-sm uppercase tracking-[0.08em] text-graphite hover:text-oxblood py-3"
            >
              Newsletter
            </Link>
            <Link
              href="/o-nas/"
              onClick={() => setMobileOpen(false)}
              className="block font-sans text-sm uppercase tracking-[0.08em] text-graphite hover:text-oxblood py-3"
            >
              O nas
            </Link>
            <Link
              href="/newsletter/"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-4 w-full justify-center"
            >
              Zasubskrybuj newsletter
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
