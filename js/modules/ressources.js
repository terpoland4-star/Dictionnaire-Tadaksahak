// ============================================
// MODULE - RESSOURCES ACADÉMIQUES
// Podcasts, articles, bibliographie, vidéos, conférences
// Version premium avec filtres, favoris, téléchargements
// ============================================

let userResourceFavorites = [];
let resourceSearchQuery = '';
let resourceCurrentFilter = 'all';

// ------------------------------
// CONFIGURATION
// ------------------------------
const RESOURCES_CONFIG = {
  showFilters: true,
  showFavorites: true,
  showDownloads: true,
  itemsPerPage: 10,
  enableSearch: true
};

// ------------------------------
// BASE DE DONNÉES DES RESSOURCES
// ------------------------------
const RESOURCES_DB = {
  podcasts: [
    {
      id: "podcast_001",
      titre: "La linguistique historique au Sahara",
      titre_en: "Historical Linguistics in the Sahara",
      titre_ar: "اللغويات التاريخية في الصحراء",
      speaker: "Dr. Lameen Souag",
      institution: "CNRS, LACITO",
      date: "2018-01-22",
      duration: "45:32",
      url: "https://www.themaghribpodcast.com/2018/01/la-linguistique-historique-au-sahara.html",
      description: "Dans cet épisode, Dr. Lameen Souag développe l'idée que l'histoire d'une langue ne dépend pas que d'une tradition écrite. La linguistique nous fournit des outils pour reconstruire les changements qu'elle a subi et les mouvements de ses locuteurs.",
      description_en: "In this episode, Dr. Lameen Souag explains that language history does not depend only on written tradition.",
      description_ar: "في هذه الحلقة، يشرح الدكتور لمين سواغ أن تاريخ اللغة لا يعتمد فقط على التقليد المكتوب.",
      tags: ["linguistique", "sahara", "berbère", "histoire"],
      image: "images/podcast/souag.jpg",
      transcript: true,
      favorite: false
    },
    {
      id: "podcast_002",
      titre: "Les langues berbères du Sahara",
      titre_en: "Berber Languages of the Sahara",
      titre_ar: "اللغات البربرية في الصحراء",
      speaker: "Dr. Maarten Kossmann",
      institution: "Universiteit Leiden",
      date: "2019-06-15",
      duration: "52:18",
      url: "#",
      description: "Présentation des différentes langues berbères parlées au Sahara, leurs origines et leurs évolutions.",
      tags: ["berbère", "linguistique", "sahara"],
      image: "images/podcast/kossmann.jpg",
      transcript: false,
      favorite: false
    }
  ],
  articles: [
    {
      id: "article_001",
      titre: "The Tadaksahak language: a Zénaga variety of the Malian Sahara",
      auteur: "Christiansen-Bolli, R.",
      annee: 2010,
      url: "#",
      doi: "10.xxxx/xxxxx",
      description: "Étude descriptive du tadaksahak, sa phonologie, sa morphologie et sa syntaxe. Une référence incontournable pour la documentation de cette langue.",
      tags: ["Tadaksahak", "Grammaire", "Description"],
      type: "article",
      source: "Köln: Rüdiger Köppe",
      pages: "320",
      favorite: false
    },
    {
      id: "article_002",
      titre: "Relative Clauses in Tadaksahak",
      auteur: "Christiansen, N. & Levinsohn, S.",
      annee: 2003,
      url: "#",
      doi: "10.xxxx/xxxxx",
      description: "Analyse des trois stratégies de relativisation en tadaksahak : le pronom relatif 'ayo/ayondo', la gap strategy et le marqueur 'sa'.",
      tags: ["Tadaksahak", "Syntaxe", "Relatives"],
      type: "article",
      source: "SIL Electronic Working Papers",
      pages: "28",
      favorite: false
    },
    {
      id: "article_003",
      titre: "A Grammar of Tamashek (Tuareg of Mali)",
      auteur: "Heath, J.",
      annee: 2005,
      url: "#",
      doi: "10.xxxx/xxxxx",
      description: "Grammaire de référence du touareg, langue sœur du tadaksahak, avec une analyse détaillée de la morphologie verbale.",
      tags: ["Touareg", "Grammaire", "Tamashek"],
      type: "book",
      source: "Mouton de Gruyter",
      pages: "745",
      favorite: false
    },
    {
      id: "article_004",
      titre: "The Berber language",
      auteur: "Kossmann, M.",
      annee: 2011,
      url: "#",
      doi: "10.xxxx/xxxxx",
      description: "Aperçu des langues berbères, y compris les parlers zénatiques comme le tadaksahak. Une introduction complète à la famille berbère.",
      tags: ["Berbère", "Linguistique", "Panorama"],
      type: "chapter",
      source: "Oxford University Press",
      pages: "18",
      favorite: false
    },
    {
      id: "article_005",
      titre: "Non-Tuareg Berber and the Genesis of Nomadic Northern Songhay",
      auteur: "Souag, L.",
      annee: 2015,
      url: "#",
      doi: "10.1515/jall-2015-0008",
      description: "Étude des contacts entre berbère et songhay au Sahara, avec des implications pour l'histoire du tadaksahak.",
      tags: ["Songhay", "Contacts linguistiques", "Berbère"],
      type: "article",
      source: "Journal of African Languages and Linguistics",
      pages: "23",
      favorite: false
    },
    {
      id: "article_006",
      titre: "Dans le piège des offres de violence. Concurrences, protections et représailles dans la région de Ménaka (Nord-Mali, 2000-2018)",
      auteur: "Grémont, C.",
      annee: 2019,
      url: "https://shs.cairn.info/revue-herodote-2019-1-page-43",
      doi: "10.3917/her.172.0043",
      description: "Analyse des dynamiques de violence, des concurrences intercommunautaires et des stratégies de protection dans la région de Ménaka, avec un focus sur les Dawsahaq/Idaksahak.",
      tags: ["Idaksahak", "Ménaka", "Histoire", "Anthropologie"],
      type: "article",
      source: "Hérodote, n°172",
      pages: "20",
      favorite: false
    }
  ],
  videos: [
    {
      id: "video_001",
      titre: "Introduction au tadaksahak",
      speaker: "Hamadine Ag Moctar",
      date: "2024-01-15",
      duration: "15:30",
      url: "#",
      description: "Présentation de la langue tadaksahak, son histoire et ses particularités.",
      tags: ["Tadaksahak", "Introduction"],
      favorite: false
    }
  ],
  conferences: [
    {
      id: "conf_001",
      titre: "Les langues menacées du Sahel",
      speaker: "Dr. Lameen Souag",
      date: "2022-11-10",
      duration: "1:15:00",
      url: "#",
      description: "Conférence sur la documentation des langues menacées au Sahel, dont le tadaksahak.",
      tags: ["Langues menacées", "Documentation"],
      favorite: false
    }
  ]
};

