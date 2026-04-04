/* ===========================================================
   🎨 Tadaksahak Learning – Style global
   Thème : Oxford Dark Mode (Version améliorée)
   Auteur : Hamadine AG Moctar
   Version : 2.0
   =========================================================== */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* Couleurs principales */
  --primary: #0099ff;
  --primary-dark: #0077cc;
  --accent: #33ccff;
  --accent-glow: rgba(51, 204, 255, 0.2);
  
  /* Neutres */
  --text: #f1f1f1;
  --text-muted: #a0a0a0;
  --bg: #0e1116;
  --bg-light: #1c1f26;
  --bg-card: #151820;
  --border: #2b2f36;
  --border-light: #3a3f48;
  
  /* États */
  --hover: #1a73e8;
  --success: #00c853;
  --warning: #ff9800;
  --error: #ff5252;
  
  /* Espacements */
  --transition: 0.25s ease-in-out;
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.5);
  --shadow-xl: 0 12px 36px rgba(0,0,0,0.6);
  
  /* Bordures */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  scroll-behavior: smooth;
}

/* =========================
   SKIP LINK (Accessibilité)
========================= */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: var(--radius-sm);
  z-index: 1000;
  transition: top var(--transition);
}

.skip-link:focus {
  top: 10px;
  outline: none;
}

/* =========================
   LOADER
========================= */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  gap: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-overlay p {
  color: var(--text);
  font-size: 0.9rem;
}

/* =========================
   TOAST NOTIFICATIONS
========================= */
.toast {
  position: fixed;
  bottom: 80px;
  right: 20px;
  background: var(--bg-light);
  color: var(--text);
  padding: 12px 20px;
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  animation: slideIn 0.3s ease;
  max-width: 350px;
  font-size: 0.9rem;
}

.toast.toast-success { border-left-color: var(--success); }
.toast.toast-warning { border-left-color: var(--warning); }
.toast.toast-error { border-left-color: var(--error); }

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* =========================
   NOSCRIPT
========================= */
.js-warning {
  background: var(--error);
  color: white;
  text-align: center;
  padding: 10px;
  font-weight: bold;
}

/* =========================
   HEADER (Amélioré)
========================= */
header.site-header {
  width: 100%;
  padding: 1.5rem;
  background: var(--bg-light);
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

header .logo-header {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform var(--transition);
}

header .logo-header:hover { transform: scale(1.05); }

.header-text h1 { 
  font-size: 1.8rem; 
  color: var(--accent);
  background: linear-gradient(135deg, var(--accent), var(--primary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

header .subtitle { 
  color: var(--text-muted); 
  font-size: 0.9rem; 
  margin-top: 0.2rem;
}

nav.main-nav { 
  margin-top: 1rem;
  width: 100%;
  max-width: 300px;
}

nav.main-nav select {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all var(--transition);
}

nav.main-nav select:hover {
  border-color: var(--accent);
  background: var(--bg-light);
}

/* =========================
   MAIN CONTENT
========================= */
main {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* =========================
   ONGLETS (Sections)
========================= */
.onglet-contenu { 
  padding: 2rem 1.5rem;
  animation: fadeIn 0.3s ease;
}

.onglet-contenu[hidden] { display: none; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =========================
   HERO + BIO ACCUEIL
========================= */
.hero { 
  text-align: center; 
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, var(--bg-light), var(--bg));
  border-radius: var(--radius-lg);
}

.hero h2 { 
  font-size: 2.5rem; 
  margin-bottom: 1rem; 
  color: var(--accent);
}

.hero p { 
  color: var(--text-muted); 
  font-size: 1.1rem; 
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: var(--radius-md);
  color: white;
  cursor: pointer;
  transition: all var(--transition);
  font-size: 1rem;
  font-weight: 600;
}

.btn:hover { 
  transform: translateY(-2px); 
  box-shadow: var(--shadow-md);
}

.btn:active {
  transform: translateY(0);
}

.bio-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 2rem;
  background: var(--bg-light);
  border-radius: var(--radius-lg);
}

.bio-photo { 
  width: 180px; 
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent);
}

.bio-text { 
  max-width: 550px; 
  color: var(--text-muted); 
  line-height: 1.6;
  text-align: left;
}

/* =========================
   STATS CONTAINER
========================= */
.stats-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  background: var(--bg-card);
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
  text-align: center;
  border: 1px solid var(--border);
  transition: transform var(--transition);
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent);
  display: block;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* =========================
   DICTIONNAIRE
========================= */
.search-section {
  margin: 2rem auto;
  max-width: 600px;
  width: 95%;
  position: relative;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

#searchBar {
  width: 100%;
  padding: 1rem 2.5rem 1rem 1rem;
  font-size: 1rem;
  color: var(--text);
  background: var(--bg-light);
  border: 2px solid var(--border);
  border-radius: var(--radius-lg);
  outline: none;
  transition: all var(--transition);
}

#searchBar:focus { 
  border-color: var(--accent); 
  background-color: #1d222b;
}

.clear-search {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px 8px;
  border-radius: 50%;
  transition: all var(--transition);
}

.clear-search:hover {
  color: var(--accent);
  background: rgba(255,255,255,0.1);
}

/* Suggestions */
.suggestions-list {
  list-style: none;
  position: absolute;
  width: 100%;
  background: var(--bg-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  max-height: 300px;
  overflow-y: auto;
  margin-top: 0.5rem;
  padding: 0;
  opacity: 0;
  transform: translateY(-5px);
  transition: all var(--transition);
  z-index: 50;
}

.suggestions-list.show { 
  opacity: 1; 
  transform: translateY(0); 
}

.suggestions-list li {
  padding: 0.8rem 1rem;
  text-align: left;
  cursor: pointer;
  color: var(--text);
  border-bottom: 1px solid var(--border);
  transition: background var(--transition);
}

.suggestions-list li:hover { 
  background-color: var(--hover); 
}

.suggestions-list li:last-child {
  border-bottom: none;
}

/* Result Section */
.result-section {
  background: var(--bg-light);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  margin-top: 2rem;
  max-width: 600px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: var(--shadow-md);
}

#ficheMot {
  text-align: center;
}

#motTexte { 
  font-size: 2rem; 
  font-weight: 700; 
  color: var(--accent); 
  margin-bottom: 1rem;
}

