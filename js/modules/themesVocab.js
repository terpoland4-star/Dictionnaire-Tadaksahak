// ============================================
// MODULE - THÈMES (VOCABULAIRE THÉMATIQUE)
// Version corrigée - Conflit de variable résolu
// ============================================

let themesData = null;
let userThemeProgress = {};
let themeFavorites = [];
let currentThemeQuiz = null;
let themeQuizScore = 0;
let themeQuizIndex = 0;
let themeFlashcardsMode = false;
let currentThemeFlashcards = [];
let currentThemeFlashcardIndex = 0;

// Configuration spécifique aux thèmes (renommée pour éviter conflit)
const THEMES_VOCAB_CONFIG = {
  showProgress: true,
  showQuiz: true,
  showFlashcards: true,
  showFavorites: true,
  wordsPerPage: 20,
  enablePronunciation: true
};

// ------------------------------
// CHARGEMENT DES DONNÉES
// ------------------------------
async function chargerThemes() {
  try {
    const response = await fetch('data/themes.json');
    if (!response.ok) throw new Error();
    themesData = await response.json();
    console.log('📚 Thèmes chargés');
    chargerProgressionThemes();
    chargerFavorisThemes();
  } catch(e) {
    console.warn("Erreur chargement thèmes", e);
    themesData = getFallbackThemes();
  }
}

function getFallbackThemes() {
  return {
    themes: [
      {
        id: "animaux",
        titre_fr: "Les animaux",
        titre_en: "Animals",
        titre_ar: "الحيوانات",
        description_fr: "Vocabulaire des animaux en tadaksahak",
        description_en: "Animal vocabulary in Tadaksahak",
        description_ar: "مفردات الحيوانات بلغة تدكساهق",
        mots: [
          { tad: "a-rgán", fr: "chameau (mâle adulte)", en: "adult male camel", ar: "جمل بالغ" },
          { tad: "yáw", fr: "chamelle", en: "female camel", ar: "ناقة" },
          { tad: "a-lágod", fr: "petit chameau", en: "young camel", ar: "جمل صغير" }
        ]
      },
      {
        id: "couleurs",
        titre_fr: "Les couleurs",
        titre_en: "Colors",
        titre_ar: "الألوان",
        description_fr: "Les couleurs en tadaksahak",
        description_en: "Colors in Tadaksahak",
        description_ar: "الألوان بلغة تدكساهق",
        mots: [
          { tad: "bibi", fr: "noir", en: "black", ar: "أسود" },
          { tad: "kooray", fr: "blanc", en: "white", ar: "أبيض" },
          { tad: "ciday", fr: "rouge", en: "red", ar: "أحمر" }
        ]
      }
    ]
  };
}

// ------------------------------
// PROGRESSION UTILISATEUR
// ------------------------------
function chargerProgressionThemes() {
  const saved = localStorage.getItem('theme_progress');
  if (saved) {
    try {
      userThemeProgress = JSON.parse(saved);
    } catch(e) {}
  }
}

function sauvegarderProgressionThemes() {
  localStorage.setItem('theme_progress', JSON.stringify(userThemeProgress));
}

function marquerMotAppris(themeId, motTad, estAppris = true) {
  if (!userThemeProgress[themeId]) {
    userThemeProgress[themeId] = { appris: [], total: 0, score: 0 };
  }
  
  if (estAppris && !userThemeProgress[themeId].appris.includes(motTad)) {
    userThemeProgress[themeId].appris.push(motTad);
  } else if (!estAppris) {
    userThemeProgress[themeId].appris = userThemeProgress[themeId].appris.filter(m => m !== motTad);
  }
  
  userThemeProgress[themeId].total = userThemeProgress[themeId].appris.length;
  sauvegarderProgressionThemes();
}

function getProgressionTheme(themeId) {
  if (!userThemeProgress[themeId]) return 0;
  const theme = themesData.themes.find(t => t.id === themeId);
  if (!theme) return 0;
  const totalMots = theme.mots?.length || 1;
  return Math.round((userThemeProgress[themeId].appris.length / totalMots) * 100);
}

