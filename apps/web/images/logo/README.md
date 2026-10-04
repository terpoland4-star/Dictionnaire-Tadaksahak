# Logo Tadaksahak

Logo inspiré du médaillon du dictionnaire (livre ouvert, dunes, ciel étoilé, croissant)
et du logo de la communauté Idaksahak (caravane de dromadaires, silhouette voilée).

Les fichiers `.svg` sont la source : vectoriels, sans police externe (le texte est converti
en tracés) et importables tels quels dans Figma, Illustrator ou Inkscape.

| Fichier | Usage |
|---|---|
| `embleme.svg` | Emblème complet, à partir de 96 px environ |
| `embleme-simple.svg` | Petites tailles : favicon, icônes ≤ 64 px |
| `logo-horizontal-sombre.svg` | En-tête, bannière sur fond sombre |
| `logo-horizontal-clair.svg` | Documents, impression, fond clair |
| `logo-vertical-sombre.svg` / `logo-vertical-clair.svg` | Formats carrés : réseaux sociaux, couvertures |

Les `.png` sont des exports prêts à l'emploi des mêmes fichiers.

## Couleurs (palette du site)

| Rôle | Couleur |
|---|---|
| Nuit | `#0a122a` → `#22356b` |
| Or | `#f2ca50`, clair `#ffe088`, foncé `#c99a2e` |
| Sable | `#e8a862`, ombre `#b9773f` |
| Couverture du livre | `#B83A3A` |
| Texte sur fond sombre | `#dbe1ff`, sous-titre `#d0c5af` |

## Typographie

- Nom : **Fraunces** Bold, approche +3 %
- Sous-titre : **Inter** SemiBold, capitales, approche +22 %

## Variante « orbite » (`orbite/`)

Le personnage assis de l'emblème communautaire (homme voilé lisant, takouba posée devant
lui), placé dans une orbite d'ingénierie inspirée du logo HGW : un arc effilé qui passe
derrière la tête et devant la robe, une orbite fine avec des nœuds de circuit, et les
symboles VI, V III, V=III, N'III et V'~ en satellites.

| Fichier | Fond |
|---|---|
| `orbite/embleme-orbite-sombre.svg` | Nuit `#0a122a`, orbite or, personnage clair |
| `orbite/embleme-orbite-noir.svg` | Noir et blanc (même rendu que la référence HGW) |
| `orbite/embleme-orbite-clair.svg` | Blanc, personnage nuit, accents or |

Source modifiable dans Figma : https://www.figma.com/design/flM2XnDCXF1yJF6tcskOie (composant « Logo Tadaksahak », propriétés Couleur et Afficher le nom ; badges « Badge symbole »).

Avec le nom « TADAKSAHAK » en dessous (Fraunces Bold) : `orbite/logo-orbite-{sombre,noir,clair}.svg`.

Les symboles sont en Inter ExtraBold, convertis en tracés. Trop fins en dessous de 128 px :
utiliser `embleme-simple.svg` pour le favicon.

## Logo officiel du site : monogramme (`monogramme/`)

Logo utilisé par le site depuis octobre 2026. La takouba tenue pointe vers le bas forme un
**T** (garde = barre, lame = jambage) ; elle veille sur le **Saint Coran** ouvert sur son
rehal, sans le toucher. Au-dessus, le **croissant étoilé** ; sur les pages, le **Rub el-Hizb**
(۞). Autour, une orbite d'ingénierie porte en satellites les symboles VI, V III, V=III,
N'III, V'~ et le **Yaz amazigh** (ⵣ), ainsi que des **étoiles rouges** en mémoire du sang
des martyrs. Nom en Montserrat Bold, sous-titre en Montserrat Regular (texte vectorisé).

| Fichier | Usage |
|---|---|
| `monogramme/logo-monogramme-{sombre,noir,clair}.svg` | Logo complet avec le nom (1080 × 1080) |
| `monogramme/embleme-monogramme-{sombre,noir,clair}.svg` | Emblème seul, sans le nom |
| `monogramme/icone-monogramme.svg` | Icône simplifiée : en-tête du site, favicon, icônes de l'application |

Fichiers du site générés depuis l'icône : `images/favicon-16.png`, `images/favicon-32.png`,
`images/apple-touch-icon.png`, `images/icon-*.png` (PWA, marge pour la zone sûre « maskable »)
et `images/og-image.jpg` (aperçu de partage 1200 × 630).

Version modifiable dans Adobe Express :
https://new.express.adobe.com/id/urn:aaid:sc:EU:51693292-65b1-429a-804e-8015524a8261
