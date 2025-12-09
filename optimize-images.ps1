# Script para convertir y optimizar imágenes a WebP
# Mantiene las originales como fallback para navegadores antiguos

Write-Host "`n🖼️  Optimizador de Imágenes - Conversión a WebP`n" -ForegroundColor Cyan

# Configuración
$quality = 85  # Calidad WebP (80-90 recomendado)
$totalOriginal = 0
$totalWebP = 0
$filesProcessed = 0

# Función para convertir imagen a WebP
function Convert-ToWebP {
    param(
        [string]$inputPath,
        [int]$quality = 85
    )
    
    $outputPath = $inputPath -replace '\.(jpg|jpeg|png)$', '.webp'
    
    # Si ya existe el WebP, saltar
    if (Test-Path $outputPath) {
        Write-Host "  ⏭️  Ya existe: $(Split-Path $outputPath -Leaf)" -ForegroundColor Gray
        return $null
    }
    
    try {
        # Convertir usando sharp-cli
        $result = sharp -i $inputPath -o $outputPath -f webp -q $quality 2>&1
        
        if (Test-Path $outputPath) {
            $originalSize = (Get-Item $inputPath).Length
            $webpSize = (Get-Item $outputPath).Length
            $savings = [math]::Round((($originalSize - $webpSize) / $originalSize) * 100, 1)
            
            return @{
                Original = $originalSize
                WebP = $webpSize
                Savings = $savings
                Path = $outputPath
            }
        }
    } catch {
        Write-Host "  ❌ Error: $_" -ForegroundColor Red
        return $null
    }
}

# Buscar todas las imágenes JPG/JPEG/PNG
Write-Host "📁 Buscando imágenes en /imagenes/...`n" -ForegroundColor Yellow

$images = Get-ChildItem "imagenes" -Include "*.jpg","*.jpeg","*.png" -Recurse | 
          Where-Object { $_.Name -notlike "*webp*" -and $_.Name -notlike "reverso*" }

Write-Host "✅ Encontradas: $($images.Count) imágenes`n" -ForegroundColor Green
Write-Host "⚙️  Configuración: Calidad WebP = $quality%`n" -ForegroundColor Cyan
Write-Host "🔄 Iniciando conversión...`n" -ForegroundColor Yellow

# Convertir cada imagen
foreach ($image in $images) {
    $fileName = $image.Name
    $relativePath = $image.FullName.Replace((Get-Location).Path, "").TrimStart('\')
    
    Write-Host "  📸 $relativePath" -ForegroundColor White
    
    $result = Convert-ToWebP -inputPath $image.FullName -quality $quality
    
    if ($result) {
        $filesProcessed++
        $totalOriginal += $result.Original
        $totalWebP += $result.WebP
        
        Write-Host "     Original: $([math]::Round($result.Original/1KB,2)) KB" -ForegroundColor Gray
        Write-Host "     WebP:     $([math]::Round($result.WebP/1KB,2)) KB" -ForegroundColor Green
        Write-Host "     Ahorro:   $($result.Savings)%`n" -ForegroundColor Cyan
    }
}

# Resumen final
Write-Host "`n" + "="*60 -ForegroundColor Cyan
Write-Host "📊 RESUMEN DE OPTIMIZACIÓN" -ForegroundColor Cyan
Write-Host "="*60 -ForegroundColor Cyan
Write-Host "✅ Archivos procesados:  $filesProcessed" -ForegroundColor Green
Write-Host "📦 Tamaño original:      $([math]::Round($totalOriginal/1MB,2)) MB" -ForegroundColor Yellow
Write-Host "🎯 Tamaño WebP:          $([math]::Round($totalWebP/1MB,2)) MB" -ForegroundColor Green
Write-Host "💾 Ahorro total:         $([math]::Round($totalOriginal - $totalWebP,0)/1MB) MB ($([math]::Round((($totalOriginal - $totalWebP) / $totalOriginal) * 100, 1))%)" -ForegroundColor Cyan
Write-Host "="*60 -ForegroundColor Cyan
Write-Host "`n✨ ¡Optimización completada!`n" -ForegroundColor Green

# Guardar log
$logPath = "image-optimization-log.txt"
$logContent = @"
Optimización de Imágenes - $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
================================================================
Archivos procesados: $filesProcessed
Tamaño original: $([math]::Round($totalOriginal/1MB,2)) MB
Tamaño WebP: $([math]::Round($totalWebP/1MB,2)) MB
Ahorro: $([math]::Round((($totalOriginal - $totalWebP) / $totalOriginal) * 100, 1))%
================================================================
"@

Set-Content -Path $logPath -Value $logContent
Write-Host "📝 Log guardado en: $logPath`n" -ForegroundColor Gray
