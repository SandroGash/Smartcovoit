export async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", //cookie HttpOnly
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error("Échec de la connexion");

    const data = await response.json();

    // Stockage JWT dans un cookie HttpOnly via l’API
    // Stockage du token CSRF dans localStorage
    localStorage.setItem("csrfToken", data.csrfToken);
    localStorage.setItem("role", data.role);

    // Rediriger selon rôle
    redirectToRolePage(data.role);
  } catch (error) {
    console.error("Erreur de connexion :", error);
    alert("Connexion échouée. Vérifiez vos identifiants.");
  }
}

/**
 * Redirige vers la page en fonction du rôle utilisateur
 */
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

/**
 * Vérifie si l'utilisateur est connecté (token CSRF en localStorage)
 */
export function isLoggedIn() {
  return !!localStorage.getItem("csrfToken");
}

/**
 * Se déconnecter : appelle API logout, nettoie stockage local, redirige vers login
 */
export async function logout() {
  try {
    await fetch("http://localhost/api/logout.php", {
      method: "POST",
      credentials: "include"
    });
  } catch (error) {
    console.error("Erreur logout", error);
  }

  localStorage.removeItem("csrfToken");
  localStorage.removeItem("role");
  window.location.hash = "#/login";
}

/**
 * Fonction utilitaire pour récupérer le token CSRF à envoyer dans les headers
 */
export function getCsrfToken() {
  return localStorage.getItem("csrfToken");
}
