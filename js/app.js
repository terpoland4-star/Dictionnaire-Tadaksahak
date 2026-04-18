// ============================================
// APPLICATION TADAKSAHAK LEARNING
// POINT D'ENTRÉE PRINCIPAL
// Version modulaire
// ============================================

console.log("🚀 Démarrage de l'application modulaire...");

// Attendre le chargement du DOM
document.addEventListener('DOMContentLoaded', async () => {
  
  // Initialiser les modules core
  if (window.initTheme) window.initTheme();
  if (window.initThemeSettings) window.initThemeSettings();
  if (window.detectSystemTheme) window.detectSystemTheme();
  if (window.initNavigation) window.initNavigation();
  
  // Charger les données
  if (window.chargerDictionnaire) await window.chargerDictionnaire();
  if (window.chargerGrammaire) await window.chargerGrammaire();
  if (window.chargerContes) await window.chargerContes();
  if (window.chargerEmissions) await window.chargerEmissions();
  if (window.chargerThemes) await window.chargerThemes();
  if (window.chargerLivresConnaissance) await window.chargerLivresConnaissance();
  if (window.chargerTimeline) await window.chargerTimeline();
  if (window.chargerRelatives) await window.chargerRelatives();
  
  // Charger les données utilisateur
  if (window.chargerHistorique) window.chargerHistorique();
  if (window.chargerFavoris) window.chargerFavoris();
  
  // Initialiser les modules UI
  if (window.genererAlbumsAudio) window.genererAlbumsAudio();
  if (window.registerServiceWorker) window.registerServiceWorker();
  if (window.requestNotificationPermission) window.requestNotificationPermission();
  if (window.showWordNotification) window.showWordNotification();
  if (window.afficherMotDuJour) window.afficherMotDuJour();
  if (window.initFlashcards) window.initFlashcards();
  if (window.initAutoUpdates) window.initAutoUpdates();
  if (window.initKeyboardShortcuts) window.initKeyboardShortcuts();
  
  // Écouteurs d'événements
  document.getElementById("btnEnvoyer")?.addEventListener("click", window.traiterSaisie);
  document.getElementById("chatInput")?.addEventListener("keypress", e => e.key === "Enter" && window.traiterSaisie());
  document.getElementById("btnPrev")?.addEventListener("click", window.navigationPrecedent);
  document.getElementById("btnNext")?.addEventListener("click", window.navigationSuivant);
  document.getElementById("btnGoDico")?.addEventListener("click", () => { 
    if (window.sectionSelector) {
      window.sectionSelector.value = "dictionnaire";
      window.sectionSelector.dispatchEvent(new Event("change"));
    }
  });
  document.getElementById("toggleChatBot")?.addEventListener("click", () => { 
    if (window.sectionSelector) {
      window.sectionSelector.value = "chat";
      window.sectionSelector.dispatchEvent(new Event("change"));
    }
  });
  
  // Sélecteurs de langue
  document.querySelectorAll('.lang-flag').forEach(btn => { 
    btn.addEventListener('click', () => {
      if (window.setLanguage) window.setLanguage(btn.dataset.lang);
    });
  });
  
  // Initialiser la langue
  if (window.setLanguage) window.setLanguage(window.currentLanguage || 'fr');
  
  // Recherche dans les livres
  const searchBooksInput = document.getElementById("searchBooksInput");
  if (searchBooksInput) searchBooksInput.addEventListener("input", () => {
    if (window.rechercherPleinTexte) window.rechercherPleinTexte();
  });
  
  // Bannière d'installation
  setTimeout(() => {
    if (window.showInstallBanner) window.showInstallBanner();
  }, 3000);
  
  // Pop-up de bienvenue
  setTimeout(() => {
    if (window.showRessourcesWelcomePopup) window.showRessourcesWelcomePopup();
  }, 2000);
  
  console.log("✅ Application modulaire prête !");
  console.log("📚 Module des propositions relatives intégré (Christiansen & Levinsohn 2003)");
  console.log("📚 Section Ressources académiques intégrée");
});
