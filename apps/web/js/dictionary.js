import { state } from './state.js';
import { dom } from './state.js';
import { i18n } from './i18n-data.js';
import { afficherDashboard } from './ressources.js';
import { escapeHtml, levenshtein, normalizeText, showToast } from './utils.js';

export async function chargerDictionnaire() {
  try {
    const response = await fetch('data/mots.json');
    if (!response.ok) throw new Error();
    state.vocabulaire = await response.json();
    console.log(`📖 Dictionnaire chargé : ${state.vocabulaire.length} mots`);
  } catch(e) {
    console.warn("Erreur chargement dictionnaire, utilisation fallback", e);
    state.vocabulaire = [
      { mot: "Báy", cat: "vt.", fr: "Pouvoir (faire)", ar: "قدر على (فعل)", en: "Able, to be" },
      { mot: "Yiddár", cat: "vi.", fr: "Être en vie", ar: "يكون حياً", en: "Alive, to be" },
      { mot: "Káamil", cat: "quantifier", fr: "Tout", ar: "كل", en: "All" },
      { mot: "ayo", cat: "pron.", fr: "qui, que (pronom relatif singulier)", ar: "الذي، التي", en: "who, which, that" },
      { mot: "ayondo", cat: "pron.", fr: "qui, que (pronom relatif pluriel)", ar: "الذين، اللواتي", en: "who, which, that (pl)" },
      { mot: "sa", cat: "conj.", fr: "qui, que (relative non-restrictive)", ar: "الذي، التي", en: "who, which, that (non-restrictive)" }
    ];
  }
  state.motsListe = state.vocabulaire.map((item, idx) => ({ ...item, index: idx }));
  if (state.vocabulaire.length) {
    const statMots = document.getElementById("statMots");
    if (statMots) statMots.textContent = state.vocabulaire.length;
    const statsContainer = document.getElementById("statsContainer");
    if (statsContainer) statsContainer.hidden = false;
    construireIndexAlphabet();
    if (state.vocabulaire[0]) afficherMot(state.vocabulaire[0]);
  }
}

