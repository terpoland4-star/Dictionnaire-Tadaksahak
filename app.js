// ==============================
// APPLICATION TADAKSAHAK LEARNING
// VERSION ULTIME FUSIONNÉE
// Fusion : Robustesse (v1) + UI Premium (v2)
// ==============================

console.log("🚀 Démarrage de l'application fusionnée...");

// ============================================================
// SECTION 1 : INTERNATIONALISATION (i18n) - VERSION ÉTENDUE
// ============================================================

const i18n = {
  fr: {
    loading: "Chargement de l'application...",
    subtitle: "Langue, culture et mémoire vivante du peuple Idaksahak",
    choose_section: "Choisir une section",
    nav_home: "🏠 Accueil",
    nav_dictionary: "📖 Dictionnaire",
    nav_grammar: "📚 Grammaire",
    nav_contes: "📖 Contes",
    nav_emissions: "🎙️ Émissions",
    nav_chat: "💬 Chat Bot",
    nav_audio: "🎧 Audio",
    nav_photos: "🖼️ Photos",
    nav_videos: "🎥 Vidéos",
    nav_books: "📚 Livres",
    nav_reports: "📄 Rapports",
    nav_actualites: "📰 Actualités",
    nav_quiz: "❓ Quiz",
    nav_flashcards: "🃏 Flashcards",
    nav_themes: "📚 Thèmes",
    nav_timeline: "📅 Ligne du temps",
    nav_map: "🗺️ Carte",
    nav_search: "🔍 Recherche livres",
    nav_dashboard: "📊 Tableau de bord",
    nav_ressources: "📚 Ressources académiques",
    welcome_title: "Bienvenue",
    welcome_subtitle: "Une plateforme dédiée à la langue et à la culture Tadaksahak.",
    go_dico: "📖 Accéder au dictionnaire",
    bio_text1: "Interprète, développeur et gardien de la mémoire culturelle.",
    bio_text2: "Une mission : connecter nos mondes.",
    stat_words: "mots",
    stat_audios: "audios",
    stat_books: "livres",
    dictionary_title: "📖 Dictionnaire Tadaksahak",
    grammar_title: "📚 Grammaire Tadaksahak",
    grammar_desc: "Verbes causatifs et passifs d'après Christiansen-Bolli (2010)",
    grammar_relatives_title: "📖 Propositions relatives",
    grammar_relatives_desc: "D'après Christiansen & Levinsohn (2003) — Relative Clauses in Tadaksahak",
    contes_title: "📖 Contes et légendes",
    emissions_title: "🎙️ Émissions radio",
    flashcards_title: "🃏 Flashcards - Apprentissage",
    themes_title: "📚 Vocabulaire thématique",
    theme_vocab: "📖 Vocabulaire",
    theme_verbs: "🔤 Verbes",
    theme_nouns: "🏷️ Noms",
    prev: "⬅️ Précédent",
    next: "Suivant ➡️",
    alphabet_index: "Index alphabétique",
    chat_title: "💬 Chat Bot Hamadine",
    chat_welcome_msg: "Bonjour ! Je suis votre guide. Que souhaitez-vous apprendre ?",
    send: "Envoyer 📤",
    sugg_word: "📖 Mot Tadaksahak",
    sugg_history: "📚 Histoire",
    sugg_culture: "🎵 Culture",
    audio_title: "🎧 Albums Audio",
    photos_title: "🖼️ Galerie Photos",
    videos_title: "🎥 Vidéos",
    sort_by: "Trier par :",
    sort_new: "📅 Plus récentes",
    sort_old: "📅 Plus anciennes",
    books_title: "📚 Bibliothèque",
    reports_title: "📄 Rapports et Documents",
    reports_coming: "📑 Rapports culturels, linguistiques et communautaires bientôt disponibles.",
    all_themes: "📚 Tous les thèmes",
    theme_linguistics: "🔤 Linguistique",
    theme_history: "📖 Histoire",
    theme_culture: "🎭 Culture",
    theme_politics: "🏛️ Politique",
    news_title: "📰 Actualités",
    news_coming: "📰 Restez connectés !",
    quiz_title: "❓ Quiz Culturel",
    quiz_start: "Commencer le quiz",
    quiz_next: "Question suivante",
    quiz_score: "Votre score",
    quiz_restart: "Recommencer",
    timeline_title: "📅 Ligne du temps historique",
    map_title: "🗺️ Carte des zones Idaksahak",
    search_books_title: "🔍 Recherche dans les livres",
    search_placeholder: "Rechercher un mot ou une phrase...",
    search_results: "Résultats",
    dashboard_title: "📊 Tableau de bord",
    dashboard_history: "Historique des mots",
    dashboard_favorites: "Favoris",
    dashboard_quiz_progress: "Progression des quiz",
    word_of_day: "🌟 Mot du jour",
    share: "Partager",
    add_favorite: "Ajouter aux favoris",
    remove_favorite: "Retirer des favoris",
    bot_greeting: "👋 Salam aleikum ! Je suis Hamadine, gardien de la langue Tadaksahak et des savoirs Idaksahak.",
    bot_thanks: "🙏 De rien ! La sagesse se partage.",
    bot_dico: "📖 Rendez-vous dans la section Dictionnaire.",
    bot_books: "📚 La bibliothèque contient plusieurs ouvrages.",
    bot_audio: "🎵 Section Audio à venir.",
    bot_grammar: "📚 Consultez la section Grammaire pour les verbes causatifs et passifs.",
    bot_grammar_relatives: "📖 Pour les propositions relatives, consultez l'onglet 'Propositions relatives' dans la section Grammaire.",
    bot_help: "🤖 Ce que je sais faire :\n📖 Dictionnaire\n📚 Livres\n📚 Grammaire (causatifs/passifs + relatives)\n📖 Contes\n🎙️ Émissions\n🎵 Audio\n💬 Questions culturelles",
    bot_default: "🤔 Je n'ai pas bien compris. Essayez « aide ».",
    ressources_title: "📚 Ressources académiques",
    ressources_desc: "Découvrez des podcasts, articles et références sur les langues et l'histoire du Sahara",
    podcast_section: "🎙️ Podcasts et conférences",
    podcast_episode_title: "La linguistique historique au Sahara",
    podcast_episode_desc: "Dans cet épisode, Dr. Lameen Souag (CNRS, LACITO) développe l'idée que l'histoire d'une langue ne dépend pas que d'une tradition écrite.",
    podcast_episode_date: "22 janvier 2018",
    podcast_listen: "🎧 Écouter le podcast",
    articles_section: "📖 Articles et publications",
    bibliography_section: "📚 Bibliographie suggérée",
    share_resource: "Partager",
    see_more: "Voir plus →"
  },
  ar: {
    loading: "جاري تحميل التطبيق...",
    subtitle: "اللغة والثقافة والذاكرة الحية لشعب إدكساهق",
    choose_section: "اختر القسم",
    nav_home: "🏠 الرئيسية",
    nav_dictionary: "📖 القاموس",
    nav_grammar: "📚 قواعد اللغة",
    nav_contes: "📖 حكايات",
    nav_emissions: "🎙️ برامج إذاعية",
    nav_chat: "💬 الدردشة",
    nav_audio: "🎧 الصوتيات",
    nav_photos: "🖼️ الصور",
    nav_videos: "🎥 الفيديوهات",
    nav_books: "📚 الكتب",
    nav_reports: "📄 التقارير",
    nav_actualites: "📰 الأخبار",
    nav_quiz: "❓ اختبار",
    nav_flashcards: "🃏 بطاقات التعلم",
    nav_themes: "📚 المواضيع",
    nav_timeline: "📅 الخط الزمني",
    nav_map: "🗺️ الخريطة",
    nav_search: "🔍 بحث في الكتب",
    nav_dashboard: "📊 لوحة التحكم",
    nav_ressources: "📚 الموارد الأكاديمية",
    welcome_title: "مرحبًا",
    welcome_subtitle: "منصة مخصصة للغة والثقافة التدكساهقية.",
    go_dico: "📖 الذهاب إلى القاموس",
    bio_text1: "مترجم، مطور، وحارس الذاكرة الثقافية.",
    bio_text2: "مهمة: ربط عوالمنا.",
    stat_words: "كلمة",
    stat_audios: "صوتيات",
    stat_books: "كتب",
    dictionary_title: "📖 قاموس تدكساهق",
    grammar_title: "📚 قواعد تدكساهق",
    grammar_desc: "الأفعال السببية والمجهولة حسب كريستيانسن-بولي (٢٠١٠)",
    grammar_relatives_title: "📖 جمل الوصل",
    grammar_relatives_desc: "حسب كريستيانسن وليفينسون (٢٠٠٣)",
    contes_title: "📖 حكايات وأساطير",
    emissions_title: "🎙️ برامج إذاعية",
    flashcards_title: "🃏 بطاقات التعلم",
    themes_title: "📚 مفردات موضوعية",
    theme_vocab: "📖 مفردات",
    theme_verbs: "🔤 أفعال",
    theme_nouns: "🏷️ أسماء",
    prev: "⬅️ السابق",
    next: "التالي ➡️",
    alphabet_index: "الفهرس الأبجدي",
    chat_title: "💬 محادثة مع حمدين",
    chat_welcome_msg: "مرحبًا! أنا مرشدك. ماذا تريد أن تتعلم؟",
    send: "إرسال 📤",
    sugg_word: "📖 كلمة تدكساهق",
    sugg_history: "📚 تاريخ",
    sugg_culture: "🎵 ثقافة",
    audio_title: "🎧 ألبومات صوتية",
    photos_title: "🖼️ معرض الصور",
    videos_title: "🎥 فيديوهات",
    sort_by: "ترتيب حسب:",
    sort_new: "📅 الأحدث",
    sort_old: "📅 الأقدم",
    books_title: "📚 المكتبة",
    reports_title: "📄 التقارير والوثائق",
    reports_coming: "📑 تقارير ثقافية ولغوية ومجتمعية قريبًا.",
    all_themes: "📚 جميع المواضيع",
    theme_linguistics: "🔤 لغويات",
    theme_history: "📖 تاريخ",
    theme_culture: "🎭 ثقافة",
    theme_politics: "🏛️ سياسة",
    news_title: "📰 أخبار",
    news_coming: "📰 تابعونا! الأخبار قادمة قريبًا.",
    quiz_title: "❓ اختبار ثقافي",
    quiz_start: "ابدأ الاختبار",
    quiz_next: "السؤال التالي",
    quiz_score: "نتيجتك",
    quiz_restart: "إعادة المحاولة",
    timeline_title: "📅 الخط الزمني التاريخي",
    map_title: "🗺️ خريطة مناطق إدكساهق",
    search_books_title: "🔍 بحث في الكتب",
    search_placeholder: "ابحث عن كلمة أو عبارة...",
    search_results: "النتائج",
    dashboard_title: "📊 لوحة التحكم",
    dashboard_history: "الكلمات المبحوثة",
    dashboard_favorites: "المفضلة",
    dashboard_quiz_progress: "تقدم الاختبارات",
    word_of_day: "🌟 كلمة اليوم",
    share: "مشاركة",
    add_favorite: "أضف إلى المفضلة",
    remove_favorite: "إزالة من المفضلة",
    bot_greeting: "👋 سلام عليكم! أنا حمدين، حارس لغة تدكساهق.",
    bot_thanks: "🙏 عفواً!",
    bot_dico: "📖 توجه إلى قسم القاموس.",
    bot_books: "📚 تحتوي المكتبة على عدة كتب.",
    bot_audio: "🎵 قسم الصوتيات قريبًا.",
    bot_grammar: "📚 راجع قسم القواعد للأفعال السببية والمجهولة.",
    bot_grammar_relatives: "📖 راجع قسم جمل الوصل في القواعد.",
    bot_help: "🤖 ما يمكنني فعله:\n📖 القاموس\n📚 الكتب\n📚 القواعد\n📖 الحكايات\n🎙️ البرامج\n🎵 الصوتيات\n💬 أسئلة ثقافية",
    bot_default: "🤔 لم أفهم. جرب « مساعدة ».",
    ressources_title: "📚 الموارد الأكاديمية",
    ressources_desc: "اكتشف البودكاست والمقالات والمراجع حول لغات وتاريخ الصحراء",
    podcast_section: "🎙️ البودكاست والمحاضرات",
    podcast_episode_title: "اللغويات التاريخية في الصحراء",
    podcast_episode_desc: "في هذه الحلقة، الدكتور لمين سواغ (CNRS، LACITO) يشرح كيف أن تاريخ اللغة لا يعتمد فقط على التقليد المكتوب.",
    podcast_episode_date: "22 يناير 2018",
    podcast_listen: "🎧 استمع إلى البودكاست",
    articles_section: "📖 المقالات والمنشورات",
    bibliography_section: "📚 المراجع المقترحة",
    share_resource: "مشاركة",
    see_more: "عرض المزيد ←"
  },
  en: {
    loading: "Loading application...",
    subtitle: "Language, culture and living memory of the Idaksahak people",
    choose_section: "Choose a section",
    nav_home: "🏠 Home",
    nav_dictionary: "📖 Dictionary",
    nav_grammar: "📚 Grammar",
    nav_contes: "📖 Tales",
    nav_emissions: "🎙️ Broadcasts",
    nav_chat: "💬 Chat Bot",
    nav_audio: "🎧 Audio",
    nav_photos: "🖼️ Photos",
    nav_videos: "🎥 Videos",
    nav_books: "📚 Books",
    nav_reports: "📄 Reports",
    nav_actualites: "📰 News",
    nav_quiz: "❓ Quiz",
    nav_flashcards: "🃏 Flashcards",
    nav_themes: "📚 Themes",
    nav_timeline: "📅 Timeline",
    nav_map: "🗺️ Map",
    nav_search: "🔍 Search books",
    nav_dashboard: "📊 Dashboard",
    nav_ressources: "📚 Academic Resources",
    welcome_title: "Welcome",
    welcome_subtitle: "A platform dedicated to the Tadaksahak language and culture.",
    go_dico: "📖 Go to dictionary",
    bio_text1: "Interpreter, developer, and guardian of cultural memory.",
    bio_text2: "A mission: connect our worlds.",
    stat_words: "words",
    stat_audios: "audios",
    stat_books: "books",
    dictionary_title: "📖 Tadaksahak Dictionary",
    grammar_title: "📚 Tadaksahak Grammar",
    grammar_desc: "Causative and passive verbs from Christiansen-Bolli (2010)",
    grammar_relatives_title: "📖 Relative clauses",
    grammar_relatives_desc: "From Christiansen & Levinsohn (2003)",
    contes_title: "📖 Tales and legends",
    emissions_title: "🎙️ Radio broadcasts",
    flashcards_title: "🃏 Flashcards - Learning",
    themes_title: "📚 Thematic vocabulary",
    theme_vocab: "📖 Vocabulary",
    theme_verbs: "🔤 Verbs",
    theme_nouns: "🏷️ Nouns",
    prev: "⬅️ Previous",
    next: "Next ➡️",
    alphabet_index: "Alphabetical index",
    chat_title: "💬 Hamadine Chat Bot",
    chat_welcome_msg: "Hello! I am your guide. What would you like to learn?",
    send: "Send 📤",
    sugg_word: "📖 Tadaksahak word",
    sugg_history: "📚 History",
    sugg_culture: "🎵 Culture",
    audio_title: "🎧 Audio Albums",
    photos_title: "🖼️ Photo Gallery",
    videos_title: "🎥 Videos",
    sort_by: "Sort by:",
    sort_new: "📅 Newest",
    sort_old: "📅 Oldest",
    books_title: "📚 Library",
    reports_title: "📄 Reports and Documents",
    reports_coming: "📑 Cultural, linguistic and community reports coming soon.",
    all_themes: "📚 All themes",
    theme_linguistics: "🔤 Linguistics",
    theme_history: "📖 History",
    theme_culture: "🎭 Culture",
    theme_politics: "🏛️ Politics",
    news_title: "📰 News",
    news_coming: "📰 Stay tuned! News coming soon.",
    quiz_title: "❓ Cultural Quiz",
    quiz_start: "Start quiz",
    quiz_next: "Next question",
    quiz_score: "Your score",
    quiz_restart: "Restart",
    timeline_title: "📅 Historical Timeline",
    map_title: "🗺️ Map of Idaksahak areas",
    search_books_title: "🔍 Search in books",
    search_placeholder: "Search for a word or phrase...",
    search_results: "Results",
    dashboard_title: "📊 Dashboard",
    dashboard_history: "Word history",
    dashboard_favorites: "Favorites",
    dashboard_quiz_progress: "Quiz progress",
    word_of_day: "🌟 Word of the day",
    share: "Share",
    add_favorite: "Add to favorites",
    remove_favorite: "Remove from favorites",
    bot_greeting: "👋 Salam aleikum! I am Hamadine, guardian of Tadaksahak.",
    bot_thanks: "🙏 You're welcome!",
    bot_dico: "📖 Go to the Dictionary section.",
    bot_books: "📚 The library contains several books.",
    bot_audio: "🎵 Audio section coming soon.",
    bot_grammar: "📚 Check the Grammar section for causative and passive verbs.",
    bot_grammar_relatives: "📖 Check the Relative Clauses tab in the Grammar section.",
    bot_help: "🤖 What I can do:\n📖 Dictionary\n📚 Books\n📚 Grammar\n📖 Tales\n🎙️ Broadcasts\n🎵 Audio\n💬 Cultural questions",
    bot_default: "🤔 I didn't understand. Try 'help'.",
    ressources_title: "📚 Academic Resources",
    ressources_desc: "Discover podcasts, articles and references on Saharan languages and history",
    podcast_section: "🎙️ Podcasts and lectures",
    podcast_episode_title: "Historical Linguistics in the Sahara",
    podcast_episode_desc: "In this episode, Dr. Lameen Souag (CNRS, LACITO) explains that the history of a language does not depend only on written tradition.",
    podcast_episode_date: "January 22, 2018",
    podcast_listen: "🎧 Listen to the podcast",
    articles_section: "📖 Articles and publications",
    bibliography_section: "📚 Suggested bibliography",
    share_resource: "Share",
    see_more: "See more →"
  }
};

