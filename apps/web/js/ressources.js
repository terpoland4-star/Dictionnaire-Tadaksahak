import { state, imagesGalerie } from './state.js';
import { dom } from './state.js';
import { i18n } from './i18n-data.js';
import { escapeHtml, showSkeleton, showToast } from './utils.js';

export function rechercherPleinTexte() {
  const query = document.getElementById("searchBooksInput")?.value.trim();
  const container = document.getElementById("searchBooksResults");
  if (!query || !state.livresConnaissance) { if(container) container.innerHTML = ""; return; }
  const mots = query.toLowerCase().split(/\s+/);
  const results = [];
  for (const livre of state.livresConnaissance.livres) {
    for (const chunk of livre.chunks) {
      let match = true;
      for (const mot of mots) {
        if (!chunk.texte.toLowerCase().includes(mot)) { match = false; break; }
      }
      if (match) results.push({ livre: livre.titre, auteur: livre.auteur, chapitre: chunk.chapitre, titre: chunk.titre, texte: chunk.texte });
    }
  }
  if (!container) return;
  if (!results.length) { container.innerHTML = "<p>Aucun résultat</p>"; return; }
  let html = `<h3>${i18n[state.currentLanguage].search_results} (${results.length})</h3>`;
  results.forEach(r => {
    let texteApercu = r.texte.substring(0, 300);
    let regex = new RegExp(`(${mots.join('|')})`, 'gi');
    texteApercu = texteApercu.replace(regex, '<mark>$1</mark>');
    html += `<div class="search-result"><strong>${escapeHtml(r.livre)}</strong> (${escapeHtml(r.auteur)}), ch.${r.chapitre} : ${escapeHtml(r.titre)}<p>${texteApercu}...</p></div>`;
  });
  container.innerHTML = html;
}

// ------------------------------
// TABLEAU DE BORD
// ------------------------------
export function afficherDashboard() {
  const container = document.getElementById("dashboardContainer");
  if (!container) return;
  let html = `<h3>${i18n[state.currentLanguage].dashboard_history}</h3><ul>`;
  state.historique.slice(0,10).forEach(m => { html += `<li>${escapeHtml(m)}</li>`; });
  html += `</ul><h3>${i18n[state.currentLanguage].dashboard_favorites}</h3><ul>`;
  state.favoris.forEach(m => { html += `<li>${escapeHtml(m)}</li>`; });
  html += `</ul><h3>${i18n[state.currentLanguage].dashboard_quiz_progress}</h3>`;
  const progress = JSON.parse(localStorage.getItem("quizProgress")) || {};
  for (let lang in progress) {
    html += `<p>${lang.toUpperCase()} : ${progress[lang].score}/${progress[lang].total}</p>`;
  }
  container.innerHTML = html;
}

// ------------------------------
// LIVRES
// ------------------------------
export async function afficherLivres() {
  const cont = document.getElementById("livresContainer");
  if (!cont) return;
  showSkeleton('livresContainer');
  try {
    const response = await fetch('data/livres.json');
    if (!response.ok) throw new Error();
    const allLivres = await response.json();
    let langueCible = state.currentLanguage === "fr" ? "Français" : (state.currentLanguage === "ar" ? "Arabe" : "English");
    const livres = allLivres.filter(l => l.langue === langueCible && l.type !== "rapport");
    if (!livres.length) { cont.innerHTML = `<p class="info-message">📚 Aucun livre dans cette langue.</p>`; return; }
    cont.innerHTML = livres.map(livre => `
      <div class="livre-card">
        ${livre.couverture ? `<div class="livre-cover"><img src="${escapeHtml(livre.couverture)}" alt="Couverture" loading="lazy" style="width:100%; border-radius:8px;"></div>` : ''}
        <div class="livre-titre">📖 ${escapeHtml(livre.titre)}</div>
        <div class="livre-auteur">✍️ ${escapeHtml(livre.auteur)}</div>
        <div class="livre-desc">${escapeHtml(livre.description || '')}</div>
        <div class="livre-meta">🏷️ ${escapeHtml(livre.categorie || 'Général')} • 📅 ${livre.annee || '?'} • 📄 ${livre.pages || '?'} pages</div>
        <div class="livre-actions"><a href="livre-viewer.html?id=${livre.id}" class="btn-small" target="_blank">📖 Lire l'ouvrage</a></div>
      </div>
    `).join('');
  } catch(e) { 
    console.error("Erreur chargement livres", e);
    cont.innerHTML = `<p class="error-message">❌ Erreur chargement livres.</p>`; 
  }
}

