// Dictionnaire tadaksahak : recherche et consultation (lecture seule, public).
// La recherche texte passe par search_tsv (colonne générée, cf prisma/search.sql) :
// insensible aux accents (f_unaccent), multi-langue (fr/en/ar), pondérée par pertinence.
// Prisma ne modélise pas nativement les requêtes sur tsvector -> $queryRaw ciblé ici.
// search_tsv est de type `tsvector`, non désérialisable par Prisma : on ne le sélectionne jamais.
const express = require('express');
const prisma = require('../db/prisma');
const router = express.Router();
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
const text = (value, max = 200) => typeof value === 'string' ? value.trim().slice(0, max) || null : null;

const SELECT_COLUMNS = `
  id, legacy_id AS "legacyId", mot, phonetic_ipa AS "phoneticIpa",
  root_type AS "rootType", grammatical_category AS "grammaticalCategory",
  cat_raw AS "catRaw", fr_def AS "frDef", ar_def AS "arDef", en_def AS "enDef",
  examples, suppletion_data AS "suppletionData", source,
  created_at AS "createdAt", updated_at AS "updatedAt"
`;

router.get('/all', asyncRoute(async (req, res) => {
  // Export complet, sans limite — utilisé par le frontend pour charger
  // tout le vocabulaire en mémoire (recherche/index/navigation côté client).
  const entries = await prisma.dictionaryEntry.findMany({ orderBy: { mot: 'asc' } });
  return res.json(entries);
}));

router.get('/', asyncRoute(async (req, res) => {
  const q = text(req.query.q, 100);
  const limit = Math.min(Number.parseInt(req.query.limit, 10) || 20, 100);

  if (!q) {
    const entries = await prisma.dictionaryEntry.findMany({ take: limit, orderBy: { mot: 'asc' } });
    return res.json(entries);
  }

  const entries = await prisma.$queryRawUnsafe(`
    SELECT ${SELECT_COLUMNS}
    FROM dictionary_entries
    WHERE search_tsv @@ websearch_to_tsquery('french', f_unaccent($1))
    ORDER BY ts_rank(search_tsv, websearch_to_tsquery('french', f_unaccent($1))) DESC
    LIMIT $2
  `, q, limit);
  return res.json(entries);
}));

router.get('/:id', asyncRoute(async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ erreur: 'Identifiant invalide' });

  const entry = await prisma.dictionaryEntry.findUnique({ where: { id } });
  if (!entry) return res.status(404).json({ erreur: 'Mot introuvable' });
  return res.json(entry);
}));

module.exports = router;