export function afficherMot(item) {
  if (!item) return;
  state.motActuel = item;
  state.currentIndex = state.motsListe.findIndex(m => m.mot === item.mot);
  if (dom.compteurMot) dom.compteurMot.textContent = `${state.currentIndex+1} / ${state.motsListe.length}`;
  if (dom.btnPrev) dom.btnPrev.disabled = state.currentIndex <= 0;
  if (dom.btnNext) dom.btnNext.disabled = state.currentIndex >= state.motsListe.length-1;
  if (dom.motElem) dom.motElem.textContent = item.mot;
  if (dom.defElem) {
    let def = "";
    let categorieValue = item.cat || "";
    
    const categoriesFr = {
      "vt.": "Verbe transitif", "vi.": "Verbe intransitif", "n.": "Nom",
      "npl.": "Nom (pluriel uniquement)", "adj.": "Adjectif", "adv.": "Adverbe",
      "conj.": "Conjonction", "postp.": "Postposition", "prep.": "Préposition",
      "pron.": "Pronom", "dem.": "Démonstratif", "num.": "Numéral",
      "quantifier": "Quantifieur", "phrase": "Expression", "idiom": "Idiome"
    };
    const categoriesEn = {
      "vt.": "Transitive verb", "vi.": "Intransitive verb", "n.": "Noun",
      "npl.": "Noun (plural only)", "adj.": "Adjective", "adv.": "Adverb",
      "conj.": "Conjunction", "postp.": "Postposition", "prep.": "Preposition",
      "pron.": "Pronoun", "dem.": "Demonstrative", "num.": "Numeral",
      "quantifier": "Quantifier", "phrase": "Phrase", "idiom": "Idiom"
    };
    const categoriesAr = {
      "vt.": "فعل متعد", "vi.": "فعل لازم", "n.": "اسم",
      "npl.": "اسم (جمع فقط)", "adj.": "صفة", "adv.": "ظرف",
      "conj.": "حرف عطف", "postp.": "حرف جر لاحق", "prep.": "حرف جر",
      "pron.": "ضمير", "dem.": "اسم إشارة", "num.": "عدد",
      "quantifier": "محدد كمي", "phrase": "عبارة", "idiom": "تعبير اصطلاحي"
    };
    
    let categorieAffichee = categorieValue;
    if (state.currentLanguage === "fr" && categoriesFr[categorieValue]) categorieAffichee = categoriesFr[categorieValue];
    else if (state.currentLanguage === "en" && categoriesEn[categorieValue]) categorieAffichee = categoriesEn[categorieValue];
    else if (state.currentLanguage === "ar" && categoriesAr[categorieValue]) categorieAffichee = categoriesAr[categorieValue];
    
    if (state.currentLanguage === "fr") {
      def = item.fr || item.en || "";
      dom.defElem.innerHTML = `<p><strong>📂 Catégorie :</strong> ${escapeHtml(categorieAffichee)}</p>
        <p><strong>🇫🇷 Définition :</strong> ${escapeHtml(def)}</p>
        ${item.ar ? `<p><strong>🇸🇦 بالعربية :</strong> ${escapeHtml(item.ar)}</p>` : ''}
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-small" id="shareWordBtn">📤 ${i18n[state.currentLanguage].share}</button>
          <button class="btn-small" id="favoriteWordBtn">⭐ ${state.favoris.includes(item.mot) ? i18n[state.currentLanguage].remove_favorite : i18n[state.currentLanguage].add_favorite}</button>
        </div>`;
    } 
    else if (state.currentLanguage === "en") {
      def = item.en || item.fr || "";
      dom.defElem.innerHTML = `<p><strong>📂 Category:</strong> ${escapeHtml(categorieAffichee)}</p>
        <p><strong>🇬🇧 Definition:</strong> ${escapeHtml(def)}</p>
        ${item.ar ? `<p><strong>🇸🇦 بالعربية :</strong> ${escapeHtml(item.ar)}</p>` : ''}
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-small" id="shareWordBtn">📤 ${i18n[state.currentLanguage].share}</button>
          <button class="btn-small" id="favoriteWordBtn">⭐ ${state.favoris.includes(item.mot) ? i18n[state.currentLanguage].remove_favorite : i18n[state.currentLanguage].add_favorite}</button>
        </div>`;
    }
    else if (state.currentLanguage === "ar") {
      def = item.ar || item.fr || "";
      dom.defElem.innerHTML = `<p><strong>📂 الفئة :</strong> ${escapeHtml(categorieAffichee)}</p>
        <p><strong>🇸🇦 التعريف :</strong> ${escapeHtml(def)}</p>
        ${item.fr ? `<p><strong>🇫🇷 Français :</strong> ${escapeHtml(item.fr)}</p>` : ''}
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-small" id="shareWordBtn">📤 ${i18n[state.currentLanguage].share}</button>
          <button class="btn-small" id="favoriteWordBtn">⭐ ${state.favoris.includes(item.mot) ? i18n[state.currentLanguage].remove_favorite : i18n[state.currentLanguage].add_favorite}</button>
        </div>`;
    }
    
    setTimeout(() => {
      document.getElementById("shareWordBtn")?.addEventListener("click", () => partagerMot(item));
      document.getElementById("favoriteWordBtn")?.addEventListener("click", () => basculerFavori(item));
    }, 50);
  }
  if (dom.audioElem && item.audio) {
    dom.audioElem.src = `audio/${item.audio}`;
    dom.audioElem.hidden = false;
    dom.audioElem.load();
  } else if (dom.audioElem) dom.audioElem.hidden = true;
  ajouterHistorique(item.mot);
}

export function navigationPrecedent() { if (state.currentIndex > 0) afficherMot(state.motsListe[state.currentIndex-1]); }
export function navigationSuivant() { if (state.currentIndex < state.motsListe.length-1) afficherMot(state.motsListe[state.currentIndex+1]); }

