import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setVideoUrl(null);
    try {
      const response = await axios.get("http://localhost:8000/search", {
        params: { phrase: input },
      });
      setVideoUrl(`http://localhost:8000/search?phrase=${encodeURIComponent(input)}`);
    } catch (err) {
      setError("Aucun extrait trouvé.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to bottom, #FFEDD5, #FFFAF0)",
      padding: "20px"
    }}>
      <h1 style={{
        fontSize: "2.5rem",
        color: "#EA580C",
        marginBottom: "2rem",
        fontFamily: "Poppins, sans-serif"
      }}>
        ClipFinder 🎬
      </h1>

      <div style={{
        display: "flex",
        gap: "10px",
        width: "100%",
        maxWidth: "500px"
      }}>
        <input
          style={{
            flexGrow: 1,
            padding: "14px",
            borderRadius: "16px",
            border: "1px solid #FB923C",
            boxShadow: "0 0 8px rgba(0,0,0,0.05)"
          }}
          type="text"
          placeholder="Ex : la crêpe au sucre..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#F97316",
            color: "white",
            fontWeight: "600",
            padding: "10px 20px",
            borderRadius: "16px",
            border: "none",
            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
            cursor: "pointer"
          }}
        >
          Chercher
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {videoUrl && (
        <div style={{ marginTop: "30px", width: "100%", maxWidth: "700px" }}>
          <video
            src={videoUrl}
            controls
            autoPlay
            style={{
              width: "100%",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          />
        </div>
      )}

      <p style={{
        color: "#6B7280",
        fontSize: "14px",
        marginTop: "60px",
        fontFamily: "Open Sans, sans-serif"
      }}>
        Tape une réplique et regarde la magie 🧡
      </p>
    </div>
  );
}

export default App;
