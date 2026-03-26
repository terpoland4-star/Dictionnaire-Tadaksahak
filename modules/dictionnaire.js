import { AppState } from "./state.js";
import { escapeHtml } from "./utils.js";

export function afficherMot(item) {
  AppState.motActuel = item;

  const motElem = document.getElementById("motTexte");
  const defElem = document.getElementById("definition");

  if (motElem) motElem.textContent = item.mot;

  if (defElem) {
    defElem.innerHTML = `
      <p><strong>Catégorie :</strong> ${escapeHtml(item.cat || "")}</p>
      <p><strong>${AppState.langue.toUpperCase()} :</strong> ${escapeHtml(item[AppState.langue] || "")}</p>
    `;
  }
}
