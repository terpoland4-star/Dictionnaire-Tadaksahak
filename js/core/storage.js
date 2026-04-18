// ============================================
// CORE - GESTION DU STOCKAGE LOCAL
// Historique, favoris, mots du jour, paramètres utilisateur
// Version premium avec synchronisation et statistiques
// ============================================

let historique = [];
let favoris = [];
let userSettings = {};
let userStats = {};

// ------------------------------
// CONFIGURATION
// ------------------------------
const STORAGE_CONFIG = {
  maxHistory: 30,
  maxFavorites: 100,
  autoSync: true,
  version: "2.0"
};

// ------------------------------
// INITIALISATION
// ------------------------------
function initStorage() {
  chargerHistorique();
  chargerFavoris();
  chargerUserSettings();
  chargerUserStats();
  console.log("💾 Module Stockage initialisé");
}

// ------------------------------
// HISTORIQUE (Version améliorée)
// ------------------------------
function ajouterHistorique(mot) {
  if (!mot) return;
  
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  historique = historique.filter(m => m !== mot);
  historique.unshift(mot);
  
  if (historique.length > STORAGE_CONFIG.maxHistory) {
    historique.pop();
  }
  
  localStorage.setItem("historiqueTadakssahak", JSON.stringify(historique));
  mettreAJourStats('historique', historique.length);
  afficherHistorique();
  sauvegarderSession();
}

function supprimerHistorique() {
  historique = [];
  localStorage.setItem("historiqueTadakssahak", JSON.stringify(historique));
  afficherHistorique();
  if (window.showToast) window.showToast("🗑️ Historique effacé", "info");
}

function supprimerMotHistorique(mot) {
  historique = historique.filter(m => m !== mot);
  localStorage.setItem("historiqueTadakssahak", JSON.stringify(historique));
  afficherHistorique();
}

function afficherHistorique() {
  const footer = document.querySelector("footer");
  let bloc = document.getElementById("historique");
  
  if (!bloc && footer) {
    bloc = document.createElement("div");
    bloc.id = "historique";
    footer.appendChild(bloc);
  }
  
  if (bloc) {
    if (historique.length) {
      bloc.innerHTML = `
        <div class="historique-header">
          <strong>📜 Derniers mots :</strong>
          <button id="clearHistoryBtn" class="historique-clear" title="Effacer l'historique">🗑️</button>
        </div>
        <div class="historique-list">
          ${historique.map(m => `<span class='mot-historique' data-mot="${escapeHtml(m)}">${escapeHtml(m)}</span>`).join(", ")}
        </div>
      `;
      
      const clearBtn = document.getElementById('clearHistoryBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm("Voulez-vous vraiment effacer tout l'historique ?")) {
            supprimerHistorique();
          }
        });
      }
      
      bloc.querySelectorAll(".mot-historique").forEach(el => {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          const mot = window.vocabulaire?.find(v => v.mot === el.dataset.mot);
          if (mot && window.afficherMot) {
            window.afficherMot(mot);
          }
        });
      });
    } else {
      bloc.innerHTML = "<em>Aucun mot consulté récemment.</em>";
    }
  }
}

function chargerHistorique() {
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  afficherHistorique();
}

// ------------------------------
// FAVORIS (Version améliorée)
// ------------------------------
function chargerFavoris() {
  favoris = JSON.parse(localStorage.getItem("favorisTadakssahak")) || [];
  mettreAJourStats('favoris', favoris.length);
}

function sauvegarderFavoris() {
  localStorage.setItem("favorisTadakssahak", JSON.stringify(favoris));
  mettreAJourStats('favoris', favoris.length);
}