// ============================================================
// SECTION 2 : ÉTAT GLOBAL DE L'APPLICATION
// ============================================================

const AppState = {
  currentLanguage: localStorage.getItem('app_language') || 'fr',
  vocabulaire: [],
  contesData: null,
  emissionsData: null,
  themesData: null,
  relativesData: null,
  livresConnaissance: null,
  quizData: null,
  timelineData: null,
  motActuel: null,
  currentIndex: -1,
  motsListe: [],
  historique: [],
  favoris: [],
  currentFlashcards: [],
  currentFlashcardIndex: 0,
  currentQuiz: { questions: [], currentIndex: 0, score: 0, lang: 'fr' },
  mapInitialized: false,
  leafletLoaded: false,
  isAppInstalled: false,
  installPromptEvent: null,
  grammarBlocks: [],
  currentBlockIndex: 0,
  currentGrammarLang: localStorage.getItem('preferredLanguage') || 'fr',
  bookInitialized: false,
  activeGrammarTab: 'causative'
};

// ============================================================
// SECTION 3 : ÉLÉMENTS DOM (initialisés dans DOMContentLoaded)
// ============================================================

let DOM = {};

/**
 * Helper sécurisé pour accès DOM
 */
function getElement(id, warnIfMissing = true) {
  const el = document.getElementById(id);
  if (!el && warnIfMissing) {
    console.warn(`⚠️ Élément DOM introuvable : #${id}`);
  }
  return el;
}

function initDOMReferences() {
  DOM = {
    bookElements: {
      leftTitle: getElement('leftTitle'),
      leftContent: getElement('leftContent'),
      leftRange: getElement('leftRange'),
      leftKeywords: getElement('leftKeywords'),
      leftPageNum: getElement('leftPageNum'),
      rightTitle: getElement('rightTitle'),
      rightContent: getElement('rightContent'),
      rightRange: getElement('rightRange'),
      rightKeywords: getElement('rightKeywords'),
      rightPageNum: getElement('rightPageNum'),
      pageIndicator: getElement('pageIndicator'),
      prevBtn: getElement('prevBtn'),
      nextBtn: getElement('nextBtn'),
      bookSpread: getElement('bookSpread')
    },
    searchBar: getElement('searchBar'),
    suggestionsList: getElement('suggestions'),
    motElem: getElement('motTexte'),
    defElem: getElement('definition'),
    audioElem: getElement('audioLecteur'),
    clearSearchBtn: getElement('clearSearch'),
    btnPrev: getElement('btnPrev'),
    btnNext: getElement('btnNext'),
    compteurMot: getElement('compteurMot'),
    sectionSelector: getElement('sectionSelector'),
    chatInput: getElement('chatInput'),
    chatWindow: getElement('chatWindow')
  };
}

// ============================================================
// SECTION 4 : UTILITAIRES (Version robuste de l'ancienne)
// ============================================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeText(s) {
  return s ? s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
}

function levenshtein(a, b) {
  const an = a.length, bn = b.length;
  if (!an) return bn;
  if (!bn) return an;
  const matrix = Array.from({ length: an + 1 }, () => new Array(bn + 1).fill(0));
  for (let i = 0; i <= an; i++) matrix[i][0] = i;
  for (let j = 0; j <= bn; j++) matrix[0][j] = j;
  for (let i = 1; i <= an; i++) {
    for (let j = 1; j <= bn; j++) {
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i-1][j] + 1, matrix[i][j-1] + 1, matrix[i-1][j-1] + cost);
    }
  }
  return matrix[an][bn];
}

/**
 * Factory debounce réutilisable
 */
function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Cache simple pour mémoïsation
 */
function createCache(maxSize = 100) {
  const cache = new Map();
  return {
    get(key) { return cache.get(key); },
    set(key, value) {
      if (cache.size >= maxSize) cache.delete(cache.keys().next().value);
      cache.set(key, value);
    },
    has(key) { return cache.has(key); },
    clear() { cache.clear(); }
  };
}

const searchCache = createCache(50);

