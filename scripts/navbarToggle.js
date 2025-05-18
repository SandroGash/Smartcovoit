document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-nav");
  const toggler = document.querySelector(".nav-toggler");
  const links = document.querySelectorAll(".main-nav ul li a");

  toggler.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
});

