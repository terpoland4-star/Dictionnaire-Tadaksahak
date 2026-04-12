// ==============================
// APPLICATION TADAKSAHAK LEARNING
// VERSION FINALE (loader forcé)
// ==============================

console.log("🚀 Démarrage de l'application complète...");

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
    nav_chat: "💬 Chat Bot",
    nav_audio: "🎧 Audio",
    nav_photos: "🖼️ Photos",
    nav_videos: "🎥 Vidéos",
    nav_books: "📚 Livres",
    nav_reports: "📄 Rapports",
    nav_actualites: "📰 Actualités",
    nav_quiz: "❓ Quiz",
    nav_timeline: "📅 Ligne du temps",
    nav_map: "🗺️ Carte",
    nav_search: "🔍 Recherche livres",
    nav_dashboard: "📊 Tableau de bord",
    welcome_title: "Bienvenue",
    welcome_subtitle: "Une plateforme dédiée à la langue et à la culture Tadaksahak.",
    go_dico: "📖 Accéder au dictionnaire",
    bio_text1: "Interprète, développeur et gardien de la mémoire culturelle.",
    bio_text2: "Une mission : connecter nos mondes.",
    stat_words: "mots",
    stat_audios: "audios",
    stat_books: "livres",
    dictionary_title: "📖 Dictionnaire Tadaksahak",
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
    bot_help: "🤖 Ce que je sais faire :\n📖 Dictionnaire\n📚 Livres\n🎵 Audio\n💬 Questions culturelles",
    bot_default: "🤔 Je n'ai pas bien compris. Essayez « aide »."
  },
  ar: {
    loading: "جاري تحميل التطبيق...",
    subtitle: "اللغة والثقافة والذاكرة الحية لشعب إدكساهق",
    choose_section: "اختر القسم",
    nav_home: "🏠 الرئيسية",
    nav_dictionary: "📖 القاموس",
    nav_chat: "💬 الدردشة",
    nav_audio: "🎧 الصوتيات",
    nav_photos: "🖼️ الصور",
    nav_videos: "🎥 الفيديوهات",
    nav_books: "📚 الكتب",
    nav_reports: "📄 التقارير",
    nav_actualites: "📰 الأخبار",
    nav_quiz: "❓ اختبار",
    nav_timeline: "📅 الخط الزمني",
    nav_map: "🗺️ الخريطة",
    nav_search: "🔍 بحث في الكتب",
    nav_dashboard: "📊 لوحة التحكم",
    welcome_title: "مرحبًا",
    welcome_subtitle: "منصة مخصصة للغة والثقافة التدكساهقية.",
    go_dico: "📖 الذهاب إلى القاموس",
    bio_text1: "مترجم، مطور، وحارس الذاكرة الثقافية.",
    bio_text2: "مهمة: ربط عوالمنا.",
    stat_words: "كلمة",
    stat_audios: "صوتيات",
    stat_books: "كتب",
    dictionary_title: "📖 قاموس تدكساهق",
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
    bot_help: "🤖 ما يمكنني فعله:\n📖 القاموس\n📚 الكتب\n🎵 الصوتيات\n💬 أسئلة ثقافية",
    bot_default: "🤔 لم أفهم. جرب « مساعدة »."
  },
  en: {
    loading: "Loading application...",
    subtitle: "Language, culture and living memory of the Idaksahak people",
    choose_section: "Choose a section",
    nav_home: "🏠 Home",
    nav_dictionary: "📖 Dictionary",
    nav_chat: "💬 Chat Bot",
    nav_audio: "🎧 Audio",
    nav_photos: "🖼️ Photos",
    nav_videos: "🎥 Videos",
    nav_books: "📚 Books",
    nav_reports: "📄 Reports",
    nav_actualites: "📰 News",
    nav_quiz: "❓ Quiz",
    nav_timeline: "📅 Timeline",
    nav_map: "🗺️ Map",
    nav_search: "🔍 Search books",
    nav_dashboard: "📊 Dashboard",
    welcome_title: "Welcome",
    welcome_subtitle: "A platform dedicated to the Tadaksahak language and culture.",
    go_dico: "📖 Go to dictionary",
    bio_text1: "Interpreter, developer, and guardian of cultural memory.",
    bio_text2: "A mission: connect our worlds.",
    stat_words: "words",
    stat_audios: "audios",
    stat_books: "books",
    dictionary_title: "📖 Tadaksahak Dictionary",
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
    bot_help: "🤖 What I can do:\n📖 Dictionary\n📚 Books\n🎵 Audio\n💬 Cultural questions",
    bot_default: "🤔 I didn't understand. Try 'help'."
  }
};