function showToast(message, type = "info") {
  const toast = getElement("toast", false);
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast toast-${type}`;
  toast.hidden = false;
  setTimeout(() => { toast.hidden = true; }, 3000);
}

function showLoader() {
  const loader = getElement("loadingOverlay", false);
  if (!loader) return;
  loader.hidden = false;
  loader.style.display = 'flex';
}

function hideLoader() {
  const loader = getElement("loadingOverlay", false);
  if (!loader) return;
  loader.hidden = true;
  loader.style.display = 'none';
}

function showSkeleton(containerId) {
  const container = getElement(containerId, false);
  if (!container) return;
  container.innerHTML = `
    <div class="skeleton-grid">
      ${Array(6).fill(0).map(() => `
        <div class="skeleton-card">
          <div class="skeleton-image"></div>
          <div class="skeleton-title"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text short"></div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Wrapper pour chargement avec fallback
 */
async function chargerAvecFallback(fn, nom) {
  try {
    await fn();
    console.log(`✅ ${nom} : OK`);
  } catch (e) {
    console.warn(`⚠️ ${nom} non disponible : ${e.message}`);
  }
}

// ============================================================
// SECTION 5 : THÈMES VISUELS
// ============================================================

function applyThemeSettings() {
  const fontFamily = localStorage.getItem('app_font_family') || 'sans';
  const fontSize = localStorage.getItem('app_font_size') || '100';
  const highContrast = localStorage.getItem('app_high_contrast') === 'true';
  
  const fontMap = { serif: 'Georgia, serif', mono: 'Courier New, monospace', sans: 'Inter, sans-serif' };
  document.body.style.fontFamily = fontMap[fontFamily] || fontMap.sans;
  document.body.style.fontSize = `${fontSize}%`;
  document.body.classList.toggle('high-contrast', highContrast);
}

function initThemeSettings() {
  const fontSelect = getElement('fontFamilySelect', false);
  const sizeSelect = getElement('fontSizeSelect', false);
  const contrastCheck = getElement('highContrastCheck', false);
  
  if (fontSelect) {
    fontSelect.value = localStorage.getItem('app_font_family') || 'sans';
    fontSelect.addEventListener('change', (e) => {
      localStorage.setItem('app_font_family', e.target.value);
      applyThemeSettings();
    });
  }
  if (sizeSelect) {
    sizeSelect.value = localStorage.getItem('app_font_size') || '100';
    sizeSelect.addEventListener('change', (e) => {
      localStorage.setItem('app_font_size', e.target.value);
      applyThemeSettings();
    });
  }
  if (contrastCheck) {
    contrastCheck.checked = localStorage.getItem('app_high_contrast') === 'true';
    contrastCheck.addEventListener('change', (e) => {
      localStorage.setItem('app_high_contrast', String(e.target.checked));
      applyThemeSettings();
    });
  }
  applyThemeSettings();
}

function setTheme(theme) {
  document.body.classList.remove('dark', 'light', 'sepia');
  document.body.classList.add(theme);
  localStorage.setItem('app_theme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('app_theme') || 'dark';
  setTheme(savedTheme);
  getElement('themeDark', false)?.addEventListener('click', () => setTheme('dark'));
  getElement('themeLight', false)?.addEventListener('click', () => setTheme('light'));
  getElement('themeSepia', false)?.addEventListener('click', () => setTheme('sepia'));
}

function detectSystemTheme() {
  if (!localStorage.getItem('app_theme')) {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

// ============================================================
// SECTION 6 : GESTION DE LA LANGUE
// ============================================================

function setLanguage(lang) {
  AppState.currentLanguage = lang;
  localStorage.setItem('app_language', lang);
  
  const html = document.documentElement;
  html.setAttribute('lang', lang === 'en' ? 'en' : (lang === 'ar' ? 'ar' : 'fr'));
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = i18n[lang]?.[key];
    if (!text) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  });
  
  if (DOM.searchBar) DOM.searchBar.placeholder = i18n[lang].search_placeholder || "Rechercher un mot…";
  if (DOM.chatInput) DOM.chatInput.placeholder = i18n[lang].send || "Écrivez votre message...";
  
  const rechercheLivres = getElement("rechercheLivres", false);
  if (rechercheLivres) rechercheLivres.placeholder = i18n[lang].search_placeholder || "Rechercher un livre...";
  
  // Rafraîchissement conditionnel
  const sectionRefreshMap = {
    livres: () => afficherLivres(),
    photos: () => afficherPhotos(),
    quiz: () => AppState.quizData && chargerQuiz(),
    timeline: () => AppState.timelineData && afficherTimeline(),
    dashboard: () => afficherDashboard(),
    rapports: () => afficherRapports(),
    contes: () => AppState.contesData && afficherContes(),
    emissions: () => AppState.emissionsData && afficherEmissionsPremium(),
    themes: () => AppState.themesData && afficherThemesPremium(),
    flashcards: () => AppState.vocabulaire.length && genererFlashcards(),
    ressources: () => afficherRessources()
  };
  
  for (const [sectionId, refreshFn] of Object.entries(sectionRefreshMap)) {
    const section = getElement(sectionId, false);
    if (section && !section.hidden) refreshFn();
  }
  
  if (AppState.motActuel) afficherMot(AppState.motActuel);
  updateChatSuggestions();
  afficherMotDuJour();
  
  document.querySelectorAll('.lang-flag').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function updateChatSuggestions() {
  const btns = document.querySelectorAll('.chat-suggestion');
  if (btns.length >= 3) {
    btns[0].textContent = i18n[AppState.currentLanguage].sugg_word;
    btns[1].textContent = i18n[AppState.currentLanguage].sugg_history;
    btns[2].textContent = i18n[AppState.currentLanguage].sugg_culture;
  }
}

// ============================================================
// SECTION 7 : BOT HAMADINE (Version améliorée avec relatives)
// ============================================================

const botResponses = {
  ayo: {
    fr: `📖 **"ayo"** (sg.) est le pronom relatif pour noms DÉFINIS, relatives RESTRICTIVES.\n\nEx : *Bora [ayo a-taw-kat] a-zumbu-kat.*\n→ "La personne QUI est arrivée est descendue."`,
    en: `📖 **"ayo"** (sg.) is the relative pronoun for DEFINITE nouns in RESTRICTIVE clauses.`,
    ar: `📖 **"ayo"** (مفرد) هو الضمير الموصول للأسماء المعرّفة في جمل الوصل الحصرية.`
  },
  ayondo: {
    fr: `📖 **"ayondo"** (pl.) est le pronom relatif PLURIEL pour noms DÉFINIS.`,
    en: `📖 **"ayondo"** (pl.) is the PLURAL relative pronoun for DEFINITE nouns.`,
    ar: `📖 **"ayondo"** (جمع) هو الضمير الموصول الجمع للأسماء المعرّفة.`
  },
  sa: {
    fr: `📖 **"sa"** introduit des relatives NON-RESTRICTIVES.\n\nEx : *A-jiken-an ayn nana se, [sa ayn man Aminata].*`,
    en: `📖 **"sa"** introduces NON-RESTRICTIVE relative clauses.`,
    ar: `📖 **"sa"** تدخل جمل الوصل غير الحصرية.`
  },
  gap: {
    fr: `📖 **Gap strategy** = aucun marqueur dans la relative.\n\nUsage : noms INDÉFINIS dans des relatives RESTRICTIVES.`,
    en: `📖 **Gap strategy** = no marker in the relative clause.\n\nUsage: INDEFINITE nouns in RESTRICTIVE relatives.`,
    ar: `📖 **استراتيجية الفجوة** = لا علامة في جملة الوصل.`
  },
  relativesOverview: {
    fr: `📖 **Les 3 stratégies de relativisation en tadaksahak** :\n\n1️⃣ **"ayo/ayondo"** → noms DÉFINIS, restrictif\n2️⃣ **Gap (∅)** → noms INDÉFINIS, restrictif\n3️⃣ **"sa"** → non-restrictif`,
    en: `📖 **3 relativization strategies in Tadaksahak**:\n\n1️⃣ **"ayo/ayondo"** → DEFINITE nouns, restrictive\n2️⃣ **Gap (∅)** → INDEFINITE nouns, restrictive\n3️⃣ **"sa"** → non-restrictive`,
    ar: `📖 **ثلاث استراتيجيات للوصل في تدكساهق**:\n1️⃣ "ayo/ayondo" للأسماء المعرّفة\n2️⃣ الفجوة للأسماء النكرة\n3️⃣ "sa" لغير الحصري`
  }
};

function genererExempleRelative(lang) {
  if (!AppState.relativesData?.strategies) return null;
  const strategies = AppState.relativesData.strategies;
  const strat = strategies[Math.floor(Math.random() * strategies.length)];
  const exemples = strat.exemples || [];
  if (!exemples.length) return null;
  const ex = exemples[Math.floor(Math.random() * exemples.length)];
  const trad = lang === 'en' ? ex.traduction_en : lang === 'ar' ? ex.traduction_ar : ex.traduction_fr;
  return { strat, ex, trad };
}

function extraireMotsCles(question) {
  const stopWords = new Set(['le','la','les','un','une','de','du','des','et','ou','mais','donc','car','pour','dans','avec','sans','par','sur','sous','que','qui','quoi','dont','où','comment','pourquoi','est','sont','être','avoir','faire']);
  return question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[?;:!,.']/g, '').split(/\s+/).filter(m => m.length > 2 && !stopWords.has(m));
}

function chercherDansLivres(question) {
  if (!AppState.livresConnaissance?.livres) return null;
  const motsClesQuestion = extraireMotsCles(question);
  if (!motsClesQuestion.length) return null;
  
  let meilleur = null, meilleurScore = 0;
  for (const livre of AppState.livresConnaissance.livres) {
    for (const chunk of livre.chunks) {
      let score = 0;
      const motsClesChunk = chunk.mots_cles.map(m => m.toLowerCase());
      for (const mot of motsClesQuestion) {
        if (motsClesChunk.some(mc => mc.includes(mot) || mot.includes(mc))) score += 2;
        if (chunk.texte.toLowerCase().includes(mot)) score += 1;
      }
      if (score > meilleurScore) {
        meilleurScore = score;
        meilleur = { livre: livre.titre, auteur: livre.auteur, chapitre: chunk.chapitre, titre: chunk.titre, texte: chunk.texte };
      }
    }
  }
  return meilleur;
}

const botHandlers = {
  relatives(clean, lang) {
    if (clean.includes("exemple") || clean.includes("example")) {
      const exemple = genererExempleRelative(lang);
      if (exemple) {
        return `📖 **Exemple (${exemple.strat.usage_fr})** :\n\n🔹 **Tadaksahak** : ${exemple.ex.tadaksahak}\n🔹 **Glose** : ${exemple.ex.glose_fr}\n🔹 **Traduction** : ${exemple.trad}`;
      }
    }
    if (clean.includes("ayo") && !clean.includes("ayondo")) return botResponses.ayo[lang] || botResponses.ayo.fr;
    if (clean.includes("ayondo")) return botResponses.ayondo[lang] || botResponses.ayondo.fr;
    if (clean.includes(" sa ") || clean.includes("sa ")) return botResponses.sa[lang] || botResponses.sa.fr;
    if (clean.includes("gap") || clean.includes("sans marqueur")) return botResponses.gap[lang] || botResponses.gap.fr;
    return botResponses.relativesOverview[lang] || botResponses.relativesOverview.fr;
  },
  greetings(clean, lang) { return i18n[lang].bot_greeting; },
  thanks(clean, lang) { return i18n[lang].bot_thanks; },
  dictionary(clean, lang) { return i18n[lang].bot_dico; },
  grammar(clean, lang) { return i18n[lang].bot_grammar; },
  tales(clean, lang) { return "📖 Rendez-vous dans la section Contes pour les légendes Idaksahak."; },
  broadcasts(clean, lang) { return "🎙️ Consultez la section Émissions pour les archives radiophoniques."; },
  audio(clean, lang) { return i18n[lang].bot_audio; },
  help(clean, lang) { return i18n[lang].bot_help; },
  books(clean, lang) {
    const resultat = chercherDansLivres(clean);
    if (resultat) {
      return `📖 D'après « ${resultat.livre} » (${resultat.auteur}), ch.${resultat.chapitre} — « ${resultat.titre} » :\n\n"${resultat.texte}"\n\n💡 Posez-moi d'autres questions !`;
    }
    return i18n[lang].bot_books;
  }
};

function buildBotMatchers() {
  return [
    { test: c => c.includes("relative") || c.includes("proposition") || c.includes("ayo") || c.includes("gap") || (c.includes("qui") && c.includes("que")), handler: botHandlers.relatives },
    { test: c => ["bonjour","salut","hello","hi","salam"].some(w => c.includes(w)), handler: botHandlers.greetings },
    { test: c => ["merci","thanks","شكرا"].some(w => c.includes(w)), handler: botHandlers.thanks },
    { test: c => c.includes("dictionnaire") || c.includes("dico") || c.includes("mot") || c.includes("قاموس"), handler: botHandlers.dictionary },
    { test: c => c.includes("grammaire") || c.includes("grammar") || c.includes("verbe") || c.includes("causatif") || c.includes("passif"), handler: botHandlers.grammar },
    { test: c => c.includes("conte") || c.includes("histoire") || c.includes("légende") || c.includes("حكاية"), handler: botHandlers.tales },
    { test: c => c.includes("émission") || c.includes("radio") || c.includes("broadcast"), handler: botHandlers.broadcasts },
    { test: c => c.includes("audio") || c.includes("musique"), handler: botHandlers.audio },
    { test: c => c.includes("aide") || c.includes("help") || c.includes("مساعدة"), handler: botHandlers.help },
    { test: c => c.includes("livre") || c.includes("bibliothèque") || c.includes("كتاب") || c.length > 10, handler: botHandlers.books }
  ];
}

function reponseBot(txt) {
  const clean = txt.toLowerCase().trim();
  const lang = AppState.currentLanguage;
  const matchers = buildBotMatchers();
  
  for (const { test, handler } of matchers) {
    if (test(clean)) return handler(clean, lang);
  }
  return i18n[lang].bot_default;
}

function afficheMsg(user, html) {
  if (!DOM.chatWindow) return;
  const div = document.createElement("div");
  div.className = `message ${user}`;
  div.innerHTML = `<strong>${user === "bot" ? "🤖 Hamadine" : "👤 Vous"} :</strong> ${html}`;
  DOM.chatWindow.appendChild(div);
  DOM.chatWindow.scrollTop = DOM.chatWindow.scrollHeight;
}

function traiterSaisie() {
  if (!DOM.chatInput) return;
  const txt = DOM.chatInput.value.trim();
  if (!txt) return;
  
  DOM.chatInput.value = "";
  DOM.chatInput.disabled = true;
  afficheMsg("user", escapeHtml(txt));
  
  setTimeout(() => {
    afficheMsg("bot", reponseBot(txt));
    DOM.chatInput.disabled = false;
    DOM.chatInput.focus();
  }, 400);
}

function initChatEvents() {
  getElement("btnEnvoyer", false)?.addEventListener("click", traiterSaisie);
  DOM.chatInput?.addEventListener("keypress", e => { if (e.key === "Enter") traiterSaisie(); });
  if (DOM.chatWindow && !DOM.chatWindow.dataset.initialized) {
    DOM.chatWindow.dataset.initialized = 'true';
    afficheMsg("bot", i18n[AppState.currentLanguage].chat_welcome_msg);
  }
}

// ============================================================
// SECTION 8 : DICTIONNAIRE (Version robuste avec cache)
// ============================================================

async function chargerDictionnaire() {
  try {
    const response = await fetch('data/mots.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    AppState.vocabulaire = await response.json();
    console.log(`📖 Dictionnaire : ${AppState.vocabulaire.length} mots`);
  } catch(e) {
    console.warn("Erreur chargement dictionnaire, utilisation fallback", e);
    AppState.vocabulaire = [
      { mot: "Báy", cat: "vt.", fr: "Pouvoir (faire)", ar: "قدر على", en: "Able, to be" },
      { mot: "Yiddár", cat: "vi.", fr: "Être en vie", ar: "يكون حياً", en: "Alive, to be" },
      { mot: "Káamil", cat: "quantifier", fr: "Tout", ar: "كل", en: "All" },
      { mot: "ayo", cat: "pron.", fr: "qui, que (relatif sg défini)", ar: "الذي", en: "who, which, that (sg)" },
      { mot: "ayondo", cat: "pron.", fr: "qui, que (relatif pl défini)", ar: "الذين", en: "who, which, that (pl)" },
      { mot: "sa", cat: "conj.", fr: "qui, que (non-restrictif)", ar: "الذي", en: "who, which (non-restrictive)" }
    ];
  }
  AppState.motsListe = AppState.vocabulaire.map((item, idx) => ({ ...item, index: idx }));
  
  const statMots = getElement("statMots", false);
  if (statMots) statMots.textContent = AppState.vocabulaire.length;
  const statsContainer = getElement("statsContainer", false);
  if (statsContainer) statsContainer.hidden = false;
  
  construireIndexAlphabet();
  if (AppState.vocabulaire[0]) afficherMot(AppState.vocabulaire[0]);
}

const categorieLabels = {
  fr: { "vt.": "Verbe transitif", "vi.": "Verbe intransitif", "n.": "Nom", "npl.": "Nom (pluriel uniquement)", "adj.": "Adjectif", "adv.": "Adverbe", "conj.": "Conjonction", "postp.": "Postposition", "prep.": "Préposition", "pron.": "Pronom", "dem.": "Démonstratif", "num.": "Numéral", "quantifier": "Quantifieur", "phrase": "Expression", "idiom": "Idiome" },
  en: { "vt.": "Transitive verb", "vi.": "Intransitive verb", "n.": "Noun", "npl.": "Noun (plural only)", "adj.": "Adjective", "adv.": "Adverb", "conj.": "Conjunction", "postp.": "Postposition", "prep.": "Preposition", "pron.": "Pronoun", "dem.": "Demonstrative", "num.": "Numeral", "quantifier": "Quantifier", "phrase": "Phrase", "idiom": "Idiom" },
  ar: { "vt.": "فعل متعد", "vi.": "فعل لازم", "n.": "اسم", "npl.": "اسم (جمع فقط)", "adj.": "صفة", "adv.": "ظرف", "conj.": "حرف عطف", "postp.": "حرف جر لاحق", "prep.": "حرف جر", "pron.": "ضمير", "dem.": "اسم إشارة", "num.": "عدد", "quantifier": "محدد كمي", "phrase": "عبارة", "idiom": "تعبير اصطلاحي" }
};

function afficherMot(item) {
  if (!item) return;
  const lang = AppState.currentLanguage;
  AppState.motActuel = item;
  AppState.currentIndex = AppState.motsListe.findIndex(m => m.mot === item.mot);
  
  if (DOM.compteurMot) DOM.compteurMot.textContent = `${AppState.currentIndex + 1} / ${AppState.motsListe.length}`;
  if (DOM.btnPrev) DOM.btnPrev.disabled = AppState.currentIndex <= 0;
  if (DOM.btnNext) DOM.btnNext.disabled = AppState.currentIndex >= AppState.motsListe.length - 1;
  if (DOM.motElem) DOM.motElem.textContent = item.mot;
  
  if (DOM.defElem) {
    const catLabel = categorieLabels[lang]?.[item.cat] || item.cat || '';
    const isFavori = AppState.favoris.includes(item.mot);
    const def = lang === 'fr' ? (item.fr || item.en || '') : lang === 'en' ? (item.en || item.fr || '') : (item.ar || item.fr || '');
    const labelDef = lang === 'fr' ? '🇫🇷 Définition' : lang === 'en' ? '🇬🇧 Definition' : '🇸🇦 التعريف';
    const labelCat = lang === 'fr' ? '📂 Catégorie' : lang === 'en' ? '📂 Category' : '📂 الفئة';
    
    DOM.defElem.innerHTML = `
      <p><strong>${labelCat} :</strong> ${escapeHtml(catLabel)}</p>
      <p><strong>${labelDef} :</strong> ${escapeHtml(def)}</p>
      ${item.fr && lang !== 'fr' ? `<p><strong>🇫🇷 Français :</strong> ${escapeHtml(item.fr)}</p>` : ''}
      ${item.ar && lang !== 'ar' ? `<p><strong>🇸🇦 بالعربية :</strong> ${escapeHtml(item.ar)}</p>` : ''}
      <div class="mot-actions">
        <button class="btn-small" data-action="share">📤 ${i18n[lang].share}</button>
        <button class="btn-small" data-action="favorite">⭐ ${isFavori ? i18n[lang].remove_favorite : i18n[lang].add_favorite}</button>
      </div>
    `;
  }
  
  if (DOM.audioElem) {
    if (item.audio) {
      DOM.audioElem.src = `audio/${item.audio}`;
      DOM.audioElem.hidden = false;
      DOM.audioElem.load();
    } else {
      DOM.audioElem.hidden = true;
    }
  }
  ajouterHistorique(item.mot);
}

function navigationPrecedent() { if (AppState.currentIndex > 0) afficherMot(AppState.motsListe[AppState.currentIndex - 1]); }
function navigationSuivant() { if (AppState.currentIndex < AppState.motsListe.length - 1) afficherMot(AppState.motsListe[AppState.currentIndex + 1]); }

function chercher(queryRaw) {
  const query = normalizeText(queryRaw);
  if (!query || !AppState.vocabulaire.length) return [];
  if (searchCache.has(query)) return searchCache.get(query);
  
  const maxDist = Math.max(2, Math.floor(query.length * 0.4));
  const resultats = [];
  for (const item of AppState.vocabulaire) {
    let score = Infinity;
    const motNorm = normalizeText(item.mot);
    if (motNorm.includes(query)) {
      score = motNorm.startsWith(query) ? 0 : 1;
    } else if (item.fr && normalizeText(item.fr).includes(query)) score = 2;
    else if (item.en && normalizeText(item.en).includes(query)) score = 3;
    else if (item.ar && normalizeText(item.ar).includes(query)) score = 4;
    else {
      const dist = levenshtein(motNorm, query);
      if (dist <= maxDist) score = 5 + dist;
    }
    if (score < Infinity) resultats.push({ item, score });
  }
  const sorted = resultats.sort((a, b) => a.score - b.score).slice(0, 15).map(r => r.item);
  searchCache.set(query, sorted);
  return sorted;
}

function construireIndexAlphabet() {
  const container = getElement("alphabetIndex", false);
  const wordListContainer = getElement("wordList", false);
  if (!container || !wordListContainer) return;
  
  const letters = [...new Set(AppState.vocabulaire.map(v => v.mot?.[0]?.toUpperCase()).filter(Boolean))].sort();
  container.innerHTML = "";
  letters.forEach(l => {
    const btn = document.createElement("button");
    btn.textContent = l;
    btn.className = "alphabet-btn";
    btn.addEventListener("click", () => {
      wordListContainer.innerHTML = "";
      AppState.vocabulaire.filter(v => v.mot?.toUpperCase().startsWith(l)).forEach(m => {
        const div = document.createElement("div");
        div.textContent = m.mot;
        div.className = "mot-item";
        div.addEventListener("click", () => afficherMot(m));
        wordListContainer.appendChild(div);
      });
    });
    container.appendChild(btn);
  });
}

function initDictionaryEvents() {
  DOM.btnPrev?.addEventListener("click", navigationPrecedent);
  DOM.btnNext?.addEventListener("click", navigationSuivant);
  
  DOM.defElem?.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn || !AppState.motActuel) return;
    if (btn.dataset.action === "share") partagerMot(AppState.motActuel);
    if (btn.dataset.action === "favorite") basculerFavori(AppState.motActuel);
  });
  
  if (DOM.searchBar) {
    const debouncedSearch = debounce((raw) => {
      if (!DOM.suggestionsList) return;
      DOM.suggestionsList.innerHTML = "";
      DOM.suggestionsList.classList.remove("show");
      if (!raw) return;
      
      const resultats = chercher(raw);
      if (!resultats.length) {
        const li = document.createElement("li");
        li.textContent = "🔍 Aucun résultat";
        li.style.cssText = "padding: 0.75rem; color: var(--text-muted);";
        DOM.suggestionsList.appendChild(li);
      } else {
        resultats.forEach(item => {
          const li = document.createElement("li");
          const lang = AppState.currentLanguage;
          const extra = lang === 'fr' ? item.fr : lang === 'en' ? item.en : item.ar;
          const preview = (extra || '').substring(0, 80);
          li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong> <span class="mot-cat">(${escapeHtml(item.cat || '')})</span><br><small>${escapeHtml(preview)}${preview.length === 80 ? '…' : ''}</small>`;
          li.style.cssText = "cursor: pointer; padding: 0.75rem; border-bottom: 1px solid var(--border-color);";
          li.addEventListener("click", () => {
            DOM.searchBar.value = item.mot;
            DOM.suggestionsList.innerHTML = "";
            DOM.suggestionsList.classList.remove("show");
            afficherMot(item);
          });
          DOM.suggestionsList.appendChild(li);
        });
      }
      DOM.suggestionsList.classList.add("show");
    }, 300);
    DOM.searchBar.addEventListener("input", (e) => {
      const raw = e.target.value.trim();
      if (DOM.clearSearchBtn) DOM.clearSearchBtn.hidden = !raw;
      debouncedSearch(raw);
    });
  }
  
  DOM.clearSearchBtn?.addEventListener("click", () => {
    if (DOM.searchBar) DOM.searchBar.value = "";
    DOM.searchBar?.focus();
    if (DOM.clearSearchBtn) DOM.clearSearchBtn.hidden = true;
    if (DOM.suggestionsList) {
      DOM.suggestionsList.innerHTML = "";
      DOM.suggestionsList.classList.remove("show");
    }
  });
}

