'use client'

/**
 * Global safety net for ChunkLoadErrors that escape Next.js error boundaries.
 *
 * Some chunk-loading failures (typically from dynamic imports triggered by
 * onClick/onInteraction AFTER initial render) propagate as unhandled
 * window errors rather than reaching error.tsx. This component attaches
 * global listeners and transparently hard-reloads the page once per
 * cooldown window so the user never sees "Application error".
 *
 * Added 2026-04-19 after reports that users had to manually refresh.
 */

import { useEffect } from 'react'

const RELOAD_FLAG = 'kp-chunk-reload-ts-global-listener'
const RELOAD_COOLDOWN_MS = 30_000

function isChunkLoadError(payload: unknown): boolean {
  const err = payload as { message?: string; name?: string; stack?: string } | null
  if (!err) return false
  const text = `${err.message || ''} ${err.name || ''} ${err.stack || ''}`
  return /ChunkLoadError|Loading chunk \d+ failed|Loading CSS chunk \d+ failed|Failed to fetch dynamically imported module/i.test(text)
}

function maybeReload(label: string) {
  const lastReload = Number(sessionStorage.getItem(RELOAD_FLAG) || '0')
  const now = Date.now()
  if (now - lastReload < RELOAD_COOLDOWN_MS) return
  sessionStorage.setItem(RELOAD_FLAG, String(now))
  // eslint-disable-next-line no-console
  console.info(`[chunk-listener] ${label} — hard-reload`)
  window.location.reload()
}

export default function ChunkErrorListener() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      if (isChunkLoadError(event.error) || isChunkLoadError(event as unknown as Error)) {
        maybeReload('window.error')
      }
    }
    const onRejection = (event: PromiseRejectionEvent) => {
      if (isChunkLoadError(event.reason)) {
        maybeReload('unhandled-rejection')
      }
    }
    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)
    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
    }
  }, [])

  return null
}
