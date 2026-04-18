// ============================================
// APPLICATION TADAKSAHAK LEARNING
// POINT D'ENTRÉE PRINCIPAL
// Version modulaire avec gestion d'erreurs et fallbacks
// ============================================

console.log("🚀 Démarrage de l'application modulaire...");

// ------------------------------
// ÉTAT DE L'APPLICATION
// ------------------------------
let appInitialized = false;
let appErrors = [];
let loadingStartTime = Date.now();

// ------------------------------
// GESTIONNAIRE D'ERREURS
// ------------------------------
function logError(module, error) {
  const errorMsg = `❌ [${module}] ${error.message || error}`;
  console.error(errorMsg);
  appErrors.push({ module, error: error.message || error, timestamp: Date.now() });
  
  // Afficher un toast pour l'utilisateur
  if (window.showErrorToast) {
    window.showErrorToast(`Erreur: ${module} - ${error.message?.substring(0, 50) || 'Inconnue'}`);
  }
}

function logSuccess(module, message) {
  console.log(`✅ [${module}] ${message}`);
}

// ------------------------------
// VÉRIFICATION DES PRÉREQUIS
// ------------------------------
function checkPrerequisites() {
  const requiredGlobals = [
    'i18n', 't', 'currentLanguage',
    'escapeHtml', 'normalizeText', 'levenshtein', 'showToast', 'showLoader', 'hideLoader'
  ];
  
  const missing = requiredGlobals.filter(global => !window[global]);
  
  if (missing.length > 0) {
    console.warn(`⚠️ Modules manquants: ${missing.join(', ')}`);
    return false;
  }
  
  console.log("✅ Tous les prérequis sont satisfaits");
  return true;
}

// ------------------------------
// CHARGEMENT SÉQUENTIEL AVEC FALLBACK
// ------------------------------
async function chargerModule(moduleName, loaderFunction, fallbackFunction = null) {
  try {
    if (typeof loaderFunction === 'function') {
      await loaderFunction();
      logSuccess(moduleName, `Chargé avec succès`);
      return true;
    }
    return false;
  } catch (error) {
    logError(moduleName, error);
    if (fallbackFunction && typeof fallbackFunction === 'function') {
      console.log(`🔄 Utilisation du fallback pour ${moduleName}`);
      fallbackFunction();
    }
    return false;
  }
}

// ------------------------------
// INITIALISATION DES MODULES CORE
// ------------------------------
async function initCoreModules() {
  console.log("📦 Initialisation des modules core...");
  
  // Thèmes
  if (window.initTheme) {
    try {
      window.initTheme();
      logSuccess("Themes", "Thèmes initialisés");
    } catch(e) { logError("Themes", e); }
  }
  
  if (window.initThemeSettings) {
    try {
      window.initThemeSettings();
      logSuccess("ThemeSettings", "Paramètres thème initialisés");
    } catch(e) { logError("ThemeSettings", e); }
  }
  
  if (window.detectSystemTheme) {
    try {
      window.detectSystemTheme();
      logSuccess("SystemTheme", "Thème système détecté");
    } catch(e) { logError("SystemTheme", e); }
  }
  
  // Navigation
  if (window.initNavigation) {
    try {
      window.initNavigation();
      logSuccess("Navigation", "Navigation initialisée");
    } catch(e) { logError("Navigation", e); }
  }
}

