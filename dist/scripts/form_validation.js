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
  //? input name
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
  //? input email
  if (inputs.email.value !== "") {
    errors.email.classList.remove("block");
    errors.email.classList.add("hidden");
  }
});

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isValid = true;

  Object.keys(inputs).forEach((key) => {
    if (inputs[key].value === "") {
      errors[key].textContent = "Este campo no puede ir vacio";
      errors[key].classList.add("block");
      errors[key].classList.remove("hidden");
      isValid = false;
      return;
    }
  });

  if (isValid) {
    // Realiza la solicitud HTTP para enviar los datos del formulario al servidor
    try {
      const response = await fetch("http://127.0.0.1:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs.name.value,
          email: inputs.email.value,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        // La solicitud ha sido exitosa (código de respuesta 200-299)
        console.log("Solicitud Exitosa");
      } else {
        // La solicitud no fue exitosa (código de respuesta fuera del rango 200-299)
        console.error("Error en la solicitud: ", data);
      }
    } catch (error) {
      console.error("Hubo un error durante la solicitud: ", error);
    }
  }
});
