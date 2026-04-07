// ==============================
// APPLICATION TADAKSAHAK LEARNING
// VERSION FINALE - AVEC BANNIÈRE ANIMÉE
// ==============================

console.log("🚀 Démarrage de l'application...");

// ------------------------------
// VARIABLES GLOBALES
// ------------------------------
let vocabulaire = [];
let motActuel = null;
let langueActuelle = "fr";
let historique = [];
let albumsAudio = [];
let currentIndex = -1;
let motsListe = [];

window.livresData = [];
window.histoireData = {};

// Base de connaissances des livres
let livresConnaissance = null;

// Liste des insultes / gros mots
const insultes = [
  "con", "connard", "connasse", "pute", "salope", "merde", "fuck", "shit",
  "bordel", "enculé", "enculer", "nique", "bite", "couille", "pd", "tapette",
  "gros", "idiot", "stupide", "crétin", "abruti", "imbécile", "nul",
  "tah", "wakh", "degueulasse", "salaud", "salopard", "batard", "bâtard"
];

// Éléments DOM
const searchBar = document.getElementById("searchBar");
const suggestionsList = document.getElementById("suggestions");
const motElem = document.getElementById("motTexte");
const defElem = document.getElementById("definition");
const audioElem = document.getElementById("audioLecteur");
const sectionSelector = document.getElementById("sectionSelector");
const clearSearchBtn = document.getElementById("clearSearch");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const compteurMot = document.getElementById("compteurMot");

// ------------------------------
// BANNIÈRE ANIMÉE
// ------------------------------
function ajouterBanniereAnimée() {
  // Vérifier si la bannière existe déjà
  if (document.getElementById("banniereAnimée")) return;
  
  const banniere = document.createElement("div");
  banniere.id = "banniereAnimée";
  banniere.className = "banniere-animee";
  banniere.innerHTML = `
    <div class="banniere-contenu">
      <span class="banniere-icone">📚</span>
      <span class="banniere-texte">Découvrez les deux livres sur les Idaksahak et les Touaregs du Mali !</span>
      <span class="banniere-icone">🤖</span>
    </div>
    <div class="banniere-sous-texte">
      💬 Testez le bot Hamadine — posez-lui une question sur les livres ou le dictionnaire !
    </div>
    <button class="banniere-fermer" id="fermerBanniere" aria-label="Fermer">✕</button>
  `;
  
  // Insérer la bannière au début du main
  const main = document.querySelector("main");
  if (main) {
    main.insertBefore(banniere, main.firstChild);
  } else {
    document.body.insertBefore(banniere, document.body.firstChild);
  }
  
  // Gestionnaire de fermeture
  const fermerBtn = document.getElementById("fermerBanniere");
  if (fermerBtn) {
    fermerBtn.addEventListener("click", () => {
      banniere.style.opacity = "0";
      setTimeout(() => banniere.remove(), 300);
      localStorage.setItem("bannierefermee", "true");
    });
  }
  
  // Ne pas réafficher si déjà fermée
  if (localStorage.getItem("bannierefermee") === "true") {
    banniere.style.display = "none";
  }
}

// ------------------------------
// UTILITAIRES
// ------------------------------
const escapeHtml = str => str ? String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;") : "";

const normalizeText = s => s ? s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase() : "";

const levenshtein = (a, b) => {
    const an = a.length, bn = b.length;
    if (!an) return bn; if (!bn) return an;
    const matrix = Array.from({ length: an + 1 }, () => new Array(bn + 1).fill(0));
    for (let i = 0; i <= an; i++) matrix[i][0] = i;
    for (let j = 0; j <= bn; j++) matrix[0][j] = j;
    for (let i = 1; i <= an; i++) {
        for (let j = 1; j <= bn; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
        }
    }
    return matrix[an][bn];
};

function contientInsulte(texte) {
  const clean = texte.toLowerCase();
  for (const insulte of insultes) {
    if (clean.includes(insulte)) return true;
  }
  return false;
}