// ============================================================
// SECTION 9 : HISTORIQUE & FAVORIS
// ============================================================

function ajouterHistorique(mot) {
  AppState.historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  AppState.historique = AppState.historique.filter(m => m !== mot);
  AppState.historique.unshift(mot);
  if (AppState.historique.length > 20) AppState.historique.pop();
  localStorage.setItem("historiqueTadakssahak", JSON.stringify(AppState.historique));
  afficherHistorique();
}

function afficherHistorique() {
  const footer = document.querySelector("footer");
  let bloc = getElement("historique", false);
  if (!bloc && footer) { bloc = document.createElement("div"); bloc.id = "historique"; footer.appendChild(bloc); }
  if (!bloc) return;
  if (!AppState.historique.length) { bloc.innerHTML = "<em>Aucun mot consulté récemment.</em>"; return; }
  bloc.innerHTML = `<strong>📜 Derniers mots :</strong> ${AppState.historique.map(m => `<span class='mot-historique' data-mot="${escapeHtml(m)}">${escapeHtml(m)}</span>`).join(", ")}`;
  bloc.querySelectorAll(".mot-historique").forEach(el => {
    el.addEventListener("click", () => {
      const mot = AppState.vocabulaire.find(v => v.mot === el.dataset.mot);
      if (mot) afficherMot(mot);
    });
  });
}

function chargerHistorique() { AppState.historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || []; afficherHistorique(); }
function chargerFavoris() { AppState.favoris = JSON.parse(localStorage.getItem("favorisTadakssahak")) || []; }
function sauvegarderFavoris() { localStorage.setItem("favorisTadakssahak", JSON.stringify(AppState.favoris)); }

function basculerFavori(item) {
  const isFavori = AppState.favoris.includes(item.mot);
  if (isFavori) {
    AppState.favoris = AppState.favoris.filter(m => m !== item.mot);
    showToast(i18n[AppState.currentLanguage].remove_favorite, "info");
  } else {
    AppState.favoris.push(item.mot);
    showToast(i18n[AppState.currentLanguage].add_favorite, "success");
  }
  sauvegarderFavoris();
  if (AppState.motActuel === item) afficherMot(item);
  const dashboard = getElement("dashboard", false);
  if (dashboard && !dashboard.hidden) afficherDashboard();
}

function partagerMot(item) {
  const lang = AppState.currentLanguage;
  const def = lang === 'fr' ? item.fr : lang === 'en' ? item.en : item.ar;
  const text = `${item.mot} : ${def || ''}`;
  if (navigator.share) {
    navigator.share({ title: 'Mot Tadaksahak', text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text);
    showToast("📋 Copié dans le presse-papier", "success");
  }
}

// ============================================================
// SECTION 10 : MOT DU JOUR
// ============================================================

function getWordOfDay() {
  if (!AppState.vocabulaire.length) return null;
  const today = new Date().toISOString().slice(0, 10);
  const stored = localStorage.getItem('word_of_day');
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.date === today) return parsed.word;
  }
  const randomIdx = Math.floor(Math.random() * AppState.vocabulaire.length);
  const word = AppState.vocabulaire[randomIdx];
  localStorage.setItem('word_of_day', JSON.stringify({ date: today, word: word.mot }));
  return word.mot;
}

function afficherMotDuJour() {
  const container = getElement("wordOfDayContainer", false);
  if (!container) return;
  const mot = getWordOfDay();
  if (!mot) return;
  const item = AppState.vocabulaire.find(v => v.mot === mot);
  if (!item) return;
  const lang = AppState.currentLanguage;
  const def = lang === 'fr' ? item.fr : lang === 'en' ? item.en : item.ar;
  container.innerHTML = `<strong>${i18n[lang].word_of_day}</strong> : ${escapeHtml(mot)} — ${escapeHtml(def || '')}`;
}

function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
}

function showWordNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    const mot = getWordOfDay();
    if (mot) new Notification(`📖 Mot du jour : ${mot}`);
  }
}

// ============================================================
// SECTION 11 : LIVRE DE GRAMMAIRE INTERACTIF (Version premium)
// ============================================================

