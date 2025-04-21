from fastapi import FastAPI, Query
from fastapi.responses import FileResponse
import json, difflib, os
from extract import extract_clip

app = FastAPI()

with open("database.json", "r", encoding="utf-8") as f:
    database = json.load(f)

@app.get("/search")
async def search(phrase: str = Query(...)):
    keys = list(database.keys())
    match = difflib.get_close_matches(phrase.lower(), [k.lower() for k in keys], n=1, cutoff=0.5)
    
    if not match:
        return {"error": "Aucun extrait trouvé."}
    
    original = next(k for k in keys if k.lower() == match[0])
    entry = database[original]
    output_file = f"output/{original.replace(' ', '_')}.mp4"

    if not os.path.exists(output_file):
        os.makedirs("output", exist_ok=True)
        extract_clip(f"videos/{entry['video']}", entry["start"], entry["end"], output_file)

    return FileResponse(output_file, media_type="video/mp4")
