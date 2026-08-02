const CACHE_NAME = 'multimedia-v1';
const assetsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './images/logo.webp'
];

// Pasang Cache saat Service Worker di-install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Ambil aset dari Cache saat offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
