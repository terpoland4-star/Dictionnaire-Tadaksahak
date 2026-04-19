// ============================================
// MODULE - CHAT BOT HAMADINE
// Version ultime - Intelligence artificielle conversationnelle
// Multilingue, contextuelle, prédictive, adaptative
// CORRIGÉ - Syntaxe valide
// ============================================

// ------------------------------
// CONFIGURATION CENTRALE
// ------------------------------
const CHAT_CONFIG = {
  typingDelay: 150,
  maxHistory: 200,
  showTypingIndicator: true,
  enableContextMemory: true,
  contextMemorySize: 15,
  enableLearning: true,
  enablePronunciation: true,
  maxSearchResults: 10,
  enableEmojis: true,
  enableAutoCorrect: true,
  enableSuggestions: true,
  enableSentimentAnalysis: true,
  debugMode: false,
  modelVersion: "3.0",
  lastUpdate: "2024-01-15"
};

// ------------------------------
// ÉTAT DU CHAT AVANCÉ
// ------------------------------
let chatHistory = [];
let currentContext = [];
let userPreferences = {
  preferredLanguage: 'fr',
  learningLevel: 'beginner',
  favoriteTopics: [],
  lastInteraction: null,
  totalInteractions: 0,
  knownWords: [],
  weakWords: [],
  quizScore: 0,
  sessionStart: Date.now()
};
let conversationState = {
  lastQuestion: null,
  lastAnswer: null,
  waitingForAnswer: false,
  pendingAction: null,
  currentTopic: null,
  sentiment: null,
  confusionLevel: 0,
  suggestedNextQuestions: []
};
let learningData = {
  userQuestions: [],
  misunderstoodWords: [],
  frequentTopics: {},
  responseTime: [],
  corrections: []
};

