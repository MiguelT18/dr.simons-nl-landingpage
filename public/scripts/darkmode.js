const d = document;
const w = window;

w.addEventListener("DOMContentLoaded", () => {
  const $roundButton = d.getElementById("round-button");
  const $switchButton = d.getElementById("switch-button");
  const $headerLogo = d.getElementById("header-logo");
  const $heroImg = d.getElementById("hero-img");

  // Recupera el modo oscuro guardado del localStorage
  const savedDarkMode = localStorage.getItem("darkMode") === "true";

  // Aplica el modo oscuro si estaba guardado en localStorage
  if (savedDarkMode) {
    toggleDarkMode(true);
    $roundButton.classList.add("translate-x-full");
  }

  d.getElementById("switch-label").addEventListener("click", () => {
    // Comprueba si el modo oscuro está activado
    const isDarkMode = $roundButton.classList.toggle("translate-x-full");

    // Guarda el estado del modo oscuro en localStorage
    localStorage.setItem("darkMode", isDarkMode);

    toggleDarkMode(isDarkMode);
  });

  function toggleDarkMode(isDarkMode) {
    const mode = isDarkMode ? "dark" : "light";
    const logo = `/assets/logos/${mode}-logo.png`;
    const roundButtonImage = `/assets/switch-mode/round-${mode}-button.png`;
    const switchButtonImage = `/assets/switch-mode/switch-${mode}-button.png`;
    const heroImgMode = `/assets/hero-${mode}-img.png`;

    $heroImg.src = heroImgMode;
    $roundButton.src = roundButtonImage;
    $switchButton.src = switchButtonImage;
    $headerLogo.src = logo;

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
  }
});
