// ============================================
// MODULE - FLASHCARDS
// Version premium avec statistiques, progression, thèmes multiples, audio
// CORRIGÉ - Version complète sans troncature
// ============================================

let currentFlashcards = [];
let currentFlashcardIndex = 0;
let flashcardsStats = {
  totalReviewed: 0,
  mastered: [],
  weak: [],
  sessionStart: null,
  sessionCorrect: 0,
  sessionIncorrect: 0
};
let flashcardsSettings = {
  autoFlip: false,
  autoFlipDelay: 3000,
  showExamples: true,
  pronunciationEnabled: true
};

// ------------------------------
// CONFIGURATION
// ------------------------------
const FLASHCARDS_CONFIG = {
  enableStats: true,
  enableAudio: true,
  enableProgressTracking: true,
  enableAutoFlip: false,
  itemsPerSession: 20,
  reviewMode: 'spaced'
};

// ------------------------------
// CONSTANTE PRONONCIATION
// ------------------------------
const PRONONCIATION = {
  enabled: true,
  language: 'fr-FR',
  rate: 0.8,
  pitch: 1.0
};

// ------------------------------
// THÈMES DISPONIBLES
// ------------------------------
const FLASHCARDS_THEMES = {
  all: { name: "Tous les thèmes", icon: "📚", color: "var(--primary)" },
  verbes: { name: "Verbes", icon: "🔤", color: "var(--success)" },
  noms: { name: "Noms", icon: "🏷️", color: "var(--warning)" },
  adjectifs: { name: "Adjectifs", icon: "🎨", color: "var(--accent)" },
  relatives: { name: "Propositions relatives", icon: "📖", color: "var(--secondary)" },
  favoris: { name: "Mes favoris", icon: "⭐", color: "var(--warning)" },
  aReviser: { name: "À réviser", icon: "🔄", color: "var(--error)" }
};

// ------------------------------
// FONCTIONS UTILITAIRES
// ------------------------------
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ------------------------------
// STATISTIQUES
// ------------------------------
function chargerStatsFlashcards() {
  const saved = localStorage.getItem('flashcards_stats');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      flashcardsStats.mastered = parsed.mastered || [];
      flashcardsStats.weak = parsed.weak || [];
      flashcardsStats.totalReviewed = parsed.totalReviewed || 0;
    } catch(e) {}
  }
}

function sauvegarderStatsFlashcards() {
  localStorage.setItem('flashcards_stats', JSON.stringify({
    mastered: flashcardsStats.mastered,
    weak: flashcardsStats.weak,
    totalReviewed: flashcardsStats.totalReviewed
  }));
}

function enregistrerResultatFlashcard(mot, estCorrect) {
  if (estCorrect) {
    if (!flashcardsStats.mastered.includes(mot)) {
      flashcardsStats.mastered.push(mot);
    }
    flashcardsStats.weak = flashcardsStats.weak.filter(w => w !== mot);
    flashcardsStats.sessionCorrect++;
  } else {
    if (!flashcardsStats.weak.includes(mot)) {
      flashcardsStats.weak.push(mot);
    }
    flashcardsStats.mastered = flashcardsStats.mastered.filter(m => m !== mot);
    flashcardsStats.sessionIncorrect++;
  }
  flashcardsStats.totalReviewed++;
  sauvegarderStatsFlashcards();
  mettreAJourStatistiquesAffichage();
}

function mettreAJourStatistiquesAffichage() {
  const statsContainer = document.getElementById('flashcardsStats');
  if (!statsContainer) return;
  
  const total = flashcardsStats.mastered.length + flashcardsStats.weak.length;
  const masteredCount = flashcardsStats.mastered.length;
  const weakCount = flashcardsStats.weak.length;
  const progression = total > 0 ? Math.round((masteredCount / total) * 100) : 0;
  
  statsContainer.innerHTML = `
    <div class="stats-card">
      <span class="stats-icon">✅</span>
      <span class="stats-value">${masteredCount}</span>
      <span class="stats-label">Maîtrisés</span>
    </div>
    <div class="stats-card">
      <span class="stats-icon">🔄</span>
      <span class="stats-value">${weakCount}</span>
      <span class="stats-label">À réviser</span>
    </div>
    <div class="stats-card">
      <span class="stats-icon">📊</span>
      <span class="stats-value">${progression}%</span>
      <span class="stats-label">Progression</span>
    </div>
    <div class="stats-card">
      <span class="stats-icon">🎯</span>
      <span class="stats-value">${flashcardsStats.sessionCorrect}</span>
      <span class="stats-label">Session en cours</span>
    </div>
  `;
}

