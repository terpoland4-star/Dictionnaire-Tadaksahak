# Étape 4b — Vraie refonte structurelle : navigation à 5 pôles
# (remplace le menu déroulant par une navigation visuelle réelle)
# + correction d'un bug de BOM dans package.json
# Télécharge index.html, i18n-data.js, navigation.js, style.css, package.json
# depuis le chat, laisse-les dans Téléchargements, puis lance ce script.

$ErrorActionPreference = "Stop"

Write-Host "== Vérification =="
if (-not (Test-Path "apps\web\style.css")) {
    Write-Host "Erreur : lance ce script depuis la racine du repo" -ForegroundColor Red
    exit 1
}

$downloads = "$env:USERPROFILE\Downloads"
$files = @{
    "index.html"     = "apps\web\index.html"
    "i18n-data.js"   = "apps\web\js\i18n-data.js"
    "navigation.js"  = "apps\web\js\navigation.js"
    "style.css"      = "apps\web\style.css"
    "package.json"   = "package.json"
}

foreach ($f in $files.Keys) {
    if (-not (Test-Path "$downloads\$f")) {
        Write-Host "Erreur : $downloads\$f introuvable. Télécharge-le depuis le chat d'abord." -ForegroundColor Red
        exit 1
    }
}

Write-Host "== Remplacement des fichiers =="
foreach ($f in $files.Keys) {
    Copy-Item "$downloads\$f" $files[$f] -Force
}

Write-Host "== Commit =="
git add -A
git commit -m "Etape 4b: navigation structurelle a 5 poles (remplace le menu deroulant), correction BOM package.json"

Write-Host ""
Write-Host "Terminé. Vérifie avec : git log -1 --stat" -ForegroundColor Green
Write-Host "Puis pousse avec : git push origin main" -ForegroundColor Green
