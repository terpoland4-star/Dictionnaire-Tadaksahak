// ============================================
// MODULE - DICTIONNAIRE
// Recherche, affichage, alphabet, navigation
// ============================================

let vocabulaire = [];
let motsListe = [];
let currentIndex = -1;
let motActuel = null;

// Éléments DOM
const searchBar = document.getElementById("searchBar");
const suggestionsList = document.getElementById("suggestions");
const motElem = document.getElementById("motTexte");
const defElem = document.getElementById("definition");
const audioElem = document.getElementById("audioLecteur");
const clearSearchBtn = document.getElementById("clearSearch");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const compteurMot = document.getElementById("compteurMot");

// Catégories pour l'affichage
const categoriesFr = {
  "vt.": "Verbe transitif", "vi.": "Verbe intransitif", "n.": "Nom",
  "npl.": "Nom (pluriel uniquement)", "adj.": "Adjectif", "adv.": "Adverbe",
  "conj.": "Conjonction", "postp.": "Postposition", "prep.": "Préposition",
  "pron.": "Pronom", "dem.": "Démonstratif", "num.": "Numéral",
  "quantifier": "Quantifieur", "phrase": "Expression", "idiom": "Idiome"
};

const categoriesEn = {
  "vt.": "Transitive verb", "vi.": "Intransitive verb", "n.": "Noun",
  "npl.": "Noun (plural only)", "adj.": "Adjective", "adv.": "Adverb",
  "conj.": "Conjunction", "postp.": "Postposition", "prep.": "Preposition",
  "pron.": "Pronoun", "dem.": "Demonstrative", "num.": "Numeral",
  "quantifier": "Quantifier", "phrase": "Phrase", "idiom": "Idiom"
};

const categoriesAr = {
  "vt.": "فعل متعد", "vi.": "فعل لازم", "n.": "اسم",
  "npl.": "اسم (جمع فقط)", "adj.": "صفة", "adv.": "ظرف",
  "conj.": "حرف عطف", "postp.": "حرف جر لاحق", "prep.": "حرف جر",
  "pron.": "ضمير", "dem.": "اسم إشارة", "num.": "عدد",
  "quantifier": "محدد كمي", "phrase": "عبارة", "idiom": "تعبير اصطلاحي"
};

async function chargerDictionnaire() {
  try {
    const response = await fetch('data/mots.json');
    if (!response.ok) throw new Error();
    vocabulaire = await response.json();
    console.log(`📖 Dictionnaire chargé : ${vocabulaire.length} mots`);
  } catch(e) {
    console.warn("Erreur chargement dictionnaire, utilisation fallback", e);
    vocabulaire = [
      { mot: "Báy", cat: "vt.", fr: "Pouvoir (faire)", ar: "قدر على (فعل)", en: "Able, to be" },
      { mot: "Yiddár", cat: "vi.", fr: "Être en vie", ar: "يكون حياً", en: "Alive, to be" },
      { mot: "Káamil", cat: "quantifier", fr: "Tout", ar: "كل", en: "All" },
      { mot: "ayo", cat: "pron.", fr: "qui, que (pronom relatif singulier)", ar: "الذي، التي", en: "who, which, that" },
      { mot: "ayondo", cat: "pron.", fr: "qui, que (pronom relatif pluriel)", ar: "الذين، اللواتي", en: "who, which, that (pl)" },
      { mot: "sa", cat: "conj.", fr: "qui, que (relative non-restrictive)", ar: "الذي، التي", en: "who, which, that (non-restrictive)" }
    ];
  }
  
  motsListe = vocabulaire.map((item, idx) => ({ ...item, index: idx }));
  
  if (vocabulaire.length) {
    const statMots = document.getElementById("statMots");
    if (statMots) statMots.textContent = vocabulaire.length;
    const statsContainer = document.getElementById("statsContainer");
    if (statsContainer) statsContainer.hidden = false;
    construireIndexAlphabet();
    if (vocabulaire[0]) afficherMot(vocabulaire[0]);
  }
}

function afficherMot(item) {
  if (!item) return;
  motActuel = item;
  currentIndex = motsListe.findIndex(m => m.mot === item.mot);
  
  if (compteurMot) compteurMot.textContent = `${currentIndex+1} / ${motsListe.length}`;
  if (btnPrev) btnPrev.disabled = currentIndex <= 0;
  if (btnNext) btnNext.disabled = currentIndex >= motsListe.length-1;
  if (motElem) motElem.textContent = item.mot;
  
  if (defElem) {
    let categorieValue = item.cat || "";
    let categories = currentLanguage === 'fr' ? categoriesFr : (currentLanguage === 'en' ? categoriesEn : categoriesAr);
    let categorieAffichee = categories[categorieValue] || categorieValue;
    
    let def = "";
    let html = `<p><strong>📂 Catégorie :</strong> ${escapeHtml(categorieAffichee)}</p>`;
    
    if (currentLanguage === "fr") {
      def = item.fr || item.en || "";
      html += `<p><strong>🇫🇷 Définition :</strong> ${escapeHtml(def)}</p>`;
      if (item.ar) html += `<p><strong>🇸🇦 بالعربية :</strong> ${escapeHtml(item.ar)}</p>`;
    } else if (currentLanguage === "en") {
      def = item.en || item.fr || "";
      html += `<p><strong>🇬🇧 Definition :</strong> ${escapeHtml(def)}</p>`;
      if (item.ar) html += `<p><strong>🇸🇦 بالعربية :</strong> ${escapeHtml(item.ar)}</p>`;
    } else if (currentLanguage === "ar") {
      def = item.ar || item.fr || "";
      html += `<p><strong>🇸🇦 التعريف :</strong> ${escapeHtml(def)}</p>`;
      if (item.fr) html += `<p><strong>🇫🇷 Français :</strong> ${escapeHtml(item.fr)}</p>`;
    }
    
    html += `<div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
      <button class="btn-small" id="shareWordBtn">📤 ${window.t('share')}</button>
      <button class="btn-small" id="favoriteWordBtn">⭐ ${window.favoris?.includes(item.mot) ? window.t('remove_favorite') : window.t('add_favorite')}</button>
    </div>`;
    
    defElem.innerHTML = html;
    
    setTimeout(() => {
      document.getElementById("shareWordBtn")?.addEventListener("click", () => partagerMot(item));
      document.getElementById("favoriteWordBtn")?.addEventListener("click", () => basculerFavori(item));
    }, 50);
  }
  
  if (audioElem && item.audio) {
    audioElem.src = `audio/${item.audio}`;
    audioElem.hidden = false;
    audioElem.load();
  } else if (audioElem) {
    audioElem.hidden = true;
  }
  
  ajouterHistorique(item.mot);
}

