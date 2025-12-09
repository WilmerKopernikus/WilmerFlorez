# Guía de Desarrollo - Wilmer Florez Portfolio

## Estructura del Proyecto

Este portfolio utiliza HTML, CSS y JavaScript vanilla con optimizaciones de rendimiento.

## Archivos CSS

### ⚠️ IMPORTANTE: Edición de Estilos

**NUNCA edites archivos `.min.css` directamente**

- **Archivos fuente (editables):** `styles/*.css`
- **Archivos minificados (generados):** `styles/*.min.css`
- **Las páginas HTML cargan:** `.min.css`

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
- Reducción del 34.7% en tamaño total
- Archivos originales preservados para desarrollo
- Headers de caché optimizados

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

## Métricas de Rendimiento

### Antes de optimización:
- Videos: ~6 MB carga inmediata
- p5.js: 5 MB
- CSS: 43 KB
- **Total inicial: ~11 MB**

### Después de optimización:
- Videos: ~50 KB (solo metadata)
- p5.min.js: 1 MB
- CSS minificado: 28 KB
- **Total inicial: ~1 MB**

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
- ✅ `p5.min.js` en `/scripts/`
- ✅ Archivos HTML actualizados con referencias a `.min.css`

## Futuras Mejoras

- [ ] Service Worker para caché offline
- [ ] Convertir imágenes JPG/PNG a WebP
- [ ] Implementar Critical CSS inline
- [ ] CDN para assets estáticos
- [ ] Considerar migración a Astro o Next.js
