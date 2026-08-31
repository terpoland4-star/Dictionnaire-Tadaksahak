import { state } from './state.js';
import { showToast } from './utils.js';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const swUrl = './sw.js';
    fetch(swUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          navigator.serviceWorker.register(swUrl)
            .then(reg => {
              console.log('SW enregistré', reg);
              reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showToast("🔄 Nouvelle version disponible ! Rafraîchissez la page.", "info");
                  }
                });
              });
            })
            .catch(err => console.warn('SW échec', err));
        } else {
          console.log('SW non trouvé (404), enregistrement ignoré');
        }
      })
      .catch(() => console.log('Impossible de vérifier sw.js'));
  }
}

export function showInstallBanner() {
  if (state.isAppInstalled) return;
  if (localStorage.getItem('installBannerDismissed') === 'true') return;
  const banner = document.createElement('div');
  banner.id = 'installBanner';
  banner.className = 'install-banner';
  banner.innerHTML = `
    <div class="install-banner-content">
      <img src="images/idaksahak_round.png" alt="Logo" width="40" height="40">
      <div class="install-banner-text">
        <strong>Installer Tadaksahak Learning</strong>
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
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installAppBtn')?.addEventListener('click', () => {
      banner.remove();
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          state.isAppInstalled = true;
        }
        deferredPrompt = null;
      });
    });
  });
}

window.addEventListener('appinstalled', () => {
  state.isAppInstalled = true;
  showToast("✅ Application installée ! Vous pouvez maintenant l'utiliser hors-ligne.", "success");
});

// ------------------------------
// RACCOURCIS CLAVIER
// ------------------------------
export function incrementVisitCount() {
  state.visitCounter++;
  localStorage.setItem('tadaksahak_visit_count', state.visitCounter);
  console.log(`👁️ Visite ${state.visitCounter}`);
  if (state.visitCounter >= 3 && !localStorage.getItem('tadaksahak_installed') && !localStorage.getItem('tadaksahak_install_dismissed')) {
    showAutoInstallBanner();
  }
}

export function showAutoInstallBanner() {
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
        <small>Utilisez l'application hors-ligne après ${state.visitCounter} visites</small>
      </div>
      <button id="autoInstallBtn" class="btn-install">📲 Installer</button>
      <button id="dismissAutoBtn" class="btn-dismiss">✖</button>
    </div>
  `;
  document.body.appendChild(banner);
  document.getElementById('autoInstallBtn')?.addEventListener('click', () => {
    if (state.installPromptEvent) {
      state.installPromptEvent.prompt();
      state.installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          localStorage.setItem('tadaksahak_installed', 'true');
          showToast("✅ Merci d'avoir installé l'application !", "success");
        }
        state.installPromptEvent = null;
      });
    } else {
      showToast("📲 Pour installer : Menu > Installer l'application", "info");
    }
    banner.remove();
    localStorage.setItem('tadaksahak_install_dismissed', 'true');
  });
  document.getElementById('dismissAutoBtn')?.addEventListener('click', () => {
    banner.remove();
    localStorage.setItem('tadaksahak_install_dismissed', 'true');
  });
}

export function checkForSWUpdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.update();
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data === 'update_available') {
          showToast("🔄 Une mise à jour est disponible. Rafraîchissez la page.", "info");
        }
      });
      setInterval(() => {
        registration.update();
        console.log('🔄 Vérification périodique des mises à jour');
      }, 6 * 60 * 60 * 1000);
    });
  }
}

export function handleSWUpdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showToast("🔄 Nouvelle version disponible ! Rafraîchissez la page.", "info");
            setTimeout(() => {
              if (confirm("Une nouvelle version est disponible. Rafraîchir maintenant ?")) {
                window.location.reload();
              }
            }, 3000);
          }
        });
      });
    });
  }
}

export function initAutoUpdates() {
  incrementVisitCount();
  checkForSWUpdate();
  handleSWUpdate();
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage('checkUpdate');
  }
}

// ------------------------------
// RESSOURCES ACADÉMIQUES
// ------------------------------
