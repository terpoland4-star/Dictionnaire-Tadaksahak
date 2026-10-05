# Configuration nginx

`dictionnaire.hamadine-services.net.conf` est la configuration du site en production,
installée sur le VPS dans `/etc/nginx/sites-available/` (lien dans `sites-enabled/`).

Le fichier du dépôt fait foi : toute modification se fait ici, puis est installée.

## Installer ou mettre à jour

```bash
cd /srv/tadaksahak && git pull
F=/etc/nginx/sites-available/dictionnaire.hamadine-services.net
diff "$F" deploy/nginx/dictionnaire.hamadine-services.net.conf   # relire avant d'installer
sudo cp "$F" ~/dictionnaire.nginx.bak.$(date +%Y%m%d_%H%M%S)        # jamais dans sites-enabled/
sudo cp deploy/nginx/dictionnaire.hamadine-services.net.conf "$F"
sudo nginx -t && sudo systemctl reload nginx
```

Si `nginx -t` échoue, nginx n'est pas rechargé : le site continue avec l'ancienne
configuration. Remettre la sauvegarde avec `sudo cp ~/dictionnaire.nginx.bak.<date> "$F"`.

## Vérifier

```bash
for u in / /sw.js /data/mots.json /style.css /images/idaksahak_round.png; do
  echo "== $u"; curl -sI -H "Accept-Encoding: gzip" "https://dictionnaire.hamadine-services.net$u" \
    | grep -iE "^HTTP|content-encoding|cache-control|strict-transport"
done
curl -6 -sI https://dictionnaire.hamadine-services.net/ | head -1
```

## Points d'attention

- **Certbot** modifie ce fichier lors de l'ajout d'un domaine (lignes `# managed by Certbot`).
  Le simple renouvellement ne le touche pas. Après un `certbot --nginx`, recopier le fichier
  du serveur ici.
- **IPv6** : le domaine a un enregistrement AAAA. Sans les lignes `listen [::]:…`, les
  visiteurs IPv6 reçoivent le certificat d'un autre site du serveur.
- **En-têtes** : un `add_header` dans une location imbriquée annule tous ceux de `location /`.
  Pour le cache, utiliser `expires`.
- **Pas de Content-Security-Policy pour l'instant** : le site charge des ressources depuis
  unpkg, Google Fonts, Google Tag Manager, OpenStreetMap… Une CSP mal réglée casserait ces
  fonctions ; à introduire d'abord en `Content-Security-Policy-Report-Only`.
