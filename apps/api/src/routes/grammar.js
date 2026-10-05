// Leçons de grammaire (30 blocs paginés), lecture seule, public.
const express = require('express');
const prisma = require('../db/prisma');
const router = express.Router();
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

router.get('/', asyncRoute(async (req, res) => {
  const lessons = await prisma.grammarLesson.findMany({ orderBy: { blockNumber: 'asc' } });
  return res.json(lessons);
}));

router.get('/:blockNumber', asyncRoute(async (req, res) => {
  const blockNumber = Number.parseInt(req.params.blockNumber, 10);
  if (!Number.isInteger(blockNumber) || blockNumber < 1) {
    return res.status(400).json({ erreur: 'Numéro de bloc invalide' });
  }
  const lesson = await prisma.grammarLesson.findUnique({ where: { blockNumber } });
  if (!lesson) return res.status(404).json({ erreur: 'Leçon introuvable' });
  return res.json(lesson);
}));

module.exports = router;
