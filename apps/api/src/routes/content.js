// Contenus divers (contes, émissions, actualités, frise, thèmes, quiz...).
// kind = type de contenu, slug = identifiant unique dans ce type.
const express = require('express');
const prisma = require('../db/prisma');
const router = express.Router();
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

router.get('/:kind', asyncRoute(async (req, res) => {
  const items = await prisma.contentItem.findMany({ where: { kind: req.params.kind } });
  return res.json(items);
}));

router.get('/:kind/:slug', asyncRoute(async (req, res) => {
  const item = await prisma.contentItem.findUnique({
    where: { kind_slug: { kind: req.params.kind, slug: req.params.slug } },
  });
  if (!item) return res.status(404).json({ erreur: 'Contenu introuvable' });
  return res.json(item);
}));

module.exports = router;
