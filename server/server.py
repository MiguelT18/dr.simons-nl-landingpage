from flask import Flask, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

app_state = "idle" # Estado inicial: inactivo

# Ruta que menaje todas las solicitudes que no coinciden con las rutas definidas
@app.route('/dist/index.html', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    # En este punto, puedes realizar cualquier lógica adicional antes de devolver los archivos estáticos
    # Por ejemplo, puedes realizar autenticación, autorización u otras validaciones según tus necesidades.

    # Devuelve los archivos estáticos de tu frontend generados por AstroJS
    return app.send_static_file('index.html')


def add_contact_to_list(contact_id, list_id):
    # URL de la API de ActiveCampaign para agregar un contacto a una lista
    url = "https://hotmai46650.api-us1.com/api/3/contactLists"

    # Datos para agregar el contacto a la lista
    data = {
        "contactList": {
            "list": list_id,
            "contact": contact_id,
            "status": 1
        }
    }

    headers = {
        "Api-Token": "f7c6c2529ebf8efadbd57e46326cbf9d5fa72db9c978c866222895e22c1ceb7f175e0229",
        "Content-Type": "application/json"
    }

    try:
        # Realiza la solicitud POST a la API de ActiveCampaign
        response = requests.post(url, headers=headers, data=json.dumps(data))
        print("Respuesta de la API al agregar el contacto a la lista")

        # Devuelve la respuesta de la API de ActiveCampaign
        return response.content
    except requests.exceptions.Timeout:
        # Maneja el caso en el que la solicitud a la API de ActiveCampaign se agote
        return "La solicitud a la API de ActiveCampaign ha agotado el tiempo de espera", 408


# Ruta para manejar la solicitud de agregar un contacto a la API de ActiveCampaign
@app.route('/api/contacts', methods=['POST'])
def add_contact():
    # Obtén los datos del formulario desde la solicitud
    contact_data = request.get_json()

    # Verifica que los datos del formulario contienen una dirección de correo electrónico
    if 'email' not in contact_data or not contact_data['email']:
        return "La dirección de correo electrónico es necesaria", 400

    #URL de la API de ActiveCampaign
    url = "https://hotmai46650.api-us1.com/api/3/contacts"

    # Headers, incluyendo API Token
    headers = {
        "Api-Token": "f7c6c2529ebf8efadbd57e46326cbf9d5fa72db9c978c866222895e22c1ceb7f175e0229",
        "Content-Type": "application/json"
    }

    # Prepara los datos para la solicitud POST a la API de ActiveCampaign
    data = {
        "contact": {
            "email": contact_data['email'],
            "firstName": contact_data.get("name", ''),
            "lastName": contact_data.get('lastName', '')
        }
    }

    try:
        # Realiza la solicitud POST a la API de ActiveCampaign
        response = requests.post(url, headers= headers, data=json.dumps(data))
        print("Respuesta de la API:", response.text)

        try:
            # Parsea la respuesta de la API de ActiveCampaign
            response_data = response.json()

            if 'contact' in response_data:
                # Obtiene el ID del contacto de la respuesta
                contact_id = response_data['contact']['id']
            else:
                # Maneja el caso en el que la clave 'contact' no está presente en la respuesta
                print("La respuesta de la API no contiene la clave 'contact'")
                contact_id = None

        except json.JSONDecodeError:
            print("La respuesta de la API no es un JSON válido")
            response_data = None
            contact_id = None

        # ID de la lista a la que se agrega el contacto
        list_id = "9"

        # Agrega el contacto a la lista
        add_contact_to_list(contact_id, list_id)

        # Devuelve la respuesta de la API de ActiveCampaign
        return response.content
    except requests.exceptions.Timeout:
        return "La solicitud a la API de ActiveCampaign ha agotado el tiempo de espera", 408


if __name__ == '__main__':
    app.run(debug=True)
