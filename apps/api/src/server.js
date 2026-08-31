require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const contributionsRoutes = require('./routes/contributions');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '100kb' })); // API légère, pas besoin de gros payloads

app.get('/api/health', (req, res) => {
  res.json({ statut: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/contributions', contributionsRoutes);

// Gestion centralisée des erreurs non capturées dans les routes
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erreur: 'Erreur serveur interne' });
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`API Tadaksahak démarrée sur le port ${port}`);
});
