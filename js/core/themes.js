// ============================================
// CORE - GESTION DES THÈMES
// Dark, Light, Sepia, Police, Taille, Contraste
// ============================================

// Appliquer les paramètres du thème
function applyThemeSettings() {
  const fontFamily = localStorage.getItem('app_font_family') || 'sans';
  const fontSize = localStorage.getItem('app_font_size') || '100';
  const highContrast = localStorage.getItem('app_high_contrast') === 'true';
  
  document.body.style.fontFamily = fontFamily === 'serif' ? 'Georgia, serif' : 
                                    (fontFamily === 'mono' ? 'Courier New, monospace' : 'Inter, sans-serif');
  document.body.style.fontSize = `${fontSize}%`;
  
  if (highContrast) {
    document.body.classList.add('high-contrast');
  } else {
    document.body.classList.remove('high-contrast');
  }
}

// Initialiser les sélecteurs de thème
function initThemeSettings() {
  const fontSelect = document.getElementById('fontFamilySelect');
  const sizeSelect = document.getElementById('fontSizeSelect');
  const contrastCheck = document.getElementById('highContrastCheck');
  
  if (fontSelect) fontSelect.value = localStorage.getItem('app_font_family') || 'sans';
  if (sizeSelect) sizeSelect.value = localStorage.getItem('app_font_size') || '100';
  if (contrastCheck) contrastCheck.checked = localStorage.getItem('app_high_contrast') === 'true';
  
  fontSelect?.addEventListener('change', (e) => {
    localStorage.setItem('app_font_family', e.target.value);
    applyThemeSettings();
  });
  
  sizeSelect?.addEventListener('change', (e) => {
    localStorage.setItem('app_font_size', e.target.value);
    applyThemeSettings();
  });
  
  contrastCheck?.addEventListener('change', (e) => {
    localStorage.setItem('app_high_contrast', e.target.checked);
    applyThemeSettings();
  });
  
  applyThemeSettings();
}

// Changer le thème (dark/light/sepia)
function setTheme(theme) {
  document.body.classList.remove('dark', 'light', 'sepia');
  document.body.classList.add(theme);
  localStorage.setItem('app_theme', theme);
}

// Initialiser le thème
function initTheme() {
  const savedTheme = localStorage.getItem('app_theme') || 'dark';
  setTheme(savedTheme);
  
  document.getElementById('themeDark')?.addEventListener('click', () => setTheme('dark'));
  document.getElementById('themeLight')?.addEventListener('click', () => setTheme('light'));
  document.getElementById('themeSepia')?.addEventListener('click', () => setTheme('sepia'));
}

// Détecter le thème système
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem('app_theme')) setTheme('dark');
  } else {
    if (!localStorage.getItem('app_theme')) setTheme('light');
  }
}

// Exporter
window.applyThemeSettings = applyThemeSettings;
window.initThemeSettings = initThemeSettings;
window.setTheme = setTheme;
window.initTheme = initTheme;
window.detectSystemTheme = detectSystemTheme;
