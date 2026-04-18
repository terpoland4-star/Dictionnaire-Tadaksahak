// ============================================
// CORE - TRADUCTIONS (i18n)
// Version trilingue FR/AR/EN - COMPLÈTE
// Couvre tous les modules de l'application
// ============================================

const i18n = {
  fr: {
    // ========== GÉNÉRAL ==========
    loading: "Chargement de l'application...",
    subtitle: "Langue, culture et mémoire vivante du peuple Idaksahak",
    choose_section: "Choisir une section",
    
    // ========== NAVIGATION ==========
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
    nav_services: "💼 Services",
    nav_premium: "⭐ Premium",
    
    // ========== ACCUEIL ==========
    welcome_title: "Bienvenue",
    welcome_subtitle: "Une plateforme dédiée à la langue et à la culture Tadaksahak.",
    go_dico: "📖 Accéder au dictionnaire",
    bio_text1: "Interprète, développeur et gardien de la mémoire culturelle.",
    bio_text2: "Une mission : connecter nos mondes.",
    stat_words: "mots",
    stat_audios: "audios",
    stat_books: "livres",
    
    // ========== DICTIONNAIRE ==========
    dictionary_title: "📖 Dictionnaire Tadaksahak",
    search_placeholder: "Rechercher un mot…",
    alphabet_index: "Index alphabétique",
    prev: "⬅️ Précédent",
    next: "Suivant ➡️",
    share: "Partager",
    add_favorite: "Ajouter aux favoris",
    remove_favorite: "Retirer des favoris",
    word_of_day: "🌟 Mot du jour",
    
    // ========== GRAMMAIRE ==========
    grammar_title: "📚 Grammaire Tadaksahak",
    grammar_desc: "Verbes causatifs et passifs d'après Christiansen-Bolli (2010)",
    grammar_relatives_title: "📖 Propositions relatives",
    grammar_relatives_desc: "D'après Christiansen & Levinsohn (2003) — Relative Clauses in Tadaksahak",
    
    // ========== CONTES ==========
    contes_title: "📖 Contes et légendes",
    
    // ========== ÉMISSIONS ==========
    emissions_title: "🎙️ Émissions radio",
    
    // ========== FLASHCARDS ==========
    flashcards_title: "🃏 Flashcards - Apprentissage",
    flashcards_stats: "📊 Statistiques",
    flashcards_mastered: "Maîtrisés",
    flashcards_weak: "À réviser",
    flashcards_progress: "Progression",
    flashcards_correct: "Correctes",
    flashcards_incorrect: "Incorrectes",
    flashcards_time: "Temps",
    flashcards_restart: "Recommencer",
    flashcards_review_weak: "Réviser les mots faibles",
    
    // ========== THÈMES ==========
    themes_title: "📚 Vocabulaire thématique",
    theme_vocab: "📖 Vocabulaire",
    theme_verbs: "🔤 Verbes",
    theme_nouns: "🏷️ Noms",
    theme_adjectives: "🎨 Adjectifs",
    theme_favorites: "⭐ Mes favoris",
    theme_to_review: "🔄 À réviser",
    
    // ========== CHAT ==========
    chat_title: "💬 Chat Bot Hamadine",
    chat_welcome_msg: "Bonjour ! Je suis votre guide. Que souhaitez-vous apprendre ?",
    send: "Envoyer 📤",
    sugg_word: "📖 Mot Tadaksahak",
    sugg_history: "📚 Histoire",
    sugg_culture: "🎵 Culture",
    
    // ========== MÉDIAS ==========
    audio_title: "🎧 Albums Audio",
    photos_title: "🖼️ Galerie Photos",
    videos_title: "🎥 Vidéos",
    sort_by: "Trier par :",
    sort_new: "📅 Plus récentes",
    sort_old: "📅 Plus anciennes",
    
    // ========== LIVRES ==========
    books_title: "📚 Bibliothèque",
    reports_title: "📄 Rapports et Documents",
    reports_coming: "📑 Rapports culturels, linguistiques et communautaires bientôt disponibles.",
    
    // ========== FILTRES ==========
    all_themes: "📚 Tous les thèmes",
    theme_linguistics: "🔤 Linguistique",
    theme_history: "📖 Histoire",
    theme_culture: "🎭 Culture",
    theme_politics: "🏛️ Politique",
    
    // ========== ACTUALITÉS ==========
    news_title: "📰 Actualités",
    news_coming: "📰 Restez connectés !",
    
    // ========== QUIZ ==========
    quiz_title: "❓ Quiz Culturel",
    quiz_start: "Commencer le quiz",
    quiz_next: "Question suivante",
    quiz_score: "Votre score",
    quiz_restart: "Recommencer",
    
    // ========== TIMELINE & MAP ==========
    timeline_title: "📅 Ligne du temps historique",
    map_title: "🗺️ Carte des zones Idaksahak",
    
    // ========== RECHERCHE ==========
    search_books_title: "🔍 Recherche dans les livres",
    search_results: "Résultats",
    
    // ========== TABLEAU DE BORD ==========
    dashboard_title: "📊 Tableau de bord",
    dashboard_history: "Historique des mots",
    dashboard_favorites: "Favoris",
    dashboard_quiz_progress: "Progression des quiz",
    
    // ========== BOT ==========
    bot_greeting: "👋 Salam aleikum ! Je suis Hamadine, gardien de la langue Tadaksahak.",
    bot_thanks: "🙏 De rien ! La sagesse se partage.",
    bot_dico: "📖 Rendez-vous dans la section Dictionnaire.",
    bot_books: "📚 La bibliothèque contient plusieurs ouvrages.",
    bot_audio: "🎵 Section Audio à venir.",
    bot_grammar: "📚 Consultez la section Grammaire pour les verbes causatifs et passifs.",
    bot_grammar_relatives: "📖 Pour les propositions relatives, consultez l'onglet 'Propositions relatives'.",
    bot_help: "🤖 Ce que je sais faire :\n📖 Dictionnaire\n📚 Livres\n📚 Grammaire\n📖 Contes\n🎙️ Émissions\n🎵 Audio\n💬 Questions culturelles",
    bot_default: "🤔 Je n'ai pas bien compris. Essayez « aide ».",
    
    // ========== RESSOURCES ACADÉMIQUES ==========
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
    see_more: "Voir plus →",
    
    // ========== SERVICES ==========
    services_title: "💼 Services linguistiques",
    service_translation: "Traduction certifiée",
    service_cours: "Cours particuliers",
    service_consultation: "Consultation culturelle",
    service_relecture: "Relecture linguistique",
    service_translation_desc: "Français ↔ Tadaksahak",
    service_cours_desc: "Apprenez avec un locuteur natif",
    service_consultation_desc: "Expertise sur la culture Idaksahak",
    service_relecture_desc: "Correction de textes en tadaksahak",
    price_per_word: "0,15€/mot",
    price_per_hour: "25€/heure",
    price_per_session: "50€/session",
    ask_quote: "Demander un devis",
    book: "Réserver",
    schedule: "Programmer",
    
    // ========== PREMIUM ==========
    premium_title: "🌟 Contenu premium",
    premium_monthly: "Mensuel",
    premium_yearly: "Annuel",
    premium_lifetime: "À vie",
    premium_monthly_price: "4,99€/mois",
    premium_yearly_price: "49,99€/an",
    premium_lifetime_price: "99,99€",
    premium_feature_pdfs: "Accès à tous les livres PDF",
    premium_feature_audio: "Audio complets (200+ fichiers)",
    premium_feature_exercises: "Exercices interactifs illimités",
    premium_feature_no_ads: "Pas de publicité",
    premium_feature_priority: "Accès prioritaire aux nouveautés",
    premium_feature_certificate: "Certificat de soutien",
    upgrade: "Débloquer",
    savings: "Économisez",
    
    // ========== ERREURS ==========
    error_loading: "Erreur de chargement",
    error_network: "Problème de connexion",
    error_not_found: "Élément non trouvé",
    retry: "Réessayer",
    back: "Retour",
    
    // ========== SUCCÈS ==========
    success_saved: "Sauvegardé avec succès",
    success_copied: "Copié dans le presse-papier",
    success_favorite_added: "Ajouté aux favoris",
    success_favorite_removed: "Retiré des favoris"
  },
  
  ar: {
    // ========== GÉNÉRAL ==========
    loading: "جاري تحميل التطبيق...",
    subtitle: "اللغة والثقافة والذاكرة الحية لشعب إدكساهق",
    choose_section: "اختر القسم",
    
    // ========== NAVIGATION ==========
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
    nav_services: "💼 الخدمات",
    nav_premium: "⭐ بريميوم",
    
    // ========== ACCUEIL ==========
    welcome_title: "مرحبًا",
    welcome_subtitle: "منصة مخصصة للغة والثقافة التدكساهقية.",
    go_dico: "📖 الذهاب إلى القاموس",
    bio_text1: "مترجم، مطور، وحارس الذاكرة الثقافية.",
    bio_text2: "مهمة: ربط عوالمنا.",
    stat_words: "كلمة",
    stat_audios: "صوتيات",
    stat_books: "كتب",
    
    // ========== DICTIONNAIRE ==========
    dictionary_title: "📖 قاموس تدكساهق",
    search_placeholder: "ابحث عن كلمة...",
    alphabet_index: "الفهرس الأبجدي",
    prev: "⬅️ السابق",
    next: "التالي ➡️",
    share: "مشاركة",
    add_favorite: "أضف إلى المفضلة",
    remove_favorite: "إزالة من المفضلة",
    word_of_day: "🌟 كلمة اليوم",
    
    // ========== GRAMMAIRE ==========
    grammar_title: "📚 قواعد تدكساهق",
    grammar_desc: "الأفعال السببية والمجهولة حسب كريستيانسن-بولي (٢٠١٠)",
    grammar_relatives_title: "📖 جمل الوصل",
    grammar_relatives_desc: "حسب كريستيانسن وليفينسون (٢٠٠٣)",
    
    // ========== CONTES ==========
    contes_title: "📖 حكايات وأساطير",
    
    // ========== ÉMISSIONS ==========
    emissions_title: "🎙️ برامج إذاعية",
    
    // ========== FLASHCARDS ==========
    flashcards_title: "🃏 بطاقات التعلم",
    flashcards_stats: "📊 الإحصائيات",
    flashcards_mastered: "مُتقن",
    flashcards_weak: "بحاجة للمراجعة",
    flashcards_progress: "التقدم",
    flashcards_correct: "صحيحة",
    flashcards_incorrect: "غير صحيحة",
    flashcards_time: "الوقت",
    flashcards_restart: "إعادة البداية",
    flashcards_review_weak: "مراجعة الكلمات الضعيفة",
    
    // ========== THÈMES ==========
    themes_title: "📚 مفردات موضوعية",
    theme_vocab: "📖 مفردات",
    theme_verbs: "🔤 أفعال",
    theme_nouns: "🏷️ أسماء",
    theme_adjectives: "🎨 صفات",
    theme_favorites: "⭐ المفضلة",
    theme_to_review: "🔄 للمراجعة",
    
    // ========== CHAT ==========
    chat_title: "💬 محادثة مع حمدين",
    chat_welcome_msg: "مرحبًا! أنا مرشدك. ماذا تريد أن تتعلم؟",
    send: "إرسال 📤",
    sugg_word: "📖 كلمة تدكساهق",
    sugg_history: "📚 تاريخ",
    sugg_culture: "🎵 ثقافة",
    
    // ========== MÉDIAS ==========
    audio_title: "🎧 ألبومات صوتية",
    photos_title: "🖼️ معرض الصور",
    videos_title: "🎥 فيديوهات",
    sort_by: "ترتيب حسب:",
    sort_new: "📅 الأحدث",
    sort_old: "📅 الأقدم",
    
    // ========== LIVRES ==========
    books_title: "📚 المكتبة",
    reports_title: "📄 التقارير والوثائق",
    reports_coming: "📑 تقارير ثقافية ولغوية ومجتمعية قريبًا.",
    
    // ========== FILTRES ==========
    all_themes: "📚 جميع المواضيع",
    theme_linguistics: "🔤 لغويات",
    theme_history: "📖 تاريخ",
    theme_culture: "🎭 ثقافة",
    theme_politics: "🏛️ سياسة",
    
    // ========== ACTUALITÉS ==========
    news_title: "📰 أخبار",
    news_coming: "📰 تابعونا! الأخبار قادمة قريبًا.",
    
    // ========== QUIZ ==========
    quiz_title: "❓ اختبار ثقافي",
    quiz_start: "ابدأ الاختبار",
    quiz_next: "السؤال التالي",
    quiz_score: "نتيجتك",
    quiz_restart: "إعادة المحاولة",
    
    // ========== TIMELINE & MAP ==========
    timeline_title: "📅 الخط الزمني التاريخي",
    map_title: "🗺️ خريطة مناطق إدكساهق",
    
    // ========== RECHERCHE ==========
    search_books_title: "🔍 بحث في الكتب",
    search_results: "النتائج",
    
    // ========== TABLEAU DE BORD ==========
    dashboard_title: "📊 لوحة التحكم",
    dashboard_history: "الكلمات المبحوثة",
    dashboard_favorites: "المفضلة",
    dashboard_quiz_progress: "تقدم الاختبارات",
    
    // ========== BOT ==========
    bot_greeting: "👋 سلام عليكم! أنا حمدين، حارس لغة تدكساهق.",
    bot_thanks: "🙏 عفواً!",
    bot_dico: "📖 توجه إلى قسم القاموس.",
    bot_books: "📚 تحتوي المكتبة على عدة كتب.",
    bot_audio: "🎵 قسم الصوتيات قريبًا.",
    bot_grammar: "📚 راجع قسم القواعد للأفعال السببية والمجهولة.",
    bot_grammar_relatives: "📖 راجع قسم جمل الوصل في القواعد.",
    bot_help: "🤖 ما يمكنني فعله:\n📖 القاموس\n📚 الكتب\n📚 القواعد\n📖 الحكايات\n🎙️ البرامج\n🎵 الصوتيات\n💬 أسئلة ثقافية",
    bot_default: "🤔 لم أفهم. جرب « مساعدة ».",
    
    // ========== RESSOURCES ACADÉMIQUES ==========
    ressources_title: "📚 الموارد الأكاديمية",
    ressources_desc: "اكتشف البودكاست والمقالات والمراجع حول لغات وتاريخ الصحراء",
    podcast_section: "🎙️ البودكاست والمحاضرات",
    podcast_episode_title: "اللغويات التاريخية في الصحراء",
    podcast_episode_desc: "في هذه الحلقة، الدكتور لمين سواغ يشرح كيف أن تاريخ اللغة لا يعتمد فقط على التقليد المكتوب.",
    podcast_episode_date: "22 يناير 2018",
    podcast_listen: "🎧 استمع إلى البودكاست",
    articles_section: "📖 المقالات والمنشورات",
    bibliography_section: "📚 المراجع المقترحة",
    share_resource: "مشاركة",
    see_more: "عرض المزيد ←",
    
    // ========== SERVICES ==========
    services_title: "💼 الخدمات اللغوية",
    service_translation: "ترجمة معتمدة",
    service_cours: "دروس خصوصية",
    service_consultation: "استشارة ثقافية",
    service_relecture: "مراجعة لغوية",
    price_per_word: "0.15 يورو/كلمة",
    price_per_hour: "25 يورو/ساعة",
    price_per_session: "50 يورو/جلسة",
    
    // ========== PREMIUM ==========
    premium_title: "🌟 محتوى بريميوم",
    premium_monthly: "شهري",
    premium_yearly: "سنوي",
    premium_lifetime: "مدى الحياة",
    upgrade: "ترقية",
    
    // ========== ERREURS ==========
    error_loading: "خطأ في التحميل",
    error_network: "مشكلة في الاتصال",
    retry: "إعادة المحاولة",
    back: "رجوع"
  },
  
  en: {
    // ========== GENERAL ==========
    loading: "Loading application...",
    subtitle: "Language, culture and living memory of the Idaksahak people",
    choose_section: "Choose a section",
    
    // ========== NAVIGATION ==========
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
    nav_services: "💼 Services",
    nav_premium: "⭐ Premium",
    
    // ========== HOME ==========
    welcome_title: "Welcome",
    welcome_subtitle: "A platform dedicated to the Tadaksahak language and culture.",
    go_dico: "📖 Go to dictionary",
    bio_text1: "Interpreter, developer, and guardian of cultural memory.",
    bio_text2: "A mission: connect our worlds.",
    stat_words: "words",
    stat_audios: "audios",
    stat_books: "books",
    
    // ========== DICTIONARY ==========
    dictionary_title: "📖 Tadaksahak Dictionary",
    search_placeholder: "Search a word…",
    alphabet_index: "Alphabetical index",
    prev: "⬅️ Previous",
    next: "Next ➡️",
    share: "Share",
    add_favorite: "Add to favorites",
    remove_favorite: "Remove from favorites",
    word_of_day: "🌟 Word of the day",
    
    // ========== GRAMMAR ==========
    grammar_title: "📚 Tadaksahak Grammar",
    grammar_desc: "Causative and passive verbs from Christiansen-Bolli (2010)",
    grammar_relatives_title: "📖 Relative clauses",
    grammar_relatives_desc: "From Christiansen & Levinsohn (2003)",
    
    // ========== TALES ==========
    contes_title: "📖 Tales and legends",
    
    // ========== BROADCASTS ==========
    emissions_title: "🎙️ Radio broadcasts",
    
    // ========== FLASHCARDS ==========
    flashcards_title: "🃏 Flashcards - Learning",
    flashcards_stats: "📊 Statistics",
    flashcards_mastered: "Mastered",
    flashcards_weak: "To review",
    flashcards_progress: "Progress",
    flashcards_correct: "Correct",
    flashcards_incorrect: "Incorrect",
    flashcards_time: "Time",
    flashcards_restart: "Restart",
    flashcards_review_weak: "Review weak words",
    
    // ========== THEMES ==========
    themes_title: "📚 Thematic vocabulary",
    theme_vocab: "📖 Vocabulary",
    theme_verbs: "🔤 Verbs",
    theme_nouns: "🏷️ Nouns",
    theme_adjectives: "🎨 Adjectives",
    theme_favorites: "⭐ My favorites",
    theme_to_review: "🔄 To review",
    
    // ========== CHAT ==========
    chat_title: "💬 Hamadine Chat Bot",
    chat_welcome_msg: "Hello! I am your guide. What would you like to learn?",
    send: "Send 📤",
    sugg_word: "📖 Tadaksahak word",
    sugg_history: "📚 History",
    sugg_culture: "🎵 Culture",
    
    // ========== MEDIA ==========
    audio_title: "🎧 Audio Albums",
    photos_title: "🖼️ Photo Gallery",
    videos_title: "🎥 Videos",
    sort_by: "Sort by:",
    sort_new: "📅 Newest",
    sort_old: "📅 Oldest",
    
    // ========== BOOKS ==========
    books_title: "📚 Library",
    reports_title: "📄 Reports and Documents",
    reports_coming: "📑 Cultural, linguistic and community reports coming soon.",
    
    // ========== FILTERS ==========
    all_themes: "📚 All themes",
    theme_linguistics: "🔤 Linguistics",
    theme_history: "📖 History",
    theme_culture: "🎭 Culture",
    theme_politics: "🏛️ Politics",
    
    // ========== NEWS ==========
    news_title: "📰 News",
    news_coming: "📰 Stay tuned! News coming soon.",
    
    // ========== QUIZ ==========
    quiz_title: "❓ Cultural Quiz",
    quiz_start: "Start quiz",
    quiz_next: "Next question",
    quiz_score: "Your score",
    quiz_restart: "Restart",
    
    // ========== TIMELINE & MAP ==========
    timeline_title: "📅 Historical Timeline",
    map_title: "🗺️ Map of Idaksahak areas",
    
    // ========== SEARCH ==========
    search_books_title: "🔍 Search in books",
    search_results: "Results",
    
    // ========== DASHBOARD ==========
    dashboard_title: "📊 Dashboard",
    dashboard_history: "Word history",
    dashboard_favorites: "Favorites",
    dashboard_quiz_progress: "Quiz progress",
    
    // ========== BOT ==========
    bot_greeting: "👋 Salam aleikum! I am Hamadine, guardian of Tadaksahak.",
    bot_thanks: "🙏 You're welcome!",
    bot_dico: "📖 Go to the Dictionary section.",
    bot_books: "📚 The library contains several books.",
    bot_audio: "🎵 Audio section coming soon.",
    bot_grammar: "📚 Check the Grammar section for causative and passive verbs.",
    bot_grammar_relatives: "📖 Check the Relative Clauses tab in the Grammar section.",
    bot_help: "🤖 What I can do:\n📖 Dictionary\n📚 Books\n📚 Grammar\n📖 Tales\n🎙️ Broadcasts\n🎵 Audio\n💬 Cultural questions",
    bot_default: "🤔 I didn't understand. Try 'help'.",
    
    // ========== ACADEMIC RESOURCES ==========
    ressources_title: "📚 Academic Resources",
    ressources_desc: "Discover podcasts, articles and references on Saharan languages and history",
    podcast_section: "🎙️ Podcasts and lectures",
    podcast_episode_title: "Historical Linguistics in the Sahara",
    podcast_episode_desc: "In this episode, Dr. Lameen Souag (CNRS, LACITO) explains that language history depends not only on written tradition.",
    podcast_episode_date: "January 22, 2018",
    podcast_listen: "🎧 Listen to the podcast",
    articles_section: "📖 Articles and publications",
    bibliography_section: "📚 Suggested bibliography",
    share_resource: "Share",
    see_more: "See more →",
    
    // ========== SERVICES ==========
    services_title: "💼 Linguistic Services",
    service_translation: "Certified translation",
    service_cours: "Private lessons",
    service_consultation: "Cultural consultation",
    service_relecture: "Proofreading",
    price_per_word: "€0.15/word",
    price_per_hour: "€25/hour",
    price_per_session: "€50/session",
    
    // ========== PREMIUM ==========
    premium_title: "🌟 Premium content",
    premium_monthly: "Monthly",
    premium_yearly: "Yearly",
    premium_lifetime: "Lifetime",
    upgrade: "Upgrade",
    
    // ========== ERRORS ==========
    error_loading: "Loading error",
    error_network: "Connection issue",
    retry: "Retry",
    back: "Back"
  }
};

// Variable globale pour la langue courante
let currentLanguage = localStorage.getItem('app_language') || 'fr';

// Fonction pour obtenir une traduction
function t(key) {
  return i18n[currentLanguage]?.[key] || key;
}

// Fonction pour changer la langue
function setLanguage(lang) {
  if (i18n[lang]) {
    currentLanguage = lang;
    localStorage.setItem('app_language', lang);
    
    // Mettre à jour l'attribut lang du document
    document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'fr'));
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Mettre à jour tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      if (translation !== key) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else {
          el.textContent = translation;
        }
      }
    });
    
    // Déclencher un événement personnalisé pour notifier les modules
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    
    return true;
  }
  return false;
}

// Fonction pour obtenir la direction de la langue (ltr/rtl)
function getLanguageDirection() {
  return currentLanguage === 'ar' ? 'rtl' : 'ltr';
}

// Exporter pour les autres modules
window.i18n = i18n;
window.t = t;
window.setLanguage = setLanguage;
window.getLanguageDirection = getLanguageDirection;
window.currentLanguage = currentLanguage;

console.log("🌍 Module i18n chargé - Langue courante:", currentLanguage);
