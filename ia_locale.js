/* ===========================================================
   🤖 IA locale intelligente - Dictionnaire Tadakssahak Multilingue
   Auteur : Hamadine Ag Moctar
   Version : 1.3
   - Compréhension étendue de questions naturelles
   - Réponses issues du dictionnaire JSON
   - Fichiers thématiques hors ligne
   - Historique et effet d’apparition
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initialiserIA();
});

function initialiserIA() {
  const main = document.querySelector("main");
  if (!main) return;

  const section = document.createElement("section");
  section.className = "ia-section";
  section.innerHTML = `
    <h2>💬 Assistant Tadakssahak</h2>
    <p>Posez une question sur un mot ou la langue :</p>
    <div class="ia-input-zone">
      <input id="iaQuestion" type="text" placeholder="Ex : Que veut dire afay ?" />
      <button id="iaEnvoyer">Demander</button>
    </div>
    <div id="iaReponse" class="ia-reponse"></div>
    <div id="iaHistorique" class="ia-historique"></div>
  `;
  main.appendChild(section);

  const input = document.getElementById("iaQuestion");
  const button = document.getElementById("iaEnvoyer");
  const output = document.getElementById("iaReponse");

  // Charger historique
  afficherHistorique();

  async function traiterQuestion() {
    const question = input.value.trim().toLowerCase();
    if (!question) return;

    output.innerHTML = `<div class="loader"></div><em>Analyse de la question...</em>`;

    setTimeout(async () => {
      const motCible = extraireMotDeQuestion(question);

      if (motCible) {
        const resultat = chercherMotDansJSON(motCible);
        if (resultat) {
          enregistrerHistorique(motCible);
          output.innerHTML = genererReponseMot(resultat);
          return;
        }
      }

      const fichier = trouverFichierPourQuestion(question);
      if (fichier) {
        try {
          const resp = await fetch(`ia/${fichier}`);
          if (!resp.ok) throw new Error("Fichier introuvable");
          const html = await resp.text();
          enregistrerHistorique(question);
          output.innerHTML = html;
        } catch (err) {
          output.innerHTML = `<p style="color:#f88">Erreur lors du chargement de ${fichier}</p>`;
        }
        return;
      }

      output.innerHTML = `
        <p>❌ Je ne trouve pas encore la réponse à cette question.</p>
        <p>Essayez avec un mot en Tadakssahak ou un thème connu (grammaire, culture, salutations...)</p>
      `;
    }, 600);
  }

  button.addEventListener("click", traiterQuestion);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") traiterQuestion();
  });
}

/* ===========================================================
   🧠 COMPRÉHENSION ÉTENDUE DE QUESTIONS
   ----------------------------------------------------------- */
function extraireMotDeQuestion(question) {
  const patterns = [
    /que\s+(?:signifie|veut\s+dire)\s+([a-zA-Z\u0600-\u06FF]+)/,
    /ça\s+veut\s+dire\s+quoi\s+([a-zA-Z\u0600-\u06FF]+)/,
    /traduction\s+(?:de|du)\s+([a-zA-Z\u0600-\u06FF]+)/,
    /comment\s+(?:dire|écrire)\s+([a-zA-Z\u0600-\u06FF]+)/,
    /c'?est\s+quoi\s+([a-zA-Z\u0600-\u06FF]+)/,
    /qu'?est-ce\s+que\s+([a-zA-Z\u0600-\u06FF]+)/,
    /explique\s+([a-zA-Z\u0600-\u06FF]+)/,
    /mot\s+([a-zA-Z\u0600-\u06FF]+)/,
  ];
  for (const p of patterns) {
    const match = question.match(p);
    if (match) return match[1];
  }
  const mots = question.split(/\s+/);
  return mots[mots.length - 1];
}

/* ===========================================================
   🔍 RECHERCHE DANS LE JSON
   ----------------------------------------------------------- */
function chercherMotDansJSON(mot) {
  if (!window.vocabulaire || vocabulaire.length === 0) return null;
  const norm = normalizeText(mot);
  return vocabulaire.find(item =>
    [item.mot, item.fr, item.en, item.ar]
      .filter(Boolean)
      .some(val => normalizeText(val) === norm)
  );
}

/* ===========================================================
   🗣️ GÉNÉRATION DE LA RÉPONSE
   ----------------------------------------------------------- */
function genererReponseMot(item) {
  return `
    <div class="fade-in">
      <h3>${escapeHtml(item.mot)}</h3>
      <p><strong>Prononciation :</strong> ${escapeHtml(item.prononciation || "-")}</p>
      <p><strong>Catégorie :</strong> ${escapeHtml(item.categorie || "-")}</p>
      <p><strong>Français :</strong> ${escapeHtml(item.fr || "—")}</p>
      <p><strong>Anglais :</strong> ${escapeHtml(item.en || "—")}</p>
      <p><strong>Arabe :</strong> ${escapeHtml(item.ar || "—")}</p>
      ${item.definition ? `<p><em>${escapeHtml(item.definition)}</em></p>` : ""}
      ${item.audio ? `<audio controls src="audio/${item.audio}" style="margin-top:0.5rem;width:100%"></audio>` : ""}
    </div>
  `;
}

/* ===========================================================
   📄 FICHIERS HTML THÉMATIQUES
   ----------------------------------------------------------- */
function trouverFichierPourQuestion(question) {
  const mots = question.split(/\s+/);
  const mapping = [
    { mots: ["bonjour", "salutation", "saluer"], fichier: "bonjour.html" },
    { mots: ["merci", "remerciement"], fichier: "merci.html" },
    { mots: ["grammaire", "verbe", "conjugaison", "nom", "phrase"], fichier: "grammaire.html" },
    { mots: ["culture", "tradition", "histoire", "idaksahak"], fichier: "culture.html" },
    { mots: ["aide", "utiliser", "fonction", "recherche"], fichier: "aide.html" },
    { mots: ["auteur", "hamadine", "projet"], fichier: "auteur.html" },
  ];
  for (const entry of mapping) {
    if (entry.mots.some(m => mots.includes(m))) return entry.fichier;
  }
  return null;
}

/* ===========================================================
   📜 HISTORIQUE LOCAL
   ----------------------------------------------------------- */
function enregistrerHistorique(question) {
  let hist = JSON.parse(localStorage.getItem("iaHistorique") || "[]");
  hist.unshift(question);
  hist = [...new Set(hist)].slice(0, 5);
  localStorage.setItem("iaHistorique", JSON.stringify(hist));
  afficherHistorique();
}

function afficherHistorique() {
  const cont = document.getElementById("iaHistorique");
  if (!cont) return;
  const hist = JSON.parse(localStorage.getItem("iaHistorique") || "[]");
  if (hist.length === 0) {
    cont.innerHTML = "";
    return;
  }
  cont.innerHTML = `<h4>🕓 Dernières recherches :</h4><ul>` +
    hist.map(h => `<li class="mot-historique">${escapeHtml(h)}</li>`).join("") +
    `</ul>`;
  cont.querySelectorAll(".mot-historique").forEach(el => {
    el.onclick = () => {
      document.getElementById("iaQuestion").value = el.textContent;
      document.getElementById("iaEnvoyer").click();
    };
  });
}

/* ===========================================================
   🔒 UTILITAIRES
   ----------------------------------------------------------- */
function normalizeText(str) {
  return str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
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
