const d = document;

// Input elements
const $inputName = d.getElementById("input-name");
const $inputEmail = d.getElementById("input-email");

// Error elements
const $errorName = d.getElementById("error-name");
const $errorEmail = d.getElementById("error-email");

d.addEventListener("keyup", (e) => {
  //Validar inputs
  if (e.target === $inputName) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ´\s]*$/; // Expresión regular que valida input-name
    if (!regex.test($inputName.value)) {
      // Borrar los caracteres no válidos
      $inputName.value = $inputName.value.replace(
        /[^a-zA-ZáéíóúÁÉÍÓÚñÑ´\s]/g,
        ""
      );
      $errorName.textContent =
        "El nombre solo puede contener letras y espacios";
      $errorName.classList.remove("hidden");
      $errorName.classList.add("block");
    } else {
      $errorName.classList.remove("block");
      $errorName.classList.add("hidden");
    }
  } else if (e.target === $inputEmail) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular que valida input-email
    if (!regex.test($inputEmail.value)) {
      $errorEmail.innerHTML =
        "Por favor, introduce una dirección de correo válida";
      $errorEmail.classList.remove("hidden");
      $errorEmail.classList.add("block");
    } else {
      $errorEmail.classList.remove("block");
      $errorEmail.classList.add("hidden");
    }
  }
});
