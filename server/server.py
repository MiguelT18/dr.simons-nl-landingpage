from flask import Flask, request
from flask_cors import CORS
import requests
import json

api_token = "f7c6c2529ebf8efadbd57e46326cbf9d5fa72db9c978c866222895e22c1ceb7f175e0229"
# Crea el servidor Flask
app = Flask(__name__)
CORS(app)

# Ruta que maneja todas las solicitudes que no coinciden con las rutas definidas
@app.route("/dist/index.html", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend():
    # Devuelve los archivos estáticos del frontend generados por AstroJS
    return app.send_static_file("index.html")


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
    
    # Encabezado de la solicitud
    headers = {
        "Api-Token": api_token,
        "Content-Type": "application/json"
    }

    try:
        # Realiza la solicitud POST a la API de ActiveCampaign
        response = requests.post(url, headers=headers, data=json.dumps(data), timeout=10)
        print("API response when adding contact to the list")

        # Devuelve la respuesta de la API de ActiveCampaign
        return response.content
    except requests.exceptions.Timeout:
        # Maneja el caso en el que la solicitud a la API de ActiveCampaign se agote
        return "The request to the ActiveCampaign API timed out", 408


# Ruta para manejar la solicitud de agregar un contacto a la API de ActiveCampaign
@app.route("/api/contacts", methods=["POST"])
def add_contact():
    # Obtén los datos del formulario desde la solicitud
    contact_data = request.get_json()
    
    # Verifica que los datos del formulario contienen una dirección de correo electrónico
    if "email" not in contact_data or not contact_data["email"]:
        return "La dirección de correo electrónico es necesaria", 400
    
    # URL de la API de ActiveCampaign
    url = "https://hotmai46650.api-us1.com/api/3/contacts"

    # Encabezado de la solicitud
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Api-Token": api_token
    }

    # Prepara los datos para la solicitud POST a la API de ActiveCampaign
    data = {
        "contact": {
            "email": contact_data["email"],
            "firstName": contact_data.get("firstName", "")
        }
    }

    try:
        # Realiza la solicitud POST a la API de ActiveCampaign
        response = requests.post(url, headers=headers, json=data)
        print("Respuesta de la API:", response.text)

        try:
            #Parsea la respuesta de la API de ActiveCampaign
            response_data = response.json()
            
            if "contact" in response_data:
                # Obtiene el ID del contacto de la respuesta
                contact_id = response_data["contact"]["id"]
            else:
                # Maneja el caso en el que la clave "contact" no está presente
                print("La respuesta de la API no contiene la clave 'contact'")
                contact_id = None
        except json.JSONDecodeError:
            print("La respuesta de la API no es un JSON válido")
            response_data = None
            contact_id = None
        
        # ID de la lista a la que se agrega el contacto
        list_id = "9"

        # Agrega el contacto a la lista
        response_data = add_contact_to_list(contact_id, list_id)
        
        # Devuelve la respuesta de la API de ActiveCampaign
        return response_data, 200
    except requests.exceptions.Timeout:
        return "La solicitud a la API de ActiveCampaign ha agotado el tiempo de espera", 408

if __name__ == "__main__":
    app.run(debug=False, port=5000)