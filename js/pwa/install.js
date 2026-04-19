// ============================================
// PWA - GESTION DE L'INSTALLATION
// Bannière d'installation, compteur de visites, auto-install
// ============================================

let deferredPrompt = null;
let isAppInstalled = false;
let visitCounter = 0;

// ------------------------------
// CONFIGURATION
// ------------------------------
const INSTALL_CONFIG = {
  visitsBeforePrompt: 3,
  promptDelay: 3000,
  bannerDismissalDays: 7
};

// ------------------------------
// COMPTEUR DE VISITES
// ------------------------------
function incrementVisitCount() {
  visitCounter = parseInt(localStorage.getItem('tadaksahak_visit_count') || '0');
  visitCounter++;
  localStorage.setItem('tadaksahak_visit_count', visitCounter);
  console.log(`👁️ Visite ${visitCounter}`);
  
  // Notifier le Service Worker
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'incrementVisit' });
  }
  
  // Vérifier si on doit afficher la bannière d'installation
  if (visitCounter >= INSTALL_CONFIG.visitsBeforePrompt && 
      !localStorage.getItem('tadaksahak_installed') && 
      !localStorage.getItem('tadaksahak_install_dismissed')) {
    showAutoInstallBanner();
  }
}

// ------------------------------
// BANNIÈRE D'INSTALLATION MANUELLE
// ------------------------------
function showInstallBanner() {
  if (isAppInstalled) return;
  if (localStorage.getItem('installBannerDismissed') === 'true') return;
  
  const banner = document.createElement('div');
  banner.id = 'installBanner';
  banner.className = 'install-banner';
  banner.innerHTML = `
    <div class="install-banner-content">
      <img src="images/idaksahak_round.png" alt="Logo" width="40" height="40">
      <div class="install-banner-text">
        <strong>📱 Installer Tadaksahak Learning</strong>
        <small>Utilisez l'application hors-ligne</small>
      </div>
      <button id="installAppBtn" class="btn-install">📲 Installer</button>
      <button id="dismissBannerBtn" class="btn-dismiss">✖</button>
    </div>
  `;
  
  document.body.appendChild(banner);
  
  document.getElementById('dismissBannerBtn')?.addEventListener('click', () => {
    banner.remove();
    localStorage.setItem('installBannerDismissed', 'true');
  });
  
  document.getElementById('installAppBtn')?.addEventListener('click', () => {
    if (deferredPrompt) {
      banner.remove();
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          isAppInstalled = true;
          localStorage.setItem('tadaksahak_installed', 'true');
          if (window.showToast) window.showToast("✅ Merci d'avoir installé l'application !", "success");
        }
        deferredPrompt = null;
      });
    } else {
      if (window.showToast) window.showToast("📲 Pour installer : Menu > Installer l'application", "info");
      banner.remove();
    }
  });
}

// ------------------------------
// BANNIÈRE D'INSTALLATION AUTO (après 3 visites)
// ------------------------------
function showAutoInstallBanner() {
  const existingBanner = document.getElementById('autoInstallBanner');
  if (existingBanner) existingBanner.remove();
  
  const banner = document.createElement('div');
  banner.id = 'autoInstallBanner';
  banner.className = 'install-banner auto';
  banner.innerHTML = `
    <div class="install-banner-content">
      <img src="images/idaksahak_round.png" alt="Logo" width="40" height="40">
      <div class="install-banner-text">
        <strong>📱 Installer Tadaksahak Learning</strong>
        <small>Utilisez l'application hors-ligne après ${visitCounter} visites</small>
      </div>
      <button id="autoInstallBtn" class="btn-install">📲 Installer</button>
      <button id="dismissAutoBtn" class="btn-dismiss">✖</button>
    </div>
  `;
  
  document.body.appendChild(banner);
  
  document.getElementById('autoInstallBtn')?.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          localStorage.setItem('tadaksahak_installed', 'true');
          if (window.showToast) window.showToast("✅ Merci d'avoir installé l'application !", "success");
        }
        deferredPrompt = null;
      });
    } else {
      if (window.showToast) window.showToast("📲 Pour installer : Menu > Installer l'application", "info");
    }
    banner.remove();
    localStorage.setItem('tadaksahak_install_dismissed', 'true');
  });
  
  document.getElementById('dismissAutoBtn')?.addEventListener('click', () => {
    banner.remove();
    localStorage.setItem('tadaksahak_install_dismissed', 'true');
  });
}

// ------------------------------
// ÉCOUTEUR D'INSTALLATION
// ------------------------------
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('📲 Installation possible');
  
  // Afficher la bannière après un délai
  setTimeout(() => {
    if (!isAppInstalled && !localStorage.getItem('installBannerDismissed')) {
      showInstallBanner();
    }
  }, INSTALL_CONFIG.promptDelay);
});

window.addEventListener('appinstalled', () => {
  isAppInstalled = true;
  localStorage.setItem('tadaksahak_installed', 'true');
  if (window.showToast) window.showToast("✅ Application installée ! Vous pouvez maintenant l'utiliser hors-ligne.", "success");
  
  // Supprimer les bannières existantes
  const banners = document.querySelectorAll('.install-banner');
  banners.forEach(banner => banner.remove());
});

// ------------------------------
// VÉRIFICATION SI L'APPLICATION EST DÉJÀ INSTALLÉE
// ------------------------------
function checkIfInstalled() {
  // Vérifier si en mode standalone (PWA installée)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    isAppInstalled = true;
    localStorage.setItem('tadaksahak_installed', 'true');
  }
  
  // Écouter les changements de mode d'affichage
  window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
    if (e.matches) {
      isAppInstalled = true;
      localStorage.setItem('tadaksahak_installed', 'true');
    }
  });
}

// ------------------------------
// INITIALISATION
// ------------------------------
function initPWAInstall() {
  incrementVisitCount();
  checkIfInstalled();
}

// ------------------------------
// EXPORT
// ------------------------------
window.showInstallBanner = showInstallBanner;
window.showAutoInstallBanner = showAutoInstallBanner;
window.initPWAInstall = initPWAInstall;
window.isAppInstalled = () => isAppInstalled;

// Initialisation automatique
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPWAInstall);
} else {
  initPWAInstall();
}

console.log("📦 Module Installation PWA prêt");
