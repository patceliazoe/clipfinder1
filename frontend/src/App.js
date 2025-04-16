
import React, { useState } from 'react';
import './App.css';

function App() {
  const [phrase, setPhrase] = useState('');
  const [clip, setClip] = useState(null);

  const searchClip = async () => {
    const response = await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phrase })
    });
    const data = await response.json();
    setClip(data.clip);
  };

  return (
    <div className="App">
      <h1>ClipFinder 🎬</h1>
      <input
        type="text"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        placeholder="Tape une réplique de film..."
      />
      <button onClick={searchClip}>Chercher</button>
      {clip && <video src={clip} controls autoPlay loop style={{marginTop: '20px'}} />}
    </div>
  );
}

export default App;
