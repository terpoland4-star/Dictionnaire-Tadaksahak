/* ===========================================================
   📘 Dictionnaire Tadakssahak Multilingue - compatible JSON Hamadine
   - Recherche multi-langues (fr / en / ar / tadaksahak)
   - Suggestions tolérantes aux fautes (fuzzy / Levenshtein)
   - Placeholder dynamique selon la langue de recherche
   =========================================================== */

let vocabulaire = [];
let langueActuelle = "fr"; // langue d'affichage de la traduction
let searchLang = "td"; // langue utilisée pour la recherche : 'td' = Tadaksahak, 'fr','en','ar','ru'
let motActuel = null;
let historique = [];

/* ----------------------
   UTILITAIRES
   ---------------------- */
function getByAnyId(...ids) {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) return el;
  }
  return null;
}

// Normalisation simple : minuscules + suppression des diacritiques latins
function normalizeText(s) {
  if (!s) return "";
  try {
    return s
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  } catch (e) {
    return s.toString().toLowerCase();
  }
}

// Calcul de la distance de Levenshtein (classic)
// Source: implémentation standard, O(n*m)
function levenshtein(a, b) {
  const an = a.length, bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;

  const matrix = Array.from({ length: an + 1 }, () => new Array(bn + 1).fill(0));
  for (let i = 0; i <= an; i++) matrix[i][0] = i;
  for (let j = 0; j <= bn; j++) matrix[0][j] = j;

  for (let i = 1; i <= an; i++) {
    for (let j = 1; j <= bn; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,    // deletion
        matrix[i][j - 1] + 1,    // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return matrix[an][bn];
}

/* ----------------------
   INITIALISATION
   ---------------------- */
document.addEventListener("DOMContentLoaded", async () => {
  await chargerDictionnaire();
  initialiserRecherche();
  chargerHistorique();
  console.log("📚 Dictionnaire Tadakssahak prêt !");
});

/* ----------------------
   CHARGER DICTIONNAIRE
   ---------------------- */
async function chargerDictionnaire() {
  try {
    const response = await fetch("data/mots.json");
    vocabulaire = await response.json();
  } catch (err) {
    console.error("❌ Erreur lors du chargement du dictionnaire :", err);
    const main = document.querySelector("main");
    if (main) {
      const errDiv = document.createElement("div");
      errDiv.style.color = "#ffcccc";
      errDiv.style.margin = "1rem";
      errDiv.textContent = "Impossible de charger le dictionnaire. Vérifiez la connexion ou le fichier data/mots.json.";
      main.prepend(errDiv);
    }
  }
}

/* ----------------------
   RECHERCHE + SUGGESTIONS (avec fuzzy)
   ---------------------- */
function initialiserRecherche() {
  const searchBar = document.getElementById("searchBar");
  const suggestionsList = document.getElementById("suggestions");

  // Créer un select pour choisir la langue de recherche (injection dynamique si HTML non modifié)
  const searchSection = document.querySelector(".search-section");
  let select;
  if (searchSection) {
    const existing = document.getElementById("searchLangSelect");
    if (!existing) {
      const selectorWrapper = document.createElement("div");
      selectorWrapper.style.display = "flex";
      selectorWrapper.style.justifyContent = "center";
      selectorWrapper.style.marginBottom = "0.5rem";
      selectorWrapper.style.gap = "0.5rem";
      selectorWrapper.style.alignItems = "center";

      const label = document.createElement("label");
      label.textContent = "Chercher depuis :";
      label.style.fontSize = "0.9rem";
      label.style.color = "#ccc";

      select = document.createElement("select");
      select.id = "searchLangSelect";
      select.style.padding = "0.4rem";
      select.style.borderRadius = "6px";
      select.style.border = "1px solid #2b2f36";
      select.style.background = "#1c1f26";
      select.style.color = "#f1f1f1";

      const options = [
        { value: "td", label: "Tadaksahak" },
        { value: "fr", label: "FR" },
        { value: "en", label: "EN" },
        { value: "ar", label: "AR" }
      ];

      options.forEach(o => {
        const opt = document.createElement("option");
        opt.value = o.value;
        opt.textContent = o.label;
        select.appendChild(opt);
      });

      select.value = searchLang;
      select.addEventListener("change", () => {
        searchLang = select.value;
        updatePlaceholder();
        // recalculer suggestions pour la valeur actuelle
        triggerInput();
        searchBar.focus();
      });

      selectorWrapper.appendChild(label);
      selectorWrapper.appendChild(select);

      // Insérer au-dessus de la barre de recherche
      searchSection.insertBefore(selectorWrapper, searchSection.firstChild);
    } else {
      select = existing;
      select.value = searchLang;
      select.addEventListener("change", () => {
        searchLang = select.value;
        updatePlaceholder();
        triggerInput();
        searchBar.focus();
      });
    }
  }

  // Met à jour le placeholder selon la langue de recherche
  function updatePlaceholder() {
    const map = { td: "Tadaksahak", fr: "FR", en: "EN", ar: "AR", ru: "RU"  };
    if (searchBar) {
      searchBar.placeholder = `Chercher un mot ${map[searchLang] || ""}...`;
    }
  }
  updatePlaceholder();

  function triggerInput() {
    const evt = new Event("input");
    searchBar.dispatchEvent(evt);
  }

  // Fonction qui retourne les résultats triés et tolérants aux fautes
  function chercher(queryRaw) {
    const query = normalizeText(queryRaw);
    if (!query) return [];

    // Pour chaque item, calculer une "distance/score" : lower = meilleur
    const candidates = [];

    for (const item of vocabulaire) {
      const field = searchLang === "td" ? (item.mot || "") : (item[searchLang] || "");
      const normField = normalizeText(field);

      if (!normField) continue;

      // Pré-calculer conditions préférentielles
      if (normField.startsWith(query)) {
        // meilleur score pour prefix match
        candidates.push({ item, score: 0, displayField: field });
        continue;
      }
      if (normField.includes(query)) {
        // très bon score pour substring match
        candidates.push({ item, score: 1, displayField: field });
        continue;
      }

      // Sinon, calculer distance de Levenshtein pour tolérance aux fautes
      // seuil variable selon longueur de la query
      const dist = levenshtein(normField, query);
      const maxAllowed = Math.max(1, Math.floor(query.length * 0.35)); // heuristique
      if (dist <= maxAllowed) {
        // score basé sur la distance mais pondéré
        candidates.push({ item, score: 2 + dist, displayField: field });
      } else {
        // pour de longues chaines, on peut autoriser un peu plus (optionnel)
        // on ignore les très mauvais candidats
      }
    }

    // Trier par score puis par ordre alphabétique tadaksahak pour stabilité
    candidates.sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score;
      const am = normalizeText(a.item.mot);
      const bm = normalizeText(b.item.mot);
      return am < bm ? -1 : am > bm ? 1 : 0;
    });

    return candidates.map(c => c.item);
  }

  // Input handler
  searchBar.addEventListener("input", () => {
    const rawQuery = searchBar.value.trim();
    suggestionsList.innerHTML = "";
    suggestionsList.classList.remove("show");

    if (rawQuery.length === 0) return;

    const resultats = chercher(rawQuery);

    // Afficher un message si aucun résultat
    if (resultats.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Aucun résultat";
      li.style.opacity = "0.6";
      suggestionsList.appendChild(li);
    } else {
      resultats.slice(0, 12).forEach(item => {
        // texte affiché : mot Tadaksahak — (traduction recherchée) [lang]
        const matchedText = (searchLang === "td") ? (item.mot || "") : (item[searchLang] || "");
        const langLabel = searchLang === "td" ? "TD" : searchLang.toUpperCase();

        // mise en évidence très simple du fragment correspondant (si possible)
        const displayMatched = highlightMatch(matchedText, rawQuery);

        const li = document.createElement("li");
        li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong> — <span style="opacity:.95">${displayMatched}</span> <em style="opacity:.6">(${langLabel})</em>`;

        li.addEventListener("click", () => {
          // remplir la barre par le texte trouvé dans la langue recherchée (utile pour contexte)
          searchBar.value = matchedText;
          suggestionsList.innerHTML = "";
          suggestionsList.classList.remove("show");
          afficherMot(item);
        });
        suggestionsList.appendChild(li);
      });
    }

    if (resultats.length > 0) {
      suggestionsList.classList.add("show");
    }
  });

  // Touche Entrée : sélectionner la première suggestion si elle existe
  searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const first = suggestionsList.querySelector("li");
      if (first && first.textContent !== "Aucun résultat") {
        first.click();
        e.preventDefault();
      } else {
        // tentative d'exact match selon la langue choisie
        const raw = searchBar.value.trim();
        const norm = normalizeText(raw);
        let exact;
        if (searchLang === "td") {
          exact = vocabulaire.find(item => normalizeText(item.mot) === norm);
        } else {
          exact = vocabulaire.find(item => normalizeText(item[searchLang] || "") === norm);
        }
        if (exact) afficherMot(exact);
      }
    }
  });

  // Clic à l'extérieur : masquer les suggestions
  document.addEventListener("click", (e) => {
    if (!searchBar.contains(e.target) && !suggestionsList.contains(e.target)) {
      suggestionsList.innerHTML = "";
      suggestionsList.classList.remove("show");
    }
  });
}

/* ----------------------
   AFFICHAGE D'UN MOT
   ---------------------- */
function afficherMot(item) {
  motActuel = item;

  const motElem = getByAnyId("motTexte", "mot");
  if (motElem) {
    motElem.textContent = item.mot;
    motElem.style.opacity = 0;
    setTimeout(() => (motElem.style.opacity = 1), 150);
  } else {
    console.warn("Aucun élément #motTexte ni #mot trouvé dans la page.");
  }

  const definitionElem = document.getElementById("definition");
  if (definitionElem) {
    definitionElem.innerHTML = `
      <p><strong>Catégorie :</strong> ${escapeHtml(item.categorie || "")}</p>
      <p><strong>Prononciation :</strong> ${escapeHtml(item.prononciation || "")}</p>
      <p><strong>${langueActuelle.toUpperCase()} :</strong> ${
      escapeHtml(item[langueActuelle] || "Traduction non disponible.")
    }</p>
      <p><em>${escapeHtml(item.definition || "")}</em></p>
    `;
  }

  const audio = getByAnyId("audioLecteur", "audio");
  if (audio && item.audio) {
    audio.src = `audio/${item.audio}`;
    audio.hidden = false;
  } else if (audio) {
    audio.hidden = true;
    audio.removeAttribute("src");
  }

  ajouterHistorique(item.mot);
}

/* ----------------------
   CHANGEMENT DE LANGUE D'AFFICHAGE
   ---------------------- */
function changerLangue(langue) {
  langueActuelle = langue;

  if (motActuel) {
    const definitionElem = document.getElementById("definition");
    if (definitionElem) {
      definitionElem.innerHTML = `
        <p><strong>Catégorie :</strong> ${escapeHtml(motActuel.categorie || "")}</p>
        <p><strong>Prononciation :</strong> ${escapeHtml(motActuel.prononciation || "")}</p>
        <p><strong>${langueActuelle.toUpperCase()} :</strong> ${
        escapeHtml(motActuel[langueActuelle] || "Traduction non disponible.")
      }</p>
        <p><em>${escapeHtml(motActuel.definition || "")}</em></p>
      `;
    }
  }

  document.querySelectorAll(".lang-switch button").forEach(btn => {
    const code = btn.textContent.toLowerCase();
    btn.style.background = code === langueActuelle ? "#005ed1" : "#0077ff";
  });
}

/* ----------------------
   HISTORIQUE
   ---------------------- */
function ajouterHistorique(mot) {
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  historique = historique.filter(m => m !== mot);
  historique.unshift(mot);
  if (historique.length > 10) historique.pop();

  localStorage.setItem("historiqueTadakssahak", JSON.stringify(historique));
  afficherHistorique();
}

function chargerHistorique() {
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  afficherHistorique();
}

function afficherHistorique() {
  let footer = document.querySelector("footer");
  let bloc = document.getElementById("historique");
  if (!bloc) {
    bloc = document.createElement("div");
    bloc.id = "historique";
    bloc.style.marginTop = "1rem";
    bloc.style.color = "#ccc";
    bloc.style.fontSize = "0.85rem";
    footer.appendChild(bloc);
  }

  if (historique.length === 0) {
    bloc.innerHTML = "<em>Aucun mot consulté récemment.</em>";
  } else {
    bloc.innerHTML =
      "<strong>Derniers mots :</strong> " +
      historique
        .map(m => `<span class='mot-historique' onclick="rechercherDepuisHistorique('${m}')">${escapeHtml(m)}</span>`)
        .join(", ");
  }
}

function rechercherDepuisHistorique(mot) {
  const element = vocabulaire.find(v => v.mot === mot);
  if (element) afficherMot(element);
}

/* ----------------------
   AUDIO
   ---------------------- */
function jouerTadaksahak() {
  const audio = getByAnyId("audioLecteur", "audio");
  if (audio && motActuel && motActuel.audio) {
    audio.play();
  }
}

/* ----------------------
   PETITES FONCTIONS D'AIDE (sécurité / mise en évidence)
   ---------------------- */
// échappe du HTML basique pour éviter l'injection via le JSON (sécurise les innerHTML)
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// met en évidence la première occurrence de la sous-chaîne (après normalisation)
// on réalise la recherche sur la version non-normalisée pour conserver les accents visibles
function highlightMatch(text, queryRaw) {
  if (!text) return "";
  const normText = normalizeText(text);
  const normQuery = normalizeText(queryRaw);
  const idx = normText.indexOf(normQuery);
  if (idx === -1) {
    // pas de match direct, on retourne le texte échappé
    return escapeHtml(text);
  }
  // mettre en bold la portion correspondante sur le texte original
  const before = escapeHtml(text.slice(0, idx));
  const match = escapeHtml(text.slice(idx, idx + queryRaw.length));
  const after = escapeHtml(text.slice(idx + queryRaw.length));
  return `${before}<mark style="background:rgba(255,255,0,0.12);color:inherit;padding:0 .1rem;border-radius:2px">${match}</mark>${after}`;
}

window.addEventListener("offline", () => {
  alert("⚠️ Vous êtes hors ligne. Le dictionnaire fonctionne en mode limité.");
});
