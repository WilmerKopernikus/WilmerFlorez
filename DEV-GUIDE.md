# Guía de Desarrollo - Wilmer Florez Portfolio

---

## 📖 Idiomas / Languages / Sprachen

- [Español](#español) (Línea 9)
- [Deutsch](#deutsch) (Zeile 320)

---

<a name="español"></a>
## ESPAÑOL

## Estructura del Proyecto

Este portfolio utiliza HTML, CSS y JavaScript vanilla con optimizaciones de rendimiento.

## Archivos CSS y JavaScript

### ⚠️ IMPORTANTE: Edición de Estilos y Scripts

**NUNCA edites archivos `.min.css` o `.min.js` directamente**

- **Archivos fuente (editables):** `styles/*.css` y `scripts/*.js`
- **Archivos minificados (generados):** `styles/*.min.css` y `scripts/*.min.js`
- **Las páginas HTML cargan:** `.min.css` y `.min.js`

### Workflow para editar CSS:

1. **Edita el archivo CSS original:**
   ```bash
   # Ejemplo: edita styles/cards.css
   ```

2. **Regenera el archivo minificado:**
   ```powershell
   # Opción A: Regenerar UN archivo específico
   cd styles
   cleancss -o cards.min.css cards.css
   
   # Opción B: Regenerar TODOS los archivos CSS
   cd styles
   Get-ChildItem -Filter "*.css" | Where-Object { $_.Name -notlike "*.min.css" } | ForEach-Object { 
       $output = $_.Name -replace '\.css$', '.min.css'
       cleancss -o $output $_.Name
       Write-Host "✓ $($_.Name) -> $output"
   }
   ```

3. **Prueba los cambios en el navegador**

### Workflow para editar JavaScript:

1. **Edita el archivo JavaScript original:**
   ```bash
   # Ejemplo: edita scripts/script.js
   ```

2. **Regenera el archivo minificado:**
   ```powershell
   # Opción A: Regenerar UN archivo específico
   cd scripts
   terser script.js -c -m -o script.min.js
   
   # Opción B: Regenerar TODOS los archivos JavaScript
   cd scripts
   Get-ChildItem -Filter "*.js" | Where-Object { $_.Name -notlike "*.min.js" -and $_.Name -notlike "p5*.js" } | ForEach-Object { 
       $output = $_.Name -replace '\.js$', '.min.js'
       terser $_.Name -c -m -o $output
       Write-Host "✓ $($_.Name) -> $output"
   }
   ```

3. **Prueba los cambios en el navegador**

## Optimizaciones Implementadas

### 1. Videos con Lazy Loading
- Todos los videos usan `preload="metadata"` y `loading="lazy"`
- Solo se carga metadata inicial (~50KB por video)
- Video completo se carga cuando el usuario hace scroll

### 2. p5.js Minificado
- `p5.min.js` (1 MB) en lugar de `p5.js` (5 MB)
- Cargado con `defer` para no bloquear renderizado
- Reducción del 80% en tamaño

### 3. CSS Minificado
- Reducción del 34.7% en tamaño total (43 KB → 28 KB)
- Archivos originales preservados para desarrollo
- Headers de caché optimizados

### 4. JavaScript Minificado
- Reducción del 20.6% en tamaño total (50 KB → 40 KB)
- 5 archivos minificados: `languages_content.js`, `script.js`, `script-tarot.js`, `script-tarot-gpt.js`, `sketch_12.js`
- Archivos originales preservados para desarrollo

### 5. Service Worker y PWA
- Caché inteligente de recursos estáticos
- Funcionamiento offline
- Estrategias de caché diferenciadas por tipo de recurso
- Progressive Web App (instalable en dispositivos)
- Actualizaciones automáticas en segundo plano

## Herramientas Necesarias

### Node.js y NPM
```powershell
node --version  # Debe ser v14 o superior
npm --version
```

### Clean-CSS CLI (para minificar CSS)
```powershell
npm install -g clean-css-cli
```

### Terser (para minificar JavaScript)
```powershell
npm install -g terser
```

## Comandos Útiles

### Verificar tamaños de archivos
```powershell
# Ver tamaño de videos
Get-ChildItem "imagenes/videos" -Filter *.mp4 | Select-Object Name, @{Name="MB";Expression={[math]::Round($_.Length/1MB,2)}}

# Comparar CSS original vs minificado
Get-ChildItem "styles" -Filter "*.css" | Select-Object Name, @{Name="KB";Expression={[math]::Round($_.Length/1KB,2)}}
```

### Regenerar todos los CSS minificados
```powershell
cd styles
Get-ChildItem -Filter "*.css" | Where-Object { $_.Name -notlike "*.min.css" } | ForEach-Object { 
    cleancss -o ($_.Name -replace '\.css$', '.min.css') $_.Name
}
cd ..
```

### Regenerar todos los JavaScript minificados
```powershell
cd scripts
Get-ChildItem -Filter "*.js" | Where-Object { $_.Name -notlike "*.min.js" -and $_.Name -notlike "p5*.js" } | ForEach-Object { 
    terser $_.Name -c -m -o ($_.Name -replace '\.js$', '.min.js')
}
cd ..
```

## Métricas de Rendimiento

### Antes de optimización:
- Videos: ~6 MB carga inmediata
- p5.js: 5 MB
- CSS: 43 KB
- JavaScript: 50 KB
- **Total inicial: ~11 MB**

### Después de optimización:
- Videos: ~50 KB (solo metadata)
- p5.min.js: 1 MB
- CSS minificado: 28 KB
- JavaScript minificado: 40 KB
- **Total inicial: ~1.1 MB**

**Mejora: ~90% más rápido** 🚀

## Detección Automática de Idioma

El sitio detecta automáticamente el idioma del navegador usando `navigator.language`:
- Alemán (de) → muestra contenido en alemán
- Inglés (en) → muestra contenido en inglés  
- Otros idiomas → fallback a inglés

La preferencia del usuario se guarda en `localStorage`.

## Deployment

Al subir a producción, asegúrate de incluir:
- ✅ Todos los archivos `.min.css` en `/styles/`
- ✅ Todos los archivos `.min.js` en `/scripts/`
- ✅ `p5.min.js` en `/scripts/`
- ✅ Archivos HTML actualizados con referencias a `.min.css` y `.min.js`

## Service Worker y Caché

### ¿Qué hace el Service Worker?

El Service Worker (`service-worker.js`) intercepta las peticiones de red y gestiona el caché de forma inteligente:

**Estrategias de caché por tipo de recurso:**

1. **Cache First** (CSS, JS, Fuentes):
   - Busca primero en caché
   - Si no existe, descarga de red y cachea
   - **Resultado:** Carga instantánea después de la primera visita

2. **Network First** (HTML):
   - Intenta red primero
   - Si falla, usa caché
   - **Resultado:** Contenido siempre actualizado, con fallback offline

3. **Stale While Revalidate** (Imágenes):
   - Sirve desde caché inmediatamente
   - Actualiza en segundo plano
   - **Resultado:** Carga instantánea + actualización invisible

4. **Network Only** (Videos):
   - No cachea (son muy pesados)
   - Siempre desde red

### Gestión del Service Worker

**Ver estado en DevTools:**
```
Chrome/Edge: F12 → Application → Service Workers
Firefox: F12 → Application → Service Workers
```

**Limpiar caché manualmente (en consola del navegador):**
```javascript
clearSiteCache()
```

**Actualizar versión del Service Worker:**
1. Edita `service-worker.js`
2. Cambia `CACHE_VERSION` (ej: `'wilmer-portfolio-v2'`)
3. El navegador detectará el cambio automáticamente

### Progressive Web App (PWA)

El sitio es ahora una PWA instalable:

- ✅ **Icono en pantalla de inicio** (móvil)
- ✅ **Funcionamiento offline**
- ✅ **Splash screen** al abrir
- ✅ **Modo standalone** (sin barra del navegador)

**Para instalar:**
- **Móvil:** "Añadir a pantalla de inicio"
- **Desktop:** Icono de instalación en la barra de direcciones

## Optimización de Imágenes (WebP)

### ¿Por qué WebP?

- **71% más pequeño** que JPG/PNG (calidad equivalente)
- Soporta transparencia como PNG
- Soportado por todos los navegadores modernos
- Conversión automatizada

### Convertir imágenes a WebP

Ya tienes **57 imágenes convertidas** (27 MB → 7.7 MB).

**Para convertir nuevas imágenes:**

```powershell
# Conversión automática de todas las imágenes
.\convert-to-webp.ps1

# El script:
# - Busca todos los JPG/PNG/JPEG en /imagenes/
# - Crea versiones .webp (calidad 85%)
# - Mantiene originales como fallback
# - Muestra ahorro de espacio
```

### Usar WebP en HTML

**Patrón con fallback automático:**

```html
<!-- Versión simple -->
<picture>
  <source srcset="imagenes/logo.webp" type="image/webp">
  <img src="imagenes/logo.png" alt="Logo" loading="lazy">
</picture>

<!-- Versión responsive -->
<picture>
  <source 
    srcset="imagen-small.webp 480w, imagen-large.webp 1200w"
    sizes="(max-width: 480px) 100vw, 800px"
    type="image/webp">
  <img src="imagen-large.jpg" alt="Descripción" loading="lazy">
</picture>
```

**Cómo funciona:**
1. Navegador intenta cargar WebP primero
2. Si no soporta WebP, usa JPG/PNG original
3. `loading="lazy"` aplica lazy loading automático

### Imágenes prioritarias para actualizar

Las más usadas en el sitio:
- `imagenes/Logo.png` → Logo principal
- `imagenes/joblab/Logo-JobLab.jpg` → 1.7 MB → 214 KB (87% ahorro)
- `imagenes/projects/*/` → Imágenes de proyectos
- `imagenes/videos/*.jpg` → Posters de videos

### Regenerar WebP después de editar

Si editas una imagen original (JPG/PNG), regenera su versión WebP:

```powershell
# Regenerar todas
.\convert-to-webp.ps1

# O manualmente una sola:
sharp -i imagenes/logo.png -o imagenes/logo.webp -f webp -q 85
```

## Futuras Mejoras

- [x] Service Worker para caché offline ✅
- [x] Convertir imágenes JPG/PNG a WebP ✅
- [ ] Actualizar HTML para usar `<picture>` tags
- [ ] Implementar Critical CSS inline
- [ ] CDN para assets estáticos
- [ ] Considerar migración a Astro o Next.js

---

<a name="deutsch"></a>
## DEUTSCH

## Projektstruktur

Dieses Portfolio verwendet HTML, CSS und Vanilla JavaScript mit Leistungsoptimierungen.

## CSS- und JavaScript-Dateien

### ⚠️ WICHTIG: Bearbeitung von Styles und Scripts

**Bearbeiten Sie NIEMALS `.min.css`- oder `.min.js`-Dateien direkt**

- **Quelldateien (editierbar):** `styles/*.css` und `scripts/*.js`
- **Minifizierte Dateien (generiert):** `styles/*.min.css` und `scripts/*.min.js`
- **HTML-Seiten laden:** `.min.css` und `.min.js`

### Workflow für CSS-Bearbeitung:

1. **Bearbeiten Sie die Original-CSS-Datei:**
   ```bash
   # Beispiel: styles/cards.css bearbeiten
   ```

2. **Regenerieren Sie die minifizierte Datei:**
   ```powershell
   # Option A: EINE spezifische Datei regenerieren
   cd styles
   cleancss -o cards.min.css cards.css
   
   # Option B: ALLE CSS-Dateien regenerieren
   cd styles
   Get-ChildItem -Filter "*.css" | Where-Object { $_.Name -notlike "*.min.css" } | ForEach-Object { 
       $output = $_.Name -replace '\.css$', '.min.css'
       cleancss -o $output $_.Name
       Write-Host "✓ $($_.Name) -> $output"
   }
   ```

3. **Testen Sie die Änderungen im Browser**

### Workflow für JavaScript-Bearbeitung:

1. **Bearbeiten Sie die Original-JavaScript-Datei:**
   ```bash
   # Beispiel: scripts/script.js bearbeiten
   ```

2. **Regenerieren Sie die minifizierte Datei:**
   ```powershell
   # Option A: EINE spezifische Datei regenerieren
   cd scripts
   terser script.js -c -m -o script.min.js
   
   # Option B: ALLE JavaScript-Dateien regenerieren
   cd scripts
   Get-ChildItem -Filter "*.js" | Where-Object { $_.Name -notlike "*.min.js" -and $_.Name -notlike "p5*.js" } | ForEach-Object { 
       $output = $_.Name -replace '\.js$', '.min.js'
       terser $_.Name -c -m -o $output
       Write-Host "✓ $($_.Name) -> $output"
   }
   ```

3. **Testen Sie die Änderungen im Browser**

## Implementierte Optimierungen

### 1. Videos mit Lazy Loading
- Alle Videos verwenden `preload="metadata"` und `loading="lazy"`
- Nur initiale Metadaten werden geladen (~50KB pro Video)
- Vollständiges Video wird geladen, wenn der Benutzer scrollt

### 2. Minifiziertes p5.js
- `p5.min.js` (1 MB) statt `p5.js` (5 MB)
- Geladen mit `defer` um Rendering nicht zu blockieren
- 80% Größenreduzierung

### 3. Minifiziertes CSS
- 34,7% Größenreduzierung (43 KB → 28 KB)
- Originaldateien für Entwicklung erhalten
- Optimierte Cache-Header

### 4. Minifiziertes JavaScript
- 20,6% Größenreduzierung (50 KB → 40 KB)
- 5 minifizierte Dateien: `languages_content.js`, `script.js`, `script-tarot.js`, `script-tarot-gpt.js`, `sketch_12.js`
- Originaldateien für Entwicklung erhalten

### 5. Service Worker und PWA
- Intelligentes Caching statischer Ressourcen
- Offline-Funktionalität
- Differenzierte Cache-Strategien nach Ressourcentyp
- Progressive Web App (installierbar auf Geräten)
- Automatische Updates im Hintergrund

## Benötigte Werkzeuge

### Node.js und NPM
```powershell
node --version  # Sollte v14 oder höher sein
npm --version
```

### Clean-CSS CLI (für CSS-Minifizierung)
```powershell
npm install -g clean-css-cli
```

### Terser (für JavaScript-Minifizierung)
```powershell
npm install -g terser
```

## Nützliche Befehle

### Dateigrößen überprüfen
```powershell
# Videogröße anzeigen
Get-ChildItem "imagenes/videos" -Filter *.mp4 | Select-Object Name, @{Name="MB";Expression={[math]::Round($_.Length/1MB,2)}}

# Original vs. minifiziertes CSS vergleichen
Get-ChildItem "styles" -Filter "*.css" | Select-Object Name, @{Name="KB";Expression={[math]::Round($_.Length/1KB,2)}}
```

### Alle minifizierten CSS-Dateien regenerieren
```powershell
cd styles
Get-ChildItem -Filter "*.css" | Where-Object { $_.Name -notlike "*.min.css" } | ForEach-Object { 
    cleancss -o ($_.Name -replace '\.css$', '.min.css') $_.Name
}
cd ..
```

### Alle minifizierten JavaScript-Dateien regenerieren
```powershell
cd scripts
Get-ChildItem -Filter "*.js" | Where-Object { $_.Name -notlike "*.min.js" -and $_.Name -notlike "p5*.js" } | ForEach-Object { 
    terser $_.Name -c -m -o ($_.Name -replace '\.js$', '.min.js')
}
cd ..
```

## Leistungsmetriken

### Vor der Optimierung:
- Videos: ~6 MB sofortige Ladung
- p5.js: 5 MB
- CSS: 43 KB
- JavaScript: 50 KB
- **Gesamt initial: ~11 MB**

### Nach der Optimierung:
- Videos: ~50 KB (nur Metadaten)
- p5.min.js: 1 MB
- Minifiziertes CSS: 28 KB
- Minifiziertes JavaScript: 40 KB
- **Gesamt initial: ~1,1 MB**

**Verbesserung: ~90% schneller** 🚀

## Automatische Spracherkennung

Die Website erkennt automatisch die Browsersprache mit `navigator.language`:
- Deutsch (de) → zeigt deutsche Inhalte
- Englisch (en) → zeigt englische Inhalte
- Andere Sprachen → Fallback auf Englisch

Die Benutzereinstellung wird in `localStorage` gespeichert.

## Deployment

Beim Hochladen in die Produktion stellen Sie sicher, dass Sie Folgendes einschließen:
- ✅ Alle `.min.css`-Dateien in `/styles/`
- ✅ Alle `.min.js`-Dateien in `/scripts/`
- ✅ `p5.min.js` in `/scripts/`
- ✅ Aktualisierte HTML-Dateien mit Verweisen auf `.min.css` und `.min.js`

## Service Worker und Cache

### Was macht der Service Worker?

Der Service Worker (`service-worker.js`) fängt Netzwerkanfragen ab und verwaltet den Cache intelligent:

**Cache-Strategien nach Ressourcentyp:**

1. **Cache First** (CSS, JS, Schriftarten):
   - Sucht zuerst im Cache
   - Wenn nicht vorhanden, lädt von Netzwerk und cached
   - **Ergebnis:** Sofortiges Laden nach dem ersten Besuch

2. **Network First** (HTML):
   - Versucht zuerst Netzwerk
   - Bei Fehler verwendet es Cache
   - **Ergebnis:** Immer aktueller Inhalt, mit Offline-Fallback

3. **Stale While Revalidate** (Bilder):
   - Liefert sofort aus dem Cache
   - Aktualisiert im Hintergrund
   - **Ergebnis:** Sofortiges Laden + unsichtbare Aktualisierung

4. **Network Only** (Videos):
   - Kein Caching (zu groß)
   - Immer vom Netzwerk

### Service Worker-Verwaltung

**Status in DevTools anzeigen:**
```
Chrome/Edge: F12 → Application → Service Workers
Firefox: F12 → Application → Service Workers
```

**Cache manuell löschen (in Browser-Konsole):**
```javascript
clearSiteCache()
```

**Service Worker-Version aktualisieren:**
1. Bearbeiten Sie `service-worker.js`
2. Ändern Sie `CACHE_VERSION` (z.B.: `'wilmer-portfolio-v2'`)
3. Der Browser erkennt die Änderung automatisch

### Progressive Web App (PWA)

Die Website ist jetzt eine installierbare PWA:

- ✅ **Symbol auf dem Startbildschirm** (Mobil)
- ✅ **Offline-Funktionalität**
- ✅ **Splash-Screen** beim Öffnen
- ✅ **Standalone-Modus** (ohne Browserleiste)

**Zum Installieren:**
- **Mobil:** "Zum Startbildschirm hinzufügen"
- **Desktop:** Installationssymbol in der Adressleiste

## Bildoptimierung (WebP)

### Warum WebP?

- **71% kleiner** als JPG/PNG (gleichwertige Qualität)
- Unterstützt Transparenz wie PNG
- Von allen modernen Browsern unterstützt
- Automatisierte Konvertierung

### Bilder in WebP konvertieren

Sie haben bereits **57 konvertierte Bilder** (27 MB → 7,7 MB).

**Um neue Bilder zu konvertieren:**

```powershell
# Automatische Konvertierung aller Bilder
.\convert-to-webp.ps1

# Das Skript:
# - Findet alle JPG/PNG/JPEG in /imagenes/
# - Erstellt .webp-Versionen (Qualität 85%)
# - Behält Originale als Fallback
# - Zeigt Speicherersparnis
```

### WebP in HTML verwenden

**Muster mit automatischem Fallback:**

```html
<!-- Einfache Version -->
<picture>
  <source srcset="imagenes/logo.webp" type="image/webp">
  <img src="imagenes/logo.png" alt="Logo" loading="lazy">
</picture>

<!-- Responsive Version -->
<picture>
  <source 
    srcset="bild-klein.webp 480w, bild-groß.webp 1200w"
    sizes="(max-width: 480px) 100vw, 800px"
    type="image/webp">
  <img src="bild-groß.jpg" alt="Beschreibung" loading="lazy">
</picture>
```

**Wie es funktioniert:**
1. Browser versucht zuerst WebP zu laden
2. Wenn WebP nicht unterstützt wird, verwendet es Original JPG/PNG
3. `loading="lazy"` wendet automatisches Lazy Loading an

### Prioritäre Bilder zum Aktualisieren

Die am häufigsten verwendeten auf der Website:
- `imagenes/Logo.png` → Hauptlogo
- `imagenes/joblab/Logo-JobLab.jpg` → 1,7 MB → 214 KB (87% Einsparung)
- `imagenes/projects/*/` → Projektbilder
- `imagenes/videos/*.jpg` → Video-Poster

### WebP nach Bearbeitung regenerieren

Wenn Sie ein Originalbild (JPG/PNG) bearbeiten, regenerieren Sie seine WebP-Version:

```powershell
# Alle regenerieren
.\convert-to-webp.ps1

# Oder manuell eine einzelne:
sharp -i imagenes/logo.png -o imagenes/logo.webp -f webp -q 85
```

## Zukünftige Verbesserungen

- [x] Service Worker für Offline-Cache ✅
- [x] JPG/PNG-Bilder in WebP konvertieren ✅
- [ ] HTML aktualisieren, um `<picture>`-Tags zu verwenden
- [ ] Critical CSS inline implementieren
- [ ] CDN für statische Assets
- [ ] Migration zu Astro oder Next.js erwägen