function basculerFavori(item) {
  if (!item || !item.mot) return;
  
  const isFavorite = favoris.includes(item.mot);
  
  if (isFavorite) {
    favoris = favoris.filter(m => m !== item.mot);
    if (window.showToast) window.showToast(window.t('remove_favorite') || "⭐ Retiré des favoris", "info");
  } else {
    if (favoris.length >= STORAGE_CONFIG.maxFavorites) {
      if (window.showToast) window.showToast("⚠️ Limite de favoris atteinte", "warning");
      return;
    }
    favoris.push(item.mot);
    if (window.showToast) window.showToast(window.t('add_favorite') || "⭐ Ajouté aux favoris", "success");
  }
  
  sauvegarderFavoris();
  
  if (window.motActuel === item && window.afficherMot) {
    window.afficherMot(item);
  }
  
  if (document.getElementById("dashboard") && !document.getElementById("dashboard").hidden && window.afficherDashboard) {
    window.afficherDashboard();
  }
  
  // Mettre à jour les flashcards si nécessaire
  if (window.genererFlashcards && document.getElementById("flashcards") && !document.getElementById("flashcards").hidden) {
    const themeSelect = document.getElementById('flashcardsThemeSelect');
    if (themeSelect && themeSelect.value === 'favoris') {
      window.genererFlashcards();
    }
  }
}

function estFavori(mot) {
  return favoris.includes(mot);
}

function getFavorisCount() {
  return favoris.length;
}

function exporterFavoris() {
  const data = {
    exportDate: new Date().toISOString(),
    source: "Tadaksahak Learning",
    type: "favoris",
    mots: favoris.map(mot => {
      const motComplet = window.vocabulaire?.find(v => v.mot === mot);
      return motComplet || { mot: mot };
    })
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tadaksahak_favoris_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  if (window.showToast) window.showToast("📁 Favoris exportés", "success");
}

function importerFavoris(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.type === 'favoris' && data.mots) {
        favoris = data.mots.map(m => typeof m === 'string' ? m : m.mot);
        sauvegarderFavoris();
        if (window.showToast) window.showToast(`⭐ ${favoris.length} favoris importés`, "success");
        if (window.afficherDashboard) window.afficherDashboard();
      } else {
        throw new Error("Format invalide");
      }
    } catch (err) {
      if (window.showToast) window.showToast("❌ Erreur lors de l'import", "error");
    }
  };
  reader.readAsText(file);
}

// ------------------------------
// MOT DU JOUR (Version améliorée)
// ------------------------------
function getWordOfDay() {
  if (!window.vocabulaire?.length) return null;
  
  const today = new Date().toISOString().slice(0,10);
  let stored = localStorage.getItem('word_of_day');
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        return parsed.word;
      }
    } catch(e) {}
  }
  
  // Éviter les mots déjà vus récemment
  const recentWords = historique.slice(0, 10);
  let availableWords = window.vocabulaire.filter(v => !recentWords.includes(v.mot));
  
  if (availableWords.length === 0) {
    availableWords = window.vocabulaire;
  }
  
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const word = availableWords[randomIndex].mot;
  
  localStorage.setItem('word_of_day', JSON.stringify({ date: today, word: word }));
  return word;
}

function afficherMotDuJour() {
  const container = document.getElementById("wordOfDayContainer");
  if (!container) return;
  
  const mot = getWordOfDay();
  if (!mot) return;
  
  const item = window.vocabulaire?.find(v => v.mot === mot);
  if (!item) return;
  
  let definition = currentLanguage === 'fr' ? item.fr : (currentLanguage === 'en' ? item.en : item.ar);
  
  container.innerHTML = `
    <div class="word-of-day-card">
      <div class="wod-icon">🌟</div>
      <div class="wod-content">
        <div class="wod-label">${window.t('word_of_day') || 'Mot du jour'}</div>
        <div class="wod-word">${escapeHtml(mot)}</div>
        <div class="wod-definition">${escapeHtml(definition)}</div>
        <button class="wod-learn-more" data-mot="${escapeHtml(mot)}">📖 En savoir plus</button>
      </div>
    </div>
  `;
  
  const learnBtn = container.querySelector('.wod-learn-more');
  if (learnBtn) {
    learnBtn.addEventListener('click', () => {
      const mot = learnBtn.dataset.mot;
      const itemTrouve = window.vocabulaire?.find(v => v.mot === mot);
      if (itemTrouve && window.sectionSelector) {
        window.sectionSelector.value = 'dictionnaire';
        window.sectionSelector.dispatchEvent(new Event('change'));
        setTimeout(() => window.afficherMot(itemTrouve), 100);
      }
    });
  }
}