// ------------------------------
// DÉTECTION DE LANGUE AVANCÉE
// ------------------------------
const LANGUAGE_DETECTION = {
  french: {
    patterns: ['bonjour', 'salut', 'comment', 'pourquoi', 'est-ce que', 'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'le', 'la', 'les', 'un', 'une', 'des', 'merci', 'au revoir', 's\'il vous plaît', 's\'il te plaît', 'quel', 'quelle', 'quels', 'quelles', 'combien', 'où', 'quand', 'comment', 'pourquoi', 'car', 'donc', 'or', 'ni', 'mais', 'ce', 'cet', 'cette', 'ces', 'mon', 'ton', 'son', 'notre', 'votre', 'leur', 'me', 'te', 'se', 'nous', 'vous', 'leur', 'y', 'en'],
    stopWords: ['le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'ou', 'mais', 'donc', 'car', 'ni', 'or'],
    confidence: 0
  },
  arabic: {
    patterns: ['مرحبا', 'سلام', 'كيف', 'لماذا', 'هل', 'أنا', 'أنت', 'هو', 'هي', 'نحن', 'أنتم', 'هم', 'ال', 'و', 'في', 'من', 'إلى', 'عن', 'على', 'شكرا', 'مع السلامة', 'من فضلك', 'ماذا', 'أين', 'متى', 'كم', 'بماذا', 'لمن', 'لماذا', 'كيفما', 'هذا', 'هذه', 'ذلك', 'تلك', 'هؤلاء', 'أولئك', 'كان', 'يكون', 'صار', 'أصبح', 'ليس', 'ما', 'لا', 'إن', 'أن', 'لن', 'قد', 'سوف'],
    stopWords: ['ال', 'و', 'في', 'من', 'إلى', 'عن', 'على', 'هذا', 'هذه', 'ذلك', 'تلك', 'كان', 'يكون'],
    confidence: 0
  },
  english: {
    patterns: ['hello', 'hi', 'how', 'why', 'what', 'where', 'when', 'who', 'which', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'thank', 'thanks', 'goodbye', 'please', 'how much', 'how many', 'could', 'would', 'should', 'might', 'may', 'can', 'will', 'shall', 'must', 'have', 'has', 'had', 'do', 'does', 'did', 'for', 'and', 'nor', 'but', 'or', 'yet', 'so'],
    stopWords: ['the', 'a', 'an', 'and', 'or', 'but', 'so', 'for', 'nor', 'yet', 'of', 'to', 'in', 'for', 'on', 'with', 'by', 'at', 'from', 'up', 'down', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'than', 'that', 'then', 'thence', 'there', 'these', 'they', 'this', 'those', 'through', 'until', 'unto', 'when', 'where', 'whereas', 'wherever', 'while'],
    confidence: 0
  },
  tadaksahak: {
    patterns: ['báy', 'yiddár', 'káamil', 'rgán', 'yáw', 'hánfi', 'baarí', 'farká', 'bibi', 'kooray', 'ciday', 'a-rgán', 'a-lágod', 'hinciní', 'ay', 'a-ffó', 'hinká', 'kaaráḍ', 'akkóz', 'ʃammúʃ', 'ʃaadíʃ', 'iffá', 'ittám', 'taasá', 'maará', 'táafinda', 'temerwin', 't-á-méedi', 'a-jím', 'i-jimm-an', 'sénda', 'óoda', 'áyda', 'adi', 'o', 'na', 'ci', 'man', 'maaná', 'ícet', 'émmék', 'nǝ-', 'sǝ-', 'kǝlá', 'fów', 'har', 'wala', 'ʃeddí', 'ceddí', 'a-ʃʃí', 'wǝrtilla', 'wiji', 'm-adyar', 'n-aktab', 'n-mm-anya'],
    confidence: 0
  }
};

// ------------------------------
// CORRECTION AUTOMATIQUE
// ------------------------------
const AUTO_CORRECT = {
  corrections: {
    'diconnaire': 'dictionnaire',
    'dico': 'dictionnaire',
    'gramaire': 'grammaire',
    'gramer': 'grammaire',
    'conte': 'conte',
    'histoir': 'histoire',
    'tradution': 'traduction',
    'tradcution': 'traduction',
    'signification': 'définition',
    'define': 'définition',
    'meaning': 'définition',
    'causatif': 'grammaire',
    'passif': 'grammaire',
    'relative': 'grammaire',
    'relatif': 'grammaire',
    'pronom': 'grammaire',
    'adjectif': 'grammaire',
    'verbe': 'grammaire',
    'nom': 'grammaire'
  },
  apply: function(text) {
    let corrected = text.toLowerCase();
    for (const [wrong, right] of Object.entries(this.corrections)) {
      if (corrected.includes(wrong)) {
        corrected = corrected.replace(new RegExp(wrong, 'g'), right);
      }
    }
    return corrected;
  }
};

// ------------------------------
// ANALYSE DE SENTIMENT
// ------------------------------
function analyzeSentiment(text) {
  const positiveWords = ['merci', 'bravo', 'excellent', 'super', 'génial', 'parfait', 'bon', 'bien', 'cool', 'sympa', 'merci', 'thanks', 'شكرا', 'great', 'awesome', 'perfect', 'good', 'nice', 'love', 'like'];
  const negativeWords = ['dommage', 'problème', 'erreur', 'mauvais', 'mal', 'pas bien', 'bug', 'casse', 'pb', 'issue', 'wrong', 'bad', 'error', 'problem', 'hate', 'dislike', 'مشكلة', 'خطأ', 'سيء'];
  const confusedWords = ['pas compris', 'je comprends pas', 'what', 'quoi', 'hein', 'pardon', 'répète', 'again', 'ماذا', 'عفوا', 'أعد'];
  
  let score = 0;
  let sentiment = 'neutral';
  
  for (const word of positiveWords) {
    if (text.toLowerCase().includes(word)) {
      score += 1;
    }
  }
  for (const word of negativeWords) {
    if (text.toLowerCase().includes(word)) {
      score -= 1;
    }
  }
  for (const word of confusedWords) {
    if (text.toLowerCase().includes(word)) {
      sentiment = 'confused';
      break;
    }
  }
  
  if (score > 0) sentiment = 'positive';
  if (score < 0) sentiment = 'negative';
  
  return { sentiment: sentiment, score: score };
}

// ------------------------------
// EXTRACTION D'INTENTION AVANCÉE
// ------------------------------
const INTENTS = {
  TRANSLATION: {
    patterns: [
      'comment dit-on', 'comment dire', 'traduire', 'translate', 'que signifie', 'what does', 'meaning of', 'traduction', 'équivalent', 'tadaksahak de', 'français de', 'anglais de', 'arabe de', 'كيف نقول', 'ماذا يعني', 'معنى', 'كيف تقال', 'dit-on', 'se dit'
    ],
    priority: 10,
    extractTarget: function(text) {
      const patterns = [
        /comment dit-on\s+([^?en]+)(?:\s+en\s+(\w+))?/i,
        /comment dire\s+([^?]+)(?:\s+en\s+(\w+))?/i,
        /traduire\s+([^\s]+)\s+en\s+(\w+)/i,
        /que signifie\s+([^?]+)/i,
        /what does\s+([^?]+)\s+mean/i,
        /meaning of\s+([^?]+)/i,
        /([^\s]+)\s+en\s+(\w+)/i,
        /كيف نقول\s+([^?]+)/i,
        /ماذا يعني\s+([^?]+)/i,
        /معنى\s+([^?]+)/i
      ];
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
          return {
            word: match[1]?.trim(),
            targetLang: match[2]?.toLowerCase() || 'tadaksahak'
          };
        }
      }
      return null;
    },
    response: handleTranslationIntent
  },
  DEFINITION: {
    patterns: [
      'que veut dire', 'c\'est quoi', 'définition de', 'signification de', 'qu\'est-ce que', 'what is', 'define', 'definition of', 'what means', 'définir', 'explique ce qu\'est', 'ما معنى', 'تعريف', 'ماذا يعني'
    ],
    priority: 9,
    extractWord: function(text) {
      const patterns = [
        /(?:que veut dire|c\'est quoi|définition de|signification de|qu\'est-ce que)\s+([^?]+)/i,
        /(?:what is|define|definition of|what means)\s+([^?]+)/i,
        /définir\s+([^?]+)/i,
        /explique ce qu\'est\s+([^?]+)/i,
        /ما معنى\s+([^?]+)/i,
        /تعريف\s+([^?]+)/i,
        /ماذا يعني\s+([^?]+)/i
      ];
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return match[1]?.trim();
      }
      return null;
    },
    response: handleDefinitionIntent
  },
  GRAMMAR: {
    patterns: [
      'grammaire', 'conjugaison', 'causatif', 'passif', 'relative', 'pronom', 'adjectif', 'grammar', 'conjugation', 'causative', 'passive', 'relative clause', 'pronoun', 'adjective', 'négation', 'negation', 'réciproque', 'reciprocal', 'temps', 'aspect', 'mode', 'particule', 'postposition', 'préposition', 'قواعد', 'صرف', 'سببية', 'مجهول', 'موصولة', 'ضمير', 'صفة', 'نفي', 'متبادل'
    ],
    priority: 8,
    extractTopic: function(text) {
      const topics = {
        causative: ['causatif', 'causative', 'سببية', 'faire faire'],
        passive: ['passif', 'passive', 'مجهول', 'être fait'],
        relative: ['relative', 'proposition', 'موصولة', 'ayo', 'ayondo', 'sa', 'gap', 'qui', 'que', 'dont', 'où', 'lequel'],
        pronoun: ['pronom', 'pronoun', 'ضمير', 'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils'],
        adjective: ['adjectif', 'adjective', 'صفة', 'grand', 'petit', 'beau'],
        verb: ['verbe', 'verb', 'فعل', 'action', 'état'],
        noun: ['nom', 'noun', 'اسم', 'chose', 'personne', 'lieu'],
        negation: ['négation', 'negation', 'نفي', 'ne...pas', 'ne...jamais', 'personne', 'rien'],
        reciprocal: ['réciproque', 'reciprocal', 'متبادل', 'mutuel', 'entre eux', 'l\'un l\'autre'],
        tense: ['temps', 'tense', 'زمن', 'passé', 'présent', 'futur', 'perfectif', 'imperfectif'],
        interrogative: ['interrogatif', 'interrogative', 'استفهام', 'question', 'qui', 'que', 'quoi', 'où', 'quand', 'comment', 'pourquoi', 'combien']
      };
      
      for (const [topic, keywords] of Object.entries(topics)) {
        for (const keyword of keywords) {
          if (text.toLowerCase().includes(keyword)) {
            return topic;
          }
        }
      }
      return null;
    },
    response: handleGrammarIntent
  },
  TALE: {
    patterns: [
      'raconte', 'conte', 'histoire', 'légende', 'récit', 'tell a story', 'tale', 'legend', 'parle moi de', 'dis moi une histoire', 'une histoire', 'raconte moi', 'احكي', 'قصة', 'حكاية', 'أسطورة', 'حدثني'
    ],
    priority: 7,
    extractTale: function(text) {
      const taleKeywords = {
        'chacal': ['chacal', 'jackal', 'ابن آوى', 'renard', 'fox'],
        'phacochère': ['phacochère', 'warthog', 'خنزير بري', 'sanglier'],
        'lion': ['lion', 'أسد', 'lion'],
        'lièvre': ['lièvre', 'hare', 'أرنب بري', 'rabbit'],
        'hyène': ['hyène', 'hyena', 'ضبع', 'hyena'],
        'serpent': ['serpent', 'snake', 'ثعبان', 'snake'],
        'éléphant': ['éléphant', 'elephant', 'فيل', 'elephant'],
        'tortue': ['tortue', 'turtle', 'سلحفاة', 'tortoise']
      };
      
      for (const [animal, keywords] of Object.entries(taleKeywords)) {
        for (const keyword of keywords) {
          if (text.toLowerCase().includes(keyword)) {
            return animal;
          }
        }
      }
      return null;
    },
    response: handleTaleIntent
  },
  CULTURE: {
    patterns: [
      'culture', 'tradition', 'coutume', 'pratique', 'cérémonie', 'mariage', 'naissance', 'décès', 'fête', 'musique', 'danse', 'art', 'artisanat', 'cuisine', 'habillement', 'bijou', 'tente', 'hugu', 'rituel', 'celebrate', 'festival', 'ثقافة', 'تقليد', 'عادة', 'احتفال', 'زواج', 'ولادة', 'وفاة', 'موسيقى', 'رقص', 'فن', 'حرف', 'مطبخ', 'ملابس', 'مجوهرات', 'خيمة'
    ],
    priority: 6,
    response: handleCultureIntent
  },
  MENAKA: {
    patterns: [
      'ménaka', 'menaka', 'idaksahak', 'dawsahaq', 'iwellemmedan', 'mali', 'niger', 'gao', 'tombouctou', 'kidal', 'ansongo', 'talatayt', 'gourma', 'azawagh', 'sahel', 'désert', 'nomade', 'éleveur', 'transhumance', 'touareg', 'imajeghen', 'imghad', 'peul', 'fulani', 'wodaabe', 'djelgobé', 'farfaru', 'toleebé', 'région', 'منكا', 'مالي', 'النيجر', 'طوارق', 'فولاني'
    ],
    priority: 5,
    response: handleMenakaIntent
  },
  ACADEMIC: {
    patterns: [
      'podcast', 'souag', 'lacito', 'cnrs', 'cairn', 'gremont', 'hérodote', 'christiansen', 'levinsohn', 'kossmann', 'heath', 'académique', 'article', 'publication', 'recherche', 'étude', 'scientifique', 'référence', 'bibliographie', 'بحث', 'دراسة', 'علمي', 'مرجع', 'ببليوغرافيا'
    ],
    priority: 4,
    response: handleAcademicIntent
  },
  STATS: {
    patterns: [
      'statistique', 'combien', 'nombre', 'chiffre', 'donnée', 'indicateur', 'compteur', 'mots', 'utilisateurs', 'visites', 'données', 'mesure', 'évaluation', 'combien de', 'how many', 'count', 'إحصاء', 'كم', 'عدد', 'بيانات'
    ],
    priority: 3,
    response: handleStatsIntent
  },
  QUIZ: {
    patterns: [
      'quiz', 'question', 'test', 'exercice', 'interroge', 'question me', 'ask me', 'interrogation', 'examen', 'évaluation', 'challenge', 'défi', 'اختبار', 'سؤال', 'امتحان', 'تقييم', 'تحدي'
    ],
    priority: 5,
    response: handleQuizIntent
  },
  PRONUNCIATION: {
    patterns: [
      'prononce', 'pronunciation', 'comment se prononce', 'how to pronounce', 'say', 'dis moi comment dire', 'prononciation', 'accent', 'son', 'phonétique', 'نطق', 'لفظ', 'كيف تنطق'
    ],
    priority: 6,
    response: handlePronunciationIntent
  },
  GREETING: {
    patterns: [
      'bonjour', 'salut', 'hello', 'hi', 'coucou', 'hey', 'salam', 'مرحبا', 'سلام', 'السلام عليكم', 'صباح الخير', 'مساء الخير', 'good morning', 'good afternoon', 'good evening', 'yo', 'wesh'
    ],
    priority: 1,
    response: handleGreetingIntent
  },
  THANKS: {
    patterns: [
      'merci', 'thanks', 'thank you', 'شكرا', 'شكراً', 'mercii', 'mci', 'thx', 'thank', 'gracias', 'danke', 'merci beaucoup', 'merci infiniment'
    ],
    priority: 1,
    response: handleThanksIntent
  },
  GOODBYE: {
    patterns: [
      'au revoir', 'bye', 'adieu', 'à plus', 'à bientôt', 'goodbye', 'see you', 'see you later', 'ciao', 'à la prochaine', 'je pars', 'je quitte', 'مع السلامة', 'وداعا', 'إلى اللقاء'
    ],
    priority: 1,
    response: handleGoodbyeIntent
  },
  HELP: {
    patterns: [
      'aide', 'help', 'assistance', 'tutoriel', 'guide', 'manuel', 'instructions', 'comment faire', 'comment utiliser', 'que faire', 'besoin d aide', 'support', 'كيف', 'مساعدة', 'تعليمات', 'دليل'
    ],
    priority: 2,
    response: handleHelpIntent
  },
  MENU: {
    patterns: [
      'menu', 'sections', 'fonctionnalités', 'navigation', 'features', 'liste', 'que propose', 'capabilities', 'قائمة', 'أقسام', 'وظائف', 'ميزات'
    ],
    priority: 2,
    response: handleMenuIntent
  },
  FEEDBACK: {
    patterns: [
      'feedback', 'avis', 'suggestion', 'amélioration', 'bug', 'problème', 'erreur', 'suggestion', 'idée', 'proposition', 'ملاحظات', 'اقتراح', 'تحسين', 'خطأ'
    ],
    priority: 3,
    response: handleFeedbackIntent
  },
  COMPLIMENT: {
    patterns: [
      'tu es génial', 'tu es super', 'bravo', 'excellent travail', 'good job', 'great work', 'awesome', 'amazing', 'fantastic', 'أنت رائع', 'عمل ممتاز'
    ],
    priority: 1,
    response: handleComplimentIntent
  }
};

