// ==============================
// APPLICATION TADAKSAHAK LEARNING
// VERSION MULTILINGUE + BOT AVEC BASE DE CONNAISSANCES + THÈMES
// ==============================

console.log("🚀 Démarrage de l'application multilingue...");

// ------------------------------
// TRADUCTIONS (i18n)
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
    nav_news: "📰 Actualités",
    nav_quiz: "❓ Quiz",
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
    all_themes: "📚 Tous les thèmes",
    theme_linguistics: "🔤 Linguistique",
    theme_history: "📖 Histoire",
    theme_culture: "🎭 Culture",
    theme_politics: "🏛️ Politique",
    reports_title: "📄 Rapports et Documents",
    reports_coming: "📑 Rapports culturels, linguistiques et communautaires bientôt disponibles.",
    news_title: "📰 Actualités",
    news_coming: "📰 Restez connectés ! Les actualités arrivent prochainement.",
    quiz_title: "❓ Quiz Culturel",
    quiz_coming: "🎯 Testez vos connaissances sur la culture Tadaksahak. Bientôt disponible !",
    bot_greeting: "👋 Salam aleikum ! Je suis Hamadine, gardien de la langue Tadaksahak et des savoirs Idaksahak. Que souhaitez-vous explorer aujourd'hui ?",
    bot_thanks: "🙏 De rien ! La sagesse se partage.",
    bot_dico: "📖 Rendez-vous dans la section Dictionnaire. Vous pouvez :\n• Taper un mot dans la barre de recherche\n• Parcourir l'index alphabétique\n• Écouter la prononciation (quand disponible)\n• Chercher en français ou en anglais\n\n💡 Essayez de taper un mot comme « Báy » ou « Yiddár » !",
    bot_books: "📚 La bibliothèque contient plusieurs ouvrages. Posez-moi une question précise sur leur contenu !",
    bot_audio: "🎵 La section Audio proposera bientôt des chants traditionnels Idaksahak, des poésies tamasheq et des enregistrements linguistiques.",
    bot_help: "🤖 Ce que je sais faire :\n\n📖 Dictionnaire → Chercher un mot, index alphabétique\n📚 Livres → Consulter les ouvrages, poser des questions\n🎵 Audio → Chants et musiques (bientôt)\n💬 Questions culturelles → Histoire, traditions, langue\n\n🔍 Exemples :\n• « Que disent les Idaksahak d'eux-mêmes ? »\n• « Quelles sont les causes des tourments touaregs ? »\n• « Que veut dire Báy en français ? »\n• « Livres »",
    bot_default: "🤔 Je n'ai pas bien compris votre demande.\n\n🔍 Essayez :\n• « dictionnaire » ou un mot comme « Báy »\n• « livres » pour voir les ouvrages\n• Une question précise sur un livre\n• « aide » pour voir toutes mes capacités"
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
    nav_news: "📰 الأخبار",
    nav_quiz: "❓ اختبار",
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
    all_themes: "📚 جميع المواضيع",
    theme_linguistics: "🔤 لغويات",
    theme_history: "📖 تاريخ",
    theme_culture: "🎭 ثقافة",
    theme_politics: "🏛️ سياسة",
    reports_title: "📄 تقارير ووثائق",
    reports_coming: "📑 تقارير ثقافية ولغوية ومجتمعية قريبًا.",
    news_title: "📰 أخبار",
    news_coming: "📰 تابعونا! الأخبار قادمة قريبًا.",
    quiz_title: "❓ اختبار ثقافي",
    quiz_coming: "🎯 اختبر معرفتك بثقافة التدكساهق. قريبًا!",
    bot_greeting: "👋 سلام عليكم! أنا حمدين، حارس لغة تدكساهق ومعارف إدكساهق. ماذا تريد استكشاف اليوم؟",
    bot_thanks: "🙏 عفواً! الحكمة تُشارك.",
    bot_dico: "📖 توجه إلى قسم القاموس. يمكنك:\n• كتابة كلمة في شريط البحث\n• تصفح الفهرس الأبجدي\n• الاستماع إلى النطق (عند توفره)\n• البحث بالفرنسية أو الإنجليزية\n\n💡 جرب كتابة كلمة مثل « Báy » أو « Yiddár »!",
    bot_books: "📚 تحتوي المكتبة على عدة كتب. اسألني سؤالاً محدداً عن محتواها!",
    bot_audio: "🎵 سيقدم قسم الصوتيات قريبًا أغاني تقليدية إدكساهق، وشعر تماشق، وتسجيلات لغوية.",
    bot_help: "🤖 ما يمكنني فعله:\n\n📖 القاموس → بحث عن كلمة، فهرس أبجدي\n📚 الكتب → الاطلاع على الكتب، طرح أسئلة\n🎵 الصوتيات → أغاني وموسيقى (قريبًا)\n💬 أسئلة ثقافية → تاريخ، تقاليد، لغة\n\n🔍 أمثلة:\n• « ماذا يقول الإدكساهق عن أنفسهم؟ »\n• « ما هي أسباب عذابات الطوارق؟ »\n• « ماذا تعني Báy بالفرنسية؟ »\n• « كتب »",
    bot_default: "🤔 لم أفهم طلبك جيدًا.\n\n🔍 جرب:\n• « قاموس » أو كلمة مثل « Báy »\n• « كتب » لعرض الكتب\n• سؤال محدد عن كتاب\n• « مساعدة » لرؤية كل قدراتي"
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
    nav_news: "📰 News",
    nav_quiz: "❓ Quiz",
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
    all_themes: "📚 All themes",
    theme_linguistics: "🔤 Linguistics",
    theme_history: "📖 History",
    theme_culture: "🎭 Culture",
    theme_politics: "🏛️ Politics",
    reports_title: "📄 Reports and Documents",
    reports_coming: "📑 Cultural, linguistic and community reports coming soon.",
    news_title: "📰 News",
    news_coming: "📰 Stay tuned! News coming soon.",
    quiz_title: "❓ Cultural Quiz",
    quiz_coming: "🎯 Test your knowledge of Tadaksahak culture. Coming soon!",
    bot_greeting: "👋 Salam aleikum! I am Hamadine, guardian of the Tadaksahak language and Idaksahak knowledge. What would you like to explore today?",
    bot_thanks: "🙏 You're welcome! Wisdom is meant to be shared.",
    bot_dico: "📖 Go to the Dictionary section. You can:\n• Type a word in the search bar\n• Browse the alphabetical index\n• Listen to pronunciation (when available)\n• Search in French or English\n\n💡 Try typing a word like 'Báy' or 'Yiddár'!",
    bot_books: "📚 The library contains several books. Ask me a specific question about their content!",
    bot_audio: "🎵 The Audio section will soon feature traditional Idaksahak songs, Tamasheq poetry, and linguistic recordings.",
    bot_help: "🤖 What I can do:\n\n📖 Dictionary → Search for a word, alphabetical index\n📚 Books → Browse books, ask questions\n🎵 Audio → Songs and music (soon)\n💬 Cultural questions → History, traditions, language\n\n🔍 Examples:\n• 'What do the Idaksahak say about themselves?'\n• 'What are the causes of Tuareg torments?'\n• 'What does Báy mean in English?'\n• 'Books'",
    bot_default: "🤔 I didn't quite understand your request.\n\n🔍 Try:\n• 'dictionary' or a word like 'Báy'\n• 'books' to see the books\n• A specific question about a book\n• 'help' to see all my capabilities"
  }
};

