from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Charger la base de données JSON
with open('database.json', 'r') as f:
    database = json.load(f)

# Route d'accueil pour tester si l'API fonctionne
@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'API ClipFinder est en ligne ✅'}), 200

# Route pour chercher un clip
@app.route('/search', methods=['POST'])
def search_clip():
    data = request.get_json()
    query = data.get('query', '').lower()

    for entry in database:
        if query in entry['phrase'].lower():
            return jsonify({'clip': entry['clip']}), 200

    return jsonify({'error': 'Aucun clip trouvé pour cette phrase.'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
