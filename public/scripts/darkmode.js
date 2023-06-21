const d = document;
const w = window;

w.addEventListener("DOMContentLoaded", () => {
  d.getElementById("switch").addEventListener("click", (e) => {
    const isChecked = e.target.checked;

    // elements
    const $switchLightButton = d.getElementById("switch-light-button"),
      $roundLightButton = d.getElementById("round-light-button");

    d.body.classList.toggle("is-active", isChecked);

    // data attributes
    const $dataAttributes = d.querySelectorAll("[data-darkmode]");
    $dataAttributes.forEach((e) => {
      e.classList.toggle("dark");
    });

    if (isChecked) {
      $switchLightButton.src = "/assets/switch-mode/switch-dark-button.png";
      $roundLightButton.src = "/assets/switch-mode/round-dark-button.png";

      // round button translation
      $roundLightButton.classList.add("translate-x-full");
    } else {
      $switchLightButton.src = "/assets/switch-mode/switch-light-button.png";
      $roundLightButton.src = "/assets/switch-mode/round-light-button.png";

      // round button translation
      $roundLightButton.classList.remove("translate-x-full");
    }
  });
});
