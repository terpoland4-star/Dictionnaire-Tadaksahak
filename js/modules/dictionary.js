// ============================================
// MODULE - DICTIONNAIRE
// Version premium avec recherche avancée, filtres, historique, favoris, statistiques
// ============================================

// ------------------------------
// ÉTAT DU MODULE
// ------------------------------
let vocabulaire = [];
let motsListe = [];
let currentIndex = -1;
let motActuel = null;
let rechercheHistory = [];
let filtresActifs = {
  categorie: 'all',
  lettre: 'all',
  recherche: ''
};
let triActuel = 'alpha'; // alpha, date, popularite

// ------------------------------
// ÉLÉMENTS DOM
// ------------------------------
const searchBar = document.getElementById("searchBar");
const suggestionsList = document.getElementById("suggestions");
const motElem = document.getElementById("motTexte");
const defElem = document.getElementById("definition");
const audioElem = document.getElementById("audioLecteur");
const clearSearchBtn = document.getElementById("clearSearch");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const compteurMot = document.getElementById("compteurMot");
const filterCategorie = document.getElementById("filterCategorie");
const searchStats = document.getElementById("searchStats");
const wordOfTheDayContainer = document.getElementById("wordOfTheDay");

// ------------------------------
// BASES DE DONNÉES INTERNES
// ------------------------------
const expressionsCourantes = [
  { tad: "Salam aleikum", fr: "Que la paix soit sur vous", en: "Peace be upon you", ar: "السلام عليكم", contexte: "salutation" },
  { tad: "Aɣay se", fr: "Pour moi", en: "For me", ar: "لي", contexte: "possession" },
  { tad: "A ni-tén?", fr: "Comment vas-tu?", en: "How are you?", ar: "كيف حالك؟", contexte: "salutation" },
  { tad: "Alhamdulillah", fr: "Louange à Dieu", en: "Praise be to God", ar: "الحمد لله", contexte: "religion" },
  { tad: "In sha Allah", fr: "Si Dieu le veut", en: "God willing", ar: "إن شاء الله", contexte: "religion" },
  { tad: "Bismillah", fr: "Au nom de Dieu", en: "In the name of God", ar: "بسم الله", contexte: "religion" },
  { tad: "Masha Allah", fr: "Ce que Dieu veut", en: "As God has willed", ar: "ما شاء الله", contexte: "religion" },
  { tad: "Subhan Allah", fr: "Gloire à Dieu", en: "Glory be to God", ar: "سبحان الله", contexte: "religion" }
];

const proverbes = [
  { tad: "A-rgán ma a-kká fó", fr: "Un chameau ne va pas seul", en: "A camel doesn't go alone", sens: "L'union fait la force" },
  { tad: "Har a-náy a-se", fr: "Mange ce qui est devant toi", en: "Eat what's in front of you", sens: "Contente-toi de ce que tu as" },
  { tad: "A-fó yedá a-fó", fr: "Une main lave l'autre", en: "One hand washes the other", sens: "L'entraide est essentielle" },
  { tad: "Tamat n tǝma", fr: "Œil pour œil", en: "Eye for an eye", sens: "Justice réciproque" },
  { tad: "A-ffóys-án, a-dárk-án", fr: "Qui court, qui tombe", en: "Who runs, falls", sens: "La précipitation est dangereuse" }
];

const conjugaisonsExemples = [
  { verbe: "báy", sens: "pouvoir", present: "aɣ-báy", passe: "aɣ-nǝ-báy", futur: "aɣ-sǝ-báy" },
  { verbe: "dá", sens: "faire", present: "aɣ-dá", passe: "aɣ-nǝ-dá", futur: "aɣ-sǝ-dá" },
  { verbe: "nát", sens: "donner", present: "aɣ-nát", passe: "aɣ-nǝ-nát", futur: "aɣ-sǝ-nát" },
  { verbe: "káy", sens: "aller", present: "aɣ-káy", passe: "aɣ-nǝ-káy", futur: "aɣ-sǝ-káy" }
];

// ------------------------------
// STATISTIQUES ET ANALYTIQUES
// ------------------------------
let statsRecherche = {
  totalRecherches: 0,
  motsLesPlusConsultes: {},
  rechercheParJour: {},
  dernieresRecherches: []
};