// ------------------------------
// FAVORIS
// ------------------------------
function chargerFavorisThemes() {
  const saved = localStorage.getItem('theme_favorites');
  if (saved) {
    try {
      themeFavorites = JSON.parse(saved);
    } catch(e) {}
  }
}

function sauvegarderFavorisThemes() {
  localStorage.setItem('theme_favorites', JSON.stringify(themeFavorites));
}

function basculerFavoriTheme(themeId) {
  if (themeFavorites.includes(themeId)) {
    themeFavorites = themeFavorites.filter(id => id !== themeId);
    if (window.showToast) window.showToast("⭐ Thème retiré des favoris", "info");
  } else {
    themeFavorites.push(themeId);
    if (window.showToast) window.showToast("⭐ Thème ajouté aux favoris", "success");
  }
  sauvegarderFavorisThemes();
  afficherThemesPremium();
}

// ------------------------------
// AFFICHAGE PRINCIPAL
// ------------------------------
function afficherThemesPremium() {
  const container = document.getElementById("themesContainer");
  if (!container) return;
  
  if (!themesData || !themesData.themes || themesData.themes.length === 0) {
    container.innerHTML = `<div class="info-message">
      <p>📚 Aucun thème disponible.</p>
      <button onclick="window.chargerThemes()" class="btn-small">🔄 Recharger</button>
    </div>`;
    return;
  }
  
  const totalMots = themesData.themes.reduce((acc, t) => acc + (t.mots?.length || 0), 0);
  const totalAppris = Object.values(userThemeProgress).reduce((acc, p) => acc + (p.appris?.length || 0), 0);
  const progressionGlobale = Math.round((totalAppris / totalMots) * 100) || 0;
  
  let html = `
    <div class="themes-premium-header">
      <div class="premium-icon">📚</div>
      <h2>${window.t ? window.t('themes_title') : 'Vocabulaire thématique'}</h2>
      <p>Apprenez le vocabulaire tadaksahak par catégories thématiques</p>
      
      <div class="themes-premium-search">
        <input type="text" id="themeSearchPremium" placeholder="🔍 Rechercher un mot, un thème ou une traduction..." class="theme-search-premium">
        <button id="themeSearchClear" class="search-clear" style="display: none;">✖</button>
      </div>
      
      <div class="themes-premium-stats">
        <span class="stat-badge">📖 ${totalMots} mots</span>
        <span class="stat-badge">📚 ${themesData.themes.length} thèmes</span>
        <span class="stat-badge">⭐ ${totalAppris} appris</span>
        <span class="stat-badge">📊 ${progressionGlobale}% global</span>
      </div>
      
      <div class="global-progress-bar">
        <div class="global-progress-fill" style="width: ${progressionGlobale}%;"></div>
      </div>
      
      <div class="themes-actions">
        <button id="showAllThemesBtn" class="btn-small active">📚 Tous les thèmes</button>
        <button id="showFavoritesThemesBtn" class="btn-small">⭐ Favoris</button>
        <button id="showProgressThemesBtn" class="btn-small">📈 Progression</button>
        <button id="themeQuizBtn" class="btn-small">❓ Quiz général</button>
        <button id="themeFlashcardsBtn" class="btn-small">🃏 Mode flashcards</button>
      </div>
    </div>
    
    <div id="themesGridContainer" class="themes-premium-grid"></div>
  `;
  
  container.innerHTML = html;
  afficherGrilleThemes(themesData.themes);
  initialiserInteractionsThemes();
}

