
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Charger les données
with open('database.json', 'r') as f:
    database = json.load(f)

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('phrase', '').lower().strip()
    for item in database['repliques']:
        if query in item['phrase']:
            return jsonify({'clip': item['clip']})
    return jsonify({'clip': None})

if __name__ == '__main__':
    app.run(debug=True)