function enregistrerRecherche(mot) {
  statsRecherche.totalRecherches++;
  statsRecherche.motsLesPlusConsultes[mot] = (statsRecherche.motsLesPlusConsultes[mot] || 0) + 1;
  
  const aujourdhui = new Date().toISOString().slice(0, 10);
  statsRecherche.rechercheParJour[aujourdhui] = (statsRecherche.rechercheParJour[aujourdhui] || 0) + 1;
  
  statsRecherche.dernieresRecherches.unshift({ mot, date: Date.now() });
  if (statsRecherche.dernieresRecherches.length > 20) statsRecherche.dernieresRecherches.pop();
  
  localStorage.setItem('dico_stats', JSON.stringify(statsRecherche));
  mettreAJourStatsAffichage();
}

function mettreAJourStatsAffichage() {
  if (searchStats) {
    const motsPopulaires = Object.entries(statsRecherche.motsLesPlusConsultes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([mot, count]) => `${mot} (${count})`)
      .join(', ');
    
    searchStats.innerHTML = `
      <small>🔍 ${statsRecherche.totalRecherches} recherches | 
      ⭐ Populaires: ${motsPopulaires || 'aucune'}</small>
    `;
  }
}

// ------------------------------
// CHARGEMENT DES DONNÉES
// ------------------------------
async function chargerDictionnaire() {
  try {
    const response = await fetch('data/mots.json');
    if (!response.ok) throw new Error();
    vocabulaire = await response.json();
    console.log(`📖 Dictionnaire chargé : ${vocabulaire.length} mots`);
  } catch(e) {
    console.warn("Erreur chargement dictionnaire, utilisation fallback", e);
    vocabulaire = getFallbackVocabulary();
  }
  
  motsListe = vocabulaire.map((item, idx) => ({ ...item, index: idx }));
  chargerStats();
  
  if (vocabulaire.length) {
    const statMots = document.getElementById("statMots");
    if (statMots) statMots.textContent = vocabulaire.length;
    const statsContainer = document.getElementById("statsContainer");
    if (statsContainer) statsContainer.hidden = false;
    construireIndexAlphabet();
    construireFiltresCategories();
    afficherMotDuJour();
    if (vocabulaire[0]) afficherMot(vocabulaire[0]);
  }
  
  window.vocabulaire = vocabulaire;
}

function getFallbackVocabulary() {
  return [
    { mot: "Báy", cat: "vt.", fr: "Pouvoir (faire)", ar: "قدر على (فعل)", en: "Able, to be", exemple: "Aɣ-báy a-dá-a", exemple_fr: "Je peux le faire" },
    { mot: "Yiddár", cat: "vi.", fr: "Être en vie", ar: "يكون حياً", en: "Alive, to be", exemple: "A-yiddár", exemple_fr: "Il est vivant" },
    { mot: "Káamil", cat: "quantifier", fr: "Tout", ar: "كل", en: "All", exemple: "Káamil a-n", exemple_fr: "Tout le monde" },
    { mot: "ayo", cat: "pron.", fr: "qui, que (pronom relatif singulier)", ar: "الذي، التي", en: "who, which, that", exemple: "Bora ayo a-taw-kat", exemple_fr: "La personne qui est arrivée" },
    { mot: "ayondo", cat: "pron.", fr: "qui, que (pronom relatif pluriel)", ar: "الذين، اللواتي", en: "who, which, that (pl)", exemple: "Imunas ayondo a-zumbu", exemple_fr: "Les chameliers qui sont descendus" },
    { mot: "sa", cat: "conj.", fr: "qui, que (relative non-restrictive)", ar: "الذي، التي", en: "who, which, that (non-restrictive)", exemple: "nana, sa ayn man Aminata", exemple_fr: "sa mère, qui s'appelle Aminata" },
    { mot: "a-rgán", cat: "n.", fr: "chameau (mâle adulte)", ar: "جمل بالغ", en: "adult male camel", exemple: "A-rgán beer-i", exemple_fr: "Un grand chameau" },
    { mot: "yáw", cat: "n.", fr: "chamelle", ar: "ناقة", en: "female camel", exemple: "Yáw a-ttén", exemple_fr: "La chamelle est arrivée" },
    { mot: "hánfi", cat: "n.", fr: "chien", ar: "كلب", en: "dog", exemple: "Hánfi a-nná", exemple_fr: "Le chien aboie" },
    { mot: "baarí", cat: "n.", fr: "cheval", ar: "حصان", en: "horse", exemple: "A-baarí a-ffəy", exemple_fr: "Le cheval sort" }
  ];
}

