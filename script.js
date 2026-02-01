/* ===========================================================
   🔹 Dictionnaire Tadakssahak Multilingue - Script Final
   Auteur : Hamadine AG MOCTAR
   Compatible : index fusionné + CSS Dark Mode
   =========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

  // ----------------------
  // VARIABLES GLOBALES
  // ----------------------
  let vocabulaire = [];
  let motActuel = null;
  let langueActuelle = "fr"; // langue d'affichage
  let searchLang = "td";     // langue de recherche : td/fr/en/ar
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
  const escapeHtml = str => str ? String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#39;") : "";

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

  const getByAnyId = (...ids) => { for(const id of ids){ const el=document.getElementById(id); if(el) return el;} return null; };

  // ----------------------
  // CHARGEMENT DICTIONNAIRE JSON + AUDIO
  // ----------------------
  try { const resp = await fetch("data/mots.json"); vocabulaire = await resp.json(); }
  catch(e){ console.error("❌ Erreur chargement dictionnaire :", e); }

  try { const respAudio = await fetch("data/audios.json"); albumsAudio = await respAudio.json(); }
  catch(e){ console.warn("Pas d'audios disponibles."); }

  // ----------------------
  // HISTORIQUE
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
    if(motElem){
      motElem.textContent=item.mot;
      motElem.style.opacity=0;
      setTimeout(()=>motElem.style.opacity=1,150);
    }
    if(defElem){
      defElem.innerHTML=`
        <p><strong>Catégorie :</strong> ${escapeHtml(item.categorie||"")}</p>
        <p><strong>Prononciation :</strong> ${escapeHtml(item.prononciation||"")}</p>
        <p><strong>${langueActuelle.toUpperCase()} :</strong> ${escapeHtml(item[langueActuelle]||"Traduction non disponible.")}</p>
        <p><em>${escapeHtml(item.definition||"")}</em></p>
      `;
    }
    if(audioElem){
      if(item.audio){ audioElem.src=`audio/${item.audio}`; audioElem.hidden=false; }
      else{ audioElem.removeAttribute("src"); audioElem.hidden=true; }
    }
    ajouterHistorique(item.mot);
  }

  // ----------------------
  // CHANGEMENT LANGUE
  // ----------------------
  window.changerLangue = function(lang){
    langueActuelle=lang;
    if(motActuel) afficherMot(motActuel);
    document.querySelectorAll(".lang-switch button").forEach(btn=>{
      btn.style.background = btn.textContent.toLowerCase()===lang ? "#005ed1":"#0077ff";
    });
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

  // Création du select langue recherche
  const searchSection = document.querySelector(".search-section");
  if(searchSection){
    const selectorWrapper=document.createElement("div");
    selectorWrapper.style.display="flex"; selectorWrapper.style.justifyContent="center"; selectorWrapper.style.marginBottom=".5rem"; selectorWrapper.style.gap=".5rem"; selectorWrapper.style.alignItems="center";
    const label=document.createElement("label"); label.textContent="Chercher depuis :"; label.style.fontSize="0.9rem"; label.style.color="#ccc";
    const select=document.createElement("select"); select.id="searchLangSelect";
    select.style.padding=".4rem"; select.style.borderRadius="6px"; select.style.border="1px solid #2b2f36"; select.style.background="#1c1f26"; select.style.color="#f1f1f1";
    [{v:"td",l:"Tadaksahak"},{v:"fr",l:"FR"},{v:"en",l:"EN"},{v:"ar",l:"AR"}].forEach(o=>{ const opt=document.createElement("option"); opt.value=o.v; opt.textContent=o.l; select.appendChild(opt); });
    select.value=searchLang;
    select.addEventListener("change",()=>{ searchLang=select.value; updatePlaceholder(); triggerInput(); searchBar.focus(); });
    selectorWrapper.appendChild(label); selectorWrapper.appendChild(select);
    searchSection.insertBefore(selectorWrapper,searchSection.firstChild);
  }

  function updatePlaceholder(){ const map={td:"Tadaksahak",fr:"FR",en:"EN",ar:"AR"}; if(searchBar) searchBar.placeholder=`Chercher un mot ${map[searchLang]||""}...`; }
  updatePlaceholder();
  function triggerInput(){ searchBar.dispatchEvent(new Event("input")); }

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

  searchBar.addEventListener("keydown",(e)=>{ if(e.key==="Enter"){ const first=suggestionsList.querySelector("li"); if(first&&first.textContent!=="Aucun résultat"){ first.click(); e.preventDefault(); } }});
  document.addEventListener("click",e=>{ if(!searchBar.contains(e.target)&&!suggestionsList.contains(e.target)){ suggestionsList.innerHTML=""; suggestionsList.classList.remove("show"); }});

  // ----------------------
  // CHAT BOT SIMPLE
  // ----------------------
  function afficheMsg(user,html){
    const chatWindow=document.getElementById("chatWindow"); if(!chatWindow) return;
    const div=document.createElement("div"); div.className=`message ${user}`;
    div.innerHTML=`<strong>${user==="bot"?"Bot":"Moi"}:</strong> ${html}`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop=chatWindow.scrollHeight;
    historiqueConversation.push({user,html});
    if(historiqueConversation.length>20) historiqueConversation.shift();
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
      bloc.innerHTML=`
        <p><strong>${escapeHtml(piste.title)}</strong></p>
        <audio controls src="${piste.src}" preload="none"></audio>
        ${piste.lyrics?`<button class="btnLyrics" data-target="${idLyrics}">Voir les paroles</button><pre id="${idLyrics}" class="lyrics-text" style="display:none;">${escapeHtml(piste.lyrics)}</pre>`:""}
        ${piste.lyrics?`<button class="btnPdf" data-target="${idLyrics}">Télécharger PDF</button>`:""}
      `;
      section.appendChild(bloc);
    });
    conteneur.appendChild(section);

    conteneur.querySelectorAll('.btnLyrics').forEach(btn=>btn.addEventListener('click',()=>{
      const tgt=document.getElementById(btn.getAttribute('data-target'));
      tgt.style.display=tgt.style.display==="block"?"none":"block";
      btn.textContent=tgt.style.display==="block"?"Masquer paroles":"Voir les paroles";
    }));

    conteneur.querySelectorAll('.btnPdf').forEach(btn=>btn.addEventListener('click',()=>{
      const tgt=document.getElementById(btn.getAttribute('data-target')); if(!tgt) return;
      const doc=new window.jspdf.jsPDF();
      doc.setFontSize(16); doc.text(btn.parentNode.querySelector('strong').textContent,10,20);
      doc.setFontSize(12); const lines=doc.splitTextToSize(tgt.textContent,180); doc.text(lines,10,30);
      doc.save(`${btn.parentNode.querySelector('strong').textContent}.pdf`);
    }));
  }

  genererAlbumsAudio();

  // ----------------------
  // FONCTIONS GLOBALES AUDIO
  // ----------------------
  window.jouerTadaksahak=function(){ if(audioElem && motActuel && motActuel.audio) audioElem.play(); }

  console.log("✅ Script final harmonisé chargé.");
});
