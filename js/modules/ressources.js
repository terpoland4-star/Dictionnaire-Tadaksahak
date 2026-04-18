// ============================================
// MODULE - RESSOURCES ACADÉMIQUES
// Podcasts, articles, bibliographie
// ============================================

function afficherRessources() {
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
          <button class="btn-share-resource" onclick="window.shareResource('${podcastUrl}', 'La linguistique historique au Sahara')">📤 <span data-i18n="share_resource">Partager</span></button>
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

function chargerArticlesAcademiques() {
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

function chargerBibliographie() {
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

// Exporter
window.afficherRessources = afficherRessources;
