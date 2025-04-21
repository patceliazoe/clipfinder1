from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/search', methods=['POST'])
def search_clip():
    data = request.get_json()
    query = data.get('query', '').lower()

    with open('backend/database.json', encoding='utf-8') as f:
        clips = json.load(f)

    result = next((clip for clip in clips if query in clip['phrase'].lower()),