// ------------------------------
// FONCTIONS DE RÉPONSE (simplifiées pour éviter les erreurs)
// ------------------------------

function handleTranslationIntent(text, extracted) {
  const target = extracted || INTENTS.TRANSLATION.extractTarget(text);
  
  if (target && target.word) {
    return `📖 **Traduction de "${target.word}"**\n\nLe dictionnaire contient 529 mots. Tapez ce mot dans la barre de recherche pour voir sa traduction complète.`;
  }
  return "📖 Pour traduire un mot, demandez-moi : 'Comment dit-on [mot] en tadaksahak ?'";
}

function handleDefinitionIntent(text) {
  const word = INTENTS.DEFINITION.extractWord(text);
  if (word) {
    return `📖 **Définition de "${word}"**\n\nConsultez le dictionnaire pour la définition complète de ce mot.`;
  }
  return "📖 Pour obtenir la définition d'un mot, demandez-moi : 'Que signifie [mot] ?'";
}

function handleGrammarIntent(text) {
  return `📚 **Grammaire tadaksahak**

Le tadaksahak utilise 3 stratégies de relativisation :
1️⃣ "ayo/ayondo" → noms DÉFINIS, restrictif
2️⃣ Gap strategy (∅) → noms INDÉFINIS, restrictif
3️⃣ "sa" → non-restrictif

📖 Consultez la section Grammaire de l'application pour plus de détails.`;
}

