/* ===========================================================
   🔹 Dictionnaire Tadaksahak Multilingue - Script Unifié
   Auteur : Hamadine AG MOCTAR
   Version : Fusion + Index + Chat amélioré + Audio
   =========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

  // ----------------------
  // VARIABLES GLOBALES
  // ----------------------
  let vocabulaire = [];
  let motActuel = null;
  let langueActuelle = "fr";
  let searchLang = "td";
  let historique = [];
  let historiqueConversation = [];
  let albumsAudio = [];

  let quizActif = false;
  let quizMot = null;

  const searchBar = document.getElementById("searchBar");
  const suggestionsList = document.getElementById("suggestions");
  const motElem = document.getElementById("motTexte");
  const defElem = document.getElementById("definition");
  const audioElem = document.getElementById("audioLecteur");

  // ----------------------
  // UTILITAIRES
  // ----------------------
  const escapeHtml = str => str ? String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;") : "";
  const normalizeText = s => s ? s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase() : "";

  const levenshtein = (a,b) => {
    const an=a.length,bn=b.length;
    if(!an) return bn;
    if(!bn) return an;
    const matrix = Array.from({length:an+1},()=>new Array(bn+1).fill(0));
    for(let i=0;i<=an;i++) matrix[i][0]=i;
    for(let j=0;j<=bn;j++) matrix[0][j]=j;
    for(let i=1;i<=an;i++){
      for(let j=1;j<=bn;j++){
        const cost=a[i-1]===b[j-1]?0:1;
        matrix[i][j]=Math.min(matrix[i-1][j]+1, matrix[i][j-1]+1, matrix[i-1][j-1]+cost);
      }
    }
    return matrix[an][bn];
  };

  // ----------------------
  // CHARGEMENT DICTIONNAIRE JSON + AUDIO
  // ----------------------
  try { const resp = await fetch("data/mots.json"); vocabulaire = await resp.json(); }
  catch(e){ console.error("❌ Erreur chargement dictionnaire :", e); }

  try { const respAudio = await fetch("data/audios.json"); albumsAudio = await respAudio.json(); }
  catch(e){ console.warn("Pas d'audios disponibles."); }

  // ----------------------
  // HISTORIQUE MOTS
  // ----------------------
  function chargerHistorique(){
    historique = JSON.parse(localStorage.getItem("historiqueTadakssahak"))||[];
    afficherHistorique();
  }

  function ajouterHistorique(mot){
    historique = JSON.parse(localStorage.getItem("historiqueTadakssahak"))||[];
    historique = historique.filter(m=>m!==mot);
    historique.unshift(mot);
    if(historique.length>10) historique.pop();
    localStorage.setItem("historiqueTadakssahak", JSON.stringify(historique));
    afficherHistorique();
  }

  function afficherHistorique(){
    let footer = document.querySelector("footer");
    let bloc = document.getElementById("historique");
    if(!bloc){ bloc=document.createElement("div"); bloc.id="historique"; bloc.style.marginTop="1rem"; bloc.style.color="#ccc"; bloc.style.fontSize="0.85rem"; footer.appendChild(bloc);}
    if(historique.length===0){ bloc.innerHTML="<em>Aucun mot consulté récemment.</em>"; }
    else{ bloc.innerHTML="<strong>Derniers mots :</strong> "+historique.map(m=>`<span class='mot-historique' onclick="rechercherDepuisHistorique('${m}')">${escapeHtml(m)}</span>`).join(", "); }
  }

  window.rechercherDepuisHistorique = function(m){
    const el=vocabulaire.find(v=>v.mot===m);
    if(el) afficherMot(el);
  };

  chargerHistorique();

  // ----------------------
  // AFFICHAGE MOT
  // ----------------------
  function afficherMot(item){
    motActuel=item;
    if(motElem){ motElem.textContent=item.mot; motElem.style.opacity=0; setTimeout(()=>motElem.style.opacity=1,150); }
    if(defElem){
      defElem.innerHTML=`<p><strong>Catégorie :</strong> ${escapeHtml(item.cat||"")}</p>
                        <p><strong>${langueActuelle.toUpperCase()} :</strong> ${escapeHtml(item[langueActuelle]||"Traduction non disponible.")}</p>`;
    }
    if(audioElem){ if(item.audio){ audioElem.src=`audio/${item.audio}`; audioElem.hidden=false; } else{ audioElem.removeAttribute("src"); audioElem.hidden=true; } }
    ajouterHistorique(item.mot);
  }

  // ----------------------
  // CHANGEMENT LANGUE
  // ----------------------
  window.changerLangue = function(lang){
    langueActuelle=lang;
    if(motActuel) afficherMot(motActuel);
    document.querySelectorAll(".lang-switch button").forEach(btn=>{ btn.style.background = btn.textContent.toLowerCase()===lang ? "#005ed1":"#0077ff"; });
  };

  // ----------------------
  // RECHERCHE + SUGGESTIONS
  // ----------------------
  function highlightMatch(text,queryRaw){
    if(!text) return "";
    const normText=normalizeText(text);
    const normQuery=normalizeText(queryRaw);
    const idx=normText.indexOf(normQuery);
    if(idx===-1) return escapeHtml(text);
    const before=escapeHtml(text.slice(0,idx));
    const match=escapeHtml(text.slice(idx,idx+queryRaw.length));
    const after=escapeHtml(text.slice(idx+queryRaw.length));
    return `${before}<mark style="background:rgba(255,255,0,0.12);color:inherit;padding:0 .1rem;border-radius:2px">${match}</mark>${after}`;
  }

  function chercher(queryRaw){
    const query=normalizeText(queryRaw);
    if(!query) return [];
    const candidates=[];
    for(const item of vocabulaire){
      const field=searchLang==="td"?item.mot||"":item[searchLang]||"";
      const normField=normalizeText(field);
      if(!normField) continue;
      if(normField.startsWith(query)){ candidates.push({item,score:0}); continue; }
      if(normField.includes(query)){ candidates.push({item,score:1}); continue; }
      const dist=levenshtein(normField,query);
      const maxAllowed=Math.max(1,Math.floor(query.length*0.35));
      if(dist<=maxAllowed) candidates.push({item,score:2+dist});
    }
    candidates.sort((a,b)=>a.score-b.score);
    return candidates.map(c=>c.item);
  }

  searchBar.addEventListener("input",()=>{
    const raw=searchBar.value.trim();
    suggestionsList.innerHTML=""; suggestionsList.classList.remove("show");
    if(raw.length===0) return;
    const resultats=chercher(raw);
    if(resultats.length===0){ const li=document.createElement("li"); li.textContent="Aucun résultat"; li.style.opacity=".6"; suggestionsList.appendChild(li); }
    else{ resultats.slice(0,12).forEach(item=>{
      const matchedText=searchLang==="td"?item.mot||"":item[searchLang]||"";
      const langLabel=searchLang==="td"?"TD":searchLang.toUpperCase();
      const li=document.createElement("li"); li.innerHTML=`<strong>${escapeHtml(item.mot)}</strong> — <span style="opacity:.95">${highlightMatch(matchedText,raw)}</span> <em style="opacity:.6">(${langLabel})</em>`;
      li.addEventListener("click",()=>{ searchBar.value=matchedText; suggestionsList.innerHTML=""; suggestionsList.classList.remove("show"); afficherMot(item); });
      suggestionsList.appendChild(li);
    }); suggestionsList.classList.add("show"); }
  });

  // ----------------------
  // INDEX ALPHABETIQUE
  // ----------------------
  function construireIndexAlphabet(){
    const container = document.getElementById("alphabetIndex");
    const wordListContainer = document.getElementById("wordList");
    if(!container || !wordListContainer) return;
    const letters = Array.from(new Set(vocabulaire.map(v=>v.mot[0].toUpperCase()))).sort();
    container.innerHTML="";
    letters.forEach(l=>{
      const btn = document.createElement("button");
      btn.textContent=l; btn.className="alphabet-btn";
      btn.addEventListener("click",()=>{
        wordListContainer.innerHTML="";
        const mots = vocabulaire.filter(v=>v.mot.toUpperCase().startsWith(l));
        mots.forEach(m=>{
          const div = document.createElement("div");
          div.textContent=m.mot; div.className="mot-item";
          div.addEventListener("click",()=>afficherMot(m));
          wordListContainer.appendChild(div);
        });
      });
      container.appendChild(btn);
    });
  }
  construireIndexAlphabet();

// ----------------------
// LIVRES – BIBLIOTHÈQUE NUMÉRIQUE
// ----------------------
function afficherLivres() {
  const cont = document.getElementById("livresContainer");
  if (!cont || !window.livresData) {
    console.warn("📚 livresData non disponible ou conteneur absent");
    return;
  }

  cont.innerHTML = "";

  window.livresData.forEach(l => {
    const div = document.createElement("div");
    div.className = "livre-card";

    div.innerHTML = `
      <div class="livre-titre">${l.titre}</div>
      <div class="livre-auteur">${l.auteur} • ${l.annee}</div>
      <div class="livre-desc">${l.description}</div>
      <div class="livre-meta">${l.type} — ${l.langue}</div>

      <div class="livre-actions">
        <button onclick="window.open('${l.lien}', '_blank')">
          📖 Lire le livre
        </button>
        <button onclick="botParleLivre('${escapeHtml(l.titre)}')">
          🤖 Demander au bot
        </button>
      </div>
    `;

    cont.appendChild(div);
  });
}

// Appel initial
afficherLivres();

   
/* ===========================================================
   🤖 CHATBOT TADAKSAHAK – Intelligence culturelle & pédagogique
   Auteur : Hamadine AG MOCTAR
   =========================================================== */