// ------------------------------
// VARIABLES GLOBALES
// ------------------------------
let currentLanguage = localStorage.getItem('app_language') || 'fr';
let vocabulaire = [];
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

// ------------------------------
// GALERIE PHOTOS (trilingue)
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
    setTimeout(() => {
      if (loader && loader.parentNode) loader.remove();
    }, 200);
  } else {
    console.warn("Loader introuvable, mais on continue");
  }
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

// ------------------------------
// THÈMES CLAIR/SOMBRE/SEPIA
// ------------------------------
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
// BOT (avec recherche dans livres)
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

function reponseBot(txt) {
  const clean = txt.toLowerCase().trim();
  if (clean.includes("bonjour") || clean.includes("salut") || clean.includes("hello") || clean.includes("salam")) return i18n[currentLanguage].bot_greeting;
  if (clean.includes("merci") || clean.includes("thanks") || clean.includes("شكرا")) return i18n[currentLanguage].bot_thanks;
  if (clean.includes("dictionnaire") || clean.includes("dico") || clean.includes("mot") || clean.includes("قاموس")) return i18n[currentLanguage].bot_dico;
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
// DICTIONNAIRE - Version enrichie
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
      { mot: "Káamil", cat: "quantifier", fr: "Tout", ar: "كل", en: "All" }
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
    
    // Traduction des catégories grammaticales
    const categoriesFr = {
      "vt.": "Verbe transitif",
      "vi.": "Verbe intransitif",
      "n.": "Nom",
      "npl.": "Nom (pluriel uniquement)",
      "adj.": "Adjectif",
      "adv.": "Adverbe",
      "conj.": "Conjonction",
      "postp.": "Postposition",
      "prep.": "Préposition",
      "pron.": "Pronom",
      "dem.": "Démonstratif",
      "num.": "Numéral",
      "quantifier": "Quantifieur",
      "phrase": "Expression",
      "idiom": "Idiome"
    };
    
    const categoriesEn = {
      "vt.": "Transitive verb",
      "vi.": "Intransitive verb",
      "n.": "Noun",
      "npl.": "Noun (plural only)",
      "adj.": "Adjective",
      "adv.": "Adverb",
      "conj.": "Conjunction",
      "postp.": "Postposition",
      "prep.": "Preposition",
      "pron.": "Pronoun",
      "dem.": "Demonstrative",
      "num.": "Numeral",
      "quantifier": "Quantifier",
      "phrase": "Phrase",
      "idiom": "Idiom"
    };
    
    const categoriesAr = {
      "vt.": "فعل متعد",
      "vi.": "فعل لازم",
      "n.": "اسم",
      "npl.": "اسم (جمع فقط)",
      "adj.": "صفة",
      "adv.": "ظرف",
      "conj.": "حرف عطف",
      "postp.": "حرف جر لاحق",
      "prep.": "حرف جر",
      "pron.": "ضمير",
      "dem.": "اسم إشارة",
      "num.": "عدد",
      "quantifier": "محدد كمي",
      "phrase": "عبارة",
      "idiom": "تعبير اصطلاحي"
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
        ${item.en && currentLanguage !== 'en' ? `<p><strong>🇬🇧 English :</strong> ${escapeHtml(item.en)}</p>` : ''}
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
        ${item.fr ? `<p><strong>🇫🇷 Français :</strong> ${escapeHtml(item.fr)}</p>` : ''}
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
        ${item.en ? `<p><strong>🇬🇧 English :</strong> ${escapeHtml(item.en)}</p>` : ''}
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
  for (const item of vocabulaire) {
    let score = Infinity;
    const motNorm = normalizeText(item.mot);
    if (motNorm.includes(query)) score = motNorm.startsWith(query) ? 0 : 1;
    if (score > 1 && item.fr && normalizeText(item.fr).includes(query)) score = 2;
    if (score > 2 && item.en && normalizeText(item.en).includes(query)) score = 3;
    if (score > 3 && item.ar && normalizeText(item.ar).includes(query)) score = 4;
    if (score === Infinity && item.mot) {
      const dist = levenshtein(motNorm, query);
      if (dist <= Math.max(2, Math.floor(query.length*0.4))) score = 5 + dist;
    }
    if (score < Infinity) resultats.push({ item, score });
  }
  return resultats.sort((a,b)=>a.score-b.score).slice(0,15).map(r=>r.item);
}

if (searchBar) {
  searchBar.addEventListener("input", (e) => {
    const raw = e.target.value.trim();
    if (clearSearchBtn) clearSearchBtn.hidden = !raw;
    if (!suggestionsList) return;
    suggestionsList.innerHTML = "";
    suggestionsList.classList.remove("show");
    if (!raw) return;
    const resultats = chercher(raw);
    if (!resultats.length) {
      const li = document.createElement("li");
      li.textContent = "🔍 Aucun résultat";
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

// ------------------------------
// PARTAGE SOCIAL
// ------------------------------
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
  if (typeof L === 'undefined') {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => { creerCarte(); };
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
// LIVRES (multilingue) - Exclut les rapports
// ------------------------------
async function afficherLivres() {
  const cont = document.getElementById("livresContainer");
  if (!cont) return;
  cont.innerHTML = `<div class="loading-books">📚 Chargement...</div>`;
  try {
    const response = await fetch('data/livres.json');
    if (!response.ok) throw new Error();
    const allLivres = await response.json();
    let langueCible = currentLanguage === "fr" ? "Français" : (currentLanguage === "ar" ? "Arabe" : "English");
    // Exclure les rapports (type === "rapport")
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
// RAPPORTS (depuis livres.json, type: "rapport")
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

// ------------------------------
// AUTRES SECTIONS
// ------------------------------
function genererAlbumsAudio() {
  const conteneur = document.getElementById("audioContainer");
  if (conteneur) conteneur.innerHTML = "<p class='info-message'>🎵 Pistes audio à venir prochainement...</p>";
}
function genererVideos() { /* à implémenter */ }

// ------------------------------
// CHARGEMENT BASE DE CONNAISSANCES
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
// SERVICE WORKER (PWA)
// ------------------------------
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const swUrl = '/Dictionnaire-Tadaksahak/sw.js';
    fetch(swUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          navigator.serviceWorker.register(swUrl)
            .then(reg => console.log('SW enregistré', reg))
            .catch(err => console.warn('SW échec', err));
        } else {
          console.log('SW non trouvé (404), enregistrement ignoré');
        }
      })
      .catch(() => console.log('Impossible de vérifier sw.js'));
  }
}

// ------------------------------
// NAVIGATION ENTRE SECTIONS
// ------------------------------
function initNavigation() {
  if (!sectionSelector) return;
  const sections = document.querySelectorAll("main > section");
  function showSection(id) {
    sections.forEach(sec => { sec.hidden = sec.id !== id; });
    localStorage.setItem("tadaksahak_active_section", id);
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
    initNavigation();
    
    await chargerDictionnaire();
    await chargerLivresConnaissance();
    await chargerTimeline();
    
    chargerHistorique();
    chargerFavoris();
    genererAlbumsAudio();
    registerServiceWorker();
    requestNotificationPermission();
    showWordNotification();
    afficherMotDuJour();
    setInterval(() => afficherMotDuJour(), 3600000);
    
    document.getElementById("btnEnvoyer")?.addEventListener("click", traiterSaisie);
    document.getElementById("chatInput")?.addEventListener("keypress", e => e.key === "Enter" && traiterSaisie());
    btnPrev?.addEventListener("click", navigationPrecedent);
    btnNext?.addEventListener("click", navigationSuivant);
    document.getElementById("btnGoDico")?.addEventListener("click", () => { if (sectionSelector) { sectionSelector.value = "dictionnaire"; sectionSelector.dispatchEvent(new Event("change")); } });
    document.getElementById("toggleChatBot")?.addEventListener("click", () => { if (sectionSelector) { sectionSelector.value = "chat"; sectionSelector.dispatchEvent(new Event("change")); } });
    
    document.querySelectorAll('.lang-flag').forEach(btn => { btn.addEventListener('click', () => setLanguage(btn.dataset.lang)); });
    setLanguage(currentLanguage);
    
    const searchBooksInput = document.getElementById("searchBooksInput");
    if (searchBooksInput) searchBooksInput.addEventListener("input", () => rechercherPleinTexte());
    
    console.log("✅ Application prête !");
  } catch (error) {
    console.error("Erreur critique lors de l'initialisation :", error);
    showToast("Erreur de chargement, vérifiez la console", "error");
  } finally {
    hideLoader();
    setTimeout(hideLoader, 500);
    setTimeout(hideLoader, 2000);
  }
}

initialiserApplication();