async function loadGrammarBook() {
  if (AppState.grammarBlocks.length > 0) return;
  try {
    const response = await fetch('data/grammaire.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    AppState.grammarBlocks = await response.json();
    if (!Array.isArray(AppState.grammarBlocks)) throw new Error('Format invalide');
    console.log(`📚 Grammaire : ${AppState.grammarBlocks.length} blocs chargés`);
    initGrammarBook();
  } catch (error) {
    console.error('Erreur chargement grammaire.json:', error);
    const left = getElement('leftContent', false);
    if (left) left.innerHTML = '<p style="color:red;">❌ Erreur de chargement des données grammaticales.</p>';
  }
}

function renderBookPage(side, block) {
  const elements = side === 'left' ? {
    title: DOM.bookElements.leftTitle,
    content: DOM.bookElements.leftContent,
    range: DOM.bookElements.leftRange,
    keywords: DOM.bookElements.leftKeywords,
    pageNum: DOM.bookElements.leftPageNum
  } : {
    title: DOM.bookElements.rightTitle,
    content: DOM.bookElements.rightContent,
    range: DOM.bookElements.rightRange,
    keywords: DOM.bookElements.rightKeywords,
    pageNum: DOM.bookElements.rightPageNum
  };
  
  if (!block) {
    if (elements.title) elements.title.textContent = '';
    if (elements.content) elements.content.innerHTML = '<p style="opacity:0.5;">— Fin du livre —</p>';
    if (elements.range) elements.range.textContent = '';
    if (elements.keywords) elements.keywords.innerHTML = '';
    if (elements.pageNum) elements.pageNum.textContent = '';
    return;
  }
  
  const title = block.titre_section?.[AppState.currentGrammarLang] || block.titre_section?.fr || '';
  const content = block.contenu?.[AppState.currentGrammarLang] || block.contenu?.fr || '';
  const plage = block.plage_pages || '';
  const keywords = block.mots_cles || [];
  
  if (elements.title) elements.title.textContent = title;
  if (elements.content) elements.content.innerHTML = `<p>${content.replace(/\n/g, '<br>')}</p>`;
  if (elements.range) elements.range.textContent = `📄 p. ${plage}`;
  if (elements.keywords) elements.keywords.innerHTML = keywords.map(k => `<span class="keyword-tag">${escapeHtml(k)}</span>`).join('');
  if (elements.pageNum) elements.pageNum.textContent = `Bloc ${block.bloc_id}`;
}

function updateGrammarSpread() {
  const leftBlock = AppState.grammarBlocks[AppState.currentBlockIndex] || null;
  const rightBlock = (AppState.currentBlockIndex + 1 < AppState.grammarBlocks.length) ? AppState.grammarBlocks[AppState.currentBlockIndex + 1] : null;
  
  renderBookPage('left', leftBlock);
  renderBookPage('right', rightBlock);
  
  const total = AppState.grammarBlocks.length;
  const start = AppState.currentBlockIndex + 1;
  const end = Math.min(AppState.currentBlockIndex + 2, total);
  if (DOM.bookElements.pageIndicator) DOM.bookElements.pageIndicator.textContent = `Blocs ${start}–${end} / ${total}`;
  if (DOM.bookElements.prevBtn) DOM.bookElements.prevBtn.disabled = (AppState.currentBlockIndex === 0);
  if (DOM.bookElements.nextBtn) DOM.bookElements.nextBtn.disabled = (AppState.currentBlockIndex + 2 >= total);
}

function nextGrammarSpread() {
  if (AppState.currentBlockIndex + 2 < AppState.grammarBlocks.length) {
    AppState.currentBlockIndex += 2;
    updateGrammarSpread();
    animateBookSpread(-5);
  }
}

function prevGrammarSpread() {
  if (AppState.currentBlockIndex > 0) {
    AppState.currentBlockIndex = Math.max(0, AppState.currentBlockIndex - 2);
    updateGrammarSpread();
    animateBookSpread(5);
  }
}

function animateBookSpread(offsetX) {
  if (!DOM.bookElements.bookSpread) return;
  DOM.bookElements.bookSpread.style.transform = `translateX(${offsetX}px)`;
  setTimeout(() => { if (DOM.bookElements.bookSpread) DOM.bookElements.bookSpread.style.transform = ''; }, 150);
}

function setGrammarLanguage(lang) {
  AppState.currentGrammarLang = lang;
  localStorage.setItem('preferredLanguage', lang);
  document.querySelectorAll('#grammaire .lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  if (AppState.grammarBlocks.length) updateGrammarSpread();
}

function initGrammarBook() {
  if (AppState.bookInitialized) return;
  AppState.currentBlockIndex = 0;
  updateGrammarSpread();
  
  DOM.bookElements.prevBtn?.addEventListener('click', prevGrammarSpread);
  DOM.bookElements.nextBtn?.addEventListener('click', nextGrammarSpread);
  
  document.querySelectorAll('#grammaire .lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setGrammarLanguage(btn.dataset.lang));
  });
  
  let touchStartX = 0;
  DOM.bookElements.bookSpread?.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  DOM.bookElements.bookSpread?.addEventListener('touchend', (e) => {
    if (!touchStartX) return;
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) diff < 0 ? nextGrammarSpread() : prevGrammarSpread();
    touchStartX = 0;
  });
  
  document.addEventListener('keydown', (e) => {
    const gramSection = getElement('grammaire', false);
    if (!gramSection || gramSection.hidden) return;
    if (e.key === 'ArrowLeft') { prevGrammarSpread(); e.preventDefault(); }
    if (e.key === 'ArrowRight') { nextGrammarSpread(); e.preventDefault(); }
  });
  
  AppState.bookInitialized = true;
  console.log('📖 Livre grammaire initialisé');
}

async function showGrammarSection() {
  await chargerAvecFallback(loadGrammarBook, "Livre grammaire");
  if (AppState.currentGrammarLang !== AppState.currentLanguage) setGrammarLanguage(AppState.currentLanguage);
}

// ============================================================
// SECTION 12 : PROPOSITIONS RELATIVES (Version premium)
// ============================================================

async function chargerRelatives() {
  try {
    const response = await fetch('data/relatives.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    AppState.relativesData = await response.json();
    console.log('📚 Relatives chargées');
  } catch(e) {
    console.warn("Erreur chargement relatives.json", e);
    AppState.relativesData = null;
  }
}

async function afficherRelatives() {
  const container = getElement("relativesContainer", false);
  if (!container) return;
  if (!AppState.relativesData) await chargerRelatives();
  if (!AppState.relativesData) { container.innerHTML = `<p class="info-message">📚 Données sur les relatives non disponibles.</p>`; return; }
  
  const lang = AppState.currentLanguage;
  let html = `
    <div class="relatives-premium-intro">
      <div class="premium-icon">📖</div>
      <h3>${i18n[lang].grammar_relatives_title}</h3>
      <p>${i18n[lang].grammar_relatives_desc}</p>
    </div>
    <div class="strategies-premium-grid">
  `;
  
  for (const strat of AppState.relativesData.strategies) {
    const usage = lang === 'fr' ? strat.usage_fr : lang === 'en' ? strat.usage_en : strat.usage_ar;
    const marqueurAffiche = strat.marqueur === "∅" ? "∅ (aucun)" : (strat.marqueur_sg || strat.marqueur);
    html += `
      <div class="strategy-premium-card">
        <div class="strategy-header">
          <span class="strategy-marker">${escapeHtml(marqueurAffiche)}</span>
          <span class="strategy-type">${strat.marqueur === "∅" ? "Gap Strategy" : (strat.marqueur === "sa" ? "Non-restrictive" : "Relative Pronoun")}</span>
        </div>
        <p class="strategy-usage-premium">${escapeHtml(usage)}</p>
        <div class="strategy-exemples-premium">
    `;
    for (const ex of (strat.exemples || []).slice(0, 2)) {
      const trad = lang === 'fr' ? ex.traduction_fr : lang === 'en' ? ex.traduction_en : ex.traduction_ar;
      html += `<div class="exemple-premium-card"><div class="exemple-tad-premium">${escapeHtml(ex.tadaksahak)}</div><div class="exemple-gloss-premium">${escapeHtml(ex.glose_fr)}</div><div class="exemple-trans-premium">${escapeHtml(trad)}</div></div>`;
    }
    html += `</div></div>`;
  }
  html += `</div>`;
  container.innerHTML = html;
}

// ============================================================
// SECTION 13 : CONTES (Version premium)
// ============================================================

async function chargerContes() {
  try {
    const response = await fetch('data/conte.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    AppState.contesData = await response.json();
    console.log('📖 Contes chargés');
  } catch(e) { console.warn("Erreur chargement contes", e); AppState.contesData = null; }
}

function afficherContes() {
  const container = getElement("contesContainer", false);
  if (!container || !AppState.contesData) return;
  const lang = AppState.currentLanguage;
  const contes = Array.isArray(AppState.contesData) ? AppState.contesData : [AppState.contesData];
  
  let html = `<div class="contes-premium-grid">`;
  for (const conte of contes) {
    const titre = lang === 'fr' ? conte.titre_fr : lang === 'en' ? conte.titre_en : conte.titre_ar;
    const resume = lang === 'fr' ? conte.resume_fr : lang === 'en' ? conte.resume_en : conte.resume_ar;
    html += `
      <div class="conte-premium-card">
        <div class="conte-card-icon">📖</div>
        <h3>${escapeHtml(titre || 'Sans titre')}</h3>
        <div class="conte-meta-premium"><span>📜 ${escapeHtml(conte.type || 'conte')}</span><span>🗣️ ${escapeHtml(conte.narrateur || 'Tradition orale')}</span></div>
        <p class="conte-resume-premium">${escapeHtml(resume || '')}</p>
        <button class="btn-lire-conte-premium" data-conte-id="${conte.id || 0}">📖 Lire le conte</button>
      </div>
    `;
  }
  html += `</div>`;
  container.innerHTML = html;
  
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-lire-conte-premium');
    if (!btn) return;
    const id = parseInt(btn.dataset.conteId);
    const conte = contes.find(c => c.id === id);
    if (conte) afficherConteDetail(conte);
  });
}

function afficherConteDetail(conte) {
  const lang = AppState.currentLanguage;
  const titre = lang === 'fr' ? conte.titre_fr : lang === 'en' ? conte.titre_en : conte.titre_ar;
  const morale = lang === 'fr' ? conte.morale_fr : lang === 'en' ? conte.morale_en : conte.morale_ar;
  
  let modalHtml = `<div id="conteModal" class="modal"><div class="modal-content"><button class="modal-close">&times;</button><h2>${escapeHtml(titre)}</h2><div class="conte-versets">`;
  for (const verset of (conte.versets || [])) {
    const trad = lang === 'fr' ? verset.traduction_fr : lang === 'en' ? verset.traduction_en : (verset.traduction_ar || verset.traduction_fr);
    modalHtml += `<div class="verset"><div class="verset-num">${verset.numero}</div><div class="verset-tad"><strong>${escapeHtml(verset.tadaksahak || '')}</strong></div><div class="verset-gloss">${escapeHtml(verset.glose_fr || '')}</div><div class="verset-trans">${escapeHtml(trad)}</div></div>`;
  }
  modalHtml += `</div>${morale ? `<div class="conte-morale"><strong>💡 Morale :</strong> ${escapeHtml(morale)}</div>` : ''}</div></div>`;
  
  getElement('conteModal', false)?.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = getElement('conteModal', false);
  modal?.querySelector('.modal-close')?.addEventListener('click', () => modal.remove());
  modal?.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

// ============================================================
// SECTION 14 : ÉMISSIONS (Version premium)
// ============================================================

async function chargerEmissions() {
  try {
    const response = await fetch('data/emission.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    AppState.emissionsData = await response.json();
    console.log('🎙️ Émissions chargées');
  } catch(e) { console.warn("Erreur chargement émissions", e); AppState.emissionsData = null; }
}

function afficherEmissionsPremium() {
  const container = getElement("emissionsContainer", false);
  if (!container || !AppState.emissionsData) return;
  const lang = AppState.currentLanguage;
  const emissions = Array.isArray(AppState.emissionsData) ? AppState.emissionsData : [AppState.emissionsData];
  
  let html = `<div class="emissions-premium-intro"><div class="premium-icon">🎙️</div><h3>${i18n[lang].emissions_title}</h3></div><div class="emissions-premium-grid">`;
  for (const emission of emissions) {
    const titre = lang === 'fr' ? emission.titre_fr : lang === 'en' ? emission.titre_en : emission.titre_ar;
    const contexte = lang === 'fr' ? emission.contexte_fr : lang === 'en' ? emission.contexte_en : emission.contexte_ar;
    const emissionId = emission.id || 0;
    html += `
      <div class="emission-premium-card">
        <div class="emission-card-header"><div class="emission-icon">🎙️</div><div class="emission-info"><h4>${escapeHtml(titre)}</h4><div class="emission-meta-premium"><span>📅 ${emission.date || '?'}</span><span>🗣️ ${escapeHtml(emission.orateur || 'Inconnu')}</span><span>📍 ${escapeHtml(emission.lieu || '?')}</span></div></div></div>
        <p class="emission-contexte-premium">${escapeHtml(contexte || '')}</p>
        <button class="btn-emission-premium" data-emission-id="${emissionId}">🎧 Lire la transcription</button>
        <div class="emission-transcription" id="emissionTrans-${emissionId}" hidden>
    `;
    for (const verset of (emission.versets || [])) {
      const trad = lang === 'fr' ? verset.traduction_fr : lang === 'en' ? verset.traduction_en : (verset.traduction_ar || verset.traduction_fr);
      html += `<div class="verset"><div class="verset-num">${verset.numero}</div><div class="verset-tad"><strong>${escapeHtml(verset.tadaksahak || '')}</strong></div><div class="verset-gloss">${escapeHtml(verset.glose_fr || '')}</div><div class="verset-trans">${escapeHtml(trad)}</div></div>`;
    }
    html += `</div></div>`;
  }
  html += `</div>`;
  container.innerHTML = html;
  
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-emission-premium');
    if (!btn) return;
    const id = btn.dataset.emissionId;
    const transcriptEl = getElement(`emissionTrans-${id}`, false);
    if (!transcriptEl) return;
    const isHidden = transcriptEl.hidden;
    transcriptEl.hidden = !isHidden;
    btn.textContent = isHidden ? '📖 Masquer la transcription' : '🎧 Lire la transcription';
  });
}

// ============================================================
// SECTION 15 : THÈMES VOCABULAIRE (Version premium)
// ============================================================

