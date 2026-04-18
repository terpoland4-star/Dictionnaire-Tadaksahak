// ============================================
// MODULE - GRAMMAIRE PREMIUM
// Version avec exercices interactifs, quiz, tableaux dynamiques
// ============================================

let grammaire = null;
let grammaireExercices = [];
let grammaireCurrentQuiz = null;
let grammaireQuizScore = 0;
let grammaireQuizIndex = 0;
let grammaireFavoris = [];

// ------------------------------
// CONFIGURATION
// ------------------------------
const GRAMMAR_CONFIG = {
  showExercises: true,
  showQuiz: true,
  showFavorites: true,
  showSearch: true,
  itemsPerPage: 10
};

// ------------------------------
// EXERCICES INTERACTIFS DE GRAMMAIRE
// ------------------------------
const GRAMMAR_EXERCISES = {
  causative: [
    {
      question: "Comment forme-t-on le causatif du verbe 'dá' (faire) ?",
      options: ["s-ágá", "t-āgá", "n-ágá", "m-ágá"],
      answer: 0,
      explanation: "Le causatif se forme avec le préfixe 's-'. 'dá' (faire) → 's-ágá' (faire faire)"
    },
    {
      question: "Que signifie 's-ākfá' ?",
      options: ["Être donné", "Faire donner", "Donner", "Recevoir"],
      answer: 1,
      explanation: "'s-ākfá' est le causatif de 'nát' (donner), donc 'faire donner'"
    },
    {
      question: "Quel est le causatif de 'wís' (tuer) ?",
      options: ["tūw-anyā", "sā-ss-ūw-anyā", "n-anyā", "m-anyā"],
      answer: 1,
      explanation: "Le causatif de 'wís' est 'sā-ss-ūw-anyā' (faire tuer)"
    }
  ],
  passive: [
    {
      question: "Comment forme-t-on le passif du verbe 'dá' (faire) ?",
      options: ["s-ágá", "t-āgá", "n-ágá", "m-ágá"],
      answer: 1,
      explanation: "Le passif se forme avec le préfixe 't-'. 'dá' (faire) → 't-āgá' (être fait)"
    },
    {
      question: "Que signifie 'tūw-anyā' ?",
      options: ["Tuer", "Être tué", "Faire tuer", "Se tuer"],
      answer: 1,
      explanation: "'tūw-anyā' est le passif de 'wís' (tuer), donc 'être tué'"
    }
  ],
  relative: [
    {
      question: "Quel pronom relatif utilise-t-on pour un nom DÉFINI au singulier ?",
      options: ["sa", "ayo", "ayondo", "∅"],
      answer: 1,
      explanation: "'ayo' est le pronom relatif pour les noms définis au singulier"
    },
    {
      question: "Quelle stratégie utilise-t-on pour les noms INDÉFINIS ?",
      options: ["ayo", "ayondo", "sa", "Gap strategy (∅)"],
      answer: 3,
      explanation: "La Gap strategy (aucun marqueur) est utilisée pour les noms indéfinis"
    },
    {
      question: "Que signifie 'sa' dans une proposition relative ?",
      options: ["Restrictif", "Défini", "Non-restrictif", "Indéfini"],
      answer: 2,
      explanation: "'sa' introduit des propositions relatives non-restrictives (info supplémentaire)"
    }
  ],
  negation: [
    {
      question: "Quel préfixe utilise-t-on pour la négation au perfectif ?",
      options: ["sǝ-", "nǝ-", "tǝ-", "mǝ-"],
      answer: 1,
      explanation: "La négation du perfectif (action terminée) utilise 'nǝ-'"
    },
    {
      question: "Comment dit-on 'ne...jamais' en tadaksahak ?",
      options: ["nǝ- ... fów", "kǝlá ... nǝ-", "h(e) a-ʃʃí", "wǝrtilla"],
      answer: 1,
      explanation: "'kǝlá ... nǝ-' signifie 'ne...jamais'"
    }
  ],
  pronouns: [
    {
      question: "Quel est le pronom indépendant de la 1ère personne du singulier ?",
      options: ["aɣay", "nín", "áŋga", "áari"],
      answer: 0,
      explanation: "'aɣay' est le pronom indépendant pour 'je/moi'"
    },
    {
      question: "Que signifie 'ni-n' ?",
      options: ["Mon", "Ton", "Son", "Notre"],
      answer: 1,
      explanation: "'ni-n' est le possessif de la 2ème personne du singulier (ton/ta/tes)"
    }
  ]
};

