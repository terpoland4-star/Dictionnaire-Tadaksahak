// ============================================
// CORE - FONCTIONS UTILITAIRES
// Version premium avec validation, formatage, debounce, throttle
// ============================================

// ------------------------------
// SÉCURITÉ ET NETTOYAGE
// ------------------------------

// Échapper les caractères HTML (protection XSS)
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');
}

// Déséchapper le HTML
function unescapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#96;/g, '`');
}

// Nettoyer les entrées utilisateur
function sanitizeInput(str) {
  if (!str) return '';
  return escapeHtml(str.trim());
}

// ------------------------------
// NORMALISATION DE TEXTE
// ------------------------------

// Normaliser le texte (supprime accents, met en minuscule)
function normalizeText(s) {
  if (!s) return '';
  return s.toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '');
}

// Normaliser pour la recherche (plus permissif)
function normalizeSearch(s) {
  if (!s) return '';
  return s.toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Capitaliser la première lettre
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Capitaliser chaque mot
function capitalizeWords(str) {
  if (!str) return '';
  return str.split(' ').map(word => capitalize(word)).join(' ');
}

// Tronquer un texte
function truncate(str, maxLength = 100, suffix = '…') {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength).trim() + suffix;
}

// Extraire les mots-clés d'un texte
function extractKeywords(text, minLength = 3, maxKeywords = 10) {
  if (!text) return [];
  const stopWords = ['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'mais', 'donc', 'car', 'pour', 'dans', 'avec', 'sans', 'par', 'sur', 'sous', 'que', 'qui', 'quoi', 'dont', 'où', 'comment', 'pourquoi', 'est', 'sont', 'être', 'avoir', 'faire', 'a', 'an', 'the', 'and', 'of', 'to', 'in', 'for', 'on', 'with', 'by', 'at', 'from', 'as', 'is', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'but', 'or', 'for', 'nor', 'so', 'yet'];
  
  const words = text.toLowerCase().split(/\s+/);
  const freq = {};
  
  for (const word of words) {
    if (word.length >= minLength && !stopWords.includes(word)) {
      freq[word] = (freq[word] || 0) + 1;
    }
  }
  
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(entry => entry[0]);
}

// ------------------------------
// DISTANCE DE LEVENSHTEIN (recherche approximative)
// ------------------------------

function levenshtein(a, b) {
  const an = a.length, bn = b.length;
  if (!an) return bn;
  if (!bn) return an;
  
  const matrix = Array.from({ length: an + 1 }, () => new Array(bn + 1).fill(0));
  for (let i = 0; i <= an; i++) matrix[i][0] = i;
  for (let j = 0; j <= bn; j++) matrix[0][j] = j;
  
  for (let i = 1; i <= an; i++) {
    for (let j = 1; j <= bn; j++) {
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i-1][j] + 1,
        matrix[i][j-1] + 1,
        matrix[i-1][j-1] + cost
      );
    }
  }
  return matrix[an][bn];
}

// Similarité entre deux chaînes (0-1)
function similarity(a, b) {
  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - distance / maxLen;
}

// Recherche approximative dans un tableau
function fuzzySearch(query, items, key = null, threshold = 0.3) {
  if (!query) return items;
  const normalizedQuery = normalizeSearch(query);
  
  return items.filter(item => {
    const text = key ? item[key] : item;
    const normalizedText = normalizeSearch(text);
    const score = similarity(normalizedQuery, normalizedText);
    return score >= threshold;
  }).sort((a, b) => {
    const textA = key ? a[key] : a;
    const textB = key ? b[key] : b;
    return similarity(normalizedQuery, normalizeSearch(textB)) - similarity(normalizedQuery, normalizeSearch(textA));
  });
}

// ------------------------------
// VALIDATION
// ------------------------------

// Valider une adresse email
function isValidEmail(email) {
  const regex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  return regex.test(email);
}

// Valider une URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Valider un nombre
function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Valider une date
function isValidDate(date) {
  return !isNaN(new Date(date).getTime());
}