async function chargerThemes() {
  try {
    const response = await fetch('data/themes.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    AppState.themesData = await response.json();
    console.log('📚 Thèmes chargés');
  } catch(e) { console.warn("Erreur chargement thèmes", e); AppState.themesData = null; }
}

function afficherThemesPremium() {
  const container = getElement("themesContainer", false);
  if (!container || !AppState.themesData?.themes?.length) {
    if (container) container.innerHTML = `<p class="info-message">📚 Aucun thème disponible.</p>`;
    return;
  }
  const lang = AppState.currentLanguage;
  const themes = AppState.themesData.themes;
  const totalMots = themes.reduce((acc, t) => acc + (t.mots?.length || 0), 0);
  
  let html = `
    <div class="themes-premium-header">
      <div class="premium-icon">📚</div>
      <h2>${i18n[lang].themes_title}</h2>
      <div class="themes-premium-search"><input type="text" id="themeSearchPremium" placeholder="🔍 Rechercher un mot..." class="theme-search-premium"></div>
      <div class="themes-premium-stats"><span class="stat-badge">📖 ${totalMots} mots</span><span class="stat-badge">📚 ${themes.length} thèmes</span></div>
    </div>
    <div class="themes-premium-grid" id="themesPremiumGrid">
  `;
  
  themes.forEach((theme, i) => {
    const titre = lang === 'fr' ? theme.titre_fr : lang === 'en' ? theme.titre_en : theme.titre_ar;
    const description = lang === 'fr' ? theme.description_fr : lang === 'en' ? theme.description_en : theme.description_ar;
    const motCount = theme.mots?.length || 0;
    html += `
      <div class="theme-premium-card" data-theme-idx="${i}">
        <div class="theme-premium-header"><div class="theme-premium-icon">📖</div><h3>${escapeHtml(titre)}</h3><span class="theme-premium-badge">${motCount} mots</span></div>
        <p class="theme-premium-desc">${escapeHtml(description || '')}</p>
        <div class="theme-premium-preview">${(theme.mots || []).slice(0, 4).map(m => `<span class="preview-word-premium">${escapeHtml(m.tad)}</span>`).join('')}${motCount > 4 ? `<span class="preview-more-premium">+${motCount - 4} autres</span>` : ''}</div>
        <button class="theme-premium-expand" data-theme-idx="${i}"><span class="expand-label">Explorer le thème</span><span class="expand-icon" aria-hidden="true">▼</span></button>
        <div class="theme-premium-words" id="themeWordsPremium-${i}" hidden>
          <div class="words-premium-header"><span>Tadaksahak</span><span>Traduction</span><span></span></div>
          <div class="words-premium-list">${(theme.mots || []).map(mot => `<div class="word-premium-row" data-mot="${escapeHtml(mot.tad)}"><span class="word-premium-tad">${escapeHtml(mot.tad)}</span><span class="word-premium-trans">${escapeHtml(lang === 'fr' ? mot.fr : lang === 'en' ? mot.en : mot.ar)}</span><button class="word-premium-play" data-speak="${escapeHtml(mot.tad)}">🔊</button></div>`).join('')}</div>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
  
  const grid = getElement('themesPremiumGrid', false);
  if (grid) {
    grid.addEventListener('click', (e) => {
      const expandBtn = e.target.closest('.theme-premium-expand');
      if (expandBtn) {
        const idx = expandBtn.dataset.themeIdx;
        const wordsPanel = getElement(`themeWordsPremium-${idx}`, false);
        if (!wordsPanel) return;
        const isExpanded = !wordsPanel.hidden;
        wordsPanel.hidden = isExpanded;
        expandBtn.querySelector('.expand-icon').textContent = isExpanded ? '▼' : '▲';
        expandBtn.querySelector('.expand-label').textContent = isExpanded ? 'Explorer le thème' : 'Réduire';
        return;
      }
      const playBtn = e.target.closest('[data-speak]');
      if (playBtn) { speakTextPremium(playBtn.dataset.speak); return; }
      const wordRow = e.target.closest('.word-premium-row');
      if (wordRow && !e.target.closest('[data-speak]')) {
        const mot = AppState.vocabulaire.find(v => v.mot === wordRow.dataset.mot);
        if (mot && DOM.sectionSelector) {
          DOM.sectionSelector.value = 'dictionnaire';
          DOM.sectionSelector.dispatchEvent(new Event('change'));
          setTimeout(() => afficherMot(mot), 100);
        }
      }
    });
  }
  
  const searchInput = getElement('themeSearchPremium', false);
  if (searchInput) {
    const debouncedThemeSearch = debounce((query) => {
      const lowerQuery = query.toLowerCase();
      document.querySelectorAll('.theme-premium-card').forEach(card => {
        const words = card.querySelectorAll('.word-premium-row');
        let hasMatch = false;
        words.forEach(word => {
          const matches = !lowerQuery || word.textContent.toLowerCase().includes(lowerQuery);
          word.style.display = matches ? 'flex' : 'none';
          if (matches) hasMatch = true;
        });
        if (lowerQuery && hasMatch) {
          const idx = card.dataset.themeIdx;
          const wordsPanel = getElement(`themeWordsPremium-${idx}`, false);
          if (wordsPanel && wordsPanel.hidden) {
            wordsPanel.hidden = false;
            card.querySelector('.expand-icon').textContent = '▲';
            card.querySelector('.expand-label').textContent = 'Réduire';
          }
        }
      });
    }, 250);
    searchInput.addEventListener('input', e => debouncedThemeSearch(e.target.value));
  }
}

function speakTextPremium(text) {
  if (!('speechSynthesis' in window)) { showToast("🔊 Synthèse vocale non supportée", "warning"); return; }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.8;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// ============================================================
// SECTION 16 : FLASHCARDS (Version premium)
// ============================================================

function genererFlashcards() {
  const container = getElement("flashcardsContainer", false);
  if (!container) return;
  const themeSelect = getElement('flashcardsThemeSelect', false);
  const theme = themeSelect?.value || 'all';
  let motsFiltres = [...AppState.vocabulaire];
  
  if (theme === 'verbes') motsFiltres = motsFiltres.filter(m => m.cat === 'vt.' || m.cat === 'vi.');
  else if (theme === 'noms') motsFiltres = motsFiltres.filter(m => m.cat === 'n.' || m.cat === 'npl.');
  else if (theme === 'relatives' && AppState.relativesData) {
    motsFiltres = [];
    for (const strat of AppState.relativesData.strategies) {
      for (const ex of (strat.exemples || [])) {
        motsFiltres.push({ mot: ex.tadaksahak.split('[')[0].trim() + ' [...]', cat: strat.marqueur_sg || strat.marqueur || 'relative', fr: ex.traduction_fr, en: ex.traduction_en, ar: ex.traduction_ar });
      }
    }
  }
  
  if (!motsFiltres.length) { container.innerHTML = `<div class="info-message">📚 Aucun mot dans cette catégorie.</div>`; return; }
  AppState.currentFlashcards = [...motsFiltres].sort(() => 0.5 - Math.random());
  AppState.currentFlashcardIndex = 0;
  afficherFlashcard();
  mettreAJourProgressionFlashcards();
}

function afficherFlashcard() {
  const container = getElement("flashcardsContainer", false);
  if (!container) return;
  if (!AppState.currentFlashcards.length || AppState.currentFlashcardIndex >= AppState.currentFlashcards.length) {
    container.innerHTML = `<div class="flashcards-complete"><h3>🎉 Félicitations !</h3><p>Vous avez terminé toutes les flashcards !</p><button id="restartFlashcardsBtn" class="btn">🔄 Recommencer</button></div>`;
    getElement('restartFlashcardsBtn', false)?.addEventListener('click', genererFlashcards);
    return;
  }
  
  const mot = AppState.currentFlashcards[AppState.currentFlashcardIndex];
  const lang = AppState.currentLanguage;
  const reponse = lang === 'fr' ? mot.fr : lang === 'en' ? mot.en : mot.ar;
  const categorie = mot.cat || 'Mot';
  
  container.innerHTML = `
    <div class="flashcard" data-flipped="false">
      <div class="flashcard-inner">
        <div class="flashcard-front"><div class="flashcard-cat">${escapeHtml(categorie)}</div><div class="flashcard-word">${escapeHtml(mot.mot)}</div><div class="flashcard-prompt">👆 Cliquez pour voir la réponse</div></div>
        <div class="flashcard-back"><div class="flashcard-def">${escapeHtml(reponse || '')}</div><div class="flashcard-buttons"><button class="flashcard-btn correct" data-action="correct">✅ Je sais</button><button class="flashcard-btn wrong" data-action="wrong">❌ Je ne sais pas</button></div></div>
      </div>
    </div>
  `;
  
  container.addEventListener('click', flashcardClickHandler, { once: true });
}

function flashcardClickHandler(e) {
  const container = getElement("flashcardsContainer", false);
  const flashcard = container?.querySelector('.flashcard');
  if (!flashcard) return;
  const actionBtn = e.target.closest('[data-action]');
  if (actionBtn) {
    if (actionBtn.dataset.action === 'correct') AppState.currentFlashcardIndex++;
    else if (actionBtn.dataset.action === 'wrong') {
      const wrongCard = AppState.currentFlashcards.splice(AppState.currentFlashcardIndex, 1)[0];
      AppState.currentFlashcards.push(wrongCard);
    }
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
    return;
  }
  const isFlipped = flashcard.getAttribute('data-flipped') === 'true';
  flashcard.setAttribute('data-flipped', String(!isFlipped));
  container.addEventListener('click', flashcardClickHandler, { once: true });
}

function mettreAJourProgressionFlashcards() {
  const currentSpan = getElement('flashcardCurrent', false);
  const totalSpan = getElement('flashcardTotal', false);
  if (currentSpan) currentSpan.textContent = AppState.currentFlashcardIndex + 1;
  if (totalSpan) totalSpan.textContent = AppState.currentFlashcards.length;
}

function initFlashcards() {
  const themeSelect = getElement('flashcardsThemeSelect', false);
  const shuffleBtn = getElement('shuffleFlashcardsBtn', false);
  const resetBtn = getElement('resetFlashcardsBtn', false);
  themeSelect?.addEventListener('change', genererFlashcards);
  shuffleBtn?.addEventListener('click', () => {
    if (!AppState.currentFlashcards.length) return;
    AppState.currentFlashcards.sort(() => 0.5 - Math.random());
    AppState.currentFlashcardIndex = 0;
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
  resetBtn?.addEventListener('click', () => {
    if (!AppState.currentFlashcards.length) return;
    AppState.currentFlashcardIndex = 0;
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
  if (AppState.vocabulaire.length) genererFlashcards();
}

// ============================================================
// SECTION 17 : QUIZ
// ============================================================

async function chargerQuiz() {
  try {
    const response = await fetch('data/quiz.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    AppState.quizData = await response.json();
  } catch(e) {
    console.warn("Quiz non disponible, utilisation fallback", e);
    AppState.quizData = { fr: [{ question: "Exemple de question ?", options: ["A", "B", "C"], reponse: 0 }], en: [{ question: "Example question?", options: ["A", "B", "C"], reponse: 0 }], ar: [{ question: "سؤال مثال؟", options: ["A", "B", "C"], reponse: 0 }] };
  }
  const container = getElement("quizContainer", false);
  if (container) container.innerHTML = `<button id="startQuizBtn" class="btn">${i18n[AppState.currentLanguage].quiz_start}</button>`;
  getElement('startQuizBtn', false)?.addEventListener('click', demarrerQuiz);
}

function demarrerQuiz() {
  const lang = AppState.currentLanguage;
  if (!AppState.quizData?.[lang]) return;
  AppState.currentQuiz = { questions: AppState.quizData[lang], currentIndex: 0, score: 0, lang: lang };
  afficherQuestionQuiz();
}

function afficherQuestionQuiz() {
  const container = getElement("quizContainer", false);
  if (!container) return;
  const q = AppState.currentQuiz.questions[AppState.currentQuiz.currentIndex];
  if (!q) return terminerQuiz();
  const total = AppState.currentQuiz.questions.length;
  const current = AppState.currentQuiz.currentIndex + 1;
  container.innerHTML = `<div class="quiz-question"><p><strong>${escapeHtml(q.question)}</strong></p><div class="quiz-options">${q.options.map((opt, idx) => `<button class="quiz-option" data-opt="${idx}">${escapeHtml(opt)}</button>`).join('')}</div><div class="quiz-progress">Question ${current}/${total}</div></div>`;
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.quiz-option');
    if (!btn) return;
    const selected = parseInt(btn.dataset.opt);
    if (selected === q.reponse) AppState.currentQuiz.score++;
    AppState.currentQuiz.currentIndex++;
    afficherQuestionQuiz();
  }, { once: true });
}

function terminerQuiz() {
  const container = getElement("quizContainer", false);
  if (!container) return;
  const { score, questions, lang } = AppState.currentQuiz;
  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  const progress = JSON.parse(localStorage.getItem("quizProgress") || "{}");
  progress[lang] = { score, total, date: new Date().toISOString() };
  localStorage.setItem("quizProgress", JSON.stringify(progress));
  container.innerHTML = `<div class="quiz-result"><p>${i18n[AppState.currentLanguage].quiz_score} : ${score}/${total} (${percent}%)</p><button id="restartQuizBtn" class="btn">${i18n[AppState.currentLanguage].quiz_restart}</button></div>`;
  getElement('restartQuizBtn', false)?.addEventListener('click', demarrerQuiz);
  const dashboard = getElement("dashboard", false);
  if (dashboard && !dashboard.hidden) afficherDashboard();
}

// ============================================================
// SECTION 18 : TIMELINE & CARTE
// ============================================================

async function chargerTimeline() {
  try {
    const response = await fetch('data/timeline.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    AppState.timelineData = await response.json();
    console.log('📅 Timeline chargée');
  } catch(e) { console.warn("Timeline non disponible", e); AppState.timelineData = []; }
}

function afficherTimeline() {
  const container = getElement("timelineContainer", false);
  if (!container || !AppState.timelineData) return;
  const events = AppState.timelineData.filter(e => e.lang === AppState.currentLanguage);
  if (!events.length) { container.innerHTML = "<p>Aucun événement</p>"; return; }
  container.innerHTML = `<div class="timeline">${events.map(event => `<div class="timeline-item"><div class="timeline-date">${escapeHtml(event.date)}</div><div class="timeline-content"><h4>${escapeHtml(event.title)}</h4><p>${escapeHtml(event.description)}</p>${event.image ? `<img src="${escapeHtml(event.image)}" alt="" style="max-width:100%; border-radius:8px; margin-top:0.5rem;" loading="lazy">` : ''}</div></div>`).join('')}</div>`;
}

function initialiserCarte() {
  const container = getElement("mapContainer", false);
  if (!container || AppState.mapInitialized) return;
  function creerCarte() {
    const map = L.map('mapContainer').setView([16.0, 0.0], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' }).addTo(map);
    const lang = AppState.currentLanguage;
    const points = [{ lat: 15.9167, lon: 2.4167, fr: "Ménaka", ar: "ميناكا", en: "Ménaka" }, { lat: 16.2667, lon: -0.05, fr: "Gao", ar: "غاو", en: "Gao" }, { lat: 15.7167, lon: 0.9167, fr: "Talatayt", ar: "تالاتايت", en: "Talatayt" }];
    points.forEach(p => { const name = lang === 'fr' ? p.fr : lang === 'ar' ? p.ar : p.en; L.marker([p.lat, p.lon]).addTo(map).bindPopup(name); });
    AppState.mapInitialized = true;
  }
  if (AppState.leafletLoaded) { creerCarte(); return; }
  const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
  const script = document.createElement('script'); script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; script.onload = () => { AppState.leafletLoaded = true; creerCarte(); }; document.head.appendChild(script);
}

// ============================================================
// SECTION 19 : LIVRES & RAPPORTS
// ============================================================

async function afficherLivres() {
  const cont = getElement("livresContainer", false);
  if (!cont) return;
  showSkeleton('livresContainer');
  try {
    const response = await fetch('data/livres.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const allLivres = await response.json();
    const langCible = AppState.currentLanguage === "fr" ? "Français" : AppState.currentLanguage === "ar" ? "Arabe" : "English";
    const livres = allLivres.filter(l => l.langue === langCible && l.type !== "rapport");
    if (!livres.length) { cont.innerHTML = `<p class="info-message">📚 Aucun livre dans cette langue.</p>`; return; }
    cont.innerHTML = livres.map(livre => `<div class="livre-card">${livre.couverture ? `<div class="livre-cover"><img src="${escapeHtml(livre.couverture)}" alt="Couverture" loading="lazy" style="width:100%; border-radius:8px;"></div>` : ''}<div class="livre-titre">📖 ${escapeHtml(livre.titre)}</div><div class="livre-auteur">✍️ ${escapeHtml(livre.auteur)}</div><div class="livre-desc">${escapeHtml(livre.description || '')}</div><div class="livre-meta">🏷️ ${escapeHtml(livre.categorie || 'Général')} • 📅 ${livre.annee || '?'} • 📄 ${livre.pages || '?'} pages</div><div class="livre-actions"><a href="livre-viewer.html?id=${livre.id}" class="btn-small" target="_blank">📖 Lire l'ouvrage</a></div></div>`).join('');
  } catch(e) { console.error("Erreur chargement livres", e); cont.innerHTML = `<p class="error-message">❌ Erreur chargement livres.</p>`; }
}

async function afficherRapports() {
  const container = getElement("rapportsContainer", false);
  if (!container) return;
  container.innerHTML = `<div class="loading-books">📄 Chargement des rapports...</div>`;
  try {
    const response = await fetch('data/livres.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const allLivres = await response.json();
    const langCible = AppState.currentLanguage === "fr" ? "Français" : AppState.currentLanguage === "ar" ? "Arabe" : "English";
    const rapports = allLivres.filter(l => l.type === "rapport" && l.langue === langCible);
    if (!rapports.length) { container.innerHTML = `<p class="info-message">📄 Aucun rapport dans cette langue.</p>`; return; }
    container.innerHTML = `<div class="rapports-grid">${rapports.map(rapport => `<div class="rapport-card"><div class="rapport-type">📄 RAPPORT</div><h3 class="rapport-titre">${escapeHtml(rapport.titre)}</h3><div class="rapport-auteur">✍️ ${escapeHtml(rapport.auteur)}</div><div class="rapport-meta">📅 ${rapport.annee || '?'} • 🏷️ ${escapeHtml(rapport.categorie || 'Linguistique')}</div><div class="rapport-desc">${escapeHtml(rapport.description || '')}</div><div class="rapport-actions"><a href="livre-viewer.html?id=${rapport.id}" class="btn-small" target="_blank">📖 Lire le rapport</a></div></div>`).join('')}</div>`;
  } catch(e) { console.error("Erreur chargement rapports", e); container.innerHTML = `<p class="error-message">❌ Erreur de chargement des rapports.</p>`; }
}

// ============================================================
// SECTION 20 : PHOTOS
// ============================================================

const imagesGalerie = [
  { fichier: "data/images/livres/chef_idoguiritane_1.jpg", titre_fr: "Chef Idoguiritane à Tin Abaw", titre_ar: "الشيخ إيدوغيريتان في تين أبا", titre_en: "Chief Idoguiritane in Tin Abaw", legende_fr: "Portrait du chef historique de la fraction Idoguiritane.", legende_ar: "صورة للشيخ التاريخي لفصيلة إيدوغيريتان.", legende_en: "Portrait of the historical chief of the Idoguiritane fraction.", credit: "© Charles Grémont" },
  { fichier: "data/images/livres/chef_idoguiritane_2.jpg", titre_fr: "Réunion traditionnelle à Tin Abaw", titre_ar: "اجتماع تقليدي في تين أبا", titre_en: "Traditional meeting in Tin Abaw", legende_fr: "Le chef entouré de notables.", legende_ar: "الشيخ وحوله الأعيان.", legende_en: "The chief surrounded by notables.", credit: "© Charles Grémont" },
  { fichier: "data/images/livres/chef_idoguitirane_3.jpg", titre_fr: "Le chef et ses conseillers", titre_ar: "الشيخ ومستشاروه", titre_en: "The chief and his advisors", legende_fr: "Discussion des affaires de la communauté.", legende_ar: "مناقشة شؤون المجتمع.", legende_en: "Discussing community affairs.", credit: "© Charles Grémont" },
  { fichier: "data/images/livres/Un jeune combattant Adaksahak, au nord de Ménaka, mars 1994. Photo C.G.jpeg", titre_fr: "Jeune combattant Idaksahak (1994)", titre_ar: "مقاتل شاب إدكساهق (١٩٩٤)", titre_en: "Young Idaksahak fighter (1994)", legende_fr: "Rébellion des années 1990, nord de Ménaka.", legende_ar: "تمرد التسعينيات، شمال مناكا.", legende_en: "1990s rebellion, north of Ménaka.", credit: "© Charles Grémont" },
  { fichier: "data/images/livres/zone des idaksahak.jpeg", titre_fr: "Carte de la région des Idaksahak", titre_ar: "خريطة منطقة الإدكساهق", titre_en: "Map of the Idaksahak region", legende_fr: "Localisation dans le nord-est du Mali.", legende_ar: "الموقع في شمال شرق مالي.", legende_en: "Location in north-eastern Mali.", credit: "Charles Grémont" },
  { fichier: "data/images/livres/idaksahak_square.png", titre_fr: "Logo de la communauté Idaksahak", titre_ar: "شعار مجتمع الإدكساهق", titre_en: "Logo of the Idaksahak community", legende_fr: "Symbole officiel : lecture, épée et dromadaires.", legende_ar: "الشعار الرسمي: القراءة، السيف والجمال.", legende_en: "Official symbol: reading, sword and dromedaries.", credit: "Communauté Idaksahak" }
];

function afficherPhotos() {
  const container = getElement("photosContainer", false);
  if (!container) return;
  const lang = AppState.currentLanguage;
  let html = `<div class="album-header"><h3>📷 Album : Photos historiques</h3><p>Clichés de Charles Grémont</p></div><div class="galerie-grid">`;
  imagesGalerie.forEach(img => {
    const titre = lang === 'fr' ? img.titre_fr : lang === 'ar' ? img.titre_ar : img.titre_en;
    const legende = lang === 'fr' ? img.legende_fr : lang === 'ar' ? img.legende_ar : img.legende_en;
    html += `<div class="galerie-item"><img src="${escapeHtml(img.fichier)}" alt="${escapeHtml(titre)}" loading="lazy"><div class="galerie-caption"><strong>${escapeHtml(titre)}</strong><p class="legende">${escapeHtml(legende)}</p><small class="credit">${escapeHtml(img.credit)}</small></div></div>`;
  });
  html += `</div>`;
  container.innerHTML = html;
}

function genererAlbumsAudio() { const cont = getElement("audioContainer", false); if (cont) cont.innerHTML = "<p class='info-message'>🎵 Pistes audio à venir prochainement...</p>"; }
function genererVideos() { const cont = getElement("videosContainer", false); if (cont) cont.innerHTML = "<p class='info-message'>🎥 Vidéos à venir prochainement...</p>"; }

// ============================================================
// SECTION 21 : BASE DE CONNAISSANCES & RECHERCHE
// ============================================================

async function chargerLivresConnaissance() {
  try {
    const response = await fetch('data/livres_connaissance.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    AppState.livresConnaissance = await response.json();
    console.log('📚 Base de connaissances chargée');
  } catch(e) { console.warn("livres_connaissance.json non trouvé", e); AppState.livresConnaissance = { livres: [] }; }
}

function rechercherPleinTexte() {
  const queryInput = getElement("searchBooksInput", false);
  const container = getElement("searchBooksResults", false);
  if (!queryInput || !container) return;
  const query = queryInput.value.trim();
  if (!query || !AppState.livresConnaissance) { container.innerHTML = ""; return; }
  const mots = query.toLowerCase().split(/\s+/);
  const results = [];
  for (const livre of AppState.livresConnaissance.livres) {
    for (const chunk of livre.chunks) {
      if (mots.every(mot => chunk.texte.toLowerCase().includes(mot))) {
        results.push({ livre: livre.titre, auteur: livre.auteur, chapitre: chunk.chapitre, titre: chunk.titre, texte: chunk.texte });
      }
    }
  }
  if (!results.length) { container.innerHTML = "<p>Aucun résultat</p>"; return; }
  const lang = AppState.currentLanguage;
  const regex = new RegExp(`(${mots.map(m => escapeHtml(m)).join('|')})`, 'gi');
  let html = `<h3>${i18n[lang].search_results} (${results.length})</h3>`;
  results.forEach(r => { const apercu = escapeHtml(r.texte.substring(0, 300)).replace(regex, '<mark>$1</mark>'); html += `<div class="search-result"><strong>${escapeHtml(r.livre)}</strong> (${escapeHtml(r.auteur)}), ch.${r.chapitre} : ${escapeHtml(r.titre)}<p>${apercu}…</p></div>`; });
  container.innerHTML = html;
}

// ============================================================
// SECTION 22 : TABLEAU DE BORD
// ============================================================

function afficherDashboard() {
  const container = getElement("dashboardContainer", false);
  if (!container) return;
  const lang = AppState.currentLanguage;
  const progress = JSON.parse(localStorage.getItem("quizProgress") || "{}");
  container.innerHTML = `<h3>${i18n[lang].dashboard_history}</h3><ul>${AppState.historique.slice(0, 10).map(m => `<li>${escapeHtml(m)}</li>`).join('')}</ul><h3>${i18n[lang].dashboard_favorites}</h3><ul>${AppState.favoris.map(m => `<li>${escapeHtml(m)}</li>`).join('')}</ul><h3>${i18n[lang].dashboard_quiz_progress}</h3>${Object.entries(progress).map(([l, p]) => `<p>${l.toUpperCase()} : ${p.score}/${p.total}</p>`).join('')}`;
}

// ============================================================
// SECTION 23 : RESSOURCES ACADÉMIQUES
// ============================================================

function afficherRessources() {
  const container = getElement("ressourcesContainer", false);
  if (!container) return;
  const podcastUrl = "https://www.themaghribpodcast.com/2018/01/la-linguistique-historique-au-sahara.html";
  const lang = AppState.currentLanguage;
  container.innerHTML = `<div class="ressources-intro"><p>${i18n[lang].ressources_desc}</p></div><div class="ressources-section"><h3>${i18n[lang].podcast_section}</h3><div class="podcast-card"><div class="podcast-header"><div class="podcast-icon">🎙️</div><div class="podcast-info"><h4>${i18n[lang].podcast_episode_title}</h4><p class="podcast-speaker">Dr. Lameen Souag (CNRS, LACITO)</p><p class="podcast-date">${i18n[lang].podcast_episode_date}</p></div></div><p class="podcast-description">${i18n[lang].podcast_episode_desc}</p><div class="podcast-links"><a href="${podcastUrl}" target="_blank" rel="noopener noreferrer" class="btn-podcast">🎧 ${i18n[lang].podcast_listen}</a><button class="btn-share-resource" data-url="${podcastUrl}" data-title="${escapeHtml(i18n[lang].podcast_episode_title)}">📤 ${i18n[lang].share_resource}</button></div></div></div><div class="ressources-section"><h3>${i18n[lang].articles_section}</h3><div id="articlesGrid">⏳</div></div><div class="ressources-section"><h3>${i18n[lang].bibliography_section}</h3><div id="bibliographyList">⏳</div></div>`;
  container.addEventListener('click', (e) => { const btn = e.target.closest('.btn-share-resource'); if (btn) shareResource(btn.dataset.url, btn.dataset.title); });
  chargerArticlesAcademiques();
  chargerBibliographie();
}

function chargerArticlesAcademiques() {
  const container = getElement("articlesGrid", false);
  if (!container) return;
  const articles = [{ titre: "The Tadaksahak language: a Zénaga variety of the Malian Sahara", auteur: "Christiansen-Bolli, R.", annee: 2010, url: "#", description: "Étude descriptive du tadaksahak.", tags: ["Tadaksahak", "Grammaire"] }, { titre: "Relative Clauses in Tadaksahak", auteur: "Christiansen, N. & Levinsohn, S.", annee: 2003, url: "#", description: "Analyse des trois stratégies de relativisation.", tags: ["Tadaksahak", "Syntaxe"] }, { titre: "A Grammar of Tamashek (Tuareg of Mali)", auteur: "Heath, J.", annee: 2005, url: "#", description: "Grammaire de référence du touareg.", tags: ["Touareg", "Grammaire"] }, { titre: "The Berber language", auteur: "Kossmann, M.", annee: 2011, url: "#", description: "Aperçu des langues berbères.", tags: ["Berbère", "Linguistique"] }, { titre: "Non-Tuareg Berber and the Genesis of Nomadic Northern Songhay", auteur: "Souag, L.", annee: 2015, url: "#", description: "Contacts entre berbère et songhay.", tags: ["Songhay", "Contacts"] }];
  container.innerHTML = `<div class="articles-grid-inner">${articles.map(article => `<div class="article-card"><div class="article-icon">📄</div><div class="article-content"><h4>${escapeHtml(article.titre)}</h4><p class="article-meta">${escapeHtml(article.auteur)} • ${article.annee}</p><p class="article-desc">${escapeHtml(article.description)}</p><div class="article-tags">${article.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div><a href="${article.url}" class="article-link" target="_blank">🔗 Accéder à la publication</a></div></div>`).join('')}</div>`;
}

function chargerBibliographie() {
  const container = getElement("bibliographyList", false);
  if (!container) return;
  const bibliography = ["Brugnatelli, Vermondo. 2011. \"Some grammatical features of Ancient Eastern Berber.\"", "Cohen, David et Catherine Taine-Cheikh. 2000. \"A propos du Zénaga.\"", "Kossmann, Maarten. 2001. \"The origin of the glottal stop in Zenaga.\"", "Kossmann, Maarten. 1999. Essai sur la phonologie du proto-berbère.", "Souag, Lameen. 2015. \"Non-Tuareg Berber and the Genesis of Nomadic Northern Songhay.\"", "Christiansen-Bolli, Regula. 2010. \"A Grammar of Tadaksahak.\"", "Christiansen, Niels et Stephen Levinsohn. 2003. \"Relative Clauses in Tadaksahak.\""];
  container.innerHTML = `<ul class="bibliography-list-ul">${bibliography.map(ref => `<li>📖 ${escapeHtml(ref)}</li>`).join('')}</ul><p class="bibliography-note">📚 D'après l'épisode "La linguistique historique au Sahara" du podcast Maghrib in Past & Present</p>`;
}

function shareResource(url, title) {
  if (navigator.share) { navigator.share({ title, text: `Découvrez : ${title}`, url }).catch(() => {}); }
  else { navigator.clipboard?.writeText(url); showToast("📋 Lien copié dans le presse-papier", "success"); }
}

// ============================================================
// SECTION 24 : PWA & SERVICE WORKER (Version améliorée)
// ============================================================

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  fetch('./sw.js', { method: 'HEAD' }).then(response => {
    if (!response.ok) { console.log('SW non trouvé (404), enregistrement ignoré'); return; }
    return navigator.serviceWorker.register('./sw.js');
  }).then(reg => {
    if (!reg) return;
    console.log('✅ SW enregistré');
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      newWorker?.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          showToast("🔄 Nouvelle version disponible ! Rafraîchissez la page.", "info");
        }
      });
    });
  }).catch(err => console.warn('SW échec :', err));
}

