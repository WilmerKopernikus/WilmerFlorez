/**
 * Helper para imágenes responsive con WebP y fallback
 * Uso: En lugar de <img src="ruta.jpg">, usa el tag <picture>
 * 
 * Ejemplo básico:
 * <picture>
 *   <source srcset="imagenes/logo.webp" type="image/webp">
 *   <img src="imagenes/logo.png" alt="Logo" loading="lazy">
 * </picture>
 * 
 * Este archivo documenta el patrón a seguir
 */

// Patrón HTML recomendado:
const pictureTagPattern = `
<picture>
  <source srcset="ruta/imagen.webp" type="image/webp">
  <img src="ruta/imagen.jpg" alt="Descripción" loading="lazy">
</picture>
`;

// Para imágenes con múltiples tamaños (responsive):
const responsivePicturePattern = `
<picture>
  <source 
    srcset="imagen-small.webp 480w, imagen-medium.webp 800w, imagen-large.webp 1200w"
    sizes="(max-width: 480px) 100vw, (max-width: 800px) 50vw, 800px"
    type="image/webp">
  <source 
    srcset="imagen-small.jpg 480w, imagen-medium.jpg 800w, imagen-large.jpg 1200w"
    sizes="(max-width: 480px) 100vw, (max-width: 800px) 50vw, 800px">
  <img src="imagen-medium.jpg" alt="Descripción" loading="lazy">
</picture>
`;

/**
 * Cómo funciona:
 * 1. El navegador intenta cargar WebP primero (si lo soporta)
 * 2. Si no soporta WebP, usa el formato original (JPG/PNG)
 * 3. loading="lazy" aplica lazy loading automático
 * 
 * Soporte de navegadores:
 * - WebP: Chrome, Edge, Firefox, Safari 14+, Opera
 * - Picture tag: Todos los navegadores modernos
 * - Fallback: Navegadores antiguos usan <img> directamente
 */

// Lista de imágenes principales a actualizar con prioridad:
const priorityImages = [
  'imagenes/Logo.png',
  'imagenes/loading.webp',
  'imagenes/joblab/Logo-JobLab.jpg',
  'imagenes/projects/blancec/*.jpg',
  'imagenes/projects/job-lab/*.jpg',
  'imagenes/videos/*.jpg' // posters de videos
];

/**
 * Nota: Para el Service Worker
 * Las imágenes WebP se cachearán automáticamente con la estrategia
 * "Stale While Revalidate" ya configurada
 */