function reponsePolieInsulte() {
  const reponses = [
    "🙏 Je comprends votre émotion, mais restons respectueux. Je suis là pour vous aider avec bienveillance.",
    "🌿 Chez les Idaksahak, on dit que la parole douce ouvre plus de portes que la colère. Comment puis-je vous aider poliment ?",
    "📖 Je préfère ne pas répondre à ce langage. Posez-moi une question sur la langue, les livres ou la culture, j'y répondrai avec plaisir.",
    "🤝 Le respect est au cœur de nos échanges. Reformulez votre question s'il vous plaît.",
    "⚡ Je ne réponds pas aux insultes, mais je reste disponible pour toute question constructive."
  ];
  return reponses[Math.floor(Math.random() * reponses.length)];
}

// Notification toast
function showToast(message, type = "info") {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast toast-${type}`;
    toast.hidden = false;
    setTimeout(() => {
        toast.hidden = true;
    }, 3000);
}

// Gestion loader
function hideLoader() {
    const loader = document.getElementById("loadingOverlay");
    if (loader) loader.hidden = true;
}

function showLoader() {
    const loader = document.getElementById("loadingOverlay");
    if (loader) loader.hidden = false;
}

// ------------------------------
// CHARGEMENT DE LA BASE DE CONNAISSANCES DES LIVRES
// ------------------------------
async function chargerLivresConnaissance() {
  try {
    const response = await fetch('data/livres_connaissance.json');
    if (response.ok) {
      livresConnaissance = await response.json();
      console.log('📚 Base de connaissances chargée');
    } else {
      console.warn('⚠️ Fichier livres_connaissance.json non trouvé');
    }
  } catch (e) {
    console.warn('⚠️ Impossible de charger la base de connaissances', e);
  }
}

function extraireMotsCles(question) {
  const stopWords = ['le', 'la', 'les', 'un', 'une', 'de', 'du', 'des', 'et', 'ou', 'mais', 'donc', 'car', 'pour', 'dans', 'avec', 'sans', 'par', 'sur', 'sous', 'que', 'qui', 'quoi', 'dont', 'où', 'comment', 'pourquoi', 'est', 'sont', 'être', 'avoir', 'faire'];
  
  const mots = question.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[?;:!,.']/g, '')
    .split(/\s+/);
  
  return mots.filter(m => m.length > 2 && !stopWords.includes(m));
}

function chercherDansLivres(question) {
  if (!livresConnaissance || !livresConnaissance.livres) return null;
  
  const motsClesQuestion = extraireMotsCles(question);
  if (motsClesQuestion.length === 0) return null;
  
  const resultats = [];
  
  for (const livre of livresConnaissance.livres) {
    for (const chunk of livre.chunks) {
      let score = 0;
      const motsClesChunk = chunk.mots_cles.map(m => m.toLowerCase());
      
      for (const mot of motsClesQuestion) {
        if (motsClesChunk.some(mc => mc.includes(mot) || mot.includes(mc))) {
          score += 2;
        }
        if (chunk.texte.toLowerCase().includes(mot)) {
          score += 1;
        }
      }
      
      if (score > 0) {
        resultats.push({
          livre: livre.titre,
          auteur: livre.auteur,
          chapitre: chunk.chapitre,
          titre: chunk.titre || chunk.sous_titre || `Chapitre ${chunk.chapitre}`,
          texte: chunk.texte,
          score: score
        });
      }
    }
  }
  
  if (resultats.length === 0) return null;
  
  resultats.sort((a, b) => b.score - a.score);
  return resultats[0];
}

// ------------------------------
// CHARGEMENT DU DICTIONNAIRE (JSON EXTERNE)
// ------------------------------
async function chargerDictionnaire() {
    showLoader();
    console.log("📥 Chargement du dictionnaire...");
    
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), 5000);
    });
    
    try {
        const chemins = [
            "data/mots.json",
            "./data/mots.json",
            "../data/mots.json"
        ];
        
        let data = null;
        
        for (const chemin of chemins) {
            try {
                console.log(`  - Tentative: ${chemin}`);
                const response = await Promise.race([
                    fetch(chemin),
                    timeoutPromise
                ]);
                
                if (response && response.ok) {
                    data = await response.json();
                    console.log(`✅ Dictionnaire chargé depuis ${chemin}`);
                    break;
                }
            } catch(e) {
                console.log(`  - Échec: ${chemin}`);
            }
        }
        
        if (data && data.length) {
            vocabulaire = data;
        } else {
            throw new Error("Aucun fichier trouvé");
        }
        
    } catch (error) {
        console.error("❌ Erreur chargement:", error);
        showToast("Erreur de chargement du dictionnaire", "error");
        
        vocabulaire = [
            {"mot":"Báy","cat":"vt.","fr":"Pouvoir (faire)","en":"Able, to be"},
            {"mot":"Yiddár","cat":"vi.","fr":"Être en vie","en":"Alive, to be"},
            {"mot":"Káamil","cat":"quantifier","fr":"Tout","en":"All"}
        ];
        showToast("Utilisation du dictionnaire par défaut", "warning");
    }
    
    motsListe = vocabulaire.map((item, idx) => ({ ...item, index: idx }));
    
    const statsContainer = document.getElementById("statsContainer");
    if (statsContainer) {
        const statMots = document.getElementById("statMots");
        if (statMots) statMots.textContent = vocabulaire.length;
        statsContainer.hidden = false;
    }
    
    console.log(`✅ ${vocabulaire.length} mots chargés`);
    
    if (vocabulaire.length) {
        construireIndexAlphabet();
        if (vocabulaire[0]) afficherMot(vocabulaire[0]);
    }
    
    hideLoader();
}

// ------------------------------
// AFFICHAGE MOT
// ------------------------------
function afficherMot(item) {
    if (!item || !item.mot) {
        console.warn("Item invalide:", item);
        return;
    }
    
    motActuel = item;
    currentIndex = motsListe.findIndex(m => m.mot === item.mot);
    
    if (compteurMot && motsListe.length) {
        compteurMot.textContent = `${currentIndex + 1} / ${motsListe.length}`;
    }
    
    if (btnPrev) btnPrev.disabled = currentIndex <= 0;
    if (btnNext) btnNext.disabled = currentIndex >= motsListe.length - 1;
    
    if (motElem) {
        motElem.textContent = item.mot;
        motElem.style.opacity = 0;
        setTimeout(() => {
            if (motElem) motElem.style.opacity = 1;
        }, 50);
    }
    
    if (defElem) {
        let definition = "";
        if (langueActuelle === "fr" && item.fr) {
            definition = item.fr;
        } else if (langueActuelle === "en" && item.en) {
            definition = item.en;
        } else if (item.fr) {
            definition = item.fr;
        } else {
            definition = "Définition non disponible";
        }
        
        defElem.innerHTML = `
            <p><strong>📂 Catégorie :</strong> ${escapeHtml(item.cat || "Général")}</p>
            <p><strong>${langueActuelle.toUpperCase()} :</strong> ${escapeHtml(definition)}</p>
        `;
    }
    
    if (audioElem) {
        if (item.audio && item.audio.trim()) {
            audioElem.src = `audio/${item.audio}`;
            audioElem.hidden = false;
            audioElem.load();
        } else {
            audioElem.removeAttribute("src");
            audioElem.hidden = true;
        }
    }
    
    ajouterHistorique(item.mot);
}

function navigationPrecedent() {
    if (currentIndex > 0 && motsListe[currentIndex - 1]) {
        afficherMot(motsListe[currentIndex - 1]);
    }
}

function navigationSuivant() {
    if (currentIndex < motsListe.length - 1 && motsListe[currentIndex + 1]) {
        afficherMot(motsListe[currentIndex + 1]);
    }
}

// ------------------------------
// CHANGEMENT LANGUE
// ------------------------------
window.changerLangue = function(lang) {
    langueActuelle = lang;
    if (motActuel) afficherMot(motActuel);
    
    document.querySelectorAll(".lang-btn").forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive);
    });
};

// ------------------------------
// RECHERCHE
// ------------------------------
function chercher(queryRaw) {
    const query = normalizeText(queryRaw);
    if (!query || !vocabulaire.length) return [];
    
    const resultats = [];
    
    for (const item of vocabulaire) {
        let score = Infinity;
        
        const motNorm = normalizeText(item.mot);
        if (motNorm.includes(query)) {
            score = motNorm.startsWith(query) ? 0 : 1;
        }
        
        if (score > 1 && item.fr) {
            const frNorm = normalizeText(item.fr);
            if (frNorm.includes(query)) {
                score = frNorm.startsWith(query) ? 1 : 2;
            }
        }
        
        if (score > 2 && item.en) {
            const enNorm = normalizeText(item.en);
            if (enNorm.includes(query)) {
                score = enNorm.startsWith(query) ? 2 : 3;
            }
        }
        
        if (score === Infinity && item.mot) {
            const dist = levenshtein(motNorm, query);
            if (dist <= Math.max(2, Math.floor(query.length * 0.4))) {
                score = 4 + dist;
            }
        }
        
        if (score < Infinity) {
            resultats.push({ item, score });
        }
    }
    
    return resultats
        .sort((a, b) => a.score - b.score)
        .slice(0, 12)
        .map(r => r.item);
}

function highlightMatch(text, queryRaw) {
    if (!text || !queryRaw) return escapeHtml(text);
    const normText = normalizeText(text);
    const normQuery = normalizeText(queryRaw);
    const idx = normText.indexOf(normQuery);
    if (idx === -1) return escapeHtml(text);
    
    return `${escapeHtml(text.slice(0, idx))}<mark style="background:rgba(255,255,0,0.3);padding:0 .1rem;border-radius:2px">${escapeHtml(text.slice(idx, idx + queryRaw.length))}</mark>${escapeHtml(text.slice(idx + queryRaw.length))}`;
}

if (searchBar) {
    searchBar.addEventListener("input", (e) => {
        const raw = e.target.value.trim();
        
        if (clearSearchBtn) {
            clearSearchBtn.hidden = !raw;
        }
        
        if (!suggestionsList) return;
        suggestionsList.innerHTML = "";
        suggestionsList.classList.remove("show");
        
        if (!raw) return;
        
        const resultats = chercher(raw);
        
        if (!resultats.length) {
            const li = document.createElement("li");
            li.textContent = "🔍 Aucun résultat";
            li.style.padding = "10px";
            li.style.textAlign = "center";
            suggestionsList.appendChild(li);
        } else {
            resultats.forEach(item => {
                let matchedText = item.mot;
                let langLabel = "Tadaksahak";
                const rawNorm = normalizeText(raw);
                
                if (item.fr && normalizeText(item.fr).includes(rawNorm)) {
                    matchedText = item.fr;
                    langLabel = "Français";
                } else if (item.en && normalizeText(item.en).includes(rawNorm)) {
                    matchedText = item.en;
                    langLabel = "English";
                }
                
                const li = document.createElement("li");
                li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong> — <span>${highlightMatch(matchedText, raw)}</span> <em style="opacity:.6">(${langLabel})</em>`;
                li.style.cursor = "pointer";
                li.addEventListener("click", () => {
                    if (searchBar) searchBar.value = item.mot;
                    suggestionsList.innerHTML = "";
                    suggestionsList.classList.remove("show");
                    afficherMot(item);
                });
                suggestionsList.appendChild(li);
            });
        }
        suggestionsList.classList.add("show");
    });
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
            if (searchBar) {
                searchBar.value = "";
                searchBar.focus();
                clearSearchBtn.hidden = true;
                if (suggestionsList) {
                    suggestionsList.innerHTML = "";
                    suggestionsList.classList.remove("show");
                }
            }
        });
    }
}

