import { state, bookElements } from './state.js';
import { i18n } from './i18n-data.js';
import { escapeHtml } from './utils.js';

// Chargement du fichier grammaire.json (tableau fusionné des 30 blocs)
export async function loadGrammarBook() {
    if (state.grammarBlocks.length > 0) return; // déjà chargé
    try {
        const response = await fetch('data/grammaire.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        state.grammarBlocks = await response.json();
        if (!Array.isArray(state.grammarBlocks)) {
            throw new Error('Format invalide : attendu un tableau');
        }
        console.log(`📚 Grammaire chargée : ${state.grammarBlocks.length} blocs`);
        initGrammarBook();
    } catch (error) {
        console.error('Erreur chargement grammaire.json:', error);
        const left = document.getElementById('leftContent');
        if (left) left.innerHTML = '<p style="color:red;">❌ Erreur de chargement des données grammaticales.</p>';
    }
}

// Rendu d'une page (gauche ou droite)
export function renderBookPage(side, block) {
    const elements = side === 'left' ? {
        title: bookElements.leftTitle,
        content: bookElements.leftContent,
        range: bookElements.leftRange,
        keywords: bookElements.leftKeywords,
        pageNum: bookElements.leftPageNum
    } : {
        title: bookElements.rightTitle,
        content: bookElements.rightContent,
        range: bookElements.rightRange,
        keywords: bookElements.rightKeywords,
        pageNum: bookElements.rightPageNum
    };

    if (!block) {
        elements.title.textContent = '';
        elements.content.innerHTML = '<p style="opacity:0.5;">— Fin du livre —</p>';
        elements.range.textContent = '';
        elements.keywords.innerHTML = '';
        elements.pageNum.textContent = '';
        return;
    }

    const title = block.titre_section[state.currentGrammarLang] || block.titre_section.fr || '';
    const content = block.contenu[state.currentGrammarLang] || block.contenu.fr || '';
    const plage = block.plage_pages || '';
    const keywords = block.mots_cles || [];

    elements.title.textContent = title;
    elements.content.innerHTML = `<p>${content.replace(/\n/g, '<br>')}</p>`;
    elements.range.textContent = `📄 p. ${plage}`;
    elements.keywords.innerHTML = keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('');
    elements.pageNum.textContent = `Bloc ${block.bloc_id}`;
}

// Mise à jour de l'affichage des deux pages
export function updateGrammarSpread() {
    const leftBlock = state.grammarBlocks[state.currentBlockIndex] || null;
    const rightBlock = (state.currentBlockIndex + 1 < state.grammarBlocks.length) ? state.grammarBlocks[state.currentBlockIndex + 1] : null;

    renderBookPage('left', leftBlock);
    renderBookPage('right', rightBlock);

    const total = state.grammarBlocks.length;
    const start = state.currentBlockIndex + 1;
    const end = Math.min(state.currentBlockIndex + 2, total);
    if (bookElements.pageIndicator) {
        bookElements.pageIndicator.textContent = `Blocs ${start}–${end} / ${total}`;
    }

    if (bookElements.prevBtn) bookElements.prevBtn.disabled = (state.currentBlockIndex === 0);
    if (bookElements.nextBtn) bookElements.nextBtn.disabled = (state.currentBlockIndex + 2 >= total);
}

export function nextGrammarSpread() {
    if (state.currentBlockIndex + 2 < state.grammarBlocks.length) {
        state.currentBlockIndex += 2;
        updateGrammarSpread();
        if (bookElements.bookSpread) {
            bookElements.bookSpread.style.transform = 'translateX(-5px)';
            setTimeout(() => bookElements.bookSpread.style.transform = '', 150);
        }
    }
}

export function prevGrammarSpread() {
    if (state.currentBlockIndex > 0) {
        state.currentBlockIndex = Math.max(0, state.currentBlockIndex - 2);
        updateGrammarSpread();
        if (bookElements.bookSpread) {
            bookElements.bookSpread.style.transform = 'translateX(5px)';
            setTimeout(() => bookElements.bookSpread.style.transform = '', 150);
        }
    }
}

// Changement de langue dans le livre
export function setGrammarLanguage(lang) {
    state.currentGrammarLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    document.querySelectorAll('#grammaire .lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    if (state.grammarBlocks.length > 0) {
        updateGrammarSpread();
    }
}

// Synchronisation avec le sélecteur de langue global (header)
export function syncGrammarWithGlobalLang(globalLang) {
    if (globalLang && ['fr','en','ar'].includes(globalLang)) {
        setGrammarLanguage(globalLang);
    }
}

// Initialisation du livre
export function initGrammarBook() {
    if (!state.grammarBlocks.length) return;
    if (state.bookInitialized) return;
    
    state.currentBlockIndex = 0;
    updateGrammarSpread();
    
    // Écouteurs des boutons de navigation
    if (bookElements.prevBtn) bookElements.prevBtn.addEventListener('click', prevGrammarSpread);
    if (bookElements.nextBtn) bookElements.nextBtn.addEventListener('click', nextGrammarSpread);
    
    // Écouteurs des boutons de langue internes au livre
    document.querySelectorAll('#grammaire .lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setGrammarLanguage(btn.dataset.lang));
    });
    
    // Swipe tactile
    let touchStartX = 0;
    if (bookElements.bookSpread) {
        bookElements.bookSpread.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        bookElements.bookSpread.addEventListener('touchend', (e) => {
            if (!touchStartX) return;
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) > 50) {
                if (diff < 0) nextGrammarSpread();
                else prevGrammarSpread();
            }
            touchStartX = 0;
        });
    }
    
    // Navigation clavier (seulement quand la section grammaire est visible)
    window.addEventListener('keydown', (e) => {
        const gramSection = document.getElementById('grammaire');
        if (gramSection && gramSection.hidden) return;
        if (e.key === 'ArrowLeft') {
            prevGrammarSpread();
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            nextGrammarSpread();
            e.preventDefault();
        }
    });
    
    state.bookInitialized = true;
    console.log('📖 Livre grammaire initialisé');
}

