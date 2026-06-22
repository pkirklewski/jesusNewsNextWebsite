'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Mail } from 'lucide-react'

const categories = [
  { slug: 'chrzescijanstwo', label: 'Chrześcijaństwo' },
  { slug: 'wiadomosci', label: 'Wiadomości' },
  { slug: 'usa', label: 'USA' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-navy text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-white">JESUSNEWS</span>
              <span className="text-accent-gold-warm">.PL</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategoria/${cat.slug}/`}
                className="text-sm font-medium text-white/90 hover:text-accent-gold-warm transition-colors"
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/newsletter/"
              className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-accent-gold-warm transition-colors"
            >
              <Mail className="w-4 h-4" />
              Newsletter
            </Link>
            <Link
              href="/o-nas/"
              className="text-sm font-medium text-white/90 hover:text-accent-gold-warm transition-colors"
            >
              O nas
            </Link>
            <Link
              href="/newsletter/"
              className="bg-accent-gold-warm hover:bg-accent text-navy font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Zasubskrybuj
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 space-y-2 border-t border-white/10 pt-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategoria/${cat.slug}/`}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-white/90 hover:text-accent-gold-warm py-1"
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/newsletter/"
              onClick={() => setMobileOpen(false)}
              className="block text-base font-medium text-white/90 hover:text-accent-gold-warm py-1"
            >
              📧 Newsletter
            </Link>
            <Link
              href="/o-nas/"
              onClick={() => setMobileOpen(false)}
              className="block text-base font-medium text-white/90 hover:text-accent-gold-warm py-1"
            >
              O nas
            </Link>
            <Link
              href="/newsletter/"
              onClick={() => setMobileOpen(false)}
              className="block bg-accent-gold-warm hover:bg-accent text-navy font-semibold px-4 py-2 rounded-lg text-sm text-center mt-3"
            >
              Zasubskrybuj newsletter
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
