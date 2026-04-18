// ============================================
// CORE - GESTION DU STOCKAGE LOCAL
// Historique, favoris, mots du jour
// ============================================

let historique = [];
let favoris = [];

// === HISTORIQUE ===
function ajouterHistorique(mot) {
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  historique = historique.filter(m => m !== mot);
  historique.unshift(mot);
  if (historique.length > 20) historique.pop();
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
    bloc.innerHTML = historique.length ? 
      `<strong>📜 Derniers mots :</strong> ${historique.map(m => `<span class='mot-historique' data-mot="${escapeHtml(m)}">${escapeHtml(m)}</span>`).join(", ")}` : 
      "<em>Aucun mot consulté récemment.</em>";
    
    bloc.querySelectorAll(".mot-historique").forEach(el => {
      el.addEventListener("click", () => {
        const mot = window.vocabulaire?.find(v => v.mot === el.dataset.mot);
        if (mot && window.afficherMot) window.afficherMot(mot);
      });
    });
  }
}

function chargerHistorique() {
  historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  afficherHistorique();
}

// === FAVORIS ===
function chargerFavoris() {
  favoris = JSON.parse(localStorage.getItem("favorisTadakssahak")) || [];
}

function sauvegarderFavoris() {
  localStorage.setItem("favorisTadakssahak", JSON.stringify(favoris));
}

function basculerFavori(item) {
  if (favoris.includes(item.mot)) {
    favoris = favoris.filter(m => m !== item.mot);
    showToast(window.t('remove_favorite'), "info");
  } else {
    favoris.push(item.mot);
    showToast(window.t('add_favorite'), "success");
  }
  sauvegarderFavoris();
  if (window.motActuel === item && window.afficherMot) window.afficherMot(item);
  if (document.getElementById("dashboard") && !document.getElementById("dashboard").hidden && window.afficherDashboard) {
    window.afficherDashboard();
  }
}

// === MOT DU JOUR ===
function getWordOfDay() {
  if (!window.vocabulaire?.length) return null;
  const today = new Date().toISOString().slice(0,10);
  let stored = localStorage.getItem('word_of_day');
  if (stored && JSON.parse(stored).date === today) return JSON.parse(stored).word;
  
  const randomIndex = Math.floor(Math.random() * window.vocabulaire.length);
  const word = window.vocabulaire[randomIndex];
  localStorage.setItem('word_of_day', JSON.stringify({ date: today, word: word.mot }));
  return word.mot;
}

function afficherMotDuJour() {
  const container = document.getElementById("wordOfDayContainer");
  if (!container) return;
  
  const mot = getWordOfDay();
  if (!mot) return;
  
  const item = window.vocabulaire?.find(v => v.mot === mot);
  if (!item) return;
  
  let definition = currentLanguage === 'fr' ? item.fr : (currentLanguage === 'en' ? item.en : item.ar);
  container.innerHTML = `<strong>${window.t('word_of_day')}</strong> : ${escapeHtml(mot)} — ${escapeHtml(definition)}`;
}

function requestNotificationPermission() {
  if ('Notification' in navigator && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function showWordNotification() {
  if ('Notification' in navigator && Notification.permission === 'granted') {
    const mot = getWordOfDay();
    if (mot) new Notification(`📖 Mot du jour : ${mot}`);
  }
}

// Exporter
window.ajouterHistorique = ajouterHistorique;
window.afficherHistorique = afficherHistorique;
window.chargerHistorique = chargerHistorique;
window.chargerFavoris = chargerFavoris;
window.sauvegarderFavoris = sauvegarderFavoris;
window.basculerFavori = basculerFavori;
window.getWordOfDay = getWordOfDay;
window.afficherMotDuJour = afficherMotDuJour;
window.requestNotificationPermission = requestNotificationPermission;
window.showWordNotification = showWordNotification;
window.historique = historique;
window.favoris = favoris;
