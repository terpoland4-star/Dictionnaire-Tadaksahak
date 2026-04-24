// ==============================
// APPLICATION TADAKSAHAK LEARNING
// VERSION ULTIME - COMPLÈTE
// Avec dictionnaire enrichi, thèmes premium, flashcards, PWA
// Grammaire : LIVRE OUVERT INTERACTIF (30 blocs)
// Émissions modernisées, propositions relatives
// ET ressources académiques
// ==============================

console.log("🚀 Démarrage de l'application fusionnée...");

// ------------------------------
// TRADUCTIONS (i18n) - Version étendue
// ------------------------------
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

// ------------------------------
// VARIABLES GLOBALES
// ------------------------------
let currentLanguage = localStorage.getItem('app_language') || 'fr';
let vocabulaire = [];
let grammaire = null; // n'est plus utilisé pour le livre (mais conservé pour compatibilité)
let contesData = null;
let emissionsData = null;
let themesData = null;
let relativesData = null;
let motActuel = null;
let historique = [];
let favoris = [];
let motsListe = [];
let currentIndex = -1;
let livresConnaissance = null;
let quizData = null;
let currentQuiz = { questions: [], currentIndex: 0, score: 0, lang: 'fr' };
let timelineData = null;
let mapInitialized = false;
let leafletLoaded = false;
let isAppInstalled = false;
let installPromptEvent = null;
let activeGrammarTab = 'causative'; // 'causative' ou 'relatives'

// Variables Flashcards
let currentFlashcards = [];
let currentFlashcardIndex = 0;

// ========== LIVRE GRAMMAIRE OUVERT ==========
let grammarBlocks = [];
let currentBlockIndex = 0;
let currentGrammarLang = localStorage.getItem('preferredLanguage') || 'fr';
let bookInitialized = false;

// Éléments DOM du livre (doivent correspondre aux ID dans index.html)
const bookElements = {
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
    bookSpread: document.getElementById('bookSpread')
};

// Éléments DOM
const searchBar = document.getElementById("searchBar");
const suggestionsList = document.getElementById("suggestions");
const motElem = document.getElementById("motTexte");
const defElem = document.getElementById("definition");
const audioElem = document.getElementById("audioLecteur");
const sectionSelector = document.getElementById("sectionSelector");
const clearSearchBtn = document.getElementById("clearSearch");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const compteurMot = document.getElementById("compteurMot");

// Debounce pour recherche plein texte
let searchBooksDebounce = null;

// ------------------------------
// GALERIE PHOTOS
// ------------------------------
const imagesGalerie = [
  {
    fichier: "data/images/livres/chef_idoguiritane_1.jpg",
    titre_fr: "Chef Idoguiritane à Tin Abaw",
    titre_ar: "الشيخ إيدوغيريتان في تين أبا",
    titre_en: "Chief Idoguiritane in Tin Abaw",
    legende_fr: "Portrait du chef historique de la fraction Idoguiritane.",
    legende_ar: "صورة للشيخ التاريخي لفصيلة إيدوغيريتان.",
    legende_en: "Portrait of the historical chief of the Idoguiritane fraction.",
    credit: "© Charles Grémont"
  },
  {
    fichier: "data/images/livres/chef_idoguiritane_2.jpg",
    titre_fr: "Réunion traditionnelle à Tin Abaw",
    titre_ar: "اجتماع تقليدي في تين أبا",
    titre_en: "Traditional meeting in Tin Abaw",
    legende_fr: "Le chef entouré de notables.",
    legende_ar: "الشيخ وحوله الأعيان.",
    legende_en: "The chief surrounded by notables.",
    credit: "© Charles Grémont"
  },
  {
    fichier: "data/images/livres/chef_idoguitirane_3.jpg",
    titre_fr: "Le chef et ses conseillers",
    titre_ar: "الشيخ ومستشاروه",
    titre_en: "The chief and his advisors",
    legende_fr: "Discussion des affaires de la communauté.",
    legende_ar: "مناقشة شؤون المجتمع.",
    legende_en: "Discussing community affairs.",
    credit: "© Charles Grémont"
  },
  {
    fichier: "data/images/livres/Un jeune combattant Adaksahak, au nord de Ménaka, mars 1994. Photo C.G.jpeg",
    titre_fr: "Jeune combattant Idaksahak (1994)",
    titre_ar: "مقاتل شاب إدكساهق (١٩٩٤)",
    titre_en: "Young Idaksahak fighter (1994)",
    legende_fr: "Rébellion des années 1990, nord de Ménaka.",
    legende_ar: "تمرد التسعينيات، شمال مناكا.",
    legende_en: "1990s rebellion, north of Ménaka.",
    credit: "© Charles Grémont"
  },
  {
    fichier: "data/images/livres/zone des idaksahak.jpeg",
    titre_fr: "Carte de la région des Idaksahak",
    titre_ar: "خريطة منطقة الإدكساهق",
    titre_en: "Map of the Idaksahak region",
    legende_fr: "Localisation dans le nord-est du Mali.",
    legende_ar: "الموقع في شمال شرق مالي.",
    legende_en: "Location in north-eastern Mali.",
    credit: "Charles Grémont"
  },
  {
    fichier: "data/images/livres/idaksahak_square.png",
    titre_fr: "Logo de la communauté Idaksahak",
    titre_ar: "شعار مجتمع الإدكساهق",
    titre_en: "Logo of the Idaksahak community",
    legende_fr: "Symbole officiel : lecture, épée et dromadaires.",
    legende_ar: "الشعار الرسمي: القراءة، السيف والجمال.",
    legende_en: "Official symbol: reading, sword and dromedaries.",
    credit: "Communauté Idaksahak"
  }
];

// ------------------------------
// UTILITAIRES
// ------------------------------
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function normalizeText(s) {
  return s ? s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase() : "";
}

