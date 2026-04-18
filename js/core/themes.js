// ============================================
// CORE - GESTION DES THÈMES
// Dark, Light, Sepia, Police, Taille, Contraste
// Version avec menu déroulant unifié
// ============================================

// ------------------------------
// CONFIGURATION
// ------------------------------
const THEMES_CONFIG = {
  themes: {
    dark: { name: "Sombre", icon: "🌙", class: "dark" },
    light: { name: "Clair", icon: "📖", class: "light" },
    sepia: { name: "Sépia", icon: "📜", class: "sepia" }
  },
  fonts: {
    sans: { name: "Sans-serif", value: "sans" },
    serif: { name: "Serif", value: "serif" },
    mono: { name: "Monospace", value: "mono" }
  },
  sizes: {
    80: "80%",
    90: "90%",
    100: "100%",
    110: "110%",
    120: "120%",
    130: "130%",
    140: "140%",
    150: "150%"
  }
};

// ------------------------------
// ÉLÉMENTS DOM
// ------------------------------
let themeMenu = null;
let themeMenuBtn = null;

// ------------------------------
// CRÉATION DU MENU DÉROULANT UNIFIÉ
// ------------------------------
function createThemeMenu() {
  // Créer le bouton du menu
  themeMenuBtn = document.createElement('button');
  themeMenuBtn.id = 'themeMenuBtn';
  themeMenuBtn.className = 'theme-menu-btn';
  themeMenuBtn.innerHTML = '🎨 Thèmes et préférences';
  themeMenuBtn.setAttribute('aria-label', 'Ouvrir les préférences');
  
  // Créer le menu déroulant
  themeMenu = document.createElement('div');
  themeMenu.id = 'themeMenu';
  themeMenu.className = 'theme-menu-dropdown';
  themeMenu.style.display = 'none';
  
  themeMenu.innerHTML = `
    <div class="theme-menu-header">
      <span class="theme-menu-title">⚙️ Personnalisation</span>
      <button class="theme-menu-close" id="themeMenuClose">✖</button>
    </div>
    
    <div class="theme-menu-section">
      <div class="theme-menu-label">🎨 Thème</div>
      <div class="theme-buttons" id="themeButtons">
        <button data-theme="dark" class="theme-option dark" title="Sombre">🌙 Sombre</button>
        <button data-theme="light" class="theme-option light" title="Clair">📖 Clair</button>
        <button data-theme="sepia" class="theme-option sepia" title="Sépia">📜 Sépia</button>
      </div>
    </div>
    
    <div class="theme-menu-section">
      <div class="theme-menu-label">🔤 Police d'écriture</div>
      <div class="font-buttons" id="fontButtons">
        <button data-font="sans" class="font-option">🔤 Sans-serif</button>
        <button data-font="serif" class="font-option">📜 Serif</button>
        <button data-font="mono" class="font-option">💻 Monospace</button>
      </div>
    </div>
    
    <div class="theme-menu-section">
      <div class="theme-menu-label">📏 Taille du texte</div>
      <div class="size-controls" id="sizeControls">
        <input type="range" id="fontSizeSlider" min="80" max="150" step="5" value="100">
        <span id="fontSizeValue" class="size-value">100%</span>
        <div class="size-presets">
          <button data-size="80" class="size-preset">80%</button>
          <button data-size="100" class="size-preset active">100%</button>
          <button data-size="120" class="size-preset">120%</button>
          <button data-size="140" class="size-preset">140%</button>
        </div>
      </div>
    </div>
    
    <div class="theme-menu-section">
      <div class="theme-menu-label">♿ Accessibilité</div>
      <label class="contrast-toggle">
        <input type="checkbox" id="highContrastCheckbox">
        <span class="toggle-slider"></span>
        <span class="toggle-label">Contraste élevé</span>
      </label>
    </div>
    
    <div class="theme-menu-section">
      <div class="theme-menu-label">🔄 Réinitialiser</div>
      <button id="resetThemeSettings" class="reset-btn">Rétablir les paramètres par défaut</button>
    </div>
  `;
  
  // Ajouter au DOM
  const header = document.querySelector('.site-header');
  if (header) {
    // Supprimer les anciens sélecteurs si présents
    const oldThemeSelector = document.querySelector('.theme-selector');
    if (oldThemeSelector) oldThemeSelector.remove();
    
    header.appendChild(themeMenuBtn);
    header.appendChild(themeMenu);
  }
  
  // Initialiser les événements
  initThemeMenuEvents();
}

