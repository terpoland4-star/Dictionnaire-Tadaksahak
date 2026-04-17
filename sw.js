// ============================================
// SERVICE WORKER - Tadaksahak Learning v8
// Version avec mise à jour auto et installation après 3 visites
// Stratégie mixte : cache vs réseau
// INCLUT : Propositions relatives (Christiansen & Levinsohn 2003)
// CORRIGÉ : Plus d'erreur "Response body is already used"
// ============================================

const CACHE_NAME = 'tadaksahak-v8';
const STATIC_CACHE = 'tadaksahak-static-v8';
const DATA_CACHE = 'tadaksahak-data-v8';
const MEDIA_CACHE = 'tadaksahak-media-v8';

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
// INCLUT relatives.json (NOUVEAU)
// ============================================
const dataUrls = [
  './data/mots.json',
  './data/livres.json',
  './data/livres_connaissance.json',
  './data/quiz.json',
  './data/timeline.json',
  './data/grammaire.json',
  './data/relatives.json',
  './data/conte.json',
  './data/emission.json',
  './data/themes.json',
  './data/audios.json',
  './data/histoire.json'
];

// ============================================
// EXTENSIONS D'IMAGES (Stale-While-Revalidate)
// ============================================
const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i;
const audioExtensions = /\.(mp3|wav|ogg|m4a|flac)$/i;

// ============================================
// INSTALLATION - Cache des fichiers statiques
// ============================================
self.addEventListener('install', event => {
  console.log(`📦 SW: Installation ${CACHE_NAME} - Tadaksahak Learning (avec relatives)`);
  
  event.waitUntil(
    (async () => {
      await caches.open(STATIC_CACHE);
      await caches.open(DATA_CACHE);
      await caches.open(MEDIA_CACHE);
      
      const cacheStatic = await caches.open(STATIC_CACHE);
      const results = await Promise.allSettled(
        [...staticUrls, ...externalUrls].map(async url => {
          try {
            await cacheStatic.add(url);
          } catch (err) {
            console.warn(`⚠️ Échec cache ${url}:`, err.message);
          }
        })
      );
      
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      console.log(`✅ Cache static: ${succeeded}/${results.length} fichiers`);
      
      return self.skipWaiting();
    })()
  );
});