let currentLanguage = localStorage.getItem('app_language') || 'fr';
let vocabulaire = [];
let motActuel = null;
let historique = [];
let albumsAudio = [];
let motsListe = [];
let currentIndex = -1;
window.livresData = [];
window.histoireData = {};
let livresConnaissance = null; // sera chargé depuis data/livres_connaissance.json

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

// Galerie photos (version trilingue)
const imagesGalerie = [
  {
    fichier: "data/images/livres/chef_idoguiritane_1.jpg",
    titre_fr: "Chef Idoguiritane à Tin Abaw",
    titre_ar: "الشيخ إيدوغيريتان في تين أبا",
    titre_en: "Chief Idoguiritane in Tin Abaw",
    legende_fr: "Portrait du chef historique de la fraction Idoguiritane. Photo Charles Grémont, années 1990.",
    legende_ar: "صورة للشيخ التاريخي لفصيلة إيدوغيريتان. تصوير شارل غريمون، التسعينيات.",
    legende_en: "Portrait of the historical chief of the Idoguiritane fraction. Photo Charles Grémont, 1990s.",
    credit: "© Charles Grémont"
  },
  {
    fichier: "data/images/livres/chef_idoguiritane_2.jpg",
    titre_fr: "Réunion traditionnelle à Tin Abaw",
    titre_ar: "اجتماع تقليدي في تين أبا",
    titre_en: "Traditional meeting in Tin Abaw",
    legende_fr: "Le chef Idoguiritane entouré de notables lors d'une assemblée coutumière.",
    legende_ar: "الشيخ إيدوغيريتان وحوله الأعيان خلال مجلس عرفي.",
    legende_en: "Chief Idoguiritane surrounded by notables during a customary assembly.",
    credit: "© Charles Grémont"
  },
  {
    fichier: "data/images/livres/chef_idoguitirane_3.jpg",
    titre_fr: "Le chef et ses conseillers",
    titre_ar: "الشيخ ومستشاروه",
    titre_en: "The chief and his advisors",
    legende_fr: "Moment de discussion autour des affaires de la communauté.",
    legende_ar: "لحظة نقاش حول شؤون المجتمع.",
    legende_en: "Discussion moment about community affairs.",
    credit: "© Charles Grémont"
  },
  {
    fichier: "data/images/livres/Un jeune combattant Adaksahak, au nord de Ménaka, mars 1994. Photo C.G.jpeg",
    titre_fr: "Jeune combattant Idaksahak (1994)",
    titre_ar: "مقاتل شاب إدكساهق (١٩٩٤)",
    titre_en: "Young Idaksahak fighter (1994)",
    legende_fr: "Portrait d’un jeune homme armé lors de la rébellion des années 1990, nord de Ménaka.",
    legende_ar: "صورة لشاب مسلح أثناء تمرد التسعينيات، شمال مناكا.",
    legende_en: "Portrait of an armed young man during the 1990s rebellion, north of Ménaka.",
    credit: "© Charles Grémont"
  },
  {
    fichier: "data/images/livres/zone des idaksahak.jpeg",
    titre_fr: "Carte de la région des Idaksahak",
    titre_ar: "خريطة منطقة الإدكساهق",
    titre_en: "Map of the Idaksahak region",
    legende_fr: "Localisation des Idaksahak dans le nord-est du Mali (Ménaka, Gao).",
    legende_ar: "موقع الإدكساهق في شمال شرق مالي (منطقة مناكا وغاو).",
    legende_en: "Location of the Idaksahak in north-eastern Mali (Ménaka, Gao).",
    credit: "Source : Charles Grémont"
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

// ==============================
// UTILITAIRES
// ==============================
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

function showLoader() { document.getElementById("loadingOverlay").hidden = false; }
function hideLoader() { document.getElementById("loadingOverlay").hidden = true; }

// ==============================
// GESTION DU THÈME (DARK/LIGHT/SEPIA)
// ==============================
function setTheme(theme) {
  const body = document.body;
  body.classList.remove('dark', 'light', 'sepia');
  body.classList.add(theme);
  localStorage.setItem('app_theme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('app_theme') || 'dark';
  setTheme(savedTheme);
  document.getElementById('themeDark')?.addEventListener('click', () => setTheme('dark'));
  document.getElementById('themeLight')?.addEventListener('click', () => setTheme('light'));
  document.getElementById('themeSepia')?.addEventListener('click', () => setTheme('sepia'));
}

// ==============================
// GESTION DE LA LANGUE (GLOBALE)
// ==============================
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
  
  if (searchBar) searchBar.placeholder = (lang === 'fr' ? "Rechercher un mot…" : (lang === 'ar' ? "ابحث عن كلمة…" : "Search for a word…"));
  const chatInput = document.getElementById("chatInput");
  if (chatInput) chatInput.placeholder = (lang === 'fr' ? "Écrivez votre message..." : (lang === 'ar' ? "اكتب رسالتك..." : "Write your message..."));
  const rechercheLivres = document.getElementById("rechercheLivres");
  if (rechercheLivres) rechercheLivres.placeholder = (lang === 'fr' ? "Rechercher un livre..." : (lang === 'ar' ? "ابحث عن كتاب..." : "Search for a book..."));
  
  if (document.getElementById("livres") && !document.getElementById("livres").hidden) afficherLivres();
  if (document.getElementById("photos") && !document.getElementById("photos").hidden) afficherPhotos();
  if (motActuel) afficherMot(motActuel);
  updateChatSuggestions();
  
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

// ==============================
// BOT AVEC BASE DE CONNAISSANCES (LIVRES)
// ==============================
function contientInsulte(texte) { return false; } // à implémenter si besoin
function reponsePolieInsulte() { return i18n[currentLanguage].bot_greeting; }
function contientArabe(texte) { return /[\u0600-\u06FF]/.test(texte); }

function extraireMotsCles(question) {
  const stopWords = ['le','la','les','un','une','de','du','des','et','ou','mais','donc','car','pour','dans','avec','sans','par','sur','sous','que','qui','quoi','dont','où','comment','pourquoi','est','sont','être','avoir','faire'];
  const mots = question.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[?;:!,.']/g, '')
    .split(/\s+/);
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
      if (score > 0) {
        resultats.push({
          livre: livre.titre,
          auteur: livre.auteur,
          chapitre: chunk.chapitre,
          titre: chunk.titre,
          texte: chunk.texte,
          score: score
        });
      }
    }
  }
  if (resultats.length === 0) return null;
  resultats.sort((a,b) => b.score - a.score);
  return resultats[0];
}

function reponseBot(txt) {
  const clean = txt.toLowerCase().trim();
  if (clean.includes("bonjour") || clean.includes("salut") || clean.includes("hello") || clean.includes("salam"))
    return i18n[currentLanguage].bot_greeting;
  if (clean.includes("merci") || clean.includes("thanks") || clean.includes("شكرا"))
    return i18n[currentLanguage].bot_thanks;
  if (clean.includes("dictionnaire") || clean.includes("dico") || clean.includes("mot") || clean.includes("قاموس"))
    return i18n[currentLanguage].bot_dico;
  if (clean.includes("audio") || clean.includes("musique"))
    return i18n[currentLanguage].bot_audio;
  if (clean.includes("aide") || clean.includes("help") || clean.includes("مساعدة"))
    return i18n[currentLanguage].bot_help;
  
  // Recherche dans les livres
  const resultatLivre = chercherDansLivres(txt);
  if (resultatLivre) {
    return `📖 D'après « ${resultatLivre.livre} » (${resultatLivre.auteur}), chapitre ${resultatLivre.chapitre} — « ${resultatLivre.titre} » :\n\n“${resultatLivre.texte}”\n\n💡 Posez-moi d'autres questions sur ce livre !`;
  }
  
  if (clean.includes("livre") || clean.includes("bibliothèque") || clean.includes("كتاب"))
    return i18n[currentLanguage].bot_books;
  
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

// ==============================
// DICTIONNAIRE
// ==============================
async function chargerDictionnaire() {
  showLoader();
  try {
    const response = await fetch('data/mots.json');
    if (!response.ok) throw new Error();
    vocabulaire = await response.json();
  } catch(e) {
    vocabulaire = [{ mot: "Báy", cat: "vt.", fr: "Pouvoir (faire)", en: "Able, to be" }];
  }
  motsListe = vocabulaire.map((item, idx) => ({ ...item, index: idx }));
  if (vocabulaire.length) {
    document.getElementById("statMots").textContent = vocabulaire.length;
    document.getElementById("statsContainer").hidden = false;
    construireIndexAlphabet();
    if (vocabulaire[0]) afficherMot(vocabulaire[0]);
  }
  hideLoader();
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
    if (currentLanguage === "fr" && item.fr) def = item.fr;
    else if (currentLanguage === "en" && item.en) def = item.en;
    else if (item.fr) def = item.fr;
    else def = "Définition non disponible";
    defElem.innerHTML = `<p><strong>📂 Catégorie :</strong> ${item.cat || "Général"}</p><p><strong>${currentLanguage.toUpperCase()} :</strong> ${escapeHtml(def)}</p>`;
  }
  if (audioElem && item.audio) {
    audioElem.src = `audio/${item.audio}`;
    audioElem.hidden = false;
    audioElem.load();
  } else audioElem.hidden = true;
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
    if (score === Infinity && item.mot) {
      const dist = levenshtein(motNorm, query);
      if (dist <= Math.max(2, Math.floor(query.length*0.4))) score = 4+dist;
    }
    if (score < Infinity) resultats.push({ item, score });
  }
  return resultats.sort((a,b)=>a.score-b.score).slice(0,12).map(r=>r.item);
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
        li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong> — ${escapeHtml(item.fr || item.en || "")}`;
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
  if (historique.length > 10) historique.pop();
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

// ==============================
// LIVRES (multilingue via filtrage par langue)
// ==============================
async function afficherLivres() {
  const cont = document.getElementById("livresContainer");
  if (!cont) return;
  cont.innerHTML = `<div class="loading-books">📚 Chargement...</div>`;
  try {
    const response = await fetch('data/livres.json');
    if (!response.ok) throw new Error();
    const allLivres = await response.json();
    let langueCible = "";
    if (currentLanguage === "fr") langueCible = "Français";
    else if (currentLanguage === "ar") langueCible = "Arabe";
    else langueCible = "English";
    const livres = allLivres.filter(l => l.langue === langueCible);
    if (!livres.length) {
      cont.innerHTML = `<p class="info-message">📚 Aucun livre dans cette langue.</p>`;
      return;
    }
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
    cont.innerHTML = `<p class="error-message">❌ Erreur chargement livres.</p>`;
  }
}

// ==============================
// PHOTOS (multilingue)
// ==============================
function afficherPhotos() {
  const container = document.getElementById("photosContainer");
  if (!container) return;
  let html = `<div class="album-header"><h3>📷 Album : Photos historiques</h3><p>Clichés de Charles Grémont et archives communautaires.</p></div><div class="galerie-grid">`;
  imagesGalerie.forEach(img => {
    let titre = "", legende = "";
    if (currentLanguage === "fr") { titre = img.titre_fr; legende = img.legende_fr; }
    else if (currentLanguage === "ar") { titre = img.titre_ar; legende = img.legende_ar; }
    else { titre = img.titre_en; legende = img.legende_en; }
    html += `
      <div class="galerie-item">
        <img src="${escapeHtml(img.fichier)}" alt="${escapeHtml(titre)}" loading="lazy">
        <div class="galerie-caption">
          <strong>${escapeHtml(titre)}</strong>
          <p class="legende">${escapeHtml(legende)}</p>
          <small class="credit">${escapeHtml(img.credit)}</small>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

// ==============================
// AUTRES SECTIONS
// ==============================
function genererAlbumsAudio() {
  const conteneur = document.getElementById("audioContainer");
  if (conteneur) conteneur.innerHTML = "<p class='info-message'>🎵 Pistes audio à venir prochainement...</p>";
}
function genererVideos() { /* à implémenter */ }

// ==============================
// CHARGEMENT DE LA BASE DE CONNAISSANCES
// ==============================
async function chargerLivresConnaissance() {
  try {
    const response = await fetch('data/livres_connaissance.json');
    if (response.ok) {
      livresConnaissance = await response.json();
      console.log('📚 Base de connaissances chargée');
    } else {
      console.warn('⚠️ Fichier livres_connaissance.json non trouvé');
    }
  } catch(e) {
    console.warn('⚠️ Impossible de charger la base de connaissances', e);
  }
}

// ==============================
// NAVIGATION ENTRE SECTIONS
// ==============================
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
  }
  sectionSelector.addEventListener("change", (e) => showSection(e.target.value));
  const savedSection = localStorage.getItem("tadaksahak_active_section");
  const defaultSection = (savedSection && document.getElementById(savedSection)) ? savedSection : "accueil";
  sectionSelector.value = defaultSection;
  showSection(defaultSection);
}

// ==============================
// INITIALISATION PRINCIPALE
// ==============================
async function initialiserApplication() {
  initTheme();
  initNavigation();
  await chargerDictionnaire();
  await chargerLivresConnaissance();
  chargerHistorique();
  genererAlbumsAudio();
  
  document.getElementById("btnEnvoyer")?.addEventListener("click", traiterSaisie);
  document.getElementById("chatInput")?.addEventListener("keypress", e => e.key === "Enter" && traiterSaisie());
  btnPrev?.addEventListener("click", navigationPrecedent);
  btnNext?.addEventListener("click", navigationSuivant);
  document.getElementById("btnGoDico")?.addEventListener("click", () => {
    if (sectionSelector) { sectionSelector.value = "dictionnaire"; sectionSelector.dispatchEvent(new Event("change")); }
  });
  document.getElementById("toggleChatBot")?.addEventListener("click", () => {
    if (sectionSelector) { sectionSelector.value = "chat"; sectionSelector.dispatchEvent(new Event("change")); }
  });
  
  document.querySelectorAll('.lang-flag').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
  setLanguage(currentLanguage);
  
  console.log("✅ Application prête !");
}

initialiserApplication();
