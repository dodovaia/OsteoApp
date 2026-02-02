/*
 * Service Worker pour OstéoSuivi
 *
 * Ce fichier met en cache les ressources essentielles de l’application afin
 * de permettre un fonctionnement hors connexion et d’améliorer le temps
 * de chargement. Il s’agit d’un exemple basique de mise en cache qui
 * pourra être amélioré pour inclure plus de fichiers et une gestion plus
 * sophistiquée des versions.
 */

const CACHE_NAME = 'osteosuivi-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.webmanifest',
  './osteo-icon-192.png',
  './osteo-icon-512.png'
];

// Pendant l’installation, on ajoute les fichiers statiques au cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepte les requêtes pour servir en priorité le cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});