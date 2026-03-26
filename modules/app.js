import { AppState } from "./modules/state.js";
import { initSearch, chercher } from "./modules/search.js";
import { afficherMot } from "./modules/dictionnaire.js";
import { afficherLivres } from "./modules/livres.js";
import { reponseBot } from "./modules/chatbot.js";
import { initNavigation } from "./modules/navigation.js";
import { debounce } from "./modules/utils.js";
import { motSuivant, motPrecedent, updateNavigationUI } from "./modules/navigationMots.js";
import { initSwipe } from "./modules/swipe.js";

document.addEventListener("DOMContentLoaded", async () => {

  AppState.vocabulaire = await fetch("data/mots.json").then(r => r.json());
  AppState.livres = await fetch("data/livres.json").then(r => r.json());

  initSearch();
  initNavigation();
  afficherLivres();

  const searchBar = document.getElementById("searchBar");
  const suggestions = document.getElementById("suggestions");

  searchBar.addEventListener("input", debounce(() => {
    const results = chercher(searchBar.value);

    suggestions.innerHTML = "";

    results.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.mot;

      li.addEventListener("click", () => {
        const index = AppState.vocabulaire.findIndex(v => v.mot === item.mot);

        AppState.indexActuel = index;
        afficherMot(item);
        updateNavigationUI();
      });

      suggestions.appendChild(li);
    });

  }, 200));

  document.getElementById("btnNext").addEventListener("click", motSuivant);
  document.getElementById("btnPrev").addEventListener("click", motPrecedent);

  initSwipe(
    document.getElementById("ficheMot"),
    motSuivant,
    motPrecedent
  );

  document.getElementById("btnEnvoyer")
    .addEventListener("click", () => {
      const input = document.getElementById("chatInput");
      const rep = reponseBot(input.value);
      input.value = "";
      console.log(rep);
    });

});
