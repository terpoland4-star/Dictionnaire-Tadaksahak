// ============================================
// MODULE - THÈMES (VOCABULAIRE THÉMATIQUE)
// Version premium avec quiz, progression, favoris, statistiques
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

// ------------------------------
// CONFIGURATION
// ------------------------------
const THEMES_CONFIG = {
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
          { tad: "a-lágod", fr: "petit chameau", en: "young camel", ar: "جمل صغير" },
          { tad: "baarí", fr: "cheval", en: "horse", ar: "حصان" },
          { tad: "hánfi", fr: "chien", en: "dog", ar: "كلب" }
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
  mettreAJourAffichageProgression(themeId);
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
  afficherThemesPremium(); // Rafraîchir l'affichage
}

// ------------------------------
// AFFICHAGE PRINCIPAL (VERSION ENRICHIE)
// ------------------------------
function afficherThemesPremium() {
  const container = document.getElementById("themesContainer");
  if (!container) return;
  
  if (!themesData || !themesData.themes || themesData.themes.length === 0) {
    container.innerHTML = `<div class="info-message">
      <p>📚 Aucun thème disponible.</p>
      <button onclick="chargerThemes()" class="btn-small">🔄 Recharger</button>
    </div>`;
    return;
  }
  
  const totalMots = themesData.themes.reduce((acc, t) => acc + (t.mots?.length || 0), 0);
  const totalAppris = Object.values(userThemeProgress).reduce((acc, p) => acc + (p.appris?.length || 0), 0);
  const progressionGlobale = Math.round((totalAppris / totalMots) * 100) || 0;
  
  let html = `
    <div class="themes-premium-header">
      <div class="premium-icon">📚</div>
      <h2>${window.t('themes_title') || 'Vocabulaire thématique'}</h2>
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
  
  // Afficher tous les thèmes par défaut
  afficherGrilleThemes(themesData.themes);
  
  // Initialiser les interactions
  document.getElementById('showAllThemesBtn')?.addEventListener('click', () => {
    document.querySelectorAll('.themes-actions .btn-small').forEach(btn => btn.classList.remove('active'));
    document.getElementById('showAllThemesBtn').classList.add('active');
    afficherGrilleThemes(themesData.themes);
  });
  
  document.getElementById('showFavoritesThemesBtn')?.addEventListener('click', () => {
    document.querySelectorAll('.themes-actions .btn-small').forEach(btn => btn.classList.remove('active'));
    document.getElementById('showFavoritesThemesBtn').classList.add('active');
    const themesFavoris = themesData.themes.filter(t => themeFavorites.includes(t.id));
    afficherGrilleThemes(themesFavoris.length ? themesFavoris : themesData.themes);
    if (!themesFavoris.length && window.showToast) {
      window.showToast("⭐ Aucun thème favori. Cliquez sur l'étoile pour en ajouter.", "info");
    }
  });
  
  document.getElementById('showProgressThemesBtn')?.addEventListener('click', () => {
    document.querySelectorAll('.themes-actions .btn-small').forEach(btn => btn.classList.remove('active'));
    document.getElementById('showProgressThemesBtn').classList.add('active');
    const themesTries = [...themesData.themes].sort((a, b) => {
      const progA = getProgressionTheme(a.id);
      const progB = getProgressionTheme(b.id);
      return progB - progA;
    });
    afficherGrilleThemes(themesTries);
  });
  
  document.getElementById('themeQuizBtn')?.addEventListener('click', () => {
    demarrerQuizGeneral();
  });
  
  document.getElementById('themeFlashcardsBtn')?.addEventListener('click', () => {
    demarrerFlashcardsGeneraux();
  });
  
  // Recherche améliorée
  const searchInput = document.getElementById('themeSearchPremium');
  const searchClear = document.getElementById('themeSearchClear');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (searchClear) searchClear.style.display = query ? 'block' : 'none';
      
      if (!query) {
        afficherGrilleThemes(themesData.themes);
        return;
      }
      
      const filteredThemes = [];
      for (const theme of themesData.themes) {
        const titreMatch = (theme.titre_fr || '').toLowerCase().includes(query);
        const descMatch = (theme.description_fr || '').toLowerCase().includes(query);
        const motsMatch = theme.mots?.some(mot => 
          (mot.tad || '').toLowerCase().includes(query) ||
          (mot.fr || '').toLowerCase().includes(query) ||
          (mot.en || '').toLowerCase().includes(query) ||
          (mot.ar || '').toLowerCase().includes(query)
        );
        
        if (titreMatch || descMatch || motsMatch) {
          filteredThemes.push(theme);
        }
      }
      
      afficherGrilleThemes(filteredThemes);
      
      if (filteredThemes.length === 0 && window.showToast) {
        window.showToast(`🔍 Aucun résultat pour "${query}"`, "info");
      }
    });
    
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        afficherGrilleThemes(themesData.themes);
        searchInput.focus();
      });
    }
  }
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
      <div class="theme-premium-card" data-theme-id="${theme.id}" data-theme-idx="${i}">
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
  
  // Initialiser les interactions
  initialiserInteractionsThemes();
}

function initialiserInteractionsThemes() {
  // Expansion des thèmes
  document.querySelectorAll('.theme-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeId = btn.dataset.themeId;
      const wordsContainer = document.getElementById(`themeWords-${themeId}`);
      const card = btn.closest('.theme-premium-card');
      const expandText = btn.querySelector('.expand-text');
      const expandIcon = btn.querySelector('.expand-icon');
      
      if (wordsContainer.style.display === 'none') {
        wordsContainer.style.display = 'block';
        if (expandText) expandText.textContent = 'Réduire';
        if (expandIcon) expandIcon.textContent = '▲';
        card?.classList.add('expanded');
      } else {
        wordsContainer.style.display = 'none';
        if (expandText) expandText.textContent = 'Explorer le thème';
        if (expandIcon) expandIcon.textContent = '▼';
        card?.classList.remove('expanded');
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
  
  // Boutons flashcards par thème
  document.querySelectorAll('.theme-flashcards-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeId = btn.dataset.themeId;
      const theme = themesData.themes.find(t => t.id === themeId);
      if (theme) demarrerFlashcardsTheme(theme);
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
      
      // Mettre à jour le bouton
      if (!estAppris) {
        btn.textContent = '✅ Appris';
        btn.style.background = 'var(--success)';
      } else {
        btn.textContent = '📖 Apprendre';
        btn.style.background = '';
      }
      
      // Mettre à jour la progression du thème
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
      
      // Mettre à jour les statistiques globales
      mettreAJourStatsGlobales();
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
  
  // Clic sur les mots d'aperçu
  document.querySelectorAll('.preview-word-premium').forEach(word => {
    word.addEventListener('click', (e) => {
      e.stopPropagation();
      const mot = word.dataset.mot;
      const motTrouve = window.vocabulaire?.find(v => v.mot === mot);
      if (motTrouve && window.sectionSelector) {
        window.sectionSelector.value = 'dictionnaire';
        window.sectionSelector.dispatchEvent(new Event('change'));
        setTimeout(() => window.afficherMot(motTrouve), 100);
      }
    });
  });
}

function mettreAJourStatsGlobales() {
  const totalMots = themesData.themes.reduce((acc, t) => acc + (t.mots?.length || 0), 0);
  const totalAppris = Object.values(userThemeProgress).reduce((acc, p) => acc + (p.appris?.length || 0), 0);
  const progressionGlobale = Math.round((totalAppris / totalMots) * 100) || 0;
  
  const statsContainer = document.querySelector('.themes-premium-stats');
  if (statsContainer) {
    const statsSpans = statsContainer.querySelectorAll('.stat-badge');
    if (statsSpans[2]) statsSpans[2].innerHTML = `⭐ ${totalAppris} appris`;
    if (statsSpans[3]) statsSpans[3].innerHTML = `📊 ${progressionGlobale}% global`;
  }
  
  const progressBar = document.querySelector('.global-progress-fill');
  if (progressBar) progressBar.style.width = `${progressionGlobale}%`;
}

function mettreAJourAffichageProgression(themeId) {
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
}

// ------------------------------
// QUIZ PAR THÈME
// ------------------------------
function demarrerQuizTheme(theme) {
  if (!theme.mots || !theme.mots.length) {
    if (window.showToast) window.showToast("📚 Ce thème n'a pas assez de mots pour un quiz", "warning");
    return;
  }
  
  const questions = [];
  const motsMelanges = [...theme.mots].sort(() => 0.5 - Math.random()).slice(0, 10);
  
  for (const mot of motsMelanges) {
    const traductionCorrecte = currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar);
    const autresMots = theme.mots.filter(m => m.tad !== mot.tad).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [traductionCorrecte, ...autresMots.map(m => currentLanguage === 'fr' ? m.fr : (currentLanguage === 'en' ? m.en : m.ar))];
    
    questions.push({
      mot: mot.tad,
      correct: traductionCorrecte,
      options: options.sort(() => 0.5 - Math.random())
    });
  }
  
  currentThemeQuiz = questions;
  themeQuizScore = 0;
  themeQuizIndex = 0;
  afficherQuestionQuizTheme(theme.titre_fr);
}

function afficherQuestionQuizTheme(themeTitle) {
  if (themeQuizIndex >= currentThemeQuiz.length) {
    terminerQuizTheme(themeTitle);
    return;
  }
  
  const q = currentThemeQuiz[themeQuizIndex];
  const modalHtml = `
    <div id="quizThemeModal" class="modal">
      <div class="modal-content quiz-content">
        <span class="modal-close">&times;</span>
        <div class="quiz-header">
          <span class="quiz-title">📚 ${escapeHtml(themeTitle)}</span>
          <span class="quiz-progress">Question ${themeQuizIndex + 1}/${currentThemeQuiz.length}</span>
          <span class="quiz-score">Score: ${themeQuizScore}</span>
        </div>
        <div class="quiz-question">Que signifie <strong>"${escapeHtml(q.mot)}"</strong> ?</div>
        <div class="quiz-options">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option" data-opt="${idx}">${String.fromCharCode(65 + idx)}. ${escapeHtml(opt)}</button>
          `).join('')}
        </div>
        <button id="quizSubmitBtn" class="quiz-submit">✅ Valider</button>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('quizThemeModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('quizThemeModal');
  const closeBtn = modal.querySelector('.modal-close');
  
  let selectedOpt = null;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedOpt = parseInt(btn.dataset.opt);
    });
  });
  
  document.getElementById('quizSubmitBtn').addEventListener('click', () => {
    if (selectedOpt === null) {
      if (window.showToast) window.showToast("Veuillez sélectionner une réponse", "warning");
      return;
    }
    
    const isCorrect = (q.options[selectedOpt] === q.correct);
    if (isCorrect) {
      themeQuizScore++;
      if (window.showToast) window.showToast("✅ Bonne réponse !", "success");
    } else {
      if (window.showToast) window.showToast(`❌ Mauvaise réponse. La bonne réponse était : ${q.correct}`, "error");
    }
    
    themeQuizIndex++;
    modal.remove();
    afficherQuestionQuizTheme(themeTitle);
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function terminerQuizTheme(themeTitle) {
  const percent = Math.round((themeQuizScore / currentThemeQuiz.length) * 100);
  const message = percent === 100 ? "🏆 Parfait ! Vous maîtrisez ce thème !" :
                  percent >= 70 ? "👍 Très bien ! Continuez à apprendre !" :
                  percent >= 50 ? "📚 Bon début ! Révisez un peu et réessayez." :
                  "💪 Continuez à apprendre, vous allez y arriver !";
  
  const modalHtml = `
    <div id="quizResultModal" class="modal">
      <div class="modal-content result-content">
        <span class="modal-close">&times;</span>
        <h2>📊 Résultat du quiz</h2>
        <div class="quiz-theme">${escapeHtml(themeTitle)}</div>
        <div class="quiz-score-final">${themeQuizScore} / ${currentThemeQuiz.length}</div>
        <div class="quiz-percent">${percent}%</div>
        <div class="quiz-message">${message}</div>
        <button id="restartQuizBtn" class="quiz-restart">🔄 Recommencer</button>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('quizResultModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('quizResultModal');
  const closeBtn = modal.querySelector('.modal-close');
  
  document.getElementById('restartQuizBtn').addEventListener('click', () => {
    modal.remove();
    const theme = themesData.themes.find(t => t.titre_fr === themeTitle);
    if (theme) demarrerQuizTheme(theme);
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ------------------------------
// QUIZ GÉNÉRAL
// ------------------------------
function demarrerQuizGeneral() {
  const tousLesMots = [];
  for (const theme of themesData.themes) {
    if (theme.mots) {
      for (const mot of theme.mots) {
        tousLesMots.push({ ...mot, theme: theme.titre_fr });
      }
    }
  }
  
  if (tousLesMots.length < 5) {
    if (window.showToast) window.showToast("📚 Pas assez de mots pour un quiz général", "warning");
    return;
  }
  
  const questions = [];
  const motsMelanges = [...tousLesMots].sort(() => 0.5 - Math.random()).slice(0, 10);
  
  for (const mot of motsMelanges) {
    const traductionCorrecte = currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar);
    const autresMots = tousLesMots.filter(m => m.tad !== mot.tad).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [traductionCorrecte, ...autresMots.map(m => currentLanguage === 'fr' ? m.fr : (currentLanguage === 'en' ? m.en : m.ar))];
    
    questions.push({
      mot: mot.tad,
      correct: traductionCorrecte,
      options: options.sort(() => 0.5 - Math.random()),
      theme: mot.theme
    });
  }
  
  currentThemeQuiz = questions;
  themeQuizScore = 0;
  themeQuizIndex = 0;
  afficherQuestionQuizGeneral();
}

function afficherQuestionQuizGeneral() {
  if (themeQuizIndex >= currentThemeQuiz.length) {
    terminerQuizGeneral();
    return;
  }
  
  const q = currentThemeQuiz[themeQuizIndex];
  const modalHtml = `
    <div id="quizGeneralModal" class="modal">
      <div class="modal-content quiz-content">
        <span class="modal-close">&times;</span>
        <div class="quiz-header">
          <span class="quiz-title">📚 Quiz général - Tous les thèmes</span>
          <span class="quiz-progress">Question ${themeQuizIndex + 1}/${currentThemeQuiz.length}</span>
          <span class="quiz-score">Score: ${themeQuizScore}</span>
        </div>
        <div class="quiz-theme-tag">📖 Thème : ${escapeHtml(q.theme)}</div>
        <div class="quiz-question">Que signifie <strong>"${escapeHtml(q.mot)}"</strong> ?</div>
        <div class="quiz-options">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option" data-opt="${idx}">${String.fromCharCode(65 + idx)}. ${escapeHtml(opt)}</button>
          `).join('')}
        </div>
        <button id="quizSubmitBtn" class="quiz-submit">✅ Valider</button>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('quizGeneralModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('quizGeneralModal');
  const closeBtn = modal.querySelector('.modal-close');
  
  let selectedOpt = null;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedOpt = parseInt(btn.dataset.opt);
    });
  });
  
  document.getElementById('quizSubmitBtn').addEventListener('click', () => {
    if (selectedOpt === null) {
      if (window.showToast) window.showToast("Veuillez sélectionner une réponse", "warning");
      return;
    }
    
    const isCorrect = (q.options[selectedOpt] === q.correct);
    if (isCorrect) {
      themeQuizScore++;
      if (window.showToast) window.showToast("✅ Bonne réponse !", "success");
    } else {
      if (window.showToast) window.showToast(`❌ Mauvaise réponse. La bonne réponse était : ${q.correct}`, "error");
    }
    
    themeQuizIndex++;
    modal.remove();
    afficherQuestionQuizGeneral();
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function terminerQuizGeneral() {
  const percent = Math.round((themeQuizScore / currentThemeQuiz.length) * 100);
  const message = percent === 100 ? "🏆 Parfait ! Vous êtes incollable !" :
                  percent >= 70 ? "👍 Très bien ! Continuez comme ça !" :
                  percent >= 50 ? "📚 Bon début ! Continuez à apprendre !" :
                  "💪 Ne lâchez rien ! Chaque mot appris est une victoire !";
  
  const modalHtml = `
    <div id="quizResultModal" class="modal">
      <div class="modal-content result-content">
        <span class="modal-close">&times;</span>
        <h2>📊 Résultat du quiz général</h2>
        <div class="quiz-score-final">${themeQuizScore} / ${currentThemeQuiz.length}</div>
        <div class="quiz-percent">${percent}%</div>
        <div class="quiz-message">${message}</div>
        <button id="restartQuizBtn" class="quiz-restart">🔄 Recommencer</button>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('quizResultModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('quizResultModal');
  const closeBtn = modal.querySelector('.modal-close');
  
  document.getElementById('restartQuizBtn').addEventListener('click', () => {
    modal.remove();
    demarrerQuizGeneral();
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ------------------------------
// FLASHCARDS
// ------------------------------
function demarrerFlashcardsTheme(theme) {
  if (!theme.mots || !theme.mots.length) {
    if (window.showToast) window.showToast("📚 Ce thème n'a pas assez de mots pour les flashcards", "warning");
    return;
  }
  
  themeFlashcardsMode = true;
  currentThemeFlashcards = [...theme.mots].sort(() => 0.5 - Math.random());
  currentThemeFlashcardIndex = 0;
  afficherFlashcardTheme(theme.titre_fr);
}

function demarrerFlashcardsGeneraux() {
  const tousLesMots = [];
  for (const theme of themesData.themes) {
    if (theme.mots) {
      for (const mot of theme.mots) {
        tousLesMots.push(mot);
      }
    }
  }
  
  if (tousLesMots.length === 0) {
    if (window.showToast) window.showToast("📚 Pas assez de mots pour les flashcards", "warning");
    return;
  }
  
  themeFlashcardsMode = true;
  currentThemeFlashcards = [...tousLesMots].sort(() => 0.5 - Math.random());
  currentThemeFlashcardIndex = 0;
  afficherFlashcardGeneral();
}

function afficherFlashcardTheme(themeTitle) {
  if (currentThemeFlashcardIndex >= currentThemeFlashcards.length) {
    terminerFlashcards(themeTitle);
    return;
  }
  
  const mot = currentThemeFlashcards[currentThemeFlashcardIndex];
  const traduction = currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar);
  
  const modalHtml = `
    <div id="flashcardModal" class="modal flashcards-modal">
      <div class="modal-content flashcards-content">
        <span class="modal-close">&times;</span>
        <div class="flashcards-header">
          <span class="flashcards-title">📚 Flashcards - ${escapeHtml(themeTitle)}</span>
          <span class="flashcards-progress">${currentThemeFlashcardIndex + 1}/${currentThemeFlashcards.length}</span>
        </div>
        <div class="flashcard-container" data-flipped="false">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <div class="flashcard-word">${escapeHtml(mot.tad)}</div>
              <div class="flashcard-prompt">👆 Cliquez pour voir la réponse</div>
            </div>
            <div class="flashcard-back">
              <div class="flashcard-def">${escapeHtml(traduction)}</div>
              <div class="flashcard-buttons">
                <button class="flashcard-btn correct">✅ Je sais</button>
                <button class="flashcard-btn wrong">❌ Je ne sais pas</button>
              </div>
            </div>
          </div>
        </div>
        <div class="flashcards-nav">
          <button id="flashcardPrev" class="flashcard-nav-btn" ${currentThemeFlashcardIndex === 0 ? 'disabled' : ''}>◀ Précédent</button>
          <span class="flashcards-counter">${currentThemeFlashcardIndex + 1} / ${currentThemeFlashcards.length}</span>
          <button id="flashcardNext" class="flashcard-nav-btn">Suivant ▶</button>
        </div>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('flashcardModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('flashcardModal');
  const closeBtn = modal.querySelector('.modal-close');
  const flashcardContainer = modal.querySelector('.flashcard-container');
  
  flashcardContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('flashcard-btn')) return;
    const isFlipped = flashcardContainer.getAttribute('data-flipped') === 'true';
    flashcardContainer.setAttribute('data-flipped', !isFlipped);
  });
  
  modal.querySelector('.flashcard-btn.correct')?.addEventListener('click', () => {
    marquerMotAppris(themeTitle, mot.tad, true);
    currentThemeFlashcardIndex++;
    modal.remove();
    afficherFlashcardTheme(themeTitle);
  });
  
  modal.querySelector('.flashcard-btn.wrong')?.addEventListener('click', () => {
    const wrongCard = currentThemeFlashcards.splice(currentThemeFlashcardIndex, 1)[0];
    currentThemeFlashcards.push(wrongCard);
    modal.remove();
    afficherFlashcardTheme(themeTitle);
  });
  
  document.getElementById('flashcardPrev')?.addEventListener('click', () => {
    if (currentThemeFlashcardIndex > 0) {
      currentThemeFlashcardIndex--;
      modal.remove();
      afficherFlashcardTheme(themeTitle);
    }
  });
  
  document.getElementById('flashcardNext')?.addEventListener('click', () => {
    currentThemeFlashcardIndex++;
    modal.remove();
    afficherFlashcardTheme(themeTitle);
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function afficherFlashcardGeneral() {
  if (currentThemeFlashcardIndex >= currentThemeFlashcards.length) {
    terminerFlashcards("Général");
    return;
  }
  
  const mot = currentThemeFlashcards[currentThemeFlashcardIndex];
  const traduction = currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar);
  
  const modalHtml = `
    <div id="flashcardModal" class="modal flashcards-modal">
      <div class="modal-content flashcards-content">
        <span class="modal-close">&times;</span>
        <div class="flashcards-header">
          <span class="flashcards-title">🃏 Flashcards - Tous les thèmes</span>
          <span class="flashcards-progress">${currentThemeFlashcardIndex + 1}/${currentThemeFlashcards.length}</span>
        </div>
        <div class="flashcard-container" data-flipped="false">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <div class="flashcard-word">${escapeHtml(mot.tad)}</div>
              <div class="flashcard-prompt">👆 Cliquez pour voir la réponse</div>
            </div>
            <div class="flashcard-back">
              <div class="flashcard-def">${escapeHtml(traduction)}</div>
              <div class="flashcard-buttons">
                <button class="flashcard-btn correct">✅ Je sais</button>
                <button class="flashcard-btn wrong">❌ Je ne sais pas</button>
              </div>
            </div>
          </div>
        </div>
        <div class="flashcards-nav">
          <button id="flashcardPrev" class="flashcard-nav-btn" ${currentThemeFlashcardIndex === 0 ? 'disabled' : ''}>◀ Précédent</button>
          <span class="flashcards-counter">${currentThemeFlashcardIndex + 1} / ${currentThemeFlashcards.length}</span>
          <button id="flashcardNext" class="flashcard-nav-btn">Suivant ▶</button>
        </div>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('flashcardModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('flashcardModal');
  const closeBtn = modal.querySelector('.modal-close');
  const flashcardContainer = modal.querySelector('.flashcard-container');
  
  flashcardContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('flashcard-btn')) return;
    const isFlipped = flashcardContainer.getAttribute('data-flipped') === 'true';
    flashcardContainer.setAttribute('data-flipped', !isFlipped);
  });
  
  modal.querySelector('.flashcard-btn.correct')?.addEventListener('click', () => {
    currentThemeFlashcardIndex++;
    modal.remove();
    afficherFlashcardGeneral();
  });
  
  modal.querySelector('.flashcard-btn.wrong')?.addEventListener('click', () => {
    const wrongCard = currentThemeFlashcards.splice(currentThemeFlashcardIndex, 1)[0];
    currentThemeFlashcards.push(wrongCard);
    modal.remove();
    afficherFlashcardGeneral();
  });
  
  document.getElementById('flashcardPrev')?.addEventListener('click', () => {
    if (currentThemeFlashcardIndex > 0) {
      currentThemeFlashcardIndex--;
      modal.remove();
      afficherFlashcardGeneral();
    }
  });
  
  document.getElementById('flashcardNext')?.addEventListener('click', () => {
    currentThemeFlashcardIndex++;
    modal.remove();
    afficherFlashcardGeneral();
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function terminerFlashcards(themeTitle) {
  if (window.showToast) window.showToast(`🎉 Félicitations ! Vous avez terminé toutes les flashcards de "${themeTitle}" !`, "success");
  themeFlashcardsMode = false;
}

// ------------------------------
// PRONONCIATION
// ------------------------------
function speakTextPremium(text) {
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

// ------------------------------
// STYLES CSS
// ------------------------------
const THEMES_STYLES = `
  .themes-actions {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }
  
  .global-progress-bar {
    width: 100%;
    max-width: 400px;
    height: 8px;
    background: var(--border);
    border-radius: 4px;
    margin: 1rem auto;
    overflow: hidden;
  }
  
  .global-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  
  .theme-progress-container {
    padding: 0.8rem 1rem;
    background: var(--bg-light);
    border-bottom: 1px solid var(--border);
  }
  
  .theme-progress-bar {
    height: 6px;
    background: var(--border);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 0.3rem;
  }
  
  .theme-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--success), var(--primary));
    border-radius: 3px;
    transition: width 0.3s ease;
  }
  
  .theme-progress-text {
    font-size: 0.7rem;
    color: var(--text-muted);
  }
  
  .theme-actions {
    display: flex;
    gap: 0.3rem;
    padding: 0.5rem;
    border-top: 1px solid var(--border);
  }
  
  .theme-actions .theme-expand-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem;
    background: var(--bg-light);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition);
  }
  
  .theme-actions .theme-expand-btn:hover {
    background: var(--bg-card);
  }
  
  .theme-actions .theme-quiz-btn,
  .theme-actions .theme-flashcards-btn {
    width: 40px;
    background: var(--bg-light);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 1rem;
    transition: all var(--transition);
  }
  
  .theme-actions button:hover {
    background: var(--primary);
    color: white;
  }
  
  .theme-favorite-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    transition: transform var(--transition);
  }
  
  .theme-favorite-btn:hover {
    transform: scale(1.1);
  }
  
  .word-premium-learn {
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
    border: none;
    cursor: pointer;
    font-size: 0.7rem;
    background: var(--primary);
    color: white;
    transition: all var(--transition);
  }
  
  .word-premium-learn:hover {
    transform: scale(1.02);
  }
  
  .quiz-theme-tag {
    font-size: 0.8rem;
    color: var(--accent);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .flashcards-modal .modal-content {
    max-width: 500px;
  }
  
  .flashcards-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }
  
  .flashcards-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
  }
  
  .flashcard-nav-btn {
    padding: 0.4rem 1rem;
    background: var(--bg-light);
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all var(--transition);
  }
  
  .flashcard-nav-btn:hover:not(:disabled) {
    background: var(--primary);
    color: white;
  }
  
  .flashcard-nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .search-clear {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 1rem;
  }
  
  .themes-premium-search {
    position: relative;
    max-width: 400px;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    .themes-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .theme-actions {
      flex-wrap: wrap;
    }
    
    .words-premium-header {
      display: none;
    }
    
    .word-premium-row {
      grid-template-columns: 1fr 1fr auto auto;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
  }
`;

// Injecter les styles
if (!document.getElementById('themes-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'themes-styles';
  styleSheet.textContent = THEMES_STYLES;
  document.head.appendChild(styleSheet);
}

// ------------------------------
// EXPORT
// ------------------------------
window.themesData = themesData;
window.chargerThemes = chargerThemes;
window.afficherThemesPremium = afficherThemesPremium;
window.speakTextPremium = speakTextPremium;
window.getProgressionTheme = getProgressionTheme;
window.basculerFavoriTheme = basculerFavoriTheme;

console.log("📚 Module Thèmes Premium chargé - Version avec quiz, flashcards et progression");
