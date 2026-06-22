'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Mail, X, ArrowRight, Check, AlertCircle } from 'lucide-react'

const API_URL = 'https://jesusnews-api.kirklewskis.workers.dev'

// localStorage key — set after a successful subscription. If present,
// the slide-in NEVER shows again on this device.
const SUBSCRIBED_KEY = 'newsletter-subscribed'

// sessionStorage key — set after the user dismisses the slide-in on a
// given path. The popup won't show again on the SAME path within the
// SAME session. Re-appears after navigating to a different page or
// opening a fresh browser session.
const DISMISSED_KEY = 'newsletter-dismissed-paths'

// Show the popup after the user has scrolled this fraction of the page
// (or after SHOW_DELAY_MS, whichever comes first).
const SHOW_SCROLL_FRACTION = 0.25
const SHOW_DELAY_MS = 8000

// Anti-blindness: re-attention wiggle every N seconds while idle.
// Plus the headline rotates between a few clickbaity variants.
const ATTENTION_INTERVAL_MS = 60_000   // wiggle bar every 60 s
const HEADLINE_ROTATE_MS = 8_000        // change headline copy every 8 s

const HEADLINES = [
  'Codzienny przegląd rynku krypto — prosto na maila',
  'Bądź na bieżąco — newsletter o krypto co rano ☕',
  'Najważniejsze newsy z rynku krypto. Zero spamu.',
  'Codzienne rozważanie Słowa Bożego — krótko, prosto do skrzynki o 7:00 rano',
] as const

export default function NewsletterSlideIn() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'verify' | 'already' | 'error'
  >('idle')
  // Anti banner-blindness: short wiggle pulse every minute
  const [wiggle, setWiggle] = useState(false)
  // Rotating headline copy
  const [headlineIdx, setHeadlineIdx] = useState(0)

  useEffect(() => {
    // Reset visibility on path change so it can re-trigger
    setVisible(false)
    setStatus('idle')

    if (typeof window === 'undefined') return

    // Already subscribed → never show
    if (localStorage.getItem(SUBSCRIBED_KEY) === 'true') return

    // Cookie consent not yet handled → wait (avoid stacking popups)
    if (!localStorage.getItem('cookie-consent')) return

    // Already dismissed on THIS path in THIS session → don't show
    let dismissed: string[] = []
    try {
      dismissed = JSON.parse(sessionStorage.getItem(DISMISSED_KEY) || '[]')
    } catch {
      dismissed = []
    }
    if (dismissed.includes(pathname)) return

    let shown = false
    const show = () => {
      if (shown) return
      shown = true
      setVisible(true)
    }

    // Trigger 1: scroll past N% of the page
    const onScroll = () => {
      const doc = document.documentElement
      const scrolled = window.scrollY
      const maxScroll = doc.scrollHeight - window.innerHeight
      if (maxScroll > 0 && scrolled / maxScroll >= SHOW_SCROLL_FRACTION) {
        show()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Trigger 2: time-based fallback
    const timer = window.setTimeout(show, SHOW_DELAY_MS)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [pathname])

  // Re-attention wiggle while the bar is visible & user hasn't acted
  useEffect(() => {
    if (!visible || status !== 'idle') return
    const id = window.setInterval(() => {
      setWiggle(true)
      window.setTimeout(() => setWiggle(false), 1100)  // match animation duration
    }, ATTENTION_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [visible, status])

  // Headline rotation while the bar is visible & user hasn't acted
  useEffect(() => {
    if (!visible || status !== 'idle') return
    const id = window.setInterval(() => {
      setHeadlineIdx((i) => (i + 1) % HEADLINES.length)
    }, HEADLINE_ROTATE_MS)
    return () => window.clearInterval(id)
  }, [visible, status])

  function dismiss() {
    setVisible(false)
    if (typeof window === 'undefined') return
    let dismissed: string[] = []
    try {
      dismissed = JSON.parse(sessionStorage.getItem(DISMISSED_KEY) || '[]')
    } catch {
      dismissed = []
    }
    if (!dismissed.includes(pathname)) {
      dismissed.push(pathname)
      sessionStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.needsVerification) {
        setStatus('verify')
        localStorage.setItem(SUBSCRIBED_KEY, 'true')
      } else if (res.ok && data.message?.includes('Już')) {
        setStatus('already')
        localStorage.setItem(SUBSCRIBED_KEY, 'true')
      } else if (res.ok) {
        setStatus('verify')
        localStorage.setItem(SUBSCRIBED_KEY, 'true')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 pointer-events-none animate-slide-up ${
        wiggle ? 'animate-attention-wiggle' : ''
      }`}
      role="dialog"
      aria-label="Zapis do newslettera"
    >
      <div className="pointer-events-auto bg-gradient-to-r from-card-hover via-card-hover to-accent/20 border-t-2 border-accent/60 px-4 sm:px-8 py-4 sm:py-8 shadow-2xl shadow-black/70 relative">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-text-primary/70 hover:text-text-primary p-1.5 rounded-md hover:bg-white/10 transition-colors z-10"
          aria-label="Zamknij"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pr-8 sm:pr-12">
          <div className="hidden sm:flex relative shrink-0 items-center justify-center w-16 h-16 bg-accent/20 rounded-2xl ring-1 ring-accent/40">
            {/* Pulsing ring — non-stop, very subtle, tells the eye 'something live here' */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-2xl ring-2 ring-accent/60 animate-ping-slow pointer-events-none"
            />
            <Mail className="w-8 h-8 text-accent relative" />
          </div>

          <div className="flex-1 min-w-0">
            {status === 'verify' ? (
              <div className="flex items-center gap-2 text-green-300">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <div className="text-sm sm:text-base">
                  <strong>Sprawdź skrzynkę email!</strong>{' '}
                  <span className="text-text-primary/80">
                    Wysłaliśmy link potwierdzający.
                  </span>
                </div>
              </div>
            ) : status === 'already' ? (
              <div className="flex items-center gap-2 text-accent">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <span className="text-sm sm:text-base font-medium">Już jesteś zapisany — dzięki!</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 w-full">
                <div className="flex-1 min-w-0">
                  <h3
                    key={headlineIdx}
                    className="text-base sm:text-2xl font-bold text-text-primary leading-tight animate-headline-fade"
                  >
                    {HEADLINES[headlineIdx]}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-primary/70 mt-1 sm:mt-1.5">
                    Bez spamu. Rezygnacja w każdej chwili.
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:shrink-0 sm:w-auto w-full"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Twój adres e-mail"
                    required
                    disabled={status === 'loading'}
                    className="newsletter-input flex-1 sm:w-72 bg-background/80 border border-border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3.5 text-text-primary placeholder:text-text-primary/40 text-sm sm:text-base disabled:opacity-50 min-w-0"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-accent hover:bg-accent/90 text-background font-semibold px-5 sm:px-7 py-2 sm:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
                  >
                    <span>{status === 'loading' ? 'Zapisuję...' : 'Zapisz się'}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </form>
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-300 text-xs sm:text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Wystąpił błąd. Spróbuj ponownie.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