function handleTaleIntent(text) {
  return `📖 **Le chacal et le phacochère**

Il était une fois un chacal rusé qui convoitait la graisse d'un phacochère... 

📚 Rendez-vous dans la section Contes pour lire l'histoire complète.`;
}

function handleCultureIntent(text) {
  return `🎭 **Culture Idaksahak**

La culture Idaksahak est riche de traditions orales, de contes, de chants et de poésies.

📖 Découvrez-en plus dans les sections Contes et Émissions.`;
}

function handleMenakaIntent(text) {
  return `📍 **Ménaka**

Ménaka est une ville du nord-est du Mali, chef-lieu de la 9e région administrative. C'est le cœur du pays Idaksahak.

🗺️ Consultez la carte interactive dans l'application.`;
}

function handleAcademicIntent(text) {
  return `🎙️ **Ressources académiques**

🎙️ Podcast : La linguistique historique au Sahara - Dr. Lameen Souag (CNRS-LACITO)
📖 Article : Dans le piège des offres de violence - Charles Grémont (2019)

📚 Consultez la section Ressources académiques pour y accéder.`;
}

function handleStatsIntent(text) {
  const motCount = window.vocabulaire ? window.vocabulaire.length : 529;
  return `📊 **Statistiques**

📖 Dictionnaire : ${motCount} mots
👥 Visites : ${localStorage.getItem('tadaksahak_visit_count') || 0}
⭐ Favoris : ${window.favoris?.length || 0}`;
}

