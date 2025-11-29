/* ===========================================================
   📘 Dictionnaire Tadakssahak Multilingue
   — Version complète avec pagination
   =========================================================== */

let vocabulaire = [];
let langueActuelle = "fr"; // langue de traduction
let searchLang = "td"; // langue de recherche
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

function normalizeText(s) {
  if (!s) return "";
  try {
    return s.toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  } catch {
    return s.toString().toLowerCase();
  }
}

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
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
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
   CHARGEMENT DU JSON
---------------------- */
async function chargerDictionnaire() {
  try {
    const response = await fetch("data/mots.json");
    vocabulaire = await response.json();
  } catch (err) {
    console.error("❌ Erreur JSON :", err);
    const main = document.querySelector("main");
    if (main) {
      const errDiv = document.createElement("div");
      errDiv.style.color = "#ffcccc";
      errDiv.textContent = "Impossible de charger le dictionnaire (data/mots.json).";
      main.prepend(errDiv);
    }
  }
}

/* ----------------------
   RECHERCHE + PAGINATION
---------------------- */
function initialiserRecherche() {
  const searchBar = document.getElementById("searchBar");
  const suggestionsList = document.getElementById("suggestions");
  const searchSection = document.querySelector(".search-section");
  let resultatsCourants = [];
  let currentPage = 1;
  const itemsPerPage = 10;

  // === Choix de la langue ===
  let select = document.getElementById("searchLangSelect");
  if (!select) {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.gap = "0.5rem";
    wrapper.style.marginBottom = "0.5rem";

    const label = document.createElement("label");
    label.textContent = "Chercher depuis :";
    label.style.color = "#ccc";

    select = document.createElement("select");
    select.id = "searchLangSelect";
    ["td","fr","en","ar"].forEach(v => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v === "td" ? "Tadaksahak" : v.toUpperCase();
      select.appendChild(opt);
    });
    select.value = searchLang;
    select.style.background = "#1c1f26";
    select.style.color = "#f1f1f1";
    wrapper.append(label, select);
    searchSection.insertBefore(wrapper, searchSection.firstChild);
  }

  select.addEventListener("change", () => {
    searchLang = select.value;
    updatePlaceholder();
    triggerInput();
  });

  function updatePlaceholder() {
    const map = { td: "Tadaksahak", fr: "Français", en: "Anglais", ar: "Arabe" };
    searchBar.placeholder = `Chercher un mot ${map[searchLang]}...`;
  }
  updatePlaceholder();

  function triggerInput() {
    const evt = new Event("input");
    searchBar.dispatchEvent(evt);
  }

  // === Algorithme de recherche fuzzy ===
  function chercher(queryRaw) {
    const query = normalizeText(queryRaw);
    if (!query) return [];

    const candidats = [];
    for (const item of vocabulaire) {
      const champ = searchLang === "td" ? item.mot : (item[searchLang] || "");
      const norm = normalizeText(champ);
      if (!norm) continue;

      if (norm.startsWith(query)) candidats.push({ item, score: 0 });
      else if (norm.includes(query)) candidats.push({ item, score: 1 });
      else {
        const dist = levenshtein(norm, query);
        if (dist <= Math.max(1, Math.floor(query.length * 0.35))) {
          candidats.push({ item, score: 2 + dist });
        }
      }
    }
    candidats.sort((a,b)=>a.score-b.score);
    return candidats.map(c=>c.item);
  }

  // === Pagination ===
  function afficherPage(page) {
    suggestionsList.innerHTML = "";
    const totalPages = Math.ceil(resultatsCourants.length / itemsPerPage);
    if (resultatsCourants.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Aucun résultat";
      li.style.opacity = "0.6";
      suggestionsList.appendChild(li);
      return;
    }

    page = Math.max(1, Math.min(page, totalPages));
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const slice = resultatsCourants.slice(start, start + itemsPerPage);

    slice.forEach(item => {
      const mot = item.mot || "";
      const traduction = item[searchLang] || "";
      const li = document.createElement("li");
      li.innerHTML = `<strong>${escapeHtml(mot)}</strong> — ${escapeHtml(traduction)}`;
      li.addEventListener("click", ()=>afficherMot(item));
      suggestionsList.appendChild(li);
    });

    const nav = document.createElement("div");
    nav.style.textAlign = "center";
    nav.style.marginTop = "0.5rem";
    nav.style.display = "flex";
    nav.style.justifyContent = "center";
    nav.style.gap = "0.4rem";

    const btnPrev = document.createElement("button");
    btnPrev.textContent = "⬅";
    btnPrev.disabled = (page === 1);
    btnPrev.onclick = () => afficherPage(page - 1);

    const info = document.createElement("span");
    info.textContent = `${page}/${totalPages}`;
    info.style.color = "#aaa";

    const btnNext = document.createElement("button");
    btnNext.textContent = "➡";
    btnNext.disabled = (page === totalPages);
    btnNext.onclick = () => afficherPage(page + 1);

    nav.append(btnPrev, info, btnNext);
    suggestionsList.appendChild(nav);
  }

  // === Input listener ===
  searchBar.addEventListener("input", () => {
    const q = searchBar.value.trim();
    if (!q) {
      suggestionsList.innerHTML = "";
      return;
    }
    resultatsCourants = chercher(q);
    afficherPage(1);
  });
}

/* ----------------------
   AFFICHAGE DU MOT
---------------------- */
function afficherMot(item) {
  motActuel = item;
  const motElem = getByAnyId("motTexte", "mot");
  if (motElem) {
    motElem.textContent = item.mot;
    motElem.style.opacity = 0;
    setTimeout(() => (motElem.style.opacity = 1), 150);
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
  }

  ajouterHistorique(item.mot);
}

/* ----------------------
   CHANGEMENT DE LANGUE
---------------------- */
function changerLangue(langue) {
  langueActuelle = langue;
  if (motActuel) afficherMot(motActuel);

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
  if (audio && motActuel && motActuel.audio) audio.play();
}

/* ----------------------
   AIDES
---------------------- */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

window.addEventListener("offline", () => {
  alert("⚠️ Vous êtes hors ligne. Le dictionnaire fonctionne en mode limité.");
});
