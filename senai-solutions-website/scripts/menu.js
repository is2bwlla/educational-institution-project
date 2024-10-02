document.addEventListener("DOMContentLoaded", function() {
  const menuHamburger = document.getElementsByClassName("menu-hamburger")[0];

  if (menuHamburger) {
      menuHamburger.addEventListener("click", function () {
          const menu = document.getElementById("mobile-menu");
          menu.classList.toggle("hidden");
      });
  } else {
      console.error("Elemento menu-hamburger não encontrado.");
  }
});
