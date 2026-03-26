import { AppState } from "./state.js";
import { escapeHtml } from "./utils.js";

export function afficherLivres() {
  const cont = document.getElementById("livresContainer");
  if (!cont) return;

  if (!AppState.livres.length) {
    cont.innerHTML = "<p>Aucun livre disponible</p>";
    return;
  }

  cont.innerHTML = "";

  AppState.livres.forEach(l => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${escapeHtml(l.titre)}</h3>
      <p>${escapeHtml(l.description || "")}</p>
      <button class="btn-lire">Lire</button>
    `;

    div.querySelector(".btn-lire")
      .addEventListener("click", () => window.open(l.lien));

    cont.appendChild(div);
  });
}
