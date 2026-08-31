// État partagé de l'application, extrait des variables globales de l'ancien
// app.js monolithique. Regroupé en UN SEUL objet mutable pour que tous les
// modules ES lisent/écrivent la même source de vérité (les modules ES ne
// partagent pas les "let" comme le faisait le script classique).
//
// Usage dans les autres modules :
//   import { state } from './state.js';
//   state.currentIndex = 3;   // lecture/écriture directe des champs

export const state = {
  currentLanguage: localStorage.getItem('app_language') || 'fr',
  vocabulaire: [],
  grammaire: null, // n'est plus utilisé pour le livre (mais conservé pour compatibilité)
  contesData: null,
  emissionsData: null,
  themesData: null,
  relativesData: null,
  motActuel: null,
  historique: [],
  favoris: [],
  motsListe: [],
  currentIndex: -1,
  livresConnaissance: null,
  quizData: null,
  currentQuiz: { questions: [], currentIndex: 0, score: 0, lang: 'fr' },
  timelineData: null,
  mapInitialized: false,
  leafletLoaded: false,
  isAppInstalled: false,
  installPromptEvent: null,
  activeGrammarTab: 'causative', // 'causative' ou 'relatives'

  // Variables Flashcards
  currentFlashcards: [],
  currentFlashcardIndex: 0,

  // ========== LIVRE GRAMMAIRE OUVERT ==========
  grammarBlocks: [],
  currentBlockIndex: 0,
  currentGrammarLang: localStorage.getItem('preferredLanguage') || 'fr',
  bookInitialized: false,

  // Debounce pour recherche plein texte
  searchBooksDebounce: null,

  // Compteur de visites (déplacé ici depuis pwa.js pour rester avec le reste de l'état)
  visitCounter: parseInt(localStorage.getItem('tadaksahak_visit_count') || '0'),
};

// Éléments DOM du livre (doivent correspondre aux ID dans index.html)
export const bookElements = {
  leftTitle: document.getElementById('leftTitle'),
  leftContent: document.getElementById('leftContent'),
  leftRange: document.getElementById('leftRange'),
  leftKeywords: document.getElementById('leftKeywords'),
  leftPageNum: document.getElementById('leftPageNum'),
  rightTitle: document.getElementById('rightTitle'),
  rightContent: document.getElementById('rightContent'),
  rightRange: document.getElementById('rightRange'),
  rightKeywords: document.getElementById('rightKeywords'),
  rightPageNum: document.getElementById('rightPageNum'),
  pageIndicator: document.getElementById('pageIndicator'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  bookSpread: document.getElementById('bookSpread'),
};

// Éléments DOM principaux
export const dom = {
  searchBar: document.getElementById('searchBar'),
  suggestionsList: document.getElementById('suggestions'),
  motElem: document.getElementById('motTexte'),
  defElem: document.getElementById('definition'),
  audioElem: document.getElementById('audioLecteur'),
  sectionSelector: document.getElementById('sectionSelector'),
  clearSearchBtn: document.getElementById('clearSearch'),
  btnPrev: document.getElementById('btnPrev'),
  btnNext: document.getElementById('btnNext'),
  compteurMot: document.getElementById('compteurMot'),
};

// ------------------------------
// GALERIE PHOTOS
// ------------------------------
export const imagesGalerie = [
  {
    fichier: 'data/images/livres/chef_idoguiritane_1.jpg',
    titre_fr: 'Chef Idoguiritane à Tin Abaw',
    titre_ar: 'الشيخ إيدوغيريتان في تين أبا',
    titre_en: 'Chief Idoguiritane in Tin Abaw',
    legende_fr: 'Portrait du chef historique de la fraction Idoguiritane.',
    legende_ar: 'صورة للشيخ التاريخي لفصيلة إيدوغيريتان.',
    legende_en: 'Portrait of the historical chief of the Idoguiritane fraction.',
    credit: '© Charles Grémont',
  },
  {
    fichier: 'data/images/livres/chef_idoguiritane_2.jpg',
    titre_fr: 'Réunion traditionnelle à Tin Abaw',
    titre_ar: 'اجتماع تقليدي في تين أبا',
    titre_en: 'Traditional meeting in Tin Abaw',
    legende_fr: 'Le chef entouré de notables.',
    legende_ar: 'الشيخ وحوله الأعيان.',
    legende_en: 'The chief surrounded by notables.',
    credit: '© Charles Grémont',
  },
  {
    fichier: 'data/images/livres/chef_idoguitirane_3.jpg',
    titre_fr: 'Le chef et ses conseillers',
    titre_ar: 'الشيخ ومستشاروه',
    titre_en: 'The chief and his advisors',
    legende_fr: 'Discussion des affaires de la communauté.',
    legende_ar: 'مناقشة شؤون المجتمع.',
    legende_en: 'Discussing community affairs.',
    credit: '© Charles Grémont',
  },
  {
    fichier: 'data/images/livres/Un jeune combattant Adaksahak, au nord de Ménaka, mars 1994. Photo C.G.jpeg',
    titre_fr: 'Jeune combattant Idaksahak (1994)',
    titre_ar: 'مقاتل شاب إدكساهق (١٩٩٤)',
    titre_en: 'Young Idaksahak fighter (1994)',
    legende_fr: 'Rébellion des années 1990, nord de Ménaka.',
    legende_ar: 'تمرد التسعينيات، شمال مناكا.',
    legende_en: '1990s rebellion, north of Ménaka.',
    credit: '© Charles Grémont',
  },
  {
    fichier: 'data/images/livres/zone des idaksahak.jpeg',
    titre_fr: 'Carte de la région des Idaksahak',
    titre_ar: 'خريطة منطقة الإدكساهق',
    titre_en: 'Map of the Idaksahak region',
    legende_fr: 'Localisation dans le nord-est du Mali.',
    legende_ar: 'الموقع في شمال شرق مالي.',
    legende_en: 'Location in north-eastern Mali.',
    credit: 'Charles Grémont',
  },
  {
    fichier: 'data/images/livres/idaksahak_square.png',
    titre_fr: 'Logo de la communauté Idaksahak',
    titre_ar: 'شعار مجتمع الإدكساهق',
    titre_en: 'Logo of the Idaksahak community',
    legende_fr: 'Symbole officiel : lecture, épée et dromadaires.',
    legende_ar: 'الشعار الرسمي: القراءة، السيف والجمال.',
    legende_en: 'Official symbol: reading, sword and dromedaries.',
    credit: 'Communauté Idaksahak',
  },
];
