const d = document;

const $form = d.getElementById("form");

const inputs = {
  name: d.getElementById("input-name"),
  email: d.getElementById("input-email"),
};

const errors = {
  name: d.getElementById("error-name"),
  email: d.getElementById("error-email"),
};

const $button = d.getElementById("submit-button");

// Validar el envío del formulario
$form.addEventListener("submit", (e) => {
  //? form.submit
  // Validar el envío del campo del nombre
  if (inputs.name.value === "") {
    errors.name.innerText = "Este campo no puede ir vacio";
    errors.name.classList.remove("hidden");
  } else {
    errors.name.innerText = "";
  }

  // Validar el envío del campo del email
  if (inputs.email.value === "") {
    errors.email.innerText = "Este campo no puede ir vacio";
    errors.email.classList.remove("hidden");
  } else {
    errors.email.innerText = "";
  }
});

// Validar el campo del nombre
inputs.name.addEventListener("input", (e) => {
  //? input.name
  let inputValue = e.target.value;
  const reg = /[^a-zA-Z\s´áéíóúÁÉÍÓÚ]/g;
  // Reemplazar los caracteres inválidos por una cadena vacía
  e.target.value = inputValue.replace(reg, "");

  if (inputValue === "") {
    errors.name.classList.remove("hidden");
    errors.name.innerHTML = "Este campo no puede ir vacío";
  } else {
    errors.name.innerText = "";
  }
});

// Validar el campo del correo electrónico
inputs.email.addEventListener("input", (e) => {
  //? input.email
  let inputValue = e.target.value;
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!inputValue === "") {
    errors.name.classList.add("remove");
  }
});

// TODO: Conectar el botón con las validaciones del formulario
