/* ===========================================================
   🔹 Dictionnaire Tadaksahak Multilingue - Script Unifié
   Auteur : Hamadine AG MOCTAR
   Version : Fusion + Index complet + Chat + Audio
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

  const searchBar = document.getElementById("searchBar");
  const suggestionsList = document.getElementById("suggestions");
  const motElem = document.getElementById("motTexte");
  const defElem = document.getElementById("definition");
  const audioElem = document.getElementById("audioLecteur");

  // ----------------------
  // UTILITAIRES
  // ----------------------
  const escapeHtml = str => str ? String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;") : "";
  const normalizeText = s => s ? s.toString().normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase() : "";

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
  try { const resp = await fetch("data/mots_final_489.js"); vocabulaire = await resp.json(); }
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
  // CHAT BOT SIMPLE
  // ----------------------
  function afficheMsg(user,html){
    const chatWindow=document.getElementById("chatWindow"); if(!chatWindow) return;
    const div=document.createElement("div"); div.className=`message ${user}`;
    div.innerHTML=`<strong>${user==="bot"?"Bot":"Moi"}:</strong> ${html}`;
    chatWindow.appendChild(div); chatWindow.scrollTop=chatWindow.scrollHeight;
    historiqueConversation.push({user,html}); if(historiqueConversation.length>20) historiqueConversation.shift();
  }

  function reponseBot(txt){
    const clean=normalizeText(txt);
    const salutations=["bonjour","salut","hello","bonsoir","bjr","bsr","salam"];
    if(salutations.some(s=>clean.includes(s))) return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    const caVa=["comment ca va","ça va","cv"]; if(caVa.some(s=>clean.includes(s))) return "Ça va bien, merci ! Et toi ?";
    return "Je n’ai pas compris. Essaie un mot ou dis-moi 'une histoire'.";
  }

  function traiterSaisie(){
    const inp=document.getElementById("chatInput"), txt=inp.value.trim();
    if(!txt) return; inp.value="";
    afficheMsg("user",escapeHtml(txt));
    afficheMsg("bot",reponseBot(txt));
  }

  document.getElementById("btnEnvoyer")?.addEventListener("click",traiterSaisie);
  document.getElementById("chatInput")?.addEventListener("keypress",e=>{ if(e.key==="Enter"){ e.preventDefault(); traiterSaisie(); } });

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

  console.log("✅ Script unifié chargé avec dictionnaire, chat et audio.");
});
