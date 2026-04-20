# 📚 Tadaksahak Learning – Dictionnaire et Grammaire

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![GitHub stars](https://img.shields.io/github/stars/terpoland4-star/Dictionnaire-Tadaksahak?style=social)](https://github.com/terpoland4-star/Dictionnaire-Tadaksahak)

> **"Une mission : connecter nos mondes."**

Bienvenue sur la plateforme **Tadaksahak Learning**. Ce dépôt contient une application web progressive (PWA) dédiée à la **langue et à la culture du peuple Idaksahak**, une communauté nomade du nord-est du Mali et de la région de Ménaka.

Ce projet est le fruit du travail de **Hamadine Ag Moctar**, interprète, développeur et gardien de la mémoire culturelle.

---

## 🌍 À propos du Tadaksahak

Le **Tadaksahak** (ou Dawsahak) est une langue **songhay septentrionale** fortement influencée par le **tamasheq (berbère)**. Elle est parlée par environ 30 000 à 40 000 personnes.
Cette langue, riche d'une histoire de contacts et de métissages, est aujourd'hui considérée comme un trésor linguistique à préserver.

Cette application vise à fournir un accès libre et gratuit à :
- Un **dictionnaire multilingue** (Tadaksahak - Français - Anglais - Arabe).
- Une **grammaire de référence** interactive (basée sur les travaux académiques de *Christiansen-Bolli, 2010*).
- Des **contes traditionnels**, des **émissions radio**, et des **ressources académiques**.

---

## ✨ Fonctionnalités Principales

- **📖 Dictionnaire Interactif** : Recherche plein texte, suggestions, index alphabétique, et navigation fluide.
- **📚 Grammaire en Livre Ouvert** : Une expérience de lecture immersive en double page, paginée et disponible en 3 langues.
- **🎙️ Médias Riches** : Galerie photos historiques (© Charles Grémont), contes audio, émissions radio.
- **🃏 Apprentissage Ludique** : Flashcards thématiques et quiz culturels pour tester ses connaissances.
- **🗺️ Cartographie** : Visualisation des zones dialectales (Ménaka, Talatayt, Infukaraytan).
- **📱 PWA (Progressive Web App)** : Installation possible sur mobile/ordinateur pour une utilisation **hors-ligne**.
- **🌙 Personnalisation** : Thèmes sombre, clair, sépia et mode contraste élevé pour une accessibilité optimale.

---

## 🚀 Accès Rapide

- **Application en ligne** : [https://terpoland4-star.github.io/Dictionnaire-Tadaksahak/](https://terpoland4-star.github.io/Dictionnaire-Tadaksahak/)
- **Dictionnaire** : Accédez directement au coeur de la langue.
- **Grammaire** : Explorez les 369 pages de la grammaire de référence découpées en 30 blocs thématiques.

---

## 📂 Structure du Projet
├── index.html # Point d'entrée de l'application
├── app.js # Logique principale (dictionnaire, livre, chat)
├── style.css # Design System complet (Dark/Light/Sepia)
├── sw.js # Service Worker (Mode Hors-ligne & Mise à jour auto)
├── data/ # Données structurées en JSON
│ ├── mots.json # Le dictionnaire enrichi
│ ├── grammaire.json # Les 30 blocs de la grammaire complète
│ ├── livres.json # Bibliothèque et rapports académiques
│ ├── quiz.json # Questions du quiz
│ └── ...
├── images/ # Ressources graphiques et photos historiques
├── livres/ # Pages de visualisation des livres/rapports
└── README.md

---

## 🛠️ Technologies Utilisées

- **HTML5 / CSS3 / JavaScript (ES6+)** : Pas de framework lourd, performance et légèreté.
- **Service Workers (PWA)** : Mise en cache avancée (Network First / Cache First).
- **Leaflet** : Librairie de cartographie interactive.
- **Design System "maison"** : Variables CSS, thèmes dynamiques et responsive.

---

## 📜 Licence

**Ce projet est sous licence Creative Commons Attribution - Pas d'Utilisation Commerciale - Partage dans les Mêmes Conditions 4.0 International (CC BY-NC-SA 4.0).**

[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

### ✅ Vous êtes autorisé à :
- **Partager** — copier, distribuer et communiquer le matériel par tous moyens et sous tous formats.
- **Adapter** — remixer, transformer et créer à partir du matériel.

### ⚠️ Selon les conditions suivantes :
- **Attribution** — Vous devez créditer l'Œuvre, intégrer un lien vers la licence et indiquer si des modifications ont été effectuées.
- **Pas d'Utilisation Commerciale** — Vous n'êtes pas autorisé à faire un usage commercial de cette Œuvre.
- **Partage dans les Mêmes Conditions** — Si vous modifiez, transformez ou créez à partir du matériel, vous devez diffuser l'Œuvre modifiée dans les mêmes conditions.

*Pour toute utilisation commerciale (application mobile payante, intégration dans un produit vendu), merci de contacter l'auteur.*

---

## 🙏 Remerciements et Crédits

Ce projet n'aurait pas pu voir le jour sans les travaux et le soutien de nombreuses personnes :

- **Linguistique et Académique** :
    - *Regula Christiansen-Bolli* pour sa grammaire de référence (2010, Leiden University).
    - *Niels Christiansen & Stephen H. Levinsohn* pour leur étude sur les propositions relatives (2003).
    - *Lameen Souag* pour ses travaux sur les langues songhay et berbères.
    - *Jeffrey Heath* pour ses dictionnaires et grammaires du songhay et du tamasheq.
- **Sources Historiques et Photographiques** :
    - *Charles Grémont* pour les magnifiques clichés historiques des chefs Idaksahak et de la région.
- **Communauté** :
    - Aux aînés et locuteurs Idaksahak qui transmettent cette langue unique.

---

## 👤 Auteur

**Hamadine Ag Moctar**
- Interprète, Développeur Web & Gardien de la mémoire culturelle.
- 📧 Contact : *[hamadineagmoctar@gmail.com]*

---
*Dernière mise à jour : Avril 2026*