function handleQuizIntent(text) {
  return `❓ **Quiz culturel**

Rendez-vous dans la section Quiz pour tester vos connaissances sur la langue et la culture tadaksahak !`;
}

function handlePronunciationIntent(text) {
  return `🔊 **Prononciation**

Conseils : accent tonique sur la première syllabe, voyelles comme en français.

💡 Pour entendre la prononciation, consultez la fiche du mot dans le dictionnaire.`;
}

function handleGreetingIntent(lang) {
  return "👋 Salam aleikum ! Je suis Hamadine, votre guide pour explorer la langue et la culture Tadaksahak. Tapez **'aide'** pour voir ce que je peux faire.";
}

function handleThanksIntent(lang) {
  return "🙏 De rien ! La connaissance se partage. N'hésitez pas à explorer le dictionnaire et la grammaire.";
}

function handleGoodbyeIntent(lang) {
  return "👋 Au revoir ! N'oubliez pas de consulter le mot du jour demain. Revenez quand vous voulez !";
}

function handleHelpIntent() {
  return `🤖 **Aide**

📖 RECHERCHE DE MOTS : "Que signifie báy ?" ou "Comment dit-on chameau ?"
📚 GRAMMAIRE : "Explique les relatives"
📖 CONTES : "Raconte-moi un conte"
📍 MÉNAKA : "Où est Ménaka ?"
🎙️ RESSOURCES : "Podcast Souag"
❓ QUIZ : "Quiz"

💡 Tapez "menu" pour voir toutes les sections.`;
}