function levenshtein(a, b) {
  const an = a.length, bn = b.length;
  if (!an) return bn; if (!bn) return an;
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

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast toast-${type}`;
  toast.hidden = false;
  setTimeout(() => { toast.hidden = true; }, 3000);
}

function showLoader() {
  const loader = document.getElementById("loadingOverlay");
  if (loader) {
    loader.hidden = false;
    loader.style.display = 'flex';
  }
}

function hideLoader() {
  const loader = document.getElementById("loadingOverlay");
  if (loader) {
    loader.hidden = true;
    loader.style.display = 'none';
  }
}

function showSkeleton(containerId) {
  const container = document.getElementById(containerId);
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

// ------------------------------
// THÈMES PERSONNALISABLES
// ------------------------------
function applyThemeSettings() {
  const fontFamily = localStorage.getItem('app_font_family') || 'sans';
  const fontSize = localStorage.getItem('app_font_size') || '100';
  const highContrast = localStorage.getItem('app_high_contrast') === 'true';
  document.body.style.fontFamily = fontFamily === 'serif' ? 'Georgia, serif' : (fontFamily === 'mono' ? 'Courier New, monospace' : 'Inter, sans-serif');
  document.body.style.fontSize = `${fontSize}%`;
  if (highContrast) {
    document.body.classList.add('high-contrast');
  } else {
    document.body.classList.remove('high-contrast');
  }
}

function initThemeSettings() {
  const fontSelect = document.getElementById('fontFamilySelect');
  const sizeSelect = document.getElementById('fontSizeSelect');
  const contrastCheck = document.getElementById('highContrastCheck');
  if (fontSelect) fontSelect.value = localStorage.getItem('app_font_family') || 'sans';
  if (sizeSelect) sizeSelect.value = localStorage.getItem('app_font_size') || '100';
  if (contrastCheck) contrastCheck.checked = localStorage.getItem('app_high_contrast') === 'true';
  fontSelect?.addEventListener('change', (e) => {
    localStorage.setItem('app_font_family', e.target.value);
    applyThemeSettings();
  });
  sizeSelect?.addEventListener('change', (e) => {
    localStorage.setItem('app_font_size', e.target.value);
    applyThemeSettings();
  });
  contrastCheck?.addEventListener('change', (e) => {
    localStorage.setItem('app_high_contrast', e.target.checked);
    applyThemeSettings();
  });
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
  document.getElementById('themeDark')?.addEventListener('click', () => setTheme('dark'));
  document.getElementById('themeLight')?.addEventListener('click', () => setTheme('light'));
  document.getElementById('themeSepia')?.addEventListener('click', () => setTheme('sepia'));
}

function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem('app_theme')) setTheme('dark');
  } else {
    if (!localStorage.getItem('app_theme')) setTheme('light');
  }
}

// ------------------------------
// GESTION DE LA LANGUE
// ------------------------------
function setLanguage(lang) {
  currentLanguage = lang;
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
  
  if (searchBar) searchBar.placeholder = i18n[lang].search_placeholder || "Rechercher un mot…";
  const chatInput = document.getElementById("chatInput");
  if (chatInput) chatInput.placeholder = i18n[lang].send || "Écrivez votre message...";
  const rechercheLivres = document.getElementById("rechercheLivres");
  if (rechercheLivres) rechercheLivres.placeholder = i18n[lang].search_placeholder || "Rechercher un livre...";
  
  if (document.getElementById("livres") && !document.getElementById("livres").hidden) afficherLivres();
  if (document.getElementById("photos") && !document.getElementById("photos").hidden) afficherPhotos();
  if (document.getElementById("quiz") && !document.getElementById("quiz").hidden && quizData) chargerQuiz();
  if (document.getElementById("timeline") && !document.getElementById("timeline").hidden && timelineData) afficherTimeline();
  if (document.getElementById("map") && !document.getElementById("map").hidden && mapInitialized) initialiserCarte();
  if (document.getElementById("dashboard") && !document.getElementById("dashboard").hidden) afficherDashboard();
  if (document.getElementById("rapports") && !document.getElementById("rapports").hidden) afficherRapports();
  if (document.getElementById("grammaire") && !document.getElementById("grammaire").hidden) {
    if (activeGrammarTab === 'causative') {
      // Le livre gère maintenant la grammaire, on s'assure qu'il est affiché
      if (grammarBlocks.length) updateGrammarSpread();
      else showGrammarSection();
    } else if (activeGrammarTab === 'relatives') {
      afficherRelatives();
    }
  }
  if (document.getElementById("contes") && !document.getElementById("contes").hidden && contesData) afficherContes();
  if (document.getElementById("emissions") && !document.getElementById("emissions").hidden && emissionsData) afficherEmissionsPremium();
  if (document.getElementById("themes") && !document.getElementById("themes").hidden && themesData) afficherThemesPremium();
  if (document.getElementById("flashcards") && !document.getElementById("flashcards").hidden && vocabulaire.length) genererFlashcards();
  if (document.getElementById("ressources") && !document.getElementById("ressources").hidden) afficherRessources();
  if (motActuel) afficherMot(motActuel);
  updateChatSuggestions();
  afficherMotDuJour();
  
  document.querySelectorAll('.lang-flag').forEach(btn => {
    if (btn.dataset.lang === lang) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

function updateChatSuggestions() {
  const btns = document.querySelectorAll('.chat-suggestion');
  if (btns.length >= 3) {
    btns[0].textContent = i18n[currentLanguage].sugg_word;
    btns[1].textContent = i18n[currentLanguage].sugg_history;
    btns[2].textContent = i18n[currentLanguage].sugg_culture;
  }
}

// ------------------------------
// BOT
// ------------------------------
function extraireMotsCles(question) {
  const stopWords = ['le','la','les','un','une','de','du','des','et','ou','mais','donc','car','pour','dans','avec','sans','par','sur','sous','que','qui','quoi','dont','où','comment','pourquoi','est','sont','être','avoir','faire'];
  const mots = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[?;:!,.']/g, '').split(/\s+/);
  return mots.filter(m => m.length > 2 && !stopWords.includes(m));
}

function chercherDansLivres(question) {
  if (!livresConnaissance || !livresConnaissance.livres) return null;
  const motsClesQuestion = extraireMotsCles(question);
  if (motsClesQuestion.length === 0) return null;
  const resultats = [];
  for (const livre of livresConnaissance.livres) {
    for (const chunk of livre.chunks) {
      let score = 0;
      const motsClesChunk = chunk.mots_cles.map(m => m.toLowerCase());
      for (const mot of motsClesQuestion) {
        if (motsClesChunk.some(mc => mc.includes(mot) || mot.includes(mc))) score += 2;
        if (chunk.texte.toLowerCase().includes(mot)) score += 1;
      }
      if (score > 0) resultats.push({ livre: livre.titre, auteur: livre.auteur, chapitre: chunk.chapitre, titre: chunk.titre, texte: chunk.texte, score });
    }
  }
  if (!resultats.length) return null;
  resultats.sort((a,b) => b.score - a.score);
  return resultats[0];
}

function genererExempleRelative() {
  if (!relativesData || !relativesData.strategies) return null;
  const strategies = relativesData.strategies;
  const randomIndex = Math.floor(Math.random() * strategies.length);
  const strat = strategies[randomIndex];
  const exemples = strat.exemples || [];
  if (exemples.length === 0) return null;
  const ex = exemples[Math.floor(Math.random() * exemples.length)];
  let traduction = "";
  if (currentLanguage === "fr") traduction = ex.traduction_fr;
  else if (currentLanguage === "en") traduction = ex.traduction_en;
  else traduction = ex.traduction_ar;
  return {
    strategie: strat,
    exemple: ex,
    traduction: traduction
  };
}

function reponseBot(txt) {
  const clean = txt.toLowerCase().trim();
  
  if (clean.includes("relative") || clean.includes("proposition") || 
      (clean.includes("qui") && clean.includes("que")) ||
      clean.includes("ayo") || clean.includes("ayondo") || clean.includes("sa") ||
      clean.includes("gap") || clean.includes("pronom relatif")) {
    
    if (clean.includes("ayo") && !clean.includes("ayondo")) {
      return `📖 **"ayo"** (singulier) est le pronom relatif en tadaksahak pour les noms DÉFINIS dans des propositions RESTRICTIVES.\n\nExemple : *Bora [ayo a-taw-kat] a-zumbu-kat.*\n→ "La personne QUI est arrivée est descendue."\n\n📚 Voir section 3.1 du PDF "Relative Clauses in Tadaksahak".`;
    }
    if (clean.includes("ayondo")) {
      return `📖 **"ayondo"** (parfois **"endayo"**) est le pronom relatif PLURIEL en tadaksahak pour les noms DÉFINIS.\n\nExemple : *Ci na imunas-kon [ayondo a-zumbu Sali daw]?*\n→ "Qui sont les chameliers QUI sont descendus chez Rhali ?"`;
    }
    if (clean.includes("sa") && (clean.includes("relative") || clean.includes("proposition"))) {
      return `📖 **"sa"** introduit des propositions relatives NON-RESTRICTIVES (information supplémentaire).\n\nExemple : *A-jiken-an ayn nana se, [sa ayn man Aminata].*\n→ "Il salue sa mère, QUI s'appelle Aminata."\n\n💡 La relative pourrait être une phrase indépendante.\n\n📚 Voir section 4 du PDF.`;
    }
    if (clean.includes("gap") || (clean.includes("sans") && clean.includes("marqueur"))) {
      return `📖 **Gap strategy** = aucune marqueur dans la proposition relative.\n\nUtilisation : noms INDÉFINIS (nouveaux) dans des relatives RESTRICTIVES.\n\nExemple : *A-gar hamu [# f-keni aykaran daw].*\n→ "Elle a trouvé de la viande QUI était à côté des chiots."\n\n📚 Voir section 3.2 du PDF.`;
    }
    if (clean.includes("exemple") || clean.includes("example")) {
      const exempleData = genererExempleRelative();
      if (exempleData) {
        return `📖 **Exemple de relative (${exempleData.strategie.usage_fr})** :\n\n🔹 **Tadaksahak** : ${exempleData.exemple.tadaksahak}\n🔹 **Glose** : ${exempleData.exemple.glose_fr}\n🔹 **Traduction** : ${exempleData.traduction}\n\n💡 Stratégie : "${exempleData.strategie.marqueur_sg || exempleData.strategie.marqueur || '∅'}" (${exempleData.strategie.usage_fr})`;
      }
    }
    return `📖 **Les 3 stratégies de relativisation en tadaksahak** :

1️⃣ **Pronom relatif "ayo/ayondo"** → noms DÉFINIS, restrictif
2️⃣ **Gap strategy (∅)** → noms INDÉFINIS, restrictif
3️⃣ **"sa"** → non-restrictif (info supplémentaire)

📚 D'après Christiansen & Levinsohn (2003). Tapez "exemple relative" pour un exemple.`;
  }
  
  if (clean.includes("bonjour") || clean.includes("salut") || clean.includes("hello") || clean.includes("salam")) return i18n[currentLanguage].bot_greeting;
  if (clean.includes("merci") || clean.includes("thanks") || clean.includes("شكرا")) return i18n[currentLanguage].bot_thanks;
  if (clean.includes("dictionnaire") || clean.includes("dico") || clean.includes("mot") || clean.includes("قاموس")) return i18n[currentLanguage].bot_dico;
  if (clean.includes("grammaire") || clean.includes("grammar") || clean.includes("verbe") || clean.includes("causatif") || clean.includes("passif")) return i18n[currentLanguage].bot_grammar;
  if (clean.includes("relative") || clean.includes("proposition")) return i18n[currentLanguage].bot_grammar_relatives;
  if (clean.includes("conte") || clean.includes("histoire") || clean.includes("légende") || clean.includes("حكاية")) return "📖 Rendez-vous dans la section Contes pour découvrir les légendes et histoires traditionnelles Idaksahak.";
  if (clean.includes("émission") || clean.includes("radio") || clean.includes("broadcast")) return "🎙️ Consultez la section Émissions pour écouter les archives radiophoniques.";
  if (clean.includes("audio") || clean.includes("musique")) return i18n[currentLanguage].bot_audio;
  if (clean.includes("aide") || clean.includes("help") || clean.includes("مساعدة")) return i18n[currentLanguage].bot_help;
  
  const resultatLivre = chercherDansLivres(txt);
  if (resultatLivre) return `📖 D'après « ${resultatLivre.livre} » (${resultatLivre.auteur}), chapitre ${resultatLivre.chapitre} — « ${resultatLivre.titre} » :\n\n“${resultatLivre.texte}”\n\n💡 Posez-moi d'autres questions sur ce livre !`;
  if (clean.includes("livre") || clean.includes("bibliothèque") || clean.includes("كتاب")) return i18n[currentLanguage].bot_books;
  
  return i18n[currentLanguage].bot_default;
}

