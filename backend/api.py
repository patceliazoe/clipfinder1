from flask import Flask, request, jsonify, send_from_directory
import json
import os

app = Flask(__name__)

# Charger les données JSON
with open('database.json', 'r', encoding='utf-8') as f:
    database = json.load(f)

# Route API pour chercher une phrase
@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('phrase', '').lower().strip()
    for item in database['repliques']:
        if query in item['phrase']:
            return jsonify({'clip': item['clip']})
    return jsonify({'clip': None})

# Route pour afficher la page web (frontend)
@app.route('/')
def index():
    return send_from_directory('frontend/src', 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
