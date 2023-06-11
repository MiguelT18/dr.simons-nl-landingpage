const d = document;
const w = window;

w.addEventListener("DOMContentLoaded", () => {
  const switchButton = d.getElementById("switch-button");
  const roundButton = d.getElementById("round-button");
  const headerLogo = d.getElementById("header-logo");

  d.getElementById("switch-label").addEventListener("click", () => {
    roundButton.classList.toggle("translate-x-full");
    if (roundButton.classList.contains("translate-x-full")) {
      roundButton.src = "/assets/switch-mode/round-light-button.png";
      switchButton.src = "/assets/switch-mode/switch-light-button.png";
      // Cambiar header-logo a light
      headerLogo.src = "/assets/logos/light-logo.png";

      // Cambiar clase del body a is-active
      d.body.classList.add("is-active");
    } else {
      roundButton.src = "/assets/switch-mode/round-dark-button.png";
      switchButton.src = "/assets/switch-mode/switch-dark-button.png";
      // Cambiar header-logo a dark
      headerLogo.src = "/assets/logos/dark-logo.jpg";

      // Quitar clase is-active a body
      d.body.classList.remove("is-active");
    }
  });
});
