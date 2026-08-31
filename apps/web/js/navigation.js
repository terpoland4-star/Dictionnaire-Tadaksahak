import { state } from './state.js';
import { dom } from './state.js';
import { i18n } from './i18n-data.js';
import { afficherContes } from './contes.js';
import { afficherEmissionsPremium } from './emissions.js';
import { genererFlashcards } from './flashcards.js';
import { showGrammarSection } from './grammar.js';
import { chargerQuiz } from './quiz.js';
import { afficherDashboard, afficherLivres, afficherPhotos, afficherRapports, afficherRessources, genererAlbumsAudio, genererVideos, rechercherPleinTexte } from './ressources.js';
import { afficherThemesPremium } from './themesVocab.js';
import { afficherTimeline, initialiserCarte } from './timeline.js';
import { showToast } from './utils.js';

export function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'd') {
      e.preventDefault();
      if (dom.sectionSelector) {
        dom.sectionSelector.value = 'dictionnaire';
        dom.sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.altKey && e.key === 'c') {
      e.preventDefault();
      if (dom.sectionSelector) {
        dom.sectionSelector.value = 'chat';
        dom.sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.altKey && e.key === 'f') {
      e.preventDefault();
      if (dom.sectionSelector) {
        dom.sectionSelector.value = 'flashcards';
        dom.sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.altKey && e.key === 'l') {
      e.preventDefault();
      if (dom.sectionSelector) {
        dom.sectionSelector.value = 'livres';
        dom.sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.altKey && e.key === 't') {
      e.preventDefault();
      if (dom.sectionSelector) {
        dom.sectionSelector.value = 'themes';
        dom.sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.altKey && e.key === 'g') {
      e.preventDefault();
      if (dom.sectionSelector) {
        dom.sectionSelector.value = 'grammaire';
        dom.sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      showHelpModal();
    }
  });
}

export function showHelpModal() {
  const modalHtml = `
    <div id="helpModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>⌨️ Raccourcis clavier</h2>
        <ul class="shortcuts-list">
          <li><kbd>Alt</kbd> + <kbd>D</kbd> → Dictionnaire</li>
          <li><kbd>Alt</kbd> + <kbd>C</kbd> → Chat Bot</li>
          <li><kbd>Alt</kbd> + <kbd>F</kbd> → Flashcards</li>
          <li><kbd>Alt</kbd> + <kbd>L</kbd> → Livres</li>
          <li><kbd>Alt</kbd> + <kbd>T</kbd> → Thèmes</li>
          <li><kbd>Alt</kbd> + <kbd>G</kbd> → Grammaire</li>
          <li><kbd>?</kbd> → Cette aide</li>
        </ul>
        <h2>🎨 Thèmes</h2>
        <p>Utilisez les boutons 🌙 📖 📜 en haut de page pour changer l'apparence.</p>
        <h2>🌍 Langues</h2>
        <p>Changez de langue avec les drapeaux 🇫🇷 🇸🇦 🇬🇧.</p>
        <h2>📖 Propositions relatives</h2>
        <p>Dans la section Grammaire, cliquez sur l'onglet "Propositions relatives" pour découvrir les 3 stratégies de relativisation.</p>
      </div>
    </div>
  `;
  const existingModal = document.getElementById('helpModal');
  if (existingModal) existingModal.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('helpModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

// ------------------------------
// MISES À JOUR AUTO
// ------------------------------

export function initNavigation() {
  if (!dom.sectionSelector) return;
  const sections = document.querySelectorAll("main > section");
  
  function showSection(id) {
    sections.forEach(sec => { sec.hidden = sec.id !== id; });
    localStorage.setItem("tadaksahak_active_section", id);
    
    // Scroll et focus améliorés pour le header sticky
    const activeSection = document.getElementById(id);
    if (activeSection) {
      // Focus sur le titre pour l'accessibilité
      const heading = activeSection.querySelector('h2, h3');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
      // Scroll avec compensation du header sticky (80px approximatif)
      const headerOffset = 80;
      const elementPosition = activeSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    
    // Annonce du changement de section pour les lecteurs d'écran
    const sectionName = i18n[state.currentLanguage]['nav_' + id] || id;
    showToast(sectionName, 'info');
    
    // Affichage des contenus spécifiques
    if (id === "grammaire") {
      // Masquer les anciens containers de grammaire premium
      const gramContainer = document.getElementById("grammaireContainer");
      const relContainer = document.getElementById("relativesContainer");
      if (gramContainer) gramContainer.hidden = true;
      if (relContainer) relContainer.hidden = true;
      
      // Afficher le livre
      showGrammarSection();
    }
    if (id === "livres") afficherLivres();
    if (id === "audio") genererAlbumsAudio();
    if (id === "photos") afficherPhotos();
    if (id === "videos") genererVideos();
    if (id === "quiz") chargerQuiz();
    if (id === "timeline") afficherTimeline();
    if (id === "map") initialiserCarte();
    if (id === "search") rechercherPleinTexte();
    if (id === "dashboard") afficherDashboard();
    if (id === "rapports") afficherRapports();
    if (id === "contes" && state.contesData) afficherContes();
    if (id === "emissions" && state.emissionsData) afficherEmissionsPremium();
    if (id === "themes" && state.themesData) afficherThemesPremium();
    if (id === "flashcards" && state.vocabulaire.length) genererFlashcards();
    if (id === "ressources") afficherRessources();
  }
  
  dom.sectionSelector.addEventListener("change", (e) => showSection(e.target.value));
  const savedSection = localStorage.getItem("tadaksahak_active_section");
  const defaultSection = (savedSection && document.getElementById(savedSection)) ? savedSection : "accueil";
  dom.sectionSelector.value = defaultSection;
  showSection(defaultSection);
}

// ------------------------------
// INITIALISATION PRINCIPALE
// ------------------------------
