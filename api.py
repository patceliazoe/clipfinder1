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

# Route principale pour chercher une phrase
@app.route('/search', methods=['POST'])
def search_clip():
    data = request.get_json()

    if not data or 'query' not in data:
        return jsonify({'error': 'Requête invalide. Champ "query" manquant.'}), 400

    query = data['query'].lower
