// ============================================
// MODULE - CHAT BOT HAMADINE
// Version ultime - Multilingue, contextuelle, intelligente
// Comprend 3 langues (français, arabe, anglais) + tadaksahak
// ============================================

// ------------------------------
// CONFIGURATION CENTRALE
// ------------------------------
const CHAT_CONFIG = {
  typingDelay: 200,
  maxHistory: 100,
  showTypingIndicator: true,
  enableContextMemory: true,
  contextMemorySize: 10,
  enableLearning: true,
  enablePronunciation: true,
  maxSearchResults: 5,
  debugMode: false
};

// ------------------------------
// ÉTAT DU CHAT
// ------------------------------
let chatHistory = [];
let currentContext = [];
let userPreferences = {
  preferredLanguage: 'fr',
  learningLevel: 'beginner',
  favoriteTopics: []
};
let conversationState = {
  lastQuestion: null,
  waitingForAnswer: false,
  pendingAction: null
};

// ------------------------------
// DÉTECTION DE LANGUE (FR/AR/EN/TAD)
// ------------------------------
const LANGUAGE_DETECTION = {
  french: {
    patterns: ['bonjour', 'salut', 'comment', 'pourquoi', 'est-ce que', 'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'le', 'la', 'les', 'un', 'une', 'des', 'merci', 'au revoir', 's\'il vous plaît', 's\'il te plaît', 'quel', 'quelle', 'quels', 'quelles', 'combien', 'où', 'quand', 'comment', 'pourquoi'],
    confidence: 0
  },
  arabic: {
    patterns: ['مرحبا', 'سلام', 'كيف', 'لماذا', 'هل', 'أنا', 'أنت', 'هو', 'هي', 'نحن', 'أنتم', 'هم', 'ال', 'و', 'في', 'من', 'إلى', 'عن', 'على', 'شكرا', 'مع السلامة', 'من فضلك', 'ماذا', 'أين', 'متى', 'كم'],
    confidence: 0
  },
  english: {
    patterns: ['hello', 'hi', 'how', 'why', 'what', 'where', 'when', 'who', 'which', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'thank', 'thanks', 'goodbye', 'please', 'how much', 'how many'],
    confidence: 0
  },
  tadaksahak: {
    patterns: ['báy', 'yiddár', 'káamil', 'rgán', 'yáw', 'hánfi', 'baarí', 'farká', 'bibi', 'kooray', 'ciday', 'a-rgán', 'a-lágod', 'hinciní', 'ay', 'a-ffó', 'hinká', 'kaaráḍ', 'akkóz', 'ʃammúʃ', 'ʃaadíʃ', 'iffá', 'ittám', 'taasá', 'maará'],
    confidence: 0
  }
};

