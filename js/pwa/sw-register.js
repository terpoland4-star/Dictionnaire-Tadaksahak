// ============================================
// PWA - SERVICE WORKER REGISTRATION
// ============================================

let swRegistration = null;
let swUpdateAvailable = false;

// ------------------------------
// ENREGISTREMENT DU SERVICE WORKER
// ------------------------------
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('⚠️ Service Worker non supporté par ce navigateur');
    return false;
  }
  
  const swUrl = './sw.js';
  
  // Vérifier si le fichier existe avant d'enregistrer
  fetch(swUrl, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        return navigator.serviceWorker.register(swUrl);
      }
      console.log('⚠️ sw.js non trouvé (404), enregistrement ignoré');
      return null;
    })
    .then(registration => {
      if (registration) {
        swRegistration = registration;
        console.log('✅ Service Worker enregistré:', registration.scope);
        
        // Vérifier les mises à jour
        checkForUpdates();
        
        // Écouter les mises à jour
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔄 Nouvelle version du Service Worker détectée');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              swUpdateAvailable = true;
              console.log('🔄 Nouvelle version disponible !');
              
              // Afficher une notification à l'utilisateur
              if (window.showToast) {
                window.showToast("🔄 Nouvelle version disponible ! Rafraîchissez la page.", "info");
              }
              
              // Option: proposer le rechargement
              setTimeout(() => {
                if (confirm("Une nouvelle version est disponible. Rafraîchir maintenant ?")) {
                  window.location.reload();
                }
              }, 3000);
            }
          });
        });
        
        return true;
      }
      return false;
    })
    .catch(error => {
      console.error('❌ Erreur d\'enregistrement du Service Worker:', error);
      return false;
    });
  
  return true;
}

// ------------------------------
// VÉRIFICATION DES MISES À JOUR
// ------------------------------
function checkForUpdates() {
  if (!swRegistration) return;
  
  setInterval(() => {
    swRegistration.update()
      .then(() => {
        console.log('🔄 Vérification périodique des mises à jour effectuée');
      })
      .catch(err => {
        console.warn('⚠️ Erreur lors de la vérification des mises à jour:', err);
      });
  }, 6 * 60 * 60 * 1000); // Toutes les 6 heures
}

// ------------------------------
// FORCER LA MISE À JOUR
// ------------------------------
function forceSWUpdate() {
  if (swRegistration && swRegistration.waiting) {
    swRegistration.waiting.postMessage('skipWaiting');
    window.location.reload();
  } else if (swRegistration) {
    swRegistration.update().then(() => {
      console.log('🔄 Mise à jour forcée demandée');
      if (swRegistration.waiting) {
        swRegistration.waiting.postMessage('skipWaiting');
        window.location.reload();
      }
    });
  }
}

// ------------------------------
// VIDER LES CACHES
// ------------------------------
function clearAllCaches() {
  if (swRegistration && swRegistration.active) {
    swRegistration.active.postMessage('clearCache');
    if (window.showToast) window.showToast("🗑️ Caches vidés, rechargement...", "info");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } else {
    // Fallback: supprimer les caches manuellement
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
      });
      if (window.showToast) window.showToast("🗑️ Caches vidés", "success");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }
}

// ------------------------------
// OBTENIR LA VERSION DU CACHE
// ------------------------------
function getSWVersion() {
  return new Promise((resolve) => {
    if (swRegistration && swRegistration.active) {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.version);
      };
      swRegistration.active.postMessage('getVersion', [messageChannel.port2]);
    } else {
      resolve('unknown');
    }
  });
}

// ------------------------------
// ÉCOUTER LES MESSAGES DU SERVICE WORKER
// ------------------------------
if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data === 'update_available') {
      console.log('🔄 Mise à jour disponible depuis le SW');
      swUpdateAvailable = true;
      if (window.showToast) {
        window.showToast("🔄 Une mise à jour est disponible. Rafraîchissez la page.", "info");
      }
    }
  });
  
  // Prendre le contrôle immédiatement
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('🔄 Nouveau Service Worker actif');
    window.location.reload();
  });
}

// ------------------------------
// EXPORT
// ------------------------------
window.registerServiceWorker = registerServiceWorker;
window.checkForUpdates = checkForUpdates;
window.forceSWUpdate = forceSWUpdate;
window.clearAllCaches = clearAllCaches;
window.getSWVersion = getSWVersion;
window.swUpdateAvailable = () => swUpdateAvailable;

console.log("📦 Module Service Worker prêt");
