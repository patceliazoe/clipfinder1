import React, { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  const [phrase, setPhrase] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phrase) return;

    setLoading(true);
    try {
      const response = await fetch("https://TON-BACKEND-URL/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phrase }),
      });

      const data = await response.json();
      setVideoUrl(data.video_url);
    } catch (error) {
      setVideoUrl("");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">Trouve ta scène !</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <Input
          type="text"
          placeholder="Écris une phrase..."
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Recherche..." : "Envoyer"}
        </Button>
      </form>

      {videoUrl && (
        <div className="mt-6">
          <video src={videoUrl} controls className="rounded-2xl shadow-lg" />
        </div>
      )}
    </div>
  );
}

export default App;

