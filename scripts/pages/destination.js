export function init() {
  const inputDepart = document.getElementById("ville-depart");
  const suggestionsDepart = document.getElementById("suggestions-depart");
  const inputArrivee = document.getElementById("ville-arrivee");
  const suggestionsArrivee = document.getElementById("suggestions-arrivee");

  if (inputDepart && suggestionsDepart) {
    createSuggestionList(inputDepart, suggestionsDepart);
  }

  if (inputArrivee && suggestionsArrivee) {
    createSuggestionList(inputArrivee, suggestionsArrivee);
  }

  //masquer les suggestions
  document.addEventListener("click", (e) => {
    if (
      !inputDepart.contains(e.target) &&
      !suggestionsDepart.contains(e.target)
    ) {
      suggestionsDepart.innerHTML = "";
    }

    if (
      !inputArrivee.contains(e.target) &&
      !suggestionsArrivee.contains(e.target)
    ) {
      suggestionsArrivee.innerHTML = "";
    }
  });
}

function createSuggestionList(inputElement, suggestionContainer) {
  inputElement.addEventListener("input", async () => {
    const query = inputElement.value.trim();

    if (query.length < 2) {
      suggestionContainer.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(
          query
        )}&fields=nom&boost=population&limit=5`
      );
      const villes = await response.json();

      suggestionContainer.innerHTML = "";

      villes.forEach((ville) => {
        const div = document.createElement("div");
        div.textContent = ville.nom;
        div.addEventListener("click", () => {
          inputElement.value = ville.nom;
          suggestionContainer.innerHTML = "";
        });
        suggestionContainer.appendChild(div);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des villes :", error);
      suggestionContainer.innerHTML = "<div>Erreur de chargement</div>";
    }
  });
}





