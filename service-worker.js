// Service Worker para Wilmer Florez Portfolio
// Versión 1.1.0 - Añadido soporte para WebP

const CACHE_VERSION = 'wilmer-portfolio-v1.1';
const CACHE_STATIC = 'wilmer-static-v1';
const CACHE_DYNAMIC = 'wilmer-dynamic-v1';
const CACHE_IMAGES = 'wilmer-images-v1';

// Archivos críticos para cachear en la instalación
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/projekte.html',
  '/kontakt.html',
  '/styles/cards_intro.min.css',
  '/styles/header_test.min.css',
  '/styles/cards.min.css',
  '/styles/images.min.css',
  '/styles/global-text.min.css',
  '/styles/languages_content.min.css',
  '/scripts/p5.min.js',
  '/scripts/sketch_12.min.js',
  '/scripts/languages_content.min.js',
  '/scripts/script.min.js',
  '/imagenes/Logo.png',
  '/imagenes/logo.webp',
  '/imagenes/loading.webp'
];

// Evento: Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then((cache) => {
        console.log('[Service Worker] Cacheando archivos estáticos');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Instalación completada');
        return self.skipWaiting(); // Activa inmediatamente
      })
      .catch((error) => {
        console.error('[Service Worker] Error en instalación:', error);
      })
  );
});

// Evento: Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Eliminar cachés antiguos
            if (cacheName !== CACHE_STATIC && 
                cacheName !== CACHE_DYNAMIC && 
                cacheName !== CACHE_IMAGES) {
              console.log('[Service Worker] Eliminando caché antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activación completada');
        return self.clients.claim(); // Toma control inmediatamente
      })
  );
});

// Evento: Intercepción de peticiones (fetch)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo cachear peticiones del mismo origen
  if (url.origin !== location.origin) {
    return;
  }

  // Estrategia según tipo de recurso
  if (request.destination === 'image') {
    // IMÁGENES: Stale-While-Revalidate (caché pero actualiza en background)
    event.respondWith(staleWhileRevalidate(request, CACHE_IMAGES));
  } 
  else if (request.destination === 'style' || 
           request.destination === 'script' || 
           request.destination === 'font') {
    // CSS, JS, FUENTES: Cache First (caché primero, red como fallback)
    event.respondWith(cacheFirst(request, CACHE_STATIC));
  } 
  else if (request.destination === 'video') {
    // VIDEOS: Network First (no cachear, son muy pesados)
    event.respondWith(fetch(request));
  }
  else {
    // HTML y otros: Network First (red primero, caché como fallback)
    event.respondWith(networkFirst(request, CACHE_DYNAMIC));
  }
});

// Estrategia: Cache First
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[Service Worker] Sirviendo desde caché:', request.url);
      return cachedResponse;
    }
    
    // Si no está en caché, buscar en red y cachear
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Error en cacheFirst:', error);
    // Intentar devolver algo de caché como último recurso
    return caches.match(request);
  }
}

// Estrategia: Network First
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Red no disponible, usando caché:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si no hay caché, devolver página offline
    return caches.match('/index.html');
  }
}

// Estrategia: Stale While Revalidate
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Actualizar caché en background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  // Devolver caché inmediatamente si existe
  return cachedResponse || fetchPromise;
}

// Evento: Mensaje desde la página (para limpiar caché manualmente)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});
