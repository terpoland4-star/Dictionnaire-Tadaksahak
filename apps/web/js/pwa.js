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
    // Rechargement automatique et silencieux dès que le nouveau SW prend le
    // contrôle (skipWaiting + clients.claim côté sw.js). Un seul reload par
    // cycle de vie de page, pour éviter toute boucle si le navigateur émet
    // plusieurs événements controllerchange.
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
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
