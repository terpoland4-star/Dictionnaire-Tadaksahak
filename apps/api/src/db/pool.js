// Pool de connexion unique à PostgreSQL, réutilisé partout dans l'API.
// On utilise le PostgreSQL déjà installé sur le VPS (base dédiée "tadaksahak"),
// pas de nouveau moteur de base de données à maintenir.

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5, // API légère, pas besoin de plus de connexions simultanées
  idleTimeoutMillis: 30000,
});

pool.on('error', (err) => {
  console.error('Erreur inattendue sur le pool PostgreSQL', err);
});

module.exports = pool;
