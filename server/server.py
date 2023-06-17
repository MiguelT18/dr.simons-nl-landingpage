from flask import Flask, request
import requests
import json

app = Flask(__name__)


# Ruta que menaje todas las solicitudes que no coinciden con las rutas definidas
@app.route('/dist/index.html', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    # En este punto, puedes realizar cualquier lógica adicional antes de devolver los archivos estáticos
    # Por ejemplo, puedes realizar autenticación, autorización u otras validaciones según tus necesidades.

    # Devuelve los archivos estáticos de tu frontend generados por AstroJS
    return app.send_static_file('index.html')


# Ruta para manejar la solicitud de agregar un contacto a la API de ActiveCampaign
@app.route('/api/contacts', methods=['POST'])
def add_contact():
    # Obtén los datos del formulario desde la solicitud
    contact_data = request.get_json()

    #URL de la API de ActiveCampaign
    url = "https://hotmai46650.api-us1.com/api/9/contacts"

    # Headers, incluyendo API Token
    headers = {
        "Api-Token": "f7c6c2529ebf8efadbd57e46326cbf9d5fa72db9c978c866222895e22c1ceb7f175e0229",
        "Content-Type": "application/json"
    }

    try:
        # Realiza la solicitud POST a la API de ActiveCampaign
        response = requests.post(url, headers= headers, data=json.dumps(contact_data))

        # Devuelve la respuesta de la API de ActiveCampaign
        return response.content
    except requests.exceptions.Timeout:
        # Maneja el caso en el que la solicitud a la API de ActiveCampaign se agote
        return "La solicitud a la API de ActiveCampaign ha agotado el tiempo de espera", 408
    
if __name__ == '__main__':
    app.run(debug=True)