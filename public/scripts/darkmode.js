const d = document;
const w = window;

w.addEventListener("DOMContentLoaded", () => {
  // Dark Elements
  const $roundDarkButton = d.getElementById("round-dark-button");
  const $switchDarkButton = d.getElementById("switch-dark-button");

  // Light Elements
  const $roundLightButton = d.getElementById("round-light-button");
  const $switchLightButton = d.getElementById("switch-light-button");

  const $headerLogo = d.getElementById("header-logo");
  const $heroImg = d.getElementById("hero-img");

  // Intérvalo que comprueba si los elementos necesarios están disponibles
  const checkElementsInterval = setInterval(() => {
    // Si los elementos necesarios están disponbiles...
    if (
      $roundDarkButton &&
      $switchDarkButton &&
      $roundLightButton &&
      $switchLightButton
    ) {
      // Detiene el intervalo
      clearInterval(checkElementsInterval);

      // Recupera el modo oscuro guardado del localStorage
      const savedDarkMode = localStorage.getItem("darkMode") === "true";

      // Aplica el modo oscuro si estaba guardado en localStorage
      if (savedDarkMode) {
        toggleDarkMode(true);
        $roundLightButton.classList.add("hidden");
        $roundDarkButton.classList.remove("hidden");
        $switchLightButton.classList.add("hidden");
        $switchDarkButton.classList.remove("hidden");

        $roundDarkButton.classList.add("translate-x-full");
      } else {
        $roundDarkButton.classList.remove("translate-x-full");
      }
    }
  }, 100); // Ejecuta la comprobación cada 100 milisegundos

  d.getElementById("switch-label").addEventListener("click", () => {
    // Comprueba si el modo oscuro está activado
    const isDarkMode = $roundLightButton.classList.toggle("translate-x-full");
    $roundDarkButton.classList.toggle("translate-x-full");

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
    $roundLightButton.src = roundButtonImage;
    $switchLightButton.src = switchButtonImage;
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
