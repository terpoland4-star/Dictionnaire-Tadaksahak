// Contributions communautaires : proposer un mot/correction (public),
// et lister/valider/rejeter (admin uniquement).

const express = require('express');
const rateLimit = require('express-rate-limit');
const pool = require('../db/pool');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20, // 20 contributions/heure/IP, largement suffisant pour un usage légitime
  message: { erreur: 'Trop de contributions envoyées, réessaie plus tard' },
});

const TYPES_VALIDES = ['nouveau_mot', 'correction'];

// POST /api/contributions — soumission publique
router.post('/', submitLimiter, async (req, res) => {
  const {
    type,
    mot,
    categorie,
    traduction_fr,
    traduction_en,
    traduction_ar,
    commentaire,
    mot_original,
    contributeur_nom,
    contributeur_email,
  } = req.body || {};

  if (!TYPES_VALIDES.includes(type) || !mot || !mot.trim()) {
    return res.status(400).json({ erreur: 'Champs requis manquants ou invalides' });
  }

  const { rows } = await pool.query(
    `INSERT INTO contributions
      (type, mot, categorie, traduction_fr, traduction_en, traduction_ar,
       commentaire, mot_original, contributeur_nom, contributeur_email)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING id, cree_le`,
    [
      type,
      mot.trim(),
      categorie || null,
      traduction_fr || null,
      traduction_en || null,
      traduction_ar || null,
      commentaire || null,
      mot_original || null,
      contributeur_nom || null,
      contributeur_email || null,
    ]
  );

  res.status(201).json({ id: rows[0].id, cree_le: rows[0].cree_le });
});

// GET /api/contributions?statut=en_attente — liste (admin)
router.get('/', requireAdmin, async (req, res) => {
  const statut = ['en_attente', 'approuve', 'rejete'].includes(req.query.statut)
    ? req.query.statut
    : 'en_attente';

  const { rows } = await pool.query(
    `SELECT * FROM contributions WHERE statut = $1 ORDER BY cree_le DESC`,
    [statut]
  );

  res.json(rows);
});

// PATCH /api/contributions/:id — approuver ou rejeter (admin)
router.patch('/:id', requireAdmin, async (req, res) => {
  const { statut } = req.body || {};

  if (!['approuve', 'rejete'].includes(statut)) {
    return res.status(400).json({ erreur: "Statut invalide (attendu: 'approuve' ou 'rejete')" });
  }

  const { rows } = await pool.query(
    `UPDATE contributions SET statut = $1, traite_le = now()
     WHERE id = $2 RETURNING id, statut`,
    [statut, req.params.id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ erreur: 'Contribution introuvable' });
  }

  res.json(rows[0]);
});

module.exports = router;
