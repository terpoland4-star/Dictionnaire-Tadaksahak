// Vérifie qu'une requête admin porte un token JWT valide.
// Utilisé uniquement sur les routes de validation des contributions.

const jwt = require('jsonwebtoken');

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ erreur: 'Authentification requise' });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ erreur: 'Token invalide ou expiré' });
  }
}

module.exports = { requireAdmin };
