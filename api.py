from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/render-video", methods=["POST"])
def render_video():
    data = request.get_json()
    phrase = data.get("phrase", "").strip()

    if not phrase:
        return jsonify({"error": "Aucune phrase reçue."}), 400

    video_url = get_video_for_phrase(phrase)
    return jsonify({"video_url": video_url})

def get_video_for_phrase(phrase):
    # Remplace ceci par ta logique réelle.
    # Pour l'exemple : URL fictive.
    return f"https://tonstorage.com/videos/{phrase.replace(' ', '_')}.mp4"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
