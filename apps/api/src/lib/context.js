// Construit le contexte factuel (RAG) injecté dans le prompt du chatbot :
// recherche dans dictionnaire, grammaire, bibliothèque et contenus divers,
// pour ancrer les réponses du LLM sur les vraies données tadaksahak plutôt
// que de le laisser répondre uniquement de mémoire.
const prisma = require('../db/prisma');

const sansAccents = (texte) => texte.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Normalisés comme les mots de la question, sinon « où » ou « être » ne seraient jamais filtrés.
const STOP_WORDS = new Set(['le','la','les','un','une','de','du','des','et','ou','mais','donc','car','pour','dans','avec','sans','par','sur','sous','que','qui','quoi','dont','où','comment','pourquoi','est','sont','être','avoir','faire','the','a','an','of','and','or','is','are','what','how','why'].map(sansAccents));

function extraireMotsCles(texte) {
  const mots = sansAccents(texte)
    // L'apostrophe sépare deux mots (« l'arbre » -> « l arbre ») : la supprimer les collerait.
    .replace(/[?;:!,.]/g, '')
    .replace(/['’]/g, ' ')
    .split(/\s+/);
  return mots.filter(m => m.length > 2 && !STOP_WORDS.has(m));
}

async function buildContext(question) {
  const q = question.slice(0, 300);
  const motsCles = extraireMotsCles(q);
  // websearch_to_tsquery traite les mots séparés par un espace comme un ET
  // logique par défaut : une phrase entière échouerait presque toujours
  // (ex. "tadaksahak" n'apparaît dans aucune entrée du dictionnaire, c'est
  // le nom de la langue elle-même). On force un OU logique entre mots-clés
  // pour maximiser le rappel ; le classement par pertinence (ts_rank) fait
  // ensuite remonter les meilleurs résultats.
  const searchQuery = motsCles.length ? motsCles.join(' or ') : q;

  const [dictionary, libraryChunks, allGrammar, allContent] = await Promise.all([
    prisma.$queryRawUnsafe(`
      SELECT mot, cat_raw AS "catRaw", fr_def AS "frDef", en_def AS "enDef", ar_def AS "arDef"
      FROM dictionary_entries
      WHERE search_tsv @@ websearch_to_tsquery('french', f_unaccent($1))
      ORDER BY ts_rank(search_tsv, websearch_to_tsquery('french', f_unaccent($1))) DESC
      LIMIT 6
    `, searchQuery).catch(() => []),
    prisma.$queryRawUnsafe(`
      SELECT lc.content, lc.chapter, ld.title, ld.author
      FROM library_chunks lc
      JOIN library_documents ld ON ld.id = lc.document_id
      WHERE lc.search_tsv @@ websearch_to_tsquery('french', f_unaccent($1))
      LIMIT 2
    `, searchQuery).catch(() => []),
    prisma.grammarLesson.findMany({ take: 30 }),
    prisma.contentItem.findMany({ take: 50 }),
  ]);

  const grammar = allGrammar
    .map(g => {
      const texte = `${g.titleFr || ''} ${g.theoryFr || ''} ${(g.keywords || []).join(' ')}`.toLowerCase();
      const score = motsCles.filter(m => texte.includes(m)).length;
      return { g, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(x => x.g);

  const content = allContent
    .map(c => {
      const texte = JSON.stringify(c.data).toLowerCase();
      const score = motsCles.filter(m => texte.includes(m)).length;
      return { c, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(x => x.c);

  return { dictionary, libraryChunks, grammar, content };
}

function formatContext(ctx) {
  const parts = [];

  if (ctx.dictionary.length) {
    parts.push('DICTIONNAIRE :\n' + ctx.dictionary.map(d =>
      `- ${d.mot} (${d.catRaw || ''}) : FR="${d.frDef || ''}" EN="${d.enDef || ''}" AR="${d.arDef || ''}"`
    ).join('\n'));
  }

  if (ctx.grammar.length) {
    parts.push('GRAMMAIRE :\n' + ctx.grammar.map(g =>
      `- ${g.titleFr}: ${(g.theoryFr || '').slice(0, 500)}`
    ).join('\n'));
  }

  if (ctx.libraryChunks.length) {
    parts.push('BIBLIOTHÈQUE :\n' + ctx.libraryChunks.map(c =>
      `- « ${c.title} » (${c.author || 'auteur inconnu'}), chap. ${c.chapter || '?'} : ${(c.content || '').slice(0, 500)}`
    ).join('\n'));
  }

  if (ctx.content.length) {
    parts.push('AUTRES CONTENUS :\n' + ctx.content.map(c =>
      `- [${c.kind}] ${JSON.stringify(c.data).slice(0, 400)}`
    ).join('\n'));
  }

  return parts.length ? parts.join('\n\n') : '(Aucune donnée pertinente trouvée dans la base pour cette question.)';
}

module.exports = { buildContext, formatContext, extraireMotsCles };
