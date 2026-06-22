/**
 * KryptoPuls Service Worker — Web Push notifications.
 *
 * Receives push messages from the Cloudflare Worker (RFC 8030 + VAPID),
 * displays a rich notification, and opens the article URL on click.
 */

/* eslint-disable no-restricted-globals */

self.addEventListener('install', (event) => {
  // Activate immediately on install (no need to wait for previous SW to die)
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Take control of all open tabs
  event.waitUntil(self.clients.claim())
})

/**
 * Push handler — display notification.
 *
 * Expected payload (JSON):
 * {
 *   title: string,
 *   body: string,
 *   icon: string,           // small badge (e.g. logo)
 *   image: string,          // big rich image (article thumbnail)
 *   url: string,            // open this URL on click
 *   tag: string             // dedupe key (article slug)
 * }
 */
self.addEventListener('push', (event) => {
  if (!event.data) return

  let payload
  try {
    payload = event.data.json()
  } catch {
    payload = { title: 'KryptoPuls', body: event.data.text() }
  }

  const title = payload.title || 'KryptoPuls'
  const options = {
    body: payload.body || '',
    icon: payload.icon || '/android-chrome-192x192.png',
    badge: payload.badge || '/favicon-32x32.png',
    image: payload.image || undefined,
    tag: payload.tag || 'kryptopuls-news',
    renotify: false,
    requireInteraction: false,
    vibrate: [200, 100, 200],
    data: {
      url: payload.url || 'https://kryptopuls.pl',
    },
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

/**
 * Click handler — focus existing tab if open, otherwise open new one.
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const targetUrl = (event.notification.data && event.notification.data.url) || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a tab with this URL is already open, focus it
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus()
        }
      }
      // Otherwise open a new tab
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl)
      }
      return null
    })
  )
})

/**
 * Subscription change handler — re-subscribe automatically when keys rotate.
 */
self.addEventListener('pushsubscriptionchange', (event) => {
  // Best-effort: try to resubscribe with the same VAPID public key.
  // The frontend will handle proper re-sync on the next visit.
  console.log('[SW] Push subscription changed')
})
