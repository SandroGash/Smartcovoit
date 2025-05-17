export function initLoginForm() {
  const form = document.querySelector(".form-login");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("http://localhost/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Échec de la connexion.");
      }

      // On stocke le token JWT en localStorage
      localStorage.setItem("token", data.token);

      alert("Connexion réussie !");
      window.location.hash = "#/"; // Redirige vers l'accueil ou tableau de bord
    } catch (err) {
      alert(err.message);
    }
  });
}
