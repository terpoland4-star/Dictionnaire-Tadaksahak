// ============================================
// MODULE - CHAT BOT HAMADINE
// Version ultime - Intelligence artificielle conversationnelle
// Multilingue, contextuelle, prédictive, adaptative
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
  learningLevel: 'beginner', // beginner, intermediate, advanced
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
  
  apply(text) {
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
  
  return { sentiment, score };
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
    extractTarget: (text) => {
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
    extractWord: (text) => {
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
    extractTopic: (text) => {
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
    extractTale: (text) => {
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
// DÉTECTION DE LANGUE AMÉLIORÉE
// ------------------------------
function detectLanguage(text) {
  const cleanText = text.toLowerCase();
  
  // Réinitialiser les scores
  for (let lang in LANGUAGE_DETECTION) {
    LANGUAGE_DETECTION[lang].confidence = 0;
  }
  
  // Compter les correspondances avec pondération
  for (let lang in LANGUAGE_DETECTION) {
    const patterns = LANGUAGE_DETECTION[lang].patterns;
    let score = 0;
    let matches = 0;
    
    for (const pattern of patterns) {
      if (cleanText.includes(pattern)) {
        // Pondération : plus le pattern est long, plus il est significatif
        const weight = Math.min(pattern.length / 10, 3);
        score += weight;
        matches++;
      }
    }
    
    // Bonus pour les mots spécifiques à la langue
    if (lang === 'tadaksahak' && matches > 0) {
      score *= 1.5; // Bonus pour le tadaksahak (moins de données)
    }
    
    LANGUAGE_DETECTION[lang].confidence = score / Math.max(patterns.length, 1);
  }
  
  // Trouver la langue avec le meilleur score
  let bestLang = 'french';
  let bestScore = 0;
  for (let lang in LANGUAGE_DETECTION) {
    if (LANGUAGE_DETECTION[lang].confidence > bestScore) {
      bestScore = LANGUAGE_DETECTION[lang].confidence;
      bestLang = lang;
    }
  }
  
  // Seuil minimum pour la confiance
  if (bestScore < 0.05) {
    bestLang = 'unknown';
  }
  
  return { language: bestLang, confidence: bestScore };
}

// ------------------------------
// TRADUCTION INTERNE ÉTENDUE
// ------------------------------
const TRANSLATION_MAP = {
  // Mots interrogatifs
  'what': ['quoi', 'que', 'qu\'est-ce', 'ماذا', 'what', 'qu\'est ce', 'qu\'est-ce que', 'que signifie', 'what does', 'what is'],
  'how': ['comment', 'كيف', 'how', 'comment est-ce que', 'de quelle manière', 'par quel moyen'],
  'why': ['pourquoi', 'لماذا', 'why', 'pour quelle raison', 'à cause de quoi'],
  'where': ['où', 'أين', 'where', 'dans quel endroit', 'à quel endroit'],
  'when': ['quand', 'متى', 'when', 'à quel moment', 'à quelle heure'],
  'who': ['qui', 'من', 'who', 'quelle personne', 'quel individu'],
  'which': ['quel', 'quelle', 'quels', 'quelles', 'أي', 'which', 'lequel', 'laquelle', 'lesquels', 'lesquelles'],
  
  // Actions
  'say': ['dit', 'dis', 'comment dit-on', 'dire', 'traduire', 'translate', 'say', 'يقول', 'كيف نقول', 'pronounce', 'prononce', 'comment se prononce'],
  'mean': ['signifie', 'veut dire', 'meaning', 'signification', 'معنى', 'means', 'veut dire que', 'cela signifie', 'cela veut dire'],
  'search': ['cherche', 'trouve', 'recherche', 'بحث', 'find', 'search', 'look for', 'chercher', 'rechercher', 'trouver'],
  'explain': ['explique', 'explain', 'شرح', 'expliquer', 'détaille', 'précise', 'clarifie', 'éclaire'],
  'tell': ['raconte', 'tell', 'احكي', 'raconter', 'dis-moi', 'parle-moi', 'narrate', 'conte'],
  'show': ['montre', 'affiche', 'show', 'اعرض', 'présente', 'visualise', 'démontre'],
  'learn': ['apprendre', 'learn', 'تعلم', 'study', 'étudier', 'acquérir', 'maîtriser', 'comprendre'],
  'practice': ['pratique', 'practice', 'تمرن', 'entraîne', 'répète', 'exercise', 's\'exercer'],
  
  // Temps et aspects
  'past': ['passé', 'كان', 'past', 'former', 'autrefois', 'jadis', 'auparavant', 'ancien'],
  'present': ['présent', 'يكون', 'present', 'current', 'actuel', 'maintenant', 'aujourd\'hui', 'courant'],
  'future': ['futur', 'سيكون', 'future', 'will', 'à venir', 'prochain', 'ultérieur', 'postérieur'],
  'perfective': ['perfectif', 'perfective', 'accompli', 'terminé', 'fini', 'complété'],
  'imperfective': ['imperfectif', 'imperfective', 'inaccompli', 'non terminé', 'en cours'],
  
  // Grammaire
  'causative': ['causatif', 'causative', 'سببي', 'faire faire', 'causer', 'provoquer'],
  'passive': ['passif', 'passive', 'مجهول', 'être fait', 'subir', 'recevoir l\'action'],
  'relative': ['relative', 'proposition', 'relatif', 'الموصولة', 'relative clause', 'subordonnée relative'],
  'pronoun': ['pronom', 'pronoun', 'ضمير', 'personal pronoun', 'pronom personnel', 'pronom sujet', 'pronom objet'],
  'adjective': ['adjectif', 'adjective', 'صفة', 'qualificatif', 'épithète', 'attribut'],
  'verb': ['verbe', 'verb', 'فعل', 'action word', 'mot d\'action', 'prédicat'],
  'noun': ['nom', 'noun', 'اسم', 'substantif', 'nom commun', 'nom propre'],
  'adverb': ['adverbe', 'adverb', 'ظرف', 'mot de manière', 'complément circonstanciel'],
  'conjunction': ['conjonction', 'conjunction', 'حرف عطف', 'mot de liaison', 'connecteur'],
  'preposition': ['préposition', 'preposition', 'حرف جر', 'postposition', 'mot de relation'],
  'negation': ['négation', 'negation', 'نفي', 'negative', 'ne...pas', 'ne...jamais', 'ne...rien', 'ne...personne'],
  'reciprocal': ['réciproque', 'reciprocal', 'متبادل', 'mutual', 'entre eux', 'l\'un l\'autre', 'mutuellement'],
  'demonstrative': ['démonstratif', 'demonstrative', 'اسم إشارة', 'ce', 'cet', 'cette', 'ces', 'ceci', 'cela', 'ça'],
  'interrogative': ['interrogatif', 'interrogative', 'استفهام', 'question word', 'mot interrogatif', 'adverbe interrogatif'],
  'numeral': ['numéral', 'numeral', 'عدد', 'nombre', 'chiffre', 'cardinal', 'ordinal'],
  
  // Culture et géographie
  'menaka': ['ménaka', 'menaka', 'منكا', 'menaka city', 'chef-lieu', 'région de ménaka', 'cercle de ménaka'],
  'idaksahak': ['idaksahak', 'dawsahaq', 'ادكساهق', 'idaksahak people', 'peuple idaksahak', 'tadaksahak speaker'],
  'culture': ['culture', 'ثقافة', 'customs', 'traditions', 'coutumes', 'pratiques culturelles', 'patrimoine'],
  'history': ['histoire', 'تاريخ', 'past events', 'historical', 'passé', 'chronologie', 'récit historique'],
  'tradition': ['tradition', 'تقليد', 'custom', 'usage', 'pratique traditionnelle', 'héritage', 'transmission'],
  
  // Opérateurs logiques
  'in': ['en', 'dans', 'في', 'in', 'à l\'intérieur de', 'au sein de', 'parmi'],
  'to': ['à', 'إلى', 'to', 'vers', 'jusqu\'à', 'en direction de'],
  'from': ['de', 'من', 'from', 'depuis', 'à partir de', 'provenant de'],
  'and': ['et', 'و', 'and', 'ainsi que', 'plus', 'avec'],
  'or': ['ou', 'أو', 'or', 'soit', 'alternativement', 'bien'],
  'with': ['avec', 'مع', 'with', 'accompagné de', 'en compagnie de', 'utilisant'],
  'without': ['sans', 'بدون', 'without', 'privé de', 'exempt de', 'dépourvu de'],
  
  // Émotions et sentiments
  'happy': ['heureux', 'content', 'joyeux', 'سعيد', 'happy', 'glad', 'pleased', 'delighted'],
  'sad': ['triste', 'حزين', 'sad', 'affligé', 'peiné', 'désolé', 'navré'],
  'excited': ['excité', 'enthousiaste', 'متحمس', 'excited', 'thrilled', 'eager', 'impatient'],
  'confused': ['confus', 'perdu', 'مشوش', 'confused', 'puzzled', 'baffled', 'bewildered']
};

function translateQuery(text, targetLang = 'fr') {
  const cleanText = text.toLowerCase();
  let translated = cleanText;
  
  for (const [eng, equivalents] of Object.entries(TRANSLATION_MAP)) {
    for (const equiv of equivalents) {
      if (cleanText.includes(equiv)) {
        translated = translated.replace(new RegExp(equiv, 'g'), eng);
      }
    }
  }
  
  return translated;
}

// ------------------------------
// GESTIONNAIRE DE CONTEXTE
// ------------------------------
class ContextManager {
  constructor(maxSize = 15) {
    this.context = [];
    this.maxSize = maxSize;
    this.topics = [];
    this.entities = {};
  }
  
  add(message, intent, entities = {}) {
    this.context.unshift({
      message,
      intent,
      entities,
      timestamp: Date.now()
    });
    
    if (this.context.length > this.maxSize) {
      this.context.pop();
    }
    
    // Mettre à jour les entités
    for (const [key, value] of Object.entries(entities)) {
      if (!this.entities[key]) {
        this.entities[key] = [];
      }
      this.entities[key].unshift(value);
      if (this.entities[key].length > 5) this.entities[key].pop();
    }
  }
  
  getLastIntent() {
    return this.context[0]?.intent || null;
  }
  
  getLastEntity(key) {
    return this.entities[key]?.[0] || null;
  }
  
  getContextString() {
    return this.context.slice(0, 5).map(c => c.message).join(' | ');
  }
  
  clear() {
    this.context = [];
    this.entities = {};
  }
  
  hasTopic(topic) {
    return this.context.some(c => c.intent === topic);
  }
}

const contextManager = new ContextManager();

// ------------------------------
// SYSTÈME DE SUGGESTIONS PRÉDICTIVES
// ------------------------------
class SuggestionEngine {
  constructor() {
    this.commonQuestions = [
      "Que signifie 'báy' ?",
      "Comment dit-on 'bonjour' en tadaksahak ?",
      "Raconte-moi un conte",
      "Explique les propositions relatives",
      "Où se trouve Ménaka ?",
      "Qui sont les Idaksahak ?",
      "Combien de mots dans le dictionnaire ?",
      "Comment se prononce 'a-rgán' ?",
      "Quelle est la différence entre 'ayo' et 'sa' ?",
      "Fais-moi un quiz",
      "Quels sont les thèmes disponibles ?",
      "Comment utiliser les flashcards ?"
    ];
    
    this.userFrequentQuestions = [];
  }
  
  getSuggestions(context, userLevel) {
    let suggestions = [];
    
    // Suggestions basées sur le contexte
    const lastIntent = contextManager.getLastIntent();
    if (lastIntent === 'TRANSLATION') {
      suggestions = [
        "Que signifie 'rgán' ?",
        "Comment dit-on 'chameau' en tadaksahak ?",
        "Traduis 'maison' en tadaksahak"
      ];
    } else if (lastIntent === 'GRAMMAR') {
      suggestions = [
        "Explique les verbes causatifs",
        "C'est quoi la gap strategy ?",
        "Comment se forment les pronoms possessifs ?"
      ];
    } else if (lastIntent === 'TALE') {
      suggestions = [
        "Raconte le lion et le lièvre",
        "Une histoire sur la hyène",
        "Parle-moi du chacal"
      ];
    } else {
      suggestions = this.commonQuestions.slice(0, 5);
    }
    
    return suggestions;
  }
  
  recordQuestion(question) {
    this.userFrequentQuestions.unshift(question);
    if (this.userFrequentQuestions.length > 20) {
      this.userFrequentQuestions.pop();
    }
  }
}

const suggestionEngine = new SuggestionEngine();

// ------------------------------
// SYSTÈME D'APPRENTISSAGE
// ------------------------------
class LearningSystem {
  constructor() {
    this.correctedResponses = {};
    this.userFeedback = [];
    this.confidenceScores = {};
  }
  
  recordFeedback(question, response, wasHelpful) {
    this.userFeedback.push({
      question,
      response,
      wasHelpful,
      timestamp: Date.now()
    });
    
    if (!this.correctedResponses[question]) {
      this.correctedResponses[question] = [];
    }
    
    if (wasHelpful) {
      this.confidenceScores[question] = (this.confidenceScores[question] || 0) + 1;
    } else {
      this.confidenceScores[question] = (this.confidenceScores[question] || 0) - 1;
    }
  }
  
  getBestResponse(question) {
    const normalized = question.toLowerCase();
    if (this.correctedResponses[normalized]?.length) {
      return this.correctedResponses[normalized][0];
    }
    return null;
  }
  
  getConfidence(question) {
    return this.confidenceScores[question.toLowerCase()] || 0;
  }
}

const learningSystem = new LearningSystem();

// ------------------------------
// GESTIONNAIRE DE VOCABULAIRE UTILISATEUR
// ------------------------------
class UserVocabularyManager {
  constructor() {
    this.knownWords = JSON.parse(localStorage.getItem('user_known_words') || '[]');
    this.weakWords = JSON.parse(localStorage.getItem('user_weak_words') || '[]');
    this.wordAttempts = JSON.parse(localStorage.getItem('user_word_attempts') || '{}');
  }
  
  recordAttempt(word, success) {
    this.wordAttempts[word] = (this.wordAttempts[word] || 0) + 1;
    if (success) {
      if (!this.knownWords.includes(word)) {
        this.knownWords.push(word);
      }
      this.weakWords = this.weakWords.filter(w => w !== word);
    } else {
      if (!this.weakWords.includes(word)) {
        this.weakWords.push(word);
      }
    }
    this.save();
  }
  
  getWeakWords() {
    return this.weakWords;
  }
  
  getKnownWordsCount() {
    return this.knownWords.length;
  }
  
  getProgress() {
    const total = (window.vocabulaire?.length || 529);
    return Math.round((this.knownWords.length / total) * 100);
  }
  
  save() {
    localStorage.setItem('user_known_words', JSON.stringify(this.knownWords));
    localStorage.setItem('user_weak_words', JSON.stringify(this.weakWords));
    localStorage.setItem('user_word_attempts', JSON.stringify(this.wordAttempts));
  }
}

const userVocab = new UserVocabularyManager();

// ------------------------------
// FONCTIONS DE RÉPONSE AMÉLIORÉES
// ------------------------------

function handleTranslationIntent(text, extracted = null) {
  const target = extracted || INTENTS.TRANSLATION.extractTarget(text);
  
  if (target && target.word) {
    const searchTerm = target.word.toLowerCase();
    const results = searchDictionaryMultilingual(searchTerm);
    
    if (results.length > 0) {
      const bestMatch = results[0];
      let response = `📖 **Traduction de "${target.word}" :**\n\n`;
      response += `🔹 **Tadaksahak** : ${bestMatch.mot}\n`;
      response += `🔹 **Français** : ${bestMatch.fr || '—'}\n`;
      response += `🔹 **English** : ${bestMatch.en || '—'}\n`;
      response += `🔹 **العربية** : ${bestMatch.ar || '—'}\n`;
      response += `\n📂 Catégorie : ${bestMatch.cat || 'mot'}`;
      
      if (bestMatch.audio) {
        response += `\n🔊 Prononciation disponible dans le dictionnaire.`;
      }
      
      // Enregistrer l'utilitaire
      userVocab.recordAttempt(bestMatch.mot, true);
      
      return response;
    } else {
      userVocab.recordAttempt(target.word, false);
      return `🔍 Je n'ai pas trouvé "${target.word}" dans mon dictionnaire. Voulez-vous essayer avec un autre mot ?\n\n💡 Suggestions : **báy** (pouvoir), **yiddár** (vivre), **a-rgán** (chameau), **hánfi** (chien)`;
    }
  }
  
  return "📖 Pour traduire un mot, demandez-moi :\n• 'Comment dit-on [mot] en tadaksahak ?'\n• 'Que signifie [mot] ?'\n• 'Traduis [mot] en français'";
}

function handleDefinitionIntent(text) {
  const word = INTENTS.DEFINITION.extractWord(text);
  
  if (word) {
    const results = searchDictionaryMultilingual(word);
    
    if (results.length > 0) {
      const bestMatch = results[0];
      let response = `📖 **Définition de "${word}" :**\n\n`;
      response += `🔹 **Mot** : ${bestMatch.mot}\n`;
      response += `🔹 **Catégorie** : ${bestMatch.cat || 'mot'}\n`;
      response += `🔹 **Français** : ${bestMatch.fr || '—'}\n`;
      response += `🔹 **English** : ${bestMatch.en || '—'}\n`;
      response += `🔹 **العربية** : ${bestMatch.ar || '—'}\n`;
      
      // Exemple d'utilisation si disponible
      if (bestMatch.exemple) {
        response += `\n📝 **Exemple** : ${bestMatch.exemple}`;
      }
      
      return response;
    } else {
      return `🔍 Je ne trouve pas la définition de "${word}".\n\n💡 Tapez le mot dans la barre de recherche du dictionnaire, ou essayez un mot comme **báy**, **yiddár**, **a-rgán**.`;
    }
  }
  
  return "📖 Pour obtenir la définition d'un mot, demandez-moi :\n• 'Que signifie [mot] ?'\n• 'Définition de [mot]'\n• 'C'est quoi [mot] ?'";
}

function handleGrammarIntent(text) {
  const topic = INTENTS.GRAMMAR.extractTopic(text);
  
  const GRAMMAR_RESPONSES = {
    causative: `📚 **Verbes causatifs en tadaksahak**

Le causatif se forme avec le préfixe **s-** (parfois **z-** ou **f-**). Il exprime l'idée de "faire faire" quelque chose.

**Formation :**
• Verbe simple + préfixe s- = causatif

**Exemples :**
• *dá* (faire) → *s-ágá* (faire faire)
• *nát* (donner) → *s-ākfá* (faire donner)
• *záw* (apporter) → *fī-fī-wit* (faire apporter)
• *wís* (tuer) → *sā-ss-ūw-anyā* (faire tuer)

**Note :** Les verbes d'origine songhay prennent des racines empruntées au tamasheq pour former le causatif.

📖 Consultez la section Grammaire pour plus d'exemples.`,

    passive: `📚 **Verbes passifs en tadaksahak**

Le passif se forme avec le préfixe **t-** (parfois **tūw-**). Il transforme l'objet en sujet de la phrase.

**Formation :**
• Verbe simple + préfixe t- = passif

**Exemples :**
• *dá* (faire) → *t-āgá* (être fait)
• *záw* (apporter) → *āwīt* (être apporté)
• *wís* (tuer) → *tūw-anyā* (être tué)
• *nát* (donner) → *t-ākfá* (être donné)

**Note :** Le passif est moins fréquent que le causatif et souvent utilisé avec des verbes transitifs.

📖 Consultez la section Grammaire pour plus d'exemples.`,

    relative: `📖 **Propositions relatives en tadaksahak**

Le tadaksahak utilise **3 stratégies de relativisation** distinctes :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**1️⃣ Pronom relatif "ayo/ayondo"** → noms DÉFINIS, restrictif

*Bora [ayo a-taw-kat] a-zumbu-kat.*
→ "La personne QUI est arrivée est descendue."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**2️⃣ Gap strategy (∅)** → noms INDÉFINIS, restrictif

*A-gar hamu [# f-keni aykaran daw].*
→ "Elle a trouvé de la viande QUI était à côté des chiots."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**3️⃣ "sa"** → non-restrictif (info supplémentaire)

*nana, [sa ayn man Aminata].*
→ "sa mère, QUI s'appelle Aminata."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 D'après Christiansen & Levinsohn (2003).

💡 Tapez **"exemple relative"** pour un exemple aléatoire.`,

    pronoun: `📚 **Pronoms personnels en tadaksahak**

Le tadaksahak distingue 3 personnes et 2 nombres (pas de genre).

| Personne | Sujet clitique | Indépendant | Objet | Possessif |
|----------|----------------|-------------|-------|-----------|
| **1sg** | aɣ(a)- | aɣay | ayay | aya-n |
| **2sg** | ni- / an- | nín | nin | ni-n |
| **3sg** | a- | áŋga | -a | ay-n |
| **1pl** | ar(ǝ)- | áari | aari | are-n |
| **2pl** | andǝ- | ándi | andi | ande-n |
| **3pl** | i- | íŋgi | -i | i-n |

**Exemples :**
• *a-ttén* → "il est arrivé"
• *aɣ-a-tén* → "je suis arrivé"
• *aɣay se* → "à moi"

📖 Consultez la section Grammaire pour le détail des usages.`,

    adjective: `📚 **Adjectifs en tadaksahak**

Les adjectifs sont dérivés des verbes et s'accordent en nombre.

**Adjectifs courants :**
| Tadaksahak | Français | Pluriel |
|------------|----------|---------|
| beer-i | grand | babber-anin |
| ceen-an | petit | ceenan-anin |
| bibi | noir | bibi-nin |
| kooray | blanc | kooray-nin |
| ciday | rouge | ciday-nin |
| yaray-an | jaune | yarayan-anin |
| kuk-an | long | kukan-anin |
| gazul | court | gazul-anin |

**Position :** L'adjectif suit généralement le nom.

**Exemple :** *a-rgán beer-i* → "le grand chameau"

📖 Consultez la section Grammaire pour la liste complète.`,

    negation: `📚 **Négation en tadaksahak**

Tadaksahak distingue deux formes principales de négation selon l'aspect :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Perfectif (action terminée) : nǝ-**

*a-nǝ-kun(a) ay-n a-zraf* → "il n'a pas trouvé son argent"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Imperfectif (action non terminée) : sǝ-**

*aɣ-sǝ-báy-a* → "je ne le sais pas"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Autres formes négatives :**
• *kǝlá ... nǝ-* → "ne ... jamais"
• *nǝ- ... fów* → "ne ... pas du tout"
• *h(e) a-ʃʃí* → "il n'y a rien"
• *bor(a) a-ʃʃí* → "il n'y a personne"
• *wǝrtilla* → "il n'y a pas" (emphatique)
• *wiji* → "n'est pas" (identification)

📖 Consultez la section Grammaire pour plus de détails.`,

    reciprocal: `📚 **Verbes réciproques en tadaksahak**

Le réciproque exprime une action mutuelle entre deux ou plusieurs sujets.

**Formation :** Préfixes **m(a)-** ou **n(a)-** (parfois **na-mm(a)-**)

**Exemples :**
• *m-adyar* → "adhérer l'un à l'autre" (de *yidyar*)
• *n-aktab* → "s'écrire l'un à l'autre" (de *yiktab*)
• *n-mm-anya* → "s'entretuer" (de *wi*)
• *m-axwal* → "être préoccupés l'un par l'autre"
• *n-mm-agag* → "être éloignés l'un de l'autre"

**Remarque :** Les verbes supplétifs utilisent la forme **na-mm(a)-**.

📖 Consultez la section Grammaire pour la liste complète.`,

    numerals: `🔢 **Numéraux en tadaksahak**

**Nombres 1-10 :**
1 = a-ffó / fo-da
2 = hiŋká
3 = kaaráḍ
4 = akkóz
5 = ʃammúʃ
6 = ʃaadíʃ
7 = iffá
8 = ittám
9 = taasá
10 = maará

**Dizaines :**
20 = táafinda
30 = kaarad-a-temerwin
40 = akkoz-a-temerwin
50 = fammuf-a-temerwin
60 = ʃaadif-a-temerwin
70 = ifay-temerwin
80 = ittam-temerwin
90 = taasay-temerwin

**Centaines et milliers :**
100 = t-á-méedi
200 = t-á-méedi hinká
1000 = a-jím
2000 = i-jimm-an hinká

📖 Les dizaines se forment par juxtaposition : [unité]-a-temerwin.`,

    demonstratives: `📍 **Démonstratifs en tadaksahak**

Tadaksahak possède 6 démonstratifs indiquant distance et familiarité :

| Démonstratif | Usage | Exemple |
|--------------|-------|---------|
| **óoda** | proche du locuteur | "ceci (près de moi)" |
| **áyda** | proche de l'interlocuteur | "ceci (près de toi)" |
| **(a)sénda** | distant | "cela (là-bas)" |
| **adi** | anaphorique | "ce (déjà mentionné)" |
| **o** | référence large | "ce (référence temporelle)" |
| **na** | opposé | "ce (en face)" |

**Exemple :**
*óoda a-rgán* → "ce chameau-ci (près de moi)"

📖 Consultez la section Grammaire pour plus d'exemples.`,

    interrogatives: `❓ **Mots interrogatifs en tadaksahak**

Les mots interrogatifs sont basés sur deux racines : **ci** (qui/quoi) et **man** (où).

| Interrogatif | Sens | Exemple |
|--------------|------|---------|
| **ci** | qui ? / quoi ? | *cí mmáay a?* (qui est-ce ?) |
| **ci ná aɣo** | qui (humain) ? | *ci ná aɣo?* (qui est-ce ?) |
| **ci ná hó** | quoi (non-humain) ? | *ci ná hó?* (qu'est-ce ?) |
| **ci ná hó be** | pourquoi ? | *ci ná hó be ni-b-zoɣ?* (pourquoi te bats-tu ?) |
| **c(i) agúd** | quand ? | *c(i) agúd a-ddidá?* (quand est-il parti ?) |
| **maaná** | où (proche) ? | *maaná ni-n hugu?* (où est ta tente ?) |
| **man n(e)** | où (éloigné) ? | *man ne i-f-ko?* (où vont-ils ?) |
| **man ícet** | combien ? | *man ícet feej-an?* (combien de moutons ?) |
| **man émmék aɣó (ǝ)nda** | comment ? | *man émmék aɣó ǝnda aɣ-tǝ-dá-a?* (comment vais-je le faire ?) |

📖 Consultez la section Grammaire pour plus d'exemples.`,

    default: `📚 **Grammaire tadaksahak**

La grammaire tadaksahak couvre plusieurs aspects fascinants :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🔤 Verbes causatifs et passifs**
• Causatif : préfixe **s-** (faire faire)
• Passif : préfixe **t-** (être fait)

**📖 Propositions relatives** (3 stratégies)
• "ayo/ayondo" (noms définis)
• Gap strategy (noms indéfinis)
• "sa" (non-restrictif)

**👥 Pronoms personnels**
• 6 formes (3 personnes × 2 nombres)
• Distinction clitique/indépendant/objet/possessif

**🎨 Adjectifs**
• Dérivés des verbes
• Accord en nombre

**🚫 Négation**
• Perfectif : nǝ-
• Imperfectif : sǝ-

**🔢 Numéraux**
• 1-10 d'origine tamasheq
• Dizaines en -a-temerwin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Pour approfondir un sujet, demandez-moi :
• "Explique les causatifs"
• "C'est quoi les relatives ?"
• "Les pronoms personnels"
• "La négation en tadaksahak"
• "Les numéraux"

📖 Consultez la section Grammaire de l'application pour explorer chaque sujet en détail.`
  };
  
  if (topic && GRAMMAR_RESPONSES[topic]) {
    contextManager.add(text, 'GRAMMAR', { topic });
    return GRAMMAR_RESPONSES[topic];
  }
  
  // Vérifier les mots-clés spécifiques
  if (text.includes('causatif') || text.includes('causative')) {
    return GRAMMAR_RESPONSES.causative;
  }
  if (text.includes('passif') || text.includes('passive')) {
    return GRAMMAR_RESPONSES.passive;
  }
  if (text.includes('relative') || text.includes('proposition') || text.includes('ayo')) {
    return GRAMMAR_RESPONSES.relative;
  }
  if (text.includes('pronom') || text.includes('pronoun')) {
    return GRAMMAR_RESPONSES.pronoun;
  }
  if (text.includes('adjectif') || text.includes('adjective')) {
    return GRAMMAR_RESPONSES.adjective;
  }
  if (text.includes('négation') || text.includes('negation')) {
    return GRAMMAR_RESPONSES.negation;
  }
  if (text.includes('réciproque') || text.includes('reciprocal')) {
    return GRAMMAR_RESPONSES.reciprocal;
  }
  if (text.includes('numéral') || text.includes('numeral') || text.includes('nombre') || text.includes('chiffre')) {
    return GRAMMAR_RESPONSES.numerals;
  }
  if (text.includes('démonstratif') || text.includes('demonstrative')) {
    return GRAMMAR_RESPONSES.demonstratives;
  }
  if (text.includes('interrogatif') || text.includes('question word')) {
    return GRAMMAR_RESPONSES.interrogatives;
  }
  
  return GRAMMAR_RESPONSES.default;
}

// ------------------------------
// RÉPONSES POUR LES CONTES (ENRICHIE)
// ------------------------------
const TALES_DATABASE = {
  'chacal': {
    title: 'Le chacal et le phacochère',
    content: `📖 **Le chacal et le phacochère** (Conte traditionnel Idaksahak)

Il était une fois, dans la brousse de Ménaka, un chacal rusé qui convoitait la graisse d'un phacochère.

Le chacal alla trouver l'éléphant et lui dit que les phacochères voulaient le tuer pour prendre son territoire. L'éléphant, effrayé, demanda conseil au chacal.

Le chacal proposa de tuer les phacochères un par un. Il alla voir chaque phacochère séparément et leur dit que l'éléphant était malade et avait besoin de leur graisse pour guérir.

Un par un, les phacochères se présentèrent devant le chacal, qui les dévora tous, ne laissant qu'un seul survivant.

Le dernier phacochère, méfiant, observa le chacal de loin. Il vit que tous ses compagnons avaient disparu et comprit la ruse. Il alla prévenir l'éléphant.

L'éléphant, furieux d'avoir été trompé, poursuivit le chacal qui s'enfuit à jamais dans le désert.

💡 **Morale** : La ruse peut tromper un temps, mais la vérité finit toujours par éclater. Celui qui manipule les autres finit par être découvert.`,
    keywords: ['chacal', 'phacochère', 'éléphant', 'rusé', 'tromper', 'graisse', 'désert', 'ménaka', 'brousse']
  },
  'lion': {
    title: 'Le lion et le lièvre',
    content: `📖 **Le lion et le lièvre** (Conte traditionnel Idaksahak)

Le lion, roi des animaux, terrorisait tous les habitants de la savane. Chaque jour, il exigeait qu'un animal vienne se sacrifier pour le nourrir.

Les animaux vivaient dans la peur constante. Personne n'osait défier le lion, car il était le plus fort.

Un jour, ce fut au tour du petit lièvre. Mais au lieu d'aller se sacrifier, le lièvre eut une idée ingénieuse.

Il alla trouver le lion et lui dit : "Ô grand roi, j'ai vu un autre lion, encore plus fort que toi, qui veut te voler ton trône."

Le lion, furieux, demanda où se trouvait ce rival. Le lièvre l'emmena à un puits et lui montra son propre reflet dans l'eau.

"Le voilà !" s'écria le lièvre.

Le lion, croyant voir un véritable rival, sauta dans le puits pour le combattre. Il se noya immédiatement.

La savane fut libérée du tyran, et tous les animaux acclamèrent le courage et l'intelligence du petit lièvre.

💡 **Morale** : L'intelligence et la ruse peuvent vaincre la force brute. La taille n'est pas toujours un avantage.`,
    keywords: ['lion', 'lièvre', 'puits', 'reflet', 'roi', 'savane', 'courage', 'intelligence', 'force']
  },
  'hyene': {
    title: 'La hyène et le serpent',
    content: `📖 **La hyène et le serpent** (Conte traditionnel Idaksahak)

La hyène, toujours affamée et égoïste, errait dans la brousse à la recherche de nourriture.

Elle trouva un serpent blessé, incapable de se déplacer, au bord du chemin. Au lieu de l'aider, elle se moqua de lui : "Ah ! Le grand serpent rampant ne peut plus avancer ! Quelle honte !"

Le serpent, avec dignité, lui répondit : "Un jour, toi aussi, tu auras besoin d'aide. Souviens-toi de mes paroles."

La hyène éclata de rire et poursuivit son chemin, laissant le serpent se débrouiller seul.

Des années passèrent. La hyène, devenue vieille et faible, tomba un jour dans un piège tendu par des chasseurs.

Elle appela à l'aide, mais tous les animaux qu'elle avait maltraités passèrent sans même la regarder. Personne ne vint l'aider.

Le serpent, qui avait guéri, passa près d'elle. La hyène le supplia de l'aider, mais le serpent lui rappela ses paroles cruelles et poursuivit son chemin.

La hyène comprit alors que ses actions passées avaient des conséquences.

💡 **Morale** : Qui ne sème pas la bonté ne récolte que l'indifférence. Aide ton prochain, car un jour tu auras peut-être besoin de son aide.`,
    keywords: ['hyène', 'serpent', 'blessé', 'aide', 'piège', 'bonté', 'indifférence', 'chasseur', 'dignité']
  },
  'tortue': {
    title: 'La tortue et l\'aigle',
    content: `📖 **La tortue et l\'aigle** (Conte traditionnel Idaksahak)

La tortue vivait paisiblement au bord d'un point d'eau. Elle regardait avec envie les oiseaux voler dans le ciel.

"Comme j'aimerais voler !" soupirait-elle chaque jour.

Un aigle, qui l'entendit, lui proposa de l'emmener dans les airs. "Accroche-toi à mes serres, et je te ferai voir le monde d'en haut."

La tortue accepta avec joie. L'aigle l'emporta très haut dans le ciel. La tortue découvrit des paysages magnifiques qu'elle n'aurait jamais imaginés.

Mais une fois redescendue, elle devint arrogante. Elle se moqua des autres animaux qui ne pouvaient pas voler.

"Regardez-moi ! J'ai vu le monde, pas vous !" criait-elle.

L'aigle, attristé par son arrogance, décida de lui donner une leçon. Il l'emporta à nouveau très haut... puis la lâcha.

La tortue tomba lourdement sur une roche. Sa carapace se fissura.

Depuis ce jour, les tortues ont une carapace cabossée, pour leur rappeler que l'orgueil est dangereux.

💡 **Morale** : L'orgueil précède la chute. Ne te moque jamais de ceux qui sont différents de toi.`,
    keywords: ['tortue', 'aigle', 'vol', 'orgueil', 'carapace', 'chute', 'humilité', 'oiseau']
  }
};

function handleTaleIntent(text) {
  const taleKeyword = INTENTS.TALE.extractTale(text);
  
  if (taleKeyword && TALES_DATABASE[taleKeyword]) {
    contextManager.add(text, 'TALE', { tale: taleKeyword });
    return TALES_DATABASE[taleKeyword].content;
  }
  
  // Conte par défaut (chacal)
  const defaultTale = TALES_DATABASE['chacal'];
  return `${defaultTale.content}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📚 **Autres contes disponibles :**\n• "Raconte le lion" → Le lion et le lièvre\n• "Raconte la hyène" → La hyène et le serpent\n• "Raconte la tortue" → La tortue et l'aigle\n\n💡 Lequel souhaitez-vous écouter ?`;
}

// ------------------------------
// RÉPONSES POUR LA CULTURE (suite)
// ------------------------------
    `bijoux en argent (symboles de statut social)
• Articles en cuir (selles, harnais, sacs)
• Tissus teints (indigo, couleurs naturelles)
• Poterie (objets du quotidien)

**👗 Habillement traditionnel**
• Hommes : boubou ample, turban (tagelmust) pour se protéger du soleil
• Femmes : robes colorées, voiles, bijoux en argent
• Tatouages traditionnels (visage, mains) comme marqueurs d'identité

**🍲 Cuisine traditionnelle**
• Lait de chamelle (fermenté ou frais)
• Viande séchée (pour les voyages)
• Mil sous différentes formes (bouillie, galette)
• Thé à la menthe (omniprésent)

**🎉 Cérémonies et fêtes**
• Mariages (plusieurs jours de célébrations)
• Naissances (nomination, rasage)
• Fêtes religieuses (Tabaski, Ramadan)
• Transhumances (départs collectifs)

📖 Découvrez-en plus dans les contes et émissions de l'application.`,

    marriage: `💍 **Le mariage chez les Idaksahak**

Le mariage est un événement majeur dans la culture Idaksahak, célébré sur plusieurs jours.

**Étapes du mariage :**
1. **Demande** : Les familles négocient la dot (généralement en chameaux ou en argent)
2. **Fiançailles** : Période de préparation (peut durer plusieurs mois)
3. **Cérémonie principale** : Festivités, musique, danses, repas collectif
4. **Consommation** : Rituels spécifiques, installation du couple

**Symboles :**
• La tente offerte par la famille de l'époux
• Les bijoux en argent offerts par la famille de l'épouse
• Le thé partagé comme signe d'union

📖 Chaque mariage est unique et reflète la richesse des traditions Idaksahak.`,

    birth: `👶 **Naissance et enfance**

La naissance d'un enfant est un événement joyeux célébré par toute la communauté.

**Rituels :**
• Le 7e jour : nomination de l'enfant
• Le 40e jour : rasage des premiers cheveux
• L'apprentissage : transmission orale des contes et proverbes

**Prénoms :**
• Tadaksahak (ex: A-rgán, Yáw)
• Arabes (ex: Mohamed, Aminata)
• Français (influence coloniale)

**Éducation :**
• Transmission orale par les aînés
• Apprentissage de l'élevage (filles et garçons)
• École coranique ou française selon les familles

📖 Les contes de l'application transmettent la sagesse ancestrale.`
  };
  
  if (text.includes('mariage') || text.includes('wedding')) {
    return CULTURE_RESPONSES.marriage;
  }
  if (text.includes('naissance') || text.includes('birth') || text.includes('enfant')) {
    return CULTURE_RESPONSES.birth;
  }
  return CULTURE_RESPONSES.general;
}

// ------------------------------
// RÉPONSES POUR MÉNAKA (ENRICHIE)
// ------------------------------
const MENAKA_RESPONSES = {
  general: `📍 **Ménaka - Cœur du pays Idaksahak**

**Géographie**
Ménaka est une ville du nord-est du Mali, chef-lieu de la 9e région administrative. Elle est située à la frontière du Niger, dans la zone sahélienne.

**Population**
Environ 30 000 Idaksahak (Dawsahaq), un peuple berbère zénatique.

**Langue**
Le tadaksahak (tadagsahaq), mélange unique de songhay et de tamasheq.

**Activités principales**
• Élevage (chameaux, vaches, chèvres)
• Commerce transfrontalier
• Artisanat (cuir, argent, tissus)
• Agriculture limitée (saison des pluies)

**Climat**
Semi-aride, avec une saison des pluies (juillet-septembre) et une longue saison sèche.

🗺️ Consultez la carte interactive dans l'application pour localiser Ménaka et ses environs.`,

  history: `📜 **Histoire de Ménaka (2000-2018)**

D'après l'article de Charles Grémont (2019) publié dans la revue Hérodote :

**Années 1990-2000**
• Concurrence entre éleveurs Dawsahaq et Peuls pour les pâturages
• Multiplication des conflits liés au foncier pastoral
• Circulation des armes post-rébellion

**2010-2012**
• Émergence du MNA (Mouvement national de l'Azawad)
• Chute du régime Kadhafi, retour des combattants touaregs
• Rébellion du MNLA (janvier 2012)
• Prise de contrôle par les groupes djihadistes (Aqmi, Mujao)

**2013-2015**
• Intervention française (opération Serval, puis Barkhane)
• Élection d'IBK (août 2013)
• Accords d'Alger (juin 2015)

**2016-2018**
• Création du MSA (Mouvement pour le salut de l'Azawad)
• Arrestation de Mohammed ag Siguidi par Barkhane (janvier 2018)
• Massacres d'Aklaz et Wakassa (avril 2018)

📚 Lisez l'article complet dans la section Livres de l'application.`,

  people: `👥 **Les Idaksahak (Dawsahaq)**

**Origines**
Les Idaksahak sont un peuple berbère zénatique de la région de Ménaka. Leur langue, le tadaksahak, témoigne de siècles de contacts entre berbères et songhay.

**Statut social**
Libres mais de statut intermédiaire, historiquement tributaires des Imajeghen (aristocrates-guerriers).

**Fractions principales**
• **Iduguriten** : les plus nombreux et les plus riches
• **Kel Tabho** : situés dans la vallée de l'Azawagh
• **Isheriffen** : fraction prestigieuse

**Personnalités importantes**
• **Bajan ag Hamatou** : député de Ménaka, chef coutumier des Iwellemmedan
• **Moussa ag Acharatouman** : fondateur du MSA
• **Siguidi ag Madit** : chef de fraction Iduguriten, adjoint au maire
• **Mohammed ag Siguidi** : son fils, policier arrêté par Barkhane

**Relations intercommunautaires**
• Alliances matrimoniales avec les Touaregs
• Conflits avec les Peuls pour les pâturages
• Coopération économique (gardiennage de troupeaux)

🔗 Découvrez-en plus dans les contes et les ressources académiques.`,

  language: `🗣️ **La langue tadaksahak**

**Classification**
Langue berbère zénatique (famille afro-asiatique)

**Locuteurs**
Environ 30 000 personnes (Mali, Niger, diaspora)

**Caractéristiques linguistiques**
• **Phonologie** : système consonantique riche, voyelles orales
• **Morphologie** : distinction perfectif/imperfectif
• **Syntaxe** : ordre SOV (Sujet-Objet-Verbe)
• **Lexique** : mélange songhay (60%) + tamasheq (40%)

**Notre application propose :**
• 529+ mots répertoriés
• Grammaire complète (causatifs, passifs, relatives)
• Contes avec transcriptions
• Émissions radiophoniques

**Sources académiques**
• Christiansen-Bolli (2010) - A Grammar of Tadaksahak
• Christiansen & Levinsohn (2003) - Relative Clauses
• Kossmann (1999, 2001) - Phonologie du proto-berbère

📚 Apprenez le tadaksahak avec notre dictionnaire et notre grammaire premium !`,

  economy: `💰 **Économie de la région de Ménaka**

**Élevage (activité principale)**
• Chameaux (exportation vers le Niger et l'Algérie)
• Vaches (race locale adaptée à la sécheresse)
• Chèvres et moutons (consommation locale)

**Commerce transfrontalier**
• Bétail (Mali ↔ Niger)
• Marchandises (thé, sucre, tissus)
• Artisanat (objets en cuir, bijoux)

**Défis économiques**
• Sécheresses récurrentes
• Insécurité (groupes armés, banditisme)
• Manque d'infrastructures
• Isolement géographique

**Potentiel de développement**
• Écotourisme (paysages sahariens)
• Valorisation des produits locaux (lait, cuir)
• Filière chameau (viande, lait, poils)

📖 La région de Ménaka possède un fort potentiel économique encore sous-exploité.`
};

function handleMenakaIntent(text) {
  if (text.includes('histoire') || text.includes('historique') || text.includes('history') || text.includes('2000') || text.includes('2018')) {
    contextManager.add(text, 'MENAKA', { topic: 'history' });
    return MENAKA_RESPONSES.history;
  }
  if (text.includes('peuple') || text.includes('people') || text.includes('dawsahaq') || text.includes('personne') || text.includes('personnalité')) {
    return MENAKA_RESPONSES.people;
  }
  if (text.includes('langue') || text.includes('language') || text.includes('tadaksahak') || text.includes('parle')) {
    return MENAKA_RESPONSES.language;
  }
  if (text.includes('économie') || text.includes('economic') || text.includes('commerce') || text.includes('élevage')) {
    return MENAKA_RESPONSES.economy;
  }
  return MENAKA_RESPONSES.general;
}

// ------------------------------
// RÉPONSES POUR LES RESSOURCES ACADÉMIQUES (ENRICHIE)
// ------------------------------
function handleAcademicIntent(text) {
  let response = "🎙️ **Ressources académiques disponibles :**\n\n";
  
  if (text.includes('podcast') || text.includes('souag') || text.includes('lacito')) {
    response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    response += "🔹 **Podcast : La linguistique historique au Sahara**\n";
    response += "   🎙️ **Invité** : Dr. Lameen Souag (CNRS-LACITO)\n";
    response += "   📅 **Date** : 22 janvier 2018\n";
    response += "   ⏱️ **Durée** : ~45 minutes\n";
    response += "   🔗 **Lien** : https://www.themaghribpodcast.com/2018/01/la-linguistique-historique-au-sahara.html\n";
    response += "\n   **Thèmes abordés** :\n";
    response += "   • Méthode comparative en linguistique\n";
    response += "   • Histoire des langues sahariennes\n";
    response += "   • Berbère, touareg, songhay, zenaga\n";
    response += "   • Contacts linguistiques au Sahara\n\n";
  }
  
  if (text.includes('gremont') || text.includes('hérodote') || text.includes('violence')) {
    response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    response += "🔹 **Article : Dans le piège des offres de violence**\n";
    response += "   ✍️ **Auteur** : Charles Grémont\n";
    response += "   📚 **Revue** : Hérodote, n°172 (2019)\n";
    response += "   🏷️ **Éditeur** : La Découverte\n";
    response += "   🔗 **DOI** : 10.3917/her.172.0043\n";
    response += "\n   **Résumé** :\n";
    response += "   • Concurrences entre Dawsahaq et Peuls\n";
    response += "   • Rôle de Barkhane dans la région\n";
    response += "   • Arrestation de Mohammed ag Siguidi\n";
    response += "   • Cycles de violence à Ménaka (2000-2018)\n\n";
  }
  
  if (text.includes('christiansen') || text.includes('levinsohn')) {
    response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    response += "🔹 **Référence : Relative Clauses in Tadaksahak**\n";
    response += "   ✍️ **Auteurs** : Niels Christiansen & Stephen Levinsohn\n";
    response += "   📅 **Année** : 2003\n";
    response += "   📚 **Source** : SIL Electronic Working Papers\n";
    response += "\n   **Contenu** :\n";
    response += "   • Les 3 stratégies de relativisation\n";
    response += "   • Analyse détaillée de 'ayo/ayondo'\n";
    response += "   • La gap strategy (∅)\n";
    response += "   • Le marqueur 'sa' (non-restrictif)\n\n";
  }
  
  if (text.includes('kossmann')) {
    response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    response += "🔹 **Référence : Essai sur la phonologie du proto-berbère**\n";
    response += "   ✍️ **Auteur** : Maarten Kossmann\n";
    response += "   📅 **Année** : 1999\n";
    response += "   📚 **Éditeur** : Rüdiger Köppe\n";
    response += "\n   **Thèmes** :\n";
    response += "   • Reconstruction du système phonologique\n";
    response += "   • Évolution des consonnes et voyelles\n";
    response += "   • Comparaison des dialectes berbères\n\n";
  }
  
  if (text.includes('christiansen-bolli')) {
    response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    response += "🔹 **Référence : A Grammar of Tadaksahak**\n";
    response += "   ✍️ **Auteur** : Regula Christiansen-Bolli\n";
    response += "   📅 **Année** : 2010\n";
    response += "   📚 **Éditeur** : Rüdiger Köppe\n";
    response += "\n   **Contenu** :\n";
    response += "   • Phonologie détaillée\n";
    response += "   • Morphologie verbale et nominale\n";
    response += "   • Syntaxe complète\n";
    response += "   • Textes annotés\n\n";
  }
  
  response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  response += "📚 **Accès aux ressources** :\n";
  response += "• Section **Ressources académiques** de l'application\n";
  response += "• Section **Livres** pour les ouvrages complets\n";
  response += "• Section **Grammaire** pour les concepts linguistiques\n";
  response += "• Liens directs vers Cairn.info et autres plateformes\n\n";
  response += "💡 Tapez 'podcast Souag', 'article Grémont', ou 'grammaire Christiansen' pour plus de détails.";
  
  return response;
}

// ------------------------------
// RÉPONSES POUR LES STATISTIQUES (ENRICHIE)
// ------------------------------
function handleStatsIntent(text) {
  const stats = [];
  
  stats.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  stats.push("📊 **STATISTIQUES DE L'APPLICATION**");
  stats.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  if (window.vocabulaire) {
    stats.push(`\n📖 **Dictionnaire**`);
    stats.push(`   • Mots répertoriés : ${window.vocabulaire.length}`);
    stats.push(`   • Catégories : verbes, noms, adjectifs, pronoms...`);
  }
  
  if (window.themesData && window.themesData.themes) {
    const totalMots = window.themesData.themes.reduce((acc, t) => acc + (t.mots?.length || 0), 0);
    stats.push(`\n📚 **Thèmes**`);
    stats.push(`   • Thèmes disponibles : ${window.themesData.themes.length}`);
    stats.push(`   • Mots thématiques : ${totalMots}`);
  }
  
  if (window.livresConnaissance && window.livresConnaissance.livres) {
    stats.push(`\n📚 **Bibliothèque**`);
    stats.push(`   • Livres disponibles : ${window.livresConnaissance.livres.length}`);
  }
  
  if (window.contesData) {
    const contesCount = Array.isArray(window.contesData) ? window.contesData.length : 1;
    stats.push(`\n📖 **Contes**`);
    stats.push(`   • Contes disponibles : ${contesCount}`);
  }
  
  if (window.emissionsData) {
    const emissionsCount = Array.isArray(window.emissionsData) ? window.emissionsData.length : 1;
    stats.push(`\n🎙️ **Émissions**`);
    stats.push(`   • Émissions disponibles : ${emissionsCount}`);
  }
  
  stats.push(`\n👥 **Utilisateurs**`);
  stats.push(`   • Visites totales : ${localStorage.getItem('tadaksahak_visit_count') || 0}`);
  stats.push(`   • Session en cours : ${Math.floor((Date.now() - (userPreferences.sessionStart || Date.now())) / 60000)} minutes`);
  
  stats.push(`\n⭐ **Favoris**`);
  stats.push(`   • Mots sauvegardés : ${window.favoris?.length || 0}`);
  
  stats.push(`\n📈 **Progression utilisateur**`);
  stats.push(`   • Mots connus : ${userVocab.getKnownWordsCount()}`);
  stats.push(`   • Progression : ${userVocab.getProgress()}%`);
  stats.push(`   • Mots à réviser : ${userVocab.getWeakWords().length}`);
  
  stats.push(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  stats.push(`💡 Plus vous utilisez l'application, plus ces statistiques s'améliorent !`);
  
  return stats.join('\n');
}

// ------------------------------
// RÉPONSES POUR LE QUIZ
// ------------------------------
const QUIZ_QUESTIONS = [
  { question: "Que signifie 'báy' en tadaksahak ?", options: ["Pouvoir", "Vivre", "Tout", "Chameau"], answer: 0 },
  { question: "Quelle est la signification de 'yiddár' ?", options: ["Pouvoir", "Être en vie", "Tout", "Chameau"], answer: 1 },
  { question: "Que veut dire 'a-rgán' ?", options: ["Chien", "Cheval", "Chameau", "Âne"], answer: 2 },
  { question: "Comment dit-on 'blanc' en tadaksahak ?", options: ["Bibi", "Kooray", "Ciday", "Yaray-an"], answer: 1 },
  { question: "Quel est le pronom relatif pour les noms définis au singulier ?", options: ["Sa", "Ayo", "Ayondo", "∅"], answer: 1 },
  { question: "Que signifie 'hánfi' ?", options: ["Chien", "Chat", "Cheval", "Chèvre"], answer: 0 },
  { question: "Comment dit-on '2' en tadaksahak ?", options: ["A-ffó", "Kaaráḍ", "Hiŋká", "Akkóz"], answer: 2 },
  { question: "Quel préfixe forme le causatif ?", options: ["t-", "s-", "n-", "m-"], answer: 1 },
  { question: "Où se trouve Ménaka ?", options: ["Niger", "Mali", "Burkina", "Algérie"], answer: 1 },
  { question: "Que signifie 'baarí' ?", options: ["Chameau", "Âne", "Cheval", "Mouton"], answer: 2 }
];

let currentQuiz = null;
let quizScore = 0;
let quizIndex = 0;

function handleQuizIntent(text) {
  if (text.includes('question suivante') || text.includes('next')) {
    if (currentQuiz && quizIndex < QUIZ_QUESTIONS.length) {
      return displayQuizQuestion();
    }
  }
  
  if (text.includes('score') || text.includes('résultat')) {
    return `📊 **Votre score au dernier quiz :** ${quizScore}/${QUIZ_QUESTIONS.length} (${Math.round(quizScore/QUIZ_QUESTIONS.length*100)}%)\n\n💡 Voulez-vous refaire un quiz ? Tapez "quiz" ou "question".`;
  }
  
  // Démarrer un nouveau quiz
  quizIndex = 0;
  quizScore = 0;
  currentQuiz = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 5);
  return displayQuizQuestion();
}

function displayQuizQuestion() {
  if (quizIndex >= currentQuiz.length) {
    const result = `🏆 **Quiz terminé !**\n\nVotre score : ${quizScore}/${currentQuiz.length} (${Math.round(quizScore/currentQuiz.length*100)}%)\n\n${quizScore === currentQuiz.length ? "Parfait ! Vous maîtrisez le sujet ! 🌟" : quizScore >= currentQuiz.length/2 ? "Bon travail ! Continuez à apprendre ! 👍" : "Continuez à étudier, vous progresserez ! 💪"}\n\n📚 Revoir le dictionnaire ou la grammaire peut vous aider.`;
    currentQuiz = null;
    return result;
  }
  
  const q = currentQuiz[quizIndex];
  let response = `❓ **Question ${quizIndex + 1}/${currentQuiz.length}**\n\n`;
  response += `${q.question}\n\n`;
  response += `**Options :**\n`;
  q.options.forEach((opt, i) => {
    response += `${i + 1}. ${opt}\n`;
  });
  response += `\n💡 Tapez le numéro de votre réponse (1, 2, 3 ou 4)`;
  
  // Stocker temporairement la réponse attendue
  window.expectedQuizAnswer = q.answer;
  
  return response;
}

// ------------------------------
// RÉPONSES POUR LA PRONONCIATION
// ------------------------------
function handlePronunciationIntent(text) {
  const match = text.match(/(?:prononce|pronounce|comment se prononce|how to pronounce)\s+['"]?([a-z-]+)['"]?/i);
  
  if (match && match[1]) {
    const word = match[1].toLowerCase();
    const result = searchDictionaryMultilingual(word);
    
    if (result.length > 0) {
      const mot = result[0].mot;
      return `🔊 **Prononciation de "${mot}"**\n\n• Se prononce : \`${mot}\`\n• Syllabes : ${mot.split('').join('-')}\n• Accent tonique sur la première syllabe\n\n💡 Pour entendre la prononciation, consultez la fiche du mot dans le dictionnaire (si disponible).\n\n📖 Tapez "définition ${mot}" pour plus d'informations.`;
    }
  }
  
  return `🔊 **Conseils de prononciation en tadaksahak**

• **Les voyelles** : a, e, i, o, u (comme en français)
• **Consonnes particulières** :
  - 'ɣ' (gamma) : son guttural (comme le 'r' parisien)
  - 'ʃ' (ech) : 'ch' comme dans 'chat'
  - 'ʒ' (ej) : 'j' comme dans 'jour'
  - 'ŋ' (eng) : 'ng' comme dans 'pingouin'

• **Accent tonique** : généralement sur la première syllabe
• **Longueur des voyelles** : peut changer le sens

💡 Pour apprendre la prononciation, écoutez les enregistrements audio (section Audio) et répétez.`;
}

// ------------------------------
// RÉPONSES POUR LES FEEDBACKS
// ------------------------------
function handleFeedbackIntent(text) {
  learningSystem.recordFeedback(text, "Feedback reçu", true);
  
  return `🙏 **Merci pour votre feedback !**

Votre avis est précieux pour améliorer Tadaksahak Learning.

📧 Vous pouvez aussi nous contacter directement par email pour des suggestions détaillées.

💡 Une idée d'amélioration ? N'hésitez pas à la partager !`;
}

// ------------------------------
// RÉPONSES POUR LES COMPLIMENTS
// ------------------------------
function handleComplimentIntent(text) {
  const responses = [
    "🙏 Merci beaucoup ! C'est un plaisir de vous aider à découvrir la langue tadaksahak.",
    "🌟 Vous êtes trop gentil(se) ! La culture Idaksahak mérite d'être connue.",
    "💫 Votre encouragement me va droit au cœur. Ensemble, préservons cette belle langue !",
    "🎓 Merci ! N'hésitez pas à explorer les autres sections de l'application.",
    "📚 Votre motivation est inspirante. Continuez à apprendre le tadaksahak !"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// ------------------------------
// RÉPONSES POUR LE MENU
// ------------------------------
function handleMenuIntent() {
  return `📋 **SECTIONS DE L'APPLICATION**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏠 **Accueil** - Présentation et actualités
📖 **Dictionnaire** - 529+ mots en tadaksahak
📚 **Grammaire** - Verbes, relatives, pronoms, adjectifs...
📖 **Contes** - Légendes et histoires traditionnelles
🎙️ **Émissions** - Archives radiophoniques
💬 **Chat** - Moi-même (Hamadine)
🎧 **Audio** - Pistes sonores
🖼️ **Photos** - Galerie historique
🎥 **Vidéos** - Contenus audiovisuels
📚 **Livres** - Bibliothèque
📄 **Rapports** - Documents
📰 **Actualités** - Infos récentes
❓ **Quiz** - Testez vos connaissances
🃏 **Flashcards** - Cartes mémoire
📚 **Thèmes** - Vocabulaire par catégorie
📅 **Timeline** - Ligne du temps historique
🗺️ **Carte** - Zones Idaksahak
🔍 **Recherche** - Recherche plein texte
📊 **Dashboard** - Votre progression
📚 **Ressources académiques** - Podcasts, articles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 **Raccourcis clavier :**
Alt+D → Dictionnaire | Alt+C → Chat | Alt+F → Flashcards
Alt+L → Livres | Alt+T → Thèmes | Alt+G → Grammaire

📖 Que souhaitez-vous explorer ?`;
}

// ------------------------------
// RÉPONSES POUR L'AIDE (COMPLÈTE)
// ------------------------------
function handleHelpIntent() {
  return `🤖 **AIDE - HAMADINE LE CHAT BOT**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**📖 RECHERCHE DE MOTS**
• "Que signifie [mot] ?" → Définition
• "Comment dit-on [mot] en tadaksahak ?" → Traduction
• "[mot]" → Recherche directe

**📚 GRAMMAIRE**
• "Explique les causatifs" → Verbes causatifs
• "C'est quoi les relatives ?" → 3 stratégies
• "Les pronoms personnels" → Tableau complet
• "La négation" → Formes nǝ- et sǝ-
• "Les numéraux" → Nombres 1-1000
• "Les adjectifs" → Accord en nombre

**📖 CONTES**
• "Raconte-moi un conte" → Conte aléatoire
• "Raconte le chacal" → Conte spécifique
• "Raconte le lion" → Le lion et le lièvre
• "Raconte la hyène" → La hyène et le serpent
• "Raconte la tortue" → La tortue et l'aigle

**📍 MÉNAKA / CULTURE**
• "Où est Ménaka ?" → Géographie
• "Qui sont les Idaksahak ?" → Présentation
• "Histoire de Ménaka" → 2000-2018
• "Culture Idaksahak" → Traditions
• "Mariage Idaksahak" → Rituels
• "Économie de Ménaka" → Élevage, commerce

**🎙️ RESSOURCES ACADÉMIQUES**
• "Podcast Souag" → Épisode CNRS-LACITO
• "Article Grémont" → Hérodote n°172
• "Christiansen grammar" → Grammaire de référence

**📊 STATISTIQUES**
• "Combien de mots ?" → 529+ mots
• "Statistiques" → Données complètes
• "Ma progression" → Mots connus

**❓ QUIZ**
• "Quiz" → Commencer un quiz
• "Question suivante" → Question suivante
• "Score" → Résultat du quiz

**💡 COMMANDES RAPIDES**
• "menu" → Liste des sections
• "aide" → Ce message
• "stats" → Statistiques
• "prononce [mot]" → Conseils prononciation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Que puis-je faire pour vous aujourd'hui ?`;
}

// ------------------------------
// RÉPONSES POUR LES SALUTATIONS (MULTILINGUES)
// ------------------------------
function handleGreetingIntent(lang) {
  const greetings = {
    french: [
      "👋 Salam aleikum ! Je suis Hamadine, votre guide pour explorer la langue et la culture Tadaksahak.\n\n📖 **Ce que je peux faire :**\n• Traduire des mots (529+ dans le dictionnaire)\n• Expliquer la grammaire (causatifs, relatives, pronoms)\n• Raconter des contes traditionnels\n• Répondre sur l'histoire de Ménaka\n\n💡 Tapez **'aide'** pour toutes les commandes !",
      "🌞 Bonjour ! Prêt à découvrir un nouveau mot en tadaksahak ?\n\n🔍 Essayez de taper un mot comme **báy** (pouvoir) ou **yiddár** (vivre).\n\n📚 La culture Idaksahak n'attend que vous !",
      "🤝 Salam ! La langue tadaksahak est une richesse à préserver.\n\n💡 Tapez **'menu'** pour voir toutes les sections, ou **'quiz'** pour tester vos connaissances !"
    ],
    arabic: [
      "👋 مرحبا! أنا حمدين، مرشدكم لاستكشاف لغة وثقافة تدكساهق.\n\n📖 **ما يمكنني فعله:**\n• ترجمة الكلمات (أكثر من 529 كلمة في القاموس)\n• شرح القواعد\n• رواية الحكايات التقليدية\n• الإجابة عن تاريخ مناكا\n\n💡 اكتبوا 'مساعدة' لجميع الأوامر!",
      "🌞 سلام! هل أنتم مستعدون لاكتشاف كلمة جديدة في التدكساهق؟\n\n🔍 جربوا كتابة كلمة مثل **báy** أو **yiddár**.\n\n📚 ثقافة إدكساهق في انتظاركم!"
    ],
    english: [
      "👋 Hello! I am Hamadine, your guide to explore the Tadaksahak language and culture.\n\n📖 **What I can do:**\n• Translate words (529+ in the dictionary)\n• Explain grammar (causatives, relatives, pronouns)\n• Tell traditional tales\n• Answer about Ménaka's history\n\n💡 Type **'help'** for all commands!",
      "🌞 Hi! Ready to discover a new word in Tadaksahak?\n\n🔍 Try typing a word like **báy** (power) or **yiddár** (to live).\n\n📚 Idaksahak culture awaits you!"
    ]
  };
  
  const langMap = { french: 'french', arabic: 'arabic', english: 'english' };
  const selectedLang = langMap[lang] || 'french';
  const responses = greetings[selectedLang];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// ------------------------------
// RÉPONSES POUR LES REMERCIEMENTS
// ------------------------------
function handleThanksIntent(lang) {
  const thanks = {
    french: [
      "🙏 De rien ! La connaissance se partage, c'est ma mission.\n\n📚 N'hésitez pas à explorer le dictionnaire et la grammaire !",
      "💫 C'est un plaisir de vous aider. Voulez-vous découvrir un nouveau mot aujourd'hui ?",
      "🎓 À votre service ! Ensemble, préservons cette langue magnifique.\n\n💡 Tapez 'menu' pour voir toutes les sections."
    ],
    arabic: [
      "🙏 عفواً! المعرفة تنتقل بالمشاركة، هذه مهمتي.\n\n📚 لا تترددوا في استكشاف القاموس والقواعد!",
      "💫 يسعدني مساعدتكم. هل تريدون اكتشاف كلمة جديدة اليوم؟",
      "🎓 في خدمتكم! معاً نحافظ على هذه اللغة الجميلة."
    ],
    english: [
      "🙏 You're welcome! Knowledge is meant to be shared, that's my mission.\n\n📚 Feel free to explore the dictionary and grammar!",
      "💫 It's a pleasure to help you. Would you like to discover a new word today?",
      "🎓 At your service! Together, let's preserve this beautiful language."
    ]
  };
  
  const langMap = { french: 'french', arabic: 'arabic', english: 'english' };
  const selectedLang = langMap[lang] || 'french';
  const responses = thanks[selectedLang];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// ------------------------------
// RÉPONSES POUR LES AU REVOIR
// ------------------------------
function handleGoodbyeIntent(lang) {
  const goodbyes = {
    french: [
      "👋 Au revoir ! N'oubliez pas de consulter le mot du jour demain.\n\n📚 Revenez quand vous voulez pour enrichir votre vocabulaire !",
      "🌟 À bientôt sur Tadaksahak Learning ! Que la sagesse Idaksahak vous accompagne.\n\n💡 N'oubliez pas : chaque mot appris est un pas vers la préservation.",
      "📚 Revenez quand vous voulez. 529 mots vous attendent dans le dictionnaire !"
    ],
    arabic: [
      "👋 مع السلامة! لا تنسوا الاطلاع على كلمة اليوم غداً.\n\n📚 عودوا وقتما تشاؤون لإثراء مفرداتكم!",
      "🌟 نراكم قريباً على تدكساهق ليرنينغ! لتكن حكمة إدكساهق معكم.",
      "📚 عودوا وقتما تشاؤون. 529 كلمة في انتظاركم في القاموس!"
    ],
    english: [
      "👋 Goodbye! Don't forget to check the word of the day tomorrow.\n\n📚 Come back anytime to enrich your vocabulary!",
      "🌟 See you soon on Tadaksahak Learning! May Idaksahak wisdom guide you.",
      "📚 Come back anytime. 529 words await you in the dictionary!"
    ]
  };
  
  const langMap = { french: 'french', arabic: 'arabic', english: 'english' };
  const selectedLang = langMap[lang] || 'french';
  const responses = goodbyes[selectedLang];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// ------------------------------
// RÉPONSE PAR DÉFAUT (INTELLIGENTE)
// ------------------------------
function getDefaultResponse(query, lang) {
  // Vérifier si c'est une réponse à un quiz
  if (window.expectedQuizAnswer !== undefined && /^[1-4]$/.test(query)) {
    const answer = parseInt(query) - 1;
    const isCorrect = (answer === window.expectedQuizAnswer);
    
    if (isCorrect) {
      quizScore++;
      window.expectedQuizAnswer = undefined;
      quizIndex++;
      return "✅ **Bonne réponse !**\n\n" + displayQuizQuestion();
    } else {
      window.expectedQuizAnswer = undefined;
      quizIndex++;
      return "❌ **Mauvaise réponse...**\n\n" + displayQuizQuestion();
    }
  }
  
  // Suggestions personnalisées
  const suggestions = [
    "🔍 Pour chercher un mot : 'Que signifie báy ?'",
    "📚 Pour la grammaire : 'Explique les relatives'",
    "📖 Pour un conte : 'Raconte-moi une histoire'",
    "📍 Pour Ménaka : 'Où se trouve Ménaka ?'",
    "🎙️ Pour les ressources : 'Podcast Souag'",
    "❓ Pour un quiz : 'Quiz'"
  ];
  
  const defaultResponses = {
    french: [
      `🤔 Je n'ai pas bien compris.\n\n💡 **Suggestions :**\n${suggestions.map(s => `• ${s}`).join('\n')}\n\n📖 Tapez **'aide'** pour toutes les commandes.`,
      `📚 Je ne suis pas sûr de comprendre.\n\n🎯 **Essayez :**\n• Un mot du dictionnaire (ex: báy)\n• Une question de grammaire\n• Un conte traditionnel\n\n💡 Tapez **'menu'** pour voir toutes les sections.`
    ],
    arabic: [
      `🤔 لم أفهم جيداً.\n\n💡 **اقتراحات:**\n• ابحث عن كلمة (مثال: báy)\n• اسأل عن قواعد اللغة\n• اطلب حكاية تقليدية\n\n📖 اكتب 'مساعدة' لجميع الأوامر.`,
      `📚 لست متأكداً مما تقصد.\n\n💡 **جرب:**\n• كلمة من القاموس\n• سؤال عن القواعد\n• حكاية تقليدية`
    ],
    english: [
      `🤔 I didn't quite understand.\n\n💡 **Suggestions:**\n• Search for a word (e.g., báy)\n• Ask about grammar\n• Request a traditional tale\n\n📖 Type **'help'** for all commands.`,
      `📚 I'm not sure I understand.\n\n💡 **Try:**\n• A dictionary word\n• A grammar question\n• A traditional tale`
    ]
  };
  
  const langMap = { french: 'french', arabic: 'arabic', english: 'english' };
  const selectedLang = langMap[lang] || 'french';
  const responses = defaultResponses[selectedLang];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// ------------------------------
// FONCTION PRINCIPALE DE RÉPONSE (INTÉGRATION TOTALE)
// ------------------------------
function reponseBot(txt) {
  const clean = txt.trim();
  if (!clean) return "💬 Bonjour ! Tapez **'aide'** pour commencer.";
  
  // Correction automatique
  let corrected = clean;
  if (CHAT_CONFIG.enableAutoCorrect) {
    corrected = AUTO_CORRECT.apply(clean);
  }
  
  // Analyse de sentiment
  const sentiment = analyzeSentiment(corrected);
  conversationState.sentiment = sentiment.sentiment;
  
  // Détection de la langue
  const detected = detectLanguage(corrected);
  const userLang = detected.language;
  
  // Traduction interne pour analyse
  const translated = translateQuery(corrected);
  
  // Sauvegarde du contexte
  conversationState.lastQuestion = clean;
  conversationState.totalInteractions++;
  userPreferences.lastInteraction = Date.now();
  
  // 1. RECHERCHE DIRECTE DANS LE DICTIONNAIRE (mot isolé)
  const words = clean.split(/\s+/);
  if (words.length <= 2 && !clean.includes(' ') && clean.length > 2 && clean.length < 20) {
    const results = searchDictionaryMultilingual(clean);
    if (results.length > 0) {
      const best = results[0];
      let response = `📖 **${best.mot}**\n\n`;
      response += `🇫🇷 ${best.fr || '—'}\n`;
      response += `🇬🇧 ${best.en || '—'}\n`;
      response += `🇸🇦 ${best.ar || '—'}\n`;
      response += `\n📂 Catégorie : ${best.cat || 'mot'}`;
      userVocab.recordAttempt(best.mot, true);
      return response;
    }
  }
  
  // 2. DÉTECTION D'INTENTION (par ordre de priorité)
  const intentsByPriority = Object.entries(INTENTS).sort((a, b) => (b[1].priority || 0) - (a[1].priority || 0));
  
  for (const [intentName, intentData] of intentsByPriority) {
    if (intentData.patterns.some(pattern => corrected.toLowerCase().includes(pattern.toLowerCase()) || translated.includes(pattern.toLowerCase()))) {
      contextManager.add(clean, intentName);
      
      if (intentData.response) {
        let extracted = null;
        if (intentData.extractTarget) extracted = intentData.extractTarget(corrected);
        if (intentData.extractWord) {
          const word = intentData.extractWord(corrected);
          if (word) extracted = { word };
        }
        if (intentData.extractTale) {
          const tale = intentData.extractTale(corrected);
          if (tale) extracted = { tale };
        }
        if (intentData.extractTopic) {
          const topic = intentData.extractTopic(corrected);
          if (topic) extracted = { topic };
        }
        
        const response = intentData.response(corrected, extracted);
        if (response) return response;
      }
    }
  }
  
  // 3. RECHERCHE SUR MÉNAKA / IDAKSAHAK
  const menakaKeywords = ['ménaka', 'menaka', 'idaksahak', 'dawsahaq', 'iwellemmedan', 'mali', 'niger', 'gao', 'tombouctou', 'kidal', 'ansongo', 'talatayt'];
  if (menakaKeywords.some(k => corrected.includes(k))) {
    return handleMenakaIntent(corrected);
  }
  
  // 4. RECHERCHE SUR LES RESSOURCES ACADÉMIQUES
  const academicKeywords = ['podcast', 'souag', 'gremont', 'académique', 'cairn', 'hérodote', 'christiansen', 'levinsohn', 'kossmann', 'heath', 'lacito', 'cnrs'];
  if (academicKeywords.some(k => corrected.includes(k))) {
    return handleAcademicIntent(corrected);
  }
  
  // 5. RECHERCHE DANS LES LIVRES (connaissance)
  const bookResults = searchBooks(corrected);
  if (bookResults.length > 0) {
    const best = bookResults[0];
    return `📖 **D'après « ${best.livre} » (${best.auteur})**\n\nChapitre ${best.chapitre} — « ${best.titre} » :\n\n_"${best.texte.substring(0, 400)}..."_\n\n💡 Posez-moi d'autres questions sur ce livre !`;
  }
  
  // 6. RÉPONSE PAR DÉFAUT
  return getDefaultResponse(corrected, userLang);
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
  
  // Ajouter à l'historique
  chatHistory.push({ user, message: html, timestamp: Date.now(), language: detectLanguage(html).language });
  if (chatHistory.length > CHAT_CONFIG.maxHistory) chatHistory.shift();
  
  // Sauvegarder les suggestions
  if (user === 'user') {
    suggestionEngine.recordQuestion(html);
  }
}

// ------------------------------
// INDICATEUR DE FRAPPE
// ------------------------------
let typingTimeout = null;

function showTypingIndicator() {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;
  
  const existing = document.getElementById("typingIndicator");
  if (existing) return;
  
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

// ------------------------------
// TRAITEMENT DE LA SAISIE
// ------------------------------
function traiterSaisie() {
  const input = document.getElementById("chatInput");
  const txt = input?.value.trim();
  if (!txt) return;
  
  input.value = "";
  input.disabled = true;
  
  afficheMsg("user", escapeHtml(txt));
  
  if (CHAT_CONFIG.showTypingIndicator) {
    showTypingIndicator();
  }
  
  if (typingTimeout) clearTimeout(typingTimeout);
  
  typingTimeout = setTimeout(() => {
    if (CHAT_CONFIG.showTypingIndicator) {
      hideTypingIndicator();
    }
    const reponse = reponseBot(txt);
    afficheMsg("bot", reponse);
    input.disabled = false;
    input.focus();
  }, CHAT_CONFIG.typingDelay);
}

// ------------------------------
// FONCTIONS UTILITAIRES
// ------------------------------
function searchDictionaryMultilingual(query) {
  if (!window.vocabulaire || !window.vocabulaire.length) return [];
  
  const cleanQuery = query.toLowerCase().trim();
  const results = [];
  const maxDist = Math.max(2, Math.floor(cleanQuery.length * 0.3));
  
  for (const item of window.vocabulaire) {
    let score = Infinity;
    
    if (item.mot.toLowerCase() === cleanQuery) {
      score = 0;
    } else if (item.mot.toLowerCase().includes(cleanQuery)) {
      score = 1;
    } else if (item.fr && normalizeText(item.fr).includes(normalizeText(cleanQuery))) {
      score = 2;
    } else if (item.en && normalizeText(item.en).includes(normalizeText(cleanQuery))) {
      score = 3;
    } else if (item.ar && normalizeText(item.ar).includes(normalizeText(cleanQuery))) {
      score = 4;
    } else if (item.mot) {
      const dist = levenshtein(item.mot.toLowerCase(), cleanQuery);
      if (dist <= maxDist) score = 5 + dist;
    }
    
    if (score < Infinity) {
      results.push({ item, score });
    }
  }
  
  results.sort((a, b) => a.score - b.score);
  return results.slice(0, CHAT_CONFIG.maxSearchResults).map(r => r.item);
}

function searchBooks(query) {
  if (!window.livresConnaissance || !window.livresConnaissance.livres) return [];
  
  const cleanQuery = query.toLowerCase();
  const results = [];
  
  for (const livre of window.livresConnaissance.livres) {
    for (const chunk of livre.chunks) {
      let score = 0;
      const chunkText = chunk.texte.toLowerCase();
      const chunkKeywords = chunk.mots_cles?.map(k => k.toLowerCase()) || [];
      
      if (chunkText.includes(cleanQuery)) score += 2;
      for (const keyword of chunkKeywords) {
        if (cleanQuery.includes(keyword) || keyword.includes(cleanQuery)) score += 3;
      }
      
      if (score > 0) {
        results.push({
          livre: livre.titre,
          auteur: livre.auteur,
          chapitre: chunk.chapitre,
          titre: chunk.titre,
          texte: chunk.texte.substring(0, 500),
          score
        });
      }
    }
  }
  
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 3);
}

function chercherDansThemes(txt) {
  if (!window.themesData || !window.themesData.themes) return null;
  
  const motsCles = txt.toLowerCase().split(/\s+/);
  
  for (const theme of window.themesData.themes) {
    const titre = (theme.titre_fr || '').toLowerCase();
    const description = (theme.description_fr || '').toLowerCase();
    
    for (const mot of motsCles) {
      if (mot.length < 3) continue;
      if (titre.includes(mot) || description.includes(mot)) {
        return {
          titre: theme.titre_fr,
          description: theme.description_fr,
          mots: theme.mots?.slice(0, 8) || []
        };
      }
    }
  }
  return null;
}

// ------------------------------
// SUGGESTIONS INTELLIGENTES
// ------------------------------
function updateChatSuggestions() {
  const suggestions = suggestionEngine.getSuggestions(conversationState.currentTopic, userPreferences.learningLevel);
  const btns = document.querySelectorAll('.chat-suggestion');
  
  if (btns.length >= 3) {
    const defaultSuggestions = [
      "📖 Chercher un mot",
      "📚 Histoire de Ménaka",
      "🎵 Culture Idaksahak"
    ];
    
    btns.forEach((btn, i) => {
      const suggestion = suggestions[i] || defaultSuggestions[i];
      btn.textContent = suggestion;
      btn.onclick = () => {
        const input = document.getElementById("chatInput");
        if (input) {
          input.value = suggestion;
          traiterSaisie();
        }
      };
    });
  }
}

// ------------------------------
// INITIALISATION DU CHAT
// ------------------------------
function initChat() {
  const chatInput = document.getElementById("chatInput");
  const btnEnvoyer = document.getElementById("btnEnvoyer");
  
  if (btnEnvoyer) btnEnvoyer.addEventListener("click", traiterSaisie);
  if (chatInput) chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") traiterSaisie();
  });
  
  updateChatSuggestions();
  
  // Réinitialiser le quiz
  window.expectedQuizAnswer = undefined;
  
  // Message de bienvenue
  setTimeout(() => {
    if (chatHistory.length === 0) {
      afficheMsg("bot", "👋 Salam aleikum ! Je suis **Hamadine**, votre guide pour explorer la langue et la culture **Tadaksahak**.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📖 **Ce que je peux faire :**\n• 🔍 Traduire des mots (529+ dans le dictionnaire)\n• 📚 Expliquer la grammaire (causatifs, relatives, pronoms)\n• 📖 Raconter des contes traditionnels\n• 📍 Répondre sur l'histoire de Ménaka\n• 🎙️ Partager des ressources académiques\n• ❓ Faire des quiz\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 **Pour commencer :**\n• Tapez **'aide'** pour toutes les commandes\n• Tapez **'menu'** pour voir les sections\n• Tapez **'báy'** pour un exemple de traduction\n• Tapez **'quiz'** pour tester vos connaissances\n\n📚 Que souhaitez-vous apprendre aujourd'hui ?");
    }
  }, 500);
  
  // Enregistrer le début de session
  userPreferences.sessionStart = Date.now();
}

// ------------------------------
// EXPORT GLOBAL
// ------------------------------
window.reponseBot = reponseBot;
window.traiterSaisie = traiterSaisie;
window.initChat = initChat;
window.chatHistory = chatHistory;
window.searchDictionaryMultilingual = searchDictionaryMultilingual;
window.detectLanguage = detectLanguage;
window.userVocab = userVocab;
window.contextManager = contextManager;
window.suggestionEngine = suggestionEngine;
window.learningSystem = learningSystem;

// Initialisation automatique si le DOM est chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChat);
} else {
  initChat();
}
