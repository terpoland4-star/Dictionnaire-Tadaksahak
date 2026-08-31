# Étape 2 — Structure monorepo (apps/web + apps/api)
# Script PowerShell natif — pas besoin de bash/WSL/Git Bash.
# À exécuter depuis la racine de ton clone local, APRÈS avoir extrait
# tadaksahak-api-scaffold.zip dans un dossier "tadaksahak-api-scaffold"
# placé À CÔTÉ (pas dedans) du dossier Dictionnaire-Tadaksahak.

$ErrorActionPreference = "Stop"

Write-Host "== Vérification : es-tu bien à la racine du repo ? =="
if (-not (Test-Path "index.html")) {
    Write-Host "Erreur : lance ce script depuis la racine du repo (index.html introuvable)" -ForegroundColor Red
    exit 1
}

Write-Host "== 1. Créer apps/web et apps/api =="
New-Item -ItemType Directory -Force -Path "apps/web" | Out-Null
New-Item -ItemType Directory -Force -Path "apps/api" | Out-Null

Write-Host "== 2. Déplacer tout le front existant dans apps/web =="
$frontItems = @(
    "alphabetIndex.js", "app.js", "data", "ia_locale.js", "images",
    "index.html", "livres", "livres.json", "manifest.webmanifest",
    "offline.html", "style.css", "sw.js"
)
foreach ($item in $frontItems) {
    if (Test-Path $item) {
        git mv $item "apps/web/$item"
    } else {
        Write-Host "  (ignoré, introuvable : $item)" -ForegroundColor Yellow
    }
}

Write-Host "== 3. Copier le scaffold de l'API =="
$scaffoldPath = "../tadaksahak-api-scaffold"
if (-not (Test-Path $scaffoldPath)) {
    Write-Host "Erreur : dossier $scaffoldPath introuvable." -ForegroundColor Red
    Write-Host "Extrait d'abord tadaksahak-api-scaffold.zip à côté de ce repo (pas dedans)." -ForegroundColor Red
    exit 1
}
Copy-Item -Path "$scaffoldPath/*" -Destination "apps/api/" -Recurse -Force
git add apps/api

Write-Host "== 4. package.json racine (pilote les deux apps) =="
$pkgJson = @'
{
  "name": "tadaksahak-learning",
  "private": true,
  "version": "1.0.0",
  "description": "Monorepo Tadaksahak Learning : apps/web (PWA statique) + apps/api (contributions communautaires)",
  "scripts": {
    "api:install": "npm install --prefix apps/api",
    "api:dev": "npm run dev --prefix apps/api",
    "api:start": "npm start --prefix apps/api",
    "api:migrate": "npm run migrate --prefix apps/api"
  }
}
'@
Set-Content -Path "package.json" -Value $pkgJson -Encoding UTF8
git add package.json

Write-Host "== 5. Commit =="
git add -A
git commit -m "Etape 2: structure monorepo (apps/web + apps/api), scaffold API Express/PostgreSQL pour les contributions communautaires"

Write-Host ""
Write-Host "Terminé. Vérifie avec : git log -1 --stat" -ForegroundColor Green
Write-Host "Puis pousse avec : git push origin main" -ForegroundColor Green