function detectLanguage(text) {
  const cleanText = text.toLowerCase();
  
  // Réinitialiser les scores
  for (let lang in LANGUAGE_DETECTION) {
    LANGUAGE_DETECTION[lang].confidence = 0;
  }
  
  // Compter les correspondances
  for (let lang in LANGUAGE_DETECTION) {
    const patterns = LANGUAGE_DETECTION[lang].patterns;
    let score = 0;
    for (const pattern of patterns) {
      if (cleanText.includes(pattern)) {
        score += 1;
      }
    }
    LANGUAGE_DETECTION[lang].confidence = score / patterns.length;
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
  
  return { language: bestLang, confidence: bestScore };
}

// ------------------------------
// TRADUCTION INTERNE (pour comprendre les requêtes)
// ------------------------------
const TRANSLATION_MAP = {
  // Mots interrogatifs
  'what': ['quoi', 'que', 'qu\'est-ce', 'ماذا', 'what'],
  'how': ['comment', 'كيف', 'how'],
  'why': ['pourquoi', 'لماذا', 'why'],
  'where': ['où', 'أين', 'where'],
  'when': ['quand', 'متى', 'when'],
  'who': ['qui', 'من', 'who'],
  'which': ['quel', 'quelle', 'أي', 'which'],
  
  // Actions
  'say': ['dit', 'dis', 'comment dit-on', 'dire', 'traduire', 'translate', 'say', 'يقول', 'كيف نقول'],
  'mean': ['signifie', 'veut dire', 'meaning', 'معنى', 'means'],
  'search': ['cherche', 'trouve', 'recherche', 'بحث', 'find', 'search'],
  'explain': ['explique', 'explain', 'شرح', 'explain'],
  'tell': ['raconte', 'tell', 'احكي', 'tell'],
  'show': ['montre', 'affiche', 'show', 'اعرض'],
  
  // Temps
  'past': ['passé', 'كان', 'past', 'former'],
  'present': ['présent', 'يكون', 'present', 'current'],
  'future': ['futur', 'سيكون', 'future', 'will'],
  
  // Grammaire
  'causative': ['causatif', 'causative', 'سببي'],
  'passive': ['passif', 'passive', 'مجهول'],
  'relative': ['relative', 'proposition', 'relatif', 'الموصولة'],
  'pronoun': ['pronom', 'pronoun', 'ضمير'],
  'adjective': ['adjectif', 'adjective', 'صفة'],
  'verb': ['verbe', 'verb', 'فعل'],
  'noun': ['nom', 'noun', 'اسم'],
  
  // Culture
  'menaka': ['ménaka', 'menaka', 'منكا'],
  'idaksahak': ['idaksahak', 'dawsahaq', 'ادكساهق'],
  'culture': ['culture', 'ثقافة', 'custom'],
  'history': ['histoire', 'تاريخ', 'history'],
  'tradition': ['tradition', 'تقليد', 'tradition'],
  
  // Opérateurs
  'in': ['en', 'dans', 'في', 'in'],
  'to': ['à', 'إلى', 'to'],
  'from': ['de', 'من', 'from'],
  'and': ['et', 'و', 'and'],
  'or': ['ou', 'أو', 'or']
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
// EXTRACTION D'INTENTION
// ------------------------------
const INTENTS = {
  TRANSLATION: {
    patterns: [
      'comment dit-on', 'comment dire', 'traduire', 'translate', 'que signifie', 'what does', 'meaning of',
      'كيف نقول', 'ماذا يعني', 'معنى', 'كيف تقال', 'dit-on', 'se dit', 'équivalent', 'tadaksahak de',
      'français de', 'anglais de', 'arabe de'
    ],
    extractTarget: (text) => {
      // Extraire "X en Y" ou "comment dit-on X en Y"
      const patterns = [
        /comment dit-on\s+([^?en]+)(?:\s+en\s+(\w+))?/i,
        /que signifie\s+([^?]+)/i,
        /what does\s+([^?]+)\s+mean/i,
        /traduire\s+([^\s]+)\s+en\s+(\w+)/i,
        /([^\s]+)\s+en\s+(\w+)/i,
        /كيف نقول\s+([^?]+)/i,
        /ماذا يعني\s+([^?]+)/i
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
    }
  },
  
  DEFINITION: {
    patterns: [
      'que veut dire', 'c\'est quoi', 'définition de', 'signification de', 'qu\'est-ce que',
      'what is', 'define', 'meaning of', 'definition of',
      'ماذا يعني', 'ما معنى', 'تعريف'
    ],
    extractWord: (text) => {
      const patterns = [
        /(?:que veut dire|c\'est quoi|définition de|signification de|qu\'est-ce que)\s+([^?]+)/i,
        /(?:what is|define|meaning of|definition of)\s+([^?]+)/i,
        /ما معنى\s+([^?]+)/i,
        /تعريف\s+([^?]+)/i
      ];
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return match[1]?.trim();
      }
      return null;
    }
  },
  
  GRAMMAR: {
    patterns: [
      'grammaire', 'conjugaison', 'causatif', 'passif', 'relative', 'pronom', 'adjectif',
      'grammar', 'conjugation', 'causative', 'passive', 'relative clause', 'pronoun', 'adjective',
      'قواعد', 'صرف', 'سببية', 'مجهول', 'موصولة', 'ضمير', 'صفة'
    ],
    extractTopic: (text) => {
      const topics = {
        causative: ['causatif', 'causative', 'سببية'],
        passive: ['passif', 'passive', 'مجهول'],
        relative: ['relative', 'proposition', 'موصولة', 'ayo', 'ayondo', 'sa', 'gap'],
        pronoun: ['pronom', 'pronoun', 'ضمير'],
        adjective: ['adjectif', 'adjective', 'صفة'],
        verb: ['verbe', 'verb', 'فعل'],
        noun: ['nom', 'noun', 'اسم'],
        negation: ['négation', 'negation', 'نفي'],
        reciprocal: ['réciproque', 'reciprocal', 'متبادل']
      };
      
      for (const [topic, keywords] of Object.entries(topics)) {
        for (const keyword of keywords) {
          if (text.toLowerCase().includes(keyword)) {
            return topic;
          }
        }
      }
      return null;
    }
  },
  
  TALE: {
    patterns: [
      'raconte', 'conte', 'histoire', 'légende', 'récit', 'tell a story', 'tale', 'legend',
      'احكي', 'قصة', 'حكاية', 'أسطورة'
    ],
    extractTale: (text) => {
      const taleKeywords = ['chacal', 'phacochère', 'éléphant', 'lion', 'hyène', 'jackal', 'warthog', 'elephant'];
      for (const keyword of taleKeywords) {
        if (text.toLowerCase().includes(keyword)) {
          return keyword;
        }
      }
      return null;
    }
  },
  
  SEARCH: {
    patterns: [
      'cherche', 'trouve', 'recherche', 'find', 'search', 'look for', 'بحث عن', 'ابحث عن'
    ],
    extractQuery: (text) => {
      const patterns = [
        /(?:cherche|trouve|recherche)\s+([^?]+)/i,
        /(?:find|search for|look for)\s+([^?]+)/i,
        /ابحث عن\s+([^?]+)/i
      ];
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return match[1]?.trim();
      }
      return null;
    }
  },
  
  QUIZ: {
    patterns: [
      'quiz', 'question', 'test', 'exercice', 'interroge', 'question me', 'ask me',
      'اختبار', 'سؤال', 'امتحان'
    ]
  },
  
  HELP: {
    patterns: [
      'aide', 'help', 'assistance', 'tutoriel', 'que faire', 'commandes', 'what can you do',
      'مساعدة', 'تعليمات', 'ماذا تفعل'
    ]
  },
  
  MENU: {
    patterns: [
      'menu', 'sections', 'fonctionnalités', 'navigation', 'features', 'liste',
      'قائمة', 'أقسام', 'وظائف'
    ]
  },
  
  GREETING: {
    patterns: [
      'bonjour', 'salut', 'hello', 'hi', 'coucou', 'hey', 'salam', 'مرحبا', 'سلام', 'السلام عليكم'
    ]
  },
  
  THANKS: {
    patterns: [
      'merci', 'thanks', 'thank you', 'شكرا', 'شكراً'
    ]
  },
  
  GOODBYE: {
    patterns: [
      'au revoir', 'bye', 'adieu', 'à plus', 'à bientôt', 'goodbye', 'see you', 'مع السلامة'
    ]
  }
};

function detectIntent(text) {
  const cleanText = text.toLowerCase();
  const scores = {};
  
  for (const [intent, data] of Object.entries(INTENTS)) {
    scores[intent] = 0;
    for (const pattern of data.patterns) {
      if (cleanText.includes(pattern.toLowerCase())) {
        scores[intent] += 1;
      }
    }
  }
  
  // Trouver l'intention avec le meilleur score
  let bestIntent = null;
  let bestScore = 0;
  for (const [intent, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }
  
  return bestIntent;
}

// ------------------------------
// RECHERCHE MULTILINGUE DANS LE DICTIONNAIRE
// ------------------------------
function searchDictionaryMultilingual(query) {
  if (!window.vocabulaire || !window.vocabulaire.length) return [];
  
  const cleanQuery = query.toLowerCase().trim();
  const results = [];
  const maxDist = Math.max(2, Math.floor(cleanQuery.length * 0.3));
  
  for (const item of window.vocabulaire) {
    let score = Infinity;
    
    // Recherche exacte dans tadaksahak
    if (item.mot.toLowerCase() === cleanQuery) {
      score = 0;
    }
    // Recherche approximative dans tadaksahak
    else if (item.mot.toLowerCase().includes(cleanQuery)) {
      score = 1;
    }
    // Recherche dans les traductions françaises
    else if (item.fr && normalizeText(item.fr).includes(normalizeText(cleanQuery))) {
      score = 2;
    }
    // Recherche dans les traductions anglaises
    else if (item.en && normalizeText(item.en).includes(normalizeText(cleanQuery))) {
      score = 3;
    }
    // Recherche dans les traductions arabes
    else if (item.ar && normalizeText(item.ar).includes(normalizeText(cleanQuery))) {
      score = 4;
    }
    // Recherche par distance de Levenshtein
    else if (item.mot) {
      const dist = levenshtein(item.mot.toLowerCase(), cleanQuery);
      if (dist <= maxDist) {
        score = 5 + dist;
      }
    }
    
    if (score < Infinity) {
      results.push({ item, score });
    }
  }
  
  results.sort((a, b) => a.score - b.score);
  return results.slice(0, CHAT_CONFIG.maxSearchResults).map(r => r.item);
}

// ------------------------------
// RECHERCHE DANS LES LIVRES (connaissance)
// ------------------------------
function searchBooks(query) {
  if (!window.livresConnaissance || !window.livresConnaissance.livres) return [];
  
  const cleanQuery = query.toLowerCase();
  const results = [];
  
  for (const livre of window.livresConnaissance.livres) {
    for (const chunk of livre.chunks) {
      let score = 0;
      const chunkText = chunk.texte.toLowerCase();
      const chunkKeywords = chunk.mots_cles?.map(k => k.toLowerCase()) || [];
      
      if (chunkText.includes(cleanQuery)) {
        score += 2;
      }
      for (const keyword of chunkKeywords) {
        if (cleanQuery.includes(keyword) || keyword.includes(cleanQuery)) {
          score += 3;
        }
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

// ------------------------------
// RÉPONSES POUR LA TRADUCTION
// ------------------------------
function handleTranslationIntent(text) {
  const extracted = INTENTS.TRANSLATION.extractTarget(text);
  
  if (extracted && extracted.word) {
    const searchTerm = extracted.word.toLowerCase();
    const results = searchDictionaryMultilingual(searchTerm);
    
    if (results.length > 0) {
      const bestMatch = results[0];
      let response = `📖 **Traduction de "${extracted.word}" :**\n\n`;
      response += `🔹 **Tadaksahak** : ${bestMatch.mot}\n`;
      response += `🔹 **Français** : ${bestMatch.fr || '—'}\n`;
      response += `🔹 **English** : ${bestMatch.en || '—'}\n`;
      response += `🔹 **العربية** : ${bestMatch.ar || '—'}\n`;
      response += `\n📂 Catégorie : ${bestMatch.cat || 'mot'}`;
      return response;
    } else {
      return `🔍 Je n'ai pas trouvé "${extracted.word}" dans mon dictionnaire. Voulez-vous essayer avec un autre mot ?\n\n💡 Suggestions : báy (pouvoir), yiddár (vivre), a-rgán (chameau)`;
    }
  }
  
  return "📖 Pour traduire un mot, demandez-moi : 'Comment dit-on [mot] en tadaksahak ?' ou 'Que signifie [mot] ?'";
}

// ------------------------------
// RÉPONSES POUR LA DÉFINITION
// ------------------------------
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
      response += `🔹 **العربية** : ${bestMatch.ar || '—'}`;
      return response;
    } else {
      return `🔍 Je ne trouve pas la définition de "${word}".\n\n💡 Tapez le mot dans la barre de recherche du dictionnaire, ou essayez un autre mot.`;
    }
  }
  
  return "📖 Pour obtenir la définition d'un mot, demandez-moi : 'Que signifie [mot] ?' ou 'Définition de [mot]'";
}

// ------------------------------
// RÉPONSES POUR LA GRAMMAIRE
// ------------------------------
const GRAMMAR_RESPONSES = {
  causative: `📚 **Verbes causatifs en tadaksahak**

Le causatif se forme avec le préfixe **s-** (parfois **z-** ou **f-**).

**Exemples :**
• *dá* (faire) → *s-ágá* (faire faire)
• *nát* (donner) → *s-ākfá* (faire donner)
• *záw* (apporter) → *fī-fī-wit* (faire apporter)

📖 Les verbes d'origine songhay prennent des racines empruntées au tamasheq.
🔗 Consultez la section Grammaire pour plus d'exemples.`,

  passive: `📚 **Verbes passifs en tadaksahak**

Le passif se forme avec le préfixe **t-** (parfois **tūw-**).

**Exemples :**
• *dá* (faire) → *t-āgá* (être fait)
• *záw* (apporter) → *āwīt* (être apporté)
• *wís* (tuer) → *tūw-anyā* (être tué)

📖 Le passif transforme l'objet en sujet de la phrase.
🔗 Consultez la section Grammaire pour plus d'exemples.`,

  relative: `📖 **Propositions relatives en tadaksahak**

Le tadaksahak utilise **3 stratégies de relativisation** :

1️⃣ **"ayo/ayondo"** → noms DÉFINIS, restrictif
   *Bora [ayo a-taw-kat] a-zumbu-kat.*

2️⃣ **Gap strategy (∅)** → noms INDÉFINIS, restrictif
   *A-gar hamu [# f-keni aykaran daw].*

3️⃣ **"sa"** → non-restrictif (info supplémentaire)
   *nana, [sa ayn man Aminata].*

📚 D'après Christiansen & Levinsohn (2003).
🔗 Tapez "exemple relative" pour un exemple concret.`,

  pronoun: `📚 **Pronoms personnels en tadaksahak**

| Personne | Sujet clitique | Indépendant | Objet | Possessif |
|----------|----------------|-------------|-------|-----------|
| 1sg | aɣ(a)- | aɣay | ayay | aya-n |
| 2sg | ni- / an- | nín | nin | ni-n |
| 3sg | a- | áŋga | -a | ay-n |
| 1pl | ar(ǝ)- | áari | aari | are-n |
| 2pl | andǝ- | ándi | andi | ande-n |
| 3pl | i- | íŋgi | -i | i-n |

🔗 Consultez la section Grammaire pour le détail des usages.`,

  adjective: `📚 **Adjectifs en tadaksahak**

Les adjectifs sont dérivés des verbes et s'accordent en nombre.

**Exemples :**
• *beer-i* (grand) → pluriel *babber-anin*
• *ceen-an* (petit) → pluriel *ceenan-anin*
• *bibi* (noir) → pluriel *bibi-nin*
• *kooray* (blanc) → pluriel *kooray-nin*

🔗 Consultez la section Grammaire pour la liste complète.`,

  negation: `📚 **Négation en tadaksahak**

Tadaksahak distingue deux formes de négation :
• **nǝ-** → perfectif (action terminée)
• **sǝ-** → imperfectif (action non terminée)

**Exemples :**
• *a-nǝ-kun(a) ay-n a-zraf* → "il n'a pas trouvé son argent"
• *aɣ-sǝ-báy-a* → "je ne le sais pas"

**Autres formes :**
• *kǝlá ... nǝ-* → "ne ... jamais"
• *nǝ- ... fów* → "ne ... pas du tout"
• *h(e) a-ʃʃí* → "il n'y a rien"

🔗 Consultez la section Grammaire pour plus de détails.`,

  reciprocal: `📚 **Verbes réciproques en tadaksahak**

Le réciproque se forme avec les préfixes **m(a)-** ou **n(a)-**.

**Exemples :**
• *m-adyar* → "adhérer l'un à l'autre"
• *n-aktab* → "s'écrire l'un à l'autre"
• *n-mm-anya* → "s'entretuer"

🔗 Consultez la section Grammaire pour la liste complète.`,

  default: `📚 **Grammaire tadaksahak**

La grammaire couvre plusieurs aspects :
• Verbes causatifs et passifs
• Propositions relatives (3 stratégies)
• Pronoms personnels (6 personnes)
• Adjectifs (accord en nombre)
• Négation (perfectif/imperfectif)
• Numéraux (1-10, dizaines, centaines)
• Postpositions (locatives, datives)

🔗 Consultez la section Grammaire pour explorer chaque sujet en détail.

💡 Demandez-moi : "explique les causatifs" ou "c'est quoi les relatives"`
};

function handleGrammarIntent(text) {
  const topic = INTENTS.GRAMMAR.extractTopic(text);
  
  if (topic && GRAMMAR_RESPONSES[topic]) {
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
  
  return GRAMMAR_RESPONSES.default;
}

// ------------------------------
// RÉPONSES POUR LES CONTES
// ------------------------------
const TALES_DATABASE = {
  'chacal': {
    title: 'Le chacal et le phacochère',
    content: `📖 **Le chacal et le phacochère**

Il était une fois un chacal rusé qui convoitait la graisse d'un phacochère. 
Il alla trouver l'éléphant et lui dit que les phacochères voulaient le tuer.
L'éléphant, effrayé, demanda conseil au chacal.

Le chacal proposa de tuer les phacochères un par un. Il les dévora tous, 
ne laissant qu'un seul survivant. Il trompa ensuite le phacochère survivant 
en lui faisant croire que l'éléphant était malade et avait besoin de graisse 
de phacochère pour guérir.

Le chacal manipula les animaux pour tuer le phacochère, mais finit par 
révéler sa fourberie.

💡 **Morale** : La ruse peut tromper, mais la vérité finit toujours par éclater.`,
    keywords: ['chacal', 'phacochère', 'éléphant', 'rusé', 'tromper']
  },
  'lion': {
    title: 'Le lion et le lièvre',
    content: `📖 **Le lion et le lièvre**

Le lion, roi des animaux, terrorisait tous les habitants de la brousse. 
Le lièvre, petit mais malin, décida de lui donner une leçon.

Il fit croire au lion qu'un autre lion, encore plus fort, voulait lui voler 
son trône. Il l'emmena à un puits et lui montra son reflet dans l'eau.

Le lion, croyant voir un rival, sauta dans le puits pour le combattre. 
Il se noya et la brousse fut libérée du tyran.

💡 **Morale** : L'intelligence peut vaincre la force brute.`,
    keywords: ['lion', 'lièvre', 'puits', 'reflet', 'roi']
  },
  'hyene': {
    title: 'La hyène et le serpent',
    content: `📖 **La hyène et le serpent**

La hyène, toujours affamée, trouva un serpent blessé. Au lieu de l'aider, 
elle se moqua de lui. Le serpent lui dit : "Un jour, tu auras besoin d'aide."

Des années plus tard, la hyène tomba dans un piège. Personne ne vint l'aider 
car elle n'avait jamais aidé personne. Le serpent, qui avait guéri, passa 
sans même la regarder.

💡 **Morale** : Qui ne sème pas la bonté ne récolte que l'indifférence.`,
    keywords: ['hyène', 'serpent', 'blessé', 'aide', 'piège']
  }
};

function handleTaleIntent(text) {
  const taleKeyword = INTENTS.TALE.extractTale(text);
  
  if (taleKeyword) {
    for (const [key, tale] of Object.entries(TALES_DATABASE)) {
      if (tale.keywords.some(k => taleKeyword.includes(k) || k.includes(taleKeyword))) {
        return tale.content;
      }
    }
  }
  
  // Conte par défaut
  const defaultTale = TALES_DATABASE['chacal'];
  return `${defaultTale.content}\n\n📚 Voulez-vous que je vous raconte une autre histoire ? Demandez-moi "raconte le lion" ou "raconte la hyène".`;
}

// ------------------------------
// RÉPONSES POUR MÉNAKA / HISTOIRE
// ------------------------------
const MENAKA_RESPONSES = {
  general: `📍 **Ménaka - Cœur du pays Idaksahak**

Ménaka est une ville du nord-est du Mali, chef-lieu de la 9e région administrative. 
Elle est située à la frontière du Niger, dans la zone sahélienne.

**Population** : Environ 30 000 Idaksahak (Dawsahaq), un peuple berbère zénatique.

**Langue** : Le tadaksahak (tadagsahaq), mélange de songhay et de tamasheq.

**Activités** : Élevage (chameaux, vaches, chèvres), commerce, artisanat.

🗺️ Consultez la carte interactive dans l'application pour localiser Ménaka.`,

  history: `📜 **Histoire de Ménaka (2000-2018)**

D'après l'article de Charles Grémont (2019) :

• **Années 1990-2000** : Concurrence entre éleveurs Dawsahaq et Peuls pour les pâturages.
• **2012** : Rébellion du MNLA, présence des groupes djihadistes (Aqmi, Mujao).
• **2013** : Intervention française (opération Serval), puis Barkhane.
• **2015** : Accords d'Alger pour la paix.
• **2018** : Arrestation de Mohammed ag Siguidi par Barkhane.

📚 Lisez l'article complet dans la section Livres.`,

  people: `👥 **Les Idaksahak (Dawsahaq)**

Les Idaksahak sont un peuple berbère zénatique de la région de Ménaka.

**Statut social** : Libres mais de statut intermédiaire, tributaires des Imajeghen.

**Fractions principales** : Iduguriten (les plus nombreux et riches), Kel Tabho, Isheriffen.

**Personnalités** : 
• Bajan ag Hamatou (député de Ménaka)
• Moussa ag Acharatouman (fondateur du MSA)
• Siguidi ag Madit (chef de fraction)

🔗 Découvrez-en plus dans les contes et émissions.`,

  language: `🗣️ **La langue tadaksahak**

Le tadaksahak (ou tadagsahaq) est une langue berbère zénatique parlée par environ 30 000 personnes.

**Caractéristiques** :
• Mélange de songhay et de tamasheq
• 529 mots répertoriés dans notre dictionnaire
• 3 stratégies de relativisation (Christiansen & Levinsohn 2003)
• Verbes causatifs (préfixe s-) et passifs (préfixe t-)

📚 Apprenez le tadaksahak avec notre dictionnaire et notre grammaire !`
};

function handleMenakaIntent(text) {
  if (text.includes('histoire') || text.includes('historique') || text.includes('history')) {
    return MENAKA_RESPONSES.history;
  }
  if (text.includes('peuple') || text.includes('people') || text.includes('dawsahaq') || text.includes('idaksahak')) {
    return MENAKA_RESPONSES.people;
  }
  if (text.includes('langue') || text.includes('language') || text.includes('tadaksahak')) {
    return MENAKA_RESPONSES.language;
  }
  return MENAKA_RESPONSES.general;
}

// ------------------------------
// RÉPONSES POUR LES RESSOURCES ACADÉMIQUES
// ------------------------------
function handleAcademicIntent(text) {
  let response = "🎙️ **Ressources académiques disponibles :**\n\n";
  
  if (text.includes('podcast') || text.includes('souag')) {
    response += "🔹 **Podcast : La linguistique historique au Sahara**\n";
    response += "   Avec Dr. Lameen Souag (CNRS-LACITO)\n";
    response += "   🔗 https://www.themaghribpodcast.com/2018/01/la-linguistique-historique-au-sahara.html\n\n";
  }
  
  if (text.includes('gremont') || text.includes('hérodote') || text.includes('violence')) {
    response += "🔹 **Article : Dans le piège des offres de violence**\n";
    response += "   Charles Grémont (2019), Hérodote n°172\n";
    response += "   Analyse des dynamiques de violence à Ménaka (2000-2018)\n\n";
  }
  
  if (text.includes('christiansen') || text.includes('levinsohn')) {
    response += "🔹 **Référence : Relative Clauses in Tadaksahak**\n";
    response += "   Christiansen & Levinsohn (2003)\n";
    response += "   Analyse des 3 stratégies de relativisation\n\n";
  }
  
  if (text.includes('kossmann')) {
    response += "🔹 **Référence : Essai sur la phonologie du proto-berbère**\n";
    response += "   Maarten Kossmann (1999)\n\n";
  }
  
  response += "📚 Consultez la section **Ressources académiques** pour accéder à tous ces contenus.";
  return response;
}

// ------------------------------
// RÉPONSES POUR LES STATISTIQUES
// ------------------------------
function handleStatsIntent(text) {
  const stats = [];
  
  if (window.vocabulaire) {
    stats.push(`📖 **Dictionnaire** : ${window.vocabulaire.length} mots`);
  }
  if (window.themesData && window.themesData.themes) {
    const totalMots = window.themesData.themes.reduce((acc, t) => acc + (t.mots?.length || 0), 0);
    stats.push(`📚 **Thèmes** : ${window.themesData.themes.length} thèmes, ${totalMots} mots`);
  }
  if (window.livresConnaissance && window.livresConnaissance.livres) {
    stats.push(`📚 **Livres** : ${window.livresConnaissance.livres.length} ouvrages`);
  }
  if (window.contesData) {
    const contesCount = Array.isArray(window.contesData) ? window.contesData.length : 1;
    stats.push(`📖 **Contes** : ${contesCount} histoires`);
  }
  
  stats.push(`👥 **Visites** : ${localStorage.getItem('tadaksahak_visit_count') || 0}`);
  stats.push(`⭐ **Favoris** : ${window.favoris?.length || 0} mots sauvegardés`);
  
  return "📊 **Statistiques de l'application :**\n\n" + stats.join('\n');
}

// ------------------------------
// RÉPONSES POUR LE MENU
// ------------------------------
function handleMenuIntent() {
  return `📋 **Sections de l'application :**

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

💡 Que souhaitez-vous explorer ? Tapez "aide" pour les commandes.`;
}

// ------------------------------
// RÉPONSES POUR L'AIDE
// ------------------------------
function handleHelpIntent() {
  return `🤖 **Aide - Ce que je sais faire :**

**📖 RECHERCHE DE MOTS**
• "Que signifie [mot] ?" - Définition en tadaksahak
• "Comment dit-on [mot] en tadaksahak ?" - Traduction
• "[mot]" - Recherche directe dans le dictionnaire

**📚 GRAMMAIRE**
• "Explique les causatifs" - Verbes causatifs
• "C'est quoi les relatives ?" - Propositions relatives
• "Les pronoms personnels" - Tableau des pronoms
• "La négation en tadaksahak" - Formes de négation

**📖 CONTES**
• "Raconte-moi un conte" - Histoire traditionnelle
• "Raconte le chacal" - Conte spécifique

**📍 MÉNAKA / CULTURE**
• "Où est Ménaka ?" - Géographie
• "Qui sont les Idaksahak ?" - Présentation du peuple
• "Histoire de Ménaka" - Contexte historique

**🎙️ RESSOURCES**
• "Podcast Souag" - Épisode linguistique
• "Article Grémont" - Analyse de Ménaka

**📊 STATISTIQUES**
• "Combien de mots ?" - Taille du dictionnaire
• "Statistiques" - Données de l'application

**💡 RACCOURCIS CLAVIER**
• Alt+D → Dictionnaire
• Alt+C → Chat
• Alt+F → Flashcards
• Alt+L → Livres
• Alt+T → Thèmes
• Alt+G → Grammaire

**🔍 COMMANDES RAPIDES**
• "menu" - Liste des sections
• "aide" - Ce message
• "stats" - Statistiques

Que puis-je faire pour vous aujourd'hui ?`;
}

// ------------------------------
// RÉPONSES POUR LES SALUTATIONS
// ------------------------------
function handleGreetingIntent(lang) {
  const greetings = {
    french: [
      "👋 Bonjour ! Je suis Hamadine, votre guide pour explorer la langue et la culture Tadaksahak. Comment puis-je vous aider aujourd'hui ?",
      "🌞 Salut ! Prêt à découvrir un nouveau mot en tadaksahak ? J'ai plus de 529 mots dans mon dictionnaire !",
      "🤝 Bonjour ! La richesse de la langue tadaksahak n'attend que vous. Que souhaitez-vous apprendre ?"
    ],
    arabic: [
      "👋 مرحبا! أنا حمدين، مرشدكم لاستكشاف لغة وثقافة تدكساهق. كيف يمكنني مساعدتكم اليوم؟",
      "🌞 سلام! هل أنتم مستعدون لاكتشاف كلمة جديدة في التدكساهق؟ لدي أكثر من 529 كلمة في قاموسي!",
      "🤝 مرحبا! ثراء لغة التدكساهق في انتظاركم. ماذا تريدون أن تتعلموا؟"
    ],
    english: [
      "👋 Hello! I am Hamadine, your guide to explore the Tadaksahak language and culture. How can I help you today?",
      "🌞 Hi! Ready to discover a new word in Tadaksahak? I have over 529 words in my dictionary!",
      "🤝 Hello! The richness of the Tadaksahak language awaits you. What would you like to learn?"
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
      "🙏 De rien ! La connaissance se partage, c'est ma mission.",
      "💫 C'est un plaisir de vous aider. N'hésitez pas si vous avez d'autres questions.",
      "🎓 À votre service ! Ensemble, préservons cette langue magnifique."
    ],
    arabic: [
      "🙏 عفواً! المعرفة تنتقل بالمشاركة، هذه مهمتي.",
      "💫 يسعدني مساعدتكم. لا تترددوا في طرح المزيد من الأسئلة.",
      "🎓 في خدمتكم! معاً نحافظ على هذه اللغة الجميلة."
    ],
    english: [
      "🙏 You're welcome! Knowledge is meant to be shared, that's my mission.",
      "💫 It's a pleasure to help you. Feel free to ask more questions.",
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
      "👋 Au revoir ! N'oubliez pas de consulter le mot du jour demain.",
      "🌟 À bientôt sur Tadaksahak Learning ! Que la sagesse Idaksahak vous accompagne.",
      "📚 Revenez quand vous voulez pour enrichir votre vocabulaire."
    ],
    arabic: [
      "👋 مع السلامة! لا تنسوا الاطلاع على كلمة اليوم غداً.",
      "🌟 نراكم قريباً على تدكساهق ليرنينغ! لتكن حكمة إدكساهق معكم.",
      "📚 عودوا وقتما تشاؤون لإثراء مفرداتكم."
    ],
    english: [
      "👋 Goodbye! Don't forget to check the word of the day tomorrow.",
      "🌟 See you soon on Tadaksahak Learning! May Idaksahak wisdom guide you.",
      "📚 Come back anytime to enrich your vocabulary."
    ]
  };
  
  const langMap = { french: 'french', arabic: 'arabic', english: 'english' };
  const selectedLang = langMap[lang] || 'french';
  const responses = goodbyes[selectedLang];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// ------------------------------
// RÉPONSE PAR DÉFAUT (intelligente)
// ------------------------------
function getDefaultResponse(query, lang) {
  const defaultResponses = {
    french: [
      "🤔 Je n'ai pas bien compris. Pouvez-vous reformuler votre question ?\n\n💡 Tapez **'aide'** pour voir ce que je peux faire, ou **'menu'** pour la liste des sections.",
      "📚 Je ne suis pas sûr de comprendre. Essayez de me poser une question sur le dictionnaire, la grammaire, les contes, ou la culture Idaksahak.",
      "🎓 Je suis encore en apprentissage ! Tapez **'aide'** pour découvrir toutes mes capacités.",
      "💡 Suggestions : 'Que signifie báy ?', 'Raconte-moi un conte', 'Où est Ménaka ?', 'Explique les relatives'"
    ],
    arabic: [
      "🤔 لم أفهم جيداً. هل يمكنكم إعادة صياغة سؤالك؟\n\n💡 اكتبوا 'مساعدة' لمعرفة ما يمكنني فعله، أو 'قائمة' لرؤية جميع الأقسام.",
      "📚 لست متأكداً مما تقصد. جربوا أن تسألوني عن القاموس، القواعد، الحكايات، أو ثقافة إدكساهق.",
      "🎓 ما زلت أتعلم! اكتبوا 'مساعدة' لاكتشاف قدراتي الكاملة."
    ],
    english: [
      "🤔 I didn't quite understand. Could you rephrase your question?\n\n💡 Type **'help'** to see what I can do, or **'menu'** for the list of sections.",
      "📚 I'm not sure I understand. Try asking me about the dictionary, grammar, tales, or Idaksahak culture.",
      "🎓 I'm still learning! Type **'help'** to discover all my capabilities."
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
  if (!clean) return "💬 Bonjour ! Tapez 'aide' pour commencer.";
  
  // Détection de la langue
  const detected = detectLanguage(clean);
  const userLang = detected.language;
  
  // Traduction interne pour analyse
  const translated = translateQuery(clean);
  
  // Sauvegarde du contexte
  conversationState.lastQuestion = clean;
  
  // 1. RECHERCHE DIRECTE DANS LE DICTIONNAIRE (mot isolé)
  if (clean.split(/\s+/).length <= 2 && !clean.includes(' ')) {
    const results = searchDictionaryMultilingual(clean);
    if (results.length > 0) {
      const best = results[0];
      let response = `📖 **${best.mot}**\n\n`;
      response += `🇫🇷 ${best.fr || '—'}\n`;
      response += `🇬🇧 ${best.en || '—'}\n`;
      response += `🇸🇦 ${best.ar || '—'}\n`;
      response += `\n📂 Catégorie : ${best.cat || 'mot'}`;
      return response;
    }
  }
  
  // 2. DÉTECTION D'INTENTION
  const intent = detectIntent(translated);
  
  switch (intent) {
    case 'TRANSLATION':
      return handleTranslationIntent(clean);
    case 'DEFINITION':
      return handleDefinitionIntent(clean);
    case 'GRAMMAR':
      return handleGrammarIntent(clean);
    case 'TALE':
      return handleTaleIntent(clean);
    case 'MENU':
      return handleMenuIntent();
    case 'HELP':
      return handleHelpIntent();
    case 'GREETING':
      return handleGreetingIntent(userLang);
    case 'THANKS':
      return handleThanksIntent(userLang);
    case 'GOODBYE':
      return handleGoodbyeIntent(userLang);
    case 'QUIZ':
      return "❓ Voulez-vous faire un quiz ? Rendez-vous dans la section **Quiz** de l'application ! Je peux aussi vous poser une question si vous le souhaitez.";
    case 'SEARCH':
      const searchQuery = INTENTS.SEARCH.extractQuery(clean);
      if (searchQuery) {
        const bookResults = searchBooks(searchQuery);
        if (bookResults.length > 0) {
          const best = bookResults[0];
          return `📖 **Recherche dans les livres :**\n\n"${best.texte}..."\n\n📚 Extrait de « ${best.livre} » (${best.auteur}), chapitre ${best.chapitre}.`;
        }
      }
      break;
    default:
      break;
  }
  
  // 3. RECHERCHE SUR MÉNAKA / IDAKSAHAK
  if (clean.includes('ménaka') || clean.includes('menaka') || 
      clean.includes('idaksahak') || clean.includes('dawsahaq') || 
      clean.includes('iwellemmedan') || clean.includes('mali') || clean.includes('niger')) {
    return handleMenakaIntent(clean);
  }
  
  // 4. RECHERCHE SUR LES RESSOURCES ACADÉMIQUES
  if (clean.includes('podcast') || clean.includes('souag') || clean.includes('gremont') || 
      clean.includes('académique') || clean.includes('cairn') || clean.includes('hérodote') ||
      clean.includes('christiansen') || clean.includes('levinsohn') || clean.includes('kossmann')) {
    return handleAcademicIntent(clean);
  }
  
  // 5. RECHERCHE SUR LES STATISTIQUES
  if (clean.includes('statistique') || clean.includes('combien') || clean.includes('nombre') || 
      clean.includes('chiffre') || clean.includes('stats')) {
    return handleStatsIntent(clean);
  }
  
  // 6. RECHERCHE SUR LES THÈMES
  if (clean.includes('thème') || clean.includes('theme') || clean.includes('catégorie')) {
    const themeResult = chercherDansThemes(clean);
    if (themeResult) {
      let response = `📚 **${themeResult.titre}**\n\n${themeResult.description}\n\n📖 **Exemples :**\n`;
      for (const mot of themeResult.mots) {
        response += `🔹 ${mot.tad} → ${mot.fr}\n`;
      }
      return response;
    }
  }
  
  // 7. RECHERCHE DANS LES LIVRES (connaissance)
  const bookResults = searchBooks(clean);
  if (bookResults.length > 0) {
    const best = bookResults[0];
    return `📖 **D'après « ${best.livre} » (${best.auteur})**\n\nChapitre ${best.chapitre} — « ${best.titre} » :\n\n_"${best.texte}..."_\n\n💡 Posez-moi d'autres questions sur ce livre !`;
  }
  
  // 8. RÉPONSE PAR DÉFAUT
  return getDefaultResponse(clean, userLang);
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
  
  // Effacer le timeout précédent
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
  const btns = document.querySelectorAll('.chat-suggestion');
  if (btns.length >= 3) {
    const suggestions = [
      window.t('sugg_word') || "📖 Chercher un mot",
      window.t('sugg_history') || "📚 Histoire de Ménaka",
      window.t('sugg_culture') || "🎵 Culture Idaksahak"
    ];
    btns.forEach((btn, i) => {
      if (suggestions[i]) btn.textContent = suggestions[i];
      btn.onclick = () => {
        const input = document.getElementById("chatInput");
        if (input) {
          input.value = suggestions[i];
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
  
  // Message de bienvenue
  setTimeout(() => {
    if (chatHistory.length === 0) {
      afficheMsg("bot", "👋 Salam aleikum ! Je suis **Hamadine**, votre guide pour explorer la langue et la culture **Tadaksahak**.\n\n💡 **Ce que je peux faire :**\n• Traduire des mots (français ↔ tadaksahak)\n• Expliquer la grammaire (causatifs, relatives, pronoms...)\n• Raconter des contes traditionnels\n• Répondre sur l'histoire de Ménaka\n• Vous orienter dans l'application\n\n🔍 Tapez **'aide'** pour toutes les commandes, ou **'menu'** pour voir les sections.");
    }
  }, 500);
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

// Initialisation automatique si le DOM est chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChat);
} else {
  initChat();
}