// ============================================
// STRATÉGIES DE FETCH (CORRIGÉES)
// ============================================
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const pathname = url.pathname;
  const request = event.request;
  
  if (request.method === 'HEAD') {
    event.respondWith(fetch(request));
    return;
  }
  
  if (pathname.includes('chrome-extension') || pathname.includes('__WB')) {
    return;
  }
  
  if (pathname.includes('analytics') || pathname.includes('tracking')) {
    event.respondWith(fetch(request));
    return;
  }
  
  // ---- STRATÉGIE 1 : Données JSON (Network First) - CORRIGÉ ----
  if (dataUrls.some(dataUrl => pathname === dataUrl || pathname.endsWith(dataUrl))) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request, { cache: 'no-store' });
          if (response && response.ok) {
            try {
              const responseToCache = response.clone();
              const cache = await caches.open(DATA_CACHE);
              await cache.put(request, responseToCache);
            } catch (cloneError) {
              console.warn(`⚠️ Impossible de cacher ${pathname}:`, cloneError.message);
            }
            return response;
          }
          throw new Error('Network response not ok');
        } catch (error) {
          const cached = await caches.match(request);
          if (cached) {
            console.log(`📀 Données depuis cache: ${pathname}`);
            return cached;
          }
          
          // Fallback pour relatives.json
          if (pathname.includes('relatives.json')) {
            return new Response(JSON.stringify({
              strategies: [
                { marqueur: "ayo", usage_fr: "Pronom relatif (singulier, nom défini, restrictif)", exemples: [] },
                { marqueur: "∅", usage_fr: "Gap strategy (nom indéfini, restrictif)", exemples: [] },
                { marqueur: "sa", usage_fr: "Non-restrictif (information supplémentaire)", exemples: [] }
              ],
              accessibilite: true,
              exceptions: {}
            }), { headers: { 'Content-Type': 'application/json' } });
          }
          
          // Fallback pour mots.json
          if (pathname.includes('mots.json')) {
            return new Response(JSON.stringify([
              { mot: "Báy", cat: "vt.", fr: "Pouvoir (faire)", ar: "قدر على (فعل)", en: "Able, to be" },
              { mot: "Yiddár", cat: "vi.", fr: "Être en vie", ar: "يكون حياً", en: "Alive, to be" },
              { mot: "Káamil", cat: "quantifier", fr: "Tout", ar: "كل", en: "All" },
              { mot: "ayo", cat: "pron.", fr: "qui, que (pronom relatif singulier)", ar: "الذي، التي", en: "who, which, that" },
              { mot: "ayondo", cat: "pron.", fr: "qui, que (pronom relatif pluriel)", ar: "الذين، اللواتي", en: "who, which, that (pl)" },
              { mot: "sa", cat: "conj.", fr: "qui, que (relative non-restrictive)", ar: "الذي، التي", en: "who, which, that (non-restrictive)" }
            ]), { headers: { 'Content-Type': 'application/json' } });
          }
          
          return new Response(JSON.stringify({ error: 'Hors-ligne', message: 'Données non disponibles' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      })()
    );
    return;
  }
  
  // ---- STRATÉGIE 2 : Images (Stale-While-Revalidate) - CORRIGÉ ----
  if (imageExtensions.test(pathname) || pathname.includes('/images/')) {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(request);
        
        // Mise à jour en arrière-plan SANS bloquer la réponse
        fetch(request.clone())
          .then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
              caches.open(MEDIA_CACHE).then(cache => {
                try {
                  cache.put(request, networkResponse.clone());
                } catch (e) {
                  console.warn(`⚠️ Impossible de mettre en cache l'image: ${pathname}`);
                }
              });
            }
          })
          .catch(() => {});
        
        if (cachedResponse) {
          return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
          return networkResponse;
        }
        
        const defaultImage = await caches.match('./images/idaksahak_round.png');
        if (defaultImage) return defaultImage;
        return new Response('Image non disponible', { status: 404 });
      })()
    );
    return;
  }
  
  // ---- STRATÉGIE 3 : Fichiers audio (Network First avec fallback) - CORRIGÉ ----
  if (audioExtensions.test(pathname) || pathname.includes('/audio/')) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          if (response && response.ok) {
            try {
              const responseToCache = response.clone();
              const cache = await caches.open(MEDIA_CACHE);
              await cache.put(request, responseToCache);
            } catch (e) {
              console.warn(`⚠️ Impossible de cacher l'audio: ${pathname}`);
            }
            return response;
          }
          throw new Error('Audio not available');
        } catch (error) {
          const cached = await caches.match(request);
          if (cached) {
            console.log(`🎵 Audio depuis cache: ${pathname}`);
            return cached;
          }
          return new Response('Audio non disponible hors-ligne', { status: 404, headers: { 'Content-Type': 'text/plain' } });
        }
      })()
    );
    return;
  }
  
  // ---- STRATÉGIE 4 : Fichiers statiques (Cache First) ----
  if (pathname.endsWith('.html') || pathname.endsWith('.css') || pathname.endsWith('.js')) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) {
          console.log(`📄 Cache hit: ${pathname}`);
          return cached;
        }
        
        try {
          const response = await fetch(request);
          if (response && response.ok && request.method === 'GET') {
            try {
              const responseToCache = response.clone();
              const cache = await caches.open(STATIC_CACHE);
              await cache.put(request, responseToCache);
            } catch (e) {
              console.warn(`⚠️ Impossible de cacher le fichier statique: ${pathname}`);
            }
            return response;
          }
          throw new Error('Network response not ok');
        } catch (error) {
          if (pathname.endsWith('.html') || pathname === '/' || pathname === '') {
            const offlinePage = await caches.match('./index.html');
            if (offlinePage) return offlinePage;
          }
          return new Response('Hors-ligne', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        }
      })()
    );
    return;
  }
  
  // ---- STRATÉGIE 5 : Manifest et Webmanifest (Cache First) ----
  if (pathname.includes('manifest') || pathname.includes('webmanifest')) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        return fetch(request);
      })()
    );
    return;
  }
  
  // ---- STRATÉGIE 6 : Autres ressources (Network First) ----
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok && request.method === 'GET') {
          try {
            const responseToCache = response.clone();
            const cache = await caches.open(STATIC_CACHE);
            await cache.put(request, responseToCache);
          } catch (e) {
            console.warn(`⚠️ Impossible de cacher la ressource: ${pathname}`);
          }
          return response;
        }
        throw new Error('Network response not ok');
      } catch (error) {
        const cached = await caches.match(request);
        if (cached) return cached;
        
        if (url.origin !== self.location.origin) {
          return new Response('Service externe non disponible hors-ligne', { status: 503 });
        }
        return new Response('Ressource non disponible', { status: 404 });
      }
    })()
  );
});

