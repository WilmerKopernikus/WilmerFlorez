# Script para convertir imagenes a WebP
# Usa sharp-cli para conversion automatica

Write-Host "`nOptimizador de Imagenes - Conversion a WebP`n" -ForegroundColor Cyan

$quality = 85
$totalOriginal = 0
$totalWebP = 0
$filesProcessed = 0

Write-Host "Buscando imagenes en /imagenes/...`n" -ForegroundColor Yellow

$images = Get-ChildItem "imagenes" -Include "*.jpg","*.jpeg","*.png" -Recurse | 
          Where-Object { $_.Name -notlike "*webp*" }

Write-Host "Encontradas: $($images.Count) imagenes`n" -ForegroundColor Green
Write-Host "Calidad WebP: $quality%`n" -ForegroundColor Cyan
Write-Host "Iniciando conversion...`n" -ForegroundColor Yellow

foreach ($image in $images) {
    $outputPath = $image.FullName -replace '\.(jpg|jpeg|png)$', '.webp'
    
    if (Test-Path $outputPath) {
        Write-Host "  Ya existe: $($image.Name)" -ForegroundColor Gray
        continue
    }
    
    Write-Host "  Convirtiendo: $($image.Name)" -ForegroundColor White
    
    try {
        sharp -i $image.FullName -o $outputPath -f webp -q $quality 2>&1 | Out-Null
        
        if (Test-Path $outputPath) {
            $filesProcessed++
            $originalSize = $image.Length
            $webpSize = (Get-Item $outputPath).Length
            $totalOriginal += $originalSize
            $totalWebP += $webpSize
            $savings = [math]::Round((($originalSize - $webpSize) / $originalSize) * 100, 1)
            
            Write-Host "    Original: $([math]::Round($originalSize/1KB,2)) KB" -ForegroundColor Gray
            Write-Host "    WebP: $([math]::Round($webpSize/1KB,2)) KB (Ahorro: $savings%)`n" -ForegroundColor Green
        }
    } catch {
        Write-Host "    Error: $_`n" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "RESUMEN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Archivos procesados: $filesProcessed" -ForegroundColor Green
Write-Host "Tamano original: $([math]::Round($totalOriginal/1MB,2)) MB" -ForegroundColor Yellow
Write-Host "Tamano WebP: $([math]::Round($totalWebP/1MB,2)) MB" -ForegroundColor Green
Write-Host "Ahorro total: $([math]::Round(($totalOriginal - $totalWebP)/1MB,2)) MB ($([math]::Round((($totalOriginal - $totalWebP) / $totalOriginal) * 100, 1))%)" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
