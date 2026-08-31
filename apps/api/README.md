# API Tadaksahak Learning

API minimale (Express + PostgreSQL) pour les contributions communautaires
au dictionnaire : proposer un mot ou une correction, et les valider côté admin.

Le dictionnaire lui-même reste 100% statique (fichiers JSON dans `apps/web/data/`) —
cette API ne sert QUE les contributions, pas la recherche ni l'affichage.

## Installation

```bash
cd apps/api
npm install
cp .env.example .env
# éditer .env avec les vraies valeurs (DATABASE_URL, JWT_SECRET, ADMIN_PASSWORD_HASH...)
npm run migrate
npm start
```

## Générer le hash du mot de passe admin

```bash
node -e "console.log(require('bcryptjs').hashSync('TON_MOT_DE_PASSE', 10))"
```

Colle le résultat dans `ADMIN_PASSWORD_HASH` du `.env`.

## Endpoints

- `GET /api/health` — vérification que l'API tourne
- `POST /api/auth/login` — connexion admin, retourne un token JWT
- `POST /api/contributions` — soumission publique d'un mot/correction
- `GET /api/contributions?statut=en_attente` — liste (admin, header `Authorization: Bearer <token>`)
- `PATCH /api/contributions/:id` — approuver/rejeter une contribution (admin)
