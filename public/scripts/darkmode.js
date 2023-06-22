const d = document;
const w = window;

// button elements
const $switchLightButton = d.getElementById("switch-light-button"),
  $roundLightButton = d.getElementById("round-light-button");

const $heroImgElement = d.getElementById("hero-img");

const $headerLogo = d.getElementById("header-logo");

w.addEventListener("DOMContentLoaded", () => {
  const $switchElement = d.getElementById("switch");

  // Obtener el estado actual del localStorage y actualizar la UI
  const savedIsChecked = localStorage.getItem("isChecked") === "true";
  $switchElement.checked = savedIsChecked;
  updateUI(savedIsChecked);

  $switchElement.addEventListener("click", (e) => {
    const isChecked = e.target.checked;

    // Guardar el estado actual en el localStorage
    localStorage.setItem("isChecked", isChecked.toString());

    updateUI(isChecked);
  });
});

function updateUI(isChecked) {
  d.body.classList.toggle("is-active", isChecked);

  if ($switchLightButton && $roundLightButton) {
    // data attributes
    const $dataAttributes = d.querySelectorAll("[data-darkmode]");
    $dataAttributes.forEach((e) => {
      if (isChecked) {
        e.classList.add("dark");
      } else {
        e.classList.remove("dark");
      }
    });

    if (isChecked) {
      //? Dark Mode
      $switchLightButton.src = "/assets/switch-mode/switch-dark-button.png";
      $roundLightButton.src = "/assets/switch-mode/round-dark-button.png";

      // round button translation
      $roundLightButton.style.transform = "translateX(100%)"

      // Header Logo
      $headerLogo && ($headerLogo.src = "/assets/logos/dark-logo.png");

      // Hero Image
      $heroImgElement && ($heroImgElement.src = "/assets/hero-dark-img.png");
    } else {
      //? Light Mode
      $switchLightButton.src = "/assets/switch-mode/switch-light-button.png";
      $roundLightButton.src = "/assets/switch-mode/round-light-button.png";

      // round button translation
      $roundLightButton.style.transform = "translateX(0%)"

      // Header Logo
      $headerLogo && ($headerLogo.src = "/assets/logos/light-logo.png");

      // Hero Image
      $heroImgElement && ($heroImgElement.src = "/assets/hero-light-img.png");
    }
  }
}
