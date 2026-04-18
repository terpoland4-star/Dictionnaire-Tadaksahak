// ============================================
// MODULE - GRAMMAIRE PREMIUM
// ============================================

let grammaire = null;

async function chargerGrammaire() {
  try {
    const response = await fetch('data/grammaire.json');
    if (!response.ok) throw new Error();
    grammaire = await response.json();
    console.log('📚 Grammaire chargée');
  } catch(e) {
    console.warn("Erreur chargement grammaire", e);
    grammaire = null;
  }
}

function afficherGrammairePremium() {
  const container = document.getElementById("grammaireContainer");
  if (!container) return;
  
  if (!grammaire) {
    container.innerHTML = `<p class="info-message">📚 Données grammaticales non disponibles.</p>`;
    return;
  }
  
  let sections = [];
  if (grammaire.sections && Array.isArray(grammaire.sections)) {
    sections = grammaire.sections;
  } else {
    container.innerHTML = `<p class="info-message">📚 Structure de grammaire non reconnue.</p>`;
    return;
  }
  
  let html = `
    <div class="grammaire-premium-intro">
      <div class="premium-icon">📚</div>
      <h3>${window.t('grammar_title')}</h3>
      <p>${grammaire.description_fr || window.t('grammar_desc')}</p>
    </div>
    <div class="grammaire-premium-grid">
  `;
  
  for (const section of sections) {
    let sectionTitle = currentLanguage === 'fr' ? section.titre_fr : (currentLanguage === 'en' ? section.titre_en : section.titre_ar);
    let sectionDesc = currentLanguage === 'fr' ? section.description_fr : (currentLanguage === 'en' ? section.description_en : section.description_ar);
    
    html += `
      <div class="grammaire-premium-card">
        <div class="card-header">
          <span class="card-icon">📖</span>
          <h4>${escapeHtml(sectionTitle || 'Grammaire')}</h4>
        </div>
        <div class="card-content">
          ${sectionDesc ? `<p class="section-desc">${escapeHtml(sectionDesc)}</p>` : ''}
    `;
    
    // Gestion des subsections
    if (section.subsections && Array.isArray(section.subsections)) {
      for (const subsection of section.subsections) {
        let subTitle = currentLanguage === 'fr' ? subsection.titre_fr : (currentLanguage === 'en' ? subsection.titre_en : subsection.titre_ar);
        let subDesc = currentLanguage === 'fr' ? subsection.description_fr : (currentLanguage === 'en' ? subsection.description_en : subsection.description_ar);
        
        html += `<div class="grammar-subsection">
          <strong>${escapeHtml(subTitle || '')}</strong>
          ${subDesc ? `<p class="sub-desc">${escapeHtml(subDesc)}</p>` : ''}
        `;
        
        if (subsection.verbes && Array.isArray(subsection.verbes)) {
          html += `<div class="verb-list">`;
          for (const verbe of subsection.verbes) {
            let sens = currentLanguage === 'fr' ? verbe.sens_fr : (currentLanguage === 'en' ? verbe.sens_en : verbe.sens_ar);
            let causatif = verbe.causatif || '—';
            let passif = verbe.passif || verbe.passif_sens_fr || '—';
            
            html += `
              <div class="verb-item">
                <span class="verb-root">${escapeHtml(verbe.imperatif || verbe.racine_tad || verbe.racine || '—')}</span>
                <span class="verb-meaning">${escapeHtml(sens || '—')}</span>
                <div class="verb-forms">
                  ${causatif !== '—' ? `<span class="causative">Caus: ${escapeHtml(causatif)}</span>` : ''}
                  ${passif !== '—' ? `<span class="passive">Pass: ${escapeHtml(passif)}</span>` : ''}
                </div>
              </div>
            `;
          }
          html += `</div>`;
        }
        
        if (subsection.verbes && subsection.verbes[0] && subsection.verbes[0].reciproque) {
          html += `<div class="verb-list">`;
          for (const verbe of subsection.verbes) {
            let sens = currentLanguage === 'fr' ? verbe.fr : (currentLanguage === 'en' ? verbe.en : verbe.ar);
            html += `
              <div class="verb-item">
                <span class="verb-root">${escapeHtml(verbe.racine || '—')}</span>
                <span class="verb-meaning">${escapeHtml(sens || '—')}</span>
                <div class="verb-forms">
                  <span class="causative">Réc: ${escapeHtml(verbe.reciproque || '—')}</span>
                </div>
              </div>
            `;
          }
          html += `</div>`;
        }
        
        html += `</div>`;
      }
    }
    
    // Gestion des éléments simples
    if (section.elements && Array.isArray(section.elements)) {
      html += `<div class="grammar-elements">`;
      for (const element of section.elements) {
        let label = element.mot || element.tad || element.personne || element.num || element.forme || '';
        let value = currentLanguage === 'fr' ? (element.fr || element.fonction || element.sens_fr) : 
                   (currentLanguage === 'en' ? (element.en || element.fonction || element.sens_en) : 
                   (element.ar || element.fonction || element.sens_ar));
        
        if (section.id === 'pronouns' && element.code) {
          html += `
            <div class="grammar-element pronoun-row">
              <strong>${escapeHtml(element.personne || '')}</strong>
              <code>${escapeHtml(element.sujet_clitique || '')}</code>
              <span>${escapeHtml(element.independant || '')}</span>
              <span>${escapeHtml(element.objet_direct || '')}</span>
              <span>${escapeHtml(element.possessif || '')}</span>
            </div>
          `;
        } else if (section.id === 'numerals' && element.num) {
          html += `
            <div class="grammar-element numeral-row">
              <strong>${escapeHtml(element.num || '')}</strong>
              <code>${escapeHtml(element.tad || '')}</code>
              ${element.notes ? `<small>${escapeHtml(element.notes)}</small>` : ''}
            </div>
          `;
        } else {
          html += `
            <div class="grammar-element">
              <strong>${escapeHtml(label)}</strong>
              <span class="element-desc">${escapeHtml(value || '')}</span>
              ${element.exemple ? `<div class="element-exemple"><em>${escapeHtml(element.exemple)}</em> → ${escapeHtml(element.exemple_fr || '')}</div>` : ''}
            </div>
          `;
        }
      }
      html += `</div>`;
    }
    
    // Gestion des verbes directs
    if (section.verbes && Array.isArray(section.verbes) && !section.subsections) {
      html += `<div class="verb-list">`;
      for (const verbe of section.verbes) {
        let sens = currentLanguage === 'fr' ? verbe.sens_fr : (currentLanguage === 'en' ? verbe.sens_en : verbe.sens_ar);
        let causatif = verbe.causatif || '—';
        let reciproque = verbe.reciproque || '—';
        
        html += `
          <div class="verb-item">
            <span class="verb-root">${escapeHtml(verbe.racine || verbe.imperatif || '—')}</span>
            <span class="verb-meaning">${escapeHtml(sens || '—')}</span>
            <div class="verb-forms">
              ${causatif !== '—' ? `<span class="causative">Caus: ${escapeHtml(causatif)}</span>` : ''}
              ${reciproque !== '—' ? `<span class="passive">Réc: ${escapeHtml(reciproque)}</span>` : ''}
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }
    
    html += `</div></div>`;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  console.log("✅ Grammaire premium affichée avec succès");
}

// Exporter
window.grammaire = grammaire;
window.chargerGrammaire = chargerGrammaire;
window.afficherGrammairePremium = afficherGrammairePremium;
