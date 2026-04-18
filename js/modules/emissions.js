// ============================================
// MODULE - ÉMISSIONS RADIO
// ============================================

let emissionsData = null;

async function chargerEmissions() {
  try {
    const response = await fetch('data/emission.json');
    if (!response.ok) throw new Error();
    emissionsData = await response.json();
    console.log('🎙️ Émissions chargées');
  } catch(e) {
    console.warn("Erreur chargement émissions", e);
    emissionsData = null;
  }
}

function afficherEmissionsPremium() {
  const container = document.getElementById("emissionsContainer");
  if (!container) return;
  
  if (!emissionsData) {
    container.innerHTML = `<p class="info-message">🎙️ Aucune émission disponible.</p>`;
    return;
  }
  
  let html = `
    <div class="emissions-premium-intro">
      <div class="premium-icon">🎙️</div>
      <h3>${window.t('emissions_title')}</h3>
      <p>Découvrez les archives radiophoniques sur la langue et la culture Idaksahak</p>
    </div>
    <div class="emissions-premium-grid">
  `;
  
  const emissions = Array.isArray(emissionsData) ? emissionsData : [emissionsData];
  
  for (const emission of emissions) {
    let titre = currentLanguage === 'fr' ? emission.titre_fr : (currentLanguage === 'en' ? emission.titre_en : emission.titre_ar);
    let contexte = currentLanguage === 'fr' ? emission.contexte_fr : (currentLanguage === 'en' ? emission.contexte_en : emission.contexte_ar);
    
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
            <div class="verset-trans">${escapeHtml(currentLanguage === 'fr' ? verset.traduction_fr : (currentLanguage === 'en' ? verset.traduction_en : (verset.traduction_ar || verset.traduction_fr)))}</div>
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

// Exporter
window.emissionsData = emissionsData;
window.chargerEmissions = chargerEmissions;
window.afficherEmissionsPremium = afficherEmissionsPremium;