// ------------------------------
// HISTORIQUE MOTS
// ------------------------------
function chargerHistorique() {
    historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
    afficherHistorique();
}

function ajouterHistorique(mot) {
    historique = JSON.parse(localStorage.getItem("historiqueTadakssahak")) || [];
    historique = historique.filter(m => m !== mot);
    historique.unshift(mot);
    if (historique.length > 10) historique.pop();
    localStorage.setItem("historiqueTadakssahak", JSON.stringify(historique));
    afficherHistorique();
}

function afficherHistorique() {
    const footer = document.querySelector("footer");
    let bloc = document.getElementById("historique");
    if (!bloc && footer) {
        bloc = document.createElement("div");
        bloc.id = "historique";
        Object.assign(bloc.style, { marginTop: "1rem", color: "#ccc", fontSize: "0.85rem" });
        footer.appendChild(bloc);
    }
    if (bloc) {
        bloc.innerHTML = historique.length ? 
            `<strong>📜 Derniers mots :</strong> ${historique.map(m => `<span class='mot-historique' data-mot="${escapeHtml(m)}" style="cursor:pointer;margin:0 5px;">${escapeHtml(m)}</span>`).join(", ")}` : 
            "<em>Aucun mot consulté récemment.</em>";
        
        bloc.querySelectorAll(".mot-historique").forEach(el => {
            el.addEventListener("click", () => {
                const mot = vocabulaire.find(v => v.mot === el.dataset.mot);
                if (mot) afficherMot(mot);
            });
        });
    }
}

