// Contributions communautaires : proposer un mot/correction (public),
// et lister/valider/rejeter (admin uniquement).
const express = require('express');
const rateLimit = require('express-rate-limit');
const pool = require('../db/pool');
const { requireAdmin } = require('../middleware/auth');
const router = express.Router();
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { erreur: 'Trop de contributions envoyées, réessaie plus tard' },
});
const TYPES_VALIDES = ['nouveau_mot', 'correction'];
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
const text = (value, max = 2000) => typeof value === 'string' ? value.trim().slice(0, max) || null : null;

router.post('/', submitLimiter, asyncRoute(async (req, res) => {
  const body = req.body || {};
  const type = body.type;
  const mot = text(body.mot, 200);
  if (!TYPES_VALIDES.includes(type) || !mot) {
    return res.status(400).json({ erreur: 'Champs requis manquants ou invalides' });
  }
  const { rows } = await pool.query(
    `INSERT INTO contributions
      (type, mot, categorie, traduction_fr, traduction_en, traduction_ar,
       commentaire, mot_original, contributeur_nom, contributeur_email)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING id, cree_le`,
    [type, mot, text(body.categorie, 100), text(body.traduction_fr), text(body.traduction_en),
      text(body.traduction_ar), text(body.commentaire), text(body.mot_original, 200),
      text(body.contributeur_nom, 120), text(body.contributeur_email, 254)]
  );
  return res.status(201).json({ id: rows[0].id, cree_le: rows[0].cree_le });
}));

router.get('/', requireAdmin, asyncRoute(async (req, res) => {
  const statut = ['en_attente', 'approuve', 'rejete'].includes(req.query.statut) ? req.query.statut : 'en_attente';
  const { rows } = await pool.query(
    'SELECT * FROM contributions WHERE statut = $1 ORDER BY cree_le DESC', [statut]
  );
  return res.json(rows);
}));

router.patch('/:id', requireAdmin, asyncRoute(async (req, res) => {
  const { statut } = req.body || {};
  if (!['approuve', 'rejete'].includes(statut)) {
    return res.status(400).json({ erreur: "Statut invalide (attendu: 'approuve' ou 'rejete')" });
  }
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ erreur: 'Identifiant invalide' });
  const { rows } = await pool.query(
    'UPDATE contributions SET statut = $1, traite_le = now() WHERE id = $2 RETURNING id, statut',
    [statut, id]
  );
  if (!rows.length) return res.status(404).json({ erreur: 'Contribution introuvable' });
  return res.json(rows[0]);
}));
module.exports = router;
