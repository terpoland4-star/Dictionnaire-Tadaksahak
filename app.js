document.addEventListener("DOMContentLoaded", async () => {
  // ----------------------
  // VARIABLES GLOBALES
  // ----------------------
  let vocabulaire = [];
  let motActuel = null;
  let langueActuelle = "fr";
  let searchLang = "td";
  let historique = [];
  let albumsAudio = [];
  window.livresData = [];  // ✅ Globales pour bot
  window.histoireData = {};

  // Éléments DOM
  const searchBar = document.getElementById("searchBar");
  const suggestionsList = document.getElementById("suggestions");
  const motElem = document.getElementById("motTexte");
  const defElem = document.getElementById("definition");
  const audioElem = document.getElementById("audioLecteur");
  const sectionSelector = document.getElementById("sectionSelector");  // ✅ Pour navigation

  // ----------------------
  // UTILITAIRES
  // ----------------------
  const escapeHtml = str => str ? String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;") : "";
  const normalizeText = s => s ? s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase() : "";

  const levenshtein = (a, b) => {
    const an = a.length, bn = b.length;
    if (!an) return bn; if (!bn) return an;
    const matrix = Array.from({ length: an + 1 }, () => new Array(bn + 1).fill(0));
    for (let i = 0; i <= an; i++) matrix[i][0] = i;
    for (let j = 0; j <= bn; j++) matrix[0][j] = j;
    for (let i = 1; i <= an; i++) {
      for (let j = 1; j <= bn; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
      }
    }
    return matrix[an][bn];
  };

  // ----------------------
  // CHARGEMENT DONNÉES JSON ✅ Amélioré
  // ----------------------
  try { vocabulaire = await (await fetch("data/mots.json")).json(); console.log(`✅ ${vocabulaire.length} mots chargés`); }
  catch (e) { console.error("❌ Erreur dictionnaire :", e); }

  try { albumsAudio = await (await fetch("data/audios.json")).json(); console.log(`✅ ${albumsAudio.length} audios`); }
  catch (e) { console.warn("⚠️ Pas d'audios"); }

  try { window.livresData = await (await fetch("data/livres.json")).json(); console.log(`✅ ${window.livresData.length} livres`); }
  catch (e) { console.warn("⚠️ Pas de livres.json"); }

  try { window.histoireData = await (await fetch("data/histoire.json")).json(); console.log("✅ Histoire chargée"); }
  catch (e) { console.warn("⚠️ Pas d'histoire.json"); }

  // ----------------------
  // HISTORIQUE MOTS (inchangé)
  // ----------------------
  function chargerHistorique() {
    historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
    afficherHistorique();
  }
  function ajouterHistorique(mot) {
    historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
    historique = historique.filter(m => m !== mot).unshift(mot);
    if (historique.length > 10) historique.pop();
    localStorage.setItem("historiqueTadakssahak", JSON.stringify(historique.slice(0, 10)));
    afficherHistorique();
  }
  function afficherHistorique() {
    const footer = document.querySelector("footer");
    let bloc = document.getElementById("historique");
    if (!bloc) {
      bloc = document.createElement("div");
      bloc.id = "historique";
      Object.assign(bloc.style, { marginTop: "1rem", color: "#ccc", fontSize: "0.85rem" });
      footer?.appendChild(bloc);
    }
    bloc.innerHTML = historique.length ? `<strong>Derniers mots :</strong> ${historique.map(m => `<span class='mot-historique' onclick="rechercherDepuisHistorique('${escapeHtml(m)}')" style="cursor:pointer">${escapeHtml(m)}</span>`).join(", ")}` : "<em>Aucun mot consulté récemment.</em>";
  }
  window.rechercherDepuisHistorique = m => vocabulaire.find(v => v.mot === m)?.let(afficherMot);
  chargerHistorique();

  // ----------------------
  // AFFICHAGE MOT (inchangé)
  // ----------------------
  function afficherMot(item) {
    motActuel = item;
    motElem && (motElem.textContent = item.mot) && (motElem.style.opacity = 0) && setTimeout(() => motElem.style.opacity = 1, 150);
    defElem && (defElem.innerHTML = `<p><strong>Catégorie :</strong> ${escapeHtml(item.cat || "")}</p><p><strong>${langueActuelle.toUpperCase()} :</strong> ${escapeHtml(item[langueActuelle] || "Non disponible")}</p>`);
    if (audioElem) {
      if (item.audio) {
        audioElem.src = `audio/${item.audio}`;
        audioElem.hidden = false;
      } else {
        audioElem.removeAttribute("src");
        audioElem.hidden = true;
      }
    }
    ajouterHistorique(item.mot);
  }
  window.changerLangue = lang => {
    langueActuelle = lang;
    if (motActuel) afficherMot(motActuel);
    document.querySelectorAll(".lang-switch button").forEach(btn => btn.style.background = btn.textContent.toLowerCase() === lang ? "#005ed1" : "#0077ff");
  };

  // ----------------------
  // RECHERCHE + SUGGESTIONS (légèrement optimisé)
  // ----------------------
  function highlightMatch(text, queryRaw) {
    if (!text) return "";
    const normText = normalizeText(text), normQuery = normalizeText(queryRaw);
    const idx = normText.indexOf(normQuery);
    if (idx === -1) return escapeHtml(text);
    return `${escapeHtml(text.slice(0, idx))}<mark style="background:rgba(255,255,0,0.3);padding:0 .1rem;border-radius:2px">${escapeHtml(text.slice(idx, idx + queryRaw.length))}</mark>${escapeHtml(text.slice(idx + queryRaw.length))}`;
  }
  function chercher(queryRaw) {
    const query = normalizeText(queryRaw);
    if (!query) return [];
    return vocabulaire
      .map(item => {
        const field = searchLang === "td" ? item.mot || "" : item[searchLang] || "";
        const normField = normalizeText(field);
        if (!normField) return null;
        let score = Infinity;
        if (normField.startsWith(query)) score = 0;
        else if (normField.includes(query)) score = 1;
        else {
          const dist = levenshtein(normField, query);
          if (dist <= Math.max(1, Math.floor(query.length * 0.35))) score = 2 + dist;
        }
        return score < Infinity ? { item, score } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map(c => c.item);
  }
  searchBar?.addEventListener("input", () => {
    const raw = searchBar.value.trim();
    suggestionsList.innerHTML = ""; suggestionsList.classList.remove("show");
    if (!raw) return;
    const resultats = chercher(raw);
    if (!resultats.length) {
      const li = document.createElement("li");
      li.textContent = "Aucun résultat";
      li.style.opacity = ".6";
      suggestionsList.appendChild(li);
    } else {
      resultats.forEach(item => {
        const matchedText = searchLang === "td" ? item.mot || "" : item[searchLang] || "";
        const langLabel = searchLang === "td" ? "TD" : searchLang.toUpperCase();
        const li = document.createElement("li");
        li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong> — <span style="opacity:.95">${highlightMatch(matchedText, raw)}</span> <em style="opacity:.6">(${langLabel})</em>`;
        li.addEventListener("click", () => {
          searchBar.value = matchedText;
          suggestionsList.innerHTML = ""; suggestionsList.classList.remove("show");
          afficherMot(item);
        });
        suggestionsList.appendChild(li);
      });
    }
    suggestionsList.classList.add("show");
  });

  // ----------------------
  // INDEX ALPHABETIQUE
  // ----------------------
  function construireIndexAlphabet() {
    const container = document.getElementById("alphabetIndex");
    const wordListContainer = document.getElementById("wordList");
    if (!container || !wordListContainer) return;
    const letters = Array.from(new Set(vocabulaire.map(v => v.mot[0]?.toUpperCase()).filter(Boolean))).sort();
    container.innerHTML = "";
    letters.forEach(l => {
      const btn = document.createElement("button");
      btn.textContent = l;
      btn.className = "alphabet-btn";
      btn.addEventListener("click", () => {
        wordListContainer.innerHTML = "";
        vocabulaire.filter(v => v.mot?.toUpperCase().startsWith(l)).forEach(m => {
          const div = document.createElement("div");
          div.textContent = m.mot;
          div.className = "mot-item";
          div.addEventListener("click", () => afficherMot(m));
          wordListContainer.appendChild(div);
        });
      });
      container.appendChild(btn);
    });
  }
  construireIndexAlphabet();

  // ----------------------
  // LIVRES ✅ Corrigé et intégré
  // ----------------------
  function afficherLivres() {
    const cont = document.getElementById("livresContainer");
    if (!cont || !window.livresData.length) {
      cont && (cont.innerHTML = "<p style='text-align:center;opacity:.6'>📚 Aucun livre disponible (créez data/livres.json).</p>");
      return;
    }
    cont.innerHTML = "";
    window.livresData.forEach(l => {
      const div = document.createElement("div");
      div.className = "livre-card";
      div.innerHTML = `
        <div class="livre-titre">${escapeHtml(l.titre || "Sans titre")}</div>
        <div class="livre-auteur">${escapeHtml(l.auteur || "")} • ${escapeHtml(l.annee || "")}</div>
        <div class="livre-desc">${escapeHtml(l.description || "")}</div>
        <div class="livre-meta">${escapeHtml(l.type || "")} — ${escapeHtml(l.langue || "")}</div>
        <div class="livre-actions">
          <button class="btn-lire">📖 Lire</button>
          <button class="btn-bot-livre">🤖 Bot</button>
        </div>
      `;
      div.querySelector(".btn-lire").addEventListener("click", () => window.open(l.lien || "#", "_blank"));
      div.querySelector(".btn-bot-livre").addEventListener("click", () => botParleLivre(l.titre));
      cont.appendChild(div);
    });
  }

  // ----------------------
  // AUDIO ALBUMS
  // ----------------------
  function genererAlbumsAudio() {
    const conteneur = document.getElementById("audioContainer");
    if (!conteneur || !albumsAudio.length) return;
    conteneur.innerHTML = "";
    const section = document.createElement("section");
    const titreAlbum = document.createElement("h3");
    titreAlbum.textContent = "Album Hamadine";
    section.appendChild(titreAlbum);
    albumsAudio.forEach((piste, idx) => {
      const idLyrics = `lyrics-${idx}`;
      const bloc = document.createElement("div");
      bloc.className = "audio-bloc";
      bloc.innerHTML = `
        <p><strong>${escapeHtml(piste.title)}</strong></p>
        <audio controls src="${piste.src}" preload="none"></audio>
        ${piste.lyrics ? `<button class="btnLyrics" data-target="${idLyrics}">Paroles</button><pre id="${idLyrics}" class="lyrics-text" style="display:none;background:#f5f5f5;padding:1rem;border-radius:8px;font-size:0.9rem;">${escapeHtml(piste.lyrics)}</pre>` : ""}
      `;
      // Toggle paroles
      bloc.querySelector(".btnLyrics")?.addEventListener("click", e => {
        const target = document.getElementById(e.target.dataset.target);
        target.style.display = target.style.display === "block" ? "none" : "block";
      });
      section.appendChild(bloc);
    });
    conteneur.appendChild(section);
  }
  genererAlbumsAudio();
  window.jouerTadaksahak = () => { if (audioElem && motActuel?.audio) audioElem.play(); };

  // ----------------------
  // CHATBOT ✅ Intégré et amélioré
  // ----------------------
  const botMemory = { lastWord: null, lang: "fr" };

  function normalize(txt) { return txt.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function detectLang(txt) {
    const t = txt.toLowerCase();
    return /[ء-ي]/.test(t) ? "ar" : (t.includes("ⴰ") || t.includes("tadaksahak") || t.includes("tz")) ? "tz" : "fr";
  }
  function afficheMsg(user, html) {
    const chatWindow = document.getElementById("chatWindow");
    if (!chatWindow) return;
    const div = document.createElement("div");
    div.className = `message ${user}`;
    div.innerHTML = `<strong>${user === "bot" ? "🤖 Hamadine" : "👤 Moi"} :</strong> ${html}`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  function naviguer(section) {
    if (sectionSelector) {
      sectionSelector.value = section;
      sectionSelector.dispatchEvent(new Event("change"));
    }
  }
  function resumeTexte(texte, niveau = "court") {
    if (!texte) return "Pas de texte disponible.";
    const phrases = texte.split(".").filter(p => p.trim().length > 30);
    if (niveau === "court") return phrases.slice(0, 2).join(". ") + ".";
    if (niveau === "enfant") return `Explication simple :<br>${phrases[0]}.`;
    return phrases.slice(0, 5).join(". ") + ".";
  }
  function botParleLivre(titre) {
    naviguer("chat");
    setTimeout(() => afficheMsg("bot", `📚 <strong>${escapeHtml(titre)}</strong><br>Ce livre explore l'histoire/culture Idaksahak.<br><br>Demande-moi : résumé, contexte, intérêt !`), 200);
  }

  function reponseBot(txt) {
    const clean = normalize(txt);
    botMemory.lang = detectLang(txt);

    // Salutations
    if (/(bonjour|salut|hello|salam|bsr|bjr)/i.test(clean)) return "Bonjour 🌍 ! Hamadine, gardien de la langue Tadaksahak. Que veux-tu apprendre ?";
    if (/(merci|thanks|chokran)/i.test(clean)) return "De rien 🙏 La sagesse se partage.";

    // Navigation
    const navMap = {
      dictionnaire: "dictionnaire", chat: "chat", audio: "audio", chant: "audio",
      photo: "photos", video: "videos", livre: "livres", quiz: "quiz"
    };
    for (const [key, sec] of Object.entries(navMap)) {
      if (clean.includes(key)) {
        naviguer(sec);
        return `➡️ Direction ${key === "livre" ? "livres" : key}.`;
      }
    }

    // Résumés histoire (avec fallback)
    if (clean.includes("resume") || clean.includes("résume")) {
      const texte = window.histoireData.sections?.map(s => s.texte).join("\n") || "";
      return resumeTexte(texte, "court");
    }
    if (clean.includes("enfant")) {
      const texte = window.histoireData.sections?.map(s => s.texte).join("\n") || "";
      return resumeTexte(texte, "enfant");
    }
    if (clean.includes("conclusion")) {
      const sec = window.histoireData.sections?.find(s => s.id === "conclusion");
      return sec ? resumeTexte(sec.texte) : "Conclusion indisponible.";
    }
    if (clean.match(/page\s*(\d+)/)) {
      const idx = parseInt(RegExp.$1, 10) - 1;
      const sec = window.histoireData.sections?.[idx];
      return sec ? `<strong>${sec.titre}</strong><br>${resumeTexte(sec.texte)}` : "Page inexistante.";
    }

    // Culture
    if (clean.includes("idaksahak") || clean.includes("tadaksahak")) {
      return "Les Idaksahak : peuple sahélien, langue Tadaksahak vivante via récits, musique et sagesse. Pasteurs discrets et érudits.";
    }

    // Dictionnaire intelligent
    const mot = vocabulaire.find(v => normalize(clean).includes(normalize(v.mot)));
    if (mot) {
      botMemory.lastWord = mot.mot;
      return `📖 <strong>${mot.mot}</strong><br>• Cat : ${mot.cat || "—"}<br>• 🇫🇷 ${mot.fr || "—"}<br>• 🇬🇧 ${mot.en || "—"}<br>💡 Dis « explique encore » !`;
    }
    if (clean.includes("explique encore") && botMemory.lastWord) {
      return `📚 <strong>${botMemory.lastWord}</strong> : Mot clé en culture Tadaksahak, utilisé dans proverbes et vie quotidienne.`;
    }

    // Aide
    return `🤖 Ce que je sais faire :<br>• Expliquer mots Tadaksahak<br>• Résumer histoire<br>• Naviguer site (dis « livres », « audio »...)<br>• Quiz/culture<br>Que explorer ? 🌍`;
  }

  function traiterSaisie() {
    const input = document.getElementById("chatInput");
    const txt = input?.value.trim();
    if (!txt) return;
    input.value = "";
    afficheMsg("user", escapeHtml(txt));
    setTimeout(() => afficheMsg("bot", reponseBot(txt)), 400);
  }

  // Events chat
  document.getElementById("btnEnvoyer")?.addEventListener("click", traiterSaisie);
  document.getElementById("chatInput")?.addEventListener("keypress", e => e.key === "Enter" && traiterSaisie());

  // ----------------------
  // ✅ GESTION SECTIONS DYNAMIQUES (NOUVEAU)
  // ----------------------
  if (sectionSelector) {
    sectionSelector.addEventListener("change", (e) => {
      const sec = e.target.value;
      if (sec === "livres") afficherLivres();
      else if (sec === "audio") genererAlbumsAudio();
      // Ajoutez d'autres si besoin (ex: histoire)
    });
    // Appel initial
    if (sectionSelector.value === "livres") afficherLivres();
  }

  console.log("✅ Dictionnaire Tadaksahak chargé parfaitement !");
});
