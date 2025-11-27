/* ===========================================================
   📘 Dictionnaire Tadakssahak Multilingue - compatible JSON Hamadine
   =========================================================== */

let vocabulaire = [];
let langueActuelle = "fr";
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
    // Afficher un message utilisateur possible ici (amélioration future)
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

      // Au clic : remplir la barre de recherche, masquer les suggestions et afficher le mot
      li.addEventListener("click", () => {
        searchBar.value = item.mot;
        suggestionsList.innerHTML = "";
        suggestionsList.classList.remove("show");
        afficherMot(item);
      });

      suggestionsList.appendChild(li);
    });

    if (resultats.length > 0) {
      suggestionsList.classList.add("show");
    }
  });

  // Touche Entrée : sélectionner la première suggestion si elle existe
  searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const first = suggestionsList.querySelector("li");
      if (first) {
        first.click();
        e.preventDefault();
      } else {
        // éventuellement lancer une recherche exacte
        const query = searchBar.value.trim().toLowerCase();
        const exact = vocabulaire.find(item => item.mot.toLowerCase() === query);
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
      <p><strong>Catégorie :</strong> ${item.categorie}</p>
      <p><strong>Prononciation :</strong> ${item.prononciation}</p>
      <p><strong>${langueActuelle.toUpperCase()} :</strong> ${
        item[langueActuelle] || "Traduction non disponible."
      }</p>
      <p><em>${item.definition}</em></p>
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

// === CHANGEMENT DE LANGUE ===
function changerLangue(langue) {
  langueActuelle = langue;

  if (motActuel) {
    const definitionElem = document.getElementById("definition");
    if (definitionElem) {
      definitionElem.innerHTML = `
        <p><strong>Catégorie :</strong> ${motActuel.categorie}</p>
        <p><strong>Prononciation :</strong> ${motActuel.prononciation}</p>
        <p><strong>${langueActuelle.toUpperCase()} :</strong> ${
          motActuel[langueActuelle] || "Traduction non disponible."
        }</p>
        <p><em>${motActuel.definition}</em></p>
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
