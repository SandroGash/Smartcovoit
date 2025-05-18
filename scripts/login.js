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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Échec de la connexion.");

      localStorage.setItem("csrfToken", data.csrf);
      localStorage.setItem("role", data.role);

      alert("Connexion réussie !");

      switch (data.role) {
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
          window.location.hash = "#/";
      }
    } catch (err) {
      alert(err.message);
    }
  });
}


