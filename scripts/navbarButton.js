import { isLoggedIn, logout } from "./auth.js";

export function updateAuthButton() {
  const authButton = document.getElementById("auth-button");
  if (!authButton) return;

  if (isLoggedIn()) {
    authButton.textContent = "Déconnexion";
    authButton.onclick = async () => {
      await logout();
      updateAuthButton();
    };
  } else {
    authButton.textContent = "Connexion";
    authButton.onclick = () => {
      window.location.hash = "#/login";
    };
  }
}



updateAuthButton();
