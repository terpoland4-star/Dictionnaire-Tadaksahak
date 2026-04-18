// ============================================
// MODULE - THÈMES (VOCABULAIRE THÉMATIQUE)
// ============================================

let themesData = null;

async function chargerThemes() {
  try {
    const response = await fetch('data/themes.json');
    if (!response.ok) throw new Error();
    themesData = await response.json();
    console.log('📚 Thèmes chargés');
  } catch(e) {
    console.warn("Erreur chargement thèmes", e);
    themesData = null;
  }
}

function afficherThemesPremium() {
  const container = document.getElementById("themesContainer");
  if (!container) return;
  
  if (!themesData || !themesData.themes || themesData.themes.length === 0) {
    container.innerHTML = `<p class="info-message">📚 Aucun thème disponible.</p>`;
    return;
  }
  
  let html = `
    <div class="themes-premium-header">
      <div class="premium-icon">📚</div>
      <h2>${window.t('themes_title')}</h2>
      <p>Apprenez le vocabulaire tadaksahak par catégories thématiques</p>
      <div class="themes-premium-search">
        <input type="text" id="themeSearchPremium" placeholder="🔍 Rechercher un mot..." class="theme-search-premium">
      </div>
      <div class="themes-premium-stats">
        <span class="stat-badge">📖 ${themesData.themes.reduce((acc, t) => acc + (t.mots?.length || 0), 0)} mots</span>
        <span class="stat-badge">📚 ${themesData.themes.length} thèmes</span>
      </div>
    </div>
    <div class="themes-premium-grid">
  `;
  
  for (let i = 0; i < themesData.themes.length; i++) {
    const theme = themesData.themes[i];
    let titre = currentLanguage === 'fr' ? theme.titre_fr : (currentLanguage === 'en' ? theme.titre_en : theme.titre_ar);
    let description = currentLanguage === 'fr' ? theme.description_fr : (currentLanguage === 'en' ? theme.description_en : theme.description_ar);
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
                <span class="word-premium-trans">${escapeHtml(currentLanguage === 'fr' ? mot.fr : (currentLanguage === 'en' ? mot.en : mot.ar))}</span>
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
  
  // Écouteurs d'événements
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
  
  // Recherche
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
  
  // Clic sur un mot
  document.querySelectorAll('.word-premium-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.classList.contains('word-premium-play')) return;
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

function speakTextPremium(text) {
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

// Exporter
window.themesData = themesData;
window.chargerThemes = chargerThemes;
window.afficherThemesPremium = afficherThemesPremium;
window.speakTextPremium = speakTextPremium;
