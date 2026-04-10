const CACHE_NAME = 'tadaksahak-v3';
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
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', event => {
  console.log('SW installation');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('SW activation');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