// ------------------------------
// BIBLIOGRAPHIE ÉTENDUE
// ------------------------------
const EXTENDED_BIBLIOGRAPHY = {
  linguistique: [
    "Brugnatelli, Vermondo. 2011. \"Some grammatical features of Ancient Eastern Berber (the language of the Mudawwana).\" In Luca Busetto, Roberto Sottile, Livia Tonelli, Mauro Tosco (Eds.), He Bitaney Lagge: Studies in African Linguistics in honour of Marcello Lamberti. Milano: Qu.a.s.a.r.",
    "Cohen, David et Catherine Taine-Cheikh. 2000. \"A propos du Zénaga: Vocalisme et morphologie verbale en berbère.\" Bull. de la SLP, XCV, fasc. 1: 269-322.",
    "Kossmann, Maarten. 2001. \"The origin of the glottal stop in Zenaga and its reflexes in the other Berber languages.\" Afrika und Übersee 84: 61-100.",
    "Kossmann, Maarten. 1999. Essai sur la phonologie du proto-berbère. Köln: Rüdiger Köppe.",
    "Souag, Lameen. 2015. \"Non-Tuareg Berber and the Genesis of Nomadic Northern Songhay.\" Journal of African Languages and Linguistics. 36(1): 121-143.",
    "Souag, Lameen and Marijn van Putten. 2016. \"The origin of mid vowels in Siwi.\" Studies in African Linguistics. 45(1&2): 189-208.",
    "Christiansen-Bolli, Regula. 2010. \"A Grammar of Tadaksahak, a Northern Songhay language.\" Köln: Rüdiger Köppe.",
    "Christiansen, Niels et Stephen Levinsohn. 2003. \"Relative Clauses in Tadaksahak.\" SIL Electronic Working Papers."
  ],
  anthropologie: [
    "Grémont, Charles. 2019. \"Dans le piège des offres de violence. Concurrences, protections et représailles dans la région de Ménaka (Nord-Mali, 2000-2018).\" Hérodote, n°172, p. 43-62.",
    "Boesen, E. 2009. \"Organisation sociopolitique et territorialité dans le monde nomade du Niger. Le cas des Fulbe-Wodaabe.\" In Caratini S. (dir.), Du rapport colonial au rapport de développement. L'Harmattan, Paris, p. 67-97.",
    "Bonfiglioli, A. 1988. Dudal. Histoire de famille et histoire de troupeau chez un groupe de Wodaabe du Niger. Cambridge University Press."
  ],
  histoire: [
    "Aksar M. et Dembele D. 2018. \"Frontière Mali-Niger : la communauté peule dans le tourbillon djihadiste.\" L'Événement (Niger) et Dépêches du Mali (Mali), 8 novembre.",
    "Koning, R. 2018. \"Ménaka: le MSA se désagrège.\" Journal du Mali, 19 octobre."
  ]
};

