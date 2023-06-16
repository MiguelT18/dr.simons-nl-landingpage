/**TODO:
 * ? Solucionar las solicitudes que se hacen a ActiveCampaign
 * ? Mejorar la estructura del código
 * ? Optimizar el código
 */
import { API_TOKEN, LIST_ID } from "./config.js";

const d = document;

// Input elements
const $inputName = d.getElementById("input-name");
const $inputEmail = d.getElementById("input-email");

// Error elements
const $errorName = d.getElementById("error-name");
const $errorEmail = d.getElementById("error-email");

//? Función para validar los datos del formulario
function setupFormValidation() {
  //! Validación de errores
  // Valid input name
  $inputName.addEventListener("keyup", (e) => {
    if (e.target === $inputName) {
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ´\s]*$/; // Expresión regular que valida input-name
      if (!regex.test($inputName.value)) {
        // Borrar los caracteres no válidos
        $inputName.value = $inputName.value.replace(
          /[^a-zA-ZáéíóúÁÉÍÓÚñÑ´\s]/g,
          ""
        );
        // Si hay errores se añade la clase block a $errorName
        $errorName.textContent =
          "El nombre solo puede contener letras y espacios";
        $errorName.classList.remove("hidden");
        $errorName.classList.add("block");
      } else {
        // Si no hay errores quita la clase block y añade hidden
        $errorName.classList.remove("block");
        $errorName.classList.add("hidden");
      }
    }
  });

  // Valid input name
  $inputEmail.addEventListener("keyup", (e) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular que valida input-email
    if (!regex.test($inputEmail.value)) {
      // Si hay errores se añade la clase block a $errorEmail
      $errorEmail.innerHTML =
        "Por favor, introduce una dirección de correo válida";
      $errorEmail.classList.remove("hidden");
      $errorEmail.classList.add("block");
    } else {
      // Si no hay errores quita la clase block y añade hidden
      $errorEmail.classList.remove("block");
      $errorEmail.classList.add("hidden");
    }
  });
}

//? Función para enviar los datos a la API
function sendDataToAPI(formData) {
  // Opciones de la solicitud Fetch
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Token": API_TOKEN,
    },
    body: JSON.stringify(formData),
  };

  // Hacer la solicitud a la API de ActiveCampaign
  fetch("https://hotmai46650.api-us1.com/api/3/contacts", fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Si se creó el contacto con éxito, hacer una segunda solicitud para agregar el contacto a la lista
      if (data.content && data.content.id) {
        const contactListData = {
          contactList: {
            list: LIST_ID,
            contact: data.contact.id,
            status: 1,
          },
        };

        return fetch("https://hotmai46650.api-us1.com/api/3/contactLists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Token": API_TOKEN,
          },
          body: JSON.stringify(contactListData),
        });
      }
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

// Cuando se envía el formulario
d.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Datos del formulario
  const formData = {
    email: $inputEmail.value,
    fullname: $inputName.value,
  };

  // Validar los datos del formulario
  const isValid = validateForm(formData);
  if (!isValid) {
    return;
  }

  // Enviar los datos a la API
  sendDataToAPI(formData);
});
