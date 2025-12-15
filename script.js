/* ===========================================================
   🤖 IA Tadakssahak v1.5 — Dictionnaire Multilingue Intelligent
   Auteur : Hamadine Ag Moctar
   Base : moteur fuzzy + IA conversationnelle locale
   100 % offline — JSON only
   =========================================================== */

/* ===========================================================
   🌍 VARIABLES GLOBALES
   =========================================================== */

let vocabulaire = [];
let langueActuelle = "fr";
let searchLang = "td";
let motActuel = null;
let historique = [];

// IA
let iaIndex = new Map();
let iaMemoire = [];

/* ===========================================================
   🧰 UTILITAIRES
   =========================================================== */

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
    return s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  } catch {
    return s.toString().toLowerCase();
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ===========================================================
   🧮 LEVENSHTEIN (FUZZY)
   =========================================================== */

function levenshtein(a, b) {
  const an = a.length, bn = b.length;
  if (!an) return bn;
  if (!bn) return an;

  const m = Array.from({ length: an + 1 }, () => new Array(bn + 1));
  for (let i = 0; i <= an; i++) m[i][0] = i;
  for (let j = 0; j <= bn; j++) m[0][j] = j;

  for (let i = 1; i <= an; i++) {
    for (let j = 1; j <= bn; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      m[i][j] = Math.min(
        m[i - 1][j] + 1,
        m[i][j - 1] + 1,
        m[i - 1][j - 1] + cost
      );
    }
  }
  return m[an][bn];
}

/* ===========================================================
   📚 CHARGEMENT DU DICTIONNAIRE
   =========================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  await chargerDictionnaire();
  construireIndexIA();
  initialiserRecherche();
  initialiserIA();
  chargerHistorique();
  console.log("🤖 IA Tadakssahak v1.5 prête");
});

async function chargerDictionnaire() {
  const response = await fetch("data/mots.json");
  vocabulaire = await response.json();
}

/* ===========================================================
   🧠 INDEX IA
   =========================================================== */

function construireIndexIA() {
  iaIndex.clear();
  vocabulaire.forEach(item => {
    [item.mot, item.fr, item.en, item.ar].filter(Boolean).forEach(v => {
      const n = normalizeText(v);
      iaIndex.set(n, item);
      if (n.endsWith("s")) iaIndex.set(n.slice(0, -1), item);
    });
  });
}

/* ===========================================================
   🔍 RECHERCHE FUZZY (INTÉGRALE)
   =========================================================== */

function initialiserRecherche() {
  const searchBar = document.getElementById("searchBar");
  const suggestions = document.getElementById("suggestions");

  function chercher(queryRaw) {
    const query = normalizeText(queryRaw);
    if (!query) return [];

    const candidats = [];

    for (const item of vocabulaire) {
      const champ = searchLang === "td" ? item.mot : item[searchLang];
      if (!champ) continue;

      const norm = normalizeText(champ);

      if (norm.startsWith(query)) {
        candidats.push({ item, score: 0 });
        continue;
      }
      if (norm.includes(query)) {
        candidats.push({ item, score: 1 });
        continue;
      }

      const dist = levenshtein(norm, query);
      if (dist <= Math.max(1, Math.floor(query.length * 0.35))) {
        candidats.push({ item, score: 2 + dist });
      }
    }

    candidats.sort((a, b) => a.score - b.score);
    return candidats.map(c => c.item);
  }

  searchBar.addEventListener("input", () => {
    suggestions.innerHTML = "";
    const q = searchBar.value.trim();
    if (!q) return;

    const res = chercher(q).slice(0, 12);
    if (!res.length) {
      suggestions.innerHTML = "<li>Aucun résultat</li>";
      return;
    }

    res.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong>`;
      li.onclick = () => afficherMot(item);
      suggestions.appendChild(li);
    });
  });
}

/* ===========================================================
   📘 AFFICHAGE D’UN MOT
   =========================================================== */

function afficherMot(item) {
  motActuel = item;

  const motEl = getByAnyId("motTexte", "mot");
  if (motEl) motEl.textContent = item.mot;

  const def = document.getElementById("definition");
  if (def) {
    def.innerHTML = `
      <p><strong>Catégorie :</strong> ${escapeHtml(item.categorie || "")}</p>
      <p><strong>Prononciation :</strong> ${escapeHtml(item.prononciation || "")}</p>
      <p><strong>${langueActuelle.toUpperCase()} :</strong> ${escapeHtml(item[langueActuelle] || "")}</p>
      <p><em>${escapeHtml(item.definition || "")}</em></p>
    `;
  }

  ajouterHistorique(item.mot);
}

/* ===========================================================
   🤖 IA CONVERSATIONNELLE
   =========================================================== */

function initialiserIA() {
  const main = document.querySelector("main");
  const bloc = document.createElement("section");
  bloc.innerHTML = `
    <h3>🤖 Assistant Tadakssahak</h3>
    <input id="iaInput" placeholder="Ex : Que veut dire afay ?" />
    <div id="iaOutput"></div>
  `;
  main.appendChild(bloc);

  document.getElementById("iaInput").addEventListener("keydown", e => {
    if (e.key === "Enter") traiterIA(e.target.value);
  });
}

function traiterIA(q) {
  const out = document.getElementById("iaOutput");
  out.innerHTML = "⏳ Réflexion…";

  setTimeout(() => {
    const mot = q.split(" ").pop();
    const res = iaIndex.get(normalizeText(mot));
    if (res) {
      afficherMot(res);
      out.innerHTML = `👉 <strong>${res.mot}</strong> : ${escapeHtml(res.definition || "")}`;
    } else {
      out.innerHTML = "❌ Mot non reconnu.";
    }
  }, 400);
}

/* ===========================================================
   📜 HISTORIQUE
   =========================================================== */

function ajouterHistorique(mot) {
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  historique.unshift(mot);
  historique = [...new Set(historique)].slice(0, 10);
  localStorage.setItem("historiqueTadakssahak", JSON.stringify(historique));
}

function chargerHistorique() {
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
}