function afficherGrilleThemes(themes) {
  const container = document.getElementById('themesGridContainer');
  if (!container) return;
  
  if (!themes.length) {
    container.innerHTML = `<div class="info-message">📚 Aucun thème à afficher.</div>`;
    return;
  }
  
  let html = '';
  
  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i];
    let titre = currentLanguage === 'fr' ? theme.titre_fr : (currentLanguage === 'en' ? theme.titre_en : theme.titre_ar);
    let description = currentLanguage === 'fr' ? theme.description_fr : (currentLanguage === 'en' ? theme.description_en : theme.description_ar);
    const motCount = theme.mots?.length || 0;
    const progression = getProgressionTheme(theme.id);
    const estFavori = themeFavorites.includes(theme.id);
    const motsAppris = userThemeProgress[theme.id]?.appris?.length || 0;
    
    html += `
      <div class="theme-premium-card" data-theme-id="${theme.id}">
        <div class="theme-premium-header">
          <div class="theme-premium-icon">📖</div>
          <h3>${escapeHtml(titre)}</h3>
          <button class="theme-favorite-btn" data-theme-id="${theme.id}">${estFavori ? '⭐' : '☆'}</button>
          <span class="theme-premium-badge">${motCount} mots</span>
        </div>
        
        <p class="theme-premium-desc">${escapeHtml(description || '')}</p>
        
        <div class="theme-progress-container">
          <div class="theme-progress-bar">
            <div class="theme-progress-fill" style="width: ${progression}%;"></div>
          </div>
          <span class="theme-progress-text">${motsAppris}/${motCount} appris (${progression}%)</span>
        </div>
        
        <div class="theme-premium-preview">
          ${theme.mots?.slice(0, 5).map(mot => `<span class="preview-word-premium" data-mot="${escapeHtml(mot.tad)}">${escapeHtml(mot.tad)}</span>`).join('')}
          ${motCount > 5 ? `<span class="preview-more-premium">+${motCount - 5} autres</span>` : ''}
        </div>
        
        <div class="theme-actions">
          <button class="theme-expand-btn" data-theme-id="${theme.id}">
            <span class="expand-text">Explorer le thème</span>
            <span class="expand-icon">▼</span>
          </button>
          <button class="theme-quiz-btn" data-theme-id="${theme.id}" title="Quiz sur ce thème">❓</button>
          <button class="theme-flashcards-btn" data-theme-id="${theme.id}" title="Flashcards">🃏</button>
        </div>
        
        <div class="theme-premium-words" id="themeWords-${theme.id}" style="display: none;">
          <div class="words-premium-header">
            <span>Mot en tadaksahak</span>
            <span>Traduction</span>
            <span>Prononciation</span>
            <span>Statut</span>
          </div>
          <div class="words-premium-list">
            ${theme.mots?.map(mot => `
              <div class="word-premium-row" data-mot="${escapeHtml(mot.tad)}" data-theme="${theme.id}">
                <span class="word-premium-tad">${escapeHtml(mot.tad)}</span>
                <span class="word-premium-trans">${escapeHtml(currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar))}</span>
                <button class="word-premium-play" data-word="${escapeHtml(mot.tad)}">🔊</button>
                <button class="word-premium-learn" data-word="${escapeHtml(mot.tad)}" data-theme="${theme.id}">
                  ${userThemeProgress[theme.id]?.appris?.includes(mot.tad) ? '✅ Appris' : '📖 Apprendre'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  container.innerHTML = html;
}

