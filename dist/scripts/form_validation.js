import { API_TOKEN, LIST_ID } from "./config.js";

const d = document;

// Form element
const $form = d.getElementById("form");

// Input elements
const inputs = {
  name: d.getElementById("input-name"),
  email: d.getElementById("input-email"),
};

// Error elements
const errors = {
  name: d.getElementById("error-name"),
  email: d.getElementById("error-email"),
};

// Regex patterns
const patterns = {
  name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ´\s]*$/,
};

// Handle input validation
inputs.name.addEventListener("keyup", (e) => {
  let inputValue = e.target.value;
  if (!patterns.name.test(inputValue)) {
    inputValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ´\s]/g, "");
    inputs.name.value = inputValue;
  }
  if (inputs.name.value !== "") {
    errors.name.classList.remove("block");
    errors.name.classList.add("hidden");
  }
});

inputs.email.addEventListener("keyup", (e) => {
  if (inputs.email.value !== "") {
    errors.email.classList.remove("block");
    errors.email.classList.add("hidden");
  }
});

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  Object.keys(inputs).forEach((key) => {
    if (inputs[key].value === "") {
      errors[key].textContent = "Este campo no puede ir vacio";
      errors[key].classList.add("block");
      errors[key].classList.remove("hidden");
    }
  });
});
