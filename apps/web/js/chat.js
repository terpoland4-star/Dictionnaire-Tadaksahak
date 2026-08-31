import { state } from './state.js';
import { i18n } from './i18n-data.js';
import { escapeHtml } from './utils.js';

export function updateChatSuggestions() {
  const btns = document.querySelectorAll('.chat-suggestion');
  if (btns.length >= 3) {
    btns[0].textContent = i18n[state.currentLanguage].sugg_word;
    btns[1].textContent = i18n[state.currentLanguage].sugg_history;
    btns[2].textContent = i18n[state.currentLanguage].sugg_culture;
  }
}

// ------------------------------
// BOT
// ------------------------------
export function extraireMotsCles(question) {
  const stopWords = ['le','la','les','un','une','de','du','des','et','ou','mais','donc','car','pour','dans','avec','sans','par','sur','sous','que','qui','quoi','dont','où','comment','pourquoi','est','sont','être','avoir','faire'];
  const mots = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[?;:!,.']/g, '').split(/\s+/);
  return mots.filter(m => m.length > 2 && !stopWords.includes(m));
}

export function chercherDansLivres(question) {
  if (!state.livresConnaissance || !state.livresConnaissance.livres) return null;
  const motsClesQuestion = extraireMotsCles(question);
  if (motsClesQuestion.length === 0) return null;
  const resultats = [];
  for (const livre of state.livresConnaissance.livres) {
    for (const chunk of livre.chunks) {
      let score = 0;
      const motsClesChunk = chunk.mots_cles.map(m => m.toLowerCase());
      for (const mot of motsClesQuestion) {
        if (motsClesChunk.some(mc => mc.includes(mot) || mot.includes(mc))) score += 2;
        if (chunk.texte.toLowerCase().includes(mot)) score += 1;
      }
      if (score > 0) resultats.push({ livre: livre.titre, auteur: livre.auteur, chapitre: chunk.chapitre, titre: chunk.titre, texte: chunk.texte, score });
    }
  }
  if (!resultats.length) return null;
  resultats.sort((a,b) => b.score - a.score);
  return resultats[0];
}

export function genererExempleRelative() {
  if (!state.relativesData || !state.relativesData.strategies) return null;
  const strategies = state.relativesData.strategies;
  const randomIndex = Math.floor(Math.random() * strategies.length);
  const strat = strategies[randomIndex];
  const exemples = strat.exemples || [];
  if (exemples.length === 0) return null;
  const ex = exemples[Math.floor(Math.random() * exemples.length)];
  let traduction = "";
  if (state.currentLanguage === "fr") traduction = ex.traduction_fr;
  else if (state.currentLanguage === "en") traduction = ex.traduction_en;
  else traduction = ex.traduction_ar;
  return {
    strategie: strat,
    exemple: ex,
    traduction: traduction
  };
}

export function reponseBot(txt) {
  const clean = txt.toLowerCase().trim();
  
  if (clean.includes("relative") || clean.includes("proposition") || 
      (clean.includes("qui") && clean.includes("que")) ||
      clean.includes("ayo") || clean.includes("ayondo") || clean.includes("sa") ||
      clean.includes("gap") || clean.includes("pronom relatif")) {
    
    if (clean.includes("ayo") && !clean.includes("ayondo")) {
      return `📖 **"ayo"** (singulier) est le pronom relatif en tadaksahak pour les noms DÉFINIS dans des propositions RESTRICTIVES.\n\nExemple : *Bora [ayo a-taw-kat] a-zumbu-kat.*\n→ "La personne QUI est arrivée est descendue."\n\n📚 Voir section 3.1 du PDF "Relative Clauses in Tadaksahak".`;
    }
    if (clean.includes("ayondo")) {
      return `📖 **"ayondo"** (parfois **"endayo"**) est le pronom relatif PLURIEL en tadaksahak pour les noms DÉFINIS.\n\nExemple : *Ci na imunas-kon [ayondo a-zumbu Sali daw]?*\n→ "Qui sont les chameliers QUI sont descendus chez Rhali ?"`;
    }
    if (clean.includes("sa") && (clean.includes("relative") || clean.includes("proposition"))) {
      return `📖 **"sa"** introduit des propositions relatives NON-RESTRICTIVES (information supplémentaire).\n\nExemple : *A-jiken-an ayn nana se, [sa ayn man Aminata].*\n→ "Il salue sa mère, QUI s'appelle Aminata."\n\n💡 La relative pourrait être une phrase indépendante.\n\n📚 Voir section 4 du PDF.`;
    }
    if (clean.includes("gap") || (clean.includes("sans") && clean.includes("marqueur"))) {
      return `📖 **Gap strategy** = aucune marqueur dans la proposition relative.\n\nUtilisation : noms INDÉFINIS (nouveaux) dans des relatives RESTRICTIVES.\n\nExemple : *A-gar hamu [# f-keni aykaran daw].*\n→ "Elle a trouvé de la viande QUI était à côté des chiots."\n\n📚 Voir section 3.2 du PDF.`;
    }
    if (clean.includes("exemple") || clean.includes("example")) {
      const exempleData = genererExempleRelative();
      if (exempleData) {
        return `📖 **Exemple de relative (${exempleData.strategie.usage_fr})** :\n\n🔹 **Tadaksahak** : ${exempleData.exemple.tadaksahak}\n🔹 **Glose** : ${exempleData.exemple.glose_fr}\n🔹 **Traduction** : ${exempleData.traduction}\n\n💡 Stratégie : "${exempleData.strategie.marqueur_sg || exempleData.strategie.marqueur || '∅'}" (${exempleData.strategie.usage_fr})`;
      }
    }
    return `📖 **Les 3 stratégies de relativisation en tadaksahak** :

1️⃣ **Pronom relatif "ayo/ayondo"** → noms DÉFINIS, restrictif
2️⃣ **Gap strategy (∅)** → noms INDÉFINIS, restrictif
3️⃣ **"sa"** → non-restrictif (info supplémentaire)

📚 D'après Christiansen & Levinsohn (2003). Tapez "exemple relative" pour un exemple.`;
  }
  
  if (clean.includes("bonjour") || clean.includes("salut") || clean.includes("hello") || clean.includes("salam")) return i18n[state.currentLanguage].bot_greeting;
  if (clean.includes("merci") || clean.includes("thanks") || clean.includes("شكرا")) return i18n[state.currentLanguage].bot_thanks;
  if (clean.includes("dictionnaire") || clean.includes("dico") || clean.includes("mot") || clean.includes("قاموس")) return i18n[state.currentLanguage].bot_dico;
  if (clean.includes("grammaire") || clean.includes("grammar") || clean.includes("verbe") || clean.includes("causatif") || clean.includes("passif")) return i18n[state.currentLanguage].bot_grammar;
  if (clean.includes("relative") || clean.includes("proposition")) return i18n[state.currentLanguage].bot_grammar_relatives;
  if (clean.includes("conte") || clean.includes("histoire") || clean.includes("légende") || clean.includes("حكاية")) return "📖 Rendez-vous dans la section Contes pour découvrir les légendes et histoires traditionnelles Idaksahak.";
  if (clean.includes("émission") || clean.includes("radio") || clean.includes("broadcast")) return "🎙️ Consultez la section Émissions pour écouter les archives radiophoniques.";
  if (clean.includes("audio") || clean.includes("musique")) return i18n[state.currentLanguage].bot_audio;
  if (clean.includes("aide") || clean.includes("help") || clean.includes("مساعدة")) return i18n[state.currentLanguage].bot_help;
  
  const resultatLivre = chercherDansLivres(txt);
  if (resultatLivre) return `📖 D'après « ${resultatLivre.livre} » (${resultatLivre.auteur}), chapitre ${resultatLivre.chapitre} — « ${resultatLivre.titre} » :\n\n“${resultatLivre.texte}”\n\n💡 Posez-moi d'autres questions sur ce livre !`;
  if (clean.includes("livre") || clean.includes("bibliothèque") || clean.includes("كتاب")) return i18n[state.currentLanguage].bot_books;
  
  return i18n[state.currentLanguage].bot_default;
}

export function afficheMsg(user, html) {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;
  const div = document.createElement("div");
  div.className = `message ${user}`;
  div.innerHTML = `<strong>${user === "bot" ? "🤖 Hamadine" : "👤 Vous"} :</strong> ${html}`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

export function traiterSaisie() {
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

// ------------------------------
// DICTIONNAIRE
// ------------------------------
