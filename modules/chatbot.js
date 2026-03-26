import { AppState } from "./state.js";
import { normalize } from "./utils.js";

export function reponseBot(txt) {
  const clean = normalize(txt);

  if (clean.includes("bonjour")) return "Bonjour 👋";

  const mot = AppState.vocabulaire.find(v =>
    normalize(clean).includes(normalize(v.mot))
  );

  if (mot) return `📖 ${mot.mot} → ${mot.fr}`;

  return "Je peux t’aider avec le dictionnaire 📖";
}