// ------------------------------
// TABLEAUX DE CONJUGAISON DYNAMIQUES
// ------------------------------
const CONJUGATION_TABLES = {
  báy: {
    meaning: "pouvoir (faire)",
    tenses: {
      present: { 1sg: "aɣ-báy", 2sg: "ni-báy", 3sg: "a-báy", 1pl: "ar-báy", 2pl: "and-báy", 3pl: "i-báy" },
      past: { 1sg: "aɣ-nǝ-báy", 2sg: "ni-nǝ-báy", 3sg: "a-nǝ-báy", 1pl: "ar-nǝ-báy", 2pl: "and-nǝ-báy", 3pl: "i-nǝ-báy" },
      future: { 1sg: "aɣ-sǝ-báy", 2sg: "ni-sǝ-báy", 3sg: "a-sǝ-báy", 1pl: "ar-sǝ-báy", 2pl: "and-sǝ-báy", 3pl: "i-sǝ-báy" }
    }
  },
  dá: {
    meaning: "faire",
    tenses: {
      present: { 1sg: "aɣ-dá", 2sg: "ni-dá", 3sg: "a-dá", 1pl: "ar-dá", 2pl: "and-dá", 3pl: "i-dá" },
      past: { 1sg: "aɣ-nǝ-dá", 2sg: "ni-nǝ-dá", 3sg: "a-nǝ-dá", 1pl: "ar-nǝ-dá", 2pl: "and-nǝ-dá", 3pl: "i-nǝ-dá" },
      future: { 1sg: "aɣ-sǝ-dá", 2sg: "ni-sǝ-dá", 3sg: "a-sǝ-dá", 1pl: "ar-sǝ-dá", 2pl: "and-sǝ-dá", 3pl: "i-sǝ-dá" }
    }
  },
  nát: {
    meaning: "donner",
    tenses: {
      present: { 1sg: "aɣ-nát", 2sg: "ni-nát", 3sg: "a-nát", 1pl: "ar-nát", 2pl: "and-nát", 3pl: "i-nát" },
      past: { 1sg: "aɣ-nǝ-nát", 2sg: "ni-nǝ-nát", 3sg: "a-nǝ-nát", 1pl: "ar-nǝ-nát", 2pl: "and-nǝ-nát", 3pl: "i-nǝ-nát" },
      future: { 1sg: "aɣ-sǝ-nát", 2sg: "ni-sǝ-nát", 3sg: "a-sǝ-nát", 1pl: "ar-sǝ-nát", 2pl: "and-sǝ-nát", 3pl: "i-sǝ-nát" }
    }
  },
  káy: {
    meaning: "aller",
    tenses: {
      present: { 1sg: "aɣ-káy", 2sg: "ni-káy", 3sg: "a-káy", 1pl: "ar-káy", 2pl: "and-káy", 3pl: "i-káy" },
      past: { 1sg: "aɣ-nǝ-káy", 2sg: "ni-nǝ-káy", 3sg: "a-nǝ-káy", 1pl: "ar-nǝ-káy", 2pl: "and-nǝ-káy", 3pl: "i-nǝ-káy" },
      future: { 1sg: "aɣ-sǝ-káy", 2sg: "ni-sǝ-káy", 3sg: "a-sǝ-káy", 1pl: "ar-sǝ-káy", 2pl: "and-sǝ-káy", 3pl: "i-sǝ-káy" }
    }
  }
};

