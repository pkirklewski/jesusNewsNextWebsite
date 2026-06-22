'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-4 sm:p-6 shadow-2xl shadow-black/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 text-sm text-text-secondary">
            <p>
              Korzystamy z plików cookies w celu zapewnienia prawidłowego funkcjonowania
              serwisu oraz wyświetlania reklam. Więcej informacji znajdziesz w naszej{' '}
              <Link
                href="/polityka-prywatnosci"
                className="text-accent hover:text-accent/80 underline"
              >
                Polityce Prywatności
              </Link>.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-card-hover transition-colors"
            >
              Odrzuć
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 text-sm font-medium bg-accent text-background rounded-lg hover:bg-accent/90 transition-colors"
            >
              Akceptuję
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