// ------------------------------
// INDEX ALPHABETIQUE
// ------------------------------
function construireIndexAlphabet() {
    const container = document.getElementById("alphabetIndex");
    const wordListContainer = document.getElementById("wordList");
    if (!container || !wordListContainer || !vocabulaire.length) return;
    
    const letters = [...new Set(vocabulaire
        .map(v => v.mot?.[0]?.toUpperCase())
        .filter(Boolean)
    )].sort();
    
    container.innerHTML = "";
    
    letters.forEach(l => {
        const btn = document.createElement("button");
        btn.textContent = l;
        btn.className = "alphabet-btn";
        btn.setAttribute("aria-label", `Lettres commençant par ${l}`);
        btn.addEventListener("click", () => {
            wordListContainer.innerHTML = "";
            const motsFiltres = vocabulaire.filter(v => v.mot?.toUpperCase().startsWith(l));
            motsFiltres.forEach(m => {
                const div = document.createElement("div");
                div.textContent = m.mot;
                div.className = "mot-item";
                div.setAttribute("role", "button");
                div.setAttribute("tabindex", "0");
                div.addEventListener("click", () => afficherMot(m));
                div.addEventListener("keypress", (e) => {
                    if (e.key === "Enter") afficherMot(m);
                });
                wordListContainer.appendChild(div);
            });
        });
        container.appendChild(btn);
    });
}