// ------------------------------
// CHARGEMENT DES FAVORIS
// ------------------------------
function chargerFavorisRessources() {
  const saved = localStorage.getItem('resource_favorites');
  if (saved) {
    try {
      userResourceFavorites = JSON.parse(saved);
      // Mettre à jour les favoris dans la base
      for (const podcast of RESOURCES_DB.podcasts) {
        podcast.favorite = userResourceFavorites.includes(podcast.id);
      }
      for (const article of RESOURCES_DB.articles) {
        article.favorite = userResourceFavorites.includes(article.id);
      }
    } catch(e) {}
  }
}

function sauvegarderFavorisRessources() {
  localStorage.setItem('resource_favorites', JSON.stringify(userResourceFavorites));
}

function basculerFavoriResource(resourceId, type) {
  if (userResourceFavorites.includes(resourceId)) {
    userResourceFavorites = userResourceFavorites.filter(id => id !== resourceId);
    if (window.showToast) window.showToast("⭐ Ressource retirée des favoris", "info");
  } else {
    userResourceFavorites.push(resourceId);
    if (window.showToast) window.showToast("⭐ Ressource ajoutée aux favoris", "success");
  }
  sauvegarderFavorisRessources();
  
  // Mettre à jour l'affichage
  const btn = document.querySelector(`.favorite-btn[data-id="${resourceId}"]`);
  if (btn) {
    btn.textContent = userResourceFavorites.includes(resourceId) ? '⭐' : '☆';
  }
}

