const d = document;
const w = window;

w.addEventListener("DOMContentLoaded", () => {
  const switchButton = d.getElementById("switch-button");
  const roundButton = d.getElementById("round-button");

  d.getElementById("switch-label").addEventListener("click", () => {
    roundButton.classList.toggle("translate-x-full");
    if (roundButton.classList.contains("translate-x-full")) {
      roundButton.src = "/assets/switch-mode/round-light-button.png";
      switchButton.src = "/assets/switch-mode/switch-light-button.png";
      // TODO: Cambiar clase del body a is-active
      d.body.classList.add("is-active");
    } else {
      roundButton.src = "/assets/switch-mode/round-dark-button.png";
      switchButton.src = "/assets/switch-mode/switch-dark-button.png";
      d.body.classList.remove("is-active");
    }
  });
});