// ------------------------------
// LIVRES (DYNAMIQUE)
// ------------------------------
async function afficherLivres() {
    const cont = document.getElementById("livresContainer");
    if (!cont) return;
    
    cont.innerHTML = `<div class="loading-books">📚 Chargement des livres...</div>`;
    
    try {
        const response = await fetch('data/livres.json');
        if (!response.ok) throw new Error('Impossible de charger les livres');
        
        const livres = await response.json();
        
        if (!livres.length) {
            cont.innerHTML = `<p class="info-message">📚 Aucun livre disponible pour le moment.</p>`;
            return;
        }
        
        cont.innerHTML = livres.map(livre => `
            <div class="livre-card">
                <div class="livre-titre">📖 ${escapeHtml(livre.titre)}</div>
                <div class="livre-auteur">✍️ ${escapeHtml(livre.auteur)}</div>
                <div class="livre-desc">${escapeHtml(livre.description || '')}</div>
                <div class="livre-meta">🏷️ ${escapeHtml(livre.categorie || 'Général')} • 📅 ${livre.annee || '?'} • 📄 ${livre.pages || '?'} pages</div>
                <div class="livre-actions">
                    <a href="livre-viewer.html?id=${livre.id}" class="btn-small" target="_blank" rel="noopener noreferrer">📖 Lire l'ouvrage</a>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Erreur chargement livres:', error);
        cont.innerHTML = `<p class="error-message">❌ Erreur de chargement des livres. Vérifiez que le fichier data/livres.json existe.</p>`;
    }
}

// ------------------------------
// CHATBOT
// ------------------------------
function afficheMsg(user, html) {
    const chatWindow = document.getElementById("chatWindow");
    if (!chatWindow) return;
    
    const div = document.createElement("div");
    div.className = `message ${user}`;
    div.innerHTML = `<strong>${user === "bot" ? "🤖 Hamadine" : "👤 Vous"} :</strong> ${html}`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function reponseBot(txt) {
    const clean = txt.toLowerCase().trim();
    
    if (contientInsulte(clean)) {
        return reponsePolieInsulte();
    }
    
    const salutations = ["bonjour", "salut", "hello", "salam", "bsr", "bjr", "coucou", "hé", "hey", "yo"];
    if (salutations.some(s => clean.includes(s))) {
        const reponses = [
            "👋 Salam aleikum ! Je suis Hamadine, gardien de la langue Tadaksahak et des savoirs Idaksahak. Que souhaitez-vous explorer aujourd'hui ?",
            "🌞 Bonjour à vous ! Je connais les deux livres de la bibliothèque. Posez-moi une question sur les Idaksahak ou les Touaregs du Mali.",
            "📚 Bienvenue ! Je peux vous parler du dictionnaire, des livres, ou répondre à vos questions sur la culture sahélienne."
        ];
        return reponses[Math.floor(Math.random() * reponses.length)];
    }
    
    if (/(merci|thanks|chokran|gracias|thank you)/i.test(clean)) {
        return "🙏 De rien ! La sagesse se partage. N'hésitez pas à me poser d'autres questions sur les livres ou le dictionnaire.";
    }
    
    const motsDico = ["dictionnaire", "dico", "mot", "vocabulaire", "tadaksahak", "langue", "traduction", "signification"];
    if (motsDico.some(m => clean.includes(m)) && !clean.includes("livre")) {
        return "📖 Rendez-vous dans la section Dictionnaire. Vous pouvez :\n• Taper un mot dans la barre de recherche\n• Parcourir l'index alphabétique\n• Écouter la prononciation (quand disponible)\n• Chercher en français ou en anglais\n\n💡 Essayez de taper un mot comme « Báy » ou « Yiddár » !";
    }
    
    const motsLivres = ["livre", "bibliothèque", "bibliotheque", "ouvrage", "chapitre", "lire", "livres"];
    if (motsLivres.some(m => clean.includes(m))) {
        const reponses = [
            "📚 La bibliothèque contient deux ouvrages :\n\n1️⃣ « L'émancipation politique des Idaksahak » de Charles Grémont (2023) — Anthropologie politique\n\n2️⃣ « Les Périls d'une Époque Touarègue au Mali » (œuvre en construction) — Sciences politiques\n\n🔍 Posez-moi une question précise sur leur contenu !",
            "📖 Vous pouvez accéder aux livres depuis la section dédiée. Je peux aussi vous répondre directement : demandez-moi par exemple « Que disent les Idaksahak d'eux-mêmes ? »"
        ];
        return reponses[Math.floor(Math.random() * reponses.length)];
    }
    
    const motsAudio = ["audio", "musique", "chant", "chanson", "son", "écouter", "podcast"];
    if (motsAudio.some(m => clean.includes(m))) {
        return "🎵 La section Audio proposera bientôt des chants traditionnels Idaksahak, des poésies tamasheq et des enregistrements linguistiques. Revenez bientôt !";
    }
    
    if (livresConnaissance) {
        const resultatLivre = chercherDansLivres(txt);
        if (resultatLivre) {
            return `📖 D'après « ${resultatLivre.livre} » (${resultatLivre.auteur}), chapitre ${resultatLivre.chapitre} — « ${resultatLivre.titre} » :\n\n“${resultatLivre.texte}”\n\n💡 Posez-moi d'autres questions sur ce livre !`;
        }
    }
    
    const motsHistoire = ["histoire", "culture", "origine", "tradition", "coutume", "peuple", "ancêtre", "héritage"];
    if (motsHistoire.some(m => clean.includes(m))) {
        const reponses = [
            "📜 Les Idaksahak sont un peuple sahélien à la riche histoire. Leur langue, le Tadaksahak, est un trésor vivant mêlant influences tamasheq, songhay et arabe. Consultez le livre de Charles Grémont pour une analyse approfondie !",
            "🏜️ Les Touaregs, appelés « Hommes bleus », vivent dans le Sahara depuis des millénaires. Leur culture nomade, leur poésie et leur artisanat sont uniques. Le livre « Les Périls d'une Époque Touarègue » explore leur situation contemporaine."
        ];
        return reponses[Math.floor(Math.random() * reponses.length)];
    }
    
    if (clean.includes("idaksahak")) {
        return "🏜️ Les Idaksahak sont un groupe pastoral du nord-est du Mali (Ménaka et Gao). Ils parlent le tadaksahak, une langue mêlant tamasheq et songhay. Leur histoire politique est marquée par une émancipation progressive, racontée dans le livre de Charles Grémont. Posez-moi une question précise !";
    }
    
    if (clean.includes("touareg") || clean.includes("touarègue")) {
        return "🌍 Les Touaregs (Kel Tamasheq) sont un peuple berbère nomade du Sahara. Au Mali, ils vivent principalement dans le Nord (Kidal, Gao, Tombouctou, Ménaka). Le livre « Les Périls d'une Époque Touarègue au Mali » explore leurs défis politiques, économiques et culturels.";
    }
    
    if (vocabulaire && vocabulaire.length) {
        const motTrouve = vocabulaire.find(v => 
            normalizeText(v.mot).includes(clean) || 
            (v.fr && normalizeText(v.fr).includes(clean)) ||
            (v.en && normalizeText(v.en).includes(clean))
        );
        
        if (motTrouve) {
            return `📖 <strong>${motTrouve.mot}</strong><br>• 📂 ${motTrouve.cat || "Général"}<br>• 🇫🇷 ${motTrouve.fr || "—"}<br>• 🇬🇧 ${motTrouve.en || "—"}<br><br>💡 Tapez ce mot dans la barre de recherche du dictionnaire pour plus de détails et l'audio.`;
        }
    }
    
    const motsAide = ["aide", "help", "quoi faire", "commande", "instruction", "tuto", "guide"];
    if (motsAide.some(m => clean.includes(m))) {
        return "🤖 <strong>Ce que je sais faire :</strong>\n\n📖 <strong>Dictionnaire</strong> → Chercher un mot, index alphabétique, français/anglais\n📚 <strong>Livres</strong> → Consulter les deux ouvrages, poser des questions sur leur contenu\n🎵 <strong>Audio</strong> → Chants et musiques (bientôt)\n💬 <strong>Questions culturelles</strong> → Histoire, traditions, langue\n\n🔍 <strong>Exemples de questions :</strong>\n• « Que disent les Idaksahak d'eux-mêmes ? »\n• « Quelles sont les causes des tourments touaregs ? »\n• « Quel est le rôle des femmes touarègues ? »\n• « Que veut dire Báy en français ? »\n\n⚠️ Je réponds poliment, merci de faire de même !";
    }
    
    return "🤔 Je n'ai pas bien compris votre demande.\n\n🔍 <strong>Essayez :</strong>\n• « dictionnaire » ou un mot comme « Báy »\n• « livres » pour voir les ouvrages\n• Une question précise sur un livre (ex: « Que disent les Idaksahak d'eux-mêmes ? »)\n• « aide » pour voir toutes mes capacités\n\n📖 Je réponds à vos questions sur les deux livres, le dictionnaire et la culture sahélienne !";
}

