export function initNavigation() {
  const select = document.getElementById("sectionSelector");
  const sections = document.querySelectorAll("main > section");

  function show(id) {
    sections.forEach(s => (s.hidden = s.id !== id));
  }

  select.addEventListener("change", () => show(select.value));

  show(select.value || "accueil");
}