// ------------------------------
// PHOTOS
// ------------------------------
export function afficherPhotos() {
  const container = document.getElementById("photosContainer");
  if (!container) return;
  let html = `<div class="album-header"><h3>📷 Album : Photos historiques</h3><p>Clichés de Charles Grémont</p></div><div class="galerie-grid">`;
  imagesGalerie.forEach(img => {
    let titre = "", legende = "";
    if (state.currentLanguage === "fr") { titre = img.titre_fr; legende = img.legende_fr; }
    else if (state.currentLanguage === "ar") { titre = img.titre_ar; legende = img.legende_ar; }
    else { titre = img.titre_en; legende = img.legende_en; }
    html += `<div class="galerie-item"><img src="${escapeHtml(img.fichier)}" alt="${escapeHtml(titre)}" loading="lazy"><div class="galerie-caption"><strong>${escapeHtml(titre)}</strong><p class="legende">${escapeHtml(legende)}</p><small class="credit">${escapeHtml(img.credit)}</small></div></div>`;
  });
  html += `</div>`;
  container.innerHTML = html;
}

// ------------------------------
// RAPPORTS
// ------------------------------
export function afficherRapports() {
  const container = document.getElementById("rapportsContainer");
  if (!container) return;
  container.innerHTML = `<div class="loading-books">📄 Chargement des rapports...</div>`;
  fetch('data/livres.json')
    .then(response => response.json())
    .then(allLivres => {
      let langueCible = state.currentLanguage === "fr" ? "Français" : (state.currentLanguage === "ar" ? "Arabe" : "English");
      const rapports = allLivres.filter(l => l.type === "rapport" && l.langue === langueCible);
      if (!rapports.length) {
        container.innerHTML = `<p class="info-message">📄 Aucun rapport dans cette langue.</p>`;
        return;
      }
      container.innerHTML = `<div class="rapports-grid">` + rapports.map(rapport => `
        <div class="rapport-card">
          <div class="rapport-type">📄 RAPPORT</div>
          <h3 class="rapport-titre">${escapeHtml(rapport.titre)}</h3>
          <div class="rapport-auteur">✍️ ${escapeHtml(rapport.auteur)}</div>
          <div class="rapport-meta">📅 ${rapport.annee || '?'} • 🏷️ ${escapeHtml(rapport.categorie || 'Linguistique')}</div>
          <div class="rapport-desc">${escapeHtml(rapport.description || '')}</div>
          <div class="rapport-actions">
            <a href="livre-viewer.html?id=${rapport.id}" class="btn-small" target="_blank">📖 Lire le rapport</a>
          </div>
        </div>
      `).join('') + `</div>`;
    })
    .catch(e => {
      console.error("Erreur chargement rapports", e);
      container.innerHTML = `<p class="error-message">❌ Erreur de chargement des rapports.</p>`;
    });
}

export function genererAlbumsAudio() {
  const conteneur = document.getElementById("audioContainer");
  if (conteneur) conteneur.innerHTML = "<p class='info-message'>🎵 Pistes audio à venir prochainement...</p>";
}

export function genererVideos() {
  const conteneur = document.getElementById("videosContainer");
  if (conteneur) conteneur.innerHTML = "<p class='info-message'>🎥 Vidéos à venir prochainement...</p>";
}

