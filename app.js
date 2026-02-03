/* =====================================================
   APP.JS – TADAKSAHAK LEARNING
   Version propre, stable, maintenable
   Auteur : Hamadine Ag Moctar
===================================================== */

/* =========================
   UTILITAIRES
========================= */

function escapeHtml(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================
   NAVIGATION SECTIONS
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("sectionSelector");
  const sections = document.querySelectorAll("main > section");

  function afficherSection(id) {
    sections.forEach(sec => sec.hidden = sec.id !== id);
    localStorage.setItem("lastSection", id);

    if (id === "livres") afficherLivres();
  }

  if (select) {
    select.addEventListener("change", () => afficherSection(select.value));
    const last = localStorage.getItem("lastSection") || "accueil";
    select.value = last;
    afficherSection(last);
  }

  const toggleChat = document.getElementById("toggleChatBot");
  toggleChat?.addEventListener("click", () => {
    select.value = "chat";
    afficherSection("chat");
  });
});

/* =========================
   CHAT BOT SIMPLE
========================= */

const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const btnEnvoyer = document.getElementById("btnEnvoyer");

function ajouterMessage(texte, auteur = "bot") {
  if (!chatWindow) return;

  const div = document.createElement("div");
  div.className = `message ${auteur}`;
  div.innerHTML = escapeHtml(texte);
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

btnEnvoyer?.addEventListener("click", envoyerMessage);
chatInput?.addEventListener("keypress", e => {
  if (e.key === "Enter") envoyerMessage();
});

function envoyerMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  ajouterMessage(msg, "user");
  chatInput.value = "";

  setTimeout(() => {
    ajouterMessage("Je suis encore en apprentissage. Explore les sections 📚 🎧 🎥");
  }, 500);
}

/* =========================
   LIVRES – BIBLIOTHÈQUE
========================= */

function afficherLivres(liste = window.livresData) {
  const cont = document.getElementById("livresContainer");
  if (!cont || !Array.isArray(liste)) return;

  cont.innerHTML = "";

  liste.forEach(l => {
    const card = document.createElement("div");
    card.className = "livre-card";

    card.innerHTML = `
      <div class="livre-titre">${escapeHtml(l.titre)}</div>
      <div class="livre-auteur">${escapeHtml(l.auteur)} • ${l.annee}</div>
      <div class="livre-desc">${escapeHtml(l.description)}</div>
      <div class="livre-meta">${l.type} — ${l.langue}</div>

      <div class="livre-actions">
        <button class="btn-lire">📖 Lire</button>
        <button class="btn-bot">🤖 Résumé</button>
      </div>
    `;

    card.querySelector(".btn-lire")
      .addEventListener("click", () => window.open(l.lien, "_blank"));

    card.querySelector(".btn-bot")
      .addEventListener("click", () => botParleLivre(l));

    cont.appendChild(card);
  });
}

/* =========================
   LIVRES – FILTRE & RECHERCHE
========================= */

function filtrerLivres() {
  if (!window.livresData) return;

  const q = document.getElementById("rechercheLivres")?.value.toLowerCase() || "";
  const theme = document.getElementById("selectThemeLivres")?.value || "";

  const resultat = window.livresData.filter(l =>
    (!theme || l.type === theme) &&
    (
      l.titre.toLowerCase().includes(q) ||
      l.auteur.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q)
    )
  );

  afficherLivres(resultat);
}

document.getElementById("rechercheLivres")
  ?.addEventListener("input", filtrerLivres);

document.getElementById("selectThemeLivres")
  ?.addEventListener("change", filtrerLivres);

/* =========================
   LIVRES → CHAT BOT
========================= */

function botParleLivre(livre) {
  if (!chatWindow) return;

  chatWindow.innerHTML += `
    <div class="message bot">
      📘 <strong>${escapeHtml(livre.titre)}</strong><br>
      Auteur : ${escapeHtml(livre.auteur)} (${livre.annee})<br><br>
      ${escapeHtml(livre.description)}<br><br>
      📚 ${livre.type} — 🌍 ${livre.langue}
    </div>
  `;

  chatWindow.scrollTop = chatWindow.scrollHeight;

  const select = document.getElementById("sectionSelector");
  select.value = "chat";
  select.dispatchEvent(new Event("change"));
}

/* =========================
   AUDIOS
========================= */

if (window.audiosData) {
  const audioCont = document.getElementById("audioContainer");
  window.audiosData.forEach(a => {
    const div = document.createElement("div");
    div.className = "audio-bloc";
    div.innerHTML = `
      <strong>${escapeHtml(a.titre)}</strong>
      <audio controls src="${a.src}"></audio>
    `;
    audioCont?.appendChild(div);
  });
}

/* =========================
   PHOTOS
========================= */

if (window.photosData) {
  const photoCont = document.getElementById("photosContainer");
  window.photosData.forEach(p => {
    const img = document.createElement("img");
    img.src = p.src;
    img.alt = p.titre || "";
    img.loading = "lazy";
    photoCont?.appendChild(img);
  });
}

/* =========================
   VIDÉOS
========================= */

if (window.videosData) {
  const videoCont = document.getElementById("videosContainer");
  window.videosData.forEach(v => {
    const div = document.createElement("div");
    div.innerHTML = `
      <video controls src="${v.src}" poster="${v.poster || ""}"></video>
      <p>${escapeHtml(v.titre)}</p>
    `;
    videoCont?.appendChild(div);
  });
}

/* =========================
   FIN APP.JS
========================= */
