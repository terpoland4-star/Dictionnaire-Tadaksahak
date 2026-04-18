// ============================================
// UI - NAVIGATION ENTRE SECTIONS
// ============================================

const sectionSelector = document.getElementById("sectionSelector");

function initNavigation() {
  if (!sectionSelector) return;
  const sections = document.querySelectorAll("main > section");
  
  function showSection(id) {
    sections.forEach(sec => { sec.hidden = sec.id !== id; });
    localStorage.setItem("tadaksahak_active_section", id);
    
    // Appel des fonctions d'affichage selon la section
    if (id === "grammaire") {
      document.getElementById("grammaireContainer").hidden = false;
      document.getElementById("relativesContainer").hidden = true;
      if (window.grammaire) window.afficherGrammairePremium();
      else window.chargerGrammaire?.().then(() => window.afficherGrammairePremium());
    }
    if (id === "relatives") {
      document.getElementById("grammaireContainer").hidden = true;
      document.getElementById("relativesContainer").hidden = false;
      if (window.relativesData) window.afficherRelatives();
      else window.chargerRelatives?.().then(() => window.afficherRelatives());
    }
    if (id === "livres" && window.afficherLivres) window.afficherLivres();
    if (id === "audio" && window.genererAlbumsAudio) window.genererAlbumsAudio();
    if (id === "photos" && window.afficherPhotos) window.afficherPhotos();
    if (id === "videos" && window.genererVideos) window.genererVideos();
    if (id === "quiz" && window.chargerQuiz) window.chargerQuiz();
    if (id === "timeline" && window.afficherTimeline) window.afficherTimeline();
    if (id === "map" && window.initialiserCarte) window.initialiserCarte();
    if (id === "search" && window.rechercherPleinTexte) window.rechercherPleinTexte();
    if (id === "dashboard" && window.afficherDashboard) window.afficherDashboard();
    if (id === "rapports" && window.afficherRapports) window.afficherRapports();
    if (id === "contes" && window.contesData) window.afficherContes();
    if (id === "emissions" && window.emissionsData) window.afficherEmissionsPremium();
    if (id === "themes" && window.themesData) window.afficherThemesPremium();
    if (id === "flashcards" && window.vocabulaire?.length) window.genererFlashcards();
    if (id === "ressources" && window.afficherRessources) window.afficherRessources();
  }
  
  sectionSelector.addEventListener("change", (e) => showSection(e.target.value));
  const savedSection = localStorage.getItem("tadaksahak_active_section");
  const defaultSection = (savedSection && document.getElementById(savedSection)) ? savedSection : "accueil";
  sectionSelector.value = defaultSection;
  showSection(defaultSection);
}

// Exporter
window.initNavigation = initNavigation;
window.sectionSelector = sectionSelector;
