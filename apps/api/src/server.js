require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const contributionsRoutes = require('./routes/contributions');
const dictionaryRoutes = require('./routes/dictionary');
const v1Routes = require('./routes/v1');
const grammarRoutes = require('./routes/grammar');
const libraryRoutes = require('./routes/library');
const contentRoutes = require('./routes/content');
const chatRoutes = require('./routes/chat');
const prisma = require('./db/prisma');
const pool = require('./db/pool');

const app = express();
const port = Number.parseInt(process.env.PORT || '3003', 10);
const host = process.env.HOST || '127.0.0.1';
const allowedOrigins = (process.env.CORS_ORIGIN || '*').split(',').map((origin) => origin.trim()).filter(Boolean);

if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT doit être un entier compris entre 1 et 65535');
if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'CHANGE_MOI_EN_VALEUR_ALEATOIRE_LONGUE')) {
  throw new Error('JWT_SECRET doit être défini en production');
}

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origine CORS non autorisée'));
  },
}));
app.use(express.json({ limit: '32kb', strict: true }));
app.get('/api/health', (req, res) => res.json({ statut: 'ok', service: 'tadaksahak-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/contributions', contributionsRoutes);
app.use('/api/dictionary', dictionaryRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/grammar', grammarRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/chat', chatRoutes);
app.use((req, res) => res.status(404).json({ erreur: 'Route introuvable' }));
app.use((err, req, res, next) => {
  console.error(err);
  if (err.message === 'Origine CORS non autorisée') return res.status(403).json({ erreur: err.message });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ erreur: 'JSON invalide' });
  return res.status(500).json({ erreur: 'Erreur serveur interne' });
});

const server = app.listen(port, host, () => console.log(`API Tadaksahak démarrée sur ${host}:${port}`));
function shutdown(signal) {
  console.log(`${signal}: arrêt de l’API`);
  server.close(async () => {
    await prisma.$disconnect();
    await pool.end();
    process.exit(0);
  });
}
process.once('SIGTERM', () => shutdown('SIGTERM'));
process.once('SIGINT', () => shutdown('SIGINT'));
module.exports = app;
