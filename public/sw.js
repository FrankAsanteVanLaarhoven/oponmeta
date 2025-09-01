// Progressive Web App Service Worker
// Enhanced LMS with offline capabilities, caching, and background sync

const CACHE_NAME = 'oponm-lms-v1.0.0';
const STATIC_CACHE = 'oponm-static-v1.0.0';
const DYNAMIC_CACHE = 'oponm-dynamic-v1.0.0';
const API_CACHE = 'oponm-api-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/offline.html',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/courses',
  '/api/user/profile',
  '/api/user/preferences',
  '/api/analytics',
  '/api/recommendations'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (isStaticFile(url.pathname)) {
    event.respondWith(handleStaticFile(request));
  } else if (isAPIRequest(url.pathname)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isImageRequest(url.pathname)) {
    event.respondWith(handleImageRequest(request));
  } else {
    event.respondWith(handleDynamicRequest(request));
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(performBackgroundSync());
  } else if (event.tag === 'course-progress-sync') {
    event.waitUntil(syncCourseProgress());
  } else if (event.tag === 'user-activity-sync') {
    event.waitUntil(syncUserActivity());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from OponM LMS',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Course',
        icon: '/assets/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('OponM LMS', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions
function isStaticFile(pathname) {
  return STATIC_FILES.some(file => pathname.includes(file)) ||
         pathname.startsWith('/static/') ||
         pathname.startsWith('/assets/') ||
         pathname.endsWith('.js') ||
         pathname.endsWith('.css') ||
         pathname.endsWith('.png') ||
         pathname.endsWith('.jpg') ||
         pathname.endsWith('.svg');
}

function isAPIRequest(pathname) {
  return pathname.startsWith('/api/') || 
         API_ENDPOINTS.some(endpoint => pathname.includes(endpoint));
}

function isImageRequest(pathname) {
  return pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i);
}

// Cache strategies
async function handleStaticFile(request) {
  try {
    // Try network first, fallback to cache
    const networkResponse = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, serving from cache', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline page if no cache
    return caches.match('/offline.html');
  }
}

async function handleAPIRequest(request) {
  try {
    // Try network first, fallback to cache
    const networkResponse = await fetch(request);
    
    // Cache successful API responses
    if (networkResponse.ok) {
      const cache = await caches.open(API_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: API network failed, serving from cache', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline API response
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'You are currently offline. Please check your connection.',
      timestamp: new Date().toISOString()
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleImageRequest(request) {
  try {
    // Cache first strategy for images
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Image network failed', request.url);
    // Return placeholder image or null
    return new Response(null, { status: 404 });
  }
}

async function handleDynamicRequest(request) {
  try {
    // Network first for dynamic content
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Dynamic request failed, serving from cache', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    return caches.match('/offline.html');
  }
}

// Background sync functions
async function performBackgroundSync() {
  console.log('Service Worker: Performing background sync');
  
  try {
    // Sync offline course progress
    await syncCourseProgress();
    
    // Sync user activity
    await syncUserActivity();
    
    // Sync offline enrollments
    await syncOfflineEnrollments();
    
    console.log('Service Worker: Background sync completed');
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

async function syncCourseProgress() {
  console.log('Service Worker: Syncing course progress');
  
  try {
    // Get offline progress data from IndexedDB
    const offlineProgress = await getOfflineProgress();
    
    for (const progress of offlineProgress) {
      try {
        await fetch('/api/courses/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(progress)
        });
        
        // Remove from offline storage after successful sync
        await removeOfflineProgress(progress.id);
      } catch (error) {
        console.error('Service Worker: Failed to sync progress', progress.id, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Error syncing course progress', error);
  }
}

async function syncUserActivity() {
  console.log('Service Worker: Syncing user activity');
  
  try {
    // Get offline activity data from IndexedDB
    const offlineActivity = await getOfflineActivity();
    
    for (const activity of offlineActivity) {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(activity)
        });
        
        // Remove from offline storage after successful sync
        await removeOfflineActivity(activity.id);
      } catch (error) {
        console.error('Service Worker: Failed to sync activity', activity.id, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Error syncing user activity', error);
  }
}

async function syncOfflineEnrollments() {
  console.log('Service Worker: Syncing offline enrollments');
  
  try {
    // Get offline enrollment data from IndexedDB
    const offlineEnrollments = await getOfflineEnrollments();
    
    for (const enrollment of offlineEnrollments) {
      try {
        await fetch('/api/enrollments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(enrollment)
        });
        
        // Remove from offline storage after successful sync
        await removeOfflineEnrollment(enrollment.id);
      } catch (error) {
        console.error('Service Worker: Failed to sync enrollment', enrollment.id, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Error syncing offline enrollments', error);
  }
}

// IndexedDB helper functions (simplified - in production use proper IndexedDB wrapper)
async function getOfflineProgress() {
  // Mock implementation - replace with actual IndexedDB calls
  return [];
}

async function removeOfflineProgress(id) {
  // Mock implementation - replace with actual IndexedDB calls
  console.log('Service Worker: Removed offline progress', id);
}

async function getOfflineActivity() {
  // Mock implementation - replace with actual IndexedDB calls
  return [];
}

async function removeOfflineActivity(id) {
  // Mock implementation - replace with actual IndexedDB calls
  console.log('Service Worker: Removed offline activity', id);
}

async function getOfflineEnrollments() {
  // Mock implementation - replace with actual IndexedDB calls
  return [];
}

async function removeOfflineEnrollment(id) {
  // Mock implementation - replace with actual IndexedDB calls
  console.log('Service Worker: Removed offline enrollment', id);
}

// Cache management
async function cleanOldCaches() {
  const cacheNames = await caches.keys();
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE];
  
  for (const cacheName of cacheNames) {
    if (!currentCaches.includes(cacheName)) {
      await caches.delete(cacheName);
      console.log('Service Worker: Deleted old cache', cacheName);
    }
  }
}

// Periodic cache cleanup
setInterval(cleanOldCaches, 24 * 60 * 60 * 1000); // Daily

console.log('Service Worker: Loaded successfully');
