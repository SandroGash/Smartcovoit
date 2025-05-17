const routes = {
    "/": "/pages/home.html",
    "/form": "/pages/form.html",
    "/login": "/pages/login.html",
    "/destination": "/pages/destination.html",
    "/contact": "/pages/contact.html",
    "/passenger": "/pages/passager.html",
    "/driver": "/pages/conducteur.html",
    "/employee": "/pages/employe.html",
    "/administrator": "/pages/admin.html",
    404: "/pages/404.html",
  };
  
  const handleLocation = async () => {
    const hash = window.location.hash || "#/";
    const path = hash.slice(1);
    const route = routes[path] || routes[404];
  
    try {
    const html = await fetch(route).then(res => res.text());
    document.getElementById("main-page").innerHTML = html;

    // Charger dynamiquement le JS pour les formulaires
     if (path === "/form") {
      import("./optionForm.js").then(module => {
        if (module.initFormOptions) module.initFormOptions();
      }).catch(console.error);
    }
      if (path === "/login") {
        import("./scripts/login.js").then((module) => {
        if (module.initLoginForm) module.initLoginForm();
        }).catch(console.error);
    }


  } catch (err) {
    document.getElementById("main-page").innerHTML = "<h2>Erreur de chargement</h2>";
  }
};
  
  window.addEventListener("hashchange", handleLocation);
  window.addEventListener("DOMContentLoaded", handleLocation);
  