// ------------------------------
// PRONONCIATION
// ------------------------------
function speakFlashcardWord(word) {
  if (!FLASHCARDS_CONFIG.enableAudio) return;
  if (!PRONONCIATION.enabled) return;
  
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = PRONONCIATION.language;
    utterance.rate = PRONONCIATION.rate;
    utterance.pitch = PRONONCIATION.pitch;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

// ------------------------------
// GÉNÉRATION DES FLASHCARDS
// ------------------------------
function genererFlashcards() {
  const container = document.getElementById("flashcardsContainer");
  if (!container) return;
  
  const themeSelect = document.getElementById('flashcardsThemeSelect');
  const theme = themeSelect?.value || 'all';
  
  let motsFiltres = [];
  
  if (theme === 'verbes') {
    motsFiltres = (window.vocabulaire || []).filter(m => m.cat === 'vt.' || m.cat === 'vi.');
  } else if (theme === 'noms') {
    motsFiltres = (window.vocabulaire || []).filter(m => m.cat === 'n.' || m.cat === 'npl.');
  } else if (theme === 'adjectifs') {
    motsFiltres = (window.vocabulaire || []).filter(m => m.cat === 'adj.');
  } else if (theme === 'relatives' && window.relativesData) {
    motsFiltres = [];
    for (const strat of window.relativesData.strategies) {
      for (const ex of (strat.exemples || [])) {
        motsFiltres.push({
          mot: ex.tadaksahak.split('[')[0].trim() + ' [...]',
          cat: strat.marqueur_sg || strat.marqueur || 'relative',
          fr: ex.traduction_fr,
          en: ex.traduction_en,
          ar: ex.traduction_ar,
          tadaksahak: ex.tadaksahak,
          glose: ex.glose_fr
        });
      }
    }
  } else if (theme === 'favoris') {
    const favorisMots = window.favoris || [];
    motsFiltres = (window.vocabulaire || []).filter(m => favorisMots.includes(m.mot));
  } else if (theme === 'aReviser') {
    const weakWords = flashcardsStats.weak;
    motsFiltres = (window.vocabulaire || []).filter(m => weakWords.includes(m.mot));
  } else {
    motsFiltres = [...(window.vocabulaire || [])];
  }
  
  if (motsFiltres.length === 0) {
    container.innerHTML = `<div class="info-message">
      📚 Aucun mot dans cette catégorie.
      ${theme === 'aReviser' ? '<br>💡 Apprenez des mots pour qu\'ils apparaissent ici.' : ''}
      ${theme === 'favoris' ? '<br>⭐ Ajoutez des mots aux favoris dans le dictionnaire.' : ''}
    </div>`;
    return;
  }
  
  if (FLASHCARDS_CONFIG.reviewMode === 'spaced') {
    const weakCards = motsFiltres.filter(m => flashcardsStats.weak.includes(m.mot));
    const masteredCards = motsFiltres.filter(m => flashcardsStats.mastered.includes(m.mot));
    const newCards = motsFiltres.filter(m => !flashcardsStats.weak.includes(m.mot) && !flashcardsStats.mastered.includes(m.mot));
    motsFiltres = [...weakCards, ...newCards, ...masteredCards];
  } else if (FLASHCARDS_CONFIG.reviewMode === 'random') {
    motsFiltres.sort(() => 0.5 - Math.random());
  }
  
  if (motsFiltres.length > FLASHCARDS_CONFIG.itemsPerSession) {
    motsFiltres = motsFiltres.slice(0, FLASHCARDS_CONFIG.itemsPerSession);
  }
  
  currentFlashcards = motsFiltres;
  currentFlashcardIndex = 0;
  flashcardsStats.sessionStart = Date.now();
  flashcardsStats.sessionCorrect = 0;
  flashcardsStats.sessionIncorrect = 0;
  
  afficherFlashcard();
  mettreAJourProgressionFlashcards();
  mettreAJourStatistiquesAffichage();
}

// ------------------------------
// AFFICHAGE D'UNE FLASHCARD
// ------------------------------
function afficherFlashcard() {
  const container = document.getElementById("flashcardsContainer");
  if (!container) return;
  
  if (!currentFlashcards.length || currentFlashcardIndex >= currentFlashcards.length) {
    terminerSessionFlashcards();
    return;
  }
  
  const mot = currentFlashcards[currentFlashcardIndex];
  let question = mot.mot;
  let reponse = currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar);
  let categorie = currentLanguage === 'fr' ? (mot.cat || 'Mot') : (mot.cat || 'Word');
  let exemple = mot.exemple || (mot.tadaksahak ? mot.tadaksahak : null);
  let glose = mot.glose || (mot.glose_fr ? mot.glose_fr : null);
  
  if (mot.cat === 'relative' && mot.tadaksahak) {
    question = mot.tadaksahak;
    reponse = mot.fr;
    categorie = "📖 Proposition relative";
  }
  
  container.innerHTML = `
    <div class="flashcard-container" data-flipped="false">
      <div class="flashcard">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="flashcard-cat">${escapeHtml(categorie)}</div>
            <div class="flashcard-word">${escapeHtml(question)}</div>
            ${FLASHCARDS_CONFIG.enableAudio ? `<button class="flashcard-audio" data-word="${escapeHtml(question)}">🔊</button>` : ''}
            <div class="flashcard-prompt">👆 Cliquez pour voir la réponse</div>
          </div>
          <div class="flashcard-back">
            <div class="flashcard-def">${escapeHtml(reponse)}</div>
            ${FLASHCARDS_CONFIG.enableAudio ? `<button class="flashcard-audio-back" data-word="${escapeHtml(reponse.split(' ')[0])}">🔊</button>` : ''}
            ${FLASHCARDS_CONFIG.showExamples && exemple ? `
              <div class="flashcard-example">
                <div class="example-label">📝 Exemple :</div>
                <div class="example-text">${escapeHtml(exemple)}</div>
                ${glose ? `<div class="example-gloss">${escapeHtml(glose)}</div>` : ''}
              </div>
            ` : ''}
            <div class="flashcard-buttons">
              <button class="flashcard-btn correct" data-action="correct">✅ Je sais</button>
              <button class="flashcard-btn wrong" data-action="wrong">❌ Je ne sais pas</button>
              <button class="flashcard-btn later" data-action="later">⏰ Plus tard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flashcard-progress-info">
      <span class="progress-count">${currentFlashcardIndex + 1} / ${currentFlashcards.length}</span>
      <span class="progress-percent">${Math.round(((currentFlashcardIndex + 1) / currentFlashcards.length) * 100)}%</span>
    </div>
  `;
  
  const flashcardContainer = container.querySelector('.flashcard-container');
  const flashcard = container.querySelector('.flashcard');
  const correctBtn = container.querySelector('.flashcard-btn.correct');
  const wrongBtn = container.querySelector('.flashcard-btn.wrong');
  const laterBtn = container.querySelector('.flashcard-btn.later');
  const audioBtns = container.querySelectorAll('.flashcard-audio, .flashcard-audio-back');
  
  flashcard?.addEventListener('click', (e) => {
    if (e.target.classList.contains('flashcard-btn')) return;
    if (e.target.classList.contains('flashcard-audio')) return;
    if (e.target.classList.contains('flashcard-audio-back')) return;
    const isFlipped = flashcardContainer.getAttribute('data-flipped') === 'true';
    flashcardContainer.setAttribute('data-flipped', !isFlipped);
  });
  
  audioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const word = btn.dataset.word;
      speakFlashcardWord(word);
    });
  });
  
  correctBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    enregistrerResultatFlashcard(mot.mot, true);
    currentFlashcardIndex++;
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
  
  wrongBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    enregistrerResultatFlashcard(mot.mot, false);
    const wrongCard = currentFlashcards.splice(currentFlashcardIndex, 1)[0];
    currentFlashcards.push(wrongCard);
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
  
  laterBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentFlashcardIndex++;
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
  
  if (FLASHCARDS_CONFIG.enableAutoFlip) {
    setTimeout(() => {
      if (flashcardContainer && flashcardContainer.getAttribute('data-flipped') !== 'true') {
        flashcardContainer.setAttribute('data-flipped', 'true');
      }
    }, FLASHCARDS_CONFIG.autoFlipDelay);
  }
}

