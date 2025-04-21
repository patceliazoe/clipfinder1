from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'database.json')

@app.route('/api/clip', methods=['POST'])
def get_clip():
    data = request.json
    query = data.get('query', '').lower()
    with open(DATABASE_PATH, 'r') as db_file:
        clips = json.load(db_file)
    result = next((clip for clip in clips if query in clip['phrase'].lower()), None)
    return jsonify(result if result else {"error": "No clip found"})

@app.route('/')
def index():
    return "ClipFinder API is running."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)

