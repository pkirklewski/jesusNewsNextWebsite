'use client'

import { useState } from 'react'
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react'

const API_URL = 'https://jesusnews-api.kirklewskis.workers.dev'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'verify' | 'already' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
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
        setEmail('')
      } else if (res.ok && data.message?.includes('Już')) {
        setStatus('already')
      } else if (res.ok) {
        setStatus('verify')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-gradient-to-br from-card via-card to-accent/5 border border-border rounded-2xl p-8 lg:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-xl mb-6">
          <Mail className="w-7 h-7 text-accent" />
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-3">
          Zasubskrybuj newsletter JesusNews
        </h2>

        <p className="text-text-secondary mb-8 max-w-lg mx-auto">
          Otrzymuj codzienne podsumowanie najważniejszych wiadomości ze świata
          kryptowalut. Bez spamu, z możliwością rezygnacji w każdej chwili.
        </p>

        {status === 'verify' ? (
          <div className="flex flex-col items-center space-y-2 text-green-400">
            <Mail className="w-8 h-8" />
            <span className="font-medium">Sprawdź swoją skrzynkę email!</span>
            <span className="text-text-secondary text-sm">Wysłaliśmy link potwierdzający. Kliknij go, aby aktywować newsletter.</span>
          </div>
        ) : status === 'already' ? (
          <div className="flex items-center justify-center space-x-2 text-accent">
            <Check className="w-5 h-5" />
            <span className="font-medium">Już jesteś zapisany!</span>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Twój adres e-mail"
                required
                disabled={status === 'loading'}
                className="newsletter-input flex-1 bg-background border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-accent hover:bg-accent/90 text-background font-semibold px-6 py-3 rounded-xl text-sm flex items-center justify-center space-x-2 whitespace-nowrap disabled:opacity-50"
              >
                <span>{status === 'loading' ? 'Zapisuję...' : 'Zapisz się'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {status === 'error' && (
              <div className="flex items-center justify-center space-x-2 text-red-400 mt-3">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Wystąpił błąd. Spróbuj ponownie.</span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