// ------------------------------
// AFFICHAGE PRINCIPAL (VERSION ENRICHIE)
// ------------------------------
function afficherRessources() {
  const container = document.getElementById("ressourcesContainer");
  if (!container) return;
  
  chargerFavorisRessources();
  
  let html = `
    <div class="ressources-premium-header">
      <div class="premium-icon">📚</div>
      <h2>Ressources académiques</h2>
      <p>Découvrez des podcasts, articles, vidéos et références sur les langues et l'histoire du Sahara</p>
      
      ${RESOURCES_CONFIG.enableSearch ? `
      <div class="ressources-search-bar">
        <input type="text" id="resourceSearch" placeholder="🔍 Rechercher une ressource (titre, auteur, mot-clé)..." class="resource-search-input">
        <button id="clearResourceSearch" class="search-clear-btn" style="display: none;">✖</button>
      </div>
      ` : ''}
      
      ${RESOURCES_CONFIG.showFilters ? `
      <div class="ressources-filters">
        <button class="filter-btn active" data-filter="all">📚 Toutes</button>
        <button class="filter-btn" data-filter="podcast">🎙️ Podcasts</button>
        <button class="filter-btn" data-filter="article">📖 Articles</button>
        <button class="filter-btn" data-filter="video">🎥 Vidéos</button>
        <button class="filter-btn" data-filter="conf">🎤 Conférences</button>
        <button class="filter-btn" data-filter="favorites">⭐ Favoris</button>
      </div>
      ` : ''}
      
      <div class="ressources-stats">
        <span class="stat">🎙️ ${RESOURCES_DB.podcasts.length} podcasts</span>
        <span class="stat">📖 ${RESOURCES_DB.articles.length} articles</span>
        <span class="stat">🎥 ${RESOURCES_DB.videos.length} vidéos</span>
        <span class="stat">⭐ ${userResourceFavorites.length} favoris</span>
      </div>
    </div>
    
    <div id="resourcesContent" class="resources-content">
      <div class="loading-spinner">📚 Chargement des ressources...</div>
    </div>
    
    <div class="ressources-bibliography-section">
      <h3>📚 Bibliographie complète</h3>
      <div class="bibliography-tabs">
        <button class="bib-tab active" data-cat="linguistique">🔤 Linguistique</button>
        <button class="bib-tab" data-cat="anthropologie">👥 Anthropologie</button>
        <button class="bib-tab" data-cat="histoire">📖 Histoire</button>
      </div>
      <div id="bibliographyContent" class="bibliography-content"></div>
    </div>
  `;
  
  container.innerHTML = html;
  
  // Afficher toutes les ressources par défaut
  afficherToutesRessources();
  afficherBibliographie('linguistique');
  
  // Initialiser les interactions
  initialiserInteractionsRessources();
}