// ------------------------------
// FIN DE SESSION
// ------------------------------
function terminerSessionFlashcards() {
  const container = document.getElementById("flashcardsContainer");
  if (!container) return;
  
  const sessionDuration = Math.round((Date.now() - flashcardsStats.sessionStart) / 1000);
  const minutes = Math.floor(sessionDuration / 60);
  const seconds = sessionDuration % 60;
  const totalCards = flashcardsStats.sessionCorrect + flashcardsStats.sessionIncorrect;
  const successRate = totalCards > 0 ? Math.round((flashcardsStats.sessionCorrect / totalCards) * 100) : 0;
  
  let message = "";
  if (successRate === 100) {
    message = "🏆 Parfait ! Vous maîtrisez parfaitement ce thème !";
  } else if (successRate >= 80) {
    message = "🌟 Excellent ! Continuez comme ça !";
  } else if (successRate >= 60) {
    message = "👍 Très bien ! Révisez les mots difficiles et réessayez.";
  } else if (successRate >= 40) {
    message = "📚 Bon début ! Continuez à pratiquer régulièrement.";
  } else {
    message = "💪 Ne lâchez rien ! Chaque erreur est une opportunité d'apprendre.";
  }
  
  container.innerHTML = `
    <div class="flashcards-complete">
      <div class="complete-icon">🎉</div>
      <h3>Félicitations !</h3>
      <p>Vous avez terminé toutes les flashcards de cette session.</p>
      <div class="session-stats">
        <div class="session-stat">
          <span class="stat-value">${flashcardsStats.sessionCorrect}</span>
          <span class="stat-label">Correctes</span>
        </div>
        <div class="session-stat">
          <span class="stat-value">${flashcardsStats.sessionIncorrect}</span>
          <span class="stat-label">Incorrectes</span>
        </div>
        <div class="session-stat">
          <span class="stat-value">${successRate}%</span>
          <span class="stat-label">Taux de réussite</span>
        </div>
        <div class="session-stat">
          <span class="stat-value">${minutes}m${seconds}s</span>
          <span class="stat-label">Temps</span>
        </div>
      </div>
      <div class="session-message">${message}</div>
      <div class="complete-buttons">
        <button id="restartFlashcardsBtn" class="btn-primary">🔄 Recommencer</button>
        <button id="reviewWeakBtn" class="btn-secondary">📖 Réviser les mots faibles</button>
      </div>
    </div>
  `;
  
  document.getElementById('restartFlashcardsBtn')?.addEventListener('click', () => {
    genererFlashcards();
  });
  
  document.getElementById('reviewWeakBtn')?.addEventListener('click', () => {
    const themeSelect = document.getElementById('flashcardsThemeSelect');
    if (themeSelect) {
      themeSelect.value = 'aReviser';
      genererFlashcards();
    }
  });
  
  mettreAJourStatistiquesAffichage();
}

