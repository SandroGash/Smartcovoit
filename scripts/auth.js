export async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error("Échec de la connexion");

    const data = await response.json();

    // Sauvegarder le token et le rôle dans localStorage
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("role", data.role);

    // Rediriger vers la page personnelle en fonction du rôle
    redirectToRolePage(data.role);
  } catch (error) {
    console.error("Erreur de connexion :", error);
    alert("Connexion échouée. Vérifiez vos identifiants.");
  }
}

export function redirectToRolePage(role) {
  switch (role) {
    case "passager":
      window.location.hash = "#/passenger";
      break;
    case "conducteur":
      window.location.hash = "#/driver";
      break;
    case "employé":
      window.location.hash = "#/employee";
      break;
    case "administrateur":
      window.location.hash = "#/admin";
      break;
    default:
      window.location.hash = "#/404";
  }
}

// Fonction pour vérifier si l'utilisateur est connecté
export function isLoggedIn() {
  return !!localStorage.getItem("jwt");
}

// Fonction pour se déconnecter
export function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("role");
  window.location.hash = "#/login";
}