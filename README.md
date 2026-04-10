# Wilmer Florez - Portfolio

## Idiomas / Languages / Sprachen

- [Español](#español)
- [Deutsch](#deutsch)

<a name="español"></a>
## ESPAÑOL

Portfolio profesional de Wilmer Florez: desarrollo web, diseño visual y experiencias digitales multilingües.

## Características actuales

- Sitio responsive y mobile-first.
- Contenido multilenguaje con detección automática del navegador (`de`, `en`, `es`) y persistencia en `localStorage`.
- Progressive Web App instalable con `manifest.json` y Service Worker global.
- Caché inteligente por tipo de recurso:
   - Cache First para CSS/JS/fuentes.
   - Network First para HTML.
   - Stale While Revalidate para imágenes.
   - Network Only para video.
- Funcionamiento offline tras la primera visita.
- Optimización de rendimiento con recursos minificados (`.min.css` y `.min.js`).
- Optimización de imágenes en WebP con script automatizado.
- Fondo generativo interactivo con `p5.js`.
- Proyecto Tarot interactivo con:
   - Selección de 6 barajas temáticas.
   - Tirada de una carta o triada.
   - Consulta al oráculo con IA en `de/en/es`.
- API protegida para tarot (`api/tarot.js`) con:
   - Lista de orígenes permitidos (CORS restringido).
   - Rate limiting básico por IP.
   - Integración con OpenAI Responses API.
- Formulario de contacto con Netlify Forms (`data-netlify="true"`).

## Stack tecnológico

- Frontend: HTML5, CSS3, JavaScript (Vanilla).
- Arte generativo: `p5.js`.
- Internacionalización: `scripts/languages_content.js`.
- PWA: `manifest.json`, `service-worker.js`, `scripts/sw-register.js`.
- Backend serverless para tarot: `api/tarot.js`.
- IA: OpenAI API.
- Optimización:
   - `clean-css-cli` para CSS.
   - `terser` para JavaScript.
   - `sharp-cli` para conversión a WebP.

## Estructura destacada

- Páginas principales: `index.html`, `projekte.html`, `kontakt.html`.
- Casos/proyectos: `banderas-nila-lopez.html`, `blancec-projekt.html`, `joblab-projekt.html`, `stop_the_desert.html`, `tarot_projekt.html`.
- Tarot: `tarot_decks.html`, `tarot.html`, carpetas `tarot_*`.
- Recursos:
   - Estilos en `styles/`.
   - Scripts en `scripts/`.
   - Imágenes y video en `imagenes/`.

## Desarrollo local

Ver [DEV-GUIDE.md](DEV-GUIDE.md) para flujo completo.

### Inicio rápido

1. Clonar repositorio.
2. Iniciar servidor local (requerido para Service Worker):
    - `start-server.ps1`, o
    - `python -m http.server 8000`.
3. Abrir `http://localhost:8000`.

### Edición de estilos y scripts

- Editar solo archivos fuente en `styles/*.css` y `scripts/*.js`.
- No editar archivos minificados directamente.
- Regenerar minificados con `cleancss` y `terser` (detalles en `DEV-GUIDE.md`).

## Deployment

- Frontend estático: compatible con Netlify (archivo `netlify.toml` incluido).
- El oráculo de tarot por IA está intencionalmente desactivado en producción.
- Dominio de producción: https://wilmerflorez.com

## Licencia

© 2026 Wilmer Florez. Todos los derechos reservados.

<a name="deutsch"></a>
## DEUTSCH

Professionelles Portfolio von Wilmer Florez mit Fokus auf Webentwicklung, visuelle Gestaltung und mehrsprachige digitale Erlebnisse.

## Aktuelle Funktionen

- Responsives, mobile-first Layout.
- Mehrsprachigkeit mit automatischer Browser-Erkennung (`de`, `en`, `es`) und Speicherung in `localStorage`.
- Installierbare Progressive Web App mit `manifest.json` und globalem Service Worker.
- Intelligente Cache-Strategien je Ressourcentyp (Cache First, Network First, Stale While Revalidate).
- Offline-Nutzung nach dem ersten Besuch.
- Minifizierte Assets für bessere Performance.
- Automatische WebP-Bildoptimierung per Skript.
- Generative Hintergründe mit `p5.js`.
- Interaktives Tarot-Modul mit 6 Decks, Einzelkarte/Triade und KI-Orakel in mehreren Sprachen.
- Geschützte Tarot-API mit CORS-Whitelist, einfachem IP-Rate-Limit und OpenAI-Integration.
- Kontaktformular über Netlify Forms.

## Technologie

- Frontend: HTML5, CSS3, Vanilla JavaScript.
- PWA: `manifest.json`, `service-worker.js`, `scripts/sw-register.js`.
- Serverless API: `api/tarot.js`.
- KI-Anbindung: OpenAI API.
- Optimierung: `clean-css-cli`, `terser`, `sharp-cli`.

## Lokale Entwicklung

- Vollständige Anleitung: [DEV-GUIDE.md](DEV-GUIDE.md).
- Lokaler Start über `start-server.ps1` oder Python HTTP-Server.
- Danach im Browser: `http://localhost:8000`.

## Deployment

- Statisches Frontend mit Netlify-konformer Konfiguration.
- Das KI-Tarot-Orakel ist in der Produktion absichtlich deaktiviert.
- Produktion: https://wilmerflorez.com

## Lizenz

© 2026 Wilmer Florez. Alle Rechte vorbehalten.
