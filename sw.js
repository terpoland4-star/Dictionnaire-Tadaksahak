// ============================================
// SERVICE WORKER - Tadaksahak Learning v8
// Version avec mise à jour auto et installation après 3 visites
// Stratégie mixte : cache vs réseau
// INCLUT : Propositions relatives (Christiansen & Levinsohn 2003)
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
  './data/relatives.json',      // NOUVEAU : propositions relatives
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
  console.log('📦 SW: Installation v8 - Tadaksahak Learning (avec relatives)');
  
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
      
      // Forcer l'activation immédiate pour prendre le contrôle
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
  
  // IGNORER les requêtes HEAD (ne pas les mettre en cache)
  if (request.method === 'HEAD') {
    event.respondWith(fetch(request));
    return;
  }
  
  // IGNORER les requêtes vers les extensions
  if (pathname.includes('chrome-extension') || pathname.includes('__WB')) {
    return;
  }
  
  // IGNORER les requêtes vers les analytics et tracking
  if (pathname.includes('analytics') || pathname.includes('tracking')) {
    event.respondWith(fetch(request));
    return;
  }
  
  // ---- STRATÉGIE 1 : Données JSON (Network First) ----
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
        
        if (cachedResponse) {
          // Mise à jour en arrière-plan
          fetchPromise.then(networkResponse => {
            if (networkResponse && cachedResponse !== networkResponse) {
              console.log(`🖼️ Image mise à jour: ${pathname}`);
            }
          });
          return cachedResponse;
        }
        
        const networkResponse = await fetchPromise;
        if (networkResponse) return networkResponse;
        
        // Fallback: image par défaut
        return caches.match('./images/idaksahak_round.png');
      })()
    );
    return;
  }
  
  // ---- STRATÉGIE 3 : Fichiers audio (Network First avec fallback) ----
  if (audioExtensions.test(pathname) || pathname.includes('/audio/')) {
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
          return new Response('Audio non disponible hors-ligne', { status: 404, headers: { 'Content-Type': 'text/plain' } });
        })
    );
    return;
  }
  
  // ---- STRATÉGIE 4 : Fichiers statiques (Cache First) ----
  if (pathname.endsWith('.html') || pathname.endsWith('.css') || pathname.endsWith('.js')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          console.log(`📄 Cache hit: ${pathname}`);
          return cached;
        }
        
        return fetch(request)
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
  
  // ---- STRATÉGIE 5 : Manifest et Webmanifest (Cache First) ----
  if (pathname.includes('manifest') || pathname.includes('webmanifest')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request);
      })
    );
    return;
  }
  
  // ---- STRATÉGIE 6 : Autres ressources (Network First) ----
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
        
        // Message personnalisé pour les APIs externes
        if (url.origin !== self.location.origin) {
          return new Response('Service externe non disponible hors-ligne', { status: 503 });
        }
        return new Response('Ressource non disponible', { status: 404 });
      })
  );
});

// ============================================
// ACTIVATION - Nettoyage des anciens caches
// ============================================
self.addEventListener('activate', event => {
  console.log('🚀 SW: Activation v8 - Tadaksahak Learning (avec relatives)');
  
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
      
      console.log(`✅ Caches actifs: ${STATIC_CACHE}, ${DATA_CACHE}, ${MEDIA_CACHE}`);
      
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
// GESTION DES MESSAGES (mise à jour et installation)
// ============================================
self.addEventListener('message', event => {
  // Forcer la mise à jour (skipWaiting)
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    event.waitUntil(
      self.clients.claim().then(() => {
        console.log('✅ SW: Mise à jour forcée');
      })
    );
  }
  
  // Vider tous les caches
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
  
  // Mise à jour silencieuse (vérifier les mises à jour en arrière-plan)
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
  
  // Récupérer la version du cache
  if (event.data === 'getVersion') {
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ version: CACHE_NAME });
    }
  }
  
  // Incrémenter le compteur de visites (depuis le client)
  if (event.data && event.data.type === 'incrementVisit') {
    console.log('👁️ Visite comptabilisée - SW notifié');
  }
});

// ============================================
// PUSH NOTIFICATIONS (mise à jour disponible)
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
    // Notification générique
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
// NOTIFICATION FERMÉE (pour analytics)
// ============================================
self.addEventListener('notificationclose', event => {
  console.log('🔔 Notification fermée:', event.notification.tag);
});

// ============================================
// SYNC EN ARRIÈRE-PLAN (Background Sync)
// ============================================
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('🔄 Sync en arrière-plan déclenchée');
    event.waitUntil(
      (async () => {
        // Tentative de mise à jour des données en arrière-plan
        const cache = await caches.open(DATA_CACHE);
        for (const dataUrl of dataUrls) {
          try {
            const response = await fetch(dataUrl, { cache: 'no-store' });
            if (response && response.ok) {
              await cache.put(dataUrl, response);
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
console.log('✅ Service Worker Tadaksahak Learning v8 chargé');
console.log('📚 Module des propositions relatives intégré (Christiansen & Levinsohn 2003)');
