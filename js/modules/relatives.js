// ============================================
// MODULE - PROPOSITIONS RELATIVES
// D'après Christiansen & Levinsohn (2003)
// Version premium avec exercices, quiz, comparaisons
// ============================================

let relativesData = null;
let currentRelativeQuiz = null;
let relativeQuizScore = 0;
let relativeQuizIndex = 0;
let relativeFavorites = [];
let userRelativeProgress = {};

// ------------------------------
// CONFIGURATION
// ------------------------------
const RELATIVES_CONFIG = {
  showExercises: true,
  showQuiz: true,
  showComparisons: true,
  showFavorites: true,
  examplesPerStrategy: 3
};

// ------------------------------
// EXERCICES INTERACTIFS
// ------------------------------
const RELATIVES_EXERCISES = [
  {
    question: "Quel pronom relatif utilise-t-on pour un nom DÉFINI au singulier ?",
    options: ["ayo", "ayondo", "sa", "∅"],
    answer: 0,
    explanation: "'ayo' est le pronom relatif pour les noms définis au singulier. Exemple : Bora [ayo a-taw-kat]"
  },
  {
    question: "Quelle stratégie utilise-t-on pour les noms INDÉFINIS ?",
    options: ["ayo", "ayondo", "sa", "Gap strategy (∅)"],
    answer: 3,
    explanation: "La Gap strategy (aucun marqueur) est utilisée pour les noms indéfinis. Exemple : A-gar hamu [# f-keni]"
  },
  {
    question: "Que signifie 'sa' dans une proposition relative ?",
    options: ["Restrictif - nom défini", "Restrictif - nom indéfini", "Non-restrictif", "Pluriel"],
    answer: 2,
    explanation: "'sa' introduit des propositions relatives non-restrictives (information supplémentaire). Exemple : nana, [sa ayn man Aminata]"
  },
  {
    question: "Quel est le pluriel de 'ayo' ?",
    options: ["ayon", "ayondo", "ayonin", "sa"],
    answer: 1,
    explanation: "'ayondo' (parfois 'endayo') est le pronom relatif pluriel en tadaksahak."
  },
  {
    question: "Dans 'Bora [ayo a-taw-kat] a-zumbu-kat', que signifie 'ayo' ?",
    options: ["qui", "que", "dont", "où"],
    answer: 0,
    explanation: "'ayo' est le pronom relatif sujet signifiant 'qui'."
  },
  {
    question: "Quelle est la principale différence entre 'ayo' et 'sa' ?",
    options: ["L'aspect (perfectif/imperfectif)", "Le nombre (singulier/pluriel)", "Le caractère restrictif vs non-restrictif", "La voix (actif/passif)"],
    answer: 2,
    explanation: "'ayo' introduit des relatives restrictives (information essentielle), 'sa' introduit des relatives non-restrictives (information supplémentaire)."
  },
  {
    question: "Comment se forme la gap strategy ?",
    options: ["Avec un pronom relatif", "Avec un suffixe", "Sans aucun marqueur", "Avec un préfixe"],
    answer: 2,
    explanation: "La gap strategy n'utilise aucun marqueur. Le verbe est conjugué normalement et le trou (gap) marque la relativisation."
  }
];

// ------------------------------
// TABLEAU COMPARATIF
// ------------------------------
const COMPARISON_TABLE = {
  strategies: [
    {
      name: "ayo",
      nameFr: "Pronom relatif",
      usage: "Noms DÉFINIS, restrictif",
      exemple: "Bora [ayo a-taw-kat] a-zumbu-kat.",
      exempleFr: "La personne QUI est arrivée est descendue.",
      glose: "personne [qui 3MS-arriver-PF] 3MS-descendre-PF",
      restriction: "Essentiel pour identifier le référent"
    },
    {
      name: "∅",
      nameFr: "Gap strategy",
      usage: "Noms INDÉFINIS, restrictif",
      exemple: "A-gar hamu [# f-keni aykaran daw].",
      exempleFr: "Elle a trouvé de la viande QUI était à côté des chiots.",
      glose: "3FS-trouver viande [# être.3FS côté chiots à côté]",
      restriction: "Nouveau référent introduit"
    },
    {
      name: "sa",
      nameFr: "Non-restrictif",
      usage: "Information supplémentaire",
      exemple: "A-jiken-an ayn nana se, [sa ayn man Aminata].",
      exempleFr: "Il salue sa mère, QUI s'appelle Aminata.",
      glose: "3MS-saluer-PF sa mère 3FS, [qui 3FS s'appeler Aminata]",
      restriction: "Référent déjà identifié"
    }
  ]
};

