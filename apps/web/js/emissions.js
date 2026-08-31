import { state } from './state.js';
import { i18n } from './i18n-data.js';
import { escapeHtml } from './utils.js';

export async function chargerEmissions() {
  try {
    const response = await fetch('data/emission.json');
    if (!response.ok) throw new Error();
    state.emissionsData = await response.json();
    console.log('🎙️ Émissions chargées');
  } catch(e) {
    console.warn("Erreur chargement émissions", e);
    state.emissionsData = null;
  }
}

export function afficherEmissionsPremium() {
  const container = document.getElementById("emissionsContainer");
  if (!container) return;
  
  if (!state.emissionsData) {
    container.innerHTML = `<p class="info-message">🎙️ Aucune émission disponible.</p>`;
    return;
  }
  
  let html = `
    <div class="emissions-premium-intro">
      <div class="premium-icon">🎙️</div>
      <h3>${i18n[state.currentLanguage].emissions_title}</h3>
      <p>Découvrez les archives radiophoniques sur la langue et la culture Idaksahak</p>
    </div>
    <div class="emissions-premium-grid">
  `;
  
  const emissions = Array.isArray(state.emissionsData) ? state.emissionsData : [state.emissionsData];
  
  for (const emission of emissions) {
    let titre = state.currentLanguage === 'fr' ? emission.titre_fr : (state.currentLanguage === 'en' ? emission.titre_en : emission.titre_ar);
    let contexte = state.currentLanguage === 'fr' ? emission.contexte_fr : (state.currentLanguage === 'en' ? emission.contexte_en : emission.contexte_ar);
    
    html += `
      <div class="emission-premium-card">
        <div class="emission-card-header">
          <div class="emission-icon">🎙️</div>
          <div class="emission-info">
            <h4>${escapeHtml(titre)}</h4>
            <div class="emission-meta-premium">
              <span>📅 ${emission.date || '?'}</span>
              <span>🗣️ ${escapeHtml(emission.orateur || 'Inconnu')}</span>
              <span>📍 ${escapeHtml(emission.lieu || '?')}</span>
            </div>
          </div>
        </div>
        <p class="emission-contexte-premium">${escapeHtml(contexte || '')}</p>
        <button class="btn-emission-premium" data-emission-id="${emission.id || 0}">
          🎧 Lire la transcription
        </button>
        <div class="emission-transcription" id="emissionTrans-${emission.id || 0}" style="display: none;">
    `;
    
    if (emission.versets && emission.versets.length) {
      for (const verset of emission.versets) {
        html += `
          <div class="verset">
            <div class="verset-num">${verset.numero}</div>
            <div class="verset-tad"><strong>${escapeHtml(verset.tadaksahak || '')}</strong></div>
            <div class="verset-gloss">${escapeHtml(verset.glose_fr || '')}</div>
            <div class="verset-trans">${escapeHtml(state.currentLanguage === 'fr' ? verset.traduction_fr : (state.currentLanguage === 'en' ? verset.traduction_en : (verset.traduction_ar || verset.traduction_fr)))}</div>
          </div>
        `;
      }
    }
    
    html += `
        </div>
      </div>
    `;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  
  document.querySelectorAll('.btn-emission-premium').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.emissionId;
      const transcriptDiv = document.getElementById(`emissionTrans-${id}`);
      if (transcriptDiv.style.display === 'none') {
        transcriptDiv.style.display = 'block';
        btn.textContent = '📖 Masquer la transcription';
      } else {
        transcriptDiv.style.display = 'none';
        btn.textContent = '🎧 Lire la transcription';
      }
    });
  });
}

// ------------------------------
// THÈMES - VERSION PREMIUM
// ------------------------------
