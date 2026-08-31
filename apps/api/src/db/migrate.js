// Exécute tous les fichiers .sql du dossier migrations/, dans l'ordre alphabétique.
// Usage : npm run migrate

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('./pool');

async function migrate() {
  const dir = path.join(__dirname, '..', '..', 'migrations');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    console.log(`Application de ${file}...`);
    await pool.query(sql);
  }

  console.log('Migrations terminées.');
  await pool.end();
}

migrate().catch((err) => {
  console.error('Échec des migrations :', err);
  process.exit(1);
});