// ------------------------------
// PARAMÈTRES UTILISATEUR
// ------------------------------
function chargerUserSettings() {
  const saved = localStorage.getItem('user_settings');
  if (saved) {
    try {
      userSettings = JSON.parse(saved);
    } catch(e) {}
  }
  
  // Paramètres par défaut
  userSettings = {
    theme: userSettings.theme || 'dark',
    fontSize: userSettings.fontSize || 100,
    fontFamily: userSettings.fontFamily || 'sans',
    highContrast: userSettings.highContrast || false,
    notificationsEnabled: userSettings.notificationsEnabled !== false,
    autoPlayAudio: userSettings.autoPlayAudio || false,
    ...userSettings
  };
}

function sauvegarderUserSettings() {
  localStorage.setItem('user_settings', JSON.stringify(userSettings));
}

function updateUserSetting(key, value) {
  userSettings[key] = value;
  sauvegarderUserSettings();
  
  // Appliquer les changements immédiatement
  if (key === 'theme' && window.setTheme) {
    window.setTheme(value);
  }
  if (key === 'fontSize' && window.applyThemeSettings) {
    window.applyThemeSettings();
  }
  if (key === 'fontFamily' && window.applyThemeSettings) {
    window.applyThemeSettings();
  }
  if (key === 'highContrast' && window.applyThemeSettings) {
    window.applyThemeSettings();
  }
}

function getUserSettings() {
  return { ...userSettings };
}

// ------------------------------
// STATISTIQUES UTILISATEUR
// ------------------------------
function chargerUserStats() {
  const saved = localStorage.getItem('user_stats');
  if (saved) {
    try {
      userStats = JSON.parse(saved);
    } catch(e) {}
  }
  
  userStats = {
    firstVisit: userStats.firstVisit || new Date().toISOString(),
    totalVisits: userStats.totalVisits || 0,
    totalSearches: userStats.totalSearches || 0,
    totalQuizScore: userStats.totalQuizScore || 0,
    totalQuizQuestions: userStats.totalQuizQuestions || 0,
    wordsLearned: userStats.wordsLearned || 0,
    sessionsCompleted: userStats.sessionsCompleted || 0,
    ...userStats
  };
}

function sauvegarderUserStats() {
  localStorage.setItem('user_stats', JSON.stringify(userStats));
}

function mettreAJourStats(categorie, valeur) {
  switch(categorie) {
    case 'visite':
      userStats.totalVisits++;
      break;
    case 'recherche':
      userStats.totalSearches++;
      break;
    case 'quiz':
      userStats.totalQuizQuestions += valeur.questions || 1;
      userStats.totalQuizScore += valeur.score || 0;
      break;
    case 'motAppris':
      userStats.wordsLearned = valeur;
      break;
    case 'session':
      userStats.sessionsCompleted++;
      break;
  }
  sauvegarderUserStats();
}

function getStats() {
  const totalQuizPercent = userStats.totalQuizQuestions > 0 
    ? Math.round((userStats.totalQuizScore / userStats.totalQuizQuestions) * 100) 
    : 0;
  
  return {
    ...userStats,
    totalQuizPercent,
    daysSinceFirstVisit: Math.floor((new Date() - new Date(userStats.firstVisit)) / (1000 * 60 * 60 * 24))
  };
}

// ------------------------------
// SAUVEGARDE DE SESSION
// ------------------------------
function sauvegarderSession() {
  const session = {
    historique: historique,
    favoris: favoris,
    timestamp: Date.now(),
    language: currentLanguage
  };
  localStorage.setItem('session_backup', JSON.stringify(session));
}