function traiterSaisie() {
    const input = document.getElementById("chatInput");
    const txt = input?.value.trim();
    if (!txt) return;
    
    input.value = "";
    input.disabled = true;
    afficheMsg("user", escapeHtml(txt));
    
    setTimeout(() => {
        afficheMsg("bot", reponseBot(txt));
        input.disabled = false;
        input.focus();
    }, 400);
}

function initChatSuggestions() {
    const suggestions = document.querySelectorAll(".chat-suggestion");
    const chatInput = document.getElementById("chatInput");
    
    suggestions.forEach(btn => {
        btn.addEventListener("click", () => {
            if (chatInput) {
                chatInput.value = btn.textContent.trim();
                traiterSaisie();
            }
        });
    });
}

// Message d'accueil automatique du bot
function afficherMessageAccueilBot() {
    setTimeout(() => {
        const messageAccueil = "👋 Salam aleikum ! Je suis Hamadine, gardien de la langue Tadaksahak et des savoirs Idaksahak.\n\n📘 Tape « aide » pour voir ce que je peux faire.\n\n🔍 Exemples :\n• « Que disent les Idaksahak d'eux-mêmes ? »\n• « Quelles sont les causes des tourments touaregs ? »\n• « Que veut dire Báy ? »\n• « Livres »\n\n📚 N'hésitez pas à consulter les deux livres dans la section Livres !";
        afficheMsg("bot", messageAccueil);
    }, 800);
}