// ------------------------------
// CHARGEMENT DES DONNÉES
// ------------------------------
async function loadDataModules() {
  console.log("💾 Chargement des données...");
  
  const dataModules = [
    { name: "Dictionnaire", loader: window.chargerDictionnaire, fallback: null },
    { name: "Grammaire", loader: window.chargerGrammaire, fallback: null },
    { name: "Contes", loader: window.chargerContes, fallback: null },
    { name: "Émissions", loader: window.chargerEmissions, fallback: null },
    { name: "Thèmes", loader: window.chargerThemes, fallback: null },
    { name: "LivresConnaissance", loader: window.chargerLivresConnaissance, fallback: null },
    { name: "Timeline", loader: window.chargerTimeline, fallback: null },
    { name: "Relatives", loader: window.chargerRelatives, fallback: null }
  ];
  
  for (const module of dataModules) {
    await chargerModule(module.name, module.loader, module.fallback);
    // Petit délai entre les chargements pour ne pas surcharger
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

// ------------------------------
// CHARGEMENT DES DONNÉES UTILISATEUR
// ------------------------------
function loadUserData() {
  console.log("👤 Chargement des données utilisateur...");
  
  if (window.chargerHistorique) {
    try {
      window.chargerHistorique();
      logSuccess("Historique", "Historique chargé");
    } catch(e) { logError("Historique", e); }
  }
  
  if (window.chargerFavoris) {
    try {
      window.chargerFavoris();
      logSuccess("Favoris", "Favoris chargés");
    } catch(e) { logError("Favoris", e); }
  }
}

// ------------------------------
// INITIALISATION DES MODULES UI
// ------------------------------
function initUIModules() {
  console.log("🎨 Initialisation des modules UI...");
  
  const uiModules = [
    { name: "AlbumsAudio", fn: window.genererAlbumsAudio },
    { name: "ServiceWorker", fn: window.registerServiceWorker },
    { name: "NotificationPermission", fn: window.requestNotificationPermission },
    { name: "WordNotification", fn: window.showWordNotification },
    { name: "MotDuJour", fn: window.afficherMotDuJour },
    { name: "Flashcards", fn: window.initFlashcards },
    { name: "AutoUpdates", fn: window.initAutoUpdates },
    { name: "KeyboardShortcuts", fn: window.initKeyboardShortcuts }
  ];
  
  for (const module of uiModules) {
    if (typeof module.fn === 'function') {
      try {
        module.fn();
        logSuccess(module.name, "Initialisé");
      } catch(e) { logError(module.name, e); }
    }
  }
}

// ------------------------------
// CONFIGURATION DES ÉCOUTEURS D'ÉVÉNEMENTS
// ------------------------------
function setupEventListeners() {
  console.log("🔊 Configuration des écouteurs d'événements...");
  
  // Bouton envoyer du chat
  const btnEnvoyer = document.getElementById("btnEnvoyer");
  if (btnEnvoyer && window.traiterSaisie) {
    btnEnvoyer.addEventListener("click", window.traiterSaisie);
    logSuccess("Events", "BtnEnvoyer configuré");
  } else if (btnEnvoyer && !window.traiterSaisie) {
    console.warn("⚠️ window.traiterSaisie non disponible");
  }
  
  // Input chat (touche Entrée)
  const chatInput = document.getElementById("chatInput");
  if (chatInput && window.traiterSaisie) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") window.traiterSaisie();
    });
    logSuccess("Events", "ChatInput configuré");
  }
  
  // Navigation dictionnaire
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  
  if (btnPrev && window.navigationPrecedent) {
    btnPrev.addEventListener("click", window.navigationPrecedent);
  }
  
  if (btnNext && window.navigationSuivant) {
    btnNext.addEventListener("click", window.navigationSuivant);
  }
  
  // Bouton Accès Dictionnaire
  const btnGoDico = document.getElementById("btnGoDico");
  if (btnGoDico && window.sectionSelector) {
    btnGoDico.addEventListener("click", () => {
      window.sectionSelector.value = "dictionnaire";
      window.sectionSelector.dispatchEvent(new Event("change"));
    });
    logSuccess("Events", "BtnGoDico configuré");
  }
  
  // Bouton Chat flottant
  const toggleChat = document.getElementById("toggleChatBot");
  if (toggleChat && window.sectionSelector) {
    toggleChat.addEventListener("click", () => {
      window.sectionSelector.value = "chat";
      window.sectionSelector.dispatchEvent(new Event("change"));
    });
    logSuccess("Events", "ToggleChat configuré");
  }
  
  // Sélecteurs de langue
  const langFlags = document.querySelectorAll('.lang-flag');
  if (langFlags.length && window.setLanguage) {
    langFlags.forEach(btn => {
      btn.addEventListener('click', () => {
        window.setLanguage(btn.dataset.lang);
      });
    });
    logSuccess("Events", `LangFlags configurés (${langFlags.length})`);
  }
  
  // Recherche dans les livres
  const searchBooksInput = document.getElementById("searchBooksInput");
  if (searchBooksInput && window.rechercherPleinTexte) {
    searchBooksInput.addEventListener("input", () => {
      window.rechercherPleinTexte();
    });
    logSuccess("Events", "SearchBooks configuré");
  }
}

