# Étape 4 — Système de design (palette indigo/ocre, typographie Fraunces+Inter+Noto Arabic)
# Télécharge d'abord index.html, manifest.webmanifest et style.css depuis le chat,
# laisse-les dans ton dossier Téléchargements, puis lance ce script depuis la
# racine du repo.

$ErrorActionPreference = "Stop"

Write-Host "== Vérification : es-tu bien à la racine du repo ? =="
if (-not (Test-Path "apps\web\style.css")) {
    Write-Host "Erreur : lance ce script depuis la racine du repo" -ForegroundColor Red
    exit 1
}

$downloads = "$env:USERPROFILE\Downloads"

foreach ($f in @("index.html", "manifest.webmanifest", "style.css")) {
    if (-not (Test-Path "$downloads\$f")) {
        Write-Host "Erreur : $downloads\$f introuvable. Télécharge-le depuis le chat d'abord." -ForegroundColor Red
        exit 1
    }
}

Write-Host "== Remplacement des 3 fichiers =="
Copy-Item "$downloads\index.html" "apps\web\index.html" -Force
Copy-Item "$downloads\manifest.webmanifest" "apps\web\manifest.webmanifest" -Force
Copy-Item "$downloads\style.css" "apps\web\style.css" -Force

Write-Host "== Commit =="
git add -A
git commit -m "Etape 4: systeme de design (palette indigo/ocre, typographie Fraunces + Inter + Noto Arabic)"

Write-Host ""
Write-Host "Terminé. Vérifie avec : git log -1 --stat" -ForegroundColor Green
Write-Host "Puis pousse avec : git push origin main" -ForegroundColor Green
