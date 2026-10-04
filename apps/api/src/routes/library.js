// Bibliothèque (30 documents), lecture seule, public.
const express = require('express');
const prisma = require('../db/prisma');
const router = express.Router();
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

router.get('/', asyncRoute(async (req, res) => {
  const documents = await prisma.libraryDocument.findMany({ orderBy: { title: 'asc' } });
  return res.json(documents);
}));

router.get('/:id', asyncRoute(async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ erreur: 'Identifiant invalide' });

  const document = await prisma.libraryDocument.findUnique({
    where: { id },
    include: { chunks: true },
  });
  if (!document) return res.status(404).json({ erreur: 'Document introuvable' });
  return res.json(document);
}));

module.exports = router;
