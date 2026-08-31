// ============================================
// SERVICE WORKER - Tadaksahak Learning v10
// Version avec mise à jour auto et installation après 3 visites
// Stratégie mixte : cache vs réseau
// INCLUT : Propositions relatives (Christiansen & Levinsohn 2003)
// INCLUT : Actualités WordPress, Partenaires, Newsletter
// CORRIGÉ : Plus d'erreur "Response body is already used"
// ============================================

const CACHE_NAME = 'tadaksahak-v11';
const STATIC_CACHE = 'tadaksahak-static-v11';
const DATA_CACHE = 'tadaksahak-data-v11';
const MEDIA_CACHE = 'tadaksahak-media-v11';
const API_CACHE = 'tadaksahak-api-v11';

// ============================================
// FICHIERS STATIQUES (Cache First)
// ============================================
const staticUrls = [
  './',
  './index.html',
  './style.css',
  './js/state.js',
  './js/i18n-data.js',
  './js/utils.js',
  './js/theme.js',
  './js/language.js',
  './js/chat.js',
  './js/dictionary.js',
  './js/grammar.js',
  './js/contes.js',
  './js/emissions.js',
  './js/themesVocab.js',
  './js/flashcards.js',
  './js/quiz.js',
  './js/timeline.js',
  './js/ressources.js',
  './js/pwa.js',
  './js/navigation.js',
  './js/main.js',
  './manifest.webmanifest',
  './sw.js',
  './offline.html',
  './images/idaksahak_round.png',
  './images/hamadine_bio.jpg',
  './images/idaksahak_square.png',
  './images/og-image.jpg'
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
  './data/histoire.json',
  './data/actualites.json',
  './data/partenaires.json'
];

// ============================================
// URLS API EXTERNES (Stale-While-Revalidate)
// ============================================
const apiUrls = [
  'https://idaksahak.com/wp-json/wp/v2/posts',
  'https://idaksahak.com/wp-json/wp/v2/posts?per_page=6&_embed'
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
  console.log(`📦 SW: Installation ${CACHE_NAME} - Tadaksahak Learning Ultimate`);
  
  event.waitUntil(
    (async () => {
      await caches.open(STATIC_CACHE);
      await caches.open(DATA_CACHE);
      await caches.open(MEDIA_CACHE);
      await caches.open(API_CACHE);
      
      const cacheStatic = await caches.open(STATIC_CACHE);
      const results = await Promise.allSettled(
        [...staticUrls, ...externalUrls].map(async url => {
          try {
            await cacheStatic.add(url);
            console.log(`✅ Cache static: ${url}`);
          } catch (err) {
            console.warn(`⚠️ Échec cache ${url}:`, err.message);
          }
        })
      );
      
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      console.log(`✅ Cache static: ${succeeded}/${results.length} fichiers`);
      
      // Précharger les données essentielles
      const cacheData = await caches.open(DATA_CACHE);
      for (const dataUrl of dataUrls.slice(0, 5)) {
        try {
          const response = await fetch(dataUrl);
          if (response.ok) {
            await cacheData.put(dataUrl, response);
            console.log(`✅ Préchargé: ${dataUrl}`);
          }
        } catch (err) {
          console.warn(`⚠️ Préchargement échoué: ${dataUrl}`);
        }
      }
      
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
  
  // Ignorer les requêtes problématiques
  if (request.method === 'HEAD') {
    event.respondWith(fetch(request));
    return;
  }
  
  if (pathname.includes('chrome-extension') || pathname.includes('__WB') || pathname.includes('webpack')) {
    return;
  }
  
  if (pathname.includes('analytics') || pathname.includes('tracking') || pathname.includes('pixel')) {
    event.respondWith(fetch(request));
    return;
  }
  
  // ---- STRATÉGIE 1 : API WordPress (Stale-While-Revalidate) ----
  if (apiUrls.some(apiUrl => request.url.includes(apiUrl))) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        
        // Mise à jour en arrière-plan
        fetch(request.clone())
          .then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
              caches.open(API_CACHE).then(cache => {
                try {
                  cache.put(request, networkResponse.clone());
                  console.log(`✅ API WordPress mise en cache: ${pathname}`);
                } catch (e) {
                  console.warn(`⚠️ Impossible de cacher l'API: ${pathname}`);
                }
              });
            }
          })
          .catch(() => {});
        
        if (cached) {
          console.log(`📀 API WordPress depuis cache: ${pathname}`);
          return cached;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
          return networkResponse;
        }
        
        // Fallback actualités locales
        const fallbackActualites = await caches.match('./data/actualites.json');
        if (fallbackActualites) return fallbackActualites;
        
        return new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json' }
        });
      })()
    );
    return;
  }
  
  // ---- STRATÉGIE 2 : Données JSON (Network First) - CORRIGÉ ----
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
                { 
                  marqueur: "ayo", 
                  marqueur_sg: "ayo", 
                  usage_fr: "Pronom relatif (singulier, nom défini, restrictif)", 
                  usage_en: "Relative pronoun (singular, definite noun, restrictive)",
                  usage_ar: "ضمير موصول (مفرد، اسم معرف، حصري)",
                  exemples: [
                    { tadaksahak: "Bora [ayo a-taw-kat] a-zumbu-kat.", glose_fr: "personne [qui est.arrivée] est.descendue", traduction_fr: "La personne qui est arrivée est descendue" }
                  ]
                },
                { 
                  marqueur: "∅", 
                  usage_fr: "Gap strategy (nom indéfini, restrictif)", 
                  usage_en: "Gap strategy (indefinite noun, restrictive)",
                  usage_ar: "استراتيجية الفجوة (اسم نكرة، حصري)",
                  exemples: []
                },
                { 
                  marqueur: "sa", 
                  usage_fr: "Non-restrictif (information supplémentaire)", 
                  usage_en: "Non-restrictive (additional information)",
                  usage_ar: "غير حصري (معلومات إضافية)",
                  exemples: []
                }
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
          
          // Fallback pour actualites.json
          if (pathname.includes('actualites.json')) {
            return new Response(JSON.stringify([
              { id: 1, titre: "Bienvenue sur Tadaksahak Learning", date: new Date().toISOString(), resume: "Plateforme dédiée à la langue et culture Idaksahak", url: "#", image: null }
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
  
  // ---- STRATÉGIE 3 : Images (Stale-While-Revalidate) - CORRIGÉ ----
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
  
  // ---- STRATÉGIE 4 : Fichiers audio (Network First avec fallback) - CORRIGÉ ----
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
  
  // ---- STRATÉGIE 5 : Fichiers statiques (Cache First) ----
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
            const offlinePage = await caches.match('./offline.html');
            if (offlinePage) return offlinePage;
            const indexPage = await caches.match('./index.html');
            if (indexPage) return indexPage;
          }
          return new Response('Hors-ligne', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        }
      })()
    );
    return;
  }
  
  // ---- STRATÉGIE 6 : Manifest et Webmanifest (Cache First) ----
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
  
  // ---- STRATÉGIE 7 : Autres ressources (Network First) ----
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
  console.log(`🚀 SW: Activation ${CACHE_NAME} - Tadaksahak Learning Ultimate`);
  
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const cachesToDelete = cacheNames.filter(name => {
        return name !== STATIC_CACHE && name !== DATA_CACHE && name !== MEDIA_CACHE && name !== API_CACHE;
      });
      
      await Promise.all(
        cachesToDelete.map(cache => {
          console.log(`🗑️ Suppression ancien cache: ${cache}`);
          return caches.delete(cache);
        })
      );
      
      console.log(`✅ Caches actifs: ${STATIC_CACHE}, ${DATA_CACHE}, ${MEDIA_CACHE}, ${API_CACHE}`);
      
      // Notifier les clients de la mise à jour
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_ACTIVATED',
          version: CACHE_NAME,
          message: 'Nouvelle version disponible'
        });
      });
      
      return self.clients.claim();
    })()
  );
});