// ------------------------------
// INITIALISATION DE LA LANGUE
// ------------------------------
function initLanguage() {
  if (window.setLanguage) {
    const savedLang = window.currentLanguage || localStorage.getItem('app_language') || 'fr';
    window.setLanguage(savedLang);
    logSuccess("Language", `Langue initialisée: ${savedLang}`);
  } else {
    console.warn("⚠️ window.setLanguage non disponible");
  }
}

// ------------------------------
// AFFICHAGE DES STATISTIQUES DE CHARGEMENT
// ------------------------------
function displayLoadingStats() {
  const loadingTime = Date.now() - loadingStartTime;
  console.log(`⏱️ Temps de chargement total: ${loadingTime}ms`);
  
  if (appErrors.length > 0) {
    console.warn(`⚠️ ${appErrors.length} erreur(s) rencontrée(s) pendant le chargement`);
  } else {
    console.log("✨ Aucune erreur - Chargement parfait !");
  }
  
  // Afficher dans l'interface si disponible
  const statsContainer = document.getElementById("loadingStats");
  if (statsContainer) {
    statsContainer.innerHTML = `
      <small>Chargé en ${loadingTime}ms | ${appErrors.length} erreur(s)</small>
    `;
  }
}

// ------------------------------
// FONCTION PRINCIPALE
// ------------------------------
async function initialiserApplication() {
  console.log("🔧 Début de l'initialisation...");
  
  // Afficher le loader
  if (window.showLoader) window.showLoader();
  
  try {
    // 1. Vérifier les prérequis
    if (!checkPrerequisites()) {
      console.warn("⚠️ Certains modules core sont manquants, tentative de chargement partiel...");
    }
    
    // 2. Initialiser les modules core
    await initCoreModules();
    
    // 3. Charger les données
    await loadDataModules();
    
    // 4. Charger les données utilisateur
    loadUserData();
    
    // 5. Initialiser les modules UI
    initUIModules();
    
    // 6. Configurer les écouteurs d'événements
    setupEventListeners();
    
    // 7. Initialiser la langue
    initLanguage();
    
    // 8. Bannières et pop-ups (délais)
    setTimeout(() => {
      if (window.showInstallBanner) window.showInstallBanner();
    }, 3000);
    
    setTimeout(() => {
      if (window.showRessourcesWelcomePopup) window.showRessourcesWelcomePopup();
    }, 2000);
    
    // 9. Mot du jour (répéter toutes les heures)
    if (window.afficherMotDuJour) {
      setInterval(() => {
        window.afficherMotDuJour();
      }, 3600000);
    }
    
    // 10. Marquer l'application comme prête
    appInitialized = true;
    
    // 11. Afficher les stats
    displayLoadingStats();
    
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎉 APPLICATION TADAKSAHAK LEARNING - PRÊTE !");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📚 Module des propositions relatives intégré (Christiansen & Levinsohn 2003)");
    console.log("🎙️ Section Ressources académiques intégrée");
    console.log("🃏 Flashcards avec statistiques et progression");
    console.log("💬 Chat bot conversationnel multilingue");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
  } catch (error) {
    console.error("❌ Erreur critique lors de l'initialisation:", error);
    logError("Application", error);
    
    if (window.showErrorToast) {
      window.showErrorToast("Erreur critique, vérifiez la console");
    }
  } finally {
    // Cacher le loader
    if (window.hideLoader) {
      setTimeout(() => window.hideLoader(), 500);
      setTimeout(() => window.hideLoader(), 2000);
    }
  }
}

// ------------------------------
// DÉMARRAGE
// ------------------------------
// Attendre que le DOM soit chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiserApplication);
} else {
  initialiserApplication();
}

// ------------------------------
// EXPORT (pour compatibilité)
// ------------------------------
window.appInitialized = () => appInitialized;
window.appErrors = () => [...appErrors];

console.log("📦 Module app.js chargé, en attente du DOMContentLoaded...");
