// Client Prisma unique, réutilisé partout dans l'API.
// Coexiste avec le pool pg (db/pool.js) : Prisma gère les tables de contenu
// (dictionnaire, grammaire, bibliothèque, contenus divers), pg reste sur
// contributions/auth — une seule source de vérité par table, pas de doublon.

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'production' ? ['error'] : ['warn', 'error'],
});

module.exports = prisma;