// ============================================
// ACTIVATION - Nettoyage des anciens caches
// ============================================
self.addEventListener('activate', event => {
  console.log(`🚀 SW: Activation ${CACHE_NAME} - Tadaksahak Learning (avec relatives)`);
  
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const cachesToDelete = cacheNames.filter(name => {
        return name !== STATIC_CACHE && name !== DATA_CACHE && name !== MEDIA_CACHE;
      });
      
      await Promise.all(
        cachesToDelete.map(cache => {
          console.log(`🗑️ Suppression ancien cache: ${cache}`);
          return caches.delete(cache);
        })
      );
      
      console.log(`✅ Caches actifs: ${STATIC_CACHE}, ${DATA_CACHE}, ${MEDIA_CACHE}`);
      
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(client => {
        try {
          client.navigate(client.url);
        } catch (e) {
          console.warn(`Impossible de naviguer: ${client.url}`);
        }
      });
      
      return self.clients.claim();
    })()
  );
});

// ============================================
// GESTION DES MESSAGES
// ============================================
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    event.waitUntil(
      self.clients.claim().then(() => {
        console.log('✅ SW: Mise à jour forcée');
      })
    );
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
  
  if (event.data === 'checkUpdate') {
    event.waitUntil(
      (async () => {
        try {
          const registration = await self.registration;
          await registration.update();
          console.log('🔄 Vérification de mise à jour effectuée');
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ status: 'success', message: 'Mise à jour vérifiée' });
          }
        } catch (err) {
          console.error('Erreur vérification mise à jour:', err);
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ status: 'error', message: err.message });
          }
        }
      })()
    );
  }
  
  if (event.data === 'getVersion') {
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ version: CACHE_NAME });
    }
  }
  
  if (event.data && event.data.type === 'incrementVisit') {
    console.log('👁️ Visite comptabilisée - SW notifié');
  }
});

// ============================================
// PUSH NOTIFICATIONS
// ============================================
self.addEventListener('push', event => {
  if (event.data) {
    let data;
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
    
    const options = {
      body: data.body || '✨ Nouvelle mise à jour disponible ! Rafraîchissez la page.',
      icon: './images/idaksahak_round.png',
      badge: './images/idaksahak_round.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || './' },
      actions: [
        { action: 'refresh', title: '🔄 Rafraîchir' },
        { action: 'dismiss', title: '❌ Plus tard' }
      ],
      tag: 'tadaksahak-update',
      renotify: true
    };
    
    event.waitUntil(
      self.registration.showNotification('📚 Tadaksahak Learning - Mise à jour', options)
    );
  } else {
    event.waitUntil(
      self.registration.showNotification('📚 Tadaksahak Learning', {
        body: 'Nouveau contenu disponible !',
        icon: './images/idaksahak_round.png',
        badge: './images/idaksahak_round.png',
        data: { url: './' }
      })
    );
  }
});

// ============================================
// CLIC SUR NOTIFICATION
// ============================================
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'refresh') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        if (clientList.length > 0) {
          clientList[0].navigate(clientList[0].url);
          clientList[0].focus();
        } else {
          clients.openWindow('./');
        }
      })
    );
  } else {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || './')
    );
  }
});

// ============================================
// NOTIFICATION FERMÉE
// ============================================
self.addEventListener('notificationclose', event => {
  console.log('🔔 Notification fermée:', event.notification.tag);
});

// ============================================
// SYNC EN ARRIÈRE-PLAN
// ============================================
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('🔄 Sync en arrière-plan déclenchée');
    event.waitUntil(
      (async () => {
        const cache = await caches.open(DATA_CACHE);
        for (const dataUrl of dataUrls) {
          try {
            const response = await fetch(dataUrl, { cache: 'no-store' });
            if (response && response.ok) {
              const responseToCache = response.clone();
              await cache.put(dataUrl, responseToCache);
              console.log(`✅ Sync: ${dataUrl} mis à jour`);
            }
          } catch (err) {
            console.warn(`⚠️ Sync échouée pour ${dataUrl}:`, err);
          }
        }
      })()
    );
  }
});

// ============================================
// GESTION DES ERREURS GLOBALES
// ============================================
self.addEventListener('error', event => {
  console.error('❌ SW Error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.warn('⚠️ SW Unhandled Rejection:', event.reason);
});

// ============================================
// LOG DE DÉMARRAGE
// ============================================
console.log(`✅ Service Worker ${CACHE_NAME} chargé`);
console.log('📚 Module des propositions relatives intégré (Christiansen & Levinsohn 2003)');
