/* ===========================================================
   📘 Dictionnaire Tadakssahak Multilingue - compatible JSON Hamadine
   =========================================================== */

let vocabulaire = [];
let langueActuelle = "fr";
let motActuel = null;
let historique = [];

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
  }
}

// === BARRE DE RECHERCHE + SUGGESTIONS ===
function initialiserRecherche() {
  const searchBar = document.getElementById("searchBar");
  const suggestionsList = document.getElementById("suggestions");

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim().toLowerCase();
    suggestionsList.innerHTML = "";
    suggestionsList.classList.remove("show");

    if (query.length === 0) return;

    const resultats = vocabulaire.filter(item =>
      item.mot.toLowerCase().startsWith(query)
    );

    resultats.slice(0, 8).forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.mot} (${item.categorie})`;
      li.addEventListener("click", () => afficherMot(item));
      suggestionsList.appendChild(li);
    });

    if (resultats.length > 0) {
      suggestionsList.classList.add("show");
    }
  });
}

// === AFFICHER UN MOT ===
function afficherMot(item) {
  motActuel = item;

  document.getElementById("motTexte").textContent = item.mot;
  document.getElementById("definition").innerHTML = `
    <p><strong>Catégorie :</strong> ${item.categorie}</p>
    <p><strong>Prononciation :</strong> ${item.prononciation}</p>
    <p><strong>${langueActuelle.toUpperCase()} :</strong> ${
      item[langueActuelle] || "Traduction non disponible."
    }</p>
    <p><em>${item.definition}</em></p>
  `;

  const audio = document.getElementById("audioLecteur");
  if (audio && item.audio) {
    audio.src = `audio/${item.audio}`;
    audio.hidden = false;
  } else if (audio) {
    audio.hidden = true;
  }

  ajouterHistorique(item.mot);

  const motElem = document.getElementById("motTexte");
  motElem.style.opacity = 0;
  setTimeout(() => (motElem.style.opacity = 1), 150);
}

// === CHANGEMENT DE LANGUE ===
function changerLangue(langue) {
  langueActuelle = langue;

  if (motActuel) {
    document.getElementById("definition").innerHTML = `
      <p><strong>Catégorie :</strong> ${motActuel.categorie}</p>
      <p><strong>Prononciation :</strong> ${motActuel.prononciation}</p>
      <p><strong>${langueActuelle.toUpperCase()} :</strong> ${
        motActuel[langueActuelle] || "Traduction non disponible."
      }</p>
      <p><em>${motActuel.definition}</em></p>
    `;
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
  const audio = document.getElementById("audioLecteur");
  if (audio && motActuel && motActuel.audio) {
    audio.play();
  }
}

window.addEventListener("offline", () => {
  alert("⚠️ Vous êtes hors ligne. Le dictionnaire fonctionne en mode limité.");
});