function afficherToutesRessources() {
  const container = document.getElementById("resourcesContent");
  if (!container) return;
  
  let allResources = [];
  
  // Ajouter les podcasts
  for (const podcast of RESOURCES_DB.podcasts) {
    allResources.push({ ...podcast, type: 'podcast', typeIcon: '🎙️', typeLabel: 'Podcast' });
  }
  
  // Ajouter les articles
  for (const article of RESOURCES_DB.articles) {
    allResources.push({ ...article, type: 'article', typeIcon: '📖', typeLabel: 'Article' });
  }
  
  // Ajouter les vidéos
  for (const video of RESOURCES_DB.videos) {
    allResources.push({ ...video, type: 'video', typeIcon: '🎥', typeLabel: 'Vidéo' });
  }
  
  // Ajouter les conférences
  for (const conf of RESOURCES_DB.conferences) {
    allResources.push({ ...conf, type: 'conference', typeIcon: '🎤', typeLabel: 'Conférence' });
  }
  
  // Appliquer le filtre de recherche
  if (resourceSearchQuery) {
    const query = resourceSearchQuery.toLowerCase();
    allResources = allResources.filter(r => 
      (r.titre && r.titre.toLowerCase().includes(query)) ||
      (r.auteur && r.auteur.toLowerCase().includes(query)) ||
      (r.speaker && r.speaker.toLowerCase().includes(query)) ||
      (r.description && r.description.toLowerCase().includes(query)) ||
      (r.tags && r.tags.some(t => t.toLowerCase().includes(query)))
    );
  }
  
  // Appliquer le filtre de catégorie
  if (resourceCurrentFilter !== 'all') {
    if (resourceCurrentFilter === 'favorites') {
      allResources = allResources.filter(r => userResourceFavorites.includes(r.id));
    } else {
      allResources = allResources.filter(r => r.type === resourceCurrentFilter);
    }
  }
  
  if (allResources.length === 0) {
    container.innerHTML = `<div class="info-message">🔍 Aucune ressource trouvée.</div>`;
    return;
  }
  
  let html = `<div class="resources-grid">`;
  
  for (const resource of allResources) {
    const isFavorite = userResourceFavorites.includes(resource.id);
    const titre = currentLanguage === 'fr' ? resource.titre : (currentLanguage === 'en' ? resource.titre_en : resource.titre_ar);
    const description = currentLanguage === 'fr' ? resource.description : (currentLanguage === 'en' ? resource.description_en : resource.description_ar);
    
    html += `
      <div class="resource-card" data-id="${resource.id}" data-type="${resource.type}">
        <div class="resource-header">
          <div class="resource-type">
            <span class="type-icon">${resource.typeIcon}</span>
            <span class="type-label">${resource.typeLabel}</span>
          </div>
          <button class="favorite-btn" data-id="${resource.id}" data-type="${resource.type}">${isFavorite ? '⭐' : '☆'}</button>
        </div>
        
        <h4 class="resource-title">${escapeHtml(titre || resource.titre)}</h4>
        
        <div class="resource-meta">
          ${resource.auteur ? `<span class="resource-author">✍️ ${escapeHtml(resource.auteur)}</span>` : ''}
          ${resource.speaker ? `<span class="resource-speaker">🎙️ ${escapeHtml(resource.speaker)}</span>` : ''}
          ${resource.institution ? `<span class="resource-institution">🏛️ ${escapeHtml(resource.institution)}</span>` : ''}
          ${resource.date ? `<span class="resource-date">📅 ${formatDate(resource.date)}</span>` : ''}
          ${resource.annee ? `<span class="resource-year">📅 ${resource.annee}</span>` : ''}
          ${resource.duration ? `<span class="resource-duration">⏱️ ${resource.duration}</span>` : ''}
          ${resource.pages ? `<span class="resource-pages">📄 ${resource.pages} pages</span>` : ''}
        </div>
        
        <p class="resource-description">${escapeHtml(description || resource.description).substring(0, 200)}${(description || resource.description).length > 200 ? '…' : ''}</p>
        
        <div class="resource-tags">
          ${resource.tags.map(tag => `<span class="resource-tag">#${escapeHtml(tag)}</span>`).join('')}
        </div>
        
        <div class="resource-actions">
          <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-link">🔗 Accéder à la ressource</a>
          ${resource.doi ? `<span class="resource-doi">DOI: ${resource.doi}</span>` : ''}
          ${resource.transcript ? `<button class="resource-transcript-btn" data-id="${resource.id}">📄 Voir la transcription</button>` : ''}
        </div>
      </div>
    `;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  
  // Initialiser les boutons favoris
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const type = btn.dataset.type;
      basculerFavoriResource(id, type);
      btn.textContent = userResourceFavorites.includes(id) ? '⭐' : '☆';
    });
  });
  
  // Initialiser les boutons de transcription
  document.querySelectorAll('.resource-transcript-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      afficherTranscription(id);
    });
  });
}

function afficherTranscription(resourceId) {
  // Rechercher la transcription correspondante
  let transcript = "";
  let title = "";
  
  for (const podcast of RESOURCES_DB.podcasts) {
    if (podcast.id === resourceId && podcast.transcript) {
      title = podcast.titre;
      transcript = "📝 Transcription complète disponible dans l'épisode original.\n\nRésumé : " + podcast.description;
      break;
    }
  }
  
  const modalHtml = `
    <div id="transcriptModal" class="modal">
      <div class="modal-content transcript-content">
        <span class="modal-close">&times;</span>
        <h2>📄 Transcription - ${escapeHtml(title)}</h2>
        <div class="transcript-text">
          <p>${escapeHtml(transcript)}</p>
        </div>
        <p class="transcript-note">💡 Pour accéder à la transcription complète, consultez la ressource originale.</p>
      </div>
    </div>
  `;
  
  const existing = document.getElementById('transcriptModal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modal = document.getElementById('transcriptModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ------------------------------
// BIBLIOGRAPHIE
// ------------------------------
function afficherBibliographie(categorie) {
  const container = document.getElementById("bibliographyContent");
  if (!container) return;
  
  let bibliography = [];
  if (categorie === 'linguistique') bibliography = EXTENDED_BIBLIOGRAPHY.linguistique;
  else if (categorie === 'anthropologie') bibliography = EXTENDED_BIBLIOGRAPHY.anthropologie;
  else if (categorie === 'histoire') bibliography = EXTENDED_BIBLIOGRAPHY.histoire;
  
  let html = `<div class="bibliography-list-extended">`;
  for (const ref of bibliography) {
    html += `
      <div class="bibliography-item">
        <span class="bib-icon">📖</span>
        <span class="bib-text">${escapeHtml(ref)}</span>
        <button class="bib-copy" data-ref="${escapeHtml(ref)}">📋</button>
      </div>
    `;
  }
  html += `</div>`;
  
  container.innerHTML = html;
  
  // Ajouter la fonctionnalité de copie
  document.querySelectorAll('.bib-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const ref = btn.dataset.ref;
      navigator.clipboard.writeText(ref);
      if (window.showToast) window.showToast("📋 Référence copiée", "success");
    });
  });
}

// ------------------------------
// INTERACTIONS
// ------------------------------
function initialiserInteractionsRessources() {
  // Filtres par catégorie
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      resourceCurrentFilter = btn.dataset.filter;
      afficherToutesRessources();
    });
  });
  
  // Onglets de bibliographie
  document.querySelectorAll('.bib-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.bib-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      afficherBibliographie(tab.dataset.cat);
    });
  });
  
  // Recherche
  const searchInput = document.getElementById('resourceSearch');
  const clearBtn = document.getElementById('clearResourceSearch');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      resourceSearchQuery = e.target.value.trim();
      if (clearBtn) clearBtn.style.display = resourceSearchQuery ? 'block' : 'none';
      afficherToutesRessources();
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      resourceSearchQuery = '';
      clearBtn.style.display = 'none';
      afficherToutesRessources();
      searchInput.focus();
    });
  }
}

// ------------------------------
// UTILITAIRES
// ------------------------------
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : (currentLanguage === 'en' ? 'en-US' : 'ar-EG'));
}

// ------------------------------
// ANCIENNES FONCTIONS (conservées pour compatibilité)
// ------------------------------
function chargerArticlesAcademiques() {
  const container = document.getElementById("articlesGrid");
  if (!container) return;
  
  const articles = RESOURCES_DB.articles;
  
  let html = `<div class="articles-grid-inner">`;
  for (const article of articles) {
    html += `
      <div class="article-card">
        <div class="article-icon">📄</div>
        <div class="article-content">
          <h4>${escapeHtml(article.titre)}</h4>
          <p class="article-meta">${escapeHtml(article.auteur)} • ${article.annee}</p>
          <p class="article-desc">${escapeHtml(article.description)}</p>
          <div class="article-tags">${article.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
          <a href="${article.url}" class="article-link" target="_blank">🔗 Accéder à la publication</a>
        </div>
      </div>
    `;
  }
  html += `</div>`;
  container.innerHTML = html;
}

function chargerBibliographie() {
  const container = document.getElementById("bibliographyList");
  if (!container) return;
  
  const bibliography = EXTENDED_BIBLIOGRAPHY.linguistique;
  
  let html = `<ul class="bibliography-list-ul">`;
  for (const ref of bibliography) { html += `<li>📖 ${escapeHtml(ref)}</li>`; }
  html += `</ul><p class="bibliography-note">📚 D'après l'épisode "La linguistique historique au Sahara" du podcast Maghrib in Past & Present</p>`;
  container.innerHTML = html;
}

window.shareResource = function(url, title) {
  if (navigator.share) {
    navigator.share({ title: title, text: `Découvrez cette ressource sur ${title}`, url: url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url);
    if (window.showToast) window.showToast("📋 Lien copié dans le presse-papier", "success");
  }
};

// ------------------------------
// STYLES CSS
// ------------------------------
const RESSOURCES_STYLES = `
  .ressources-premium-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, var(--bg-card), var(--bg-light));
    border-radius: var(--radius-2xl);
  }
  
  .ressources-premium-header .premium-icon {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
  
  .ressources-premium-header h2 {
    font-size: 1.8rem;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }
  
  .ressources-search-bar {
    position: relative;
    max-width: 500px;
    margin: 1rem auto;
  }
  
  .resource-search-input {
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
  
  .ressources-filters {
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
    border-color: var(--primary);
  }
  
  .ressources-stats {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  
  .ressources-stats .stat {
    background: var(--bg-card);
    padding: 0.3rem 1rem;
    border-radius: var(--radius-full);
    font-size: 0.8rem;
    border: 1px solid var(--border);
  }
  
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .resource-card {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: 1.2rem;
    border: 1px solid var(--border);
    transition: all var(--transition);
  }
  
  .resource-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    border-color: var(--accent);
  }
  
  .resource-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  
  .resource-type {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: var(--accent);
  }
  
  .favorite-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    transition: transform var(--transition);
  }
  
  .favorite-btn:hover {
    transform: scale(1.1);
  }
  
  .resource-title {
    font-size: 1rem;
    color: var(--accent);
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  
  .resource-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-bottom: 0.8rem;
  }
  
  .resource-description {
    font-size: 0.85rem;
    color: var(--text);
    line-height: 1.5;
    margin-bottom: 0.8rem;
  }
  
  .resource-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.8rem;
  }
  
  .resource-tag {
    font-size: 0.65rem;
    background: rgba(51, 204, 255, 0.15);
    color: var(--accent);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
  }
  
  .resource-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .resource-link {
    display: inline-block;
    padding: 0.5rem;
    text-align: center;
    background: var(--gradient-primary);
    color: white;
    text-decoration: none;
    border-radius: var(--radius-md);
    font-size: 0.8rem;
    transition: all var(--transition);
  }
  
  .resource-link:hover {
    transform: translateY(-2px);
  }
  
  .resource-doi {
    font-size: 0.65rem;
    color: var(--text-muted);
    text-align: center;
  }
  
  .resource-transcript-btn {
    padding: 0.3rem;
    background: var(--bg-light);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.7rem;
  }
  
  .ressources-bibliography-section {
    margin-top: 3rem;
    padding: 1.5rem;
    background: var(--bg-card);
    border-radius: var(--radius-xl);
  }
  
  .ressources-bibliography-section h3 {
    font-size: 1.3rem;
    color: var(--accent);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .bibliography-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .bib-tab {
    padding: 0.4rem 1rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    background: var(--bg-light);
    cursor: pointer;
    transition: all var(--transition);
  }
  
  .bib-tab:hover, .bib-tab.active {
    background: var(--gradient-primary);
    color: white;
  }
  
  .bibliography-list-extended {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    max-height: 400px;
    overflow-y: auto;
  }
  
  .bibliography-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.6rem;
    background: var(--bg-light);
    border-radius: var(--radius-md);
    font-size: 0.8rem;
    line-height: 1.5;
  }
  
  .bib-icon {
    font-size: 1rem;
  }
  
  .bib-text {
    flex: 1;
  }
  
  .bib-copy {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.6;
    transition: opacity var(--transition);
  }
  
  .bib-copy:hover {
    opacity: 1;
  }
  
  .transcript-content {
    max-width: 700px;
  }
  
  .transcript-text {
    max-height: 400px;
    overflow-y: auto;
    padding: 1rem;
    background: var(--bg-light);
    border-radius: var(--radius-md);
    margin: 1rem 0;
    white-space: pre-wrap;
    font-family: monospace;
    font-size: 0.85rem;
  }
  
  @media (max-width: 768px) {
    .resources-grid {
      grid-template-columns: 1fr;
    }
    
    .ressources-filters {
      flex-direction: column;
      align-items: stretch;
    }
    
    .bibliography-tabs {
      flex-direction: column;
      align-items: stretch;
    }
    
    .resource-meta {
      flex-direction: column;
      gap: 0.3rem;
    }
  }
`;

// Injecter les styles
if (!document.getElementById('ressources-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'ressources-styles';
  styleSheet.textContent = RESSOURCES_STYLES;
  document.head.appendChild(styleSheet);
}

// ------------------------------
// EXPORT
// ------------------------------
window.afficherRessources = afficherRessources;
window.chargerArticlesAcademiques = chargerArticlesAcademiques;
window.chargerBibliographie = chargerBibliographie;
window.shareResource = window.shareResource;

console.log("📚 Module Ressources académiques chargé - Version premium");