#definition { 
  font-size: 1rem; 
  color: var(--text); 
  line-height: 1.6;
  text-align: left;
}

.navigation-mots {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
}

.nav-btn {
  background: var(--primary);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition);
}

.nav-btn:hover:not(:disabled) {
  background: var(--hover);
  transform: translateX(-2px);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.compteur {
  color: var(--text-muted);
  font-size: 0.9rem;
}

audio { 
  width: 100%; 
  margin-top: 1rem; 
  border-radius: var(--radius-md);
}

/* Language Switch */
.lang-switch { 
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.lang-btn {
  margin: 0;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  cursor: pointer;
  color: white;
  background-color: var(--primary);
  transition: all var(--transition);
  font-weight: 600;
}

.lang-btn:hover { 
  background-color: var(--hover); 
  transform: translateY(-2px);
}

.lang-btn.active {
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent-glow);
}

/* Alphabet Index */
.alphabet-section { 
  margin-top: 2rem;
  padding: 1rem;
}

.alphabet-section h3 {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--accent);
}

#alphabetIndex { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 0.5rem; 
  justify-content: center; 
  margin-bottom: 1.5rem;
}

.alphabet-btn {
  padding: 0.5rem 0.8rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-light);
  color: var(--accent);
  cursor: pointer;
  transition: all var(--transition);
  font-weight: 600;
}

.alphabet-btn:hover { 
  background: var(--accent); 
  color: #fff; 
  transform: translateY(-2px);
}

.word-list { 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); 
  gap: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
}

.mot-item {
  padding: 0.7rem;
  background: var(--bg-card);
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-align: center;
  transition: all var(--transition);
}

.mot-item:hover {
  background: var(--hover);
  transform: translateX(5px);
}

/* =========================
   CHAT – VERSION ÉLÉGANTE
========================= */
.chat-container {
  max-width: 800px;
  margin: 0 auto;
}

.chatbox {
  background: linear-gradient(180deg, var(--bg-light), var(--bg-card));
  border-radius: var(--radius-lg);
  padding: 1rem;
  height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
  box-shadow: inset 0 0 0 1px var(--border), var(--shadow-lg);
  scroll-behavior: smooth;
}

/* Scrollbar élégante */
.chatbox::-webkit-scrollbar {
  width: 8px;
}

.chatbox::-webkit-scrollbar-track {
  background: var(--bg);
  border-radius: 10px;
}

.chatbox::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}

.chatbox::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}

/* Message commun */
.chatbox .message {
  max-width: 85%;
  padding: 0.7rem 1rem;
  margin-bottom: 0.8rem;
  line-height: 1.5;
  font-size: 0.95rem;
  border-radius: var(--radius-md);
  animation: fadeInUp 0.3s ease;
  word-wrap: break-word;
}

/* Message utilisateur */
.chatbox .message.user {
  margin-left: auto;
  background: linear-gradient(135deg, var(--primary), var(--hover));
  color: #fff;
  text-align: right;
  border-bottom-right-radius: 4px;
}

/* Message bot */
.chatbox .message.bot {
  margin-right: auto;
  background: var(--bg-card);
  color: var(--text);
  border-left: 3px solid var(--accent);
  border-bottom-left-radius: 4px;
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Zone d’entrée */
.chat-input {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.chat-input input {
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 0.95rem;
  outline: none;
  transition: all var(--transition);
}

.chat-input input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.chat-input button {
  background: linear-gradient(135deg, var(--primary), var(--hover));
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all var(--transition);
}

.chat-input button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Chat suggestions */
.chat-suggestions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.chat-suggestion {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all var(--transition);
}

.chat-suggestion:hover {
  background: var(--primary);
  transform: translateY(-2px);
}

/* =========================
   AUDIO, PHOTOS, VIDEOS
========================= */
.audio-grid, .books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
  margin-top: 1rem;
}

.audio-bloc {
  background: var(--bg-light);
  border-radius: var(--radius-md);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition);
}