// ------------------------------
// BASE DE CONNAISSANCES
// ------------------------------
export async function chargerLivresConnaissance() {
  try {
    const response = await fetch('data/livres_connaissance.json');
    if (response.ok) {
      state.livresConnaissance = await response.json();
      console.log('📚 Base de connaissances chargée');
    } else {
      console.warn('livres_connaissance.json non trouvé');
      state.livresConnaissance = { livres: [] };
    }
  } catch(e) { 
    console.warn(e);
    state.livresConnaissance = { livres: [] };
  }
}

// ------------------------------
// SERVICE WORKER PWA
// ------------------------------
export function afficherRessources() {
  const container = document.getElementById("ressourcesContainer");
  if (!container) return;
  const podcastUrl = "https://www.themaghribpodcast.com/2018/01/la-linguistique-historique-au-sahara.html";
  let html = `
    <div class="ressources-intro">
      <p data-i18n="ressources_desc">Découvrez des podcasts, articles et références sur les langues et l'histoire du Sahara</p>
    </div>
    <div class="ressources-section">
      <h3 data-i18n="podcast_section">🎙️ Podcasts et conférences</h3>
      <div class="podcast-card">
        <div class="podcast-header">
          <div class="podcast-icon">🎙️</div>
          <div class="podcast-info">
            <h4 data-i18n="podcast_episode_title">La linguistique historique au Sahara</h4>
            <p class="podcast-speaker">Dr. Lameen Souag (CNRS, LACITO)</p>
            <p class="podcast-date" data-i18n="podcast_episode_date">22 janvier 2018</p>
          </div>
        </div>
        <p class="podcast-description" data-i18n="podcast_episode_desc">
          Dans cet épisode, Dr. Lameen Souag développe l'idée que l'histoire d'une langue ne dépend pas que d'une tradition écrite.
        </p>
        <div class="podcast-links">
          <a href="${podcastUrl}" target="_blank" rel="noopener noreferrer" class="btn-podcast">🎧 <span data-i18n="podcast_listen">Écouter le podcast</span></a>
          <button class="btn-share-resource" onclick="shareResource('${podcastUrl}', 'La linguistique historique au Sahara')">📤 <span data-i18n="share_resource">Partager</span></button>
        </div>
      </div>
    </div>
    <div class="ressources-section">
      <h3 data-i18n="articles_section">📖 Articles et publications</h3>
      <div class="articles-grid" id="articlesGrid"><div class="loading-spinner">📚 Chargement des articles...</div></div>
    </div>
    <div class="ressources-section">
      <h3 data-i18n="bibliography_section">📚 Bibliographie suggérée</h3>
      <div class="bibliography-list" id="bibliographyList"><div class="loading-spinner">📖 Chargement de la bibliographie...</div></div>
    </div>
  `;
  container.innerHTML = html;
  chargerArticlesAcademiques();
  chargerBibliographie();
}

