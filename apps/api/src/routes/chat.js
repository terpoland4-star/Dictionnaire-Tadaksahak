// Chatbot IA — répond aux questions sur la langue et la culture idaksahak
// en s'appuyant en priorité sur le contenu de la base (dictionnaire,
// grammaire, bibliothèque), complété par les connaissances générales du
// modèle sur les langues songhay quand la base ne couvre pas la question.
const express = require('express');
const rateLimit = require('express-rate-limit');
const { buildContext, formatContext } = require('../lib/context');
const router = express.Router();
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

// Route publique non authentifiée consommant un quota Groq partagé :
// limite stricte par IP pour éviter qu'un seul visiteur épuise le quota
// journalier de tout le monde.
const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  message: { erreur: "Trop de questions envoyées, réessaie dans un moment." },
});

const SYSTEM_PROMPT = `Tu es l'assistant du site Tadaksahak Learning, spécialisé EXCLUSIVEMENT sur :
- la langue tadaksahak (langue songhay septentrionale parlée au Mali)
- la culture, l'histoire et la mémoire du peuple Idaksahak

RÈGLES STRICTES :
1. Si la question est hors de ce périmètre (autre sujet, actualité générale, autre langue sans lien, etc.), décline poliment et réoriente vers le sujet du site — ne réponds jamais à une question hors-sujet.
2. Utilise EN PRIORITÉ le contexte fourni ci-dessous (extrait de la base de données du site) pour répondre.
3. Si le contexte ne suffit pas, tu peux compléter avec tes connaissances générales sur les langues songhay ou la région du Mali/Sahara — mais indique alors clairement que cette partie ne vient pas de la base du site (ex: "D'après mes connaissances générales sur les langues songhay...").
4. Ne JAMAIS inventer un mot tadaksahak, une traduction ou une règle grammaticale qui ne figure pas dans le contexte fourni.
5. Réponds dans la même langue que la question de l'utilisateur (français, anglais ou arabe).
6. Reste concis (quelques phrases), avec un ton chaleureux et pédagogique.`;

router.post('/', chatLimiter, asyncRoute(async (req, res) => {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim().slice(0, 500) : '';
  if (!message) {
    return res.status(400).json({ erreur: 'Message requis' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(503).json({ erreur: 'Chatbot temporairement indisponible' });
  }

  const ctx = await buildContext(message);
  const contextText = formatContext(ctx);

  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'system', content: `CONTEXTE (extrait de la base du site) :\n\n${contextText}` },
        { role: 'user', content: message },
      ],
      temperature: 0.4,
      max_tokens: 500,
    }),
  });

  if (!groqResponse.ok) {
    const errText = await groqResponse.text().catch(() => '');
    console.error('Erreur Groq:', groqResponse.status, errText);
    return res.status(502).json({ erreur: 'Erreur du service IA' });
  }

  const data = await groqResponse.json();
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    return res.status(502).json({ erreur: 'Réponse IA vide' });
  }

  return res.json({ reply });
}));

module.exports = router;