let visitCounter = parseInt(localStorage.getItem('tadaksahak_visit_count') || '0');

function incrementVisitCount() {
  visitCounter++;
  localStorage.setItem('tadaksahak_visit_count', String(visitCounter));
  console.log(`👁️ Visite ${visitCounter}`);
  const shouldShowBanner = visitCounter >= 3 && !localStorage.getItem('tadaksahak_installed') && !localStorage.getItem('tadaksahak_install_dismissed');
  if (shouldShowBanner) showAutoInstallBanner();
}

function showAutoInstallBanner() {
  getElement('autoInstallBanner', false)?.remove();
  const banner = document.createElement('div');
  banner.id = 'autoInstallBanner';
  banner.className = 'install-banner auto';
  banner.innerHTML = `<div class="install-banner-content"><img src="images/idaksahak_round.png" alt="Logo" width="40" height="40"><div class="install-banner-text"><strong>📱 Installer Tadaksahak Learning</strong><small>Utilisez l'application hors-ligne (${visitCounter} visites)</small></div><button id="autoInstallBtn" class="btn-install">📲 Installer</button><button id="dismissAutoBtn" class="btn-dismiss">✖</button></div>`;
  document.body.appendChild(banner);
  const dismiss = () => { banner.remove(); localStorage.setItem('tadaksahak_install_dismissed', 'true'); };
  getElement('dismissAutoBtn', false)?.addEventListener('click', dismiss);
  getElement('autoInstallBtn', false)?.addEventListener('click', () => {
    if (AppState.installPromptEvent) {
      AppState.installPromptEvent.prompt();
      AppState.installPromptEvent.userChoice.then(result => {
        if (result.outcome === 'accepted') { localStorage.setItem('tadaksahak_installed', 'true'); showToast("✅ Merci d'avoir installé l'application !", "success"); }
        AppState.installPromptEvent = null;
      });
    } else { showToast("📲 Menu > Installer l'application", "info"); }
    dismiss();
  });
}

