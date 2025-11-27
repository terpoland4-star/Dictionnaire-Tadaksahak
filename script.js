/* ===========================================================
   📘 Dictionnaire Tadakssahak Multilingue - compatible JSON Hamadine
   - Recherche multi-langues (fr / en / ar / tadaksahak)
   =========================================================== */

let vocabulaire = [];
let langueActuelle = "fr"; // langue d'affichage de la traduction
let searchLang = "td"; // langue utilisée pour la recherche : 'td' = Tadakssahak, 'fr','en','ar'
let motActuel = null;
let historique = [];

// Helper: récupérer le premier élément correspondant à une liste d'IDs
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
    // Supprime les diacritiques (accents) pour la plupart des langues latines
    return s
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  } catch (e) {
    return s.toString().toLowerCase();
  }
}

// === INITIALISATION ===
document.addEventListener("DOMContentLoaded", async () => {
  await chargerDictionnaire();
  initialiserRecherche();
  chargerHistorique();
  console.log("📚 Dictionnaire Tadakssahak prêt !");
});

// === CHARGER LES MOTS ===
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

// === BARRE DE RECHERCHE + SUGGESTIONS (multi-langues) ===
function initialiserRecherche() {
  const searchBar = document.getElementById("searchBar");
  const suggestionsList = document.getElementById("suggestions");

  // Créer un select pour choisir la langue de recherche (injection dynamique si HTML non modifié)
  const searchSection = document.querySelector(".search-section");
  if (searchSection) {
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

    const select = document.createElement("select");
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
      // recalculer suggestions pour la valeur actuelle
      triggerInput();
      // mettre le focus sur la barre
      searchBar.focus();
    });

    selectorWrapper.appendChild(label);
    selectorWrapper.appendChild(select);

    // Insérer au-dessus de la barre de recherche
    searchSection.insertBefore(selectorWrapper, searchSection.firstChild);
  }

  function triggerInput() {
    const evt = new Event("input");
    searchBar.dispatchEvent(evt);
  }

  searchBar.addEventListener("input", () => {
    const rawQuery = searchBar.value.trim();
    const query = normalizeText(rawQuery);
    suggestionsList.innerHTML = "";
    suggestionsList.classList.remove("show");

    if (query.length === 0) return;

    // Filtrer selon la langue de recherche
    const resultats = vocabulaire.filter(item => {
      if (searchLang === "td") {
        return normalizeText(item.mot).startsWith(query);
      } else {
        const field = item[searchLang] || "";
        return normalizeText(field).startsWith(query);
      }
    });

    // Afficher un message si aucun résultat
    if (resultats.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Aucun résultat";
      li.style.opacity = "0.6";
      suggestionsList.appendChild(li);
    } else {
      resultats.slice(0, 12).forEach(item => {
        // texte affiché : mot Tadakssahak — (traduction recherchée) [lang]
        let matchedText = "";
        if (searchLang === "td") matchedText = item.mot;
        else matchedText = item[searchLang] || "";

        const langLabel = searchLang === "td" ? "TD" : searchLang.toUpperCase();

        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.mot}</strong> — <span style="opacity:.9">${matchedText}</span> <em style="opacity:.6">(${langLabel})</em>`;

        // Au clic : afficher le mot Tadakssahak correspondant
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

// === AFFICHER UN MOT ===
function afficherMot(item) {
  motActuel = item;

  // Supporter plusieurs IDs possibles dans index.html (motTexte ou mot)
  const motElem = getByAnyId("motTexte", "mot");
  if (motElem) {
    motElem.textContent = item.mot;
    // animation simple
    motElem.style.opacity = 0;
    setTimeout(() => (motElem.style.opacity = 1), 150);
  } else {
    console.warn("Aucun élément #motTexte ni #mot trouvé dans la page.");
  }

  const definitionElem = document.getElementById("definition");
  if (definitionElem) {
    definitionElem.innerHTML = `
      <p><strong>Catégorie :</strong> ${item.categorie || ""}</p>
      <p><strong>Prononciation :</strong> ${item.prononciation || ""}</p>
      <p><strong>${langueActuelle.toUpperCase()} :</strong> ${
      item[langueActuelle] || "Traduction non disponible."
    }</p>
      <p><em>${item.definition || ""}</em></p>
    `;
  }

  // Supporter plusieurs IDs d'audio (audioLecteur ou audio)
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

// === CHANGEMENT DE LANGUE D'AFFICHAGE ===
function changerLangue(langue) {
  langueActuelle = langue;

  if (motActuel) {
    const definitionElem = document.getElementById("definition");
    if (definitionElem) {
      definitionElem.innerHTML = `
        <p><strong>Catégorie :</strong> ${motActuel.categorie || ""}</p>
        <p><strong>Prononciation :</strong> ${motActuel.prononciation || ""}</p>
        <p><strong>${langueActuelle.toUpperCase()} :</strong> ${
        motActuel[langueActuelle] || "Traduction non disponible."
      }</p>
        <p><em>${motActuel.definition || ""}</em></p>
      `;
    }
  }

  document.querySelectorAll(".lang-switch button").forEach(btn => {
    const code = btn.textContent.toLowerCase();
    btn.style.background = code === langueActuelle ? "#005ed1" : "#0077ff";
  });
}

// === HISTORIQUE ===
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
        .map(m => `<span class='mot-historique' onclick="rechercherDepuisHistorique('${m}')">${m}</span>`)
        .join(", ");
  }
}

function rechercherDepuisHistorique(mot) {
  const element = vocabulaire.find(v => v.mot === mot);
  if (element) afficherMot(element);
}

// === AUDIO LECTURE ===
function jouerTadaksahak() {
  const audio = getByAnyId("audioLecteur", "audio");
  if (audio && motActuel && motActuel.audio) {
    audio.play();
  }
}

window.addEventListener("offline", () => {
  alert("⚠️ Vous êtes hors ligne. Le dictionnaire fonctionne en mode limité.");
});
