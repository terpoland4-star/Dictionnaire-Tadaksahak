import { state } from './state.js';
import { dom } from './state.js';
import { i18n } from './i18n-data.js';
import { afficherMot } from './dictionary.js';
import { escapeHtml, showToast } from './utils.js';

export async function chargerThemes() {
  try {
    const response = await fetch('data/themes.json');
    if (!response.ok) throw new Error();
    state.themesData = await response.json();
    console.log('📚 Thèmes chargés');
  } catch(e) {
    console.warn("Erreur chargement thèmes", e);
    state.themesData = null;
  }
}

export function afficherThemesPremium() {
  const container = document.getElementById("themesContainer");
  if (!container) return;
  
  if (!state.themesData || !state.themesData.themes || state.themesData.themes.length === 0) {
    container.innerHTML = `<p class="info-message">📚 Aucun thème disponible.</p>`;
    return;
  }
  
  let html = `
    <div class="themes-premium-header">
      <div class="premium-icon">📚</div>
      <h2>${i18n[state.currentLanguage].themes_title}</h2>
      <p>Apprenez le state.vocabulaire tadaksahak par catégories thématiques</p>
      <div class="themes-premium-search">
        <input type="text" id="themeSearchPremium" placeholder="🔍 Rechercher un mot..." class="theme-search-premium">
      </div>
      <div class="themes-premium-stats">
        <span class="stat-badge">📖 ${state.themesData.themes.reduce((acc, t) => acc + (t.mots?.length || 0), 0)} mots</span>
        <span class="stat-badge">📚 ${state.themesData.themes.length} thèmes</span>
      </div>
    </div>
    <div class="themes-premium-grid">
  `;
  
  for (let i = 0; i < state.themesData.themes.length; i++) {
    const theme = state.themesData.themes[i];
    let titre = state.currentLanguage === 'fr' ? theme.titre_fr : (state.currentLanguage === 'en' ? theme.titre_en : theme.titre_ar);
    let description = state.currentLanguage === 'fr' ? theme.description_fr : (state.currentLanguage === 'en' ? theme.description_en : theme.description_ar);
    const motCount = theme.mots?.length || 0;
    
    html += `
      <div class="theme-premium-card" data-theme-idx="${i}">
        <div class="theme-premium-header">
          <div class="theme-premium-icon">📖</div>
          <h3>${escapeHtml(titre)}</h3>
          <span class="theme-premium-badge">${motCount} mots</span>
        </div>
        <p class="theme-premium-desc">${escapeHtml(description || '')}</p>
        <div class="theme-premium-preview">
          ${theme.mots?.slice(0, 4).map(mot => `<span class="preview-word-premium">${escapeHtml(mot.tad)}</span>`).join('')}
          ${motCount > 4 ? `<span class="preview-more-premium">+${motCount - 4} autres</span>` : ''}
        </div>
        <button class="theme-premium-expand" data-theme-idx="${i}">
          <span>Explorer le thème</span>
          <span class="expand-icon">▼</span>
        </button>
        <div class="theme-premium-words" id="themeWordsPremium-${i}" style="display: none;">
          <div class="words-premium-header">
            <span>Mot en tadaksahak</span>
            <span>Traduction</span>
            <span></span>
          </div>
          <div class="words-premium-list">
            ${theme.mots?.map(mot => `
              <div class="word-premium-row" data-mot="${escapeHtml(mot.tad)}">
                <span class="word-premium-tad">${escapeHtml(mot.tad)}</span>
                <span class="word-premium-trans">${escapeHtml(state.currentLanguage === 'fr' ? mot.fr : (state.currentLanguage === 'en' ? mot.en : mot.ar))}</span>
                <button class="word-premium-play" onclick="speakTextPremium('${escapeHtml(mot.tad)}')">🔊</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  
  document.querySelectorAll('.theme-premium-expand').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = btn.dataset.themeIdx;
      const wordsContainer = document.getElementById(`themeWordsPremium-${idx}`);
      
      if (wordsContainer.style.display === 'none') {
        wordsContainer.style.display = 'block';
        btn.querySelector('.expand-icon').textContent = '▲';
        btn.querySelector('span:first-child').textContent = 'Réduire';
      } else {
        wordsContainer.style.display = 'none';
        btn.querySelector('.expand-icon').textContent = '▼';
        btn.querySelector('span:first-child').textContent = 'Explorer le thème';
      }
    });
  });
  
  const searchInput = document.getElementById('themeSearchPremium');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.theme-premium-card');
      
      cards.forEach(card => {
        const words = card.querySelectorAll('.word-premium-row');
        let hasMatch = false;
        
        words.forEach(word => {
          const text = word.textContent.toLowerCase();
          if (query === '' || text.includes(query)) {
            word.style.display = 'flex';
            hasMatch = true;
          } else {
            word.style.display = 'none';
          }
        });
        
        if (query !== '' && hasMatch) {
          const wordsContainer = card.querySelector('.theme-premium-words');
          if (wordsContainer && wordsContainer.style.display !== 'block') {
            wordsContainer.style.display = 'block';
            const btn = card.querySelector('.theme-premium-expand');
            if (btn) {
              btn.querySelector('.expand-icon').textContent = '▲';
              btn.querySelector('span:first-child').textContent = 'Réduire';
            }
          }
        }
      });
    });
  }
  
  document.querySelectorAll('.word-premium-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.classList.contains('word-premium-play')) return;
      const mot = row.dataset.mot;
      const motTrouve = state.vocabulaire.find(v => v.mot === mot);
      if (motTrouve && dom.sectionSelector) {
        dom.sectionSelector.value = 'dictionnaire';
        dom.sectionSelector.dispatchEvent(new Event('change'));
        setTimeout(() => afficherMot(motTrouve), 100);
      }
    });
  });
}

export function speakTextPremium(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    showToast("🔊 Synthèse vocale non supportée", "warning");
  }
}
// Exposée sur window : appelée via onclick="" dans du HTML généré dynamiquement,
// donc doit rester accessible globalement même en module ES.
window.speakTextPremium = speakTextPremium;

// ------------------------------
// FLASHCARDS
// ------------------------------
