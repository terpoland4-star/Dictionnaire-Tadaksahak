// ============================================
// SERVICE WORKER - Tadaksahak Learning v5
// Stratégie mixte : cache vs réseau
// ============================================

const CACHE_NAME = 'tadaksahak-v5';
const STATIC_CACHE = 'tadaksahak-static-v5';
const DATA_CACHE = 'tadaksahak-data-v5';

// Fichiers statiques (mise en cache immédiate)
const staticUrls = [
  './',                           // index.html implicite
  './index.html',
  './style.css',
  './app.js',
  './manifest.webmanifest',
  './livre-viewer.html',
  './images/idaksahak_round.png',
  './images/hamadine_bio.jpg',
  './images/idaksahak_square.png'
];

// Ressources externes (CDN)
const externalUrls = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Fichiers de données (NE PAS mettre en cache - stratégie réseau d'abord)
const dataUrls = [
  './data/mots.json',
  './data/livres.json',
  './data/livres_connaissance.json',
  './data/quiz.json',
  './data/timeline.json'
];

// ============================================
// INSTALLATION - Cache des fichiers statiques
// ============================================
self.addEventListener('install', event => {
  console.log('📦 SW: Installation v5');
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async cache => {
      // Tenter de cacher chaque fichier statique
      const results = await Promise.allSettled(
        [...staticUrls, ...externalUrls].map(url => 
          cache.add(url).catch(err => {
            console.warn(`⚠️ Échec cache ${url}:`, err.message);
          })
        )
      );
      
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      console.log(`✅ Cache static: ${succeeded}/${results.length} fichiers`);
      
      // Forcer l'activation immédiate
      return self.skipWaiting();
    })
  );
});

// ============================================
// STRATÉGIES DE FETCH
// ============================================
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const pathname = url.pathname;
  
  // ---- STRATÉGIE 1 : Données (Network First) ----
  // Pour les JSON : toujours essayer le réseau d'abord
  if (dataUrls.some(dataUrl => pathname.endsWith(dataUrl))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Mettre à jour le cache en arrière-plan
          const responseClone = response.clone();
          caches.open(DATA_CACHE).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(async () => {
          // Fallback vers le cache si réseau indisponible
          const cached = await caches.match(event.request);
          if (cached) {
            console.log(`📀 Données depuis cache: ${pathname}`);
            return cached;
          }
          // Fallback ultime : données minimales
          return new Response(JSON.stringify({ error: 'Hors-ligne' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }
  
  // ---- STRATÉGIE 2 : Images et ressources (Stale-While-Revalidate) ----
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          caches.open(STATIC_CACHE).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        }).catch(() => cached);
        
        return cached || fetchPromise;
      })
    );
    return;
  }
  
  // ---- STRATÉGIE 3 : Fichiers statiques (Cache First) ----
  // HTML, CSS, JS (mis à jour à chaque nouvelle version)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        console.log(`📀 Cache hit: ${pathname}`);
        return cached;
      }
      
      return fetch(event.request)
        .then(response => {
          // Mettre en cache pour la prochaine fois
          if (response.ok && staticUrls.some(url => pathname.endsWith(url))) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(err => {
          console.warn(`❌ Échec fetch: ${pathname}`, err);
          // Fallback pour les pages HTML
          if (pathname.endsWith('.html') || pathname === './' || pathname === '/') {
            return caches.match('./index.html');
          }
          return new Response('Hors-ligne', { status: 503 });
        });
    })
  );
});

// ============================================
// ACTIVATION - Nettoyage des anciens caches
// ============================================
self.addEventListener('activate', event => {
  console.log('🚀 SW: Activation v5');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const cachesToDelete = cacheNames.filter(name => {
        return name !== STATIC_CACHE && name !== DATA_CACHE && !name.includes('v5');
      });
      
      return Promise.all(
        cachesToDelete.map(cache => {
          console.log(`🗑️ Suppression ancien cache: ${cache}`);
          return caches.delete(cache);
        })
      );
    }).then(() => {
      // Prendre le contrôle de toutes les pages
      return self.clients.claim();
    })
  );
});

// ============================================
// GESTION DES MESSAGES (pour mise à jour)
// ============================================
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
