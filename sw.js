// ============================================
// SERVICE WORKER - Tadaksahak Learning v6
// Version complète avec toutes les sections
// Stratégie mixte : cache vs réseau
// ============================================

const CACHE_NAME = 'tadaksahak-v6';
const STATIC_CACHE = 'tadaksahak-static-v6';
const DATA_CACHE = 'tadaksahak-data-v6';
const MEDIA_CACHE = 'tadaksahak-media-v6';

// ============================================
// FICHIERS STATIQUES (Cache First)
// ============================================
const staticUrls = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.webmanifest',
  './livre-viewer.html',
  './sw.js',
  './images/idaksahak_round.png',
  './images/hamadine_bio.jpg',
  './images/idaksahak_square.png'
];

// ============================================
// RESSOURCES EXTERNES (CDN)
// ============================================
const externalUrls = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// ============================================
// FICHIERS DE DONNÉES JSON (Network First)
// ============================================
const dataUrls = [
  './data/mots.json',
  './data/livres.json',
  './data/livres_connaissance.json',
  './data/quiz.json',
  './data/timeline.json',
  './data/grammaire.json',
  './data/conte.json',
  './data/emission.json',
  './data/audios.json',
  './data/histoire.json'
];

// ============================================
// EXTENSIONS D'IMAGES (Stale-While-Revalidate)
// ============================================
const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i;

// ============================================
// INSTALLATION - Cache des fichiers statiques
// ============================================
self.addEventListener('install', event => {
  console.log('📦 SW: Installation v6 - Tadaksahak Learning');
  
  event.waitUntil(
    (async () => {
      // Créer les caches
      await caches.open(STATIC_CACHE);
      await caches.open(DATA_CACHE);
      await caches.open(MEDIA_CACHE);
      
      // Tenter de cacher les fichiers statiques
      const cacheStatic = await caches.open(STATIC_CACHE);
      const results = await Promise.allSettled(
        [...staticUrls, ...externalUrls].map(url => 
          cacheStatic.add(url).catch(err => {
            console.warn(`⚠️ Échec cache ${url}:`, err.message);
          })
        )
      );
      
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      console.log(`✅ Cache static: ${succeeded}/${results.length} fichiers`);
      
      // Forcer l'activation immédiate
      return self.skipWaiting();
    })()
  );
});

// ============================================
// STRATÉGIES DE FETCH
// ============================================
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const pathname = url.pathname;
  const request = event.request;
  
  // ---- STRATÉGIE 1 : Données JSON (Network First) ----
  // Essayer le réseau d'abord, fallback cache
  if (dataUrls.some(dataUrl => pathname === dataUrl || pathname.endsWith(dataUrl))) {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then(response => {
          if (response && response.ok) {
            const responseClone = response.clone();
            caches.open(DATA_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
            return response;
          }
          throw new Error('Network response not ok');
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) {
            console.log(`📀 Données depuis cache: ${pathname}`);
            return cached;
          }
          // Fallback ultime : données minimales
          if (pathname.includes('mots.json')) {
            return new Response(JSON.stringify([
              { mot: "Báy", cat: "vt.", fr: "Pouvoir (faire)", ar: "قدر على (فعل)", en: "Able, to be" }
            ]), { headers: { 'Content-Type': 'application/json' } });
          }
          return new Response(JSON.stringify({ error: 'Hors-ligne', message: 'Données non disponibles' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }
  
  // ---- STRATÉGIE 2 : Images (Stale-While-Revalidate) ----
  if (imageExtensions.test(pathname) || pathname.includes('/images/')) {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(request);
        const fetchPromise = fetch(request.clone())
          .then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
              caches.open(MEDIA_CACHE).then(cache => {
                cache.put(request, networkResponse.clone());
              });
            }
            return networkResponse;
          })
          .catch(() => null);
        
        // Retourner le cache immédiatement, mettre à jour en arrière-plan
        if (cachedResponse) {
          fetchPromise.then(networkResponse => {
            if (networkResponse && cachedResponse !== networkResponse) {
              console.log(`🖼️ Image mise à jour: ${pathname}`);
            }
          });
          return cachedResponse;
        }
        
        const networkResponse = await fetchPromise;
        if (networkResponse) return networkResponse;
        
        // Fallback : image par défaut
        return caches.match('./images/idaksahak_round.png');
      })()
    );
    return;
  }
  
  // ---- STRATÉGIE 3 : Fichiers audio (Network First avec fallback) ----
  if (pathname.includes('/audio/') || pathname.match(/\.(mp3|wav|ogg|m4a)$/i)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const responseClone = response.clone();
            caches.open(MEDIA_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
            return response;
          }
          throw new Error('Audio not available');
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) {
            console.log(`🎵 Audio depuis cache: ${pathname}`);
            return cached;
          }
          return new Response('Audio non disponible hors-ligne', { status: 404 });
        })
    );
    return;
  }
  
  // ---- STRATÉGIE 4 : Fichiers statiques (Cache First) ----
  // HTML, CSS, JS
  if (pathname.endsWith('.html') || pathname.endsWith('.css') || pathname.endsWith('.js')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          console.log(`📄 Cache hit: ${pathname}`);
          return cached;
        }
        
        return fetch(request)
          .then(response => {
            if (response && response.ok) {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(async () => {
            // Fallback pour les pages HTML
            if (pathname.endsWith('.html') || pathname === '/' || pathname === '') {
              const offlinePage = await caches.match('./index.html');
              if (offlinePage) return offlinePage;
            }
            return new Response('Hors-ligne', { status: 503, headers: { 'Content-Type': 'text/plain' } });
          });
      })
    );
    return;
  }
  
  // ---- STRATÉGIE 5 : Autres ressources (Network First) ----
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.ok && request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        return new Response('Ressource non disponible', { status: 404 });
      })
  );
});

// ============================================
// ACTIVATION - Nettoyage des anciens caches
// ============================================
self.addEventListener('activate', event => {
  console.log('🚀 SW: Activation v6 - Tadaksahak Learning');
  
  event.waitUntil(
    (async () => {
      // Récupérer tous les noms de caches
      const cacheNames = await caches.keys();
      const cachesToDelete = cacheNames.filter(name => {
        return name !== STATIC_CACHE && name !== DATA_CACHE && name !== MEDIA_CACHE;
      });
      
      // Supprimer les anciens caches
      await Promise.all(
        cachesToDelete.map(cache => {
          console.log(`🗑️ Suppression ancien cache: ${cache}`);
          return caches.delete(cache);
        })
      );
      
      // Prendre le contrôle de toutes les pages
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(client => {
        client.navigate(client.url);
      });
      
      return self.clients.claim();
    })()
  );
});

// ============================================
// GESTION DES MESSAGES (mise à jour)
// ============================================
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'clearCache') {
    event.waitUntil(
      (async () => {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(cache => caches.delete(cache)));
        console.log('🗑️ Tous les caches ont été vidés');
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ status: 'success', message: 'Caches vidés' });
        }
      })()
    );
  }
});

// ============================================
// PUSH NOTIFICATIONS (optionnel)
// ============================================
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Nouvelle mise à jour disponible',
      icon: './images/idaksahak_round.png',
      badge: './images/idaksahak_round.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || './' }
    };
    
    event.waitUntil(
      self.registration.showNotification('Tadaksahak Learning', options)
    );
  }
});

// ============================================
// CLIC SUR NOTIFICATION
// ============================================
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || './')
  );
});

// ============================================
// GESTION DES ERREURS GLOBALES
// ============================================
self.addEventListener('error', event => {
  console.error('SW Error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.warn('SW Unhandled Rejection:', event.reason);
});
