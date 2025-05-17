
export function initFormOptions() {
  const carStyleSelect = document.getElementById("car-style");
  const seatsSelect = document.getElementById("seats");
  const carModelInput = document.getElementById("car-model");

  const carModelGroup = carModelInput?.closest(".form-group");
  const seatsGroup = seatsSelect?.closest(".form-group");

  if (carStyleSelect) {
    const styles = ["Passager", "Citadine", "SUV", "Berline", "Monospace", "Break"];
    styles.forEach(style => {
      const option = document.createElement("option");
      option.value = style;
      option.textContent = style;
      carStyleSelect.appendChild(option);
    });

    // Événement pour masquer/afficher les champs
    carStyleSelect.addEventListener("change", () => {
      const isPassenger = carStyleSelect.value === "Passager";
      if (carModelGroup) carModelGroup.style.display = isPassenger ? "none" : "block";
      if (seatsGroup) seatsGroup.style.display = isPassenger ? "none" : "block";
    });

    // Déclencher une première fois si la valeur par défaut est "Passager"
    const isPassengerInit = carStyleSelect.value === "Passager";
    if (carModelGroup) carModelGroup.style.display = isPassengerInit ? "none" : "block";
    if (seatsGroup) seatsGroup.style.display = isPassengerInit ? "none" : "block";
  }

  if (seatsSelect) {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${i} place${i > 1 ? "s" : ""}`;
      seatsSelect.appendChild(option);
    }
  }

  // Sécurité sur le champ car-model
  if (carModelInput) {
    carModelInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s\-]/g, "");
    });
  }

  const form = document.querySelector(".form-inscription");
  if (form) {
    form.addEventListener("submit", function (e) {
      const model = carModelInput?.value || "";
      if (/[^a-zA-Z0-9\s\-]/.test(model)) {
        e.preventDefault();
        alert("Le modèle contient des caractères non autorisés.");
      }
    });
  }
}