// ------------------------------
// AUDIO
// ------------------------------
function genererAlbumsAudio() {
    const conteneur = document.getElementById("audioContainer");
    if (!conteneur) return;
    conteneur.innerHTML = "<p class='info-message'>🎵 Pistes audio à venir prochainement...</p>";
}

// ------------------------------
// NAVIGATION ENTRE SECTIONS
// ------------------------------
function initNavigation() {
    if (!sectionSelector) return;
    
    const sections = document.querySelectorAll("main > section");
    
    function showSection(id) {
        sections.forEach(sec => {
            sec.hidden = sec.id !== id;
        });
        localStorage.setItem("tadaksahak_active_section", id);
        
        if (id === "livres") afficherLivres();
        if (id === "audio") genererAlbumsAudio();
        
        // Réafficher la bannière si elle a été fermée et qu'on change de section
        const banniere = document.getElementById("banniereAnimée");
        if (banniere && localStorage.getItem("bannierefermee") === "true") {
            // Ne pas réafficher si déjà fermée manuellement
        }
    }
    
    sectionSelector.addEventListener("change", (e) => {
        showSection(e.target.value);
    });
    
    const savedSection = localStorage.getItem("tadaksahak_active_section");
    const defaultSection = (savedSection && document.getElementById(savedSection)) ? savedSection : "accueil";
    sectionSelector.value = defaultSection;
    showSection(defaultSection);
}

