'use client'

/**
 * Page-level error boundary (Next.js App Router).
 *
 * Catches runtime errors thrown inside a page tree (anything under layout.tsx).
 * Specifically handles:
 *
 * 1. ChunkLoadError — happens when the browser has a stale main.js referring
 *    to JS chunks that no longer exist on the server after a new deploy. We
 *    transparently hard-reload the page (cache-busted) so the user never
 *    sees the ugly "Application error" screen.
 *
 * 2. Other errors — show a friendly fallback with a "Spróbuj ponownie" button.
 */

import { useEffect } from 'react'
import Link from 'next/link'

const RELOAD_FLAG = 'kp-chunk-reload-ts'
const RELOAD_COOLDOWN_MS = 30_000  // don't loop reload if error persists

function isChunkLoadError(error: Error): boolean {
  const msg = (error?.message || '') + ' ' + (error?.name || '') + ' ' + (error?.stack || '')
  return /ChunkLoadError|Loading chunk \d+ failed|Loading CSS chunk \d+ failed|Failed to fetch dynamically imported module/i.test(msg)
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!isChunkLoadError(error)) return

    // Prevent reload loop if reload itself triggers the same error
    const lastReload = Number(sessionStorage.getItem(RELOAD_FLAG) || '0')
    const now = Date.now()
    if (now - lastReload < RELOAD_COOLDOWN_MS) {
      // Don't loop — fall through to visible error UI so user can F5 manually
      return
    }
    sessionStorage.setItem(RELOAD_FLAG, String(now))

    // Hard reload (bypass HTTP cache)
    window.location.reload()
  }, [error])

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-3">
          Coś poszło nie tak
        </h2>
        <p className="text-text-secondary text-sm mb-6">
          Wystąpił nieoczekiwany błąd. Zwykle pomaga odświeżenie strony.
          {error?.digest && (
            <span className="block mt-2 text-xs opacity-60">
              Kod błędu: {error.digest}
            </span>
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-accent hover:bg-accent/90 text-background px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Spróbuj ponownie
          </button>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.location.reload()
            }}
            className="bg-card hover:bg-card-hover border border-border text-text-primary px-4 py-2 rounded-lg text-sm"
          >
            Odśwież stronę
          </button>
          <Link
            href="/"
            className="bg-card hover:bg-card-hover border border-border text-text-primary px-4 py-2 rounded-lg text-sm"
          >
            Strona główna
          </Link>
        </div>
      </div>
    </div>
  )
}