// ----------------------
// MÉMOIRE DU BOT
// ----------------------
const botMemory = {
  lastTopic: null,
  lastWord: null,
  lang: "fr"
};

// ----------------------
// DÉTECTION LANGUE
// ----------------------
function detectLang(txt) {
  const t = txt.toLowerCase();
  if (/[ء-ي]/.test(t)) return "ar";
  if (t.includes("ⴰ") || t.includes("tadaksahak") || t.includes("tz")) return "tz";
  return "fr";
}

// ----------------------
// UTILITAIRES TEXTE
// ----------------------
function normalize(txt) {
  return txt
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// ----------------------
// AFFICHAGE MESSAGE
// ----------------------
function afficheMsg(user, html) {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;

  const div = document.createElement("div");
  div.className = `message ${user}`;
  div.innerHTML = `<strong>${user === "bot" ? "🤖 Hamadine" : "Moi"} :</strong> ${html}`;

  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ----------------------
// NAVIGATION SITE
// ----------------------
function naviguer(section) {
  const select = document.getElementById("sectionSelector");
  if (select) {
    select.value = section;
    select.dispatchEvent(new Event("change"));
  }
}

// ----------------------
// RÉSUMÉ HISTORIQUE
// ----------------------
function resumeTexte(texte, niveau = "court") {
  if (!texte) return "Je n’ai pas trouvé de texte à résumer.";

  const phrases = texte.split(".").filter(p => p.length > 30);

  if (niveau === "court") {
    return phrases.slice(0, 2).join(". ") + ".";
  }
  if (niveau === "enfant") {
    return "Voici une explication simple :<br>" +
      phrases.slice(0, 1).join(". ") + ".";
  }
  return phrases.slice(0, 5).join(". ") + ".";
}

// ----------------------
// RÉPONSES CULTURELLES
// ----------------------
function reponseCulture(txt) {
  if (txt.includes("idaksahak") || txt.includes("tadaksahak")) {
    return `
Les Idaksahak sont un peuple du Sahel, porteur d’une langue,
d’une mémoire et d’une culture orale très riches.
Le Tadaksahak est une langue vivante,
transmise par les récits, la musique et la sagesse.
    `;
  }
  return null;
}

// ----------------------
// DICTIONNAIRE INTELLIGENT
// ----------------------
function reponseDictionnaire(txt) {
  const mot = vocabulaire.find(v =>
    normalize(txt).includes(normalize(v.mot))
  );

  if (!mot) return null;

  botMemory.lastWord = mot.mot;

  return `
<strong>${mot.mot}</strong><br>
📚 Catégorie : ${mot.cat || "—"}<br>
🇫🇷 Français : ${mot.fr || "—"}<br>
🇬🇧 English : ${mot.en || "—"}<br>
🌍 Tadaksahak : ${mot.mot}<br>
💡 Astuce : tu peux dire <em>"explique encore"</em>
  `;
}

function botParleLivre(titre) {
  naviguer("chat");
  afficheMsg("bot", `
📚 <strong>${titre}</strong><br>
Ce livre est une ressource importante pour comprendre
l’histoire, la culture ou la langue des Idaksahak.<br><br>
Tu peux me demander :
• un résumé  
• le contexte historique  
• l’intérêt culturel  
• ou un public recommandé
  `);
}

   
// ----------------------
// CŒUR DU BOT
// ----------------------
function reponseBot(txt) {
  const clean = normalize(txt);
  botMemory.lang = detectLang(txt);

  /* =========================
     SALUTATIONS
  ========================= */
  if (/(bonjour|salut|hello|salam|bsr|bjr)/.test(clean)) {
    return "Bonjour 🌍 Je suis Hamadine, le gardien numérique de la langue et de la mémoire Idaksahak. Que souhaites-tu apprendre aujourd’hui ?";
  }

  /* =========================
     REMERCIEMENTS
  ========================= */
  if (/(merci|thanks|chokran)/.test(clean)) {
    return "Avec plaisir 🙏 La connaissance est un héritage vivant.";
  }

  /* =========================
     NAVIGATION SITE
  ========================= */
  if (clean.includes("dictionnaire")) {
    naviguer("dictionnaire");
    return "📖 Je t’emmène vers le dictionnaire Tadaksahak.";
  }

  if (clean.includes("chat")) {
    naviguer("chat");
    return "💬 Nous sommes déjà dans l’espace de discussion.";
  }

  if (clean.includes("audio") || clean.includes("chant")) {
    naviguer("audio");
    return "🎧 Voici les chants et albums Tadaksahak.";
  }

  if (clean.includes("photo")) {
    naviguer("photos");
    return "🖼️ Découvrons les images et visages du peuple Idaksahak.";
  }

  if (clean.includes("video")) {
    naviguer("videos");
    return "🎥 Voici les vidéos disponibles.";
  }

  if (clean.includes("livre")) {
    naviguer("livres");
    return "📚 Accès aux livres et études.";
  }

  if (clean.includes("quiz")) {
    naviguer("quiz");
    return "❓ Prêt à tester tes connaissances ?";
  }

  /* =========================
     HISTOIRE — RÉSUMÉS
  ========================= */
  if (clean.includes("resume") || clean.includes("résume")) {
    const texteComplet = window.histoireData?.sections
      ?.map(s => s.texte)
      .join("\n") || "";

    return resumeTexte(texteComplet, "court");
  }

  if (clean.includes("enfant")) {
    const texteComplet = window.histoireData?.sections
      ?.map(s => s.texte)
      .join("\n") || "";

    return resumeTexte(texteComplet, "enfant");
  }

  /* =========================
     HISTOIRE — SECTIONS PRÉCISES
  ========================= */
  if (clean.includes("conclusion")) {
    const sec = window.histoireData?.sections?.find(s => s.id === "conclusion");
    return sec ? resumeTexte(sec.texte, "court") : "Je n’ai pas trouvé la conclusion.";
  }

  if (clean.includes("bibliographie")) {
    const sec = window.histoireData?.sections?.find(s => s.id === "bibliographie");
    return sec ? sec.texte : "La bibliographie est indisponible.";
  }

  const matchPage = clean.match(/page\s*(\d+)/);
  if (matchPage) {
    const index = parseInt(matchPage[1], 10) - 1;
    const sec = window.histoireData?.sections?.[index];
    if (sec) {
      return `<strong>${sec.titre}</strong><br><br>${resumeTexte(sec.texte, "court")}`;
    }
    return "Cette page n’existe pas dans l’histoire.";
  }

  /* =========================
     CULTURE & IDENTITÉ
  ========================= */
  if (clean.includes("idaksahak") || clean.includes("tadaksahak")) {
    return `
Les Idaksahak sont un peuple du Sahel,
porteurs d’une langue singulière : le Tadaksahak.
Pasteurs, commerçants et érudits,
ils ont longtemps été discrets avant d’affirmer
leur identité culturelle et politique.
    `;
  }

  /* =========================
     DICTIONNAIRE INTELLIGENT
  ========================= */
  const mot = vocabulaire.find(v =>
    normalize(clean).includes(normalize(v.mot))
  );

  if (mot) {
    botMemory.lastWord = mot.mot;

    return `
📖 <strong>${mot.mot}</strong><br>
• Catégorie : ${mot.cat || "—"}<br>
• 🇫🇷 Français : ${mot.fr || "—"}<br>
• 🇬🇧 English : ${mot.en || "—"}<br>
• 🌍 Tadaksahak : ${mot.mot}<br><br>
💡 Tu peux dire <em>« explique encore »</em> ou demander un exemple.
    `;
  }

  /* =========================
     MÉMOIRE CONTEXTUELLE
  ========================= */
  if (clean.includes("explique encore") && botMemory.lastWord) {
    return `
📚 <strong>${botMemory.lastWord}</strong> est un mot important
dans la culture Tadaksahak.
Il est souvent utilisé dans les récits oraux,
les proverbes et la vie quotidienne.
    `;
  }

  /* =========================
     AIDE GÉNÉRALE
  ========================= */
  return `
🤖 Je peux :
• expliquer un mot du dictionnaire  
• résumer l’histoire des Idaksahak  
• guider dans le site  
• proposer un quiz  
• parler culture et langue  

Dis-moi ce que tu veux explorer 🌍
  `;
}


// ----------------------
// TRAITEMENT SAISIE
// ----------------------
function traiterSaisie() {
  const input = document.getElementById("chatInput");
  const txt = input.value.trim();
  if (!txt) return;

  input.value = "";
  afficheMsg("user", txt);

  setTimeout(() => {
    afficheMsg("bot", reponseBot(txt));
  }, 300);
}

// ----------------------
// EVENTS
// ----------------------
document.getElementById("btnEnvoyer")?.addEventListener("click", traiterSaisie);
document.getElementById("chatInput")?.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    traiterSaisie();
  }
});

  // ----------------------
  // AUDIO PLAY + Albums
  // ----------------------
  function genererAlbumsAudio(){
    const conteneur=document.getElementById("audioContainer"); if(!conteneur||!albumsAudio.length) return;
    const section=document.createElement("section"); const titreAlbum=document.createElement("h3"); titreAlbum.textContent="Album Hamadine"; section.appendChild(titreAlbum);
    albumsAudio.forEach((piste,idx)=>{
      const idLyrics=`lyrics-${idx}`;
      const bloc=document.createElement("div"); bloc.className="audio-bloc";
      bloc.innerHTML=`<p><strong>${escapeHtml(piste.title)}</strong></p>
                       <audio controls src="${piste.src}" preload="none"></audio>
                       ${piste.lyrics?`<button class="btnLyrics" data-target="${idLyrics}">Voir les paroles</button><pre id="${idLyrics}" class="lyrics-text" style="display:none;">${escapeHtml(piste.lyrics)}</pre>`:""}`;
      section.appendChild(bloc);
    });
    conteneur.appendChild(section);
  }
  genererAlbumsAudio();

  window.jouerTadaksahak=function(){ if(audioElem && motActuel && motActuel.audio) audioElem.play(); }

  console.log("✅ Script unifié chargé avec dictionnaire, chat amélioré et audio.");
});
