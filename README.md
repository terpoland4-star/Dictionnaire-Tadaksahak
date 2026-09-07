# Dictionnaire Tadaksahak

Application de préservation et d’apprentissage de la langue tadaksahak. La version actuelle adopte une architecture volontairement simple : une **PWA statique** pour la consultation et une **API optionnelle** uniquement pour les contributions communautaires.

## Architecture retenue

| Composant | Emplacement | Rôle | Exécution recommandée |
| --- | --- | --- | --- |
| Frontend | `apps/web/` | HTML, CSS, JavaScript ES modules, JSON, PWA | Nginx ou Caddy sur `80/443` |
| Données éditoriales | `apps/web/data/` | Source de vérité des mots, grammaire, quiz, livres et médias | Servies comme fichiers statiques |
| API | `apps/api/` | Contributions et validation administrateur | Node.js interne sur `127.0.0.1:3003` |
| Base | PostgreSQL | Contributions uniquement | Réseau local du VPS |

La recherche du dictionnaire reste côté navigateur. Il n’y a pas de raison de déplacer les fichiers JSON dans PostgreSQL tant que le volume et le besoin d’édition collaborative ne le justifient pas.

## Démarrage local

```bash
npm install --prefix apps/api
npm run check
python3 -m http.server 8080 --directory apps/web
```

Pour tester l’API :

```bash
cp apps/api/.env.example apps/api/.env
npm run api:install
npm run api:start
```

La base PostgreSQL et les variables d’environnement sont nécessaires pour les routes de contributions. Le endpoint `GET /api/health` peut être testé sans requête SQL.

## Contrôles qualité

`npm run check` exécute la vérification de syntaxe JavaScript, le parsing de tous les JSON et l’audit des références locales. L’audit détecte notamment les ressources absentes et les duplications binaires.

Les assets ont été normalisés avec des noms URL-safe. La source canonique des images de livres se trouve dans `apps/web/data/images/livres/`; le logo applicatif se trouve dans `apps/web/images/`. Les doublons prouvés et les références à des illustrations absentes ont été retirés.

## Déploiement VPS conseillé

Le frontend doit être servi par Nginx ou Caddy en HTTPS. L’API ne doit pas être exposée directement sur Internet : elle écoute sur `127.0.0.1:3003`, puis le reverse proxy publie uniquement `/api/` sous le même domaine que le frontend. Cette configuration évite les problèmes CORS et réduit la surface d’attaque.

Exemple de vérification avant déploiement :

```bash
ss -ltnp
ss -ltnp | grep -E ':(80|443|3003)\b' || true
```

Le port `3003` est le port applicatif documenté et utilisé par l’API. Le contrôle effectué dans l’environnement d’audit montre que le port n’est pas occupé ici ; l’état du VPS de production doit être vérifié directement sur celui-ci avant installation. Il ne serait pas honnête de déduire les ports du VPS depuis le sandbox.

Exemple de service systemd :

```ini
[Unit]
Description=Tadaksahak API
After=network.target postgresql.service

[Service]
WorkingDirectory=/srv/tadaksahak
EnvironmentFile=/srv/tadaksahak/apps/api/.env
ExecStart=/usr/bin/node /srv/tadaksahak/apps/api/src/server.js
Restart=on-failure
User=tadaksahak

[Install]
WantedBy=multi-user.target
```

Après mise en place, vérifier `curl -fsS http://127.0.0.1:3003/api/health`, puis tester le domaine HTTPS via le reverse proxy.

## Termux

Termux peut servir au développement et au déploiement Git :

```bash
pkg install git nodejs
 git clone https://github.com/terpoland4-star/Dictionnaire-Tadaksahak.git
cd Dictionnaire-Tadaksahak
npm run check
```

La base PostgreSQL et le processus API doivent rester sur le VPS ; Termux n’a pas besoin d’héberger le backend en production.

## Limites et prochaine étape

Le dépôt ne contient pas encore de tests navigateur automatisés, de pipeline CI ni de procédure de sauvegarde PostgreSQL. Ce sont les prochaines améliorations prioritaires avant une mise en production publique. Les contenus éditoriaux doivent aussi être relus séparément : un audit technique ne valide ni l’orthographe, ni les traductions, ni les droits de diffusion des documents et photographies.
