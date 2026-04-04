// ==============================
// APPLICATION TADAKSAHAK LEARNING
// Version corrigée et optimisée
// ==============================

// ------------------------------
// VARIABLES GLOBALES
// ------------------------------
let vocabulaire = [];
let motActuel = null;
let langueActuelle = "fr";
let searchLang = "td";
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
function setLoading(show) {
    const loader = document.getElementById("loadingOverlay");
    if (loader) loader.hidden = !show;
}

// ------------------------------
// CHARGEMENT DONNÉES JSON
// ------------------------------
async function chargerDonnees() {
    setLoading(true);
    
    const fetches = [
        fetch("data/mots.json").then(r => r.json()).then(d => vocabulaire = d).catch(e => console.error("❌ Mots:", e)),
        fetch("data/audios.json").then(r => r.json()).then(d => albumsAudio = d).catch(e => console.warn("⚠️ Audios:", e)),
        fetch("data/livres.json").then(r => r.json()).then(d => window.livresData = d).catch(e => console.warn("⚠️ Livres:", e)),
        fetch("data/histoire.json").then(r => r.json()).then(d => window.histoireData = d).catch(e => console.warn("⚠️ Histoire:", e))
    ];
    
    await Promise.all(fetches);
    
    console.log(`✅ ${vocabulaire.length} mots chargés`);
    console.log(`✅ ${albumsAudio.length} audios`);
    console.log(`✅ ${window.livresData.length} livres`);
    
    // Préparer liste des mots pour navigation
    motsListe = vocabulaire.map((item, idx) => ({ ...item, index: idx }));
    
    setLoading(false);
    
    // Émettre événement stats
    window.dispatchEvent(new CustomEvent('dataLoaded', { 
        detail: { 
            mots: vocabulaire.length,
            audios: albumsAudio.length,
            livres: window.livresData.length
        }
    }));
    
    // Initialiser les composants
    construireIndexAlphabet();
    genererAlbumsAudio();
    chargerHistorique();
    
    // Afficher livres si section active
    if (sectionSelector && sectionSelector.value === "livres") {
        afficherLivres();
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
        
        // Attacher événements
        bloc.querySelectorAll(".mot-historique").forEach(el => {
            el.addEventListener("click", () => {
                const mot = vocabulaire.find(v => v.mot === el.dataset.mot);
                if (mot) afficherMot(mot);
            });
        });
    }
}

// ------------------------------
// AFFICHAGE MOT
// ------------------------------
function afficherMot(item) {
    if (!item) return;
    
    motActuel = item;
    currentIndex = motsListe.findIndex(m => m.mot === item.mot);
    
    // Mettre à jour compteur
    if (compteurMot) {
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
        const definition = item[langueActuelle] || "Non disponible";
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
    
    // Mettre à jour l'UI des boutons
    document.querySelectorAll(".lang-btn").forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive);
    });
};

// ------------------------------
// RECHERCHE AVEC Fuse.js
// ------------------------------
let fuse = null;

function initFuse() {
    if (window.Fuse && vocabulaire.length) {
        fuse = new window.Fuse(vocabulaire, {
            keys: ['mot', 'fr', 'en', 'td'],
            threshold: 0.3,
            includeScore: true
        });
        console.log("✅ Fuse.js initialisé");
    }
}

function chercherFuse(query) {
    if (!fuse || !query) return [];
    const results = fuse.search(query);
    return results.slice(0, 12).map(r => r.item);
}

