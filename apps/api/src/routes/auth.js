// Connexion admin unique (pas de gestion multi-utilisateurs, KISS).
// POST /api/auth/login  { username, password } -> { token }

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Limite les tentatives de connexion pour éviter le bruteforce
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { erreur: 'Trop de tentatives, réessaie plus tard' },
});

router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ erreur: 'Identifiants manquants' });
  }

  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword =
    validUsername &&
    (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || ''));

  if (!validUsername || !validPassword) {
    return res.status(401).json({ erreur: 'Identifiants incorrects' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '12h',
  });

  res.json({ token });
});

module.exports = router;
