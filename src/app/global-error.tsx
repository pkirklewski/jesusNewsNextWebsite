'use client'

/**
 * Root-level error boundary (Next.js App Router).
 *
 * Catches errors thrown INSIDE layout.tsx itself — the only thing
 * page-level error.tsx can't catch. Must render its own <html><body>
 * because it replaces the root layout.
 *
 * Same ChunkLoadError auto-reload strategy as app/error.tsx.
 */

import { useEffect } from 'react'

const RELOAD_FLAG = 'kp-chunk-reload-ts-global'
const RELOAD_COOLDOWN_MS = 30_000

function isChunkLoadError(error: Error): boolean {
  const msg = (error?.message || '') + ' ' + (error?.name || '') + ' ' + (error?.stack || '')
  return /ChunkLoadError|Loading chunk \d+ failed|Loading CSS chunk \d+ failed|Failed to fetch dynamically imported module/i.test(msg)
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!isChunkLoadError(error)) return

    const lastReload = Number(sessionStorage.getItem(RELOAD_FLAG) || '0')
    const now = Date.now()
    if (now - lastReload < RELOAD_COOLDOWN_MS) return
    sessionStorage.setItem(RELOAD_FLAG, String(now))

    window.location.reload()
  }, [error])

  return (
    <html lang="pl">
      <body style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#0a0b0e',
        color: '#e8eaed',
        margin: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}>
        <div style={{ maxWidth: '28rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            JesusNews — błąd aplikacji
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#9aa0a6', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Wystąpił nieoczekiwany błąd. Zwykle pomaga odświeżenie strony
            — klikając przycisk poniżej pobierzesz najnowszą wersję.
            {error?.digest && (
              <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>
                Kod błędu: {error.digest}
              </span>
            )}
          </p>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.location.reload()
            }}
            style={{
              background: '#f59e0b',
              color: '#0a0b0e',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Odśwież stronę
          </button>
        </div>
      </body>
    </html>
  )
}