// ------------------------------
// CHARGEMENT DES DONNÉES
// ------------------------------
async function chargerRelatives() {
  try {
    const response = await fetch('data/relatives.json');
    if (!response.ok) throw new Error();
    relativesData = await response.json();
    console.log('📚 Données sur les relatives chargées');
    chargerProgressionRelatives();
    chargerFavorisRelatives();
  } catch(e) {
    console.warn("Erreur chargement relatives.json", e);
    relativesData = getFallbackRelativesData();
  }
}

function getFallbackRelativesData() {
  return {
    strategies: [
      {
        marqueur: "ayo",
        marqueur_sg: "ayo",
        marqueur_pl: "ayondo",
        usage_fr: "Pronom relatif pour noms DÉFINIS dans des propositions RESTRICTIVES (singulier)",
        usage_en: "Relative pronoun for DEFINITE nouns in RESTRICTIVE clauses (singular)",
        usage_ar: "ضمير موصول للأسماء المُعَرَّفة في جمل الوصل المُقَيِّدة (مفرد)",
        exemples: [
          {
            tadaksahak: "Bora [ayo a-taw-kat] a-zumbu-kat.",
            glose_fr: "personne [qui 3MS-arriver-PF] 3MS-descendre-PF",
            traduction_fr: "La personne QUI est arrivée est descendue.",
            traduction_en: "The person WHO arrived got down.",
            traduction_ar: "الشخص الذي وصل نزل."
          }
        ]
      },
      {
        marqueur: "∅",
        usage_fr: "Gap strategy (aucun marqueur) pour noms INDÉFINIS dans des propositions RESTRICTIVES",
        usage_en: "Gap strategy (no marker) for INDEFINITE nouns in RESTRICTIVE clauses",
        usage_ar: "استراتيجية الفجوة (بدون علامة) للأسماء غير المُعَرَّفة في جمل الوصل المُقَيِّدة",
        exemples: [
          {
            tadaksahak: "A-gar hamu [# f-keni aykaran daw].",
            glose_fr: "3FS-trouver viande [# être.3FS côté chiots à côté]",
            traduction_fr: "Elle a trouvé de la viande QUI était à côté des chiots.",
            traduction_en: "She found meat THAT was next to the puppies.",
            traduction_ar: "وجدت لحماً كان بجانب الجراء."
          }
        ]
      },
      {
        marqueur: "sa",
        usage_fr: "Proposition relative NON-RESTRICTIVE (information supplémentaire)",
        usage_en: "NON-RESTRICTIVE relative clause (additional information)",
        usage_ar: "جملة وصل غير مُقَيِّدة (معلومات إضافية)",
        exemples: [
          {
            tadaksahak: "A-jiken-an ayn nana se, [sa ayn man Aminata].",
            glose_fr: "3MS-saluer-PF sa mère 3FS, [qui 3FS s'appeler Aminata]",
            traduction_fr: "Il salue sa mère, QUI s'appelle Aminata.",
            traduction_en: "He greets his mother, WHO is called Aminata.",
            traduction_ar: "يحّيي أمه، التي تُدعى أميناتا."
          }
        ]
      }
    ],
    accessibilite: {
      sujet: { pronom: true, gap: true, sa: true },
      objet_direct: { pronom: true, gap: true, sa: true },
      objet_indirect: { pronom: true, gap: false, sa: false },
      oblique: { pronom: true, gap: true, sa: false },
      possesseur: { pronom: false, gap: false, sa: true }
    }
  };
}

// ------------------------------
// PROGRESSION UTILISATEUR
// ------------------------------
function chargerProgressionRelatives() {
  const saved = localStorage.getItem('relatives_progress');
  if (saved) {
    try {
      userRelativeProgress = JSON.parse(saved);
    } catch(e) {}
  }
}

function sauvegarderProgressionRelatives() {
  localStorage.setItem('relatives_progress', JSON.stringify(userRelativeProgress));
}

function marquerConceptAppris(conceptId) {
  if (!userRelativeProgress[conceptId]) {
    userRelativeProgress[conceptId] = { appris: false, score: 0, tentatives: 0 };
  }
  userRelativeProgress[conceptId].appris = true;
  userRelativeProgress[conceptId].tentatives++;
  sauvegarderProgressionRelatives();
  mettreAJourAffichageProgression();
}

// ------------------------------
// FAVORIS
// ------------------------------
function chargerFavorisRelatives() {
  const saved = localStorage.getItem('relatives_favorites');
  if (saved) {
    try {
      relativeFavorites = JSON.parse(saved);
    } catch(e) {}
  }
}

function sauvegarderFavorisRelatives() {
  localStorage.setItem('relatives_favorites', JSON.stringify(relativeFavorites));
}

