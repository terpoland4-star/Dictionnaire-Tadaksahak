// ============================================
// MODULE - FLASHCARDS
// ============================================

let currentFlashcards = [];
let currentFlashcardIndex = 0;

function genererFlashcards() {
  const container = document.getElementById("flashcardsContainer");
  if (!container) return;
  
  const theme = document.getElementById('flashcardsThemeSelect')?.value || 'all';
  let motsFiltres = [...(window.vocabulaire || [])];
  
  if (theme === 'verbes') {
    motsFiltres = motsFiltres.filter(m => m.cat === 'vt.' || m.cat === 'vi.');
  } else if (theme === 'noms') {
    motsFiltres = motsFiltres.filter(m => m.cat === 'n.' || m.cat === 'npl.');
  } else if (theme === 'relatives' && window.relativesData) {
    motsFiltres = [];
    for (const strat of window.relativesData.strategies) {
      for (const ex of (strat.exemples || [])) {
        motsFiltres.push({
          mot: ex.tadaksahak.split('[')[0].trim() + ' [...]',
          cat: strat.marqueur_sg || strat.marqueur || 'relative',
          fr: ex.traduction_fr,
          en: ex.traduction_en,
          ar: ex.traduction_ar
        });
      }
    }
  }
  
  if (motsFiltres.length === 0) {
    container.innerHTML = `<div class="info-message">📚 Aucun mot dans cette catégorie.</div>`;
    return;
  }
  
  currentFlashcards = [...motsFiltres].sort(() => 0.5 - Math.random());
  currentFlashcardIndex = 0;
  afficherFlashcard();
  mettreAJourProgressionFlashcards();
}

function afficherFlashcard() {
  const container = document.getElementById("flashcardsContainer");
  if (!container) return;
  
  if (!currentFlashcards.length || currentFlashcardIndex >= currentFlashcards.length) {
    container.innerHTML = `<div class="flashcards-complete">
      <h3>🎉 Félicitations !</h3>
      <p>Vous avez terminé toutes les flashcards !</p>
      <button id="restartFlashcardsBtn" class="btn">🔄 Recommencer</button>
    </div>`;
    document.getElementById('restartFlashcardsBtn')?.addEventListener('click', () => {
      genererFlashcards();
    });
    return;
  }
  
  const mot = currentFlashcards[currentFlashcardIndex];
  let question = mot.mot;
  let reponse = currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar);
  let categorie = currentLanguage === 'fr' ? (mot.cat || 'Mot') : (mot.cat || 'Word');
  
  container.innerHTML = `
    <div class="flashcard" data-flipped="false">
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <div class="flashcard-cat">${escapeHtml(categorie)}</div>
          <div class="flashcard-word">${escapeHtml(question)}</div>
          <div class="flashcard-prompt">👆 Cliquez pour voir la réponse</div>
        </div>
        <div class="flashcard-back">
          <div class="flashcard-def">${escapeHtml(reponse)}</div>
          <div class="flashcard-buttons">
            <button class="flashcard-btn correct" data-action="correct">✅ Je sais</button>
            <button class="flashcard-btn wrong" data-action="wrong">❌ Je ne sais pas</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const flashcard = container.querySelector('.flashcard');
  const correctBtn = container.querySelector('.flashcard-btn.correct');
  const wrongBtn = container.querySelector('.flashcard-btn.wrong');
  
  flashcard?.addEventListener('click', (e) => {
    if (e.target.classList.contains('flashcard-btn')) return;
    const isFlipped = flashcard.getAttribute('data-flipped') === 'true';
    flashcard.setAttribute('data-flipped', !isFlipped);
  });
  
  correctBtn?.addEventListener('click', () => {
    currentFlashcardIndex++;
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
  
  wrongBtn?.addEventListener('click', () => {
    const wrongCard = currentFlashcards.splice(currentFlashcardIndex, 1)[0];
    currentFlashcards.push(wrongCard);
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
}

function mettreAJourProgressionFlashcards() {
  const currentSpan = document.getElementById('flashcardCurrent');
  const totalSpan = document.getElementById('flashcardTotal');
  if (currentSpan) currentSpan.textContent = currentFlashcardIndex + 1;
  if (totalSpan) totalSpan.textContent = currentFlashcards.length;
}

function initFlashcards() {
  const themeSelect = document.getElementById('flashcardsThemeSelect');
  const shuffleBtn = document.getElementById('shuffleFlashcardsBtn');
  const resetBtn = document.getElementById('resetFlashcardsBtn');
  
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
  
  if (window.vocabulaire?.length) genererFlashcards();
}

// Exporter
window.currentFlashcards = currentFlashcards;
window.genererFlashcards = genererFlashcards;
window.initFlashcards = initFlashcards;
