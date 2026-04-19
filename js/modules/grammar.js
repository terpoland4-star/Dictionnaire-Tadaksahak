// ============================================
// MODULE - GRAMMAIRE PREMIUM
// Version corrigée - Syntaxe valide
// ============================================

let grammaire = null;

// Catégories pour l'affichage
const GRAMMAR_CATEGORIES = {
  fr: {
    causative: "Verbes causatifs",
    passive: "Verbes passifs",
    relative: "Propositions relatives",
    negation: "Négation",
    pronoun: "Pronoms personnels",
    adjective: "Adjectifs",
    numeral: "Numéraux",
    demonstrative: "Démonstratifs",
    interrogative: "Interrogatifs",
    reciprocal: "Verbes réciproques"
  },
  en: {
    causative: "Causative verbs",
    passive: "Passive verbs",
    relative: "Relative clauses",
    negation: "Negation",
    pronoun: "Personal pronouns",
    adjective: "Adjectives",
    numeral: "Numerals",
    demonstrative: "Demonstratives",
    interrogative: "Interrogatives",
    reciprocal: "Reciprocal verbs"
  },
  ar: {
    causative: "الأفعال السببية",
    passive: "الأفعال المجهولة",
    relative: "جمل الوصل",
    negation: "النفي",
    pronoun: "الضمائر الشخصية",
    adjective: "الصفات",
    numeral: "الأعداد",
    demonstrative: "أسماء الإشارة",
    interrogative: "أدوات الاستفهام",
    reciprocal: "الأفعال المتبادلة"
  }
};

async function chargerGrammaire() {
  try {
    const response = await fetch('data/grammaire.json');
    if (!response.ok) throw new Error();
    grammaire = await response.json();
    console.log('📚 Grammaire chargée');
  } catch(e) {
    console.warn("Erreur chargement grammaire", e);
    grammaire = getFallbackGrammar();
  }
}

function getFallbackGrammar() {
  return {
    description_fr: "Grammaire de référence du tadaksahak",
    sections: [
      {
        id: "causative_passive",
        titre_fr: "Verbes causatifs et passifs",
        description_fr: "Formation des causatifs avec le préfixe s- et des passifs avec t-",
        subsections: [
          {
            titre_fr: "Verbes à un argument",
            verbes: [
              { racine_tad: "hēw", sens_fr: "pleurer", causatif: "s-ahlá" },
              { racine_tad: "zumbú", sens_fr: "descendre", causatif: "zā-zab-át" }
            ]
          }
        ]
      },
      {
        id: "negation",
        titre_fr: "Négation",
        description_fr: "Les différentes formes de négation",
        elements: [
          { mot: "nǝ-", fr: "ne...pas (perfectif)" },
          { mot: "sǝ-", fr: "ne...pas (imperfectif)" },
          { mot: "kǝlá ... nǝ-", fr: "ne...jamais" }
        ]
      }
    ]
  };
}

function afficherGrammairePremium() {
  const container = document.getElementById("grammaireContainer");
  if (!container) return;
  
  if (!grammaire) {
    container.innerHTML = `<div class="info-message">
      <p>📚 Données grammaticales non disponibles.</p>
      <button onclick="window.chargerGrammaire()" class="btn-small">🔄 Recharger</button>
    </div>`;
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
      <h3>${window.t ? window.t('grammar_title') : 'Grammaire Tadaksahak'}</h3>
      <p>${grammaire.description_fr || (window.t ? window.t('grammar_desc') : 'Grammaire de référence')}</p>
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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Exporter
window.grammaire = grammaire;
window.chargerGrammaire = chargerGrammaire;
window.afficherGrammairePremium = afficherGrammairePremium;
window.getFallbackGrammar = getFallbackGrammar;

console.log("📚 Module Grammaire chargé - Version corrigée");
