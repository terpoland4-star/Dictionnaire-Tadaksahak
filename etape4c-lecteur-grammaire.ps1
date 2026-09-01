# Étape 4c — Refonte du lecteur de grammaire (sommaire + page de lecture,
# citation académique des sources, correction d'un bug de bouton tronqué)
# Télécharge index.html, grammar.js, state.js, style.css depuis le chat.

$ErrorActionPreference = "Stop"

Write-Host "== Vérification =="
if (-not (Test-Path "apps\web\style.css")) {
    Write-Host "Erreur : lance ce script depuis la racine du repo" -ForegroundColor Red
    exit 1
}

$downloads = "$env:USERPROFILE\Downloads"
$files = @{
    "index.html"  = "apps\web\index.html"
    "grammar.js"  = "apps\web\js\grammar.js"
    "state.js"    = "apps\web\js\state.js"
    "style.css"   = "apps\web\style.css"
}

foreach ($f in $files.Keys) {
    if (-not (Test-Path "$downloads\$f")) {
        Write-Host "Erreur : $downloads\$f introuvable." -ForegroundColor Red
        exit 1
    }
}

Write-Host "== Remplacement des fichiers =="
foreach ($f in $files.Keys) {
    Copy-Item "$downloads\$f" $files[$f] -Force
}

Write-Host "== Commit =="
git add -A
git commit -m "Etape 4c: refonte du lecteur de grammaire (sommaire + page de lecture), citation academique des sources"

Write-Host ""
Write-Host "Terminé. Pousse avec : git push origin main" -ForegroundColor Green