function afficheMsg(user, html) {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;
  const div = document.createElement("div");
  div.className = `message ${user}`;
  div.innerHTML = `<strong>${user === "bot" ? "🤖 Hamadine" : "👤 Vous"} :</strong> ${html}`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function traiterSaisie() {
  const input = document.getElementById("chatInput");
  const txt = input?.value.trim();
  if (!txt) return;
  input.value = "";
  input.disabled = true;
  afficheMsg("user", escapeHtml(txt));
  setTimeout(() => {
    afficheMsg("bot", reponseBot(txt));
    input.disabled = false;
    input.focus();
  }, 400);
}

// ------------------------------
// DICTIONNAIRE
// ------------------------------
async function chargerDictionnaire() {
  try {
    const response = await fetch('data/mots.json');
    if (!response.ok) throw new Error();
    vocabulaire = await response.json();
    console.log(`📖 Dictionnaire chargé : ${vocabulaire.length} mots`);
  } catch(e) {
    console.warn("Erreur chargement dictionnaire, utilisation fallback", e);
    vocabulaire = [
      { mot: "Báy", cat: "vt.", fr: "Pouvoir (faire)", ar: "قدر على (فعل)", en: "Able, to be" },
      { mot: "Yiddár", cat: "vi.", fr: "Être en vie", ar: "يكون حياً", en: "Alive, to be" },
      { mot: "Káamil", cat: "quantifier", fr: "Tout", ar: "كل", en: "All" },
      { mot: "ayo", cat: "pron.", fr: "qui, que (pronom relatif singulier)", ar: "الذي، التي", en: "who, which, that" },
      { mot: "ayondo", cat: "pron.", fr: "qui, que (pronom relatif pluriel)", ar: "الذين، اللواتي", en: "who, which, that (pl)" },
      { mot: "sa", cat: "conj.", fr: "qui, que (relative non-restrictive)", ar: "الذي، التي", en: "who, which, that (non-restrictive)" }
    ];
  }
  motsListe = vocabulaire.map((item, idx) => ({ ...item, index: idx }));
  if (vocabulaire.length) {
    const statMots = document.getElementById("statMots");
    if (statMots) statMots.textContent = vocabulaire.length;
    const statsContainer = document.getElementById("statsContainer");
    if (statsContainer) statsContainer.hidden = false;
    construireIndexAlphabet();
    if (vocabulaire[0]) afficherMot(vocabulaire[0]);
  }
}

function afficherMot(item) {
  if (!item) return;
  motActuel = item;
  currentIndex = motsListe.findIndex(m => m.mot === item.mot);
  if (compteurMot) compteurMot.textContent = `${currentIndex+1} / ${motsListe.length}`;
  if (btnPrev) btnPrev.disabled = currentIndex <= 0;
  if (btnNext) btnNext.disabled = currentIndex >= motsListe.length-1;
  if (motElem) motElem.textContent = item.mot;
  if (defElem) {
    let def = "";
    let categorieValue = item.cat || "";
    
    const categoriesFr = {
      "vt.": "Verbe transitif", "vi.": "Verbe intransitif", "n.": "Nom",
      "npl.": "Nom (pluriel uniquement)", "adj.": "Adjectif", "adv.": "Adverbe",
      "conj.": "Conjonction", "postp.": "Postposition", "prep.": "Préposition",
      "pron.": "Pronom", "dem.": "Démonstratif", "num.": "Numéral",
      "quantifier": "Quantifieur", "phrase": "Expression", "idiom": "Idiome"
    };
    const categoriesEn = {
      "vt.": "Transitive verb", "vi.": "Intransitive verb", "n.": "Noun",
      "npl.": "Noun (plural only)", "adj.": "Adjective", "adv.": "Adverb",
      "conj.": "Conjunction", "postp.": "Postposition", "prep.": "Preposition",
      "pron.": "Pronoun", "dem.": "Demonstrative", "num.": "Numeral",
      "quantifier": "Quantifier", "phrase": "Phrase", "idiom": "Idiom"
    };
    const categoriesAr = {
      "vt.": "فعل متعد", "vi.": "فعل لازم", "n.": "اسم",
      "npl.": "اسم (جمع فقط)", "adj.": "صفة", "adv.": "ظرف",
      "conj.": "حرف عطف", "postp.": "حرف جر لاحق", "prep.": "حرف جر",
      "pron.": "ضمير", "dem.": "اسم إشارة", "num.": "عدد",
      "quantifier": "محدد كمي", "phrase": "عبارة", "idiom": "تعبير اصطلاحي"
    };
    
    let categorieAffichee = categorieValue;
    if (currentLanguage === "fr" && categoriesFr[categorieValue]) categorieAffichee = categoriesFr[categorieValue];
    else if (currentLanguage === "en" && categoriesEn[categorieValue]) categorieAffichee = categoriesEn[categorieValue];
    else if (currentLanguage === "ar" && categoriesAr[categorieValue]) categorieAffichee = categoriesAr[categorieValue];
    
    if (currentLanguage === "fr") {
      def = item.fr || item.en || "";
      defElem.innerHTML = `<p><strong>📂 Catégorie :</strong> ${escapeHtml(categorieAffichee)}</p>
        <p><strong>🇫🇷 Définition :</strong> ${escapeHtml(def)}</p>
        ${item.ar ? `<p><strong>🇸🇦 بالعربية :</strong> ${escapeHtml(item.ar)}</p>` : ''}
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-small" id="shareWordBtn">📤 ${i18n[currentLanguage].share}</button>
          <button class="btn-small" id="favoriteWordBtn">⭐ ${favoris.includes(item.mot) ? i18n[currentLanguage].remove_favorite : i18n[currentLanguage].add_favorite}</button>
        </div>`;
    } 
    else if (currentLanguage === "en") {
      def = item.en || item.fr || "";
      defElem.innerHTML = `<p><strong>📂 Category:</strong> ${escapeHtml(categorieAffichee)}</p>
        <p><strong>🇬🇧 Definition:</strong> ${escapeHtml(def)}</p>
        ${item.ar ? `<p><strong>🇸🇦 بالعربية :</strong> ${escapeHtml(item.ar)}</p>` : ''}
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-small" id="shareWordBtn">📤 ${i18n[currentLanguage].share}</button>
          <button class="btn-small" id="favoriteWordBtn">⭐ ${favoris.includes(item.mot) ? i18n[currentLanguage].remove_favorite : i18n[currentLanguage].add_favorite}</button>
        </div>`;
    }
    else if (currentLanguage === "ar") {
      def = item.ar || item.fr || "";
      defElem.innerHTML = `<p><strong>📂 الفئة :</strong> ${escapeHtml(categorieAffichee)}</p>
        <p><strong>🇸🇦 التعريف :</strong> ${escapeHtml(def)}</p>
        ${item.fr ? `<p><strong>🇫🇷 Français :</strong> ${escapeHtml(item.fr)}</p>` : ''}
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-small" id="shareWordBtn">📤 ${i18n[currentLanguage].share}</button>
          <button class="btn-small" id="favoriteWordBtn">⭐ ${favoris.includes(item.mot) ? i18n[currentLanguage].remove_favorite : i18n[currentLanguage].add_favorite}</button>
        </div>`;
    }
    
    setTimeout(() => {
      document.getElementById("shareWordBtn")?.addEventListener("click", () => partagerMot(item));
      document.getElementById("favoriteWordBtn")?.addEventListener("click", () => basculerFavori(item));
    }, 50);
  }
  if (audioElem && item.audio) {
    audioElem.src = `audio/${item.audio}`;
    audioElem.hidden = false;
    audioElem.load();
  } else if (audioElem) audioElem.hidden = true;
  ajouterHistorique(item.mot);
}

function navigationPrecedent() { if (currentIndex > 0) afficherMot(motsListe[currentIndex-1]); }
function navigationSuivant() { if (currentIndex < motsListe.length-1) afficherMot(motsListe[currentIndex+1]); }

function chercher(queryRaw) {
  const query = normalizeText(queryRaw);
  if (!query || !vocabulaire.length) return [];
  const resultats = [];
  const maxDist = Math.max(2, Math.floor(query.length * 0.4));
  
  for (const item of vocabulaire) {
    let score = Infinity;
    const motNorm = normalizeText(item.mot);
    
    if (motNorm.includes(query)) {
      score = motNorm.startsWith(query) ? 0 : 1;
    } else if (score > 1 && item.fr && normalizeText(item.fr).includes(query)) {
      score = 2;
    } else if (score > 2 && item.en && normalizeText(item.en).includes(query)) {
      score = 3;
    } else if (score > 3 && item.ar && normalizeText(item.ar).includes(query)) {
      score = 4;
    } else if (score === Infinity && item.mot) {
      const dist = levenshtein(motNorm, query);
      if (dist <= maxDist) score = 5 + dist;
    }
    
    if (score < Infinity) resultats.push({ item, score });
  }
  
  return resultats.sort((a,b) => a.score - b.score).slice(0,15).map(r => r.item);
}

if (searchBar) {
  let debounceTimeout;
  searchBar.addEventListener("input", (e) => {
    const raw = e.target.value.trim();
    if (clearSearchBtn) clearSearchBtn.hidden = !raw;
    if (!suggestionsList) return;
    
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      suggestionsList.innerHTML = "";
      suggestionsList.classList.remove("show");
      if (!raw) return;
      
      const resultats = chercher(raw);
      if (!resultats.length) {
        const li = document.createElement("li");
        li.textContent = "🔍 Aucun résultat";
        li.style.padding = "0.75rem";
        li.style.color = "var(--text-muted)";
        suggestionsList.appendChild(li);
      } else {
        resultats.forEach(item => {
          const li = document.createElement("li");
          let extraInfo = "";
          if (currentLanguage === "fr" && item.fr) extraInfo = item.fr;
          else if (currentLanguage === "en" && item.en) extraInfo = item.en;
          else if (currentLanguage === "ar" && item.ar) extraInfo = item.ar;
          else extraInfo = item.fr || item.en || "";
          
          li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong> <span class="mot-cat">(${escapeHtml(item.cat || '')})</span><br><small>${escapeHtml(extraInfo.substring(0, 80))}${extraInfo.length > 80 ? '…' : ''}</small>`;
          li.style.cursor = "pointer";
          li.style.padding = "0.75rem";
          li.style.borderBottom = "1px solid var(--border-color)";
          li.addEventListener("click", () => {
            searchBar.value = item.mot;
            suggestionsList.innerHTML = "";
            suggestionsList.classList.remove("show");
            afficherMot(item);
          });
          suggestionsList.appendChild(li);
        });
      }
      suggestionsList.classList.add("show");
    }, 300);
  });
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchBar.value = "";
      searchBar.focus();
      clearSearchBtn.hidden = true;
      suggestionsList.innerHTML = "";
      suggestionsList.classList.remove("show");
    });
  }
}

function construireIndexAlphabet() {
  const container = document.getElementById("alphabetIndex");
  const wordListContainer = document.getElementById("wordList");
  if (!container || !wordListContainer) return;
  const letters = [...new Set(vocabulaire.map(v => v.mot?.[0]?.toUpperCase()).filter(Boolean))].sort();
  container.innerHTML = "";
  letters.forEach(l => {
    const btn = document.createElement("button");
    btn.textContent = l;
    btn.className = "alphabet-btn";
    btn.addEventListener("click", () => {
      wordListContainer.innerHTML = "";
      const motsFiltres = vocabulaire.filter(v => v.mot?.toUpperCase().startsWith(l));
      motsFiltres.forEach(m => {
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

function ajouterHistorique(mot) {
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  historique = historique.filter(m => m !== mot);
  historique.unshift(mot);
  if (historique.length > 20) historique.pop();
  localStorage.setItem("historiqueTadakssahak", JSON.stringify(historique));
  afficherHistorique();
}

function afficherHistorique() {
  const footer = document.querySelector("footer");
  let bloc = document.getElementById("historique");
  if (!bloc && footer) {
    bloc = document.createElement("div");
    bloc.id = "historique";
    footer.appendChild(bloc);
  }
  if (bloc) {
    bloc.innerHTML = historique.length ? `<strong>📜 Derniers mots :</strong> ${historique.map(m => `<span class='mot-historique' data-mot="${escapeHtml(m)}">${escapeHtml(m)}</span>`).join(", ")}` : "<em>Aucun mot consulté récemment.</em>";
    bloc.querySelectorAll(".mot-historique").forEach(el => {
      el.addEventListener("click", () => {
        const mot = vocabulaire.find(v => v.mot === el.dataset.mot);
        if (mot) afficherMot(mot);
      });
    });
  }
}

function chargerHistorique() {
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  afficherHistorique();
}

// ------------------------------
// FAVORIS
// ------------------------------
function chargerFavoris() {
  favoris = JSON.parse(localStorage.getItem("favorisTadakssahak")) || [];
}

function sauvegarderFavoris() {
  localStorage.setItem("favorisTadakssahak", JSON.stringify(favoris));
}

function basculerFavori(item) {
  if (favoris.includes(item.mot)) {
    favoris = favoris.filter(m => m !== item.mot);
    showToast(i18n[currentLanguage].remove_favorite, "info");
  } else {
    favoris.push(item.mot);
    showToast(i18n[currentLanguage].add_favorite, "success");
  }
  sauvegarderFavoris();
  if (motActuel === item) afficherMot(item);
  if (document.getElementById("dashboard") && !document.getElementById("dashboard").hidden) afficherDashboard();
}

function partagerMot(item) {
  const text = `${item.mot} : ${currentLanguage === 'fr' ? item.fr : (currentLanguage === 'en' ? item.en : item.fr)}`;
  if (navigator.share) {
    navigator.share({ title: 'Mot Tadaksahak', text: text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    showToast("📋 Copié dans le presse-papier", "success");
  }
}

// ------------------------------
// MOT DU JOUR
// ------------------------------
function getWordOfDay() {
  if (!vocabulaire.length) return null;
  const today = new Date().toISOString().slice(0,10);
  let stored = localStorage.getItem('word_of_day');
  if (stored && JSON.parse(stored).date === today) return JSON.parse(stored).word;
  const randomIndex = Math.floor(Math.random() * vocabulaire.length);
  const word = vocabulaire[randomIndex];
  localStorage.setItem('word_of_day', JSON.stringify({ date: today, word: word.mot }));
  return word.mot;
}

function afficherMotDuJour() {
  const container = document.getElementById("wordOfDayContainer");
  if (!container) return;
  const mot = getWordOfDay();
  if (!mot) return;
  const item = vocabulaire.find(v => v.mot === mot);
  if (!item) return;
  let definition = currentLanguage === 'fr' ? item.fr : (currentLanguage === 'en' ? item.en : item.ar);
  container.innerHTML = `<strong>${i18n[currentLanguage].word_of_day}</strong> : ${escapeHtml(mot)} — ${escapeHtml(definition)}`;
}

function requestNotificationPermission() {
  if ('Notification' in navigator && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function showWordNotification() {
  if ('Notification' in navigator && Notification.permission === 'granted') {
    const mot = getWordOfDay();
    if (mot) new Notification(`📖 Mot du jour : ${mot}`);
  }
}

// ============================================================
// GRAMMAIRE - LIVRE OUVERT INTERACTIF (30 BLOCS)
// ============================================================

// Chargement du fichier grammaire.json (tableau fusionné des 30 blocs)
async function loadGrammarBook() {
    if (grammarBlocks.length > 0) return; // déjà chargé
    try {
        const response = await fetch('data/grammaire.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        grammarBlocks = await response.json();
        if (!Array.isArray(grammarBlocks)) {
            throw new Error('Format invalide : attendu un tableau');
        }
        console.log(`📚 Grammaire chargée : ${grammarBlocks.length} blocs`);
        initGrammarBook();
    } catch (error) {
        console.error('Erreur chargement grammaire.json:', error);
        const left = document.getElementById('leftContent');
        if (left) left.innerHTML = '<p style="color:red;">❌ Erreur de chargement des données grammaticales.</p>';
    }
}

// Rendu d'une page (gauche ou droite)
function renderBookPage(side, block) {
    const elements = side === 'left' ? {
        title: bookElements.leftTitle,
        content: bookElements.leftContent,
        range: bookElements.leftRange,
        keywords: bookElements.leftKeywords,
        pageNum: bookElements.leftPageNum
    } : {
        title: bookElements.rightTitle,
        content: bookElements.rightContent,
        range: bookElements.rightRange,
        keywords: bookElements.rightKeywords,
        pageNum: bookElements.rightPageNum
    };

    if (!block) {
        elements.title.textContent = '';
        elements.content.innerHTML = '<p style="opacity:0.5;">— Fin du livre —</p>';
        elements.range.textContent = '';
        elements.keywords.innerHTML = '';
        elements.pageNum.textContent = '';
        return;
    }

    const title = block.titre_section[currentGrammarLang] || block.titre_section.fr || '';
    const content = block.contenu[currentGrammarLang] || block.contenu.fr || '';
    const plage = block.plage_pages || '';
    const keywords = block.mots_cles || [];

    elements.title.textContent = title;
    elements.content.innerHTML = `<p>${content.replace(/\n/g, '<br>')}</p>`;
    elements.range.textContent = `📄 p. ${plage}`;
    elements.keywords.innerHTML = keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('');
    elements.pageNum.textContent = `Bloc ${block.bloc_id}`;
}

// Mise à jour de l'affichage des deux pages
function updateGrammarSpread() {
    const leftBlock = grammarBlocks[currentBlockIndex] || null;
    const rightBlock = (currentBlockIndex + 1 < grammarBlocks.length) ? grammarBlocks[currentBlockIndex + 1] : null;

    renderBookPage('left', leftBlock);
    renderBookPage('right', rightBlock);

    const total = grammarBlocks.length;
    const start = currentBlockIndex + 1;
    const end = Math.min(currentBlockIndex + 2, total);
    if (bookElements.pageIndicator) {
        bookElements.pageIndicator.textContent = `Blocs ${start}–${end} / ${total}`;
    }

    if (bookElements.prevBtn) bookElements.prevBtn.disabled = (currentBlockIndex === 0);
    if (bookElements.nextBtn) bookElements.nextBtn.disabled = (currentBlockIndex + 2 >= total);
}

function nextGrammarSpread() {
    if (currentBlockIndex + 2 < grammarBlocks.length) {
        currentBlockIndex += 2;
        updateGrammarSpread();
        if (bookElements.bookSpread) {
            bookElements.bookSpread.style.transform = 'translateX(-5px)';
            setTimeout(() => bookElements.bookSpread.style.transform = '', 150);
        }
    }
}

function prevGrammarSpread() {
    if (currentBlockIndex > 0) {
        currentBlockIndex = Math.max(0, currentBlockIndex - 2);
        updateGrammarSpread();
        if (bookElements.bookSpread) {
            bookElements.bookSpread.style.transform = 'translateX(5px)';
            setTimeout(() => bookElements.bookSpread.style.transform = '', 150);
        }
    }
}

// Changement de langue dans le livre
function setGrammarLanguage(lang) {
    currentGrammarLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    document.querySelectorAll('#grammaire .lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    if (grammarBlocks.length > 0) {
        updateGrammarSpread();
    }
}

// Synchronisation avec le sélecteur de langue global (header)
function syncGrammarWithGlobalLang(globalLang) {
    if (globalLang && ['fr','en','ar'].includes(globalLang)) {
        setGrammarLanguage(globalLang);
    }
}

// Initialisation du livre
function initGrammarBook() {
    if (!grammarBlocks.length) return;
    if (bookInitialized) return;
    
    currentBlockIndex = 0;
    updateGrammarSpread();
    
    // Écouteurs des boutons de navigation
    if (bookElements.prevBtn) bookElements.prevBtn.addEventListener('click', prevGrammarSpread);
    if (bookElements.nextBtn) bookElements.nextBtn.addEventListener('click', nextGrammarSpread);
    
    // Écouteurs des boutons de langue internes au livre
    document.querySelectorAll('#grammaire .lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setGrammarLanguage(btn.dataset.lang));
    });
    
    // Swipe tactile
    let touchStartX = 0;
    if (bookElements.bookSpread) {
        bookElements.bookSpread.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        bookElements.bookSpread.addEventListener('touchend', (e) => {
            if (!touchStartX) return;
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) > 50) {
                if (diff < 0) nextGrammarSpread();
                else prevGrammarSpread();
            }
            touchStartX = 0;
        });
    }
    
    // Navigation clavier (seulement quand la section grammaire est visible)
    window.addEventListener('keydown', (e) => {
        const gramSection = document.getElementById('grammaire');
        if (gramSection && gramSection.hidden) return;
        if (e.key === 'ArrowLeft') {
            prevGrammarSpread();
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            nextGrammarSpread();
            e.preventDefault();
        }
    });
    
    bookInitialized = true;
    console.log('📖 Livre grammaire initialisé');
}

// Fonction à appeler quand l'onglet Grammaire est affiché
function showGrammarSection() {
    const section = document.getElementById('grammaire');
    if (section && section.hidden === false) {
        loadGrammarBook();
        // Synchroniser la langue du livre avec la langue globale
        const globalLang = localStorage.getItem('preferredLanguage') || 'fr';
        if (currentGrammarLang !== globalLang) {
            setGrammarLanguage(globalLang);
        }
    }
}

// ============================================================
// FIN DU LIVRE GRAMMAIRE
// ============================================================

// ------------------------------
// PROPOSITIONS RELATIVES
// ------------------------------
async function chargerRelatives() {
  try {
    const response = await fetch('data/relatives.json');
    if (!response.ok) throw new Error();
    relativesData = await response.json();
    console.log('📚 Données sur les relatives chargées');
  } catch(e) {
    console.warn("Erreur chargement relatives.json", e);
    relativesData = null;
  }
}

async function afficherRelatives() {
  const container = document.getElementById("relativesContainer");
  if (!container) return;
  
  if (!relativesData) {
    await chargerRelatives();
  }
  
  if (!relativesData) {
    container.innerHTML = `<p class="info-message">📚 Données sur les relatives non disponibles.</p>`;
    return;
  }
  
  let html = `
    <div class="relatives-premium-intro">
      <div class="premium-icon">📖</div>
      <h3>${i18n[currentLanguage].grammar_relatives_title}</h3>
      <p>${i18n[currentLanguage].grammar_relatives_desc}</p>
      <p>Le tadaksahak utilise trois stratégies distinctes pour former des propositions relatives.</p>
    </div>
    <div class="strategies-premium-grid">
  `;
  
  for (const strat of relativesData.strategies) {
    let usage = currentLanguage === 'fr' ? strat.usage_fr : (currentLanguage === 'en' ? strat.usage_en : strat.usage_ar);
    let marqueurAffiche = strat.marqueur === "∅" ? "∅ (aucun)" : (strat.marqueur_sg || strat.marqueur);
    
    html += `
      <div class="strategy-premium-card">
        <div class="strategy-header">
          <span class="strategy-marker">${escapeHtml(marqueurAffiche)}</span>
          <span class="strategy-type">${strat.marqueur === "∅" ? "Gap Strategy" : (strat.marqueur === "sa" ? "Non-restrictive" : "Relative Pronoun")}</span>
        </div>
        <p class="strategy-usage-premium">${escapeHtml(usage)}</p>
        <div class="strategy-exemples-premium">
    `;
    
    const exemples = strat.exemples || [];
    for (const ex of exemples.slice(0, 2)) {
      let trad = currentLanguage === 'fr' ? ex.traduction_fr : (currentLanguage === 'en' ? ex.traduction_en : ex.traduction_ar);
      html += `
        <div class="exemple-premium-card">
          <div class="exemple-tad-premium">${escapeHtml(ex.tadaksahak)}</div>
          <div class="exemple-gloss-premium">${escapeHtml(ex.glose_fr)}</div>
          <div class="exemple-trans-premium">${escapeHtml(trad)}</div>
        </div>
      `;
    }
    
    html += `</div></div>`;
  }
  
  html += `</div>`;
  container.innerHTML = html;
}

// ------------------------------
// CONTES
// ------------------------------
async function chargerContes() {
  try {
    const response = await fetch('data/conte.json');
    if (!response.ok) throw new Error();
    contesData = await response.json();
    console.log('📖 Contes chargés');
  } catch(e) {
    console.warn("Erreur chargement contes", e);
    contesData = null;
  }
}

function afficherContes() {
  const container = document.getElementById("contesContainer");
  if (!container) return;
  
  if (!contesData) {
    container.innerHTML = `<p class="info-message">📖 ${i18n[currentLanguage].contes_title || 'Aucun conte disponible.'}</p>`;
    return;
  }
  
  let html = `<div class="contes-premium-grid">`;
  const contes = Array.isArray(contesData) ? contesData : [contesData];
  
  for (const conte of contes) {
    let titre = currentLanguage === 'fr' ? conte.titre_fr : (currentLanguage === 'en' ? conte.titre_en : conte.titre_ar);
    let resume = currentLanguage === 'fr' ? conte.resume_fr : (currentLanguage === 'en' ? conte.resume_en : conte.resume_ar);
    
    html += `
      <div class="conte-premium-card">
        <div class="conte-card-icon">📖</div>
        <h3>${escapeHtml(titre || 'Sans titre')}</h3>
        <div class="conte-meta-premium">
          <span>📜 ${escapeHtml(conte.type || 'conte')}</span>
          <span>🗣️ ${escapeHtml(conte.narrateur || 'Tradition orale')}</span>
        </div>
        <p class="conte-resume-premium">${escapeHtml(resume || 'Résumé non disponible')}</p>
        <button class="btn-lire-conte-premium" data-conte-id="${conte.id || 0}">📖 Lire le conte</button>
      </div>
    `;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  
  document.querySelectorAll('.btn-lire-conte-premium').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.conteId);
      const conte = contes.find(c => c.id === id);
      if (conte) afficherConteDetail(conte);
    });
  });
}

function afficherConteDetail(conte) {
  let titre = currentLanguage === 'fr' ? conte.titre_fr : (currentLanguage === 'en' ? conte.titre_en : conte.titre_ar);
  let morale = currentLanguage === 'fr' ? conte.morale_fr : (currentLanguage === 'en' ? conte.morale_en : conte.morale_ar);
  
  let modalHtml = `
    <div id="conteModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>${escapeHtml(titre)}</h2>
        <div class="conte-versets">
    `;
  
  if (conte.versets && conte.versets.length) {
    for (const verset of conte.versets) {
      modalHtml += `
        <div class="verset">
          <div class="verset-num">${verset.numero}</div>
          <div class="verset-tad"><strong>${escapeHtml(verset.tadaksahak || '')}</strong></div>
          <div class="verset-gloss">${escapeHtml(verset.glose_fr || '')}</div>
          <div class="verset-trans">${escapeHtml(currentLanguage === 'fr' ? verset.traduction_fr : (currentLanguage === 'en' ? verset.traduction_en : (verset.traduction_ar || verset.traduction_fr)))}</div>
        </div>
      `;
    }
  }
  
  modalHtml += `
        </div>
        ${morale ? `<div class="conte-morale"><strong>💡 Morale :</strong> ${escapeHtml(morale)}</div>` : ''}
      </div>
    </div>
  `;
  
  const existingModal = document.getElementById('conteModal');
  if (existingModal) existingModal.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('conteModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

// ------------------------------
// ÉMISSIONS - VERSION PREMIUM
// ------------------------------
async function chargerEmissions() {
  try {
    const response = await fetch('data/emission.json');
    if (!response.ok) throw new Error();
    emissionsData = await response.json();
    console.log('🎙️ Émissions chargées');
  } catch(e) {
    console.warn("Erreur chargement émissions", e);
    emissionsData = null;
  }
}

function afficherEmissionsPremium() {
  const container = document.getElementById("emissionsContainer");
  if (!container) return;
  
  if (!emissionsData) {
    container.innerHTML = `<p class="info-message">🎙️ Aucune émission disponible.</p>`;
    return;
  }
  
  let html = `
    <div class="emissions-premium-intro">
      <div class="premium-icon">🎙️</div>
      <h3>${i18n[currentLanguage].emissions_title}</h3>
      <p>Découvrez les archives radiophoniques sur la langue et la culture Idaksahak</p>
    </div>
    <div class="emissions-premium-grid">
  `;
  
  const emissions = Array.isArray(emissionsData) ? emissionsData : [emissionsData];
  
  for (const emission of emissions) {
    let titre = currentLanguage === 'fr' ? emission.titre_fr : (currentLanguage === 'en' ? emission.titre_en : emission.titre_ar);
    let contexte = currentLanguage === 'fr' ? emission.contexte_fr : (currentLanguage === 'en' ? emission.contexte_en : emission.contexte_ar);
    
    html += `
      <div class="emission-premium-card">
        <div class="emission-card-header">
          <div class="emission-icon">🎙️</div>
          <div class="emission-info">
            <h4>${escapeHtml(titre)}</h4>
            <div class="emission-meta-premium">
              <span>📅 ${emission.date || '?'}</span>
              <span>🗣️ ${escapeHtml(emission.orateur || 'Inconnu')}</span>
              <span>📍 ${escapeHtml(emission.lieu || '?')}</span>
            </div>
          </div>
        </div>
        <p class="emission-contexte-premium">${escapeHtml(contexte || '')}</p>
        <button class="btn-emission-premium" data-emission-id="${emission.id || 0}">
          🎧 Lire la transcription
        </button>
        <div class="emission-transcription" id="emissionTrans-${emission.id || 0}" style="display: none;">
    `;
    
    if (emission.versets && emission.versets.length) {
      for (const verset of emission.versets) {
        html += `
          <div class="verset">
            <div class="verset-num">${verset.numero}</div>
            <div class="verset-tad"><strong>${escapeHtml(verset.tadaksahak || '')}</strong></div>
            <div class="verset-gloss">${escapeHtml(verset.glose_fr || '')}</div>
            <div class="verset-trans">${escapeHtml(currentLanguage === 'fr' ? verset.traduction_fr : (currentLanguage === 'en' ? verset.traduction_en : (verset.traduction_ar || verset.traduction_fr)))}</div>
          </div>
        `;
      }
    }
    
    html += `
        </div>
      </div>
    `;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  
  document.querySelectorAll('.btn-emission-premium').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.emissionId;
      const transcriptDiv = document.getElementById(`emissionTrans-${id}`);
      if (transcriptDiv.style.display === 'none') {
        transcriptDiv.style.display = 'block';
        btn.textContent = '📖 Masquer la transcription';
      } else {
        transcriptDiv.style.display = 'none';
        btn.textContent = '🎧 Lire la transcription';
      }
    });
  });
}

// ------------------------------
// THÈMES - VERSION PREMIUM
// ------------------------------
async function chargerThemes() {
  try {
    const response = await fetch('data/themes.json');
    if (!response.ok) throw new Error();
    themesData = await response.json();
    console.log('📚 Thèmes chargés');
  } catch(e) {
    console.warn("Erreur chargement thèmes", e);
    themesData = null;
  }
}

function afficherThemesPremium() {
  const container = document.getElementById("themesContainer");
  if (!container) return;
  
  if (!themesData || !themesData.themes || themesData.themes.length === 0) {
    container.innerHTML = `<p class="info-message">📚 Aucun thème disponible.</p>`;
    return;
  }
  
  let html = `
    <div class="themes-premium-header">
      <div class="premium-icon">📚</div>
      <h2>${i18n[currentLanguage].themes_title}</h2>
      <p>Apprenez le vocabulaire tadaksahak par catégories thématiques</p>
      <div class="themes-premium-search">
        <input type="text" id="themeSearchPremium" placeholder="🔍 Rechercher un mot..." class="theme-search-premium">
      </div>
      <div class="themes-premium-stats">
        <span class="stat-badge">📖 ${themesData.themes.reduce((acc, t) => acc + (t.mots?.length || 0), 0)} mots</span>
        <span class="stat-badge">📚 ${themesData.themes.length} thèmes</span>
      </div>
    </div>
    <div class="themes-premium-grid">
  `;
  
  for (let i = 0; i < themesData.themes.length; i++) {
    const theme = themesData.themes[i];
    let titre = currentLanguage === 'fr' ? theme.titre_fr : (currentLanguage === 'en' ? theme.titre_en : theme.titre_ar);
    let description = currentLanguage === 'fr' ? theme.description_fr : (currentLanguage === 'en' ? theme.description_en : theme.description_ar);
    const motCount = theme.mots?.length || 0;
    
    html += `
      <div class="theme-premium-card" data-theme-idx="${i}">
        <div class="theme-premium-header">
          <div class="theme-premium-icon">📖</div>
          <h3>${escapeHtml(titre)}</h3>
          <span class="theme-premium-badge">${motCount} mots</span>
        </div>
        <p class="theme-premium-desc">${escapeHtml(description || '')}</p>
        <div class="theme-premium-preview">
          ${theme.mots?.slice(0, 4).map(mot => `<span class="preview-word-premium">${escapeHtml(mot.tad)}</span>`).join('')}
          ${motCount > 4 ? `<span class="preview-more-premium">+${motCount - 4} autres</span>` : ''}
        </div>
        <button class="theme-premium-expand" data-theme-idx="${i}">
          <span>Explorer le thème</span>
          <span class="expand-icon">▼</span>
        </button>
        <div class="theme-premium-words" id="themeWordsPremium-${i}" style="display: none;">
          <div class="words-premium-header">
            <span>Mot en tadaksahak</span>
            <span>Traduction</span>
            <span></span>
          </div>
          <div class="words-premium-list">
            ${theme.mots?.map(mot => `
              <div class="word-premium-row" data-mot="${escapeHtml(mot.tad)}">
                <span class="word-premium-tad">${escapeHtml(mot.tad)}</span>
                <span class="word-premium-trans">${escapeHtml(currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar))}</span>
                <button class="word-premium-play" onclick="speakTextPremium('${escapeHtml(mot.tad)}')">🔊</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  
  document.querySelectorAll('.theme-premium-expand').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = btn.dataset.themeIdx;
      const wordsContainer = document.getElementById(`themeWordsPremium-${idx}`);
      
      if (wordsContainer.style.display === 'none') {
        wordsContainer.style.display = 'block';
        btn.querySelector('.expand-icon').textContent = '▲';
        btn.querySelector('span:first-child').textContent = 'Réduire';
      } else {
        wordsContainer.style.display = 'none';
        btn.querySelector('.expand-icon').textContent = '▼';
        btn.querySelector('span:first-child').textContent = 'Explorer le thème';
      }
    });
  });
  
  const searchInput = document.getElementById('themeSearchPremium');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.theme-premium-card');
      
      cards.forEach(card => {
        const words = card.querySelectorAll('.word-premium-row');
        let hasMatch = false;
        
        words.forEach(word => {
          const text = word.textContent.toLowerCase();
          if (query === '' || text.includes(query)) {
            word.style.display = 'flex';
            hasMatch = true;
          } else {
            word.style.display = 'none';
          }
        });
        
        if (query !== '' && hasMatch) {
          const wordsContainer = card.querySelector('.theme-premium-words');
          if (wordsContainer && wordsContainer.style.display !== 'block') {
            wordsContainer.style.display = 'block';
            const btn = card.querySelector('.theme-premium-expand');
            if (btn) {
              btn.querySelector('.expand-icon').textContent = '▲';
              btn.querySelector('span:first-child').textContent = 'Réduire';
            }
          }
        }
      });
    });
  }
  
  document.querySelectorAll('.word-premium-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.classList.contains('word-premium-play')) return;
      const mot = row.dataset.mot;
      const motTrouve = vocabulaire.find(v => v.mot === mot);
      if (motTrouve && sectionSelector) {
        sectionSelector.value = 'dictionnaire';
        sectionSelector.dispatchEvent(new Event('change'));
        setTimeout(() => afficherMot(motTrouve), 100);
      }
    });
  });
}

function speakTextPremium(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    showToast("🔊 Synthèse vocale non supportée", "warning");
  }
}

// ------------------------------
// FLASHCARDS
// ------------------------------
function genererFlashcards() {
  const container = document.getElementById("flashcardsContainer");
  if (!container) return;
  
  const theme = document.getElementById('flashcardsThemeSelect')?.value || 'all';
  let motsFiltres = [...vocabulaire];
  
  if (theme === 'verbes') {
    motsFiltres = motsFiltres.filter(m => m.cat === 'vt.' || m.cat === 'vi.');
  } else if (theme === 'noms') {
    motsFiltres = motsFiltres.filter(m => m.cat === 'n.' || m.cat === 'npl.');
  } else if (theme === 'relatives' && relativesData) {
    motsFiltres = [];
    for (const strat of relativesData.strategies) {
      for (const ex of (strat.exemples || [])) {
        motsFiltres.push({
          mot: ex.tadaksahak.split('[')[0].trim() + ' [...]',
          cat: strat.marqueur_sg || strat.marqueur || 'relative',
          fr: ex.traduction_fr,
          en: ex.traduction_en,
          ar: ex.traduction_ar
        });
      }
    }
  }
  
  if (motsFiltres.length === 0) {
    container.innerHTML = `<div class="info-message">📚 Aucun mot dans cette catégorie.</div>`;
    return;
  }
  
  currentFlashcards = [...motsFiltres].sort(() => 0.5 - Math.random());
  currentFlashcardIndex = 0;
  afficherFlashcard();
  mettreAJourProgressionFlashcards();
}

function afficherFlashcard() {
  const container = document.getElementById("flashcardsContainer");
  if (!container) return;
  
  if (!currentFlashcards.length || currentFlashcardIndex >= currentFlashcards.length) {
    container.innerHTML = `<div class="flashcards-complete">
      <h3>🎉 Félicitations !</h3>
      <p>Vous avez terminé toutes les flashcards !</p>
      <button id="restartFlashcardsBtn" class="btn">🔄 Recommencer</button>
    </div>`;
    document.getElementById('restartFlashcardsBtn')?.addEventListener('click', () => genererFlashcards());
    return;
  }
  
  const mot = currentFlashcards[currentFlashcardIndex];
  let question = mot.mot;
  let reponse = currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar);
  let categorie = currentLanguage === 'fr' ? (mot.cat || 'Mot') : (mot.cat || 'Word');
  
  container.innerHTML = `
    <div class="flashcard" data-flipped="false">
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <div class="flashcard-cat">${escapeHtml(categorie)}</div>
          <div class="flashcard-word">${escapeHtml(question)}</div>
          <div class="flashcard-prompt">👆 Cliquez pour voir la réponse</div>
        </div>
        <div class="flashcard-back">
          <div class="flashcard-def">${escapeHtml(reponse)}</div>
          <div class="flashcard-buttons">
            <button class="flashcard-btn correct" data-action="correct">✅ Je sais</button>
            <button class="flashcard-btn wrong" data-action="wrong">❌ Je ne sais pas</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const flashcard = container.querySelector('.flashcard');
  const correctBtn = container.querySelector('.flashcard-btn.correct');
  const wrongBtn = container.querySelector('.flashcard-btn.wrong');
  
  flashcard?.addEventListener('click', (e) => {
    if (e.target.classList.contains('flashcard-btn')) return;
    const isFlipped = flashcard.getAttribute('data-flipped') === 'true';
    flashcard.setAttribute('data-flipped', !isFlipped);
  });
  
  correctBtn?.addEventListener('click', () => {
    currentFlashcardIndex++;
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
  
  wrongBtn?.addEventListener('click', () => {
    const wrongCard = currentFlashcards.splice(currentFlashcardIndex, 1)[0];
    currentFlashcards.push(wrongCard);
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
}

function mettreAJourProgressionFlashcards() {
  const currentSpan = document.getElementById('flashcardCurrent');
  const totalSpan = document.getElementById('flashcardTotal');
  if (currentSpan) currentSpan.textContent = currentFlashcardIndex + 1;
  if (totalSpan) totalSpan.textContent = currentFlashcards.length;
}

function initFlashcards() {
  const themeSelect = document.getElementById('flashcardsThemeSelect');
  const shuffleBtn = document.getElementById('shuffleFlashcardsBtn');
  const resetBtn = document.getElementById('resetFlashcardsBtn');
  
  themeSelect?.addEventListener('change', () => genererFlashcards());
  shuffleBtn?.addEventListener('click', () => {
    if (currentFlashcards.length) {
      currentFlashcards.sort(() => 0.5 - Math.random());
      currentFlashcardIndex = 0;
      afficherFlashcard();
      mettreAJourProgressionFlashcards();
    }
  });
  resetBtn?.addEventListener('click', () => {
    if (currentFlashcards.length) {
      currentFlashcardIndex = 0;
      afficherFlashcard();
      mettreAJourProgressionFlashcards();
    }
  });
  if (vocabulaire.length) genererFlashcards();
}

// ------------------------------
// QUIZ
// ------------------------------
async function chargerQuiz() {
  try {
    const response = await fetch('data/quiz.json');
    if (!response.ok) throw new Error();
    quizData = await response.json();
  } catch(e) {
    console.warn("Quiz non disponible, utilisation fallback", e);
    quizData = { fr: [{ question: "Exemple ?", options: ["A","B","C"], reponse: 0 }] };
  }
  const container = document.getElementById("quizContainer");
  if (container) container.innerHTML = `<button id="startQuizBtn" class="btn">${i18n[currentLanguage].quiz_start}</button>`;
  document.getElementById("startQuizBtn")?.addEventListener("click", () => demarrerQuiz());
}

function demarrerQuiz() {
  const lang = currentLanguage;
  if (!quizData || !quizData[lang]) return;
  currentQuiz = {
    questions: quizData[lang],
    currentIndex: 0,
    score: 0,
    lang: lang
  };
  afficherQuestionQuiz();
}

function afficherQuestionQuiz() {
  const container = document.getElementById("quizContainer");
  if (!container) return;
  const q = currentQuiz.questions[currentQuiz.currentIndex];
  if (!q) return terminerQuiz();
  let html = `<div class="quiz-question"><p><strong>${escapeHtml(q.question)}</strong></p><div class="quiz-options">`;
  q.options.forEach((opt, idx) => {
    html += `<button class="quiz-option" data-opt="${idx}">${escapeHtml(opt)}</button>`;
  });
  html += `</div><div class="quiz-progress">Question ${currentQuiz.currentIndex+1}/${currentQuiz.questions.length}</div></div>`;
  container.innerHTML = html;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = parseInt(e.currentTarget.dataset.opt);
      if (selected === q.reponse) currentQuiz.score++;
      currentQuiz.currentIndex++;
      afficherQuestionQuiz();
    });
  });
}

function terminerQuiz() {
  const container = document.getElementById("quizContainer");
  const percent = (currentQuiz.score / currentQuiz.questions.length) * 100;
  let message = `${i18n[currentLanguage].quiz_score} : ${currentQuiz.score}/${currentQuiz.questions.length} (${Math.round(percent)}%)`;
  let progress = JSON.parse(localStorage.getItem("quizProgress")) || {};
  progress[currentQuiz.lang] = { score: currentQuiz.score, total: currentQuiz.questions.length, date: new Date().toISOString() };
  localStorage.setItem("quizProgress", JSON.stringify(progress));
  container.innerHTML = `<p>${message}</p><button id="restartQuizBtn" class="btn">${i18n[currentLanguage].quiz_restart}</button>`;
  document.getElementById("restartQuizBtn")?.addEventListener("click", () => demarrerQuiz());
  if (document.getElementById("dashboard") && !document.getElementById("dashboard").hidden) afficherDashboard();
}

// ------------------------------
// TIMELINE
// ------------------------------
async function chargerTimeline() {
  try {
    const response = await fetch('data/timeline.json');
    if (!response.ok) throw new Error();
    timelineData = await response.json();
  } catch(e) {
    console.warn("Timeline non disponible", e);
    timelineData = [];
  }
}

function afficherTimeline() {
  const container = document.getElementById("timelineContainer");
  if (!container || !timelineData) return;
  const events = timelineData.filter(e => e.lang === currentLanguage);
  if (!events.length) { container.innerHTML = "<p>Aucun événement</p>"; return; }
  let html = `<div class="timeline">`;
  events.forEach(event => {
    html += `<div class="timeline-item"><div class="timeline-date">${event.date}</div><div class="timeline-content"><h4>${escapeHtml(event.title)}</h4><p>${escapeHtml(event.description)}</p>${event.image ? `<img src="${event.image}" alt="" style="max-width:100%; border-radius:8px; margin-top:0.5rem;">` : ''}</div></div>`;
  });
  html += `</div>`;
  container.innerHTML = html;
}

// ------------------------------
// CARTE
// ------------------------------
function initialiserCarte() {
  const container = document.getElementById("mapContainer");
  if (!container) return;
  if (mapInitialized) return;
  
  if (!leafletLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      leafletLoaded = true;
      creerCarte();
    };
    document.head.appendChild(script);
  } else {
    creerCarte();
  }
}

function creerCarte() {
  const container = document.getElementById("mapContainer");
  if (!container) return;
  const map = L.map('mapContainer').setView([16.0, 0.0], 6);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' }).addTo(map);
  const points = [
    { lat: 15.9167, lon: 2.4167, name_fr: "Ménaka", name_ar: "ميناكا", name_en: "Ménaka" },
    { lat: 16.2667, lon: -0.05, name_fr: "Gao", name_ar: "غاو", name_en: "Gao" },
    { lat: 15.7167, lon: 0.9167, name_fr: "Talatayt", name_ar: "تالاتايت", name_en: "Talatayt" }
  ];
  points.forEach(p => {
    let name = currentLanguage === 'fr' ? p.name_fr : (currentLanguage === 'ar' ? p.name_ar : p.name_en);
    L.marker([p.lat, p.lon]).addTo(map).bindPopup(name);
  });
  mapInitialized = true;
}

// ------------------------------
// RECHERCHE PLEIN TEXTE
// ------------------------------
function rechercherPleinTexte() {
  const query = document.getElementById("searchBooksInput")?.value.trim();
  const container = document.getElementById("searchBooksResults");
  if (!query || !livresConnaissance) { if(container) container.innerHTML = ""; return; }
  const mots = query.toLowerCase().split(/\s+/);
  const results = [];
  for (const livre of livresConnaissance.livres) {
    for (const chunk of livre.chunks) {
      let match = true;
      for (const mot of mots) {
        if (!chunk.texte.toLowerCase().includes(mot)) { match = false; break; }
      }
      if (match) results.push({ livre: livre.titre, auteur: livre.auteur, chapitre: chunk.chapitre, titre: chunk.titre, texte: chunk.texte });
    }
  }
  if (!container) return;
  if (!results.length) { container.innerHTML = "<p>Aucun résultat</p>"; return; }
  let html = `<h3>${i18n[currentLanguage].search_results} (${results.length})</h3>`;
  results.forEach(r => {
    let texteApercu = r.texte.substring(0, 300);
    let regex = new RegExp(`(${mots.join('|')})`, 'gi');
    texteApercu = texteApercu.replace(regex, '<mark>$1</mark>');
    html += `<div class="search-result"><strong>${escapeHtml(r.livre)}</strong> (${escapeHtml(r.auteur)}), ch.${r.chapitre} : ${escapeHtml(r.titre)}<p>${texteApercu}...</p></div>`;
  });
  container.innerHTML = html;
}

// ------------------------------
// TABLEAU DE BORD
// ------------------------------
function afficherDashboard() {
  const container = document.getElementById("dashboardContainer");
  if (!container) return;
  let html = `<h3>${i18n[currentLanguage].dashboard_history}</h3><ul>`;
  historique.slice(0,10).forEach(m => { html += `<li>${escapeHtml(m)}</li>`; });
  html += `</ul><h3>${i18n[currentLanguage].dashboard_favorites}</h3><ul>`;
  favoris.forEach(m => { html += `<li>${escapeHtml(m)}</li>`; });
  html += `</ul><h3>${i18n[currentLanguage].dashboard_quiz_progress}</h3>`;
  const progress = JSON.parse(localStorage.getItem("quizProgress")) || {};
  for (let lang in progress) {
    html += `<p>${lang.toUpperCase()} : ${progress[lang].score}/${progress[lang].total}</p>`;
  }
  container.innerHTML = html;
}

// ------------------------------
// LIVRES
// ------------------------------
async function afficherLivres() {
  const cont = document.getElementById("livresContainer");
  if (!cont) return;
  showSkeleton('livresContainer');
  try {
    const response = await fetch('data/livres.json');
    if (!response.ok) throw new Error();
    const allLivres = await response.json();
    let langueCible = currentLanguage === "fr" ? "Français" : (currentLanguage === "ar" ? "Arabe" : "English");
    const livres = allLivres.filter(l => l.langue === langueCible && l.type !== "rapport");
    if (!livres.length) { cont.innerHTML = `<p class="info-message">📚 Aucun livre dans cette langue.</p>`; return; }
    cont.innerHTML = livres.map(livre => `
      <div class="livre-card">
        ${livre.couverture ? `<div class="livre-cover"><img src="${escapeHtml(livre.couverture)}" alt="Couverture" loading="lazy" style="width:100%; border-radius:8px;"></div>` : ''}
        <div class="livre-titre">📖 ${escapeHtml(livre.titre)}</div>
        <div class="livre-auteur">✍️ ${escapeHtml(livre.auteur)}</div>
        <div class="livre-desc">${escapeHtml(livre.description || '')}</div>
        <div class="livre-meta">🏷️ ${escapeHtml(livre.categorie || 'Général')} • 📅 ${livre.annee || '?'} • 📄 ${livre.pages || '?'} pages</div>
        <div class="livre-actions"><a href="livre-viewer.html?id=${livre.id}" class="btn-small" target="_blank">📖 Lire l'ouvrage</a></div>
      </div>
    `).join('');
  } catch(e) { 
    console.error("Erreur chargement livres", e);
    cont.innerHTML = `<p class="error-message">❌ Erreur chargement livres.</p>`; 
  }
}

// ------------------------------
// PHOTOS
// ------------------------------
function afficherPhotos() {
  const container = document.getElementById("photosContainer");
  if (!container) return;
  let html = `<div class="album-header"><h3>📷 Album : Photos historiques</h3><p>Clichés de Charles Grémont</p></div><div class="galerie-grid">`;
  imagesGalerie.forEach(img => {
    let titre = "", legende = "";
    if (currentLanguage === "fr") { titre = img.titre_fr; legende = img.legende_fr; }
    else if (currentLanguage === "ar") { titre = img.titre_ar; legende = img.legende_ar; }
    else { titre = img.titre_en; legende = img.legende_en; }
    html += `<div class="galerie-item"><img src="${escapeHtml(img.fichier)}" alt="${escapeHtml(titre)}" loading="lazy"><div class="galerie-caption"><strong>${escapeHtml(titre)}</strong><p class="legende">${escapeHtml(legende)}</p><small class="credit">${escapeHtml(img.credit)}</small></div></div>`;
  });
  html += `</div>`;
  container.innerHTML = html;
}

// ------------------------------
// RAPPORTS
// ------------------------------
function afficherRapports() {
  const container = document.getElementById("rapportsContainer");
  if (!container) return;
  container.innerHTML = `<div class="loading-books">📄 Chargement des rapports...</div>`;
  fetch('data/livres.json')
    .then(response => response.json())
    .then(allLivres => {
      let langueCible = currentLanguage === "fr" ? "Français" : (currentLanguage === "ar" ? "Arabe" : "English");
      const rapports = allLivres.filter(l => l.type === "rapport" && l.langue === langueCible);
      if (!rapports.length) {
        container.innerHTML = `<p class="info-message">📄 Aucun rapport dans cette langue.</p>`;
        return;
      }
      container.innerHTML = `<div class="rapports-grid">` + rapports.map(rapport => `
        <div class="rapport-card">
          <div class="rapport-type">📄 RAPPORT</div>
          <h3 class="rapport-titre">${escapeHtml(rapport.titre)}</h3>
          <div class="rapport-auteur">✍️ ${escapeHtml(rapport.auteur)}</div>
          <div class="rapport-meta">📅 ${rapport.annee || '?'} • 🏷️ ${escapeHtml(rapport.categorie || 'Linguistique')}</div>
          <div class="rapport-desc">${escapeHtml(rapport.description || '')}</div>
          <div class="rapport-actions">
            <a href="livre-viewer.html?id=${rapport.id}" class="btn-small" target="_blank">📖 Lire le rapport</a>
          </div>
        </div>
      `).join('') + `</div>`;
    })
    .catch(e => {
      console.error("Erreur chargement rapports", e);
      container.innerHTML = `<p class="error-message">❌ Erreur de chargement des rapports.</p>`;
    });
}

function genererAlbumsAudio() {
  const conteneur = document.getElementById("audioContainer");
  if (conteneur) conteneur.innerHTML = "<p class='info-message'>🎵 Pistes audio à venir prochainement...</p>";
}

function genererVideos() {
  const conteneur = document.getElementById("videosContainer");
  if (conteneur) conteneur.innerHTML = "<p class='info-message'>🎥 Vidéos à venir prochainement...</p>";
}

// ------------------------------
// BASE DE CONNAISSANCES
// ------------------------------
async function chargerLivresConnaissance() {
  try {
    const response = await fetch('data/livres_connaissance.json');
    if (response.ok) {
      livresConnaissance = await response.json();
      console.log('📚 Base de connaissances chargée');
    } else {
      console.warn('livres_connaissance.json non trouvé');
      livresConnaissance = { livres: [] };
    }
  } catch(e) { 
    console.warn(e);
    livresConnaissance = { livres: [] };
  }
}

// ------------------------------
// SERVICE WORKER PWA
// ------------------------------
function registerServiceWorker() {
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

function showInstallBanner() {
  if (isAppInstalled) return;
  if (localStorage.getItem('installBannerDismissed') === 'true') return;
  const banner = document.createElement('div');
  banner.id = 'installBanner';
  banner.className = 'install-banner';
  banner.innerHTML = `
    <div class="install-banner-content">
      <img src="images/idaksahak_round.png" alt="Logo" width="40" height="40">
      <div class="install-banner-text">
        <strong>Installer Tadaksahak Learning</strong>
        <small>Utilisez l'application hors-ligne</small>
      </div>
      <button id="installAppBtn" class="btn-install">📲 Installer</button>
      <button id="dismissBannerBtn" class="btn-dismiss">✖</button>
    </div>
  `;
  document.body.appendChild(banner);
  document.getElementById('dismissBannerBtn')?.addEventListener('click', () => {
    banner.remove();
    localStorage.setItem('installBannerDismissed', 'true');
  });
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installAppBtn')?.addEventListener('click', () => {
      banner.remove();
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          isAppInstalled = true;
        }
        deferredPrompt = null;
      });
    });
  });
}

window.addEventListener('appinstalled', () => {
  isAppInstalled = true;
  showToast("✅ Application installée ! Vous pouvez maintenant l'utiliser hors-ligne.", "success");
});

// ------------------------------
// RACCOURCIS CLAVIER
// ------------------------------
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'd') {
      e.preventDefault();
      if (sectionSelector) {
        sectionSelector.value = 'dictionnaire';
        sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.altKey && e.key === 'c') {
      e.preventDefault();
      if (sectionSelector) {
        sectionSelector.value = 'chat';
        sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.altKey && e.key === 'f') {
      e.preventDefault();
      if (sectionSelector) {
        sectionSelector.value = 'flashcards';
        sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.altKey && e.key === 'l') {
      e.preventDefault();
      if (sectionSelector) {
        sectionSelector.value = 'livres';
        sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.altKey && e.key === 't') {
      e.preventDefault();
      if (sectionSelector) {
        sectionSelector.value = 'themes';
        sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.altKey && e.key === 'g') {
      e.preventDefault();
      if (sectionSelector) {
        sectionSelector.value = 'grammaire';
        sectionSelector.dispatchEvent(new Event('change'));
      }
    }
    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      showHelpModal();
    }
  });
}

function showHelpModal() {
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
let visitCounter = parseInt(localStorage.getItem('tadaksahak_visit_count') || '0');

function incrementVisitCount() {
  visitCounter++;
  localStorage.setItem('tadaksahak_visit_count', visitCounter);
  console.log(`👁️ Visite ${visitCounter}`);
  if (visitCounter >= 3 && !localStorage.getItem('tadaksahak_installed') && !localStorage.getItem('tadaksahak_install_dismissed')) {
    showAutoInstallBanner();
  }
}

function showAutoInstallBanner() {
  const existingBanner = document.getElementById('autoInstallBanner');
  if (existingBanner) existingBanner.remove();
  const banner = document.createElement('div');
  banner.id = 'autoInstallBanner';
  banner.className = 'install-banner auto';
  banner.innerHTML = `
    <div class="install-banner-content">
      <img src="images/idaksahak_round.png" alt="Logo" width="40" height="40">
      <div class="install-banner-text">
        <strong>📱 Installer Tadaksahak Learning</strong>
        <small>Utilisez l'application hors-ligne après ${visitCounter} visites</small>
      </div>
      <button id="autoInstallBtn" class="btn-install">📲 Installer</button>
      <button id="dismissAutoBtn" class="btn-dismiss">✖</button>
    </div>
  `;
  document.body.appendChild(banner);
  document.getElementById('autoInstallBtn')?.addEventListener('click', () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          localStorage.setItem('tadaksahak_installed', 'true');
          showToast("✅ Merci d'avoir installé l'application !", "success");
        }
        installPromptEvent = null;
      });
    } else {
      showToast("📲 Pour installer : Menu > Installer l'application", "info");
    }
    banner.remove();
    localStorage.setItem('tadaksahak_install_dismissed', 'true');
  });
  document.getElementById('dismissAutoBtn')?.addEventListener('click', () => {
    banner.remove();
    localStorage.setItem('tadaksahak_install_dismissed', 'true');
  });
}

