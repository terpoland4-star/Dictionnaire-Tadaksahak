// ==============================
// APPLICATION TADAKSAHAK LEARNING
// VERSION CORRIGÉE - FONCTIONNE IMMÉDIATEMENT
// ==============================

console.log("🚀 Démarrage de l'application...");

// ------------------------------
// DONNÉES INTÉGRÉES (pour test immédiat)
// ------------------------------
const DONNEES_DE_TEST = [
  {"mot":"Báy","cat":"vt.","fr":"Pouvoir (faire)","en":"Able, to be"},
  {"mot":"Yiddár","cat":"vi.","fr":"Être en vie","en":"Alive, to be"},
  {"mot":"Káamil","cat":"quantifier","fr":"Tout","en":"All"},
  {"mot":"Ka","cat":"postp.","fr":"Parmi","en":"Among"},
  {"mot":"Hór","cat":"vi.","fr":"S'amuser","en":"Amuse oneself, to"},
  {"mot":"Baabá","cat":"n.","fr":"Ancêtre paternel","en":"Ancestor (paternal)"},
  {"mot":"Ǝnda","cat":"prep.","fr":"Et (entre noms)","en":"And (between noun phrases)"},
  {"mot":"A-múudǝr","cat":"n.","fr":"Animal","en":"Animal"},
  {"mot":"Mán","cat":"vt.","fr":"Approcher","en":"Approach, to"},
  {"mot":"Kambá","cat":"n.","fr":"Bras / main","en":"Arm / hand"}
];

// Variables globales
let vocabulaire = [];
let motActuel = null;
let langueActuelle = "fr";
let historique = [];
let albumsAudio = [];
let currentIndex = -1;
let motsListe = [];

window.livresData = [];
window.histoireData = {};

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
// UTILITAIRES
// ------------------------------
const escapeHtml = str => str ? String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;") : "";

