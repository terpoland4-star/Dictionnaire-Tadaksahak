// ============================================
// MODULE - PROPOSITIONS RELATIVES
// D'après Christiansen & Levinsohn (2003)
// ============================================

let relativesData = null;

async function chargerRelatives() {
  try {
    const response = await fetch('data/relatives.json');
    if (!response.ok) throw new Error();
    relativesData = await response.json();
    console.log('📚 Données sur les relatives chargées');
  } catch(e) {
    console.warn("Erreur chargement relatives.json", e);
    relativesData = null;
  }
}

async function afficherRelatives() {
  const container = document.getElementById("relativesContainer");
  if (!container) return;
  
  if (!relativesData) {
    await chargerRelatives();
  }
  
  if (!relativesData) {
    container.innerHTML = `<p class="info-message">📚 Données sur les relatives non disponibles.</p>`;
    return;
  }
  
  let html = `
    <div class="relatives-premium-intro">
      <div class="premium-icon">📖</div>
      <h3>${window.t('grammar_relatives_title')}</h3>
      <p>${window.t('grammar_relatives_desc')}</p>
      <p>Le tadaksahak utilise trois stratégies distinctes pour former des propositions relatives.</p>
    </div>
    <div class="strategies-premium-grid">
  `;
  
  for (const strat of relativesData.strategies) {
    let usage = currentLanguage === 'fr' ? strat.usage_fr : (currentLanguage === 'en' ? strat.usage_en : strat.usage_ar);
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
      let trad = currentLanguage === 'fr' ? ex.traduction_fr : (currentLanguage === 'en' ? ex.traduction_en : ex.traduction_ar);
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

function genererExempleRelative() {
  if (!relativesData || !relativesData.strategies) return null;
  const strategies = relativesData.strategies;
  const randomIndex = Math.floor(Math.random() * strategies.length);
  const strat = strategies[randomIndex];
  const exemples = strat.exemples || [];
  if (exemples.length === 0) return null;
  const ex = exemples[Math.floor(Math.random() * exemples.length)];
  let traduction = "";
  if (currentLanguage === "fr") traduction = ex.traduction_fr;
  else if (currentLanguage === "en") traduction = ex.traduction_en;
  else traduction = ex.traduction_ar;
  return {
    strategie: strat,
    exemple: ex,
    traduction: traduction
  };
}

// Exporter
window.relativesData = relativesData;
window.chargerRelatives = chargerRelatives;
window.afficherRelatives = afficherRelatives;
window.genererExempleRelative = genererExempleRelative;