// ------------------------------
// FORMATAGE
// ------------------------------

// Formater une date
function formatDate(date, locale = null) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const lang = locale || currentLanguage || 'fr';
  return d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : (lang === 'en' ? 'en-US' : 'fr-FR'));
}

// Formater une durée (secondes → HH:MM:SS)
function formatDuration(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Formater un nombre (séparateurs de milliers)
function formatNumber(num, locale = null) {
  const lang = locale || currentLanguage || 'fr';
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : (lang === 'en' ? 'en-US' : 'fr-FR')).format(num);
}

// Formater un prix
function formatPrice(price, currency = 'EUR', locale = null) {
  const lang = locale || currentLanguage || 'fr';
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : (lang === 'en' ? 'en-US' : 'fr-FR'), {
    style: 'currency',
    currency: currency
  }).format(price);
}

// Slugifier une chaîne (pour URLs)
function slugify(str) {
  if (!str) return '';
  return str.toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ------------------------------
// PERFORMANCE (Debounce, Throttle)
// ------------------------------

// Debounce (exécute après un délai d'inactivité)
function debounce(func, delay = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle (exécute au maximum une fois par intervalle)
function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ------------------------------
// TOAST NOTIFICATIONS
// ------------------------------

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

function showSuccessToast(message) {
  showToast(message, "success");
}

function showErrorToast(message) {
  showToast(message, "error");
}

function showWarningToast(message) {
  showToast(message, "warning");
}

function showInfoToast(message) {
  showToast(message, "info");
}

// ------------------------------
// LOADER
// ------------------------------

function showLoader() {
  const loader = document.getElementById("loadingOverlay");
  if (loader) {
    loader.hidden = false;
    loader.style.display = 'flex';
  }
}

function hideLoader() {
  const loader = document.getElementById("loadingOverlay");
  if (loader) {
    loader.hidden = true;
    loader.style.display = 'none';
  }
}

// Loader avec timeout
function showLoaderWithTimeout(timeout = 5000) {
  showLoader();
  setTimeout(() => {
    hideLoader();
  }, timeout);
}

// ------------------------------
// SKELETON LOADING
// ------------------------------

function showSkeleton(containerId, count = 6) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = `
    <div class="skeleton-grid">
      ${Array(count).fill(0).map(() => `
        <div class="skeleton-card">
          <div class="skeleton-image"></div>
          <div class="skeleton-title"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text short"></div>
        </div>
      `).join('')}
    </div>
  `;
}

function hideSkeleton(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
}

// ------------------------------
// COOKIES
// ------------------------------

function setCookie(name, value, days = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// ------------------------------
// CLIPBOARD
// ------------------------------

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showSuccessToast("📋 Copié dans le presse-papier");
    return true;
  } catch (err) {
    console.error('Erreur de copie:', err);
    showErrorToast("❌ Impossible de copier");
    return false;
  }
}

// ------------------------------
// DÉTECTION
// ------------------------------

// Détecter le navigateur
function detectBrowser() {
  const ua = navigator.userAgent;
  if (ua.indexOf('Chrome') > -1) return 'Chrome';
  if (ua.indexOf('Firefox') > -1) return 'Firefox';
  if (ua.indexOf('Safari') > -1) return 'Safari';
  if (ua.indexOf('Edge') > -1) return 'Edge';
  return 'Unknown';
}

// Détecter l'appareil (mobile/tablette/desktop)
function detectDevice() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(ob|in)i/.test(ua)) return 'mobile';
  return 'desktop';
}

// Détecter la connexion internet
function isOnline() {
  return navigator.onLine;
}

// ------------------------------
// TÉLÉCHARGEMENT
// ------------------------------