// ============================================
// GESTION DES MESSAGES
// ============================================
self.addEventListener('message', event => {
  const { data } = event;
  
  if (data === 'skipWaiting') {
    self.skipWaiting();
    event.waitUntil(
      self.clients.claim().then(() => {
        console.log('✅ SW: Mise à jour forcée');
        self.clients.matchAll({ type: 'window' }).then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'UPDATE_READY' });
          });
        });
      })
    );
  }
  
  if (data === 'clearCache') {
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
  
  if (data === 'checkUpdate') {
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
  
  if (data === 'getVersion') {
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ version: CACHE_NAME });
    }
  }
  
  if (data && data.type === 'incrementVisit') {
    console.log('👁️ Visite comptabilisée - SW notifié');
    // Optionnel: stocker le compteur dans IndexedDB du SW
  }
  
  if (data && data.type === 'prefetch') {
    event.waitUntil(
      (async () => {
        const { urls } = data;
        const cache = await caches.open(DATA_CACHE);
        for (const url of urls) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await cache.put(url, response);
              console.log(`✅ Préchargement: ${url}`);
            }
          } catch (err) {
            console.warn(`⚠️ Préchargement échoué: ${url}`);
          }
        }
      })()
    );
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
        
        // Sync des actualités WordPress
        for (const apiUrl of apiUrls) {
          try {
            const response = await fetch(apiUrl);
            if (response.ok) {
              const apiCache = await caches.open(API_CACHE);
              await apiCache.put(apiUrl, response);
              console.log(`✅ Sync API: ${apiUrl}`);
            }
          } catch (err) {
            console.warn(`⚠️ Sync API échouée: ${apiUrl}`);
          }
        }
      })()
    );
  }
  
  if (event.tag === 'sync-newsletter') {
    console.log('📧 Sync newsletter déclenchée');
    event.waitUntil(
      (async () => {
        // Ici on pourrait envoyer les abonnements en attente
        const pendingSubscriptions = await getPendingSubscriptions();
        for (const sub of pendingSubscriptions) {
          try {
            await sendSubscriptionToServer(sub);
          } catch (err) {
            console.warn('Erreur envoi newsletter:', err);
          }
        }
      })()
    );
  }
});

// ============================================
// FONCTIONS AIDE POUR SYNC
// ============================================
async function getPendingSubscriptions() {
  // Récupérer depuis IndexedDB du SW
  try {
    const cache = await caches.open(DATA_CACHE);
    const response = await cache.match('./pending-subscriptions');
    if (response) {
      return await response.json();
    }
  } catch (e) {}
  return [];
}

async function sendSubscriptionToServer(subscription) {
  // À implémenter si besoin d'un endpoint serveur
  console.log('📧 Envoi subscription:', subscription.email);
  return Promise.resolve();
}

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
console.log('📰 Module des actualités WordPress intégré');
console.log('🤝 Module des partenaires intégré');
