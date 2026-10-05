// Alias v1 — expose /api/dictionary sous les chemins documentés publiquement
// (voir hamadine-prod: src/routes/api-dictionnaire.tsx). Même logique, mêmes données,
// juste un chemin conforme à la doc affichée sur le site vitrine.
const express = require('express');
const dictionaryRoutes = require('./dictionary');
const router = express.Router();

// GET /api/v1/lemma?q=&limit=  -> identique à GET /api/dictionary
router.get('/lemma', (req, res, next) => dictionaryRoutes.handle(
  Object.assign(req, { url: '/' + (req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '') }),
  res, next,
));

// GET /api/v1/lemmes/:id -> identique à GET /api/dictionary/:id
router.get('/lemmes/:id', (req, res, next) => dictionaryRoutes.handle(
  Object.assign(req, { url: `/${req.params.id}` }),
  res, next,
));

module.exports = router;