const normalizeText = s => s ? s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase() : "";

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
    
    // Mettre à jour compteur
    if (compteurMot && motsListe.length) {
        compteurMot.textContent = `${currentIndex + 1} / ${motsListe.length}`;
    }
    
    // Mettre à jour boutons navigation
    if (btnPrev) btnPrev.disabled = currentIndex <= 0;
    if (btnNext) btnNext.disabled = currentIndex >= motsListe.length - 1;
    
    // Afficher mot
    if (motElem) {
        motElem.textContent = item.mot;
    }
    
    // Afficher définition
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
    
    // Gérer audio
    if (audioElem) {
        if (item.audio && item.audio.trim()) {
            audioElem.src = `audio/${item.audio}`;
            audioElem.hidden = false;
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
    
    return vocabulaire.filter(item => {
        const motMatch = normalizeText(item.mot).includes(query);
        const frMatch = item.fr && normalizeText(item.fr).includes(query);
        const enMatch = item.en && normalizeText(item.en).includes(query);
        return motMatch || frMatch || enMatch;
    }).slice(0, 12);
}

function highlightMatch(text, queryRaw) {
    if (!text || !queryRaw) return escapeHtml(text);
    const normText = normalizeText(text);
    const normQuery = normalizeText(queryRaw);
    const idx = normText.indexOf(normQuery);
    if (idx === -1) return escapeHtml(text);
    
    return `${escapeHtml(text.slice(0, idx))}<mark style="background:rgba(255,255,0,0.3);padding:0 .1rem;border-radius:2px">${escapeHtml(text.slice(idx, idx + queryRaw.length))}</mark>${escapeHtml(text.slice(idx + queryRaw.length))}`;
}

// Événements recherche
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
                const li = document.createElement("li");
                li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong> — ${escapeHtml(item.fr || "")}`;
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
        btn.addEventListener("click", () => {
            wordListContainer.innerHTML = "";
            const motsFiltres = vocabulaire.filter(v => v.mot?.toUpperCase().startsWith(l));
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

// ------------------------------
// CHATBOT SIMPLIFIÉ
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
    const clean = txt.toLowerCase();
    
    if (/(bonjour|salut|hello|salam)/i.test(clean)) {
        return "👋 Bonjour ! Je suis Hamadine, gardien de la langue Tadaksahak. Que souhaitez-vous explorer ?";
    }
    
    if (clean.includes("dictionnaire") || clean.includes("mot")) {
        return "📖 Tapez un mot dans la barre de recherche du dictionnaire !";
    }
    
    if (clean.includes("histoire") || clean.includes("culture")) {
        return "📚 Les Idaksahak ont une riche histoire. Consultez la section livres !";
    }
    
    return "🤔 Je n'ai pas compris. Essayez : 'bonjour', 'dictionnaire' ou 'histoire'.";
}

function traiterSaisie() {
    const input = document.getElementById("chatInput");
    const txt = input?.value.trim();
    if (!txt) return;
    
    input.value = "";
    afficheMsg("user", escapeHtml(txt));
    setTimeout(() => afficheMsg("bot", reponseBot(txt)), 300);
}

// ------------------------------
// LIVRES
// ------------------------------
function afficherLivres() {
    const cont = document.getElementById("livresContainer");
    if (!cont) return;
    
    cont.innerHTML = `
        <div class="livre-card">
            <div class="livre-titre">📖 L'émancipation politique des Idaksahak</div>
            <div class="livre-auteur">✍️ Charles Grémont</div>
            <div class="livre-desc">Une analyse anthropologique de l'émergence politique des Idaksahak au Mali</div>
            <div class="livre-meta">🏷️ Histoire • 🌍 Français</div>
            <div class="livre-actions">
                <a href="livre.html" class="btn-small" target="_blank" style="text-decoration:none;display:inline-block;text-align:center;">📖 Lire</a>
            </div>
        </div>
    `;
}

// ------------------------------
// AUDIO
// ------------------------------
function genererAlbumsAudio() {
    const conteneur = document.getElementById("audioContainer");
    if (!conteneur) return;
    conteneur.innerHTML = "<p class='info-message'>🎵 Pistes audio à venir...</p>";
}

// ------------------------------
// INITIALISATION AVEC DONNÉES DE TEST
// ------------------------------
function initialiserApplication() {
    console.log("📥 Initialisation avec données de test...");
    
    // Charger les données de test immédiatement
    vocabulaire = DONNEES_DE_TEST;
    motsListe = vocabulaire.map((item, idx) => ({ ...item, index: idx }));
    
    // Cacher le loader
    const loader = document.getElementById("loadingOverlay");
    if (loader) loader.hidden = true;
    
    // Afficher les stats
    const statsContainer = document.getElementById("statsContainer");
    if (statsContainer) {
        document.getElementById("statMots").textContent = vocabulaire.length;
        document.getElementById("statAudios").textContent = "0";
        document.getElementById("statLivres").textContent = "1";
        statsContainer.hidden = false;
    }
    
    // Initialiser les composants
    construireIndexAlphabet();
    chargerHistorique();
    genererAlbumsAudio();
    afficherLivres();
    
    // Afficher le premier mot
    if (vocabulaire.length) {
        afficherMot(vocabulaire[0]);
    }
    
    console.log(`✅ ${vocabulaire.length} mots chargés`);
    console.log("✅ Application prête !");
}

// ------------------------------
// ÉVÉNEMENTS
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

// Bouton accès dictionnaire
document.getElementById("btnGoDico")?.addEventListener("click", () => {
    if (sectionSelector) {
        sectionSelector.value = "dictionnaire";
        sectionSelector.dispatchEvent(new Event("change"));
    }
});

// Chat flottant
document.getElementById("toggleChatBot")?.addEventListener("click", () => {
    if (sectionSelector) {
        sectionSelector.value = "chat";
        sectionSelector.dispatchEvent(new Event("change"));
    }
});

// Navigation sections
if (sectionSelector) {
    sectionSelector.addEventListener("change", (e) => {
        const sections = document.querySelectorAll("main > section");
        sections.forEach(sec => {
            sec.hidden = sec.id !== e.target.value;
        });
        localStorage.setItem("tadaksahak_active_section", e.target.value);
    });
    
    const savedSection = localStorage.getItem("tadaksahak_active_section");
    if (savedSection && document.getElementById(savedSection)) {
        sectionSelector.value = savedSection;
        sectionSelector.dispatchEvent(new Event("change"));
    }
}

// DÉMARRAGE
initialiserApplication();