function chargerStats() {
  const saved = localStorage.getItem('dico_stats');
  if (saved) {
    try {
      statsRecherche = JSON.parse(saved);
      mettreAJourStatsAffichage();
    } catch(e) {}
  }
}

// ------------------------------
// MOT DU JOUR
// ------------------------------
function afficherMotDuJour() {
  if (!wordOfTheDayContainer) return;
  
  const today = new Date().toISOString().slice(0, 10);
  let motDuJour = localStorage.getItem('mot_du_jour');
  let motData = null;
  
  if (motDuJour) {
    try {
      const parsed = JSON.parse(motDuJour);
      if (parsed.date === today) {
        motData = vocabulaire.find(v => v.mot === parsed.mot);
      }
    } catch(e) {}
  }
  
  if (!motData) {
    const randomIndex = Math.floor(Math.random() * vocabulaire.length);
    motData = vocabulaire[randomIndex];
    localStorage.setItem('mot_du_jour', JSON.stringify({ date: today, mot: motData.mot }));
  }
  
  if (motData) {
    wordOfTheDayContainer.innerHTML = `
      <div class="word-of-day-card">
        <div class="wod-label">🌟 MOT DU JOUR</div>
        <div class="wod-word">${escapeHtml(motData.mot)}</div>
        <div class="wod-def">${escapeHtml(motData.fr || motData.en || '')}</div>
        <button class="wod-btn" onclick="window.afficherMot(window.vocabulaire.find(v => v.mot === '${escapeHtml(motData.mot)}'))">📖 Voir la fiche</button>
      </div>
    `;
  }
}

// ------------------------------
// AFFICHAGE D'UN MOT (VERSION ENRICHIE)
// ------------------------------
function afficherMot(item) {
  if (!item) return;
  motActuel = item;
  currentIndex = motsListe.findIndex(m => m.mot === item.mot);
  enregistrerRecherche(item.mot);
  
  if (compteurMot) compteurMot.textContent = `${currentIndex+1} / ${motsListe.length}`;
  if (btnPrev) btnPrev.disabled = currentIndex <= 0;
  if (btnNext) btnNext.disabled = currentIndex >= motsListe.length-1;
  if (motElem) motElem.textContent = item.mot;
  
  if (defElem) {
    let categories = currentLanguage === 'fr' ? categoriesFr : (currentLanguage === 'en' ? categoriesEn : categoriesAr);
    let categorieAffichee = categories[item.cat] || item.cat || "Mot";
    
    let html = `
      <div class="word-card">
        <div class="word-header">
          <span class="word-category">📂 ${escapeHtml(categorieAffichee)}</span>
          ${item.prononciation ? `<span class="word-pronunciation">🔊 ${escapeHtml(item.prononciation)}</span>` : ''}
        </div>
        <div class="word-definitions">
    `;
    
    if (currentLanguage === "fr") {
      html += `<div class="def-fr"><strong>🇫🇷 Définition :</strong> ${escapeHtml(item.fr || item.en || '—')}</div>`;
      if (item.en) html += `<div class="def-en"><strong>🇬🇧 English :</strong> ${escapeHtml(item.en)}</div>`;
      if (item.ar) html += `<div class="def-ar"><strong>🇸🇦 العربية :</strong> ${escapeHtml(item.ar)}</div>`;
    } else if (currentLanguage === "en") {
      html += `<div class="def-en"><strong>🇬🇧 Definition :</strong> ${escapeHtml(item.en || item.fr || '—')}</div>`;
      if (item.fr) html += `<div class="def-fr"><strong>🇫🇷 Français :</strong> ${escapeHtml(item.fr)}</div>`;
      if (item.ar) html += `<div class="def-ar"><strong>🇸🇦 العربية :</strong> ${escapeHtml(item.ar)}</div>`;
    } else if (currentLanguage === "ar") {
      html += `<div class="def-ar"><strong>🇸🇦 التعريف :</strong> ${escapeHtml(item.ar || item.fr || '—')}</div>`;
      if (item.fr) html += `<div class="def-fr"><strong>🇫🇷 Français :</strong> ${escapeHtml(item.fr)}</div>`;
      if (item.en) html += `<div class="def-en"><strong>🇬🇧 English :</strong> ${escapeHtml(item.en)}</div>`;
    }
    
    if (item.exemple) {
      html += `<div class="word-example">
        <strong>📝 Exemple :</strong><br>
        <span class="ex-tad">${escapeHtml(item.exemple)}</span><br>
        <span class="ex-trans">${escapeHtml(item.exemple_fr || '')}</span>
      </div>`;
    }
    
    html += `
        </div>
        <div class="word-actions">
          <button class="btn-small" id="shareWordBtn">📤 ${window.t ? window.t('share') : 'Partager'}</button>
          <button class="btn-small" id="favoriteWordBtn">⭐ ${window.favoris?.includes(item.mot) ? (window.t ? window.t('remove_favorite') : 'Retirer') : (window.t ? window.t('add_favorite') : 'Ajouter')}</button>
          ${item.audio ? `<button class="btn-small" id="playAudioBtn">🔊 Écouter</button>` : ''}
          ${item.cat === 'vt.' || item.cat === 'vi.' ? `<button class="btn-small" id="conjugateBtn">📚 Conjuguer</button>` : ''}
        </div>
      </div>
    `;
    
    defElem.innerHTML = html;
    
    setTimeout(() => {
      document.getElementById("shareWordBtn")?.addEventListener("click", () => partagerMot(item));
      document.getElementById("favoriteWordBtn")?.addEventListener("click", () => basculerFavori(item));
      document.getElementById("playAudioBtn")?.addEventListener("click", () => jouerAudio(item));
      document.getElementById("conjugateBtn")?.addEventListener("click", () => afficherConjugaison(item));
    }, 50);
  }
  
  if (audioElem && item.audio) {
    audioElem.src = `audio/${item.audio}`;
    audioElem.hidden = false;
    audioElem.load();
  } else if (audioElem) {
    audioElem.hidden = true;
  }
  
  if (window.ajouterHistorique) window.ajouterHistorique(item.mot);
  mettreAJourNavigationMots();
}