// ------------------------------
// FONCTIONS DE CHARGEMENT
// ------------------------------
async function chargerGrammaire() {
  try {
    const response = await fetch('data/grammaire.json');
    if (!response.ok) throw new Error();
    grammaire = await response.json();
    console.log('📚 Grammaire chargée');
    chargerGrammaireFavoris();
    genererExercices();
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

// ------------------------------
// AFFICHAGE PRINCIPAL (VERSION ENRICHIE)
// ------------------------------
function afficherGrammairePremium() {
  const container = document.getElementById("grammaireContainer");
  if (!container) return;
  
  if (!grammaire) {
    container.innerHTML = `<div class="info-message">
      <p>📚 Données grammaticales non disponibles.</p>
      <button onclick="chargerGrammaire()" class="btn-small">🔄 Recharger</button>
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
      <h3>${window.t('grammar_title') || 'Grammaire Tadaksahak'}</h3>
      <p>${grammaire.description_fr || window.t('grammar_desc') || 'Grammaire de référence'}</p>
    </div>
    
    <div class="grammar-tools">
      <div class="grammar-search">
        <input type="text" id="grammarSearch" placeholder="🔍 Rechercher dans la grammaire..." class="grammar-search-input">
      </div>
      <div class="grammar-actions">
        <button id="grammarQuizBtn" class="btn-small">❓ Quiz grammaire</button>
        <button id="grammarExercisesBtn" class="btn-small">✍️ Exercices</button>
        <button id="grammarFavoritesBtn" class="btn-small">⭐ Favoris</button>
      </div>
    </div>
    
    <div class="grammaire-premium-stats">
      <span class="stat">📚 ${sections.length} sections</span>
      <span class="stat">📖 ${compterElementsGrammaire(sections)} éléments</span>
      <span class="stat">⭐ ${grammaireFavoris.length} favoris</span>
    </div>
    
    <div class="grammaire-premium-grid" id="grammaireGrid">
  `;
  
  for (const section of sections) {
    let sectionTitle = currentLanguage === 'fr' ? section.titre_fr : (currentLanguage === 'en' ? section.titre_en : section.titre_ar);
    let sectionDesc = currentLanguage === 'fr' ? section.description_fr : (currentLanguage === 'en' ? section.description_en : section.description_ar);
    const isFavorite = grammaireFavoris.includes(section.id);
    
    html += `
      <div class="grammaire-premium-card" data-section-id="${section.id}">
        <div class="card-header">
          <span class="card-icon">📖</span>
          <h4>${escapeHtml(sectionTitle || 'Grammaire')}</h4>
          <button class="favorite-star" data-section-id="${section.id}">${isFavorite ? '⭐' : '☆'}</button>
        </div>
        <div class="card-content">
          ${sectionDesc ? `<p class="section-desc">${escapeHtml(sectionDesc)}</p>` : ''}
    `;
    
    // AFFICHAGE DES SUBSECTIONS (version améliorée)
    if (section.subsections && Array.isArray(section.subsections)) {
      for (const subsection of section.subsections) {
        let subTitle = currentLanguage === 'fr' ? subsection.titre_fr : (currentLanguage === 'en' ? subsection.titre_en : subsection.titre_ar);
        let subDesc = currentLanguage === 'fr' ? subsection.description_fr : (currentLanguage === 'en' ? subsection.description_en : subsection.description_ar);
        
        html += `<div class="grammar-subsection">
          <div class="subsection-header">
            <strong>${escapeHtml(subTitle || '')}</strong>
            ${subDesc ? `<span class="subsection-info">ℹ️</span>` : ''}
          </div>
          ${subDesc ? `<div class="subsection-desc hidden">${escapeHtml(subDesc)}</div>` : ''}
        `;
        
        // TABLEAUX DE VERBES AMÉLIORÉS
        if (subsection.verbes && Array.isArray(subsection.verbes)) {
          html += `<div class="verb-table-container">
            <table class="verb-table">
              <thead>
                <tr>
                  <th>Racine</th>
                  <th>Sens</th>
                  <th>Causatif</th>
                  <th>Passif</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>`;
          
          for (const verbe of subsection.verbes) {
            let sens = currentLanguage === 'fr' ? verbe.sens_fr : (currentLanguage === 'en' ? verbe.sens_en : verbe.sens_ar);
            let racine = verbe.imperatif || verbe.racine_tad || verbe.racine || '—';
            let causatif = verbe.causatif || '—';
            let passif = verbe.passif || verbe.passif_sens_fr || '—';
            
            html += `
              <tr class="verb-row" data-verb="${escapeHtml(racine)}">
                <td class="verb-root"><strong>${escapeHtml(racine)}</strong></td>
                <td class="verb-meaning">${escapeHtml(sens || '—')}</td>
                <td class="verb-causative">${causatif !== '—' ? `<code>${escapeHtml(causatif)}</code>` : '—'}</td>
                <td class="verb-passive">${passif !== '—' ? `<code>${escapeHtml(passif)}</code>` : '—'}</td>
                <td class="verb-actions">
                  <button class="verb-conjugate" data-verb="${escapeHtml(racine)}">📚</button>
                  <button class="verb-favorite" data-verb="${escapeHtml(racine)}">⭐</button>
                </td>
              </tr>
            `;
          }
          html += `</tbody></table></div>`;
        }
        
        // VERBES RÉCIPROQUES
        if (subsection.verbes && subsection.verbes[0] && subsection.verbes[0].reciproque) {
          html += `<div class="verb-list reciprocal">`;
          for (const verbe of subsection.verbes) {
            let sens = currentLanguage === 'fr' ? verbe.fr : (currentLanguage === 'en' ? verbe.en : verbe.ar);
            html += `
              <div class="verb-item reciprocal-item">
                <span class="verb-root">${escapeHtml(verbe.racine || '—')}</span>
                <span class="verb-meaning">→ ${escapeHtml(sens || '—')}</span>
                <span class="verb-reciprocal">🔄 ${escapeHtml(verbe.reciproque || '—')}</span>
              </div>
            `;
          }
          html += `</div>`;
        }
        
        html += `</div>`;
      }
    }
    
    // ÉLÉMENTS SIMPLES (TABLEAUX FORMATÉS)
    if (section.elements && Array.isArray(section.elements)) {
      html += `<div class="grammar-elements">`;
      for (const element of section.elements) {
        let label = element.mot || element.tad || element.personne || element.num || element.forme || '';
        let value = currentLanguage === 'fr' ? (element.fr || element.fonction || element.sens_fr) : 
                   (currentLanguage === 'en' ? (element.en || element.fonction || element.sens_en) : 
                   (element.ar || element.fonction || element.sens_ar));
        
        // PRONOMS (affichage en tableau)
        if (section.id === 'pronouns' && element.code) {
          html += `
            <div class="pronoun-card" data-person="${element.code}">
              <div class="pronoun-person">${escapeHtml(element.personne || '')}</div>
              <div class="pronoun-details">
                <span title="Sujet clitique"><code>${escapeHtml(element.sujet_clitique || '')}</code></span>
                <span title="Indépendant"><code>${escapeHtml(element.independant || '')}</code></span>
                <span title="Objet"><code>${escapeHtml(element.objet_direct || '')}</code></span>
                <span title="Possessif"><code>${escapeHtml(element.possessif || '')}</code></span>
              </div>
            </div>
          `;
        }
        // NUMÉRAUX (affichage en liste)
        else if (section.id === 'numerals' && element.num) {
          html += `
            <div class="numeral-item">
              <span class="numeral-number">${escapeHtml(element.num || '')}</span>
              <span class="numeral-tad">${escapeHtml(element.tad || '')}</span>
              ${element.notes ? `<span class="numeral-note">📝 ${escapeHtml(element.notes)}</span>` : ''}
            </div>
          `;
        }
        // ÉLÉMENTS STANDARDS
        else {
          html += `
            <div class="grammar-element-card" data-term="${escapeHtml(label)}">
              <div class="element-term">${escapeHtml(label)}</div>
              <div class="element-definition">${escapeHtml(value || '')}</div>
              ${element.exemple ? `<div class="element-example">📖 "${escapeHtml(element.exemple)}" → ${escapeHtml(element.exemple_fr || '')}</div>` : ''}
              <button class="element-favorite" data-term="${escapeHtml(label)}">⭐</button>
            </div>
          `;
        }
      }
      html += `</div>`;
    }
    
    // VERBES DIRECTS (sans subsection)
    if (section.verbes && Array.isArray(section.verbes) && !section.subsections) {
      html += `<div class="verb-table-container">
        <table class="verb-table">
          <thead>
            <tr><th>Racine</th><th>Sens</th><th>Causatif</th><th>Réciproque</th><th></th></tr>
          </thead>
          <tbody>`;
      for (const verbe of section.verbes) {
        let sens = currentLanguage === 'fr' ? verbe.sens_fr : (currentLanguage === 'en' ? verbe.sens_en : verbe.sens_ar);
        let causatif = verbe.causatif || '—';
        let reciproque = verbe.reciproque || '—';
        let racine = verbe.racine || verbe.imperatif || '—';
        
        html += `
          <tr>
            <td><strong>${escapeHtml(racine)}</strong></td>
            <td>${escapeHtml(sens || '—')}</td>
            <td>${causatif !== '—' ? `<code>${escapeHtml(causatif)}</code>` : '—'}</td>
            <td>${reciproque !== '—' ? `<code>${escapeHtml(reciproque)}</code>` : '—'}</td>
            <td><button class="verb-conjugate" data-verb="${escapeHtml(racine)}">📚</button></td>
          </tr>
        `;
      }
      html += `</tbody></table></div>`;
    }
    
    html += `</div></div>`;
  }
  
  html += `</div>`;
  
  // SECTION DES EXERCICES
  if (GRAMMAR_CONFIG.showExercises) {
    html += `
      <div class="grammar-exercises-section" id="grammarExercisesSection">
        <div class="section-header">
          <h3>✍️ Exercices de grammaire</h3>
          <button id="refreshExercisesBtn" class="btn-small">🔄 Nouvel exercice</button>
        </div>
        <div id="grammarExercisesContainer" class="exercises-container"></div>
      </div>
    `;
  }
  
  // SECTION DES RESSOURCES
  html += `
    <div class="grammar-resources-section">
      <h3>📚 Ressources grammaticales</h3>
      <div class="resources-grid">
        <a href="#" class="resource-card" onclick="afficherConjugaisonComplete()">
          <span class="resource-icon">📊</span>
          <span class="resource-title">Tableaux de conjugaison</span>
        </a>
        <a href="#" class="resource-card" onclick="afficherTableauPronoms()">
          <span class="resource-icon">👥</span>
          <span class="resource-title">Pronoms personnels</span>
        </a>
        <a href="#" class="resource-card" onclick="afficherTableauNumeraux()">
          <span class="resource-icon">🔢</span>
          <span class="resource-title">Numéraux</span>
        </a>
        <a href="#" class="resource-card" onclick="afficherReglesGrammaire()">
          <span class="resource-icon">📖</span>
          <span class="resource-title">Règles essentielles</span>
        </a>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
  
  // INITIALISATION DES INTERACTIONS
  initialiserInteractionsGrammaire();
  genererExerciceAleatoire();
  
  console.log("✅ Grammaire premium affichée avec succès");
}

// ------------------------------
// FONCTIONS UTILITAIRES
// ------------------------------
function compterElementsGrammaire(sections) {
  let count = 0;
  for (const section of sections) {
    if (section.elements) count += section.elements.length;
    if (section.subsections) {
      for (const sub of section.subsections) {
        if (sub.verbes) count += sub.verbes.length;
      }
    }
    if (section.verbes) count += section.verbes.length;
  }
  return count;
}

function genererExercices() {
  grammaireExercices = [];
  for (const [category, exercises] of Object.entries(GRAMMAR_EXERCISES)) {
    for (const ex of exercises) {
      grammaireExercices.push({ ...ex, category });
    }
  }
}

function genererExerciceAleatoire() {
  if (!grammaireExercices.length) return;
  const randomIndex = Math.floor(Math.random() * grammaireExercices.length);
  grammaireCurrentQuiz = grammaireExercices[randomIndex];
  afficherExercice(grammaireCurrentQuiz);
}

function afficherExercice(exercise) {
  const container = document.getElementById("grammarExercisesContainer");
  if (!container) return;
  
  let html = `
    <div class="exercise-card">
      <div class="exercise-category">📌 ${exercise.category.toUpperCase()}</div>
      <div class="exercise-question">${escapeHtml(exercise.question)}</div>
      <div class="exercise-options">
  `;
  
  exercise.options.forEach((opt, idx) => {
    html += `
      <button class="exercise-option" data-opt="${idx}">
        ${String.fromCharCode(65 + idx)}. ${escapeHtml(opt)}
      </button>
    `;
  });
  
  html += `
      </div>
      <div class="exercise-feedback" id="exerciseFeedback" style="display: none;"></div>
      <button class="exercise-check" id="checkExerciseBtn">✅ Vérifier</button>
    </div>
  `;
  
  container.innerHTML = html;
  
  document.querySelectorAll('.exercise-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.exercise-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
  
  document.getElementById('checkExerciseBtn')?.addEventListener('click', () => {
    const selected = document.querySelector('.exercise-option.selected');
    if (!selected) {
      document.getElementById('exerciseFeedback').innerHTML = '<span class="error">❌ Veuillez sélectionner une réponse.</span>';
      document.getElementById('exerciseFeedback').style.display = 'block';
      return;
    }
    
    const selectedOpt = parseInt(selected.dataset.opt);
    const isCorrect = (selectedOpt === exercise.answer);
    
    if (isCorrect) {
      document.getElementById('exerciseFeedback').innerHTML = `<span class="success">✅ Correct ! ${exercise.explanation || ''}</span>`;
      grammaireQuizScore++;
    } else {
      const correctLetter = String.fromCharCode(65 + exercise.answer);
      document.getElementById('exerciseFeedback').innerHTML = `<span class="error">❌ Incorrect. La bonne réponse était ${correctLetter}. ${exercise.explanation || ''}</span>`;
    }
    document.getElementById('exerciseFeedback').style.display = 'block';
  });
}

// ------------------------------
// INTERACTIONS
// ------------------------------
function initialiserInteractionsGrammaire() {
  // Recherche dans la grammaire
  const searchInput = document.getElementById('grammarSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.grammaire-premium-card');
      const elements = document.querySelectorAll('.grammar-element-card, .verb-row, .pronoun-card, .numeral-item');
      
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (query === '' || text.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      
      elements.forEach(el => {
        const text = el.textContent.toLowerCase();
        if (query === '' || text.includes(query)) {
          el.style.display = 'flex';
        } else {
          el.style.display = 'none';
        }
      });
    });
  }
  
  // Boutons favoris des sections
  document.querySelectorAll('.favorite-star').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sectionId = btn.dataset.sectionId;
      if (grammaireFavoris.includes(sectionId)) {
        grammaireFavoris = grammaireFavoris.filter(id => id !== sectionId);
        btn.textContent = '☆';
        if (window.showToast) window.showToast("⭐ Retiré des favoris", "info");
      } else {
        grammaireFavoris.push(sectionId);
        btn.textContent = '⭐';
        if (window.showToast) window.showToast("⭐ Ajouté aux favoris", "success");
      }
      sauvegarderGrammaireFavoris();
    });
  });
  
  // Conjugaison des verbes
  document.querySelectorAll('.verb-conjugate').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const verb = btn.dataset.verb;
      afficherConjugaisonVerbale(verb);
    });
  });
  
  // Sous-sections expandables
  document.querySelectorAll('.subsection-info').forEach(info => {
    info.addEventListener('click', (e) => {
      e.stopPropagation();
      const desc = info.parentElement.nextElementSibling;
      if (desc) desc.classList.toggle('hidden');
    });
  });
  
  // Quiz button
  document.getElementById('grammarQuizBtn')?.addEventListener('click', () => {
    demarrerQuizGrammaire();
  });
  
  // Exercises button
  document.getElementById('grammarExercisesBtn')?.addEventListener('click', () => {
    genererExerciceAleatoire();
    document.getElementById('grammarExercisesSection')?.scrollIntoView({ behavior: 'smooth' });
  });
  
  // Favorites button
  document.getElementById('grammarFavoritesBtn')?.addEventListener('click', () => {
    afficherFavorisGrammaire();
  });
  
  // Refresh exercises button
  document.getElementById('refreshExercisesBtn')?.addEventListener('click', () => {
    genererExerciceAleatoire();
  });
}

// ------------------------------
// CONJUGAISON VERBALE
// ------------------------------
function afficherConjugaisonVerbale(verb) {
  const conj = CONJUGATION_TABLES[verb.toLowerCase()];
  if (!conj) {
    if (window.showToast) window.showToast(`📚 Conjugaison de "${verb}" non disponible`, "info");
    return;
  }
  
  const modalHtml = `
    <div id="conjugModal" class="modal">
      <div class="modal-content conjug-modal">
        <span class="modal-close">&times;</span>
        <h2>📚 Conjugaison de <span class="conjug-verb">${escapeHtml(verb)}</span></h2>
        <p class="conjug-meaning">(${escapeHtml(conj.meaning)})</p>
        
        <div class="conjug-tabs">
          <button class="conjug-tab active" data-tense="present">Présent</button>
          <button class="conjug-tab" data-tense="past">Passé</button>
          <button class="conjug-tab" data-tense="future">Futur</button>
        </div>
        
        <div class="conjug-table-container">
          <table class="conjug-table">
            <thead>
              <tr><th>Personne</th><th>Pronom</th><th>Conjugaison</th></tr>
            </thead>
            <tbody id="conjugBody"></tbody>
          </table>
        </div>
        
        <div class="conjug-note">
          💡 La conjugaison tadaksahak distingue perfectif (passé) et imperfectif (présent/futur).
        </div>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('conjugModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('conjugModal');
  const closeBtn = modal.querySelector('.modal-close');
  
  function updateConjugTable(tense) {
    const tbody = document.getElementById('conjugBody');
    const persons = [
      { label: "1ère personne singulier", pronoun: "aɣ(a)-", code: "1sg" },
      { label: "2ème personne singulier", pronoun: "ni- / an-", code: "2sg" },
      { label: "3ème personne singulier", pronoun: "a-", code: "3sg" },
      { label: "1ère personne pluriel", pronoun: "ar(ǝ)-", code: "1pl" },
      { label: "2ème personne pluriel", pronoun: "andǝ-", code: "2pl" },
      { label: "3ème personne pluriel", pronoun: "i-", code: "3pl" }
    ];
    
    const tenseData = conj.tenses[tense];
    if (!tenseData) return;
    
    let html = '';
    for (const person of persons) {
      const conjugation = tenseData[person.code] || '—';
      html += `
        <tr>
          <td>${person.label}</td>
          <td><code>${person.pronoun}</code></td>
          <td><strong>${escapeHtml(conjugation)}</strong></td>
        </tr>
      `;
    }
    tbody.innerHTML = html;
  }
  
  updateConjugTable('present');
  
  document.querySelectorAll('.conjug-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.conjug-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateConjugTable(tab.dataset.tense);
    });
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ------------------------------
// TABLEAUX SPÉCIFIQUES
// ------------------------------
function afficherConjugaisonComplete() {
  const modalHtml = `
    <div id="conjugCompleteModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>📊 Tableaux de conjugaison</h2>
        <div class="verbs-list">
          ${Object.entries(CONJUGATION_TABLES).map(([verb, data]) => `
            <div class="verb-card">
              <div class="verb-card-header">
                <strong>${escapeHtml(verb)}</strong> - ${escapeHtml(data.meaning)}
                <button onclick="afficherConjugaisonVerbale('${verb}')" class="btn-small">Voir</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('conjugCompleteModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('conjugCompleteModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function afficherTableauPronoms() {
  const pronouns = [
    { person: "1sg", fr: "Je", sujet: "aɣ(a)-", independant: "aɣay", objet: "ayay", possessif: "aya-n" },
    { person: "2sg", fr: "Tu", sujet: "ni- / an-", independant: "nín", objet: "nin", possessif: "ni-n" },
    { person: "3sg", fr: "Il/Elle", sujet: "a-", independant: "áŋga", objet: "-a", possessif: "ay-n" },
    { person: "1pl", fr: "Nous", sujet: "ar(ǝ)-", independant: "áari", objet: "aari", possessif: "are-n" },
    { person: "2pl", fr: "Vous", sujet: "andǝ-", independant: "ándi", objet: "andi", possessif: "ande-n" },
    { person: "3pl", fr: "Ils/Elles", sujet: "i-", independant: "íŋgi", objet: "-i", possessif: "i-n" }
  ];
  
  const modalHtml = `
    <div id="pronounsModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>👥 Tableau des pronoms personnels</h2>
        <table class="pronouns-table">
          <thead>
            <tr><th>Personne</th><th>Français</th><th>Sujet clitique</th><th>Indépendant</th><th>Objet</th><th>Possessif</th></tr>
          </thead>
          <tbody>
            ${pronouns.map(p => `
              <tr>
                <td><strong>${p.person}</strong></td>
                <td>${p.fr}</td>
                <td><code>${p.sujet}</code></td>
                <td><code>${p.independant}</code></td>
                <td><code>${p.objet}</code></td>
                <td><code>${p.possessif}</code></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('pronounsModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('pronounsModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function afficherTableauNumeraux() {
  const numeraux = [
    { num: 1, tad: "a-ffó / fo-da" },
    { num: 2, tad: "hiŋká" },
    { num: 3, tad: "kaaráḍ" },
    { num: 4, tad: "akkóz" },
    { num: 5, tad: "ʃammúʃ" },
    { num: 6, tad: "ʃaadíʃ" },
    { num: 7, tad: "iffá" },
    { num: 8, tad: "ittám" },
    { num: 9, tad: "taasá" },
    { num: 10, tad: "maará" },
    { num: 20, tad: "táafinda" },
    { num: 30, tad: "kaarad-a-temerwin" },
    { num: 40, tad: "akkoz-a-temerwin" },
    { num: 50, tad: "fammuf-a-temerwin" },
    { num: 100, tad: "t-á-méedi" },
    { num: 1000, tad: "a-jím" }
  ];
  
  const modalHtml = `
    <div id="numeralsModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>🔢 Tableau des numéraux</h2>
        <div class="numerals-grid">
          ${numeraux.map(n => `
            <div class="numeral-card">
              <div class="numeral-number">${n.num}</div>
              <div class="numeral-tad">${escapeHtml(n.tad)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('numeralsModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('numeralsModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function afficherReglesGrammaire() {
  const modalHtml = `
    <div id="rulesModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>📖 Règles essentielles de grammaire</h2>
        <div class="rules-list">
          <div class="rule-card">
            <h3>🔤 Ordre des mots</h3>
            <p>Le tadaksahak suit l'ordre <strong>Sujet - Objet - Verbe (SOV)</strong>.</p>
            <p>Exemple : <em>A-rgán a-hánfi a-ngá-kat.</em> (Le chameau a mordu le chien)</p>
          </div>
          <div class="rule-card">
            <h3>📝 Postpositions</h3>
            <p>Les postpositions sont plus fréquentes que les prépositions.</p>
            <p>Exemple : <em>hugu ka</em> (dans la tente), <em>a-be</em> (sur lui)</p>
          </div>
          <div class="rule-card">
            <h3>🔄 Redoublement</h3>
            <p>Le redoublement de la racine verbale exprime l'intensité ou la répétition.</p>
            <p>Exemple : <em>kár-kár</em> (frapper plusieurs fois)</p>
          </div>
          <div class="rule-card">
            <h3>🔊 Harmonisation consonantique</h3>
            <p>Les préfixes s'adaptent à la consonne suivante.</p>
            <p>Exemple : <em>s- + dá → s-ágá</em> (causatif de "faire")</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('rulesModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('rulesModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ------------------------------
// QUIZ DE GRAMMAIRE
// ------------------------------
function demarrerQuizGrammaire() {
  const allExercises = [...grammaireExercices];
  grammaireCurrentQuiz = allExercises.sort(() => 0.5 - Math.random()).slice(0, 5);
  grammaireQuizIndex = 0;
  grammaireQuizScore = 0;
  afficherQuestionQuizGrammaire();
}

function afficherQuestionQuizGrammaire() {
  if (grammaireQuizIndex >= grammaireCurrentQuiz.length) {
    terminerQuizGrammaire();
    return;
  }
  
  const q = grammaireCurrentQuiz[grammaireQuizIndex];
  const modalHtml = `
    <div id="quizGrammaireModal" class="modal">
      <div class="modal-content quiz-content">
        <span class="modal-close">&times;</span>
        <div class="quiz-header">
          <span class="quiz-progress">Question ${grammaireQuizIndex + 1}/${grammaireCurrentQuiz.length}</span>
          <span class="quiz-score">Score: ${grammaireQuizScore}</span>
        </div>
        <div class="quiz-question">${escapeHtml(q.question)}</div>
        <div class="quiz-options">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option" data-opt="${idx}">${String.fromCharCode(65 + idx)}. ${escapeHtml(opt)}</button>
          `).join('')}
        </div>
        <button id="quizSubmitBtn" class="quiz-submit">✅ Valider</button>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('quizGrammaireModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('quizGrammaireModal');
  const closeBtn = modal.querySelector('.modal-close');
  
  let selectedOpt = null;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedOpt = parseInt(btn.dataset.opt);
    });
  });
  
  document.getElementById('quizSubmitBtn').addEventListener('click', () => {
    if (selectedOpt === null) {
      alert('Veuillez sélectionner une réponse');
      return;
    }
    
    if (selectedOpt === q.answer) {
      grammaireQuizScore++;
    }
    grammaireQuizIndex++;
    modal.remove();
    afficherQuestionQuizGrammaire();
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function terminerQuizGrammaire() {
  const percent = Math.round((grammaireQuizScore / grammaireCurrentQuiz.length) * 100);
  const message = percent === 100 ? "🏆 Parfait ! Maîtrise parfaite !" :
                  percent >= 70 ? "👍 Très bien ! Continuez comme ça !" :
                  percent >= 50 ? "📚 Bon début ! Révisez un peu et réessayez." :
                  "💪 Continuez à apprendre, vous allez y arriver !";
  
  const modalHtml = `
    <div id="quizResultModal" class="modal">
      <div class="modal-content result-content">
        <span class="modal-close">&times;</span>
        <h2>📊 Résultat du quiz</h2>
        <div class="quiz-score-final">${grammaireQuizScore} / ${grammaireCurrentQuiz.length}</div>
        <div class="quiz-percent">${percent}%</div>
        <div class="quiz-message">${message}</div>
        <button id="restartQuizBtn" class="quiz-restart">🔄 Recommencer</button>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('quizResultModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('quizResultModal');
  const closeBtn = modal.querySelector('.modal-close');
  
  document.getElementById('restartQuizBtn').addEventListener('click', () => {
    modal.remove();
    demarrerQuizGrammaire();
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function afficherFavorisGrammaire() {
  if (!grammaireFavoris.length) {
    if (window.showToast) window.showToast("⭐ Aucun favori en grammaire", "info");
    return;
  }
  
  const favorisHtml = `
    <div id="favorisModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>⭐ Favoris grammaire</h2>
        <div class="favoris-list">
          ${grammaireFavoris.map(id => `<div class="favoris-item">📚 ${escapeHtml(id)}</div>`).join('')}
        </div>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('favorisModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', favorisHtml);
  
  const modal = document.getElementById('favorisModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function chargerGrammaireFavoris() {
  const saved = localStorage.getItem('grammaire_favoris');
  if (saved) {
    try {
      grammaireFavoris = JSON.parse(saved);
    } catch(e) {}
  }
}

function sauvegarderGrammaireFavoris() {
  localStorage.setItem('grammaire_favoris', JSON.stringify(grammaireFavoris));
}

// ------------------------------
// STYLES CSS (à ajouter dans style.css)
// ------------------------------
const GRAMMAR_STYLES = `
  .grammar-tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
  }
  
  .grammar-search-input {
    flex: 1;
    min-width: 200px;
    padding: 0.6rem 1rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
  }
  
  .grammar-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .grammaire-premium-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .grammaire-premium-stats .stat {
    background: var(--bg-card);
    padding: 0.3rem 1rem;
    border-radius: var(--radius-full);
    font-size: 0.8rem;
  }
  
  .verb-table-container {
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  .verb-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }
  
  .verb-table th,
  .verb-table td {
    padding: 0.6rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  
  .verb-table th {
    background: var(--primary);
    color: white;
  }
  
  .verb-row:hover {
    background: rgba(51, 204, 255, 0.1);
  }
  
  .verb-actions {
    display: flex;
    gap: 0.3rem;
  }
  
  .pronoun-card {
    background: var(--bg-light);
    border-radius: var(--radius-md);
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .pronoun-person {
    font-weight: 700;
    color: var(--accent);
    min-width: 100px;
  }
  
  .pronoun-details {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
  }
  
  .pronoun-details code {
    background: var(--bg);
    padding: 0.2rem 0.4rem;
    border-radius: var(--radius-sm);
  }
  
  .numeral-item {
    display: flex;
    gap: 1rem;
    align-items: baseline;
    padding: 0.5rem;
    border-bottom: 1px solid var(--border);
  }
  
  .numeral-number {
    font-weight: 700;
    color: var(--accent);
    min-width: 40px;
  }
  
  .grammar-element-card {
    background: var(--bg-light);
    border-radius: var(--radius-md);
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    position: relative;
  }
  
  .element-term {
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.3rem;
  }
  
  .element-example {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
    font-style: italic;
  }
  
  .element-favorite {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .grammar-exercises-section {
    margin-top: 2rem;
    padding: 1rem;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .exercise-card {
    background: var(--bg-light);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
  }
  
  .exercise-category {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }
  
  .exercise-question {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  .exercise-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .exercise-option {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 0.6rem 1rem;
    text-align: left;
    cursor: pointer;
    transition: all var(--transition);
  }
  
  .exercise-option:hover {
    background: rgba(51, 204, 255, 0.1);
  }
  
  .exercise-option.selected {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
  
  .exercise-feedback {
    margin: 1rem 0;
    padding: 0.8rem;
    border-radius: var(--radius-md);
  }
  
  .exercise-feedback .success {
    color: var(--success);
  }
  
  .exercise-feedback .error {
    color: var(--error);
  }
  
  .grammar-resources-section {
    margin-top: 2rem;
  }
  
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .resource-card {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: 1rem;
    text-align: center;
    text-decoration: none;
    color: var(--text);
    transition: all var(--transition);
    border: 1px solid var(--border);
  }
  
  .resource-card:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
  }
  
  .resource-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .conjug-modal {
    max-width: 700px;
  }
  
  .conjug-tabs {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  
  .conjug-tab {
    padding: 0.5rem 1rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;
  }
  
  .conjug-tab.active {
    background: var(--primary);
    color: white;
  }
  
  .conjug-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .conjug-table th,
  .conjug-table td {
    padding: 0.6rem;
    border: 1px solid var(--border);
  }
  
  .conjug-table th {
    background: var(--bg-card);
  }
  
  .hidden {
    display: none;
  }
  
  @media (max-width: 768px) {
    .grammar-tools {
      flex-direction: column;
    }
    
    .pronoun-details {
      flex-direction: column;
      gap: 0.3rem;
    }
    
    .resources-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// Injecter les styles
if (!document.getElementById('grammar-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'grammar-styles';
  styleSheet.textContent = GRAMMAR_STYLES;
  document.head.appendChild(styleSheet);
}

// ------------------------------
// EXPORT
// ------------------------------
window.grammaire = grammaire;
window.chargerGrammaire = chargerGrammaire;
window.afficherGrammairePremium = afficherGrammairePremium;
window.afficherConjugaisonVerbale = afficherConjugaisonVerbale;
window.afficherConjugaisonComplete = afficherConjugaisonComplete;
window.afficherTableauPronoms = afficherTableauPronoms;
window.afficherTableauNumeraux = afficherTableauNumeraux;
window.afficherReglesGrammaire = afficherReglesGrammaire;
window.demarrerQuizGrammaire = demarrerQuizGrammaire;

console.log("📚 Module Grammaire Premium chargé - Version avec exercices et quiz");