function handleMenuIntent() {
  return `📋 **SECTIONS**

🏠 Accueil | 📖 Dictionnaire | 📚 Grammaire | 📖 Contes
🎙️ Émissions | 💬 Chat | 🎧 Audio | 🖼️ Photos
🎥 Vidéos | 📚 Livres | 📄 Rapports | 📰 Actualités
❓ Quiz | 🃏 Flashcards | 📚 Thèmes | 📅 Timeline
🗺️ Carte | 🔍 Recherche | 📊 Dashboard | 📚 Ressources

💡 Raccourcis clavier : Alt+D (Dico), Alt+C (Chat), Alt+F (Flashcards)`;
}

function handleFeedbackIntent(text) {
  return "🙏 Merci pour votre feedback ! Votre avis est précieux pour améliorer Tadaksahak Learning.";
}

function handleComplimentIntent(text) {
  return "🙏 Merci beaucoup ! C'est un plaisir de vous aider à découvrir la langue tadaksahak.";
}

// ------------------------------
// FONCTIONS UTILITAIRES
// ------------------------------
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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function detectLanguage(text) {
  return { language: 'french', confidence: 0.8 };
}

function translateQuery(text) {
  return text.toLowerCase();
}

function searchDictionaryMultilingual(query) {
  if (!window.vocabulaire) return [];
  return window.vocabulaire.filter(item => 
    item.mot.toLowerCase().includes(query.toLowerCase()) ||
    (item.fr && item.fr.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 5);
}

function searchBooks(query) {
  return [];
}

// ------------------------------
// GESTIONNAIRES (versions simplifiées)
// ------------------------------
class ContextManager {
  constructor(maxSize) {
    this.context = [];
    this.maxSize = maxSize || 15;
  }
  add(message, intent, entities) {
    this.context.unshift({ message, intent, entities, timestamp: Date.now() });
    if (this.context.length > this.maxSize) this.context.pop();
  }
  getLastIntent() {
    return this.context[0]?.intent || null;
  }
}

class SuggestionEngine {
  constructor() {}
  getSuggestions() { return []; }
  recordQuestion() {}
}

class LearningSystem {
  constructor() {}
  recordFeedback() {}
}

class UserVocabularyManager {
  constructor() {
    this.knownWords = [];
    this.weakWords = [];
  }
  recordAttempt() {}
  getKnownWordsCount() { return 0; }
  getProgress() { return 0; }
  getWeakWords() { return []; }
}

const contextManager = new ContextManager();
const suggestionEngine = new SuggestionEngine();
const learningSystem = new LearningSystem();
const userVocab = new UserVocabularyManager();

// ------------------------------
// FONCTION PRINCIPALE DE RÉPONSE
// ------------------------------
function reponseBot(txt) {
  const clean = txt.trim().toLowerCase();
  if (!clean) return "💬 Bonjour ! Tapez **'aide'** pour commencer.";
  
  if (clean.includes('bonjour') || clean.includes('salut') || clean.includes('hello') || clean.includes('salam')) {
    return handleGreetingIntent('fr');
  }
  if (clean.includes('merci') || clean.includes('thanks')) {
    return handleThanksIntent('fr');
  }
  if (clean.includes('au revoir') || clean.includes('bye') || clean.includes('adieu')) {
    return handleGoodbyeIntent('fr');
  }
  if (clean.includes('aide') || clean.includes('help')) {
    return handleHelpIntent();
  }
  if (clean === 'menu') {
    return handleMenuIntent();
  }
  if (clean.includes('dictionnaire') || clean.includes('dico') || clean.includes('mot')) {
    return "📖 Rendez-vous dans la section **Dictionnaire** pour rechercher un mot. Tapez un mot directement ici pour une traduction rapide !";
  }
  if (clean.includes('grammaire') || clean.includes('grammar') || clean.includes('relative') || clean.includes('causatif')) {
    return handleGrammarIntent(clean);
  }
  if (clean.includes('conte') || clean.includes('histoire') || clean.includes('raconte') || clean.includes('légende')) {
    return handleTaleIntent(clean);
  }
  if (clean.includes('ménaka') || clean.includes('menaka') || clean.includes('idaksahak')) {
    return handleMenakaIntent(clean);
  }
  if (clean.includes('podcast') || clean.includes('souag') || clean.includes('gremont')) {
    return handleAcademicIntent(clean);
  }
  if (clean.includes('quiz')) {
    return handleQuizIntent(clean);
  }
  if (clean.includes('statistique') || clean.includes('combien') || clean.includes('nombre')) {
    return handleStatsIntent(clean);
  }
  if (clean.includes('comment dit-on') || clean.includes('traduire') || clean.includes('signifie')) {
    return handleTranslationIntent(clean);
  }
  
  // Recherche directe dans le dictionnaire
  const results = searchDictionaryMultilingual(clean);
  if (results.length > 0) {
    const best = results[0];
    return `📖 **${best.mot}**\n\n🇫🇷 ${best.fr || '—'}\n🇬🇧 ${best.en || '—'}\n🇸🇦 ${best.ar || '—'}\n\n📂 Catégorie : ${best.cat || 'mot'}`;
  }
  
  return "🤔 Je n'ai pas bien compris. Tapez **'aide'** pour voir ce que je peux faire, ou **'menu'** pour la liste des sections.";
}

// ------------------------------
// AFFICHAGE DES MESSAGES
// ------------------------------
function afficheMsg(user, html) {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;
  
  const div = document.createElement("div");
  div.className = `message ${user}`;
  div.innerHTML = `<strong>${user === "bot" ? "🤖 Hamadine" : "👤 Vous"} :</strong> ${html}`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ------------------------------
// TRAITEMENT DE LA SAISIE
// ------------------------------
let typingTimeout = null;

function showTypingIndicator() {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;
  if (document.getElementById("typingIndicator")) return;
  
  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot typing-indicator";
  typingDiv.id = "typingIndicator";
  typingDiv.innerHTML = "<strong>🤖 Hamadine :</strong> <span class='typing-dots'>...</span>";
  chatWindow.appendChild(typingDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function hideTypingIndicator() {
  const typingDiv = document.getElementById("typingIndicator");
  if (typingDiv) typingDiv.remove();
}

function traiterSaisie() {
  const input = document.getElementById("chatInput");
  const txt = input?.value.trim();
  if (!txt) return;
  
  input.value = "";
  input.disabled = true;
  
  afficheMsg("user", escapeHtml(txt));
  showTypingIndicator();
  
  if (typingTimeout) clearTimeout(typingTimeout);
  
  typingTimeout = setTimeout(() => {
    hideTypingIndicator();
    const reponse = reponseBot(txt);
    afficheMsg("bot", reponse);
    input.disabled = false;
    input.focus();
  }, 400);
}

// ------------------------------
// INITIALISATION
// ------------------------------
function initChat() {
  const chatInput = document.getElementById("chatInput");
  const btnEnvoyer = document.getElementById("btnEnvoyer");
  
  if (btnEnvoyer) btnEnvoyer.addEventListener("click", traiterSaisie);
  if (chatInput) chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") traiterSaisie();
  });
  
  setTimeout(() => {
    if (!chatHistory || chatHistory.length === 0) {
      afficheMsg("bot", "👋 Salam aleikum ! Je suis **Hamadine**, votre guide pour explorer la langue et la culture **Tadaksahak**.\n\n💡 Tapez **'aide'** pour voir ce que je peux faire, ou **'menu'** pour la liste des sections.");
    }
  }, 500);
}

// ------------------------------
// EXPORT
// ------------------------------
window.reponseBot = reponseBot;
window.traiterSaisie = traiterSaisie;
window.initChat = initChat;
window.chatHistory = chatHistory;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChat);
} else {
  initChat();
}

console.log("💬 Module Chat Bot chargé - Version corrigée");