// Fonction à appeler quand l'onglet Grammaire est affiché
export function showGrammarSection() {
    const section = document.getElementById('grammaire');
    if (section && section.hidden === false) {
        loadGrammarBook();
        // Synchroniser la langue du livre avec la langue globale
        const globalLang = localStorage.getItem('preferredLanguage') || 'fr';
        if (state.currentGrammarLang !== globalLang) {
            setGrammarLanguage(globalLang);
        }
    }
}

// ============================================================
// FIN DU LIVRE GRAMMAIRE
// ============================================================

// ------------------------------
// PROPOSITIONS RELATIVES
// ------------------------------
export async function chargerRelatives() {
  try {
    const response = await fetch('data/relatives.json');
    if (!response.ok) throw new Error();
    state.relativesData = await response.json();
    console.log('📚 Données sur les relatives chargées');
  } catch(e) {
    console.warn("Erreur chargement relatives.json", e);
    state.relativesData = null;
  }
}

export async function afficherRelatives() {
  const container = document.getElementById("relativesContainer");
  if (!container) return;
  
  if (!state.relativesData) {
    await chargerRelatives();
  }
  
  if (!state.relativesData) {
    container.innerHTML = `<p class="info-message">📚 Données sur les relatives non disponibles.</p>`;
    return;
  }
  
  let html = `
    <div class="relatives-premium-intro">
      <div class="premium-icon">📖</div>
      <h3>${i18n[state.currentLanguage].grammar_relatives_title}</h3>
      <p>${i18n[state.currentLanguage].grammar_relatives_desc}</p>
      <p>Le tadaksahak utilise trois stratégies distinctes pour former des propositions relatives.</p>
    </div>
    <div class="strategies-premium-grid">
  `;
  
  for (const strat of state.relativesData.strategies) {
    let usage = state.currentLanguage === 'fr' ? strat.usage_fr : (state.currentLanguage === 'en' ? strat.usage_en : strat.usage_ar);
    let marqueurAffiche = strat.marqueur === "∅" ? "∅ (aucun)" : (strat.marqueur_sg || strat.marqueur);
    
    html += `
      <div class="strategy-premium-card">
        <div class="strategy-header">
          <span class="strategy-marker">${escapeHtml(marqueurAffiche)}</span>
          <span class="strategy-type">${strat.marqueur === "∅" ? "Gap Strategy" : (strat.marqueur === "sa" ? "Non-restrictive" : "Relative Pronoun")}</span>
        </div>
        <p class="strategy-usage-premium">${escapeHtml(usage)}</p>
        <div class="strategy-exemples-premium">
    `;
    
    const exemples = strat.exemples || [];
    for (const ex of exemples.slice(0, 2)) {
      let trad = state.currentLanguage === 'fr' ? ex.traduction_fr : (state.currentLanguage === 'en' ? ex.traduction_en : ex.traduction_ar);
      html += `
        <div class="exemple-premium-card">
          <div class="exemple-tad-premium">${escapeHtml(ex.tadaksahak)}</div>
          <div class="exemple-gloss-premium">${escapeHtml(ex.glose_fr)}</div>
          <div class="exemple-trans-premium">${escapeHtml(trad)}</div>
        </div>
      `;
    }
    
    html += `</div></div>`;
  }
  
  html += `</div>`;
  container.innerHTML = html;
}

// ------------------------------
// CONTES
// ------------------------------
