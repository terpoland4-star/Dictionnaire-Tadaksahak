import { state } from './state.js';
import { dom } from './state.js';
import { i18n } from './i18n-data.js';
import { updateChatSuggestions } from './chat.js';
import { afficherContes } from './contes.js';
import { afficherMot, afficherMotDuJour } from './dictionary.js';
import { afficherEmissionsPremium } from './emissions.js';
import { genererFlashcards } from './flashcards.js';
import { afficherRelatives, showGrammarSection, updateGrammarSpread } from './grammar.js';
import { chargerQuiz } from './quiz.js';
import { afficherDashboard, afficherLivres, afficherPhotos, afficherRapports, afficherRessources } from './ressources.js';
import { afficherThemesPremium } from './themesVocab.js';
import { afficherTimeline, initialiserCarte } from './timeline.js';

export function setLanguage(lang) {
  state.currentLanguage = lang;
  localStorage.setItem('app_language', lang);
  const html = document.documentElement;
  html.setAttribute('lang', lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'fr'));
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = i18n[lang][key];
      } else if (el.tagName === 'SELECT') {
        for (let opt of el.options) {
          const optKey = opt.getAttribute('data-i18n');
          if (optKey && i18n[lang][optKey]) opt.text = i18n[lang][optKey];
        }
      } else {
        el.textContent = i18n[lang][key];
      }
    }
  });
  
  if (dom.searchBar) dom.searchBar.placeholder = i18n[lang].search_placeholder || "Rechercher un mot…";
  const chatInput = document.getElementById("chatInput");
  if (chatInput) chatInput.placeholder = i18n[lang].send || "Écrivez votre message...";
  const rechercheLivres = document.getElementById("rechercheLivres");
  if (rechercheLivres) rechercheLivres.placeholder = i18n[lang].search_placeholder || "Rechercher un livre...";
  
  if (document.getElementById("livres") && !document.getElementById("livres").hidden) afficherLivres();
  if (document.getElementById("photos") && !document.getElementById("photos").hidden) afficherPhotos();
  if (document.getElementById("quiz") && !document.getElementById("quiz").hidden && state.quizData) chargerQuiz();
  if (document.getElementById("timeline") && !document.getElementById("timeline").hidden && state.timelineData) afficherTimeline();
  if (document.getElementById("map") && !document.getElementById("map").hidden && state.mapInitialized) initialiserCarte();
  if (document.getElementById("dashboard") && !document.getElementById("dashboard").hidden) afficherDashboard();
  if (document.getElementById("rapports") && !document.getElementById("rapports").hidden) afficherRapports();
  if (document.getElementById("grammaire") && !document.getElementById("grammaire").hidden) {
    if (state.activeGrammarTab === 'causative') {
      // Le livre gère maintenant la grammaire, on s'assure qu'il est affiché
      if (state.grammarBlocks.length) updateGrammarSpread();
      else showGrammarSection();
    } else if (state.activeGrammarTab === 'relatives') {
      afficherRelatives();
    }
  }
  if (document.getElementById("contes") && !document.getElementById("contes").hidden && state.contesData) afficherContes();
  if (document.getElementById("emissions") && !document.getElementById("emissions").hidden && state.emissionsData) afficherEmissionsPremium();
  if (document.getElementById("themes") && !document.getElementById("themes").hidden && state.themesData) afficherThemesPremium();
  if (document.getElementById("flashcards") && !document.getElementById("flashcards").hidden && state.vocabulaire.length) genererFlashcards();
  if (document.getElementById("ressources") && !document.getElementById("ressources").hidden) afficherRessources();
  if (state.motActuel) afficherMot(state.motActuel);
  updateChatSuggestions();
  afficherMotDuJour();
  
  document.querySelectorAll('.lang-flag').forEach(btn => {
    if (btn.dataset.lang === lang) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