// ------------------------------
// PROGRESSION
// ------------------------------
function mettreAJourProgressionFlashcards() {
  const currentSpan = document.getElementById('flashcardCurrent');
  const totalSpan = document.getElementById('flashcardTotal');
  const progressBar = document.getElementById('flashcardProgressBar');
  
  if (currentSpan) currentSpan.textContent = currentFlashcardIndex + 1;
  if (totalSpan) totalSpan.textContent = currentFlashcards.length;
  if (progressBar && currentFlashcards.length) {
    const percent = ((currentFlashcardIndex + 1) / currentFlashcards.length) * 100;
    progressBar.style.width = `${percent}%`;
  }
}

// ------------------------------
// INITIALISATION
// ------------------------------
function initFlashcards() {
  const themeSelect = document.getElementById('flashcardsThemeSelect');
  const shuffleBtn = document.getElementById('shuffleFlashcardsBtn');
  const resetBtn = document.getElementById('resetFlashcardsBtn');
  const statsToggle = document.getElementById('showStatsToggle');
  
  chargerStatsFlashcards();
  
  if (themeSelect) {
    const existingOptions = Array.from(themeSelect.options).map(o => o.value);
    if (!existingOptions.includes('adjectifs')) {
      const adjOption = document.createElement('option');
      adjOption.value = 'adjectifs';
      adjOption.textContent = '🎨 Adjectifs';
      themeSelect.appendChild(adjOption);
    }
    if (!existingOptions.includes('favoris')) {
      const favOption = document.createElement('option');
      favOption.value = 'favoris';
      favOption.textContent = '⭐ Mes favoris';
      themeSelect.appendChild(favOption);
    }
    if (!existingOptions.includes('aReviser')) {
      const revOption = document.createElement('option');
      revOption.value = 'aReviser';
      revOption.textContent = '🔄 À réviser';
      themeSelect.appendChild(revOption);
    }
  }
  
  themeSelect?.addEventListener('change', () => genererFlashcards());
  shuffleBtn?.addEventListener('click', () => {
    if (currentFlashcards.length) {
      currentFlashcards.sort(() => 0.5 - Math.random());
      currentFlashcardIndex = 0;
      afficherFlashcard();
      mettreAJourProgressionFlashcards();
    }
  });
  resetBtn?.addEventListener('click', () => {
    if (currentFlashcards.length) {
      currentFlashcardIndex = 0;
      afficherFlashcard();
      mettreAJourProgressionFlashcards();
    }
  });
  
  if (statsToggle) {
    statsToggle.addEventListener('change', (e) => {
      const statsPanel = document.getElementById('flashcardsStatsPanel');
      if (statsPanel) statsPanel.style.display = e.target.checked ? 'block' : 'none';
    });
  }
  
  if (window.vocabulaire?.length) genererFlashcards();
}

