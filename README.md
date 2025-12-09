# Wilmer Florez - Portfolio

Portfolio profesional de Wilmer Florez: Desarrollador Web, Diseñador Gráfico y Artista Visual.

## 🚀 Características

- ✅ Diseño responsive y mobile-first
- ✅ Multiidioma (Alemán/Inglés con detección automática)
- ✅ Progressive Web App (PWA) - instalable
- ✅ Service Worker con caché inteligente
- ✅ Optimización de rendimiento (~90% más rápido)
- ✅ Funciona offline después de la primera visita
- ✅ Background animado con p5.js

## 📦 Tecnologías

- HTML5, CSS3, JavaScript (Vanilla)
- p5.js (generative art)
- Service Workers (PWA)
- OpenAI API (Tarot interactivo)
- Vercel (deployment)

## 🛠️ Desarrollo

Ver [DEV-GUIDE.md](DEV-GUIDE.md) para instrucciones completas de desarrollo.

### Quick Start

1. **Clonar repositorio:**
   ```bash
   git clone https://github.com/WilmerKopernikus/WilmerFlorez.git
   ```

2. **Servir localmente (necesario para Service Worker):**
   ```bash
   # Opción 1: Live Server (VS Code extension)
   # Opción 2: Python
   python -m http.server 8000
   # Opción 3: Node.js
   npx serve
   ```

3. **Abrir en navegador:**
   ```
   http://localhost:8000
   ```

### Editar estilos/scripts

```bash
# Editar archivos fuente
# styles/*.css
# scripts/*.js

# Regenerar minificados
npm run build
```

## 📊 Métricas de Rendimiento

- **Carga inicial:** ~1.1 MB (vs 11 MB antes)
- **Segunda visita:** ~100 KB (caché)
- **Tiempo de carga:** <1s (con caché)
- **Lighthouse Score:** 95+

## 🌐 Deployment

El sitio está desplegado en Vercel:
- **Producción:** https://wilmerflorez.com

## 📄 Licencia

© 2025 Wilmer Florez. Todos los derechos reservados.
