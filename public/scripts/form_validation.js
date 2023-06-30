/** @format */

// Global objects
const d = document;
const w = window;

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

function validateField(input, error, errorMessage) {
	if (input.value.trim() === "") {
		error.innerText = errorMessage;
		error.classList.remove("hidden");
	} else {
		error.innerText = "";
	}
}

// Validar el envío del formulario
//? form.submit
$form.addEventListener("submit", (e) => {
	e.preventDefault();

	// Validar el envío del campo del nombre
	validateField(inputs.name, errors.name, "Este campo no puede ir vacio");

	// Validar el envío del campo del email
	validateField(inputs.email, errors.email, "Este campo no puede ir vacio");

	// Verificar si no hay errores de validación
	if (inputs.name.value !== "" && inputs.email.value !== "") {
		// Enviar la solicitud al servidor de Flask
		fetch("http://localhost:5000/api/contacts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: inputs.email.value,
				firstName: inputs.name.value,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Respuesta del servidor:", data);
				w.location.href = "/thanks";
			})
			.catch((error) => {
				console.error("Error al enviar la solicitud:", error);
			});
	}
});

// Validar el campo del nombre
//? input.name
inputs.name.addEventListener("input", (e) => {
	let inputValue = e.target.value;
	const reg = /[^a-zA-Z\s´áéíóúÁÉÍÓÚ]/g;
	// Reemplazar los caracteres inválidos por una cadena vacía
	e.target.value = inputValue.replace(reg, "");

	validateField(inputs.name, errors.name, "Este campo no puede ir vacio");
});

// Validar el campo del correo electrónico
inputs.email.addEventListener("input", (e) => {
	//? input.email
	let inputValue = e.target.value;
	const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (inputValue.trim() !== "" && !reg.test(inputValue)) {
		errors.email.innerText = "El correo electrónico no es válido";
	} else {
		errors.email.innerText = "";
	}
	validateField(inputs.email, errors.email, "Este campo no puede ir vacio");
});