function initialiserInteractionsThemes() {
  // Expansion des thèmes
  document.querySelectorAll('.theme-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeId = btn.dataset.themeId;
      const wordsContainer = document.getElementById(`themeWords-${themeId}`);
      const expandText = btn.querySelector('.expand-text');
      const expandIcon = btn.querySelector('.expand-icon');
      
      if (wordsContainer.style.display === 'none') {
        wordsContainer.style.display = 'block';
        if (expandText) expandText.textContent = 'Réduire';
        if (expandIcon) expandIcon.textContent = '▲';
      } else {
        wordsContainer.style.display = 'none';
        if (expandText) expandText.textContent = 'Explorer le thème';
        if (expandIcon) expandIcon.textContent = '▼';
      }
    });
  });
  
  // Boutons favoris
  document.querySelectorAll('.theme-favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeId = btn.dataset.themeId;
      basculerFavoriTheme(themeId);
    });
  });
  
  // Boutons quiz par thème
  document.querySelectorAll('.theme-quiz-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeId = btn.dataset.themeId;
      const theme = themesData.themes.find(t => t.id === themeId);
      if (theme) demarrerQuizTheme(theme);
    });
  });
  
  // Prononciation
  document.querySelectorAll('.word-premium-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const word = btn.dataset.word;
      speakTextPremium(word);
    });
  });
  
  // Apprentissage des mots
  document.querySelectorAll('.word-premium-learn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const word = btn.dataset.word;
      const themeId = btn.dataset.theme;
      const estAppris = btn.textContent.includes('✅');
      
      marquerMotAppris(themeId, word, !estAppris);
      
      if (!estAppris) {
        btn.textContent = '✅ Appris';
        btn.style.background = 'var(--success)';
      } else {
        btn.textContent = '📖 Apprendre';
        btn.style.background = '';
      }
      
      const progression = getProgressionTheme(themeId);
      const progressBar = document.querySelector(`.theme-premium-card[data-theme-id="${themeId}"] .theme-progress-fill`);
      const progressText = document.querySelector(`.theme-premium-card[data-theme-id="${themeId}"] .theme-progress-text`);
      if (progressBar) progressBar.style.width = `${progression}%`;
      if (progressText) {
        const theme = themesData.themes.find(t => t.id === themeId);
        const motsAppris = userThemeProgress[themeId]?.appris?.length || 0;
        const totalMots = theme?.mots?.length || 1;
        progressText.textContent = `${motsAppris}/${totalMots} appris (${progression}%)`;
      }
    });
  });
  
  // Clic sur un mot pour aller au dictionnaire
  document.querySelectorAll('.word-premium-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.classList.contains('word-premium-play')) return;
      if (e.target.classList.contains('word-premium-learn')) return;
      const mot = row.dataset.mot;
      const motTrouve = window.vocabulaire?.find(v => v.mot === mot);
      if (motTrouve && window.sectionSelector) {
        window.sectionSelector.value = 'dictionnaire';
        window.sectionSelector.dispatchEvent(new Event('change'));
        setTimeout(() => window.afficherMot(motTrouve), 100);
      }
    });
  });
}

// ------------------------------
// QUIZ PAR THÈME (simplifié)
// ------------------------------
function demarrerQuizTheme(theme) {
  if (!theme.mots || !theme.mots.length) {
    if (window.showToast) window.showToast("📚 Ce thème n'a pas assez de mots pour un quiz", "warning");
    return;
  }
  
  const questions = [];
  const motsMelanges = [...theme.mots].sort(() => 0.5 - Math.random()).slice(0, 5);
  
  for (const mot of motsMelanges) {
    const traductionCorrecte = currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar);
    questions.push({
      mot: mot.tad,
      correct: traductionCorrecte,
      options: [traductionCorrecte, "Autre option 1", "Autre option 2", "Autre option 3"]
    });
  }
  
  currentThemeQuiz = questions;
  themeQuizScore = 0;
  themeQuizIndex = 0;
  
  if (window.showToast) window.showToast(`❓ Quiz "${theme.titre_fr}" - ${questions.length} questions`, "info");
}

// ------------------------------
// PRONONCIATION
// ------------------------------
function speakTextPremium(text) {
  if (!text) return;
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    if (window.showToast) window.showToast("🔊 Synthèse vocale non supportée", "warning");
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Exporter
window.themesData = themesData;
window.chargerThemes = chargerThemes;
window.afficherThemesPremium = afficherThemesPremium;
window.speakTextPremium = speakTextPremium;
window.getProgressionTheme = getProgressionTheme;
window.basculerFavoriTheme = basculerFavoriTheme;

console.log("📚 Module Thèmes Premium chargé - Version corrigée");
