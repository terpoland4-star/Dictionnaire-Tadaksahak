// ============================================
// MODULE - ÉMISSIONS RADIO
// Version premium avec lecteur audio, favoris, transcriptions, recherche
// ============================================

let emissionsData = null;
let currentAudio = null;
let userEmissionFavorites = [];
let emissionSearchQuery = '';
let emissionCurrentFilter = 'all';
let currentPlayingId = null;

// ------------------------------
// CONFIGURATION
// ------------------------------
const EMISSIONS_CONFIG = {
  showFilters: true,
  showFavorites: true,
  showAudioPlayer: true,
  showSearch: true,
  itemsPerPage: 12,
  autoPlay: false
};

// ------------------------------
// FONCTIONS UTILITAIRES
// ------------------------------
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function parseDuration(duration) {
  if (!duration) return 0;
  const parts = duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  return parseInt(parts[0]) || 0;
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes}min`;
}

// ------------------------------
// BASE DE DONNÉES DE FALLBACK
// ------------------------------
function getFallbackEmissions() {
  return [
    {
      id: 1,
      titre_fr: "La linguistique historique au Sahara",
      titre_en: "Historical Linguistics in the Sahara",
      titre_ar: "اللغويات التاريخية في الصحراء",
      contexte_fr: "Dans cet épisode, Dr. Lameen Souag (CNRS, LACITO) développe l'idée que l'histoire d'une langue ne dépend pas que d'une tradition écrite.",
      contexte_en: "In this episode, Dr. Lameen Souag (CNRS, LACITO) explains that language history does not depend only on written tradition.",
      contexte_ar: "في هذه الحلقة، يشرح الدكتور لمين سواغ (CNRS، LACITO) أن تاريخ اللغة لا يعتمد فقط على التقليد المكتوب.",
      date: "22 janvier 2018",
      orateur: "Dr. Lameen Souag",
      lieu: "CEMA, Oran",
      audio_url: "#",
      duree: "45:32",
      tags: ["linguistique", "sahara", "histoire"],
      versets: [
        {
          numero: 1,
          tadaksahak: "A-ttén Lameen Souag, linguiste au CNRS-LACITO.",
          glose_fr: "Il est arrivé Lameen Souag, linguiste au CNRS-LACITO.",
          traduction_fr: "Nous recevons Lameen Souag, linguiste au CNRS-LACITO.",
          traduction_en: "We welcome Lameen Souag, linguist at CNRS-LACITO.",
          traduction_ar: "نرحب بالدكتور لمين سواغ، لغوي في CNRS-LACITO."
        }
      ],
      favorite: false
    },
    {
      id: 2,
      titre_fr: "Les langues du Sahel",
      titre_en: "Languages of the Sahel",
      titre_ar: "لغات الساحل",
      contexte_fr: "Présentation des différentes familles linguistiques présentes au Sahel.",
      contexte_en: "Presentation of the different language families present in the Sahel.",
      contexte_ar: "تقديم العائلات اللغوية المختلفة الموجودة في الساحل.",
      date: "15 mars 2019",
      orateur: "Dr. Charles Grémont",
      lieu: "Bamako",
      audio_url: "#",
      duree: "52:18",
      tags: ["sahel", "linguistique", "familles linguistiques"],
      versets: [],
      favorite: false
    }
  ];
}

// ------------------------------
// CHARGEMENT DES DONNÉES
// ------------------------------
async function chargerEmissions() {
  try {
    const response = await fetch('data/emission.json');
    if (!response.ok) throw new Error();
    emissionsData = await response.json();
    console.log('🎙️ Émissions chargées');
  } catch(e) {
    console.warn("Erreur chargement émissions, utilisation fallback", e);
    emissionsData = getFallbackEmissions();
  }
  
  chargerFavorisEmissions();
}

function chargerFavorisEmissions() {
  const saved = localStorage.getItem('emission_favorites');
  if (saved) {
    try {
      userEmissionFavorites = JSON.parse(saved);
      if (emissionsData) {
        const emissions = Array.isArray(emissionsData) ? emissionsData : [emissionsData];
        for (const emission of emissions) {
          emission.favorite = userEmissionFavorites.includes(emission.id);
        }
      }
    } catch(e) {}
  }
}

function sauvegarderFavorisEmissions() {
  localStorage.setItem('emission_favorites', JSON.stringify(userEmissionFavorites));
}

function basculerFavoriEmission(emissionId) {
  const id = parseInt(emissionId);
  if (userEmissionFavorites.includes(id)) {
    userEmissionFavorites = userEmissionFavorites.filter(i => i !== id);
    if (window.showToast) window.showToast("⭐ Émission retirée des favoris", "info");
  } else {
    userEmissionFavorites.push(id);
    if (window.showToast) window.showToast("⭐ Émission ajoutée aux favoris", "success");
  }
  sauvegarderFavorisEmissions();
  
  // Mettre à jour l'affichage de tous les boutons
  document.querySelectorAll(`.emission-favorite-btn[data-id="${emissionId}"]`).forEach(btn => {
    btn.textContent = userEmissionFavorites.includes(id) ? '⭐' : '☆';
  });
  
  // Mettre à jour la propriété favorite dans les données
  const emissions = Array.isArray(emissionsData) ? emissionsData : [emissionsData];
  const emission = emissions.find(e => e.id === id);
  if (emission) emission.favorite = userEmissionFavorites.includes(id);
}

function getDurationDisplay(emissionId) {
  if (!emissionsData) return '0:00';
  const emissions = Array.isArray(emissionsData) ? emissionsData : [emissionsData];
  const emission = emissions.find(e => e.id == emissionId);
  return emission?.duree || '0:00';
}

// ------------------------------
// LECTEUR AUDIO
// ------------------------------
function initAudioPlayer(emissionId, audioUrl, titre) {
  const playerContainer = document.getElementById('audioPlayerContainer');
  if (!playerContainer) return;
  
  // Vérifier si l'URL audio est valide
  if (!audioUrl || audioUrl === '#') {
    if (window.showToast) window.showToast("🔊 Fichier audio non disponible", "warning");
    return;
  }
  
  // Si même émission déjà en cours, la mettre en pause
  if (currentPlayingId === emissionId && currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentPlayingId = null;
    playerContainer.innerHTML = '';
    return;
  }
  
  // Arrêter toute lecture en cours
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  
  playerContainer.innerHTML = `
    <div class="audio-player-card">
      <div class="audio-player-header">
        <div class="audio-player-info">
          <span class="audio-player-icon">🎙️</span>
          <span class="audio-player-title">${escapeHtml(titre)}</span>
        </div>
        <button class="audio-player-close" id="closeAudioPlayer">✖</button>
      </div>
      <audio id="emissionAudio" controls autoplay="${EMISSIONS_CONFIG.autoPlay}">
        <source src="${audioUrl}" type="audio/mpeg">
        Votre navigateur ne supporte pas la lecture audio.
      </audio>
      <div class="audio-player-controls">
        <button id="audioPlayPause" class="audio-control">⏸️ Pause</button>
        <button id="audioDownload" class="audio-control">📥 Télécharger</button>
        <span class="audio-duration" id="audioDuration">0:00 / ${getDurationDisplay(emissionId)}</span>
      </div>
    </div>
  `;
  
  const audio = document.getElementById('emissionAudio');
  if (!audio) return;
  
  currentAudio = audio;
  currentPlayingId = emissionId;
  
  // Gestionnaire d'erreur audio
  audio.onerror = () => {
    if (window.showToast) window.showToast("🔊 Erreur de lecture audio", "error");
    playerContainer.innerHTML = '';
    currentPlayingId = null;
    currentAudio = null;
  };
  
  const playPauseBtn = document.getElementById('audioPlayPause');
  const closeBtn = document.getElementById('closeAudioPlayer');
  
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(e => console.warn('Lecture impossible:', e));
        playPauseBtn.textContent = '⏸️ Pause';
      } else {
        audio.pause();
        playPauseBtn.textContent = '▶️ Lecture';
      }
    });
  }
  
  audio.addEventListener('ended', () => {
    currentPlayingId = null;
    if (playPauseBtn) playPauseBtn.textContent = '▶️ Lecture';
  });
  
  audio.addEventListener('timeupdate', () => {
    const durationSpan = document.getElementById('audioDuration');
    if (durationSpan && audio.duration && !isNaN(audio.duration)) {
      const current = formatTime(audio.currentTime);
      const total = formatTime(audio.duration);
      durationSpan.textContent = `${current} / ${total}`;
    }
  });
  
  const downloadBtn = document.getElementById('audioDownload');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `emission_${emissionId}.mp3`;
      link.click();
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      audio.pause();
      currentPlayingId = null;
      currentAudio = null;
      playerContainer.innerHTML = '';
    });
  }
}

// ------------------------------
// PRONONCIATION
// ------------------------------
function speakEmissionText(text) {
  if (!text) return;
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
// AFFICHAGE PRINCIPAL (VERSION ENRICHIE)
// ------------------------------
function afficherEmissionsPremium() {
  const container = document.getElementById("emissionsContainer");
  if (!container) return;
  
  if (!emissionsData) {
    container.innerHTML = `<div class="info-message">
      <p>🎙️ Aucune émission disponible.</p>
      <button onclick="chargerEmissions()" class="btn-small">🔄 Recharger</button>
    </div>`;
    return;
  }
  
  const emissions = Array.isArray(emissionsData) ? emissionsData : [emissionsData];
  
  // Filtrer par recherche
  let filteredEmissions = [...emissions];
  if (emissionSearchQuery) {
    const query = emissionSearchQuery.toLowerCase();
    filteredEmissions = filteredEmissions.filter(e => {
      const tagsMatch = e.tags ? e.tags.some(t => t.toLowerCase().includes(query)) : false;
      return (e.titre_fr && e.titre_fr.toLowerCase().includes(query)) ||
             (e.titre_en && e.titre_en.toLowerCase().includes(query)) ||
             (e.titre_ar && e.titre_ar.toLowerCase().includes(query)) ||
             (e.orateur && e.orateur.toLowerCase().includes(query)) ||
             (e.lieu && e.lieu.toLowerCase().includes(query)) ||
             (e.contexte_fr && e.contexte_fr.toLowerCase().includes(query)) ||
             tagsMatch;
    });
  }
  
  // Filtrer par favoris
  if (emissionCurrentFilter === 'favorites') {
    filteredEmissions = filteredEmissions.filter(e => userEmissionFavorites.includes(e.id));
  }
  
  const totalMots = filteredEmissions.reduce((acc, e) => acc + (e.versets?.length || 0), 0);
  const totalDuree = filteredEmissions.reduce((acc, e) => acc + parseDuration(e.duree), 0);
  
  let html = `
    <div class="emissions-premium-header">
      <div class="premium-icon">🎙️</div>
      <h3>${window.t ? window.t('emissions_title') : 'Émissions radio'}</h3>
      <p>Découvrez les archives radiophoniques sur la langue et la culture Idaksahak</p>
      
      ${EMISSIONS_CONFIG.showSearch ? `
      <div class="emissions-search-bar">
        <input type="text" id="emissionSearch" placeholder="🔍 Rechercher une émission (titre, orateur, lieu, mot-clé)..." class="emission-search-input">
        <button id="clearEmissionSearch" class="search-clear-btn" style="display: none;">✖</button>
      </div>
      ` : ''}
      
      ${EMISSIONS_CONFIG.showFilters ? `
      <div class="emissions-filters">
        <button class="filter-btn active" data-filter="all">📻 Toutes</button>
        <button class="filter-btn" data-filter="favorites">⭐ Favoris</button>
      </div>
      ` : ''}
      
      <div class="emissions-stats">
        <span class="stat">🎙️ ${filteredEmissions.length} émissions</span>
        <span class="stat">📝 ${totalMots} versets</span>
        <span class="stat">⏱️ ${formatDuration(totalDuree)} total</span>
        <span class="stat">⭐ ${userEmissionFavorites.length} favoris</span>
      </div>
    </div>
    
    <div id="audioPlayerContainer" class="audio-player-container"></div>
    
    <div class="emissions-premium-grid">
  `;
  
  for (const emission of filteredEmissions) {
    let titre = currentLanguage === 'fr' ? emission.titre_fr : (currentLanguage === 'en' ? emission.titre_en : emission.titre_ar);
    let contexte = currentLanguage === 'fr' ? emission.contexte_fr : (currentLanguage === 'en' ? emission.contexte_en : emission.contexte_ar);
    const isFavorite = userEmissionFavorites.includes(emission.id);
    const hasAudio = emission.audio_url && emission.audio_url !== '#';
    const versetsCount = emission.versets?.length || 0;
    
    html += `
      <div class="emission-premium-card" data-id="${emission.id}">
        <div class="emission-card-header">
          <div class="emission-icon">🎙️</div>
          <div class="emission-info">
            <h4>${escapeHtml(titre)}</h4>
            <div class="emission-meta-premium">
              <span>📅 ${emission.date || '?'}</span>
              <span>🗣️ ${escapeHtml(emission.orateur || 'Inconnu')}</span>
              <span>📍 ${escapeHtml(emission.lieu || '?')}</span>
              ${emission.duree ? `<span>⏱️ ${emission.duree}</span>` : ''}
              <span>📝 ${versetsCount} versets</span>
            </div>
          </div>
          <button class="emission-favorite-btn" data-id="${emission.id}">${isFavorite ? '⭐' : '☆'}</button>
        </div>
        
        <div class="emission-tags">
          ${emission.tags ? emission.tags.map(tag => `<span class="emission-tag">#${escapeHtml(tag)}</span>`).join('') : ''}
        </div>
        
        <p class="emission-contexte-premium">${escapeHtml(contexte || '')}</p>
        
        <div class="emission-actions">
          ${hasAudio ? `<button class="btn-emission-audio" data-id="${emission.id}" data-audio="${emission.audio_url}" data-title="${escapeHtml(titre)}">🎧 Écouter l'émission</button>` : ''}
          <button class="btn-emission-premium" data-emission-id="${emission.id}">
            📖 Lire la transcription (${versetsCount} versets)
          </button>
        </div>
        
        <div class="emission-transcription" id="emissionTrans-${emission.id}" style="display: none;">
          <div class="transcription-header">
            <span class="transcription-title">📝 Transcription - ${escapeHtml(titre)}</span>
            <button class="transcription-close" data-id="${emission.id}">✖</button>
          </div>
          <div class="transcription-versets">
    `;
    
    if (emission.versets && emission.versets.length) {
      for (let i = 0; i < emission.versets.length; i++) {
        const verset = emission.versets[i];
        html += `
          <div class="verset-premium" data-verset="${i}">
            <div class="verset-header">
              <span class="verset-num">${verset.numero || i + 1}</span>
              <button class="verset-play" data-text="${escapeHtml(verset.tadaksahak || '')}">🔊</button>
            </div>
            <div class="verset-tad-premium"><strong>${escapeHtml(verset.tadaksahak || '')}</strong></div>
            <div class="verset-gloss-premium">${escapeHtml(verset.glose_fr || '')}</div>
            <div class="verset-trans-premium">${escapeHtml(currentLanguage === 'fr' ? verset.traduction_fr : (currentLanguage === 'en' ? verset.traduction_en : (verset.traduction_ar || verset.traduction_fr)))}</div>
            <div class="verset-actions">
              <button class="verset-copy" data-text="${escapeHtml(verset.tadaksahak || '')}">📋 Copier</button>
              <button class="verset-translate" data-tad="${escapeHtml(verset.tadaksahak || '')}">🌍 Traduire</button>
            </div>
          </div>
        `;
      }
    } else {
      html += `<p class="no-transcript">📝 Transcription à venir.</p>`;
    }
    
    html += `
          </div>
        </div>
      </div>
    `;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  
  // Initialiser les interactions
  initialiserInteractionsEmissions();
}

function initialiserInteractionsEmissions() {
  // Boutons favoris
  document.querySelectorAll('.emission-favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      basculerFavoriEmission(id);
      btn.textContent = userEmissionFavorites.includes(id) ? '⭐' : '☆';
    });
  });
  
  // Boutons audio
  document.querySelectorAll('.btn-emission-audio').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const audioUrl = btn.dataset.audio;
      const title = btn.dataset.title;
      initAudioPlayer(id, audioUrl, title);
    });
  });
  
  // Boutons de transcription
  document.querySelectorAll('.btn-emission-premium').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.emissionId;
      const transcriptDiv = document.getElementById(`emissionTrans-${id}`);
      if (transcriptDiv.style.display === 'none') {
        // Fermer toutes les autres transcriptions
        document.querySelectorAll('.emission-transcription').forEach(div => {
          div.style.display = 'none';
        });
        // Réinitialiser les autres boutons
        document.querySelectorAll('.btn-emission-premium').forEach(b => {
          if (b.dataset.emissionId != id) b.textContent = '📖 Lire la transcription';
        });
        transcriptDiv.style.display = 'block';
        btn.textContent = '📖 Masquer la transcription';
      } else {
        transcriptDiv.style.display = 'none';
        btn.textContent = '📖 Lire la transcription';
      }
    });
  });
  
  // Fermeture des transcriptions
  document.querySelectorAll('.transcription-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const transcriptDiv = document.getElementById(`emissionTrans-${id}`);
      const mainBtn = document.querySelector(`.btn-emission-premium[data-emission-id="${id}"]`);
      if (transcriptDiv) transcriptDiv.style.display = 'none';
      if (mainBtn) mainBtn.textContent = '📖 Lire la transcription';
    });
  });
  
  // Prononciation des versets
  document.querySelectorAll('.verset-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = btn.dataset.text;
      speakEmissionText(text);
    });
  });
  
  // Copie des versets
  document.querySelectorAll('.verset-copy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = btn.dataset.text;
      navigator.clipboard.writeText(text);
      if (window.showToast) window.showToast("📋 Texte copié", "success");
    });
  });
  
  // Traduction des versets
  document.querySelectorAll('.verset-translate').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const tad = btn.dataset.tad;
      const motTrouve = window.vocabulaire?.find(v => v.mot === tad);
      if (motTrouve && window.sectionSelector) {
        window.sectionSelector.value = 'dictionnaire';
        window.sectionSelector.dispatchEvent(new Event('change'));
        setTimeout(() => window.afficherMot(motTrouve), 100);
      } else if (window.showToast) {
        window.showToast(`🔍 Mot "${tad}" non trouvé dans le dictionnaire`, "info");
      }
    });
  });
  
  // Filtres
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      emissionCurrentFilter = btn.dataset.filter;
      afficherEmissionsPremium();
    });
  });
  
  // Recherche
  const searchInput = document.getElementById('emissionSearch');
  const clearBtn = document.getElementById('clearEmissionSearch');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      emissionSearchQuery = e.target.value.trim();
      if (clearBtn) clearBtn.style.display = emissionSearchQuery ? 'block' : 'none';
      afficherEmissionsPremium();
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      emissionSearchQuery = '';
      clearBtn.style.display = 'none';
      afficherEmissionsPremium();
      searchInput.focus();
    });
  }
}

// ------------------------------
// STYLES CSS
// ------------------------------
const EMISSIONS_STYLES = `
  .emissions-premium-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, var(--bg-card), var(--bg-light));
    border-radius: var(--radius-2xl);
  }
  
  .emissions-premium-header .premium-icon {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
  
  .emissions-premium-header h3 {
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }
  
  .emissions-search-bar {
    position: relative;
    max-width: 500px;
    margin: 1rem auto;
  }
  
  .emission-search-input {
    width: 100%;
    padding: 0.8rem 2.5rem 0.8rem 1rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
    font-size: 0.9rem;
  }
  
  .search-clear-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 1rem;
  }
  
  .emissions-filters {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
  
  .filter-btn {
    padding: 0.4rem 1rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    background: var(--bg-light);
    color: var(--text);
    cursor: pointer;
    transition: all var(--transition);
  }
  
  .filter-btn:hover, .filter-btn.active {
    background: var(--gradient-primary);
    color: white;
  }
  
  .emissions-stats {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  
  .emissions-stats .stat {
    background: var(--bg-card);
    padding: 0.3rem 1rem;
    border-radius: var(--radius-full);
    font-size: 0.8rem;
    border: 1px solid var(--border);
  }
  
  .audio-player-container {
    margin-bottom: 2rem;
  }
  
  .audio-player-card {
    background: linear-gradient(135deg, var(--primary-dark), var(--primary));
    border-radius: var(--radius-lg);
    padding: 1rem;
    color: white;
  }
  
  .audio-player-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  
  .audio-player-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .audio-player-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
  }
  
  #emissionAudio {
    width: 100%;
    margin-bottom: 0.8rem;
    border-radius: var(--radius-md);
  }
  
  .audio-player-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .audio-control {
    padding: 0.3rem 0.8rem;
    border-radius: var(--radius-full);
    border: none;
    background: rgba(255,255,255,0.2);
    color: white;
    cursor: pointer;
    transition: all var(--transition);
  }
  
  .audio-control:hover {
    background: rgba(255,255,255,0.3);
  }
  
  .audio-duration {
    font-size: 0.8rem;
    opacity: 0.8;
  }
  
  .emissions-premium-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    gap: 1.5rem;
  }
  
  .emission-premium-card {
    background: var(--bg-card);
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid var(--border);
    transition: all var(--transition);
  }
  
  .emission-premium-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    border-color: var(--accent);
  }
  
  .emission-card-header {
    background: linear-gradient(135deg, var(--primary-dark), var(--primary));
    padding: 1rem;
    display: flex;
    gap: 1rem;
    position: relative;
  }
  
  .emission-icon {
    font-size: 2rem;
  }
  
  .emission-info {
    flex: 1;
  }
  
  .emission-info h4 {
    color: white;
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
  
  .emission-meta-premium {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    font-size: 0.65rem;
    color: rgba(255,255,255,0.7);
  }
  
  .emission-favorite-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: white;
    text-shadow: 0 0 2px rgba(0,0,0,0.5);
  }
  
  .emission-tags {
    padding: 0.5rem 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    background: var(--bg-light);
    border-bottom: 1px solid var(--border);
  }
  
  .emission-tag {
    font-size: 0.65rem;
    background: rgba(51, 204, 255, 0.15);
    color: var(--accent);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
  }
  
  .emission-contexte-premium {
    padding: 1rem;
    font-size: 0.85rem;
    color: var(--text);
    line-height: 1.6;
  }
  
  .emission-actions {
    display: flex;
    gap: 0.5rem;
    padding: 0 1rem 1rem 1rem;
  }
  
  .btn-emission-audio, .btn-emission-premium {
    flex: 1;
    padding: 0.6rem;
    border-radius: var(--radius-md);
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all var(--transition);
  }
  
  .btn-emission-audio {
    background: var(--success);
    color: white;
  }
  
  .btn-emission-audio:hover {
    background: var(--success);
    opacity: 0.8;
  }
  
  .btn-emission-premium {
    background: var(--bg-light);
    border: 1px solid var(--border);
    color: var(--text);
  }
  
  .btn-emission-premium:hover {
    background: var(--primary);
    color: white;
  }
  
  .emission-transcription {
    border-top: 1px solid var(--border);
    background: var(--bg-light);
    max-height: 500px;
    overflow-y: auto;
  }
  
  .transcription-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
  }
  
  .transcription-title {
    font-weight: 600;
    color: var(--accent);
  }
  
  .transcription-close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: var(--text-muted);
  }
  
  .verset-premium {
    padding: 1rem;
    border-bottom: 1px solid var(--border);
  }
  
  .verset-premium:hover {
    background: rgba(51, 204, 255, 0.05);
  }
  
  .verset-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .verset-num {
    font-size: 0.7rem;
    color: var(--accent);
    font-weight: 600;
  }
  
  .verset-play {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    opacity: 0.6;
  }
  
  .verset-play:hover {
    opacity: 1;
  }
  
  .verset-tad-premium {
    font-size: 1rem;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 0.3rem;
    font-family: monospace;
  }
  
  .verset-gloss-premium {
    font-size: 0.75rem;
    font-style: italic;
    color: var(--text-muted);
    margin-bottom: 0.3rem;
  }
  
  .verset-trans-premium {
    font-size: 0.85rem;
    color: var(--text);
    margin-bottom: 0.5rem;
  }
  
  .verset-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .verset-copy, .verset-translate {
    padding: 0.2rem 0.5rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    background: var(--bg);
    cursor: pointer;
    font-size: 0.7rem;
  }
  
  .verset-copy:hover, .verset-translate:hover {
    background: var(--primary);
    color: white;
  }
  
  .no-transcript {
    padding: 2rem;
    text-align: center;
    color: var(--text-muted);
  }
  
  @media (max-width: 768px) {
    .emissions-premium-grid {
      grid-template-columns: 1fr;
    }
    
    .emission-actions {
      flex-direction: column;
    }
    
    .emission-meta-premium {
      flex-direction: column;
      gap: 0.3rem;
    }
    
    .audio-player-controls {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

// ------------------------------
// INITIALISATION
// ------------------------------
function initEmissionsModule() {
  // Injecter les styles
  if (!document.getElementById('emissions-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'emissions-styles';
    styleSheet.textContent = EMISSIONS_STYLES;
    document.head.appendChild(styleSheet);
  }
  
  console.log("🎙️ Module Émissions Premium prêt");
}

// ------------------------------
// EXPORT
// ------------------------------
window.emissionsData = emissionsData;
window.chargerEmissions = chargerEmissions;
window.afficherEmissionsPremium = afficherEmissionsPremium;
window.basculerFavoriEmission = basculerFavoriEmission;
window.initAudioPlayer = initAudioPlayer;
window.speakEmissionText = speakEmissionText;
window.initEmissionsModule = initEmissionsModule;

// Initialisation automatique
initEmissionsModule();

console.log("🎙️ Module Émissions Premium chargé - Version avec lecteur audio, favoris et recherche");