function basculerFavoriRelative(strategyId) {
  if (relativeFavorites.includes(strategyId)) {
    relativeFavorites = relativeFavorites.filter(id => id !== strategyId);
    if (window.showToast) window.showToast("⭐ Stratégie retirée des favoris", "info");
  } else {
    relativeFavorites.push(strategyId);
    if (window.showToast) window.showToast("⭐ Stratégie ajoutée aux favoris", "success");
  }
  sauvegarderFavorisRelatives();
  afficherRelatives(); // Rafraîchir l'affichage
}

// ------------------------------
// AFFICHAGE PRINCIPAL (VERSION ENRICHIE)
// ------------------------------
async function afficherRelatives() {
  const container = document.getElementById("relativesContainer");
  if (!container) return;
  
  if (!relativesData) {
    await chargerRelatives();
  }
  
  if (!relativesData) {
    container.innerHTML = `<div class="info-message">
      <p>📚 Données sur les relatives non disponibles.</p>
      <button onclick="chargerRelatives()" class="btn-small">🔄 Recharger</button>
    </div>`;
    return;
  }
  
  let html = `
    <div class="relatives-premium-intro">
      <div class="premium-icon">📖</div>
      <h3>${window.t('grammar_relatives_title') || 'Propositions relatives'}</h3>
      <p>${window.t('grammar_relatives_desc') || 'D\'après Christiansen & Levinsohn (2003)'}</p>
      <p>Le tadaksahak utilise <strong>trois stratégies distinctes</strong> pour former des propositions relatives.</p>
    </div>
    
    <div class="relatives-tools">
      <div class="relatives-actions">
        <button id="relativesQuizBtn" class="btn-small">❓ Quiz</button>
        <button id="relativesExercisesBtn" class="btn-small">✍️ Exercices</button>
        <button id="relativesComparisonBtn" class="btn-small">📊 Comparaison</button>
        <button id="relativesFavoritesBtn" class="btn-small">⭐ Favoris</button>
      </div>
    </div>
    
    <div class="strategies-premium-grid" id="strategiesGrid">
  `;
  
  for (let i = 0; i < relativesData.strategies.length; i++) {
    const strat = relativesData.strategies[i];
    let usage = currentLanguage === 'fr' ? strat.usage_fr : (currentLanguage === 'en' ? strat.usage_en : strat.usage_ar);
    let marqueurAffiche = strat.marqueur === "∅" ? "∅ (aucun)" : (strat.marqueur_sg || strat.marqueur);
    const isFavorite = relativeFavorites.includes(marqueurAffiche);
    const progression = userRelativeProgress[marqueurAffiche]?.appris ? 100 : 0;
    
    html += `
      <div class="strategy-premium-card" data-strategy="${escapeHtml(marqueurAffiche)}">
        <div class="strategy-header">
          <div class="strategy-title">
            <span class="strategy-marker">${escapeHtml(marqueurAffiche)}</span>
            <span class="strategy-type">${strat.marqueur === "∅" ? "Gap Strategy" : (strat.marqueur === "sa" ? "Non-restrictive" : "Relative Pronoun")}</span>
          </div>
          <button class="strategy-favorite-btn" data-strategy="${escapeHtml(marqueurAffiche)}">${isFavorite ? '⭐' : '☆'}</button>
        </div>
        
        <div class="strategy-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progression}%;"></div>
          </div>
          <span class="progress-text">${progression}% maîtrisé</span>
        </div>
        
        <p class="strategy-usage-premium">${escapeHtml(usage)}</p>
        
        <div class="strategy-exemples-premium">
          <h4>📖 Exemples</h4>
    `;
    
    const exemples = strat.exemples || [];
    for (let j = 0; j < exemples.length; j++) {
      const ex = exemples[j];
      let trad = currentLanguage === 'fr' ? ex.traduction_fr : (currentLanguage === 'en' ? ex.traduction_en : ex.traduction_ar);
      html += `
        <div class="exemple-premium-card" data-exemple-index="${j}">
          <div class="exemple-header">
            <span class="exemple-number">Exemple ${j + 1}</span>
            <button class="exemple-favorite" data-strategy="${escapeHtml(marqueurAffiche)}" data-exemple="${j}">📌</button>
          </div>
          <div class="exemple-tad-premium">${escapeHtml(ex.tadaksahak)}</div>
          <div class="exemple-gloss-premium">${escapeHtml(ex.glose_fr)}</div>
          <div class="exemple-trans-premium">${escapeHtml(trad)}</div>
          <div class="exemple-actions">
            <button class="exemple-play" data-text="${escapeHtml(ex.tadaksahak)}">🔊 Écouter</button>
            <button class="exemple-analyze" data-exemple="${escapeHtml(ex.tadaksahak)}">🔍 Analyser</button>
          </div>
        </div>
      `;
    }
    
    // Ajouter un exercice spécifique à la stratégie
    if (RELATIVES_CONFIG.showExercises) {
      html += `
        <div class="strategy-exercise">
          <button class="strategy-exercise-btn" data-strategy="${escapeHtml(marqueurAffiche)}">✍️ Exercice sur cette stratégie</button>
        </div>
      `;
    }
    
    html += `</div></div>`;
  }
  
  html += `</div>`;
  
  // Ajouter la section de hiérarchie d'accessibilité
  if (relativesData.accessibilite) {
    html += `
      <div class="accessibility-premium-section">
        <h4>🎯 Hiérarchie d'accessibilité (Keenan & Comrie 1977)</h4>
        <div class="accessibility-table-container">
          <table class="accessibility-premium-table">
            <thead>
              <tr><th>Fonction grammaticale</th><th>ayo/ayondo</th><th>Gap (∅)</th><th>sa</th></tr>
            </thead>
            <tbody>
              <tr><td>Sujet</td><td class="${relativesData.accessibilite.sujet.pronom ? 'check' : 'cross'}">✅</td><td class="${relativesData.accessibilite.sujet.gap ? 'check' : 'cross'}">${relativesData.accessibilite.sujet.gap ? '✅' : '❌'}</td><td class="${relativesData.accessibilite.sujet.sa ? 'check' : 'cross'}">${relativesData.accessibilite.sujet.sa ? '✅' : '❌'}</td></tr>
              <tr><td>Objet direct</td><td class="${relativesData.accessibilite.objet_direct?.pronom ? 'check' : 'cross'}">✅</td><td class="${relativesData.accessibilite.objet_direct?.gap ? 'check' : 'cross'}">${relativesData.accessibilite.objet_direct?.gap ? '✅' : '❌'}</td><td class="${relativesData.accessibilite.objet_direct?.sa ? 'check' : 'cross'}">${relativesData.accessibilite.objet_direct?.sa ? '✅' : '❌'}</td></tr>
              <tr><td>Objet indirect</td><td class="${relativesData.accessibilite.objet_indirect?.pronom ? 'check' : 'cross'}">✅</td><td class="${relativesData.accessibilite.objet_indirect?.gap ? 'check' : 'cross'}">❌</td><td class="${relativesData.accessibilite.objet_indirect?.sa ? 'check' : 'cross'}">❌</td></tr>
              <tr><td>Oblique</td><td class="${relativesData.accessibilite.oblique?.pronom ? 'check' : 'cross'}">✅</td><td class="${relativesData.accessibilite.oblique?.gap ? 'check' : 'cross'}">${relativesData.accessibilite.oblique?.gap ? '✅' : '❌'}</td><td class="${relativesData.accessibilite.oblique?.sa ? 'check' : 'cross'}">❌</td></tr>
              <tr><td>Possesseur</td><td class="${relativesData.accessibilite.possesseur?.pronom ? 'check' : 'cross'}">❌</td><td class="${relativesData.accessibilite.possesseur?.gap ? 'check' : 'cross'}">❌</td><td class="${relativesData.accessibilite.possesseur?.sa ? 'check' : 'cross'}">✅</td></tr>
            </tbody>
          </table>
        </div>
        <p class="accessibility-note">📚 D'après l'analyse du corpus de Christiansen & Levinsohn (2003)</p>
      </div>
    `;
  }
  
  // Ajouter la section des exceptions
  if (relativesData.exceptions) {
    html += `
      <div class="exceptions-premium-section">
        <h4>⚠️ Exceptions notables</h4>
        <div class="exceptions-grid">
    `;
    
    for (const [key, exc] of Object.entries(relativesData.exceptions)) {
      html += `
        <div class="exception-premium-card">
          <div class="exception-header">
            <strong>${escapeHtml(exc.mot || key)}</strong>
            <span class="exception-badge">Exception</span>
          </div>
          <p class="exception-sens">${escapeHtml(currentLanguage === 'fr' ? exc.sens_fr : (currentLanguage === 'en' ? exc.sens_en : exc.sens_ar))}</p>
          <p class="exception-regle">📌 ${escapeHtml(exc.regle)}</p>
          ${exc.exemple ? `<div class="exception-exemple">💬 "${escapeHtml(exc.exemple)}"</div>` : ''}
        </div>
      `;
    }
    
    html += `</div></div>`;
  }
  
  container.innerHTML = html;
  
  // Initialiser les interactions
  initialiserInteractionsRelatives();
  mettreAJourAffichageProgression();
}

