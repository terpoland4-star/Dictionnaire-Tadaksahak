import { AppState } from "./state.js";
import Fuse from "https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.esm.js";

let fuse;

export function initSearch() {
  fuse = new Fuse(AppState.vocabulaire, {
    keys: ["mot", "fr", "en"],
    threshold: 0.4
  });
}

export function chercher(query) {
  if (!query) return [];
  return fuse.search(query).slice(0, 10).map(r => r.item);
}
