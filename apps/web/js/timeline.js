import { state } from './state.js';
import { escapeHtml } from './utils.js';

export async function chargerTimeline() {
  try {
    const response = await fetch('data/timeline.json');
    if (!response.ok) throw new Error();
    state.timelineData = await response.json();
  } catch(e) {
    console.warn("Timeline non disponible", e);
    state.timelineData = [];
  }
}

export function afficherTimeline() {
  const container = document.getElementById("timelineContainer");
  if (!container || !state.timelineData) return;
  const events = state.timelineData.filter(e => e.lang === state.currentLanguage);
  if (!events.length) { container.innerHTML = "<p>Aucun événement</p>"; return; }
  let html = `<div class="timeline">`;
  events.forEach(event => {
    html += `<div class="timeline-item"><div class="timeline-date">${event.date}</div><div class="timeline-content"><h4>${escapeHtml(event.title)}</h4><p>${escapeHtml(event.description)}</p>${event.image ? `<img src="${event.image}" alt="" style="max-width:100%; border-radius:8px; margin-top:0.5rem;">` : ''}</div></div>`;
  });
  html += `</div>`;
  container.innerHTML = html;
}

// ------------------------------
// CARTE
// ------------------------------
export function initialiserCarte() {
  const container = document.getElementById("mapContainer");
  if (!container) return;
  if (state.mapInitialized) return;
  
  if (!state.leafletLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      state.leafletLoaded = true;
      creerCarte();
    };
    document.head.appendChild(script);
  } else {
    creerCarte();
  }
}

export function creerCarte() {
  const container = document.getElementById("mapContainer");
  if (!container) return;
  const map = L.map('mapContainer').setView([16.0, 0.0], 6);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' }).addTo(map);
  const points = [
    { lat: 15.9167, lon: 2.4167, name_fr: "Ménaka", name_ar: "ميناكا", name_en: "Ménaka" },
    { lat: 16.2667, lon: -0.05, name_fr: "Gao", name_ar: "غاو", name_en: "Gao" },
    { lat: 15.7167, lon: 0.9167, name_fr: "Talatayt", name_ar: "تالاتايت", name_en: "Talatayt" }
  ];
  points.forEach(p => {
    let name = state.currentLanguage === 'fr' ? p.name_fr : (state.currentLanguage === 'ar' ? p.name_ar : p.name_en);
    L.marker([p.lat, p.lon]).addTo(map).bindPopup(name);
  });
  state.mapInitialized = true;
}

// ------------------------------
// RECHERCHE PLEIN TEXTE
// ------------------------------