function downloadFile(content, filename, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadJSON(data, filename) {
  downloadFile(JSON.stringify(data, null, 2), filename, 'application/json');
}

// ------------------------------
// COULEURS
// ------------------------------

function lightenColor(color, percent) {
  // Convertir hex en rgb
  let r, g, b;
  if (color.startsWith('#')) {
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else if (color.startsWith('rgb')) {
    const matches = color.match(/\d+/g);
    r = parseInt(matches[0]);
    g = parseInt(matches[1]);
    b = parseInt(matches[2]);
  } else {
    return color;
  }
  
  r = Math.min(255, r + (255 - r) * percent / 100);
  g = Math.min(255, g + (255 - g) * percent / 100);
  b = Math.min(255, b + (255 - b) * percent / 100);
  
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function darkenColor(color, percent) {
  return lightenColor(color, -percent);
}

// ------------------------------
// STYLES CSS
// ------------------------------
const UTILS_STYLES = `
  /* Toast notifications */
  .toast {
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: var(--bg-light);
    color: var(--text);
    padding: 12px 20px;
    border-radius: 10px;
    border-left: 4px solid var(--primary);
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    z-index: 1000;
    animation: slideIn 0.3s ease;
    max-width: 350px;
    font-size: 0.9rem;
  }
  
  .toast.toast-success { border-left-color: var(--success); }
  .toast.toast-warning { border-left-color: var(--warning); }
  .toast.toast-error { border-left-color: var(--error); }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(100%); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  /* Loading overlay */
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
  
  /* Skeleton loading */
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .skeleton-card {
    background: var(--bg-card);
    border-radius: 16px;
    padding: 1rem;
    animation: pulse 1.5s infinite;
  }
  
  .skeleton-image {
    height: 160px;
    background: var(--border);
    border-radius: 12px;
    margin-bottom: 1rem;
  }
  
  .skeleton-title {
    height: 20px;
    background: var(--border);
    border-radius: 8px;
    margin-bottom: 0.5rem;
    width: 70%;
  }
  
  .skeleton-text {
    height: 14px;
    background: var(--border);
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }
  
  .skeleton-text.short {
    width: 50%;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

// Injecter les styles
if (!document.getElementById('utils-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'utils-styles';
  styleSheet.textContent = UTILS_STYLES;
  document.head.appendChild(styleSheet);
}

// ------------------------------
// EXPORT
// ------------------------------
window.escapeHtml = escapeHtml;
window.unescapeHtml = unescapeHtml;
window.sanitizeInput = sanitizeInput;
window.normalizeText = normalizeText;
window.normalizeSearch = normalizeSearch;
window.capitalize = capitalize;
window.capitalizeWords = capitalizeWords;
window.truncate = truncate;
window.extractKeywords = extractKeywords;
window.levenshtein = levenshtein;
window.similarity = similarity;
window.fuzzySearch = fuzzySearch;
window.isValidEmail = isValidEmail;
window.isValidUrl = isValidUrl;
window.isNumber = isNumber;
window.isValidDate = isValidDate;
window.formatDate = formatDate;
window.formatDuration = formatDuration;
window.formatNumber = formatNumber;
window.formatPrice = formatPrice;
window.slugify = slugify;
window.debounce = debounce;
window.throttle = throttle;
window.showToast = showToast;
window.showSuccessToast = showSuccessToast;
window.showErrorToast = showErrorToast;
window.showWarningToast = showWarningToast;
window.showInfoToast = showInfoToast;
window.showLoader = showLoader;
window.hideLoader = hideLoader;
window.showLoaderWithTimeout = showLoaderWithTimeout;
window.showSkeleton = showSkeleton;
window.hideSkeleton = hideSkeleton;
window.setCookie = setCookie;
window.getCookie = getCookie;
window.deleteCookie = deleteCookie;
window.copyToClipboard = copyToClipboard;
window.detectBrowser = detectBrowser;
window.detectDevice = detectDevice;
window.isOnline = isOnline;
window.downloadFile = downloadFile;
window.downloadJSON = downloadJSON;
window.lightenColor = lightenColor;
window.darkenColor = darkenColor;

console.log("🔧 Module Utilitaires chargé - Version premium");
