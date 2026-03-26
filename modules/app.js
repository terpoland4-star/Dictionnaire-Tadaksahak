import { AppState } from "./modules/state.js";
import { initSearch, chercher } from "./modules/search.js";
import { afficherMot } from "./modules/dictionnaire.js";
import { afficherLivres } from "./modules/livres.js";
import { reponseBot } from "./modules/chatbot.js";
import { initNavigation } from "./modules/navigation.js";
import { debounce } from "./modules/utils.js";

document.addEventListener("DOMContentLoaded", async () => {

  // Chargement données
  AppState.vocabulaire = await fetch("data/mots.json").then(r => r.json());
  AppState.livres = await fetch("data/livres.json").then(r => r.json());

  // Init modules
  initSearch();
  initNavigation();
  afficherLivres();

  // Recherche
  const searchBar = document.getElementById("searchBar");
  const suggestions = document.getElementById("suggestions");

  searchBar.addEventListener("input", debounce(() => {
    const results = chercher(searchBar.value);

    suggestions.innerHTML = "";

    results.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.mot;

      li.addEventListener("click", () => afficherMot(item));

      suggestions.appendChild(li);
    });

  }, 200));

  // Chat
  document.getElementById("btnEnvoyer")
    .addEventListener("click", () => {
      const input = document.getElementById("chatInput");
      const msg = input.value;
      input.value = "";

      const rep = reponseBot(msg);

      console.log(rep); // à afficher dans UI
    });

});