function restaurerSession() {
  const saved = localStorage.getItem('session_backup');
  if (saved) {
    try {
      const session = JSON.parse(saved);
      // Vérifier si la session date de moins de 30 jours
      if (Date.now() - session.timestamp < 30 * 24 * 60 * 60 * 1000) {
        historique = session.historique || [];
        favoris = session.favoris || [];
        afficherHistorique();
      }
    } catch(e) {}
  }
}

// ------------------------------
// NOTIFICATIONS
// ------------------------------
function requestNotificationPermission() {
  if ('Notification' in navigator && Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      updateUserSetting('notificationsEnabled', permission === 'granted');
    });
  }
}

function showWordNotification() {
  if (!userSettings.notificationsEnabled) return;
  
  if ('Notification' in navigator && Notification.permission === 'granted') {
    const mot = getWordOfDay();
    if (mot) {
      const item = window.vocabulaire?.find(v => v.mot === mot);
      if (item) {
        const definition = currentLanguage === 'fr' ? item.fr : (currentLanguage === 'en' ? item.en : item.ar);
        new Notification(`📖 Mot du jour : ${mot}`, {
          body: definition,
          icon: 'images/idaksahak_round.png',
          silent: false
        });
      }
    }
  }
}

function showCustomNotification(title, body, icon = 'images/idaksahak_round.png') {
  if (!userSettings.notificationsEnabled) return;
  
  if ('Notification' in navigator && Notification.permission === 'granted') {
    new Notification(title, { body, icon });
  }
}

// ------------------------------
// EXPORT/IMPORT COMPLET
// ------------------------------
function exporterDonnees() {
  const data = {
    exportDate: new Date().toISOString(),
    version: STORAGE_CONFIG.version,
    source: "Tadaksahak Learning",
    historique: historique,
    favoris: favoris.map(mot => {
      const motComplet = window.vocabulaire?.find(v => v.mot === mot);
      return motComplet || { mot: mot };
    }),
    stats: userStats,
    settings: userSettings
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tadaksahak_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  if (window.showToast) window.showToast("📁 Données exportées avec succès", "success");
}

function importerDonnees(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      
      if (data.historique) {
        historique = data.historique;
        localStorage.setItem("historiqueTadakssahak", JSON.stringify(historique));
        afficherHistorique();
      }
      
      if (data.favoris) {
        favoris = data.favoris.map(f => typeof f === 'string' ? f : f.mot);
        sauvegarderFavoris();
      }
      
      if (data.stats) {
        userStats = { ...userStats, ...data.stats };
        sauvegarderUserStats();
      }
      
      if (data.settings) {
        userSettings = { ...userSettings, ...data.settings };
        sauvegarderUserSettings();
        if (window.applyThemeSettings) window.applyThemeSettings();
      }
      
      if (window.showToast) window.showToast("📁 Données importées avec succès", "success");
      if (window.afficherDashboard) window.afficherDashboard();
      
    } catch(err) {
      if (window.showToast) window.showToast("❌ Erreur lors de l'import", "error");
    }
  };
  reader.readAsText(file);
}

// ------------------------------
// NETTOYAGE
// ------------------------------
function nettoyerDonnees() {
  if (confirm("⚠️ Cette action supprimera toutes vos données (historique, favoris, progression).\n\nContinuer ?")) {
    historique = [];
    favoris = [];
    userStats = {
      firstVisit: userStats.firstVisit || new Date().toISOString(),
      totalVisits: userStats.totalVisits || 0,
      totalSearches: 0,
      totalQuizScore: 0,
      totalQuizQuestions: 0,
      wordsLearned: 0,
      sessionsCompleted: 0
    };
    
    localStorage.removeItem("historiqueTadakssahak");
    localStorage.removeItem("favorisTadakssahak");
    localStorage.removeItem("word_of_day");
    localStorage.removeItem("quizProgress");
    localStorage.removeItem("user_stats");
    localStorage.removeItem("session_backup");
    
    sauvegarderUserStats();
    afficherHistorique();
    
    if (window.showToast) window.showToast("🗑️ Toutes vos données ont été effacées", "success");
    if (window.afficherDashboard) window.afficherDashboard();
    if (window.genererFlashcards) window.genererFlashcards();
  }
}