function chercherLevenshtein(queryRaw) {
    const query = normalizeText(queryRaw);
    if (!query) return [];
    
    return vocabulaire
        .map(item => {
            const field = searchLang === "td" ? item.mot || "" : item[searchLang] || "";
            const normField = normalizeText(field);
            if (!normField) return null;
            
            let score = Infinity;
            if (normField.startsWith(query)) score = 0;
            else if (normField.includes(query)) score = 1;
            else {
                const dist = levenshtein(normField, query);
                if (dist <= Math.max(2, Math.floor(query.length * 0.4))) score = 2 + dist;
            }
            return score < Infinity ? { item, score } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.score - b.score)
        .slice(0, 12)
        .map(c => c.item);
}

function chercher(query) {
    // Priorité à Fuse.js si disponible
    if (window.Fuse && fuse) {
        return chercherFuse(query);
    }
    return chercherLevenshtein(query);
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
            li.style.opacity = ".6";
            li.style.padding = "10px";
            li.style.textAlign = "center";
            suggestionsList.appendChild(li);
        } else {
            resultats.forEach(item => {
                const matchedText = searchLang === "td" ? item.mot || "" : item[searchLang] || "";
                const langLabel = searchLang === "td" ? "Tadaksahak" : searchLang.toUpperCase();
                const li = document.createElement("li");
                li.innerHTML = `<strong>${escapeHtml(item.mot)}</strong> — <span style="opacity:.95">${highlightMatch(matchedText, raw)}</span> <em style="opacity:.6">(${langLabel})</em>`;
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
    
    // Clear search
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
    
    if (!window.livresData || !window.livresData.length) {
        cont.innerHTML = "<p class='info-message'>📚 Aucun livre disponible pour le moment.</p>";
        return;
    }
    
    cont.innerHTML = "";
    window.livresData.forEach(l => {
        const div = document.createElement("div");
        div.className = "livre-card";
        div.innerHTML = `
            <div class="livre-titre">📖 ${escapeHtml(l.titre || "Sans titre")}</div>
            <div class="livre-auteur">✍️ ${escapeHtml(l.auteur || "Auteur inconnu")}</div>
            ${l.annee ? `<div class="livre-annee">📅 ${escapeHtml(l.annee)}</div>` : ""}
            ${l.description ? `<div class="livre-desc">${escapeHtml(l.description)}</div>` : ""}
            <div class="livre-meta">🏷️ ${escapeHtml(l.type || "Général")} • 🌍 ${escapeHtml(l.langue || "Français")}</div>
            <div class="livre-actions">
                <button class="btn-lire btn-small">📖 Lire</button>
                <button class="btn-bot-livre btn-small">🤖 En savoir plus</button>
            </div>
        `;
        
        const btnLire = div.querySelector(".btn-lire");
        if (btnLire && l.lien) {
            btnLire.addEventListener("click", () => window.open(l.lien, "_blank", "noopener,noreferrer"));
        }
        
        const btnBot = div.querySelector(".btn-bot-livre");
        if (btnBot) {
            btnBot.addEventListener("click", () => {
                if (sectionSelector) {
                    sectionSelector.value = "chat";
                    sectionSelector.dispatchEvent(new Event("change"));
                }
                setTimeout(() => {
                    const chatInput = document.getElementById("chatInput");
                    if (chatInput) {
                        chatInput.value = `Parle-moi du livre "${l.titre}"`;
                        document.getElementById("btnEnvoyer")?.click();
                    }
                }, 500);
            });
        }
        
        cont.appendChild(div);
    });
}

// ------------------------------
// AUDIO ALBUMS
// ------------------------------
function genererAlbumsAudio() {
    const conteneur = document.getElementById("audioContainer");
    if (!conteneur) return;
    
    if (!albumsAudio.length) {
        conteneur.innerHTML = "<p class='info-message'>🎵 Aucune piste audio disponible.</p>";
        return;
    }
    
    conteneur.innerHTML = "";
    
    albumsAudio.forEach((piste, idx) => {
        const idLyrics = `lyrics-${idx}`;
        const bloc = document.createElement("div");
        bloc.className = "audio-bloc";
        bloc.innerHTML = `
            <p><strong>🎵 ${escapeHtml(piste.title || `Piste ${idx + 1}`)}</strong></p>
            <audio controls src="${piste.src}" preload="none"></audio>
            ${piste.lyrics ? `<button class="btnLyrics btn-small" data-target="${idLyrics}">📝 Paroles</button>
            <div id="${idLyrics}" class="lyrics-text" style="display:none;">${escapeHtml(piste.lyrics).replace(/\n/g, '<br>')}</div>` : ""}
        `;
        
        const btnLyrics = bloc.querySelector(".btnLyrics");
        if (btnLyrics) {
            btnLyrics.addEventListener("click", (e) => {
                const target = document.getElementById(e.target.dataset.target);
                if (target) {
                    target.style.display = target.style.display === "block" ? "none" : "block";
                }
            });
        }
        
        conteneur.appendChild(bloc);
    });
}

// ------------------------------
// CHATBOT
// ------------------------------
const botMemory = { lastWord: null, lang: "fr" };

function normalize(txt) { 
    return txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
}

function detectLang(txt) {
    const t = txt.toLowerCase();
    if (/[ء-ي]/.test(t)) return "ar";
    if (t.includes("ⴰ") || t.includes("tadaksahak") || t.includes("tz")) return "tz";
    return "fr";
}

function afficheMsg(user, html) {
    const chatWindow = document.getElementById("chatWindow");
    if (!chatWindow) return;
    
    const div = document.createElement("div");
    div.className = `message ${user}`;
    div.innerHTML = `<strong>${user === "bot" ? "🤖 Hamadine" : "👤 Vous"} :</strong> ${html}`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function resumeTexte(texte, niveau = "court") {
    if (!texte) return "Pas de texte disponible.";
    const phrases = texte.split(/[.!?]+/).filter(p => p.trim().length > 30);
    if (niveau === "court") return phrases.slice(0, 2).join(". ") + ".";
    if (niveau === "enfant") return `📖 Explication simple : ${phrases[0]}.`;
    return phrases.slice(0, 5).join(". ") + ".";
}

function reponseBot(txt) {
    const clean = normalize(txt);
    botMemory.lang = detectLang(txt);
    
    // Salutations
    if (/(bonjour|salut|hello|salam|bsr|bjr|hey)/i.test(clean)) {
        return "👋 Bonjour ! Je suis Hamadine, gardien de la langue Tadaksahak. Que souhaitez-vous explorer aujourd'hui ?";
    }
    
    if (/(merci|thanks|chokran|shukran)/i.test(clean)) {
        return "🙏 De rien ! La sagesse se partage. N'hésitez pas si vous avez d'autres questions.";
    }
    
    // Navigation rapide
    const navMap = {
        dico: "dictionnaire", dictionnaire: "dictionnaire",
        chat: "chat", audio: "audio", chant: "audio",
        photo: "photos", video: "videos", livre: "livres", quiz: "quiz"
    };
    
    for (const [key, sec] of Object.entries(navMap)) {
        if (clean.includes(key)) {
            if (sectionSelector) {
                sectionSelector.value = sec;
                sectionSelector.dispatchEvent(new Event("change"));
            }
            return `➡️ Je vous emmène vers la section ${sec === "dictionnaire" ? "📖 dictionnaire" : sec}.`;
        }
    }
    
    // Histoire et culture
    if (clean.includes("histoire") || clean.includes("origine")) {
        return "📜 Les Idaksahak sont un peuple sahélien dont l'histoire mêle traditions pastorales, routes commerciales et résilience culturelle. Le Tadaksahak, leur langue, est un trésor vivant.";
    }
    
    if (clean.includes("idaksahak") || clean.includes("tadaksahak")) {
        return "🌍 Les Idaksahak : peuple sahélien, langue Tadaksahak vivante via récits, musique et sagesse. Pasteurs discrets et érudits, ils perpétuent une riche tradition orale.";
    }
    
    if (clean.includes("culture") || clean.includes("tradition")) {
        return "🎭 La culture Idaksahak est riche en poésie, musique (tinde, imzad), contes et proverbes. La transmission orale est au cœur de notre héritage.";
    }
    
    // Recherche de mot dans dictionnaire
    const motTrouve = vocabulaire.find(v => 
        normalize(v.mot).includes(clean) || 
        (v.fr && normalize(v.fr).includes(clean)) ||
        (v.en && normalize(v.en).includes(clean))
    );
    
    if (motTrouve) {
        botMemory.lastWord = motTrouve.mot;
        return `📖 <strong>${motTrouve.mot}</strong><br>• 📂 Catégorie : ${motTrouve.cat || "Générale"}<br>• 🇫🇷 ${motTrouve.fr || "—"}<br>• 🇬🇧 ${motTrouve.en || "—"}<br><br>💡 Dites « explique encore » pour en savoir plus.`;
    }
    
    if ((clean.includes("explique") || clean.includes("encore")) && botMemory.lastWord) {
        return `📚 <strong>${botMemory.lastWord}</strong> : Ce mot clé dans la culture Tadaksahak illustre la richesse de notre langue. Voulez-vous l'ajouter à votre historique ?`;
    }
    
    // Résumés
    if (clean.includes("resume") || clean.includes("résumé")) {
        return "📖 Pour découvrir notre culture, explorez le dictionnaire, écoutez les chants traditionnels ou consultez la bibliothèque. Que vous intéresse particulièrement ?";
    }
    
    // Aide
    if (clean.includes("aide") || clean.includes("help") || clean.includes("quoi faire")) {
        return "🤖 <strong>Ce que je sais faire :</strong><br>• 📖 Expliquer des mots Tadaksahak<br>• 📚 Parler de notre histoire et culture<br>• 🧭 Naviguer vers les sections (dictionnaire, audio, livres...)<br>• 🎯 Répondre à vos questions<br><br>Que souhaitez-vous explorer ? 🌍";
    }
    
    // Réponse par défaut
    return "🤔 Je n'ai pas bien compris. Essayez : « dictionnaire », « histoire », « culture », ou un mot en Tadaksahak. Dites « aide » pour voir ce que je peux faire !";
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
    }, 500);
}

// Suggestions chat
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

// Événements chat
document.getElementById("btnEnvoyer")?.addEventListener("click", traiterSaisie);
document.getElementById("chatInput")?.addEventListener("keypress", e => e.key === "Enter" && traiterSaisie());

// ------------------------------
// BOUTONS LANGUE
// ------------------------------
document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        if (lang) changerLangue(lang);
    });
});