window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); AppState.installPromptEvent = e; });
window.addEventListener('appinstalled', () => { AppState.isAppInstalled = true; showToast("✅ Application installée ! Utilisable hors-ligne.", "success"); });

function initAutoUpdates() {
  incrementVisitCount();
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.ready.then(registration => {
    registration.update();
    setInterval(() => registration.update(), 6 * 60 * 60 * 1000);
  });
}

// ============================================================
// SECTION 25 : RACCOURCIS CLAVIER
// ============================================================

const KEYBOARD_SHORTCUTS = [
  { key: 'd', section: 'dictionnaire', label: 'Dictionnaire' },
  { key: 'c', section: 'chat', label: 'Chat Bot' },
  { key: 'f', section: 'flashcards', label: 'Flashcards' },
  { key: 'l', section: 'livres', label: 'Livres' },
  { key: 't', section: 'themes', label: 'Thèmes' },
  { key: 'g', section: 'grammaire', label: 'Grammaire' }
];

function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.altKey) {
      const shortcut = KEYBOARD_SHORTCUTS.find(s => s.key === e.key);
      if (shortcut) { e.preventDefault(); if (DOM.sectionSelector) { DOM.sectionSelector.value = shortcut.section; DOM.sectionSelector.dispatchEvent(new Event('change')); } return; }
    }
    if (e.key === '?' || (e.shiftKey && e.key === '/')) { e.preventDefault(); showHelpModal(); }
  });
}

function showHelpModal() {
  getElement('helpModal', false)?.remove();
  const modalHtml = `<div id="helpModal" class="modal" role="dialog" aria-modal="true" aria-label="Aide"><div class="modal-content"><button class="modal-close" aria-label="Fermer">&times;</button><h2>⌨️ Raccourcis clavier</h2><ul class="shortcuts-list">${KEYBOARD_SHORTCUTS.map(s => `<li><kbd>Alt</kbd> + <kbd>${s.key.toUpperCase()}</kbd> → ${s.label}</li>`).join('')}<li><kbd>?</kbd> → Cette aide</li><li><kbd>←</kbd> <kbd>→</kbd> → Navigation livre grammaire</li></ul><h2>🌍 Langues</h2><p>Changez de langue avec les drapeaux 🇫🇷 🇸🇦 🇬🇧.</p><h2>🎨 Thèmes visuels</h2><p>Utilisez 🌙 📖 📜 en haut de page.</p><h2>📖 Grammaire</h2><p>Explorez le livre interactif de 30 blocs avec navigation tactile et clavier.</p></div></div>`;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = getElement('helpModal', false);
  modal?.querySelector('.modal-close')?.addEventListener('click', () => modal.remove());
  modal?.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

// ============================================================
// SECTION 26 : POP-UP DE BIENVENUE
// ============================================================

function showRessourcesWelcomePopup() {
  if (localStorage.getItem('has_seen_ressources_popup') === 'true') return;
  const popup = document.createElement('div');
  popup.id = 'ressourcesPopup';
  popup.className = 'modal ressources-popup';
  popup.innerHTML = `<div class="modal-content ressources-popup-content"><button class="popup-close" id="closeRessourcesPopup" aria-label="Fermer">&times;</button><div class="popup-icon">📚</div><h2>Nouvelle section</h2><h3>Ressources académiques</h3><div class="popup-author">Par <strong>Hamadine Ag Moctar</strong></div><div class="popup-features"><div class="popup-feature"><span class="feature-icon">🎙️</span><span>Podcast avec <strong>Dr. Lameen Souag (CNRS)</strong></span></div><div class="popup-feature"><span class="feature-icon">📖</span><span>Articles scientifiques sur le tadaksahak</span></div><div class="popup-feature"><span class="feature-icon">📚</span><span>Bibliographie spécialisée</span></div></div><button id="goToRessourcesBtn" class="btn-popup-go">Découvrir la section</button><button id="dismissRessourcesPopup" class="btn-popup-later">Plus tard</button></div>`;
  document.body.appendChild(popup);
  localStorage.setItem('has_seen_ressources_popup', 'true');
  const closePopup = () => { popup.classList.add('popup-closing'); setTimeout(() => popup.remove(), 300); };
  getElement('closeRessourcesPopup', false)?.addEventListener('click', closePopup);
  getElement('dismissRessourcesPopup', false)?.addEventListener('click', closePopup);
  getElement('goToRessourcesBtn', false)?.addEventListener('click', () => { closePopup(); if (DOM.sectionSelector) { DOM.sectionSelector.value = 'ressources'; DOM.sectionSelector.dispatchEvent(new Event('change')); } });
  popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
  popup.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });
}

// ============================================================
// SECTION 27 : NAVIGATION PRINCIPALE
// ============================================================

function initNavigation() {
  if (!DOM.sectionSelector) return;
  const sections = document.querySelectorAll("main > section");
  function showSection(id) {
    sections.forEach(sec => { sec.hidden = sec.id !== id; });
    localStorage.setItem("tadaksahak_active_section", id);
    const activeSection = getElement(id, false);
    if (activeSection) {
      const heading = activeSection.querySelector('h2, h3');
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
      const headerOffset = 80;
      const top = activeSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    const sectionActions = {
      grammaire: () => showGrammarSection(),
      livres: () => chargerAvecFallback(afficherLivres, "Livres"),
      audio: () => genererAlbumsAudio(),
      photos: () => afficherPhotos(),
      videos: () => genererVideos(),
      quiz: () => chargerAvecFallback(chargerQuiz, "Quiz"),
      timeline: () => AppState.timelineData && afficherTimeline(),
      map: () => initialiserCarte(),
      dashboard: () => afficherDashboard(),
      rapports: () => chargerAvecFallback(afficherRapports, "Rapports"),
      contes: () => AppState.contesData && afficherContes(),
      emissions: () => AppState.emissionsData && afficherEmissionsPremium(),
      themes: () => AppState.themesData && afficherThemesPremium(),
      flashcards: () => AppState.vocabulaire.length && genererFlashcards(),
      ressources: () => afficherRessources()
    };
    sectionActions[id]?.();
  }
  DOM.sectionSelector.addEventListener("change", (e) => showSection(e.target.value));
  const saved = localStorage.getItem("tadaksahak_active_section");
  const initial = (saved && getElement(saved, false)) ? saved : "accueil";
  DOM.sectionSelector.value = initial;
  showSection(initial);
}

// ============================================================
// SECTION 28 : INITIALISATION PRINCIPALE
// ============================================================

async function initialiserApplication() {
  showLoader();
  try {
    initTheme();
    initThemeSettings();
    detectSystemTheme();
    initNavigation();
    initGrammarTabs();
    
    await Promise.allSettled([
      chargerAvecFallback(chargerDictionnaire, "Dictionnaire"),
      chargerAvecFallback(chargerContes, "Contes"),
      chargerAvecFallback(chargerEmissions, "Émissions"),
      chargerAvecFallback(chargerThemes, "Thèmes"),
      chargerAvecFallback(chargerRelatives, "Relatives"),
      chargerAvecFallback(chargerTimeline, "Timeline"),
      chargerAvecFallback(chargerLivresConnaissance, "Base de connaissances")
    ]);
    
    chargerHistorique();
    chargerFavoris();
    afficherMotDuJour();
    setInterval(afficherMotDuJour, 3600000);
    
    initDictionaryEvents();
    initChatEvents();
    initFlashcards();
    
    document.querySelectorAll('.lang-flag').forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    
    getElement("btnGoDico", false)?.addEventListener('click', () => {
      if (DOM.sectionSelector) { DOM.sectionSelector.value = 'dictionnaire'; DOM.sectionSelector.dispatchEvent(new Event('change')); }
    });
    
    getElement("toggleChatBot", false)?.addEventListener('click', () => {
      if (DOM.sectionSelector) { DOM.sectionSelector.value = 'chat'; DOM.sectionSelector.dispatchEvent(new Event('change')); }
    });
    
    const searchBooksInput = getElement("searchBooksInput", false);
    if (searchBooksInput) searchBooksInput.addEventListener("input", debounce(rechercherPleinTexte, 300));
    
    setLanguage(AppState.currentLanguage);
    initKeyboardShortcuts();
    
    registerServiceWorker();
    requestNotificationPermission();
    showWordNotification();
    initAutoUpdates();
    
    setTimeout(() => showAutoInstallBanner(), 3000);
    setTimeout(() => showRessourcesWelcomePopup(), 2000);
    
    console.log("✅ Application Tadaksahak fusionnée prête !");
    console.log("📚 Module relatives : Christiansen & Levinsohn (2003)");
    console.log("📖 Livre grammaire : 30 blocs interactifs");
  } catch (error) {
    console.error("🔴 Erreur critique :", error);
    showToast("Erreur de chargement. Rechargez la page.", "error");
  } finally {
    hideLoader();
  }
}

function initGrammarTabs() {
  const tabs = document.querySelectorAll('.grammar-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      AppState.activeGrammarTab = target;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const gramContainer = getElement('grammaireContainer', false);
      const relContainer = getElement('relativesContainer', false);
      if (target === 'causative') {
        gramContainer?.setAttribute('hidden', '');
        relContainer?.setAttribute('hidden', '');
        showGrammarSection();
      } else if (target === 'relatives') {
        gramContainer?.setAttribute('hidden', '');
        if (relContainer) { relContainer.removeAttribute('hidden'); afficherRelatives(); }
      }
    });
  });
}

// ============================================================
// POINT D'ENTRÉE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initDOMReferences();
  initialiserApplication();
});