// ------------------------------
// STYLES CSS
// ------------------------------
const STORAGE_STYLES = `
  .historique-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.3rem;
  }
  
  .historique-clear {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    opacity: 0.6;
    transition: opacity var(--transition);
  }
  
  .historique-clear:hover {
    opacity: 1;
  }
  
  .historique-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  
  .mot-historique {
    cursor: pointer;
    color: var(--accent);
    transition: all var(--transition);
    display: inline-block;
    padding: 0.1rem 0.3rem;
    border-radius: var(--radius-sm);
  }
  
  .mot-historique:hover {
    background: rgba(51, 204, 255, 0.2);
    transform: translateY(-1px);
  }
  
  .word-of-day-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(135deg, var(--bg-card), var(--bg-light));
    border-radius: var(--radius-lg);
    padding: 1rem;
    border: 1px solid var(--border);
  }
  
  .wod-icon {
    font-size: 2rem;
  }
  
  .wod-content {
    flex: 1;
  }
  
  .wod-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent);
    margin-bottom: 0.2rem;
  }
  
  .wod-word {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.2rem;
  }
  
  .wod-definition {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }
  
  .wod-learn-more {
    background: none;
    border: none;
    color: var(--primary);
    cursor: pointer;
    font-size: 0.75rem;
    padding: 0;
  }
  
  .wod-learn-more:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 480px) {
    .word-of-day-card {
      flex-direction: column;
      text-align: center;
    }
    
    .historique-header {
      flex-direction: column;
      text-align: center;
    }
    
    .historique-list {
      justify-content: center;
    }
  }
`;

// Injecter les styles
if (!document.getElementById('storage-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'storage-styles';
  styleSheet.textContent = STORAGE_STYLES;
  document.head.appendChild(styleSheet);
}

// ------------------------------
// INITIALISATION
// ------------------------------
function initStorage() {
  chargerHistorique();
  chargerFavoris();
  chargerUserSettings();
  chargerUserStats();
  restaurerSession();
  mettreAJourStats('visite', 1);
  console.log("💾 Module Stockage initialisé - Version premium");
}

// Exporter
window.ajouterHistorique = ajouterHistorique;
window.afficherHistorique = afficherHistorique;
window.chargerHistorique = chargerHistorique;
window.chargerFavoris = chargerFavoris;
window.sauvegarderFavoris = sauvegarderFavoris;
window.basculerFavori = basculerFavori;
window.estFavori = estFavori;
window.getFavorisCount = getFavorisCount;
window.exporterFavoris = exporterFavoris;
window.importerFavoris = importerFavoris;
window.getWordOfDay = getWordOfDay;
window.afficherMotDuJour = afficherMotDuJour;
window.requestNotificationPermission = requestNotificationPermission;
window.showWordNotification = showWordNotification;
window.showCustomNotification = showCustomNotification;
window.chargerUserSettings = chargerUserSettings;
window.sauvegarderUserSettings = sauvegarderUserSettings;
window.updateUserSetting = updateUserSetting;
window.getUserSettings = getUserSettings;
window.chargerUserStats = chargerUserStats;
window.getStats = getStats;
window.exporterDonnees = exporterDonnees;
window.importerDonnees = importerDonnees;
window.nettoyerDonnees = nettoyerDonnees;
window.initStorage = initStorage;

window.historique = historique;
window.favoris = favoris;

// Initialisation automatique
initStorage();

console.log("💾 Module Storage chargé - Version premium avec export/import");