// ------------------------------
// STYLES CSS
// ------------------------------
const FLASHCARDS_STYLES = `
  .flashcards-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .flashcards-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .flashcards-stats-panel {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .stats-grid {
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .stats-card {
    text-align: center;
    padding: 0.5rem 1rem;
    background: var(--bg-light);
    border-radius: var(--radius-md);
    min-width: 80px;
  }
  
  .stats-icon {
    font-size: 1.2rem;
    display: block;
  }
  
  .stats-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent);
    display: block;
  }
  
  .stats-label {
    font-size: 0.7rem;
    color: var(--text-muted);
  }
  
  .flashcard-container {
    perspective: 1000px;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
  }
  
  .flashcard {
    width: 100%;
    height: 400px;
    cursor: pointer;
  }
  
  .flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    border-radius: var(--radius-2xl);
  }
  
  .flashcard-container[data-flipped="true"] .flashcard-inner {
    transform: rotateY(180deg);
  }
  
  .flashcard-front,
  .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: var(--radius-2xl);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    box-shadow: var(--shadow-xl);
  }
  
  .flashcard-front {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: white;
  }
  
  .flashcard-front .flashcard-cat {
    font-size: 0.7rem;
    opacity: 0.8;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    background: rgba(255,255,255,0.2);
    padding: 0.2rem 0.8rem;
    border-radius: var(--radius-full);
    display: inline-block;
  }
  
  .flashcard-front .flashcard-word {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    word-break: break-word;
  }
  
  .flashcard-front .flashcard-audio {
    background: rgba(255,255,255,0.2);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: all var(--transition);
  }
  
  .flashcard-front .flashcard-audio:hover {
    background: rgba(255,255,255,0.4);
    transform: scale(1.05);
  }
  
  .flashcard-front .flashcard-prompt {
    font-size: 0.7rem;
    opacity: 0.7;
    margin-top: 1rem;
  }
  
  .flashcard-back {
    background: linear-gradient(135deg, var(--success), var(--primary));
    color: white;
    transform: rotateY(180deg);
  }
  
  .flashcard-back .flashcard-def {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  .flashcard-back .flashcard-audio-back {
    background: rgba(255,255,255,0.2);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 0.5rem;
    transition: all var(--transition);
  }
  
  .flashcard-back .flashcard-audio-back:hover {
    background: rgba(255,255,255,0.4);
    transform: scale(1.05);
  }
  
  .flashcard-back .flashcard-example {
    background: rgba(0,0,0,0.2);
    border-radius: var(--radius-md);
    padding: 0.8rem;
    margin: 1rem 0;
    width: 100%;
    font-size: 0.8rem;
  }
  
  .flashcard-back .example-label {
    font-size: 0.7rem;
    opacity: 0.8;
    margin-bottom: 0.3rem;
  }
  
  .flashcard-back .example-text {
    font-family: monospace;
    margin-bottom: 0.3rem;
  }
  
  .flashcard-back .example-gloss {
    font-size: 0.7rem;
    font-style: italic;
    opacity: 0.7;
  }
  
  .flashcard-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .flashcard-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    transition: all var(--transition);
  }
  
  .flashcard-btn.correct {
    background: var(--success);
    color: white;
  }
  
  .flashcard-btn.wrong {
    background: var(--error);
    color: white;
  }
  
  .flashcard-btn.later {
    background: var(--warning);
    color: white;
  }
  
  .flashcard-btn:hover {
    transform: scale(1.05);
  }
  
  .flashcard-progress-info {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  
  .flashcards-complete {
    text-align: center;
    padding: 2rem;
    background: var(--bg-card);
    border-radius: var(--radius-2xl);
    max-width: 500px;
    margin: 0 auto;
  }
  
  .complete-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .session-stats {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1.5rem 0;
    flex-wrap: wrap;
  }
  
  .session-stat {
    text-align: center;
    min-width: 70px;
  }
  
  .session-stat .stat-value {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent);
    display: block;
  }
  
  .session-stat .stat-label {
    font-size: 0.7rem;
    color: var(--text-muted);
  }
  
  .session-message {
    margin: 1rem 0;
    padding: 0.8rem;
    background: var(--bg-light);
    border-radius: var(--radius-lg);
    font-style: italic;
  }
  
  .complete-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .btn-primary, .btn-secondary {
    padding: 0.6rem 1.2rem;
    border-radius: var(--radius-full);
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: all var(--transition);
  }
  
  .btn-primary {
    background: var(--gradient-primary);
    color: white;
  }
  
  .btn-secondary {
    background: var(--bg-light);
    border: 1px solid var(--border);
    color: var(--text);
  }
  
  .btn-primary:hover, .btn-secondary:hover {
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .flashcard {
      height: 350px;
    }
    
    .flashcard-front .flashcard-word {
      font-size: 1.2rem;
    }
    
    .flashcard-back .flashcard-def {
      font-size: 0.9rem;
    }
    
    .flashcard-buttons {
      flex-direction: column;
      width: 100%;
    }
    
    .flashcard-btn {
      width: 100%;
    }
    
    .stats-grid {
      flex-direction: column;
      align-items: center;
    }
    
    .stats-card {
      width: 100%;
      max-width: 200px;
    }
  }
`;

// ------------------------------
// INJECTION DES STYLES
// ------------------------------
if (!document.getElementById('flashcards-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'flashcards-styles';
  styleSheet.textContent = FLASHCARDS_STYLES;
  document.head.appendChild(styleSheet);
}

// ------------------------------
// EXPORT
// ------------------------------
window.currentFlashcards = currentFlashcards;
window.genererFlashcards = genererFlashcards;
window.initFlashcards = initFlashcards;
window.speakFlashcardWord = speakFlashcardWord;
window.flashcardsStats = flashcardsStats;
window.PRONONCIATION = PRONONCIATION;

console.log("🃏 Module Flashcards Premium chargé - Version avec statistiques et progression");
