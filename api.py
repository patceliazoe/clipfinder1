from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Charger les données du fichier JSON
with open('database.json', 'r') as f:
    database = json.load(f)

# Route d'accueil pour tester si le serveur est en ligne
@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'API ClipFinder est en ligne ✅'}), 200

# Route principale pour chercher un
