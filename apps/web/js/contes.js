import { state } from './state.js';
import { i18n } from './i18n-data.js';
import { escapeHtml } from './utils.js';

export async function chargerContes() {
  try {
    const response = await fetch('data/conte.json');
    if (!response.ok) throw new Error();
    state.contesData = await response.json();
    console.log('📖 Contes chargés');
  } catch(e) {
    console.warn("Erreur chargement contes", e);
    state.contesData = null;
  }
}

export function afficherContes() {
  const container = document.getElementById("contesContainer");
  if (!container) return;
  
  if (!state.contesData) {
    container.innerHTML = `<p class="info-message">📖 ${i18n[state.currentLanguage].contes_title || 'Aucun conte disponible.'}</p>`;
    return;
  }
  
  let html = `<div class="contes-premium-grid">`;
  const contes = Array.isArray(state.contesData) ? state.contesData : [state.contesData];
  
  for (const conte of contes) {
    let titre = state.currentLanguage === 'fr' ? conte.titre_fr : (state.currentLanguage === 'en' ? conte.titre_en : conte.titre_ar);
    let resume = state.currentLanguage === 'fr' ? conte.resume_fr : (state.currentLanguage === 'en' ? conte.resume_en : conte.resume_ar);
    
    html += `
      <div class="conte-premium-card">
        <div class="conte-card-icon">📖</div>
        <h3>${escapeHtml(titre || 'Sans titre')}</h3>
        <div class="conte-meta-premium">
          <span>📜 ${escapeHtml(conte.type || 'conte')}</span>
          <span>🗣️ ${escapeHtml(conte.narrateur || 'Tradition orale')}</span>
        </div>
        <p class="conte-resume-premium">${escapeHtml(resume || 'Résumé non disponible')}</p>
        <button class="btn-lire-conte-premium" data-conte-id="${conte.id || 0}">📖 Lire le conte</button>
      </div>
    `;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  
  document.querySelectorAll('.btn-lire-conte-premium').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.conteId);
      const conte = contes.find(c => c.id === id);
      if (conte) afficherConteDetail(conte);
    });
  });
}

export function afficherConteDetail(conte) {
  let titre = state.currentLanguage === 'fr' ? conte.titre_fr : (state.currentLanguage === 'en' ? conte.titre_en : conte.titre_ar);
  let morale = state.currentLanguage === 'fr' ? conte.morale_fr : (state.currentLanguage === 'en' ? conte.morale_en : conte.morale_ar);
  
  let modalHtml = `
    <div id="conteModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>${escapeHtml(titre)}</h2>
        <div class="conte-versets">
    `;
  
  if (conte.versets && conte.versets.length) {
    for (const verset of conte.versets) {
      modalHtml += `
        <div class="verset">
          <div class="verset-num">${verset.numero}</div>
          <div class="verset-tad"><strong>${escapeHtml(verset.tadaksahak || '')}</strong></div>
          <div class="verset-gloss">${escapeHtml(verset.glose_fr || '')}</div>
          <div class="verset-trans">${escapeHtml(state.currentLanguage === 'fr' ? verset.traduction_fr : (state.currentLanguage === 'en' ? verset.traduction_en : (verset.traduction_ar || verset.traduction_fr)))}</div>
        </div>
      `;
    }
  }
  
  modalHtml += `
        </div>
        ${morale ? `<div class="conte-morale"><strong>💡 Morale :</strong> ${escapeHtml(morale)}</div>` : ''}
      </div>
    </div>
  `;
  
  const existingModal = document.getElementById('conteModal');
  if (existingModal) existingModal.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('conteModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

// ------------------------------
// ÉMISSIONS - VERSION PREMIUM
// ------------------------------
