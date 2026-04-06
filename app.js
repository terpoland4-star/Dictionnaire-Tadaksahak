// ==============================
// APPLICATION TADAKSAHAK LEARNING
// VERSION FINALE - CHARGEMENT JSON EXTERNE
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
// CHARGEMENT DU DICTIONNAIRE (JSON EXTERNE)
// ------------------------------
async function chargerDictionnaire() {
    showLoader();
    console.log("📥 Chargement du dictionnaire...");
    
    // Timeout de sécurité (5 secondes max)
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), 5000);
    });
    
    try {
        // Essayer plusieurs chemins possibles
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
        
        // Fallback : données minimales
        vocabulaire = [
            {"mot":"Báy","cat":"vt.","fr":"Pouvoir (faire)","en":"Able, to be"},
            {"mot":"Yiddár","cat":"vi.","fr":"Être en vie","en":"Alive, to be"},
            {"mot":"Káamil","cat":"quantifier","fr":"Tout","en":"All"}
        ];
        showToast("Utilisation du dictionnaire par défaut", "warning");
    }
    
    // Préparer la liste pour navigation
    motsListe = vocabulaire.map((item, idx) => ({ ...item, index: idx }));
    
    // Mettre à jour les statistiques
    const statsContainer = document.getElementById("statsContainer");
    if (statsContainer) {
        const statMots = document.getElementById("statMots");
        if (statMots) statMots.textContent = vocabulaire.length;
        statsContainer.hidden = false;
    }
    
    console.log(`✅ ${vocabulaire.length} mots chargés`);
    
    // Initialiser les composants qui dépendent du dictionnaire
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
    
    // Mettre à jour compteur
    if (compteurMot && motsListe.length) {
        compteurMot.textContent = `${currentIndex + 1} / ${motsListe.length}`;
    }
    
    // Mettre à jour boutons navigation
    if (btnPrev) btnPrev.disabled = currentIndex <= 0;
    if (btnNext) btnNext.disabled = currentIndex >= motsListe.length - 1;
    
    // Afficher mot avec animation
    if (motElem) {
        motElem.textContent = item.mot;
        motElem.style.opacity = 0;
        setTimeout(() => {
            if (motElem) motElem.style.opacity = 1;
        }, 50);
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
        
        // Chercher dans le mot Tadaksahak
        const motNorm = normalizeText(item.mot);
        if (motNorm.includes(query)) {
            score = motNorm.startsWith(query) ? 0 : 1;
        }
        
        // Chercher en français
        if (score > 1 && item.fr) {
            const frNorm = normalizeText(item.fr);
            if (frNorm.includes(query)) {
                score = frNorm.startsWith(query) ? 1 : 2;
            }
        }
        
        // Chercher en anglais
        if (score > 2 && item.en) {
            const enNorm = normalizeText(item.en);
            if (enNorm.includes(query)) {
                score = enNorm.startsWith(query) ? 2 : 3;
            }
        }
        
        // Recherche floue
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
                <a href="livre.html" class="btn-small" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:inline-block;text-align:center;">📖 Lire l'ouvrage</a>
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
    conteneur.innerHTML = "<p class='info-message'>🎵 Pistes audio à venir prochainement...</p>";
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
    const clean = txt.toLowerCase();
    
    // Salutations
    if (/(bonjour|salut|hello|salam|bsr|bjr)/i.test(clean)) {
        return "👋 Bonjour ! Je suis Hamadine, gardien de la langue Tadaksahak. Que souhaitez-vous explorer aujourd'hui ?";
    }
    
    if (/(merci|thanks|chokran)/i.test(clean)) {
        return "🙏 De rien ! La sagesse se partage.";
    }
    
    // Navigation
    if (clean.includes("dictionnaire") || clean.includes("dico") || clean.includes("mot")) {
        return "📖 Rendez-vous dans la section Dictionnaire et tapez un mot dans la barre de recherche !";
    }
    
    if (clean.includes("livre") || clean.includes("bibliothèque")) {
        return "📚 La section Livres vous attend ! Vous y trouverez 'L'émancipation politique des Idaksahak' de Charles Grémont.";
    }
    
    if (clean.includes("audio") || clean.includes("musique") || clean.includes("chant")) {
        return "🎵 La section Audio proposera bientôt des chants et musiques traditionnels Idaksahak.";
    }
    
    if (clean.includes("histoire") || clean.includes("culture") || clean.includes("origine")) {
        return "📜 Les Idaksahak sont un peuple sahélien à la riche histoire. Leur langue, le Tadaksahak, est un trésor vivant mêlant influences tamasheq, songhay et arabe.";
    }
    
    // Recherche de mot
    if (vocabulaire.length) {
        const motTrouve = vocabulaire.find(v => 
            normalizeText(v.mot).includes(clean) || 
            (v.fr && normalizeText(v.fr).includes(clean))
        );
        
        if (motTrouve) {
            return `📖 <strong>${motTrouve.mot}</strong><br>• 📂 ${motTrouve.cat || "Général"}<br>• 🇫🇷 ${motTrouve.fr || "—"}<br><br>💡 Tapez ce mot dans la barre de recherche du dictionnaire pour plus de détails.`;
        }
    }
    
    // Aide
    if (clean.includes("aide") || clean.includes("help") || clean.includes("quoi faire")) {
        return "🤖 <strong>Ce que je sais faire :</strong><br>• 📖 Vous guider dans le dictionnaire<br>• 📚 Vous parler des livres disponibles<br>• 🧭 Naviguer vers les sections<br><br>Que souhaitez-vous explorer ?";
    }
    
    return "🤔 Je n'ai pas bien compris. Essayez : « dictionnaire », « livres », « audio », « histoire », ou un mot en Tadaksahak. Dites « aide » pour voir ce que je peux faire !";
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
        
        // Déclencher des actions spécifiques selon la section
        if (id === "livres") afficherLivres();
        if (id === "audio") genererAlbumsAudio();
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

// Bouton accès dictionnaire depuis accueil
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

// ------------------------------
// INITIALISATION PRINCIPALE
// ------------------------------
async function initialiserApplication() {
    console.log("🚀 Initialisation...");
    
    initNavigation();
    await chargerDictionnaire();
    chargerHistorique();
    genererAlbumsAudio();
    initChatSuggestions();
    
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