export function chargerArticlesAcademiques() {
  const container = document.getElementById("articlesGrid");
  if (!container) return;
  const articles = [
    { titre: "The Tadaksahak language: a Zénaga variety of the Malian Sahara", auteur: "Christiansen-Bolli, R.", annee: 2010, url: "#", description: "Étude descriptive du tadaksahak.", tags: ["Tadaksahak", "Grammaire"] },
    { titre: "Relative Clauses in Tadaksahak", auteur: "Christiansen, N. & Levinsohn, S.", annee: 2003, url: "#", description: "Analyse des trois stratégies de relativisation.", tags: ["Tadaksahak", "Syntaxe"] },
    { titre: "A Grammar of Tamashek (Tuareg of Mali)", auteur: "Heath, J.", annee: 2005, url: "#", description: "Grammaire de référence du touareg.", tags: ["Touareg", "Grammaire"] },
    { titre: "The Berber language", auteur: "Kossmann, M.", annee: 2011, url: "#", description: "Aperçu des langues berbères.", tags: ["Berbère", "Linguistique"] },
    { titre: "Non-Tuareg Berber and the Genesis of Nomadic Northern Songhay", auteur: "Souag, L.", annee: 2015, url: "#", description: "Contacts entre berbère et songhay.", tags: ["Songhay", "Contacts"] }
  ];
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

export function chargerBibliographie() {
  const container = document.getElementById("bibliographyList");
  if (!container) return;
  const bibliography = [
    "Brugnatelli, Vermondo. 2011. \"Some grammatical features of Ancient Eastern Berber.\"",
    "Cohen, David et Catherine Taine-Cheikh. 2000. \"A propos du Zénaga.\"",
    "Kossmann, Maarten. 2001. \"The origin of the glottal stop in Zenaga.\"",
    "Kossmann, Maarten. 1999. Essai sur la phonologie du proto-berbère.",
    "Souag, Lameen. 2015. \"Non-Tuareg Berber and the Genesis of Nomadic Northern Songhay.\"",
    "Christiansen-Bolli, Regula. 2010. \"A Grammar of Tadaksahak.\"",
    "Christiansen, Niels et Stephen Levinsohn. 2003. \"Relative Clauses in Tadaksahak.\""
  ];
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
    showToast("📋 Lien copié dans le presse-papier", "success");
  }
};

// ------------------------------
// POP-UP DE BIENVENUE
// ------------------------------
export function showRessourcesWelcomePopup() {
  const hasSeenRessourcesPopup = localStorage.getItem('has_seen_ressources_popup');
  if (hasSeenRessourcesPopup === 'true') return;
  const popup = document.createElement('div');
  popup.id = 'ressourcesPopup';
  popup.className = 'modal ressources-popup';
  popup.innerHTML = `
    <div class="modal-content ressources-popup-content">
      <button class="popup-close" id="closeRessourcesPopup">&times;</button>
      <div class="popup-icon">📚</div>
      <h2>Nouvelle section</h2>
      <h3>Ressources academiques</h3>
      <div class="popup-author">Par <strong>Hamadine Ag Moctar</strong></div>
      <div class="popup-divider"></div>
      <div class="popup-text"><p>"La connaissance ne se construit pas seule. Elle se tisse au fil des echanges."</p></div>
      <div class="popup-features">
        <div class="popup-feature"><span class="feature-icon">🎙️</span><span class="feature-text">Podcast exclusif avec <strong>Dr. Lameen Souag (CNRS)</strong></span></div>
        <div class="popup-feature"><span class="feature-icon">📖</span><span class="feature-text">Articles scientifiques sur le tadaksahak</span></div>
        <div class="popup-feature"><span class="feature-icon">📚</span><span class="feature-text">Bibliographie specialisee</span></div>
      </div>
      <div class="popup-quote"><p>La langue et la culture Tadaksahak meritent d'etre etudiees, partagees et transmises.</p></div>
      <button id="goToRessourcesBtn" class="btn-popup-go">Decouvrir la section</button>
      <button id="dismissRessourcesPopup" class="btn-popup-later">Plus tard</button>
    </div>
  `;
  document.body.appendChild(popup);
  localStorage.setItem('has_seen_ressources_popup', 'true');
  const closeBtn = document.getElementById('closeRessourcesPopup');
  const dismissBtn = document.getElementById('dismissRessourcesPopup');
  const goBtn = document.getElementById('goToRessourcesBtn');
  const closePopup = () => {
    popup.classList.add('popup-closing');
    setTimeout(() => { if (popup && popup.parentNode) popup.remove(); }, 300);
  };
  closeBtn?.addEventListener('click', closePopup);
  dismissBtn?.addEventListener('click', closePopup);
  goBtn?.addEventListener('click', () => {
    closePopup();
    if (dom.sectionSelector) {
      dom.sectionSelector.value = 'ressources';
      dom.sectionSelector.dispatchEvent(new Event('change'));
    }
  });
  popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
}

// ------------------------------
// NAVIGATION (avec gestion scroll/focus améliorée)
// ------------------------------
