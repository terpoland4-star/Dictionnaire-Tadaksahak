# Étape 3 — Découpage de app.js en modules ES
# Exécute ce script depuis la racine du repo Dictionnaire-Tadaksahak.
# AVANT de lancer : télécharge tadaksahak-js-modules.zip, index.html et sw.js
# depuis le chat, et place les 3 fichiers dans ton dossier Téléchargements
# (ne les déplace pas ailleurs, le script les trouve tout seul).

$ErrorActionPreference = "Stop"

Write-Host "== Vérification : es-tu bien à la racine du repo ? =="
if (-not (Test-Path "apps\web\index.html")) {
    Write-Host "Erreur : lance ce script depuis la racine du repo (apps\web\index.html introuvable)" -ForegroundColor Red
    exit 1
}

$downloads = "$env:USERPROFILE\Downloads"

Write-Host "== 1. Vérifier que les 3 fichiers téléchargés sont bien là =="
foreach ($f in @("tadaksahak-js-modules.zip", "index.html", "sw.js")) {
    if (-not (Test-Path "$downloads\$f")) {
        Write-Host "Erreur : $downloads\$f introuvable. Télécharge-le depuis le chat d'abord." -ForegroundColor Red
        exit 1
    }
}

Write-Host "== 2. Supprimer l'ancien app.js (remplacé par les modules) =="
git rm --quiet "apps/web/app.js"

Write-Host "== 3. Extraire les nouveaux modules JS dans apps/web/js/ =="
Expand-Archive -Path "$downloads\tadaksahak-js-modules.zip" -DestinationPath "apps\web" -Force
git add "apps/web/js"

Write-Host "== 4. Remplacer index.html et sw.js par les versions mises à jour =="
Copy-Item "$downloads\index.html" "apps\web\index.html" -Force
Copy-Item "$downloads\sw.js" "apps\web\sw.js" -Force
git add "apps/web/index.html" "apps/web/sw.js"

Write-Host "== 5. Commit =="
git add -A
git commit -m "Etape 3: decoupage de app.js (2739 lignes) en modules ES par domaine fonctionnel"

Write-Host ""
Write-Host "Terminé. Vérifie avec : git log -1 --stat" -ForegroundColor Green
Write-Host "Puis pousse avec : git push origin main" -ForegroundColor Green