// ------------------------------
// ÉVÉNEMENTS DU MENU
// ------------------------------
function initThemeMenuEvents() {
  // Ouverture du menu
  themeMenuBtn?.addEventListener('click', () => {
    const isVisible = themeMenu.style.display === 'block';
    themeMenu.style.display = isVisible ? 'none' : 'block';
  });
  
  // Fermeture du menu
  document.getElementById('themeMenuClose')?.addEventListener('click', () => {
    themeMenu.style.display = 'none';
  });
  
  // Fermer en cliquant à l'extérieur
  document.addEventListener('click', (e) => {
    if (themeMenu && themeMenu.style.display === 'block') {
      if (!themeMenu.contains(e.target) && !themeMenuBtn?.contains(e.target)) {
        themeMenu.style.display = 'none';
      }
    }
  });
  
  // Boutons thème
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      setTheme(theme);
      updateActiveThemeButton(theme);
      themeMenu.style.display = 'none';
    });
  });
  
  // Boutons police
  document.querySelectorAll('.font-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const font = btn.dataset.font;
      setFontFamily(font);
      updateActiveFontButton(font);
    });
  });
  
  // Slider taille
  const sizeSlider = document.getElementById('fontSizeSlider');
  const sizeValue = document.getElementById('fontSizeValue');
  
  sizeSlider?.addEventListener('input', (e) => {
    const size = e.target.value;
    sizeValue.textContent = `${size}%`;
    setFontSize(size);
    updateActiveSizePreset(size);
  });
  
  // Presets de taille
  document.querySelectorAll('.size-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.dataset.size;
      if (sizeSlider) sizeSlider.value = size;
      if (sizeValue) sizeValue.textContent = `${size}%`;
      setFontSize(size);
      updateActiveSizePreset(size);
    });
  });
  
  // Contraste élevé
  const contrastCheck = document.getElementById('highContrastCheckbox');
  contrastCheck?.addEventListener('change', (e) => {
    setHighContrast(e.target.checked);
  });
  
  // Réinitialisation
  document.getElementById('resetThemeSettings')?.addEventListener('click', () => {
    resetThemeSettings();
  });
}

// ------------------------------
// FONCTIONS DE THÈME
// ------------------------------
function setTheme(theme) {
  document.body.classList.remove('dark', 'light', 'sepia');
  document.body.classList.add(theme);
  localStorage.setItem('app_theme', theme);
  
  // Déclencher un événement personnalisé
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}

function setFontFamily(font) {
  let fontValue = 'Inter, sans-serif';
  if (font === 'serif') fontValue = 'Georgia, serif';
  if (font === 'mono') fontValue = 'Courier New, monospace';
  
  document.body.style.fontFamily = fontValue;
  localStorage.setItem('app_font_family', font);
}

function setFontSize(size) {
  document.body.style.fontSize = `${size}%`;
  localStorage.setItem('app_font_size', size);
}

function setHighContrast(enabled) {
  if (enabled) {
    document.body.classList.add('high-contrast');
  } else {
    document.body.classList.remove('high-contrast');
  }
  localStorage.setItem('app_high_contrast', enabled);
}

