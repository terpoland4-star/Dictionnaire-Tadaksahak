const CACHE_NAME = 'tadaksahak-v4';
const urlsToCache = [
  '/Dictionnaire-Tadaksahak/',
  '/Dictionnaire-Tadaksahak/index.html',
  '/Dictionnaire-Tadaksahak/style.css',
  '/Dictionnaire-Tadaksahak/app.js',
  '/Dictionnaire-Tadaksahak/manifest.webmanifest',
  '/Dictionnaire-Tadaksahak/data/mots.json',
  '/Dictionnaire-Tadaksahak/data/livres.json',
  '/Dictionnaire-Tadaksahak/data/livres_connaissance.json',
  '/Dictionnaire-Tadaksahak/data/quiz.json',
  '/Dictionnaire-Tadaksahak/data/timeline.json',
  '/Dictionnaire-Tadaksahak/images/idaksahak_round.png',
  '/Dictionnaire-Tadaksahak/images/hamadine_bio.jpg',
  '/Dictionnaire-Tadaksahak/images/idaksahak_square.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', event => {
  console.log('SW installation');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Ajout de chaque URL avec gestion d'erreur individuelle
      return Promise.allSettled(
        urlsToCache.map(url => cache.add(url).catch(err => console.warn(`Échec du cache pour ${url} :`, err)))
      ).then(() => console.log('Tentative de cache terminée'));
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  console.log('SW activation');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});
