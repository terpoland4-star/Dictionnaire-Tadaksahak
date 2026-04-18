// ============================================
// MODULE - CHAT BOT HAMADINE
// ============================================

function reponseBot(txt) {
  const clean = txt.toLowerCase().trim();
  
  // Règles pour les propositions relatives
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
      const exempleData = window.genererExempleRelative ? window.genererExempleRelative() : null;
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
  
  // Règles générales
  if (clean.includes("bonjour") || clean.includes("salut") || clean.includes("hello") || clean.includes("salam")) return window.t('bot_greeting');
  if (clean.includes("merci") || clean.includes("thanks") || clean.includes("شكرا")) return window.t('bot_thanks');
  if (clean.includes("dictionnaire") || clean.includes("dico") || clean.includes("mot") || clean.includes("قاموس")) return window.t('bot_dico');
  if (clean.includes("grammaire") || clean.includes("grammar") || clean.includes("verbe") || clean.includes("causatif") || clean.includes("passif")) return window.t('bot_grammar');
  if (clean.includes("relative") || clean.includes("proposition")) return window.t('bot_grammar_relatives');
  if (clean.includes("conte") || clean.includes("histoire") || clean.includes("légende") || clean.includes("حكاية")) return "📖 Rendez-vous dans la section Contes pour découvrir les légendes et histoires traditionnelles Idaksahak.";
  if (clean.includes("émission") || clean.includes("radio") || clean.includes("broadcast")) return "🎙️ Consultez la section Émissions pour écouter les archives radiophoniques.";
  if (clean.includes("audio") || clean.includes("musique")) return window.t('bot_audio');
  if (clean.includes("aide") || clean.includes("help") || clean.includes("مساعدة")) return window.t('bot_help');
  if (clean.includes("livre") || clean.includes("bibliothèque") || clean.includes("كتاب")) return window.t('bot_books');
  
  // Recherche dans les livres
  if (window.chercherDansLivres) {
    const resultatLivre = window.chercherDansLivres(txt);
    if (resultatLivre) return `📖 D'après « ${resultatLivre.livre} » (${resultatLivre.auteur}), chapitre ${resultatLivre.chapitre} — « ${resultatLivre.titre} » :\n\n“${resultatLivre.texte}”\n\n💡 Posez-moi d'autres questions sur ce livre !`;
  }
  
  return window.t('bot_default');
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

// Exporter
window.reponseBot = reponseBot;
window.traiterSaisie = traiterSaisie;
