import { state } from './state.js';
import { i18n } from './i18n-data.js';
import { escapeHtml } from './utils.js';

// ------------------------------
// TADAKSAHAK TV
// Le site TV (direct, replays, espace rédaction) est une application à part,
// sur son propre sous-domaine. Cette section affiche son direct et ses
// dernières vidéos via son flux public JSON, puis renvoie vers le site TV.
// ------------------------------

export const TV_URL = 'https://tv.hamadine-services.net';
const FEED_URL = `${TV_URL}/api/public/feed?limit=9`;
const REFRESH_MS = 60_000;

let feed = null;
let chargement = null;
let minuterie = null;

function t(cle) {
  return (i18n[state.currentLanguage] && i18n[state.currentLanguage][cle]) || i18n.fr[cle] || cle;
}

// N'accepte que des liens https (le flux vient d'un autre site).
function lienSur(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' ? u.href : null;
  } catch {
    return null;
  }
}

function formaterDate(iso) {
  if (!iso) return '';
  const locale = state.currentLanguage === 'ar' ? 'ar' : (state.currentLanguage === 'en' ? 'en-GB' : 'fr-FR');
  try {
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
  } catch {
    return iso;
  }
}

async function chargerFlux() {
  if (chargement) return chargement;
  chargement = (async () => {
    try {
      const reponse = await fetch(FEED_URL, { headers: { Accept: 'application/json' } });
      if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
      const donnees = await reponse.json();
      if (!donnees || !Array.isArray(donnees.videos)) throw new Error('Flux invalide');
      feed = donnees;
    } catch (e) {
      console.warn('📺 Tadaksahak TV indisponible', e);
      // On garde le dernier flux connu s'il existe.
    } finally {
      chargement = null;
    }
    return feed;
  })();
  return chargement;
}

function carteVideo(v) {
  const url = lienSur(v.url);
  if (!url) return '';
  const miniature = lienSur(v.thumbnail);
  return `
    <a class="tv-card" href="${escapeHtml(url)}" target="_blank" rel="noopener">
      <div class="tv-thumb">
        ${miniature
          ? `<img src="${escapeHtml(miniature)}" alt="" loading="lazy" decoding="async">`
          : `<span class="tv-thumb-placeholder">📺</span>`}
        ${v.duration ? `<span class="tv-duration">${escapeHtml(v.duration)}</span>` : ''}
      </div>
      <div class="tv-card-body">
        ${v.category ? `<span class="tv-category">${escapeHtml(v.category)}</span>` : ''}
        <h4>${escapeHtml(v.title)}</h4>
        <span class="tv-date">${escapeHtml(formaterDate(v.publishedAt))}</span>
      </div>
    </a>`;
}

function rendre() {
  const container = document.getElementById('tvContainer');
  if (!container) return;

  if (!feed) {
    container.innerHTML = `
      <div class="tv-unavailable">
        <p>${escapeHtml(t('tv_unavailable'))}</p>
        <a class="btn-outline" href="${TV_URL}" target="_blank" rel="noopener">${escapeHtml(t('tv_open'))} ↗</a>
      </div>`;
    return;
  }

  const enDirect = Boolean(feed.live && feed.live.onAir);
  const urlDirect = lienSur(feed.live && feed.live.url) || `${TV_URL}/direct`;
  const videos = feed.videos.map(carteVideo).join('');

  container.innerHTML = `
    <div class="tv-hero ${enDirect ? 'is-live' : ''}">
      <div>
        <p class="tv-hero-eyebrow">${enDirect ? `<span class="tv-dot" aria-hidden="true"></span> ${escapeHtml(t('tv_live_now'))}` : escapeHtml(t('tv_offline_live'))}</p>
        <p class="tv-hero-text">${escapeHtml(t('tv_intro'))}</p>
      </div>
      <a class="tv-btn-live" href="${escapeHtml(urlDirect)}" target="_blank" rel="noopener">
        ${enDirect ? '● ' : ''}${escapeHtml(t('tv_watch_live'))}
      </a>
    </div>
    <h3 class="tv-subtitle">${escapeHtml(t('tv_latest'))}</h3>
    ${videos
      ? `<div class="tv-grid">${videos}</div>`
      : `<p class="info-message">${escapeHtml(t('tv_empty'))}</p>`}
    <p class="tv-footer">
      <a class="btn-outline" href="${TV_URL}/videos" target="_blank" rel="noopener">${escapeHtml(t('tv_all_videos'))} ↗</a>
    </p>`;
}

export async function afficherTadaksahakTV() {
  const container = document.getElementById('tvContainer');
  if (!container) return;
  if (!feed) container.innerHTML = `<p class="info-message">${escapeHtml(t('tv_loading'))}</p>`;
  else rendre();
  await chargerFlux();
  rendre();

  // Rafraîchit l'état du direct tant que la section est affichée.
  clearInterval(minuterie);
  minuterie = setInterval(async () => {
    const section = document.getElementById('tv');
    if (!section || section.hidden || document.hidden) {
      clearInterval(minuterie);
      return;
    }
    await chargerFlux();
    rendre();
  }, REFRESH_MS);
}

/** Pastille « En direct » de la carte d'accueil (silencieuse en cas d'échec). */
export async function signalerDirectAccueil() {
  const badge = document.getElementById('tvHomeLive');
  if (!badge) return;
  await chargerFlux();
  badge.hidden = !(feed && feed.live && feed.live.onAir);
}