export function chercher(queryRaw) {
  const query = normalizeText(queryRaw);
  if (!query || !state.vocabulaire.length) return [];
  const resultats = [];
  const maxDist = Math.max(2, Math.floor(query.length * 0.4));
  
  for (const item of state.vocabulaire) {
    let score = Infinity;
    const motNorm = normalizeText(item.mot);
    
    if (motNorm.includes(query)) {
      score = motNorm.startsWith(query) ? 0 : 1;
    } else if (score > 1 && item.fr && normalizeText(item.fr).includes(query)) {
      score = 2;
    } else if (score > 2 && item.en && normalizeText(item.en).includes(query)) {
      score = 3;
    } else if (score > 3 && item.ar && normalizeText(item.ar).includes(query)) {
      score = 4;
    } else if (score === Infinity && item.mot) {
      const dist = levenshtein(motNorm, query);
      if (dist <= maxDist) score = 5 + dist;
    }
    
    if (score < Infinity) resultats.push({ item, score });
  }
  
  return resultats.sort((a,b) => a.score - b.score).slice(0,15).map(r => r.item);
}

if (dom.searchBar) {
  let debounceTimeout;
  dom.searchBar.addEventListener("input", (e) => {
    const raw = e.target.value.trim();
    if (dom.clearSearchBtn) dom.clearSearchBtn.hidden = !raw;
    if (!dom.suggestionsList) return;
    
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      dom.suggestionsList.innerHTML = "";
      dom.suggestionsList.classList.remove("show");
      if (!raw) return;
      
      const resultats = chercher(raw);
      if (!resultats.length) {
        const li = document.createElement("li");
        li.textContent = "🔍 Aucun résultat";
        li.style.padding = "0.75rem";
        li.style.color = "var(--text-muted)";
        dom.suggestionsList.appendChild(li);
      } else {
        resultats.forEach(item => {
          const li = document.createElement("li");
          let extraInfo = "";
          if (state.currentLanguage === "fr" && item.fr) extraInfo = item.fr;
          else if (state.currentLanguage === "en" && item.en) extraInfo = item.en;
          else if (state.currentLanguage === "ar" && item.ar) extraInfo = item.ar;
          else extraInfo = item.fr || item.en || "";
          
          li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong> <span class="mot-cat">(${escapeHtml(item.cat || '')})</span><br><small>${escapeHtml(extraInfo.substring(0, 80))}${extraInfo.length > 80 ? '…' : ''}</small>`;
          li.style.cursor = "pointer";
          li.style.padding = "0.75rem";
          li.style.borderBottom = "1px solid var(--border-color)";
          li.addEventListener("click", () => {
            dom.searchBar.value = item.mot;
            dom.suggestionsList.innerHTML = "";
            dom.suggestionsList.classList.remove("show");
            afficherMot(item);
          });
          dom.suggestionsList.appendChild(li);
        });
      }
      dom.suggestionsList.classList.add("show");
    }, 300);
  });
  if (dom.clearSearchBtn) {
    dom.clearSearchBtn.addEventListener("click", () => {
      dom.searchBar.value = "";
      dom.searchBar.focus();
      dom.clearSearchBtn.hidden = true;
      dom.suggestionsList.innerHTML = "";
      dom.suggestionsList.classList.remove("show");
    });
  }
}

export function construireIndexAlphabet() {
  const container = document.getElementById("alphabetIndex");
  const wordListContainer = document.getElementById("wordList");
  if (!container || !wordListContainer) return;
  const letters = [...new Set(state.vocabulaire.map(v => v.mot?.[0]?.toUpperCase()).filter(Boolean))].sort();
  container.innerHTML = "";
  letters.forEach(l => {
    const btn = document.createElement("button");
    btn.textContent = l;
    btn.className = "alphabet-btn";
    btn.addEventListener("click", () => {
      wordListContainer.innerHTML = "";
      const motsFiltres = state.vocabulaire.filter(v => v.mot?.toUpperCase().startsWith(l));
      motsFiltres.forEach(m => {
        const div = document.createElement("div");
        div.textContent = m.mot;
        div.className = "mot-item";
        div.addEventListener("click", () => afficherMot(m));
        wordListContainer.appendChild(div);
      });
    });
    container.appendChild(btn);
  });
}

export function ajouterHistorique(mot) {
  state.historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  state.historique = state.historique.filter(m => m !== mot);
  state.historique.unshift(mot);
  if (state.historique.length > 20) state.historique.pop();
  localStorage.setItem("historiqueTadakssahak", JSON.stringify(state.historique));
  afficherHistorique();
}

export function afficherHistorique() {
  const footer = document.querySelector("footer");
  let bloc = document.getElementById("historique");
  if (!bloc && footer) {
    bloc = document.createElement("div");
    bloc.id = "historique";
    footer.appendChild(bloc);
  }
  if (bloc) {
    bloc.innerHTML = state.historique.length ? `<strong>📜 Derniers mots :</strong> ${state.historique.map(m => `<span class='mot-historique' data-mot="${escapeHtml(m)}">${escapeHtml(m)}</span>`).join(", ")}` : "<em>Aucun mot consulté récemment.</em>";
    bloc.querySelectorAll(".mot-historique").forEach(el => {
      el.addEventListener("click", () => {
        const mot = state.vocabulaire.find(v => v.mot === el.dataset.mot);
        if (mot) afficherMot(mot);
      });
    });
  }
}

export function chargerHistorique() {
  state.historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
  afficherHistorique();
}

// ------------------------------
// FAVORIS
// ------------------------------
export function chargerFavoris() {
  state.favoris = JSON.parse(localStorage.getItem("favorisTadakssahak")) || [];
}

export function sauvegarderFavoris() {
  localStorage.setItem("favorisTadakssahak", JSON.stringify(state.favoris));
}

export function basculerFavori(item) {
  if (state.favoris.includes(item.mot)) {
    state.favoris = state.favoris.filter(m => m !== item.mot);
    showToast(i18n[state.currentLanguage].remove_favorite, "info");
  } else {
    state.favoris.push(item.mot);
    showToast(i18n[state.currentLanguage].add_favorite, "success");
  }
  sauvegarderFavoris();
  if (state.motActuel === item) afficherMot(item);
  if (document.getElementById("dashboard") && !document.getElementById("dashboard").hidden) afficherDashboard();
}

export function partagerMot(item) {
  const text = `${item.mot} : ${state.currentLanguage === 'fr' ? item.fr : (state.currentLanguage === 'en' ? item.en : item.fr)}`;
  if (navigator.share) {
    navigator.share({ title: 'Mot Tadaksahak', text: text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    showToast("📋 Copié dans le presse-papier", "success");
  }
}

// ------------------------------
// MOT DU JOUR
// ------------------------------
export function getWordOfDay() {
  if (!state.vocabulaire.length) return null;
  const today = new Date().toISOString().slice(0,10);
  let stored = localStorage.getItem('word_of_day');
  if (stored && JSON.parse(stored).date === today) return JSON.parse(stored).word;
  const randomIndex = Math.floor(Math.random() * state.vocabulaire.length);
  const word = state.vocabulaire[randomIndex];
  localStorage.setItem('word_of_day', JSON.stringify({ date: today, word: word.mot }));
  return word.mot;
}

export function afficherMotDuJour() {
  const container = document.getElementById("wordOfDayContainer");
  if (!container) return;
  const mot = getWordOfDay();
  if (!mot) return;
  const item = state.vocabulaire.find(v => v.mot === mot);
  if (!item) return;
  let definition = state.currentLanguage === 'fr' ? item.fr : (state.currentLanguage === 'en' ? item.en : item.ar);
  container.innerHTML = `<strong>${i18n[state.currentLanguage].word_of_day}</strong> : ${escapeHtml(mot)} — ${escapeHtml(definition)}`;
}

export function requestNotificationPermission() {
  if ('Notification' in navigator && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

export function showWordNotification() {
  if ('Notification' in navigator && Notification.permission === 'granted') {
    const mot = getWordOfDay();
    if (mot) new Notification(`📖 Mot du jour : ${mot}`);
  }
}

// ============================================================
// GRAMMAIRE - LIVRE OUVERT INTERACTIF (30 BLOCS)
// ============================================================
