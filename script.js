/* ===========================================================
   📘 Dictionnaire Tadakssahak Multilingue - Édition Oxford
   Auteur : Hamadine AG MOCTAR
   Version : 1.2 - Avec historique + animation + audio intelligent
   =========================================================== */

let vocabulaire = [];
let langueActuelle = "fr";
let motActuel = null;
let historique = [];

// === INITIALISATION DU DICTIONNAIRE ===
document.addEventListener("DOMContentLoaded", async () => {
  await chargerDictionnaire();
  initialiserRecherche();
  chargerHistorique();
  console.log("📚 Dictionnaire Tadakssahak prêt !");
});

// === CHARGEMENT DU JSON ===
async function chargerDictionnaire() {
  try {
    const response = await fetch("data/mots.json");
    vocabulaire = await response.json();
  } catch (err) {
    console.error("❌ Erreur lors du chargement du dictionnaire :", err);
  }
}

// === RECHERCHE AVEC SUGGESTIONS ===
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

    resultats.slice(0, 5).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.mot;
      li.addEventListener("click", () => afficherMot(item));
      suggestionsList.appendChild(li);
    });

    if (resultats.length > 0) {
      suggestionsList.classList.add("show");
    }
  });
}

// === AFFICHAGE DU MOT SELECTIONNÉ ===
function afficherMot(item) {
  motActuel = item;
  document.getElementById("mot").textContent = item.mot;
  document.getElementById("definition").textContent =
    item.definitions[langueActuelle] || "Définition indisponible.";

  const audio = document.getElementById("audio");
  if (item.audio) {
    audio.src = item.audio;
    audio.hidden = false;
  } else {
    audio.hidden = true;
  }

  // Enregistrer dans l’historique
  ajouterHistorique(item.mot);

  // Effacer les suggestions
  document.getElementById("suggestions").innerHTML = "";
  document.getElementById("suggestions").classList.remove("show");
  document.getElementById("searchBar").value = item.mot;

  // Animation douce sur le mot
  const motElem = document.getElementById("mot");
  motElem.style.opacity = 0;
  setTimeout(() => (motElem.style.opacity = 1), 100);
}

// === CHANGEMENT DE LANGUE ===
function changerLangue(langue) {
  langueActuelle = langue;

  if (motActuel) {
    document.getElementById("definition").textContent =
      motActuel.definitions[langueActuelle] || "Définition indisponible.";
  }

  document.querySelectorAll(".lang-switch button").forEach(btn => {
    const code = btn.textContent.toLowerCase();
    btn.style.background = code === langueActuelle ? "#005ed1" : "#0077ff";
  });
}

// === GESTION DE L’HISTORIQUE ===
function ajouterHistorique(mot) {
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];

  // Éviter les doublons
  historique = historique.filter(m => m !== mot);
  historique.unshift(mot);

  // Conserver les 10 derniers
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

// === INTERACTION AUDIO INTELLIGENTE ===
const audioElem = document.getElementById("audio");
if (audioElem) {
  audioElem.addEventListener("play", () => {
    console.log("▶ Lecture audio en cours…");
  });
  audioElem.addEventListener("ended", () => {
    console.log("⏹ Lecture terminée");
  });
}

// === GESTION DU MODE HORS-LIGNE ===
window.addEventListener("offline", () => {
  alert("⚠️ Vous êtes hors ligne. Le dictionnaire fonctionne en mode limité.");
});
window.addEventListener("online", () => {
  console.log("🌐 Connexion rétablie !");
});
