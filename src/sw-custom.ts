import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies'
import { BackgroundSync } from 'workbox-background-sync'

declare const self: ServiceWorkerGlobalScope

// Precache all build assets
precacheAndRoute(self.__WB_MANIFEST)

// Clean up old caches
cleanupOutdatedCaches()

// Course progress background sync
const courseProgressQueue = new BackgroundSync('course-progress', {
  maxRetentionTime: 24 * 60 // 24 hours
})

// Register background sync for course progress
registerRoute(
  /\/api\/course-progress/,
  new NetworkFirst({
    cacheName: 'course-progress',
    plugins: [courseProgressQueue]
  }),
  'POST'
)

// Cache course content for offline access
registerRoute(
  /\/api\/courses\/.*\/content/,
  new CacheFirst({
    cacheName: 'course-content',
    plugins: [{
      cacheKeyWillBeUsed: async ({ request }) => {
        return `${request.url}?offline=true`
      }
    }]
  })
)

// Cache Supabase API responses
registerRoute(
  ({ url }) => url.origin === 'https://api.supabase.io' || url.origin.includes('supabase.co'),
  new NetworkFirst({
    cacheName: 'supabase-api',
    networkTimeoutSeconds: 3,
    plugins: [{
      cacheKeyWillBeUsed: async ({ request }) => {
        return `${request.url}?v=1`
      }
    }]
  })
)

// Cache course assets (videos, images, documents)
registerRoute(
  ({ url }) => url.pathname.includes('/storage/') && url.origin.includes('supabase.co'),
  new CacheFirst({
    cacheName: 'course-assets',
    plugins: [{
      cacheKeyWillBeUsed: async ({ request }) => {
        return `${request.url}?asset=true`
      }
    }]
  })
)

// Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return

  const data = event.data.json()
  const options = {
    body: data.body,
    icon: '/icons/pwa-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
      courseId: data.courseId,
      type: data.type || 'general'
    },
    actions: [
      {
        action: 'view',
        title: 'View Course',
        icon: '/icons/action-view.png'
      },
      {
        action: 'later',
        title: 'Remind Later',
        icon: '/icons/action-later.png'
      }
    ],
    requireInteraction: data.requireInteraction || false,
    silent: data.silent || false
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'view') {
    event.waitUntil(
      self.clients.openWindow(event.notification.data.url)
    )
  } else if (event.action === 'later') {
    // Schedule reminder for later
    console.log('Reminder scheduled for later')
  } else {
    // Default click action
    event.waitUntil(
      self.clients.openWindow(event.notification.data.url || '/')
    )
  }
})

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'course-progress-sync') {
    event.waitUntil(syncCourseProgress())
  } else if (event.tag === 'offline-actions') {
    event.waitUntil(syncOfflineActions())
  }
})

// Sync course progress when back online
async function syncCourseProgress() {
  try {
    // Get pending progress from IndexedDB
    const pendingProgress = await getPendingProgress()
    
    for (const progress of pendingProgress) {
      try {
        const response = await fetch('/api/course-progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(progress)
        })

        if (response.ok) {
          // Remove from pending queue
          await removePendingProgress(progress.id)
        }
      } catch (error) {
        console.error('Failed to sync progress:', error)
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Sync other offline actions
async function syncOfflineActions() {
  try {
    const pendingActions = await getPendingActions()
    
    for (const action of pendingActions) {
      try {
        const response = await fetch(action.url, {
          method: action.method,
          headers: action.headers,
          body: action.body
        })

        if (response.ok) {
          await removePendingAction(action.id)
        }
      } catch (error) {
        console.error('Failed to sync action:', error)
      }
    }
  } catch (error) {
    console.error('Offline actions sync failed:', error)
  }
}

// Helper functions for IndexedDB operations
async function getPendingProgress() {
  // This would interact with IndexedDB to get pending progress
  // Implementation depends on your offline service
  return []
}

async function removePendingProgress(id: string) {
  // Remove from IndexedDB
  console.log('Removing pending progress:', id)
}

async function getPendingActions() {
  // Get pending offline actions
  return []
}

async function removePendingAction(id: string) {
  // Remove from IndexedDB
  console.log('Removing pending action:', id)
}

// Handle fetch events for offline fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests for navigation
  if (event.request.method === 'GET' && event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html')
      })
    )
  }
})

// Handle install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  self.skipWaiting()
})

// Handle activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  event.waitUntil(self.clients.claim())
})

// Handle message events from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: '1.0.0' })
  }
})
