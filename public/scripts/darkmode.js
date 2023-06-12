const d = document;
const w = window;

w.addEventListener("DOMContentLoaded", () => {
  // TODO: Cambiar el nombre de las variables por $elemento
  const switchButton = d.getElementById("switch-button");
  const roundButton = d.getElementById("round-button");
  const headerLogo = d.getElementById("header-logo");
  const heroImg = d.getElementById("hero-img");

  d.getElementById("switch-label").addEventListener("click", () => {
    const isDarkMode = roundButton.classList.toggle("translate-x-full");

    const mode = isDarkMode ? "dark" : "light";
    const logo = `/assets/logos/${mode}-logo.png`;
    const heroImgMode = `/assets/hero-${mode}-img.png`;
    const roundButtonImage = `/assets/switch-mode/round-${mode}-button.png`;
    const switchButtonImage = `/assets/switch-mode/switch-${mode}-button.png`;

    heroImg.src = heroImgMode;
    roundButton.src = roundButtonImage;
    switchButton.src = switchButtonImage;
    headerLogo.src = logo;

    // Data Atributos
    const darkmodeElements = d.querySelectorAll("[data-darkmode]");

    // Aplica la clase a todos los elementos seleccionados
    darkmodeElements.forEach((e) => {
      e.classList.toggle("is-active", isDarkMode);
    });

    if (isDarkMode) {
      d.documentElement.classList.add("dark");
    } else {
      d.documentElement.classList.remove("dark");
    }
  });
});
