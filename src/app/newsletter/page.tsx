'use client'

import { useState } from 'react'
import {
  Mail,
  ArrowRight,
  Check,
  Newspaper,
  TrendingUp,
  Bell,
  Crown,
  BarChart3,
  ShieldAlert,
} from 'lucide-react'

const API_URL = 'https://jesusnews-api.kirklewskis.workers.dev'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      const resp = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await resp.json()
      if (resp.ok) {
        setSubmitted(true)
        setEmail('')
      } else {
        setError(data.error || 'Wystąpił problem. Spróbuj ponownie.')
      }
    } catch {
      setError('Wystąpił problem. Spróbuj ponownie.')
    } finally {
      setLoading(false)
    }
  }

  const freeFeatures = [
    {
      icon: Newspaper,
      text: 'Codzienne podsumowanie najważniejszych wiadomości',
    },
    { icon: TrendingUp, text: 'Przegląd cen głównych kryptowalut' },
    { icon: Bell, text: 'Powiadomienia o ważnych wydarzeniach rynkowych' },
  ]

  const vipFeatures = [
    { icon: ShieldAlert, text: 'Alerty bezpieczeństwa — exploity, hacki, ochrona portfela' },
    { icon: BarChart3, text: 'Pogłębione analizy rynkowe' },
    { icon: Crown, text: 'Ekskluzywne raporty tygodniowe' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6">
          <Mail className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          Newsletter JesusNews
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Bądź na bieżąco z rynkiem kryptowalut. Otrzymuj najważniejsze
          wiadomości prosto na swoją skrzynkę e-mail.
        </p>
      </div>

      {/* Signup Form */}
      <div className="bg-gradient-to-br from-card via-card to-accent/5 border border-border rounded-2xl p-8 lg:p-10 mb-12">
        {submitted ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/10 rounded-xl mb-4">
              <Check className="w-7 h-7 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Dziękujemy za zapisanie się!
            </h2>
            <p className="text-text-secondary">
              Sprawdź swoją skrzynkę e-mail, aby potwierdzić subskrypcję.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-text-primary mb-2 text-center">
              Zapisz się za darmo
            </h2>
            <p className="text-text-secondary text-center mb-6">
              Bez spamu. Możesz zrezygnować w każdej chwili.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Twój adres e-mail"
                required
                className="newsletter-input flex-1 bg-background border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent/90 text-background font-semibold px-8 py-3 rounded-xl flex items-center justify-center space-x-2 whitespace-nowrap disabled:opacity-50"
              >
                <span>{loading ? 'Wysyłanie...' : 'Zapisz się'}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {error && (
              <p className="text-red-400 text-sm text-center mt-3">{error}</p>
            )}
          </>
        )}
      </div>

      {/* Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Free Tier */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-accent-blue/10 rounded-lg">
              <Mail className="w-5 h-5 text-accent-blue" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                Newsletter darmowy
              </h3>
              <p className="text-text-secondary text-sm">
                Idealny na start
              </p>
            </div>
          </div>

          <p className="text-3xl font-bold text-text-primary mb-6">
            0 zł
            <span className="text-text-secondary text-sm font-normal">
              {' '}
              / miesiąc
            </span>
          </p>

          <ul className="space-y-4">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <feature.icon className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* VIP Tier */}
        <div className="bg-card border border-accent/30 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-accent text-background text-xs font-semibold px-3 py-1 rounded-bl-lg">
            VIP
          </div>

          <div className="flex items-center space-x-3 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Crown className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                Newsletter VIP
              </h3>
              <p className="text-text-secondary text-sm">
                Dla poważnych inwestorów
              </p>
            </div>
          </div>

          <p className="text-3xl font-bold text-text-primary mb-6">
            29 zł
            <span className="text-text-secondary text-sm font-normal">
              {' '}
              / miesiąc
            </span>
          </p>

          <ul className="space-y-4">
            {freeFeatures.map((feature, index) => (
              <li key={`free-${index}`} className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  {feature.text}
                </span>
              </li>
            ))}
            {vipFeatures.map((feature, index) => (
              <li key={`vip-${index}`} className="flex items-start space-x-3">
                <feature.icon className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="/vip"
            className="mt-6 block w-full bg-accent hover:bg-accent/90 text-background font-semibold py-3 rounded-xl text-center"
          >
            Wykup VIP — 29 zł/mies.
          </a>
        </div>
      </div>

      {/* FAQ */}
      <section className="bg-card border border-border rounded-2xl p-8 lg:p-10">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Najczęściej zadawane pytania
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-text-primary font-semibold mb-2">
              Jak często wysyłacie newsletter?
            </h3>
            <p className="text-text-secondary text-sm">
              Newsletter wysyłamy codziennie rano (ok. 8:00) z podsumowaniem
              najważniejszych wydarzeń z ostatnich 24 godzin.
            </p>
          </div>
          <div>
            <h3 className="text-text-primary font-semibold mb-2">
              Czy mogę zrezygnować z subskrypcji?
            </h3>
            <p className="text-text-secondary text-sm">
              Tak, w każdej chwili. W każdym e-mailu znajduje się link do
              rezygnacji z subskrypcji.
            </p>
          </div>
          <div>
            <h3 className="text-text-primary font-semibold mb-2">
              Czy moje dane są bezpieczne?
            </h3>
            <p className="text-text-secondary text-sm">
              Tak. Nie udostępniamy Twoich danych osobom trzecim. Twój adres
              e-mail służy wyłącznie do wysyłania newslettera.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
