// Registro del Service Worker
// Este script debe cargarse en todas las páginas HTML

if ('serviceWorker' in navigator) {
  let isRefreshing = false;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado correctamente:', registration.scope);

        // Detectar actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔄 Nueva versión del Service Worker detectada');

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('✨ Nueva versión disponible. Activando actualización...');
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      })
      .catch((error) => {
        console.error('❌ Error al registrar Service Worker:', error);
      });

    // Detectar cuando el Service Worker toma control
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🎯 Service Worker activo y controlando la página');
      if (isRefreshing) {
        return;
      }
      isRefreshing = true;
      window.location.reload();
    });
  });

  // Función para limpiar caché manualmente (útil en desarrollo)
  window.clearSiteCache = function () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.active.postMessage({ type: 'CLEAR_CACHE' });
          console.log('🧹 Caché limpiado. Recarga la página.');
          setTimeout(() => window.location.reload(), 500);
        }
      });
    }
  };
} else {
  console.warn('⚠️ Service Workers no son soportados en este navegador');
}