// ------------------------------
// ÉVÉNEMENTS DIVERS
// ------------------------------
document.getElementById("btnEnvoyer")?.addEventListener("click", traiterSaisie);
document.getElementById("chatInput")?.addEventListener("keypress", e => e.key === "Enter" && traiterSaisie());

document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        if (lang) changerLangue(lang);
    });
});

btnPrev?.addEventListener("click", navigationPrecedent);
btnNext?.addEventListener("click", navigationSuivant);

document.getElementById("btnGoDico")?.addEventListener("click", () => {
    if (sectionSelector) {
        sectionSelector.value = "dictionnaire";
        sectionSelector.dispatchEvent(new Event("change"));
    }
});

document.getElementById("toggleChatBot")?.addEventListener("click", () => {
    if (sectionSelector) {
        sectionSelector.value = "chat";
        sectionSelector.dispatchEvent(new Event("change"));
    }
});

// ------------------------------
// INITIALISATION PRINCIPALE
// ------------------------------
async function initialiserApplication() {
    console.log("🚀 Initialisation...");
    
    initNavigation();
    ajouterBanniereAnimée();  // Ajoute la bannière animée dans toutes les sections
    await chargerLivresConnaissance();
    await chargerDictionnaire();
    chargerHistorique();
    genererAlbumsAudio();
    initChatSuggestions();
    afficherMessageAccueilBot();  // Message d'accueil automatique du bot
    
    console.log("✅ Application prête !");
}

// Démarrer
initialiserApplication();

// Exporter fonctions globales
window.afficherMot = afficherMot;
window.jouerTadaksahak = () => {
    if (audioElem && motActuel?.audio) {
        audioElem.play().catch(e => console.warn("Erreur lecture audio:", e));
    }
};
