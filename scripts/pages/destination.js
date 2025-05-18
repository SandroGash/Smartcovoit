function createSuggestionList(inputElement, listElement) {
  inputElement.addEventListener("input", async () => {
    const query = inputElement.value;
    if (query.length < 2) {
      listElement.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${query}&fields=nom&boost=population&limit=5`);
      const villes = await response.json();

      listElement.innerHTML = "";
      villes.forEach(ville => {
        const div = document.createElement("div");
        div.textContent = ville.nom;
        div.onclick = () => {
          inputElement.value = ville.nom;
          listElement.innerHTML = "";
        };
        listElement.appendChild(div);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des villes :", error);
    }
  });
}

export function init() {
  const container = document.createElement("div");
  container.className = "search-container";
  container.innerHTML = `
    <h2>Rechercher un trajet</h2>
    <label>Ville de départ</label>
    <input type="text" id="ville-depart" autocomplete="off" />
    <div id="suggestions-depart" class="suggestions"></div>

    <label>Ville d'arrivée</label>
    <input type="text" id="ville-arrivee" autocomplete="off" />
    <div id="suggestions-arrivee" class="suggestions"></div>

    <label>Date de départ</label>
    <input type="date" id="date-depart" />

    <button>Rechercher</button>
  `;
  document.getElementById("main-page").appendChild(container);

  createSuggestionList(
    document.getElementById("ville-depart"),
    document.getElementById("suggestions-depart")
  );
  createSuggestionList(
    document.getElementById("ville-arrivee"),
    document.getElementById("suggestions-arrivee")
  );
}


