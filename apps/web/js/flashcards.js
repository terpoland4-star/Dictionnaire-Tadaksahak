import { state } from './state.js';
import { escapeHtml } from './utils.js';

export function genererFlashcards() {
  const container = document.getElementById("flashcardsContainer");
  if (!container) return;
  
  const theme = document.getElementById('flashcardsThemeSelect')?.value || 'all';
  let motsFiltres = [...state.vocabulaire];
  
  if (theme === 'verbes') {
    motsFiltres = motsFiltres.filter(m => m.cat === 'vt.' || m.cat === 'vi.');
  } else if (theme === 'noms') {
    motsFiltres = motsFiltres.filter(m => m.cat === 'n.' || m.cat === 'npl.');
  } else if (theme === 'relatives' && state.relativesData) {
    motsFiltres = [];
    for (const strat of state.relativesData.strategies) {
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
  
  state.currentFlashcards = [...motsFiltres].sort(() => 0.5 - Math.random());
  state.currentFlashcardIndex = 0;
  afficherFlashcard();
  mettreAJourProgressionFlashcards();
}

export function afficherFlashcard() {
  const container = document.getElementById("flashcardsContainer");
  if (!container) return;
  
  if (!state.currentFlashcards.length || state.currentFlashcardIndex >= state.currentFlashcards.length) {
    container.innerHTML = `<div class="flashcards-complete">
      <h3>🎉 Félicitations !</h3>
      <p>Vous avez terminé toutes les flashcards !</p>
      <button id="restartFlashcardsBtn" class="btn">🔄 Recommencer</button>
    </div>`;
    document.getElementById('restartFlashcardsBtn')?.addEventListener('click', () => genererFlashcards());
    return;
  }
  
  const mot = state.currentFlashcards[state.currentFlashcardIndex];
  let question = mot.mot;
  let reponse = state.currentLanguage === 'fr' ? mot.fr : (state.currentLanguage === 'en' ? mot.en : mot.ar);
  let categorie = state.currentLanguage === 'fr' ? (mot.cat || 'Mot') : (mot.cat || 'Word');
  
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
    state.currentFlashcardIndex++;
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
  
  wrongBtn?.addEventListener('click', () => {
    const wrongCard = state.currentFlashcards.splice(state.currentFlashcardIndex, 1)[0];
    state.currentFlashcards.push(wrongCard);
    afficherFlashcard();
    mettreAJourProgressionFlashcards();
  });
}

export function mettreAJourProgressionFlashcards() {
  const currentSpan = document.getElementById('flashcardCurrent');
  const totalSpan = document.getElementById('flashcardTotal');
  if (currentSpan) currentSpan.textContent = state.currentFlashcardIndex + 1;
  if (totalSpan) totalSpan.textContent = state.currentFlashcards.length;
}

export function initFlashcards() {
  const themeSelect = document.getElementById('flashcardsThemeSelect');
  const shuffleBtn = document.getElementById('shuffleFlashcardsBtn');
  const resetBtn = document.getElementById('resetFlashcardsBtn');
  
  themeSelect?.addEventListener('change', () => genererFlashcards());
  shuffleBtn?.addEventListener('click', () => {
    if (state.currentFlashcards.length) {
      state.currentFlashcards.sort(() => 0.5 - Math.random());
      state.currentFlashcardIndex = 0;
      afficherFlashcard();
      mettreAJourProgressionFlashcards();
    }
  });
  resetBtn?.addEventListener('click', () => {
    if (state.currentFlashcards.length) {
      state.currentFlashcardIndex = 0;
      afficherFlashcard();
      mettreAJourProgressionFlashcards();
    }
  });
  if (state.vocabulaire.length) genererFlashcards();
}

// ------------------------------
// QUIZ
// ------------------------------