// ------------------------------
// NAVIGATION MOTS
// ------------------------------
btnPrev?.addEventListener("click", navigationPrecedent);
btnNext?.addEventListener("click", navigationSuivant);

// ------------------------------
// RECHERCHE LIVRES
// ------------------------------
const rechercheLivres = document.getElementById("rechercheLivres");
if (rechercheLivres) {
    rechercheLivres.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const cartes = document.querySelectorAll(".livre-card");
        cartes.forEach(carte => {
            const titre = carte.querySelector(".livre-titre")?.textContent.toLowerCase() || "";
            const auteur = carte.querySelector(".livre-auteur")?.textContent.toLowerCase() || "";
            const visible = titre.includes(query) || auteur.includes(query);
            carte.style.display = visible ? "block" : "none";
        });
    });
}

// Filtre thèmes livres
const selectTheme = document.getElementById("selectThemeLivres");
if (selectTheme) {
    selectTheme.addEventListener("change", (e) => {
        const theme = e.target.value;
        const cartes = document.querySelectorAll(".livre-card");
        cartes.forEach(carte => {
            const meta = carte.querySelector(".livre-meta")?.textContent.toLowerCase() || "";
            const visible = !theme || meta.includes(theme);
            carte.style.display = visible ? "block" : "none";
        });
    });
}

// ------------------------------
// INITIALISATION
// ------------------------------
document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Démarrage de Tadaksahak Learning");
    
    await chargerDonnees();
    initFuse();
    initChatSuggestions();
    
    // Navigation par événement personnalisé
    window.addEventListener('sectionChange', (e) => {
        if (e.detail.section === "livres") {
            afficherLivres();
        } else if (e.detail.section === "audio") {
            genererAlbumsAudio();
        }
    });
    
    console.log("✅ Application prête !");
});

// Exporter quelques fonctions globales
window.afficherMot = afficherMot;
window.jouerTadaksahak = () => {
    if (audioElem && motActuel?.audio) {
        audioElem.play().catch(e => console.warn("Erreur lecture audio:", e));
    }
};