.audio-bloc:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.audio-bloc audio { 
  width: 100%; 
  margin-top: 0.5rem; 
}

.audio-bloc button { 
  margin-top: 0.5rem; 
  padding: 0.4rem 0.8rem; 
  border-radius: var(--radius-sm); 
  cursor: pointer; 
  border: none; 
  background: var(--primary); 
  color: #fff; 
  transition: background var(--transition);
}

.audio-bloc button:hover { 
  background: var(--hover); 
}

.lyrics-text {
  margin-top: 0.8rem;
  padding: 0.8rem;
  background: var(--bg);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

.grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
  gap: 1rem; 
}

/* =========================
   LIVRES – DESIGN PRO (UNIFIÉ)
========================= */
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filters input, .filters select {
  padding: 0.7rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg-light);
  color: var(--text);
  font-size: 0.9rem;
  min-width: 200px;
}

.filters input:focus, .filters select:focus {
  border-color: var(--accent);
  outline: none;
}

.featured-book {
  background: linear-gradient(135deg, var(--bg-light), var(--bg-card));
  border-radius: var(--radius-lg);
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.book-list {
  list-style: none;
  padding: 0.5rem;
}

.book-list li {
  padding: 0.5rem;
}

.book-list a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--transition);
}

.book-list a:hover {
  color: var(--primary);
  text-decoration: underline;
}

#livresContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
  margin-top: 1rem;
}

.livre-card {
  background: linear-gradient(180deg, var(--bg-light), var(--bg-card));
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.2rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition);
}

.livre-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: var(--accent);
}

.livre-titre {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 0.4rem;
}

.livre-auteur {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.6rem;
  font-style: italic;
}

.livre-desc {
  font-size: 0.9rem;
  color: var(--text);
  line-height: 1.5;
  margin-bottom: 0.8rem;
}

.livre-meta {
  font-size: 0.75rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.livre-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-small {
  flex: 1;
  padding: 0.5rem 0.8rem;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  background: var(--primary);
  color: #fff;
  font-size: 0.8rem;
  transition: all var(--transition);
}

.btn-small:hover {
  background: var(--hover);
  transform: translateY(-1px);
}

/* =========================
   COMING SOON
========================= */
.coming-soon {
  text-align: center;
  padding: 3rem;
  background: var(--bg-light);
  border-radius: var(--radius-lg);
  color: var(--text-muted);
}

.info-message {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
  font-style: italic;
}

/* =========================
   FOOTER
========================= */
.site-footer {
  background: var(--bg-light);
  color: var(--text-muted);
  font-size: 0.85rem;
  padding: 1.5rem;
  border-top: 1px solid var(--border);
  text-align: center;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-links {
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.footer-links a, .install-btn {
  color: var(--accent);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  transition: color var(--transition);
}

.footer-links a:hover, .install-btn:hover {
  color: var(--primary);
  text-decoration: underline;
}

/* =========================
   BOUTON CHAT FLOTTANT
========================= */
.floating-chat-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--primary), var(--hover));
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition);
  z-index: 100;
}

.floating-chat-btn:hover { 
  transform: translateY(-4px) scale(1.05); 
  box-shadow: var(--shadow-xl);
}

/* =========================
   UTILITAIRES
========================= */
mark { 
  background: rgba(255, 255, 0, 0.15); 
  color: inherit; 
  padding: 0 0.2rem; 
  border-radius: 3px;
}

.mot-historique { 
  cursor: pointer; 
  color: var(--accent);
  transition: color var(--transition);
  display: inline-block;
  margin: 0 4px;
}

.mot-historique:hover { 
  color: var(--primary);
  text-decoration: underline;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 768px) {
  .onglet-contenu { padding: 1rem; }
  
  .hero h2 { font-size: 1.8rem; }
  .hero p { font-size: 1rem; }
  
  .bio-photo { width: 120px; height: 120px; }
  .bio-text { text-align: center; }
  
  #motTexte { font-size: 1.5rem; }
  
  .chatbox .message { max-width: 95%; }
  
  .floating-chat-btn {
    width: 48px;
    height: 48px;
    font-size: 1.5rem;
    bottom: 1rem;
    right: 1rem;
  }
  
  .stats-container { gap: 1rem; }
  .stat-card { padding: 0.8rem 1.2rem; }
  .stat-number { font-size: 1.5rem; }
  
  .filters input, .filters select { width: 100%; }
  
  .livre-actions { flex-direction: column; }
}

@media (max-width: 480px) {
  header .logo-header { width: 50px; height: 50px; }
  .header-text h1 { font-size: 1.3rem; }
  
  .suggestions-list li { font-size: 0.85rem; }
  
  .lang-btn { padding: 0.4rem 0.8rem; font-size: 0.8rem; }
  
  .alphabet-btn { padding: 0.3rem 0.6rem; font-size: 0.8rem; }
  
  .word-list { grid-template-columns: 1fr; }
}

/* Impression */
@media print {
  .floating-chat-btn, .chat-suggestions, .lang-switch {
    display: none;
  }
  
  body {
    background: white;
    color: black;
  }
  
  .onglet-contenu {
    page-break-inside: avoid;
  }
}