function partagerMot(item) {
  const text = `${item.mot} : ${currentLanguage === 'fr' ? item.fr : (currentLanguage === 'en' ? item.en : item.fr)}`;
  if (navigator.share) {
    navigator.share({ title: 'Mot Tadaksahak', text: text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    showToast("📋 Copié dans le presse-papier", "success");
  }
}

function navigationPrecedent() { 
  if (currentIndex > 0) afficherMot(motsListe[currentIndex-1]); 
}

function navigationSuivant() { 
  if (currentIndex < motsListe.length-1) afficherMot(motsListe[currentIndex+1]); 
}

function chercher(queryRaw) {
  const query = normalizeText(queryRaw);
  if (!query || !vocabulaire.length) return [];
  const resultats = [];
  const maxDist = Math.max(2, Math.floor(query.length * 0.4));
  
  for (const item of vocabulaire) {
    let score = Infinity;
    const motNorm = normalizeText(item.mot);
    
    if (motNorm.includes(query)) {
      score = motNorm.startsWith(query) ? 0 : 1;
    } else if (score > 1 && item.fr && normalizeText(item.fr).includes(query)) {
      score = 2;
    } else if (score > 2 && item.en && normalizeText(item.en).includes(query)) {
      score = 3;
    } else if (score > 3 && item.ar && normalizeText(item.ar).includes(query)) {
      score = 4;
    } else if (score === Infinity && item.mot) {
      const dist = levenshtein(motNorm, query);
      if (dist <= maxDist) score = 5 + dist;
    }
    
    if (score < Infinity) resultats.push({ item, score });
  }
  
  return resultats.sort((a,b) => a.score - b.score).slice(0,15).map(r => r.item);
}

function construireIndexAlphabet() {
  const container = document.getElementById("alphabetIndex");
  const wordListContainer = document.getElementById("wordList");
  if (!container || !wordListContainer) return;
  
  const letters = [...new Set(vocabulaire.map(v => v.mot?.[0]?.toUpperCase()).filter(Boolean))].sort();
  container.innerHTML = "";
  
  letters.forEach(l => {
    const btn = document.createElement("button");
    btn.textContent = l;
    btn.className = "alphabet-btn";
    btn.addEventListener("click", () => {
      wordListContainer.innerHTML = "";
      const motsFiltres = vocabulaire.filter(v => v.mot?.toUpperCase().startsWith(l));
      motsFiltres.forEach(m => {
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

// Initialisation de la recherche
if (searchBar) {
  let debounceTimeout;
  searchBar.addEventListener("input", (e) => {
    const raw = e.target.value.trim();
    if (clearSearchBtn) clearSearchBtn.hidden = !raw;
    if (!suggestionsList) return;
    
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      suggestionsList.innerHTML = "";
      suggestionsList.classList.remove("show");
      if (!raw) return;
      
      const resultats = chercher(raw);
      if (!resultats.length) {
        const li = document.createElement("li");
        li.textContent = "🔍 Aucun résultat";
        li.style.padding = "0.75rem";
        li.style.color = "var(--text-muted)";
        suggestionsList.appendChild(li);
      } else {
        resultats.forEach(item => {
          const li = document.createElement("li");
          let extraInfo = "";
          if (currentLanguage === "fr" && item.fr) extraInfo = item.fr;
          else if (currentLanguage === "en" && item.en) extraInfo = item.en;
          else if (currentLanguage === "ar" && item.ar) extraInfo = item.ar;
          else extraInfo = item.fr || item.en || "";
          
          li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong> <span class="mot-cat">(${escapeHtml(item.cat || '')})</span><br><small>${escapeHtml(extraInfo.substring(0, 80))}${extraInfo.length > 80 ? '…' : ''}</small>`;
          li.style.cursor = "pointer";
          li.style.padding = "0.75rem";
          li.style.borderBottom = "1px solid var(--border-color)";
          li.addEventListener("click", () => {
            searchBar.value = item.mot;
            suggestionsList.innerHTML = "";
            suggestionsList.classList.remove("show");
            afficherMot(item);
          });
          suggestionsList.appendChild(li);
        });
      }
      suggestionsList.classList.add("show");
    }, 300);
  });
  
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchBar.value = "";
      searchBar.focus();
      clearSearchBtn.hidden = true;
      suggestionsList.innerHTML = "";
      suggestionsList.classList.remove("show");
    });
  }
}

// Exporter
window.vocabulaire = vocabulaire;
window.motsListe = motsListe;
window.motActuel = motActuel;
window.chargerDictionnaire = chargerDictionnaire;
window.afficherMot = afficherMot;
window.navigationPrecedent = navigationPrecedent;
window.navigationSuivant = navigationSuivant;
window.chercher = chercher;
