import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setVideoUrl(null);
    try {
      const response = await axios.get(`http://localhost:8000/search`, {
        params: { phrase: input }
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setVideoUrl(`http://localhost:8000/search?phrase=${encodeURIComponent(input)}`);
    } catch (err) {
      setError("Aucun extrait trouvé.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5em" }}>
      <h1>Extrait Vidéo Instantané</h1>
      <input 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Tape ta phrase..." 
        style={{ width: "300px", padding: "10px" }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "10px 20px" }}>
        Chercher
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {videoUrl && (
        <div style={{ marginTop: "20px" }}>
          <video controls autoPlay style={{ maxWidth: "90%" }}>
            <source src={videoUrl} type="video/mp4" />
            Ton navigateur ne supporte pas la lecture vidéo.
          </video>
        </div>
      )}
    </div>
  );
}

export default App;
