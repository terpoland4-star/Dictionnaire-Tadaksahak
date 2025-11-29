// === Dictionnaire Tadaksahak Multilingue : Index Alphabétique ===

// Fonction pour générer l'index A–Z dynamiquement
function createAlphabetIndex(containerId, words, listContainerId) {
  const container = document.getElementById(containerId);
  const listContainer = document.getElementById(listContainerId);
  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

  // Créer les boutons A-Z
  alphabet.forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.className =
      'text-sm md:text-base bg-neutral-800 text-white px-2 py-1 rounded-md m-1 hover:bg-blue-600 transition-all duration-200';
    btn.addEventListener('click', () => filterByLetter(letter));
    container.appendChild(btn);
  });

  // Fonction de filtrage
  function filterByLetter(letter) {
    const filtered = words.filter(w =>
      w.mot[0].toUpperCase() === letter.toUpperCase()
    );
    displayWordList(filtered);
  }

  // Afficher la liste complète au chargement
  displayWordList(words);

  function displayWordList(list) {
    listContainer.innerHTML = ''; // Nettoyer
    if (list.length === 0) {
      listContainer.innerHTML = '<p class="text-gray-400 italic">Aucun mot trouvé.</p>';
      return;
    }

    list.forEach(entry => {
      const div = document.createElement('div');
      div.className =
        'bg-white/5 border border-white/10 rounded-lg p-3 mb-2 hover:bg-white/10 transition-all duration-150';

      div.innerHTML = `
        <h3 class="text-lg font-semibold text-blue-400">${entry.mot}</h3>
        <p class="text-sm text-gray-300"><b>Français:</b> ${entry.fr}</p>
        <p class="text-sm text-gray-300"><b>Anglais:</b> ${entry.en}</p>
        <p class="text-sm text-gray-300"><b>Arabe:</b> ${entry.ar}</p>
        <p class="text-sm text-gray-300"><b>Tamazight:</b> ${entry.tz}</p>
        <p class="text-sm text-gray-300"><b>Russe:</b> ${entry.ru}</p>
        <p class="text-xs text-gray-400 mt-1">${entry.definition}</p>
        <p class="text-xs italic text-gray-500 mt-1">Ex: ${entry.exemple || ''}</p>
      `;
      listContainer.appendChild(div);
    });
  }
}

// === Exemple d’utilisation ===
window.addEventListener('DOMContentLoaded', () => {
  // Importez vos données (via un fetch ou directement)
  fetch('mots.json')
    .then(response => response.json())
    .then(data => {
      createAlphabetIndex('alphabetIndex', data, 'wordList');
    })
    .catch(err => console.error('Erreur chargement dictionnaire:', err));
});