function checkForSWUpdate() {
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

function handleSWUpdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showToast("🔄 Nouvelle version disponible ! Rafraîchissez la page.", "info");
            setTimeout(() => {
              if (confirm("Une nouvelle version est disponible. Rafraîchir maintenant ?")) {
                window.location.reload();
              }
            }, 3000);
          }
        });
      });
    });
  }
}

function initAutoUpdates() {
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
function afficherRessources() {
  const container = document.getElementById("ressourcesContainer");
  if (!container) return;
  const podcastUrl = "https://www.themaghribpodcast.com/2018/01/la-linguistique-historique-au-sahara.html";
  let html = `
    <div class="ressources-intro">
      <p data-i18n="ressources_desc">Découvrez des podcasts, articles et références sur les langues et l'histoire du Sahara</p>
    </div>
    <div class="ressources-section">
      <h3 data-i18n="podcast_section">🎙️ Podcasts et conférences</h3>
      <div class="podcast-card">
        <div class="podcast-header">
          <div class="podcast-icon">🎙️</div>
          <div class="podcast-info">
            <h4 data-i18n="podcast_episode_title">La linguistique historique au Sahara</h4>
            <p class="podcast-speaker">Dr. Lameen Souag (CNRS, LACITO)</p>
            <p class="podcast-date" data-i18n="podcast_episode_date">22 janvier 2018</p>
          </div>
        </div>
        <p class="podcast-description" data-i18n="podcast_episode_desc">
          Dans cet épisode, Dr. Lameen Souag développe l'idée que l'histoire d'une langue ne dépend pas que d'une tradition écrite.
        </p>
        <div class="podcast-links">
          <a href="${podcastUrl}" target="_blank" rel="noopener noreferrer" class="btn-podcast">🎧 <span data-i18n="podcast_listen">Écouter le podcast</span></a>
          <button class="btn-share-resource" onclick="shareResource('${podcastUrl}', 'La linguistique historique au Sahara')">📤 <span data-i18n="share_resource">Partager</span></button>
        </div>
      </div>
    </div>
    <div class="ressources-section">
      <h3 data-i18n="articles_section">📖 Articles et publications</h3>
      <div class="articles-grid" id="articlesGrid"><div class="loading-spinner">📚 Chargement des articles...</div></div>
    </div>
    <div class="ressources-section">
      <h3 data-i18n="bibliography_section">📚 Bibliographie suggérée</h3>
      <div class="bibliography-list" id="bibliographyList"><div class="loading-spinner">📖 Chargement de la bibliographie...</div></div>
    </div>
  `;
  container.innerHTML = html;
  chargerArticlesAcademiques();
  chargerBibliographie();
}

function chargerArticlesAcademiques() {
  const container = document.getElementById("articlesGrid");
  if (!container) return;
  const articles = [
    { titre: "The Tadaksahak language: a Zénaga variety of the Malian Sahara", auteur: "Christiansen-Bolli, R.", annee: 2010, url: "#", description: "Étude descriptive du tadaksahak.", tags: ["Tadaksahak", "Grammaire"] },
    { titre: "Relative Clauses in Tadaksahak", auteur: "Christiansen, N. & Levinsohn, S.", annee: 2003, url: "#", description: "Analyse des trois stratégies de relativisation.", tags: ["Tadaksahak", "Syntaxe"] },
    { titre: "A Grammar of Tamashek (Tuareg of Mali)", auteur: "Heath, J.", annee: 2005, url: "#", description: "Grammaire de référence du touareg.", tags: ["Touareg", "Grammaire"] },
    { titre: "The Berber language", auteur: "Kossmann, M.", annee: 2011, url: "#", description: "Aperçu des langues berbères.", tags: ["Berbère", "Linguistique"] },
    { titre: "Non-Tuareg Berber and the Genesis of Nomadic Northern Songhay", auteur: "Souag, L.", annee: 2015, url: "#", description: "Contacts entre berbère et songhay.", tags: ["Songhay", "Contacts"] }
  ];
  let html = `<div class="articles-grid-inner">`;
  for (const article of articles) {
    html += `
      <div class="article-card">
        <div class="article-icon">📄</div>
        <div class="article-content">
          <h4>${escapeHtml(article.titre)}</h4>
          <p class="article-meta">${escapeHtml(article.auteur)} • ${article.annee}</p>
          <p class="article-desc">${escapeHtml(article.description)}</p>
          <div class="article-tags">${article.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
          <a href="${article.url}" class="article-link" target="_blank">🔗 Accéder à la publication</a>
        </div>
      </div>
    `;
  }
  html += `</div>`;
  container.innerHTML = html;
}

function chargerBibliographie() {
  const container = document.getElementById("bibliographyList");
  if (!container) return;
  const bibliography = [
    "Brugnatelli, Vermondo. 2011. \"Some grammatical features of Ancient Eastern Berber.\"",
    "Cohen, David et Catherine Taine-Cheikh. 2000. \"A propos du Zénaga.\"",
    "Kossmann, Maarten. 2001. \"The origin of the glottal stop in Zenaga.\"",
    "Kossmann, Maarten. 1999. Essai sur la phonologie du proto-berbère.",
    "Souag, Lameen. 2015. \"Non-Tuareg Berber and the Genesis of Nomadic Northern Songhay.\"",
    "Christiansen-Bolli, Regula. 2010. \"A Grammar of Tadaksahak.\"",
    "Christiansen, Niels et Stephen Levinsohn. 2003. \"Relative Clauses in Tadaksahak.\""
  ];
  let html = `<ul class="bibliography-list-ul">`;
  for (const ref of bibliography) { html += `<li>📖 ${escapeHtml(ref)}</li>`; }
  html += `</ul><p class="bibliography-note">📚 D'après l'épisode "La linguistique historique au Sahara" du podcast Maghrib in Past & Present</p>`;
  container.innerHTML = html;
}

window.shareResource = function(url, title) {
  if (navigator.share) {
    navigator.share({ title: title, text: `Découvrez cette ressource sur ${title}`, url: url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url);
    showToast("📋 Lien copié dans le presse-papier", "success");
  }
};

// ------------------------------
// POP-UP DE BIENVENUE
// ------------------------------
function showRessourcesWelcomePopup() {
  const hasSeenRessourcesPopup = localStorage.getItem('has_seen_ressources_popup');
  if (hasSeenRessourcesPopup === 'true') return;
  const popup = document.createElement('div');
  popup.id = 'ressourcesPopup';
  popup.className = 'modal ressources-popup';
  popup.innerHTML = `
    <div class="modal-content ressources-popup-content">
      <button class="popup-close" id="closeRessourcesPopup">&times;</button>
      <div class="popup-icon">📚</div>
      <h2>Nouvelle section</h2>
      <h3>Ressources academiques</h3>
      <div class="popup-author">Par <strong>Hamadine Ag Moctar</strong></div>
      <div class="popup-divider"></div>
      <div class="popup-text"><p>"La connaissance ne se construit pas seule. Elle se tisse au fil des echanges."</p></div>
      <div class="popup-features">
        <div class="popup-feature"><span class="feature-icon">🎙️</span><span class="feature-text">Podcast exclusif avec <strong>Dr. Lameen Souag (CNRS)</strong></span></div>
        <div class="popup-feature"><span class="feature-icon">📖</span><span class="feature-text">Articles scientifiques sur le tadaksahak</span></div>
        <div class="popup-feature"><span class="feature-icon">📚</span><span class="feature-text">Bibliographie specialisee</span></div>
      </div>
      <div class="popup-quote"><p>La langue et la culture Tadaksahak meritent d'etre etudiees, partagees et transmises.</p></div>
      <button id="goToRessourcesBtn" class="btn-popup-go">Decouvrir la section</button>
      <button id="dismissRessourcesPopup" class="btn-popup-later">Plus tard</button>
    </div>
  `;
  document.body.appendChild(popup);
  localStorage.setItem('has_seen_ressources_popup', 'true');
  const closeBtn = document.getElementById('closeRessourcesPopup');
  const dismissBtn = document.getElementById('dismissRessourcesPopup');
  const goBtn = document.getElementById('goToRessourcesBtn');
  const closePopup = () => {
    popup.classList.add('popup-closing');
    setTimeout(() => { if (popup && popup.parentNode) popup.remove(); }, 300);
  };
  closeBtn?.addEventListener('click', closePopup);
  dismissBtn?.addEventListener('click', closePopup);
  goBtn?.addEventListener('click', () => {
    closePopup();
    if (sectionSelector) {
      sectionSelector.value = 'ressources';
      sectionSelector.dispatchEvent(new Event('change'));
    }
  });
  popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
}

// ------------------------------
// NAVIGATION (avec gestion scroll/focus améliorée)
// ------------------------------
function initNavigation() {
  if (!sectionSelector) return;
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
    const sectionName = i18n[currentLanguage]['nav_' + id] || id;
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
    if (id === "contes" && contesData) afficherContes();
    if (id === "emissions" && emissionsData) afficherEmissionsPremium();
    if (id === "themes" && themesData) afficherThemesPremium();
    if (id === "flashcards" && vocabulaire.length) genererFlashcards();
    if (id === "ressources") afficherRessources();
  }
  
  sectionSelector.addEventListener("change", (e) => showSection(e.target.value));
  const savedSection = localStorage.getItem("tadaksahak_active_section");
  const defaultSection = (savedSection && document.getElementById(savedSection)) ? savedSection : "accueil";
  sectionSelector.value = defaultSection;
  showSection(defaultSection);
}

// ------------------------------
// INITIALISATION PRINCIPALE
// ------------------------------
async function initialiserApplication() {
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
          activeGrammarTab = target;
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
    btnPrev?.addEventListener("click", navigationPrecedent);
    btnNext?.addEventListener("click", navigationSuivant);
    document.getElementById("btnGoDico")?.addEventListener("click", () => { if (sectionSelector) { sectionSelector.value = "dictionnaire"; sectionSelector.dispatchEvent(new Event("change")); } });
    document.getElementById("toggleChatBot")?.addEventListener("click", () => { if (sectionSelector) { sectionSelector.value = "chat"; sectionSelector.dispatchEvent(new Event("change")); } });
    document.querySelectorAll('.lang-flag').forEach(btn => { btn.addEventListener('click', () => setLanguage(btn.dataset.lang)); });
    setLanguage(currentLanguage);
    
    // Debounce pour la recherche plein texte
    const searchBooksInput = document.getElementById("searchBooksInput");
    if (searchBooksInput) {
      searchBooksInput.addEventListener("input", () => {
        clearTimeout(searchBooksDebounce);
        searchBooksDebounce = setTimeout(() => rechercherPleinTexte(), 300);
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
