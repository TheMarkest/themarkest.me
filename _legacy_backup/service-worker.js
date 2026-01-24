/**
 * Service Worker for Progressive Web App
 * Provides offline functionality and caching
 */

const CACHE_NAME = 'themarkest-v1.0.0';
const RUNTIME_CACHE = 'themarkest-runtime-v1';

// Files to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/bio.html',
  '/services.html',
  '/contacts.html',
  '/css/normalize.css',
  '/css/variables.css',
  '/css/base.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/animations.css',
  '/js/utils.js',
  '/js/i18n.js',
  '/js/navigation.js',
  '/js/skills-sphere.js',
  '/js/main.js',
  '/data/achievements.json',
  '/data/services.json',
  '/data/skills.json',
  '/data/locales/ru.json',
  '/data/locales/en.json',
  '/assets/images/favicon.svg',
  '/assets/images/logo.svg',
  '/assets/images/og-image.svg',
  '/site.webmanifest'
];

// Install event - cache assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('themarkest-') && 
                     cacheName !== CACHE_NAME && 
                     cacheName !== RUNTIME_CACHE;
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    // For CDN resources (fonts, Three.js), try network first
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone and cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(request);
        })
    );
    return;
  }
  
  // For same-origin requests
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Return cached version
          console.log('[SW] Serving from cache:', url.pathname);
          
          // Update cache in background if online
          if (navigator.onLine) {
            fetch(request)
              .then(response => {
                if (response.status === 200) {
                  caches.open(CACHE_NAME).then(cache => {
                    cache.put(request, response);
                  });
                }
              })
              .catch(() => {}); // Ignore errors
          }
          
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        console.log('[SW] Fetching from network:', url.pathname);
        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }
            
            // Clone response to cache
            const responseClone = response.clone();
            
            caches.open(RUNTIME_CACHE)
              .then(cache => {
                cache.put(request, responseClone);
              });
            
            return response;
          })
          .catch(error => {
            console.error('[SW] Fetch failed:', error);
            
            // Return offline page if available
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
            
            // For other requests, throw error
            throw error;
          });
      })
  );
});

// Message event - allow communication with main thread
self.addEventListener('message', event => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls || [];
    caches.open(RUNTIME_CACHE)
      .then(cache => cache.addAll(urls))
      .then(() => {
        event.ports[0].postMessage({ cached: true });
      })
      .catch(error => {
        event.ports[0].postMessage({ error: error.message });
      });
  }
});

// Push notification event (для будущего расширения)
self.addEventListener('push', event => {
  console.log('[SW] Push notification received');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'TheMarkest.me';
  const options = {
    body: data.body || 'Новое уведомление',
    icon: '/assets/images/favicon.svg',
    badge: '/assets/images/favicon.svg',
    data: data.url
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  const url = event.notification.data || '/';
  
  event.waitUntil(
    clients.openWindow(url)
  );
});

console.log('[SW] Service worker script loaded');