function initialiserInteractionsRelatives() {
  // Boutons favoris des stratégies
  document.querySelectorAll('.strategy-favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const strategy = btn.dataset.strategy;
      basculerFavoriRelative(strategy);
    });
  });
  
  // Boutons d'exercices par stratégie
  document.querySelectorAll('.strategy-exercise-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const strategy = btn.dataset.strategy;
      demarrerExerciceStrategy(strategy);
    });
  });
  
  // Prononciation des exemples
  document.querySelectorAll('.exemple-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = btn.dataset.text;
      speakRelativeText(text);
    });
  });
  
  // Analyse des exemples
  document.querySelectorAll('.exemple-analyze').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const exemple = btn.dataset.exemple;
      analyserExemple(exemple);
    });
  });
  
  // Quiz général
  document.getElementById('relativesQuizBtn')?.addEventListener('click', () => {
    demarrerQuizRelatives();
  });
  
  // Exercices généraux
  document.getElementById('relativesExercisesBtn')?.addEventListener('click', () => {
    demarrerExercicesRelatives();
  });
  
  // Comparaison
  document.getElementById('relativesComparisonBtn')?.addEventListener('click', () => {
    afficherComparaisonRelatives();
  });
  
  // Favoris
  document.getElementById('relativesFavoritesBtn')?.addEventListener('click', () => {
    afficherFavorisRelatives();
  });
}

