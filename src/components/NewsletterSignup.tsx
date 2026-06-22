'use client'

import { useState } from 'react'
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react'

// For POC — points to MailerLite form page until we add a Cloudflare Worker endpoint.
// For now, clicking the button redirects to the existing WordPress signup page.
const SIGNUP_URL = 'https://www.jesusnews.pl/newsletter-zapisz-sie-juz-teraz/'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      window.open(SIGNUP_URL, '_blank')
      return
    }
    // Pre-fill email param if MailerLite form supports it
    const url = `${SIGNUP_URL}?email=${encodeURIComponent(email)}`
    window.open(url, '_blank')
  }

  return (
    <section className="bg-parchment border border-rule p-8 lg:p-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-oxblood mb-5">
          <Mail className="w-6 h-6 text-paper" strokeWidth={1.5} />
        </div>
        <div className="eyebrow mb-3">Codzienny newsletter</div>
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-ink leading-tight mb-4">
          Słowo Boże — prosto do Twojej skrzynki o&nbsp;7:00 rano.
        </h2>
        <p className="font-serif text-lg text-graphite leading-relaxed max-w-xl mx-auto mb-7">
          Krótki werset, rozważanie, modlitwa i jedna dobra wiadomość ze świata wiary.
          Trzy minuty kawy. Bezpłatnie.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="twoj@email.pl"
            className="flex-1 px-4 py-3 bg-paper border border-rule text-ink font-serif text-base placeholder:text-sepia focus:outline-none focus:border-oxblood transition-colors"
          />
          <button type="submit" className="btn-primary justify-center sm:flex-shrink-0">
            Zasubskrybuj
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="font-sans text-xs text-sepia mt-4 tracking-[0.04em]">
          Bez spamu. Możesz wypisać się jednym kliknięciem.
        </p>
      </div>
    </section>
  )
}
