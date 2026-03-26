export const escapeHtml = (str) =>
  str
    ? String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
    : "";

export const normalize = (txt) =>
  txt
    ? txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";

export function debounce(fn, delay = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}