// ------------------------------
// MISE À JOUR DES ÉLÉMENTS ACTIFS
// ------------------------------
function updateActiveThemeButton(activeTheme) {
  document.querySelectorAll('.theme-option').forEach(btn => {
    if (btn.dataset.theme === activeTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function updateActiveFontButton(activeFont) {
  document.querySelectorAll('.font-option').forEach(btn => {
    if (btn.dataset.font === activeFont) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function updateActiveSizePreset(activeSize) {
  document.querySelectorAll('.size-preset').forEach(btn => {
    if (btn.dataset.size === activeSize) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// ------------------------------
// RÉINITIALISATION
// ------------------------------
function resetThemeSettings() {
  // Valeurs par défaut
  const defaultTheme = 'dark';
  const defaultFont = 'sans';
  const defaultSize = '100';
  const defaultContrast = false;
  
  // Appliquer
  setTheme(defaultTheme);
  setFontFamily(defaultFont);
  setFontSize(defaultSize);
  setHighContrast(defaultContrast);
  
  // Mettre à jour l'interface
  const sizeSlider = document.getElementById('fontSizeSlider');
  const sizeValue = document.getElementById('fontSizeValue');
  const contrastCheck = document.getElementById('highContrastCheckbox');
  
  if (sizeSlider) sizeSlider.value = defaultSize;
  if (sizeValue) sizeValue.textContent = `${defaultSize}%`;
  if (contrastCheck) contrastCheck.checked = defaultContrast;
  
  updateActiveThemeButton(defaultTheme);
  updateActiveFontButton(defaultFont);
  updateActiveSizePreset(defaultSize);
  
  if (window.showToast) window.showToast("🎨 Paramètres réinitialisés", "success");
  
  themeMenu.style.display = 'none';
}

// ------------------------------
// INITIALISATION
// ------------------------------
function initTheme() {
  createThemeMenu();
  loadSavedSettings();
  detectSystemTheme();
}

function loadSavedSettings() {
  const savedTheme = localStorage.getItem('app_theme') || 'dark';
  const savedFont = localStorage.getItem('app_font_family') || 'sans';
  const savedSize = localStorage.getItem('app_font_size') || '100';
  const savedContrast = localStorage.getItem('app_high_contrast') === 'true';
  
  setTheme(savedTheme);
  setFontFamily(savedFont);
  setFontSize(savedSize);
  setHighContrast(savedContrast);
  
  // Mettre à jour l'interface
  updateActiveThemeButton(savedTheme);
  updateActiveFontButton(savedFont);
  updateActiveSizePreset(savedSize);
  
  const sizeSlider = document.getElementById('fontSizeSlider');
  const sizeValue = document.getElementById('fontSizeValue');
  const contrastCheck = document.getElementById('highContrastCheckbox');
  
  if (sizeSlider) sizeSlider.value = savedSize;
  if (sizeValue) sizeValue.textContent = `${savedSize}%`;
  if (contrastCheck) contrastCheck.checked = savedContrast;
}

function detectSystemTheme() {
  // Ne pas écraser les préférences utilisateur
  if (localStorage.getItem('app_theme')) return;
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}

// ------------------------------
// APPLIQUER LES PARAMÈTRES (pour compatibilité)
// ------------------------------
function applyThemeSettings() {
  // Déjà géré par les fonctions individuelles
  const fontFamily = localStorage.getItem('app_font_family') || 'sans';
  const fontSize = localStorage.getItem('app_font_size') || '100';
  const highContrast = localStorage.getItem('app_high_contrast') === 'true';
  
  setFontFamily(fontFamily);
  setFontSize(fontSize);
  setHighContrast(highContrast);
}

function initThemeSettings() {
  loadSavedSettings();
}

// ------------------------------
// STYLES CSS
// ------------------------------
const THEMES_MENU_STYLES = `
  /* Bouton du menu */
  .theme-menu-btn {
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-full);
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all var(--transition);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .theme-menu-btn:hover {
    background: var(--bg-light);
    border-color: var(--accent);
    transform: translateY(-1px);
  }
  
  /* Menu déroulant */
  .theme-menu-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    width: 320px;
    max-width: calc(100vw - 40px);
    z-index: 1000;
    animation: fadeInDown 0.2s ease;
  }
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .theme-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(135deg, var(--bg-light), var(--bg-card));
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }
  
  .theme-menu-title {
    font-weight: 600;
    color: var(--accent);
  }
  
  .theme-menu-close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: var(--text-muted);
    transition: color var(--transition);
  }
  
  .theme-menu-close:hover {
    color: var(--error);
  }
  
  .theme-menu-section {
    padding: 1rem;
    border-bottom: 1px solid var(--border);
  }
  
  .theme-menu-section:last-child {
    border-bottom: none;
  }
  
  .theme-menu-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
  }
  
  /* Boutons thème */
  .theme-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .theme-option {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-light);
    cursor: pointer;
    transition: all var(--transition);
    font-size: 0.8rem;
  }
  
  .theme-option.dark { background: #1a1a2e; color: white; }
  .theme-option.light { background: #f5f5f5; color: #333; }
  .theme-option.sepia { background: #fbf5e8; color: #5b4636; }
  
  .theme-option:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  .theme-option.active {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--accent-glow);
  }
  
  /* Boutons police */
  .font-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .font-option {
    flex: 1;
    padding: 0.4rem 0.6rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-light);
    cursor: pointer;
    transition: all var(--transition);
    font-size: 0.8rem;
  }
  
  .font-option:hover {
    background: var(--bg-card);
  }
  
  .font-option.active {
    border-color: var(--accent);
    background: var(--accent-glow);
  }
  
  /* Contrôles de taille */
  .size-controls {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  #fontSizeSlider {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    background: var(--border);
    border-radius: 2px;
    outline: none;
  }
  
  #fontSizeSlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
    border: none;
  }
  
  .size-value {
    text-align: center;
    font-size: 0.85rem;
    color: var(--accent);
    font-weight: 600;
  }
  
  .size-presets {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .size-preset {
    padding: 0.2rem 0.6rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
    background: var(--bg-light);
    cursor: pointer;
    font-size: 0.7rem;
    transition: all var(--transition);
  }
  
  .size-preset:hover {
    background: var(--bg-card);
  }
  
  .size-preset.active {
    border-color: var(--accent);
    background: var(--accent-glow);
    color: var(--accent);
  }
  
  /* Toggle contraste */
  .contrast-toggle {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
  }
  
  .contrast-toggle input {
    display: none;
  }
  
  .toggle-slider {
    width: 44px;
    height: 24px;
    background: var(--border);
    border-radius: 24px;
    position: relative;
    transition: all var(--transition);
  }
  
  .toggle-slider::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform var(--transition);
  }
  
  .contrast-toggle input:checked + .toggle-slider {
    background: var(--accent);
  }
  
  .contrast-toggle input:checked + .toggle-slider::before {
    transform: translateX(20px);
  }
  
  .toggle-label {
    font-size: 0.85rem;
    color: var(--text);
  }
  
  /* Bouton reset */
  .reset-btn {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-light);
    cursor: pointer;
    font-size: 0.8rem;
    transition: all var(--transition);
  }
  
  .reset-btn:hover {
    background: var(--warning);
    color: white;
    border-color: var(--warning);
  }
  
  /* Positionnement du menu dans le header */
  .site-header {
    position: relative;
  }
  
  @media (max-width: 768px) {
    .theme-menu-dropdown {
      right: auto;
      left: 50%;
      transform: translateX(-50%);
      width: 90vw;
    }
    
    .theme-buttons, .font-buttons {
      flex-wrap: wrap;
    }
    
    .size-presets {
      flex-wrap: wrap;
    }
  }
`;

// Injecter les styles
if (!document.getElementById('themes-menu-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'themes-menu-styles';
  styleSheet.textContent = THEMES_MENU_STYLES;
  document.head.appendChild(styleSheet);
}

// ------------------------------
// INITIALISATION
// ------------------------------
// Attendre que le DOM soit chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
  });
} else {
  initTheme();
}

// Exporter pour compatibilité
window.applyThemeSettings = applyThemeSettings;
window.initThemeSettings = initThemeSettings;
window.setTheme = setTheme;
window.initTheme = initTheme;
window.detectSystemTheme = detectSystemTheme;
window.setFontFamily = setFontFamily;
window.setFontSize = setFontSize;
window.setHighContrast = setHighContrast;
window.resetThemeSettings = resetThemeSettings;

console.log("🎨 Module Thèmes chargé - Version avec menu déroulant unifié");