function jouerAudio(item) {
  if (audioElem && item.audio) {
    audioElem.play();
  } else if (window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(item.mot);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    if (window.showToast) window.showToast("🔊 Audio non disponible", "warning");
  }
}

function afficherConjugaison(item) {
  const conjugaison = conjugaisonsExemples.find(c => c.verbe === item.mot.toLowerCase());
  if (!conjugaison) {
    if (window.showToast) window.showToast("📚 Conjugaison non disponible pour ce verbe", "info");
    return;
  }
  
  const modalHtml = `
    <div id="conjugModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>📚 Conjugaison de "${item.mot}"</h2>
        <div class="conjug-table">
          <div class="conjug-row"><strong>Présent:</strong> ${conjugaison.present}</div>
          <div class="conjug-row"><strong>Passé:</strong> ${conjugaison.passe}</div>
          <div class="conjug-row"><strong>Futur:</strong> ${conjugaison.futur}</div>
        </div>
        <p class="conjug-note">📖 Le verbe ${item.mot} signifie "${conjugaison.sens}"</p>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('conjugModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('conjugModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function mettreAJourNavigationMots() {
  const prevBtn = document.getElementById('btnPrev');
  const nextBtn = document.getElementById('btnNext');
  if (prevBtn) prevBtn.disabled = currentIndex <= 0;
  if (nextBtn) nextBtn.disabled = currentIndex >= motsListe.length - 1;
}

// ------------------------------
// FILTRES ET TRI
// ------------------------------
function construireFiltresCategories() {
  const container = document.getElementById("filterContainer");
  if (!container) return;
  
  const categories = [...new Set(vocabulaire.map(v => v.cat).filter(Boolean))];
  let html = `<select id="categorieFilter" class="filter-select">
    <option value="all">📚 Toutes les catégories</option>`;
  
  categories.forEach(cat => {
    let label = currentLanguage === 'fr' ? (categoriesFr[cat] || cat) : 
                (currentLanguage === 'en' ? (categoriesEn[cat] || cat) : (categoriesAr[cat] || cat));
    html += `<option value="${cat}">${escapeHtml(label)}</option>`;
  });
  
  html += `</select>
    <select id="sortFilter" class="filter-select">
      <option value="alpha">🔤 Ordre alphabétique</option>
      <option value="alpha-desc">🔤 Ordre alphabétique inverse</option>
      <option value="popularite">⭐ Les plus consultés</option>
      <option value="recent">🕐 Récents</option>
    </select>`;
  
  container.innerHTML = html;
  
  document.getElementById("categorieFilter")?.addEventListener("change", (e) => {
    filtresActifs.categorie = e.target.value;
    appliquerFiltres();
  });
  
  document.getElementById("sortFilter")?.addEventListener("change", (e) => {
    triActuel = e.target.value;
    appliquerFiltres();
  });
}

function appliquerFiltres() {
  let resultats = [...vocabulaire];
  
  if (filtresActifs.categorie !== 'all') {
    resultats = resultats.filter(m => m.cat === filtresActifs.categorie);
  }
  
  if (filtresActifs.lettre !== 'all') {
    resultats = resultats.filter(m => m.mot?.toUpperCase().startsWith(filtresActifs.lettre));
  }
  
  if (filtresActifs.recherche) {
    const query = filtresActifs.recherche.toLowerCase();
    resultats = resultats.filter(m => 
      m.mot.toLowerCase().includes(query) ||
      (m.fr && m.fr.toLowerCase().includes(query)) ||
      (m.en && m.en.toLowerCase().includes(query))
    );
  }
  
  switch (triActuel) {
    case 'alpha':
      resultats.sort((a, b) => a.mot.localeCompare(b.mot));
      break;
    case 'alpha-desc':
      resultats.sort((a, b) => b.mot.localeCompare(a.mot));
      break;
    case 'popularite':
      resultats.sort((a, b) => (statsRecherche.motsLesPlusConsultes[b.mot] || 0) - (statsRecherche.motsLesPlusConsultes[a.mot] || 0));
      break;
    case 'recent':
      resultats.sort((a, b) => (b.index || 0) - (a.index || 0));
      break;
  }
  
  motsListe = resultats.map((item, idx) => ({ ...item, index: idx }));
  
  if (compteurMot && motsListe.length) {
    compteurMot.textContent = `1 / ${motsListe.length}`;
  }
  
  if (motsListe.length) {
    afficherMot(motsListe[0]);
  } else {
    defElem.innerHTML = '<p class="no-results">🔍 Aucun résultat ne correspond à vos critères.</p>';
    motElem.textContent = '—';
  }
}

// ------------------------------
// EXPRESSIONS ET PROVERBES
// ------------------------------
function afficherExpressions() {
  const container = document.getElementById("expressionsContainer");
  if (!container) return;
  
  let html = `<div class="expressions-grid">
    <h3>💬 Expressions courantes</h3>
    <div class="expressions-list">`;
  
  expressionsCourantes.forEach(exp => {
    html += `
      <div class="expression-card">
        <div class="exp-tad">${escapeHtml(exp.tad)}</div>
        <div class="exp-fr">${escapeHtml(exp.fr)}</div>
        <div class="exp-contexte">📌 ${escapeHtml(exp.contexte)}</div>
      </div>
    `;
  });
  
  html += `</div></div>`;
  container.innerHTML = html;
}

function afficherProverbes() {
  const container = document.getElementById("proverbesContainer");
  if (!container) return;
  
  let html = `<div class="proverbes-grid">
    <h3>📜 Proverbes tadaksahak</h3>
    <div class="proverbes-list">`;
  
  proverbes.forEach(proverbe => {
    html += `
      <div class="proverbe-card">
        <div class="prov-tad">${escapeHtml(proverbe.tad)}</div>
        <div class="prov-fr">${escapeHtml(proverbe.fr)}</div>
        <div class="prov-sens">💡 ${escapeHtml(proverbe.sens)}</div>
      </div>
    `;
  });
  
  html += `</div></div>`;
  container.innerHTML = html;
}

// ------------------------------
// RECHERCHE AVANCÉE
// ------------------------------
function chercher(queryRaw) {
  const query = typeof normalizeText === 'function' ? normalizeText(queryRaw) : queryRaw.toLowerCase();
  if (!query || !vocabulaire.length) return [];
  const resultats = [];
  const maxDist = Math.max(2, Math.floor(query.length * 0.4));
  
  for (const item of vocabulaire) {
    let score = Infinity;
    const motNorm = typeof normalizeText === 'function' ? normalizeText(item.mot) : item.mot.toLowerCase();
    
    if (motNorm.includes(query)) {
      score = motNorm.startsWith(query) ? 0 : 1;
    } else if (score > 1 && item.fr && (typeof normalizeText === 'function' ? normalizeText(item.fr).includes(query) : item.fr.toLowerCase().includes(query))) {
      score = 2;
    } else if (score > 2 && item.en && (typeof normalizeText === 'function' ? normalizeText(item.en).includes(query) : item.en.toLowerCase().includes(query))) {
      score = 3;
    } else if (score > 3 && item.ar && (typeof normalizeText === 'function' ? normalizeText(item.ar).includes(query) : item.ar.toLowerCase().includes(query))) {
      score = 4;
    } else if (score === Infinity && item.mot) {
      const dist = typeof levenshtein === 'function' ? levenshtein(motNorm, query) : Math.abs(motNorm.length - query.length);
      if (dist <= maxDist) score = 5 + dist;
    }
    
    if (score < Infinity) resultats.push({ item, score });
  }
  
  return resultats.sort((a,b) => a.score - b.score).slice(0,15).map(r => r.item);
}

// ------------------------------
// INDEX ALPHABÉTIQUE
// ------------------------------
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
      filtresActifs.lettre = l;
      appliquerFiltres();
      
      document.querySelectorAll('.alphabet-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    container.appendChild(btn);
  });
  
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "📚 Tous";
  resetBtn.className = "alphabet-btn reset";
  resetBtn.addEventListener("click", () => {
    filtresActifs.lettre = 'all';
    appliquerFiltres();
    document.querySelectorAll('.alphabet-btn').forEach(b => b.classList.remove('active'));
  });
  container.appendChild(resetBtn);
}

// ------------------------------
// NAVIGATION
// ------------------------------
function navigationPrecedent() { 
  if (currentIndex > 0) afficherMot(motsListe[currentIndex-1]); 
}

function navigationSuivant() { 
  if (currentIndex < motsListe.length-1) afficherMot(motsListe[currentIndex+1]); 
}

function partagerMot(item) {
  const text = `${item.mot} : ${currentLanguage === 'fr' ? item.fr : (currentLanguage === 'en' ? item.en : item.fr)}`;
  if (navigator.share) {
    navigator.share({ title: 'Mot Tadaksahak', text: text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    if (window.showToast) window.showToast("📋 Copié dans le presse-papier", "success");
  }
}

function basculerFavori(item) {
  if (!window.favoris) window.favoris = [];
  if (window.favoris.includes(item.mot)) {
    window.favoris = window.favoris.filter(m => m !== item.mot);
    if (window.showToast) window.showToast("⭐ Retiré des favoris", "info");
  } else {
    window.favoris.push(item.mot);
    if (window.showToast) window.showToast("⭐ Ajouté aux favoris", "success");
  }
  if (window.sauvegarderFavoris) window.sauvegarderFavoris();
  if (motActuel === item) afficherMot(item);
  if (document.getElementById("dashboard") && !document.getElementById("dashboard").hidden && window.afficherDashboard) {
    window.afficherDashboard();
  }
}

// ------------------------------
// INITIALISATION DE LA RECHERCHE
// ------------------------------
if (searchBar) {
  let debounceTimeout;
  searchBar.addEventListener("input", (e) => {
    const raw = e.target.value.trim();
    filtresActifs.recherche = raw;
    if (clearSearchBtn) clearSearchBtn.hidden = !raw;
    if (!suggestionsList) return;
    
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      suggestionsList.innerHTML = "";
      suggestionsList.classList.remove("show");
      if (!raw) {
        appliquerFiltres();
        return;
      }
      
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
            filtresActifs.recherche = item.mot;
            appliquerFiltres();
            afficherMot(item);
          });
          suggestionsList.appendChild(li);
        });
      }
      suggestionsList.classList.add("show");
      appliquerFiltres();
    }, 300);
  });
  
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchBar.value = "";
      searchBar.focus();
      clearSearchBtn.hidden = true;
      suggestionsList.innerHTML = "";
      suggestionsList.classList.remove("show");
      filtresActifs.recherche = '';
      appliquerFiltres();
    });
  }
}

// ------------------------------
// EXPORT
// ------------------------------
window.vocabulaire = vocabulaire;
window.motsListe = motsListe;
window.motActuel = motActuel;
window.chargerDictionnaire = chargerDictionnaire;
window.afficherMot = afficherMot;
window.navigationPrecedent = navigationPrecedent;
window.navigationSuivant = navigationSuivant;
window.chercher = chercher;
window.basculerFavori = basculerFavori;
window.afficherExpressions = afficherExpressions;
window.afficherProverbes = afficherProverbes;
window.jouerAudio = jouerAudio;

console.log("📖 Module Dictionnaire chargé - Version premium");
