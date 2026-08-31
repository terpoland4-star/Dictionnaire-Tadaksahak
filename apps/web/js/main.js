import { state } from './state.js';
import { dom } from './state.js';
import { traiterSaisie } from './chat.js';
import { chargerContes } from './contes.js';
import { afficherMotDuJour, chargerDictionnaire, chargerFavoris, chargerHistorique, navigationPrecedent, navigationSuivant, requestNotificationPermission, showWordNotification } from './dictionary.js';
import { chargerEmissions } from './emissions.js';
import { initFlashcards } from './flashcards.js';
import { afficherRelatives, chargerRelatives, showGrammarSection } from './grammar.js';
import { setLanguage } from './language.js';
import { initKeyboardShortcuts, initNavigation } from './navigation.js';
import { initAutoUpdates, registerServiceWorker, showInstallBanner } from './pwa.js';
import { chargerLivresConnaissance, genererAlbumsAudio, rechercherPleinTexte, showRessourcesWelcomePopup } from './ressources.js';
import { detectSystemTheme, initTheme, initThemeSettings } from './theme.js';
import { chargerThemes } from './themesVocab.js';
import { chargerTimeline } from './timeline.js';
import { hideLoader, showLoader, showToast } from './utils.js';

export async function initialiserApplication() {
  showLoader();
  try {
    initTheme();
    initThemeSettings();
    detectSystemTheme();
    initNavigation();
    await chargerDictionnaire();
    // Note: le livre charge grammaire.json à la demande
    await chargerContes();
    await chargerEmissions();
    await chargerThemes();
    await chargerLivresConnaissance();
    await chargerTimeline();
    await chargerRelatives();
    chargerHistorique();
    chargerFavoris();
    genererAlbumsAudio();
    registerServiceWorker();
    requestNotificationPermission();
    showWordNotification();
    afficherMotDuJour();
    setInterval(() => afficherMotDuJour(), 3600000);
    initKeyboardShortcuts();
    initFlashcards();
    initAutoUpdates();
    
    // Gestion des onglets de grammaire (mémorisation) - désormais désactivé car on utilise le livre
    // On peut garder les onglets pour les relatives si on veut, mais le livre remplace le causatif.
    const grammarTabs = document.querySelectorAll('.grammar-tab');
    if (grammarTabs.length) {
      grammarTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;
          state.activeGrammarTab = target;
          grammarTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          if (target === 'causative') {
            // Afficher le livre
            document.getElementById('grammaireContainer')?.setAttribute('hidden', '');
            document.getElementById('relativesContainer')?.setAttribute('hidden', '');
            showGrammarSection();
          } else if (target === 'relatives') {
            document.getElementById('grammaireContainer')?.setAttribute('hidden', '');
            document.getElementById('relativesContainer')?.removeAttribute('hidden');
            afficherRelatives();
          }
        });
      });
    }
    
    document.getElementById("btnEnvoyer")?.addEventListener("click", traiterSaisie);
    document.getElementById("chatInput")?.addEventListener("keypress", e => e.key === "Enter" && traiterSaisie());
    dom.btnPrev?.addEventListener("click", navigationPrecedent);
    dom.btnNext?.addEventListener("click", navigationSuivant);
    document.getElementById("btnGoDico")?.addEventListener("click", () => { if (dom.sectionSelector) { dom.sectionSelector.value = "dictionnaire"; dom.sectionSelector.dispatchEvent(new Event("change")); } });
    document.getElementById("toggleChatBot")?.addEventListener("click", () => { if (dom.sectionSelector) { dom.sectionSelector.value = "chat"; dom.sectionSelector.dispatchEvent(new Event("change")); } });
    document.querySelectorAll('.lang-flag').forEach(btn => { btn.addEventListener('click', () => setLanguage(btn.dataset.lang)); });
    setLanguage(state.currentLanguage);
    
    // Debounce pour la recherche plein texte
    const searchBooksInput = document.getElementById("searchBooksInput");
    if (searchBooksInput) {
      searchBooksInput.addEventListener("input", () => {
        clearTimeout(state.searchBooksDebounce);
        state.searchBooksDebounce = setTimeout(() => rechercherPleinTexte(), 300);
      });
    }
    
    setTimeout(() => { showInstallBanner(); }, 3000);
    setTimeout(() => { showRessourcesWelcomePopup(); }, 2000);
    console.log("✅ Application fusionnée prête !");
    console.log("📚 Module des propositions relatives intégré (Christiansen & Levinsohn 2003)");
    console.log("📖 Livre de grammaire ouvert intégré (30 blocs)");
  } catch (error) {
    console.error("Erreur critique lors de l'initialisation :", error);
    showToast("Erreur de chargement, vérifiez la console", "error");
  } finally {
    hideLoader();
  }
}

initialiserApplication();
