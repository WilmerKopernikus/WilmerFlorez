# Servidor de desarrollo local para probar Service Worker
# Los Service Workers solo funcionan con HTTPS o localhost

Write-Host "🚀 Iniciando servidor local para Wilmer Florez Portfolio..." -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Los Service Workers requieren:" -ForegroundColor Yellow
Write-Host "   1. Servidor HTTP (no abrir archivo directamente)" -ForegroundColor Yellow
Write-Host "   2. HTTPS o localhost" -ForegroundColor Yellow
Write-Host ""

# Verificar si Python está instalado
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Python detectado: $pythonVersion" -ForegroundColor Green
    Write-Host ""
    Write-Host "📡 Servidor disponible en:" -ForegroundColor Cyan
    Write-Host "   http://localhost:8000" -ForegroundColor White
    Write-Host ""
    Write-Host "🔍 Para ver el Service Worker:" -ForegroundColor Cyan
    Write-Host "   1. Abre DevTools (F12)" -ForegroundColor White
    Write-Host "   2. Ve a Application/Aplicación → Service Workers" -ForegroundColor White
    Write-Host ""
    Write-Host "🛑 Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
    Write-Host ""
    
    # Iniciar servidor Python
    python -m http.server 8000
} else {
    Write-Host "❌ Python no encontrado" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternativas:" -ForegroundColor Yellow
    Write-Host "1. Instalar Python: https://www.python.org/downloads/" -ForegroundColor White
    Write-Host "2. Usar Live Server (VS Code extension)" -ForegroundColor White
    Write-Host "3. Usar Node.js: npx serve" -ForegroundColor White
    Write-Host ""
    Read-Host "Presiona Enter para salir"
}