function mettreAJourAffichageProgression() {
  for (const strategy of relativesData.strategies) {
    const marqueur = strategy.marqueur === "∅" ? "∅" : (strategy.marqueur_sg || strategy.marqueur);
    const progression = userRelativeProgress[marqueur]?.appris ? 100 : 0;
    const progressFill = document.querySelector(`.strategy-premium-card[data-strategy="${marqueur}"] .progress-fill`);
    const progressText = document.querySelector(`.strategy-premium-card[data-strategy="${marqueur}"] .progress-text`);
    if (progressFill) progressFill.style.width = `${progression}%`;
    if (progressText) progressText.textContent = `${progression}% maîtrisé`;
  }
}

// ------------------------------
// PRONONCIATION
// ------------------------------
function speakRelativeText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.7;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    if (window.showToast) window.showToast("🔊 Synthèse vocale non supportée", "warning");
  }
}

// ------------------------------
// ANALYSE D'EXEMPLE
// ------------------------------
function analyserExemple(exemple) {
  const modalHtml = `
    <div id="analyseModal" class="modal">
      <div class="modal-content analyse-content">
        <span class="modal-close">&times;</span>
        <h2>🔍 Analyse grammaticale</h2>
        <div class="analyse-phrase">${escapeHtml(exemple)}</div>
        <div class="analyse-details">
          <h3>📖 Structure</h3>
          <ul>
            <li><strong>Proposition principale</strong> : identifie le sujet/objet principal</li>
            <li><strong>Proposition relative</strong> : apporte une information sur le référent</li>
            <li><strong>Stratégie utilisée</strong> : ${identifierStrategie(exemple)}</li>
          </ul>
          <h3>📝 Glose</h3>
          <p>${genererGlose(exemple)}</p>
          <h3>💡 Fonction grammaticale</h3>
          <p>${identifierFonction(exemple)}</p>
        </div>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('analyseModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('analyseModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function identifierStrategie(exemple) {
  if (exemple.includes('[ayo') || exemple.includes('ayo')) return "Pronom relatif 'ayo' (singulier défini)";
  if (exemple.includes('ayondo')) return "Pronom relatif 'ayondo' (pluriel défini)";
  if (exemple.includes('[sa') || exemple.includes('sa')) return "Marqueur non-restrictif 'sa'";
  if (exemple.includes('[#]') || exemple.includes('[#') || exemple.includes('#]')) return "Gap strategy (∅) - aucun marqueur";
  return "Stratégie non identifiée";
}

function genererGlose(exemple) {
  return exemple.split(' ').map(mot => {
    if (mot === 'ayo') return 'qui/que (relatif sg)';
    if (mot === 'ayondo') return 'qui/que (relatif pl)';
    if (mot === 'sa') return 'qui/que (non-restrictif)';
    if (mot === 'a-') return '3MS (il)';
    if (mot === 'a-') return '3MS (il)';
    if (mot === 'i-') return '3MP (ils)';
    if (mot === 'aɣ-') return '1SG (je)';
    if (mot === 'ni-') return '2SG (tu)';
    if (mot === 'ar-') return '1PL (nous)';
    if (mot === 'and-') return '2PL (vous)';
    return mot;
  }).join(' ');
}

function identifierFonction(exemple) {
  if (exemple.includes('ayo a-') || exemple.includes('ayondo a-')) return "Le pronom relatif est sujet de la proposition relative.";
  if (exemple.includes('a-gar') || exemple.includes('a-ngá')) return "La gap strategy marque un objet direct relativisé.";
  if (exemple.includes('sa ayn')) return "Le marqueur 'sa' introduit une relative non-restrictive (info supplémentaire).";
  return "Analyse détaillée disponible dans la grammaire.";
}

// ------------------------------
// EXERCICES
// ------------------------------
function demarrerExerciceStrategy(strategy) {
  const exercices = RELATIVES_EXERCISES.filter(ex => {
    if (strategy === 'ayo') return ex.question.includes('DÉFINI') || ex.question.includes('ayo');
    if (strategy === '∅') return ex.question.includes('INDÉFINIS') || ex.question.includes('Gap');
    if (strategy === 'sa') return ex.question.includes('sa') || ex.question.includes('non-restrictif');
    return true;
  });
  
  if (exercices.length === 0) {
    if (window.showToast) window.showToast("📚 Exercices à venir pour cette stratégie", "info");
    return;
  }
  
  currentRelativeQuiz = exercices;
  relativeQuizScore = 0;
  relativeQuizIndex = 0;
  afficherQuestionExercice(strategy);
}

function demarrerExercicesRelatives() {
  currentRelativeQuiz = [...RELATIVES_EXERCISES].sort(() => 0.5 - Math.random()).slice(0, 5);
  relativeQuizScore = 0;
  relativeQuizIndex = 0;
  afficherQuestionExercice("Général");
}

function afficherQuestionExercice(strategyTitle) {
  if (relativeQuizIndex >= currentRelativeQuiz.length) {
    terminerExercices(strategyTitle);
    return;
  }
  
  const q = currentRelativeQuiz[relativeQuizIndex];
  const modalHtml = `
    <div id="exerciceModal" class="modal">
      <div class="modal-content quiz-content">
        <span class="modal-close">&times;</span>
        <div class="quiz-header">
          <span class="quiz-title">✍️ Exercice - ${escapeHtml(strategyTitle)}</span>
          <span class="quiz-progress">Question ${relativeQuizIndex + 1}/${currentRelativeQuiz.length}</span>
          <span class="quiz-score">Score: ${relativeQuizScore}</span>
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
  
  const existing = document.getElementById('exerciceModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('exerciceModal');
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
      if (window.showToast) window.showToast("Veuillez sélectionner une réponse", "warning");
      return;
    }
    
    const isCorrect = (selectedOpt === q.answer);
    if (isCorrect) {
      relativeQuizScore++;
      if (window.showToast) window.showToast(`✅ Correct ! ${q.explanation || ''}`, "success");
    } else {
      const correctLetter = String.fromCharCode(65 + q.answer);
      if (window.showToast) window.showToast(`❌ Incorrect. La bonne réponse était ${correctLetter}. ${q.explanation || ''}`, "error");
    }
    
    relativeQuizIndex++;
    modal.remove();
    afficherQuestionExercice(strategyTitle);
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function terminerExercices(strategyTitle) {
  const percent = Math.round((relativeQuizScore / currentRelativeQuiz.length) * 100);
  const message = percent === 100 ? "🏆 Parfait ! Vous maîtrisez les propositions relatives !" :
                  percent >= 70 ? "👍 Très bien ! Continuez à vous entraîner !" :
                  percent >= 50 ? "📚 Bon début ! Révisez les exemples et réessayez." :
                  "💪 Continuez à apprendre, les relatives n'auront bientôt plus de secrets pour vous !";
  
  const modalHtml = `
    <div id="exerciceResultModal" class="modal">
      <div class="modal-content result-content">
        <span class="modal-close">&times;</span>
        <h2>📊 Résultat des exercices</h2>
        <div class="quiz-theme">${escapeHtml(strategyTitle)}</div>
        <div class="quiz-score-final">${relativeQuizScore} / ${currentRelativeQuiz.length}</div>
        <div class="quiz-percent">${percent}%</div>
        <div class="quiz-message">${message}</div>
        <button id="restartExerciceBtn" class="quiz-restart">🔄 Recommencer</button>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('exerciceResultModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('exerciceResultModal');
  const closeBtn = modal.querySelector('.modal-close');
  
  document.getElementById('restartExerciceBtn').addEventListener('click', () => {
    modal.remove();
    demarrerExercicesRelatives();
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ------------------------------
// QUIZ
// ------------------------------
function demarrerQuizRelatives() {
  currentRelativeQuiz = [...RELATIVES_EXERCISES].sort(() => 0.5 - Math.random()).slice(0, 5);
  relativeQuizScore = 0;
  relativeQuizIndex = 0;
  afficherQuestionQuizRelatives();
}

function afficherQuestionQuizRelatives() {
  if (relativeQuizIndex >= currentRelativeQuiz.length) {
    terminerQuizRelatives();
    return;
  }
  
  const q = currentRelativeQuiz[relativeQuizIndex];
  const modalHtml = `
    <div id="quizRelativesModal" class="modal">
      <div class="modal-content quiz-content">
        <span class="modal-close">&times;</span>
        <div class="quiz-header">
          <span class="quiz-title">❓ Quiz - Propositions relatives</span>
          <span class="quiz-progress">Question ${relativeQuizIndex + 1}/${currentRelativeQuiz.length}</span>
          <span class="quiz-score">Score: ${relativeQuizScore}</span>
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
  
  const existing = document.getElementById('quizRelativesModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('quizRelativesModal');
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
      if (window.showToast) window.showToast("Veuillez sélectionner une réponse", "warning");
      return;
    }
    
    const isCorrect = (selectedOpt === q.answer);
    if (isCorrect) {
      relativeQuizScore++;
      if (window.showToast) window.showToast(`✅ Correct ! ${q.explanation || ''}`, "success");
    } else {
      const correctLetter = String.fromCharCode(65 + q.answer);
      if (window.showToast) window.showToast(`❌ Incorrect. La bonne réponse était ${correctLetter}. ${q.explanation || ''}`, "error");
    }
    
    relativeQuizIndex++;
    modal.remove();
    afficherQuestionQuizRelatives();
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function terminerQuizRelatives() {
  const percent = Math.round((relativeQuizScore / currentRelativeQuiz.length) * 100);
  const message = percent === 100 ? "🏆 Parfait ! Expert des propositions relatives !" :
                  percent >= 70 ? "👍 Très bien ! Vous avez de bonnes bases !" :
                  percent >= 50 ? "📚 Bon début ! Révisez les trois stratégies." :
                  "💪 Continuez à apprendre ! Tapez 'exemple relative' pour voir des exemples.";
  
  const modalHtml = `
    <div id="quizResultModal" class="modal">
      <div class="modal-content result-content">
        <span class="modal-close">&times;</span>
        <h2>📊 Résultat du quiz</h2>
        <div class="quiz-score-final">${relativeQuizScore} / ${currentRelativeQuiz.length}</div>
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
    demarrerQuizRelatives();
  });
  
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ------------------------------
// COMPARAISON
// ------------------------------
function afficherComparaisonRelatives() {
  const modalHtml = `
    <div id="comparisonModal" class="modal">
      <div class="modal-content comparison-content">
        <span class="modal-close">&times;</span>
        <h2>📊 Comparaison des trois stratégies</h2>
        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Critère</th>
                <th>ayo / ayondo</th>
                <th>Gap strategy (∅)</th>
                <th>sa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Type</strong></td>
                <td>Pronom relatif</td>
                <td>Aucun marqueur</td>
                <td>Conjonction</td>
              </tr>
              <tr>
                <td><strong>Nature du nom</strong></td>
                <td>DÉFINI</td>
                <td>INDÉFINI</td>
                <td>Défini ou indéfini</td>
              </tr>
              <tr>
                <td><strong>Restrictivité</strong></td>
                <td>Restrictif</td>
                <td>Restrictif</td>
                <td>Non-restrictif</td>
              </tr>
              <tr>
                <td><strong>Information</strong></td>
                <td>Essentielle</td>
                <td>Essentielle</td>
                <td>Supplémentaire</td>
              </tr>
              <tr>
                <td><strong>Exemple</strong></td>
                <td><em>Bora [ayo a-taw-kat]</em></td>
                <td><em>A-gar hamu [# f-keni]</em></td>
                <td><em>nana, [sa ayn man...]</em></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="comparison-note">
          💡 D'après Christiansen & Levinsohn (2003) - Relative Clauses in Tadaksahak
        </div>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('comparisonModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('comparisonModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ------------------------------
// FAVORIS
// ------------------------------
function afficherFavorisRelatives() {
  if (!relativeFavorites.length) {
    if (window.showToast) window.showToast("⭐ Aucune stratégie favorite. Cliquez sur l'étoile pour en ajouter.", "info");
    return;
  }
  
  const favorisHtml = `
    <div id="favorisRelativesModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>⭐ Stratégies favorites</h2>
        <div class="favoris-list">
          ${relativeFavorites.map(f => `<div class="favoris-item">📚 ${escapeHtml(f)}</div>`).join('')}
        </div>
        <p class="favoris-note">💡 Cliquez sur une stratégie dans la section principale pour l'étudier.</p>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('favorisRelativesModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', favorisHtml);
  
  const modal = document.getElementById('favorisRelativesModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ------------------------------
// EXEMPLE ALÉATOIRE
// ------------------------------
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

// ------------------------------
// STYLES CSS
// ------------------------------
const RELATIVES_STYLES = `
  .relatives-tools {
    margin-bottom: 2rem;
  }
  
  .relatives-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .strategy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .strategy-title {
    display: flex;
    align-items: baseline;
    gap: 0.8rem;
  }
  
  .strategy-favorite-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    transition: transform var(--transition);
  }
  
  .strategy-favorite-btn:hover {
    transform: scale(1.1);
  }
  
  .strategy-progress {
    padding: 0.5rem 1rem;
    background: var(--bg-light);
    border-bottom: 1px solid var(--border);
  }
  
  .progress-bar {
    height: 4px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 0.2rem;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--success), var(--primary));
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  .progress-text {
    font-size: 0.65rem;
    color: var(--text-muted);
  }
  
  .strategy-exemples-premium h4 {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
    color: var(--accent);
  }
  
  .exemple-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .exemple-number {
    font-size: 0.7rem;
    color: var(--text-muted);
  }
  
  .exemple-favorite {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .exemple-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.8rem;
  }
  
  .exemple-play, .exemple-analyze {
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    background: var(--bg-light);
    cursor: pointer;
    font-size: 0.7rem;
    transition: all var(--transition);
  }
  
  .exemple-play:hover, .exemple-analyze:hover {
    background: var(--primary);
    color: white;
  }
  
  .strategy-exercise {
    margin-top: 1rem;
    text-align: center;
  }
  
  .strategy-exercise-btn {
    padding: 0.4rem 1rem;
    border-radius: var(--radius-full);
    background: var(--bg-light);
    border: 1px solid var(--border);
    cursor: pointer;
    font-size: 0.8rem;
    transition: all var(--transition);
  }
  
  .strategy-exercise-btn:hover {
    background: var(--primary);
    color: white;
  }
  
  .accessibility-premium-section {
    margin-top: 2rem;
    padding: 1rem;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
  }
  
  .accessibility-premium-section h4 {
    text-align: center;
    margin-bottom: 1rem;
    color: var(--accent);
  }
  
  .accessibility-premium-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }
  
  .accessibility-premium-table th,
  .accessibility-premium-table td {
    padding: 0.6rem;
    text-align: center;
    border: 1px solid var(--border);
  }
  
  .accessibility-premium-table th {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: white;
  }
  
  .accessibility-premium-table td.check {
    color: var(--success);
  }
  
  .accessibility-premium-table td.cross {
    color: var(--error);
  }
  
  .accessibility-note {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-align: center;
    margin-top: 1rem;
  }
  
  .exceptions-premium-section {
    margin-top: 2rem;
  }
  
  .exceptions-premium-section h4 {
    margin-bottom: 1rem;
    color: var(--warning);
  }
  
  .exceptions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
  
  .exception-premium-card {
    background: rgba(255, 152, 0, 0.1);
    border-radius: var(--radius-lg);
    padding: 1rem;
    border-left: 3px solid var(--warning);
  }
  
  .exception-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .exception-badge {
    font-size: 0.6rem;
    background: var(--warning);
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: var(--radius-full);
  }
  
  .exception-sens {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }
  
  .exception-regle {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .exception-exemple {
    font-size: 0.8rem;
    font-family: monospace;
    padding: 0.5rem;
    background: var(--bg);
    border-radius: var(--radius-md);
  }
  
  .comparison-table-container {
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 0.8rem;
    border: 1px solid var(--border);
    text-align: left;
    vertical-align: top;
  }
  
  .comparison-table th {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: white;
  }
  
  .comparison-note {
    margin-top: 1rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    text-align: center;
    font-style: italic;
  }
  
  .analyse-phrase {
    font-size: 1.2rem;
    font-family: monospace;
    padding: 1rem;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .analyse-details ul {
    list-style: none;
    padding-left: 0;
  }
  
  .analyse-details li {
    padding: 0.3rem 0;
    border-bottom: 1px dashed var(--border);
  }
  
  @media (max-width: 768px) {
    .relatives-actions {
      flex-direction: column;
      align-items: stretch;
    }
    
    .exceptions-grid {
      grid-template-columns: 1fr;
    }
    
    .strategy-title {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .exemple-actions {
      flex-direction: column;
    }
  }
`;

// Injecter les styles
if (!document.getElementById('relatives-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'relatives-styles';
  styleSheet.textContent = RELATIVES_STYLES;
  document.head.appendChild(styleSheet);
}

// ------------------------------
// EXPORT
// ------------------------------
window.relativesData = relativesData;
window.chargerRelatives = chargerRelatives;
window.afficherRelatives = afficherRelatives;
window.genererExempleRelative = genererExempleRelative;
window.demarrerQuizRelatives = demarrerQuizRelatives;
window.afficherComparaisonRelatives = afficherComparaisonRelatives;

console.log("📚 Module Propositions relatives chargé - Version premium avec quiz et exercices");
