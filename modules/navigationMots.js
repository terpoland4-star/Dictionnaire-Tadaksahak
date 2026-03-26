import { AppState } from "./state.js";
import { afficherMot } from "./dictionnaire.js";

export function motSuivant() {
  if (AppState.indexActuel < AppState.vocabulaire.length - 1) {
    AppState.indexActuel++;
    afficherMot(AppState.vocabulaire[AppState.indexActuel]);
    updateNavigationUI();
  }
}

export function motPrecedent() {
  if (AppState.indexActuel > 0) {
    AppState.indexActuel--;
    afficherMot(AppState.vocabulaire[AppState.indexActuel]);
    updateNavigationUI();
  }
}

export function updateNavigationUI() {
  const compteur = document.getElementById("compteurMot");

  if (!compteur) return;

  compteur.textContent = `${AppState.indexActuel + 1} / ${AppState.vocabulaire.length}`;

  document.getElementById("btnPrev").disabled = AppState.indexActuel <= 0;
  document.getElementById("btnNext").disabled =
    AppState.indexActuel >= AppState.vocabulaire.length - 1;
}
