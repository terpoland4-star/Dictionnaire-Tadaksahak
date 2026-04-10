// ==============================
// SERVICE WORKER - TADAKSAHAK LEARNING
// Version 1.0
// Mise en cache des ressources statiques et des données
// ==============================

const CACHE_NAME = 'tadaksahak-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.webmanifest',
  '/data/mots.json',
  '/data/livres.json',
  '/data/livres_connaissance.json',
  '/data/quiz.json',
  '/data/timeline.json',
  '/images/idaksahak_round.png',
  '/images/hamadine_bio.jpg',
  '/images/idaksahak_square.png',
  '/images/logo.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Installation : mise en cache des ressources
self.addEventListener('install', event => {
  console.log('[SW] Installation');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Mise en cache des ressources');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('[SW] Erreur de cache', err))
  );
  // Forcer l'activation immédiate
  self.skipWaiting();
});

// Activation : suppression des anciens caches
self.addEventListener('activate', event => {
  console.log('[SW] Activation');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Suppression ancien cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  // Prendre le contrôle des clients ouverts
  self.clients.claim();
});

// Interception des requêtes : stratégie "cache first" puis réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est dans le cache, on la renvoie
        if (response) {
          return response;
        }
        // Sinon, on va chercher sur le réseau
        return fetch(event.request).then(networkResponse => {
          // Vérifier si la réponse est valide
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          // Cloner la réponse pour la mettre en cache
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return networkResponse;
        });
      })
      .catch(() => {
        // Fallback en cas d'échec réseau et hors ligne
        // Pour les requêtes HTML, renvoyer la page d'accueil
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
        // Sinon, retourner une réponse générique
        return new Response('Contenu non disponible hors ligne', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});
