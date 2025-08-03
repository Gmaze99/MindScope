import { useState, useEffect } from 'react';
import './App.css';

interface MoodRecord {
  mood: string;
  timestamp: string;
}

function App() {
  const [mood, setMood] = useState('');
  const [history, setHistory] = useState<MoodRecord[]>([]);

  const fetchHistory = async () => {
    const res = await fetch('/api/history');
    const data = await res.json();
    setHistory(data);
  };

  const submitMood = async () => {
    await fetch('/api/mood', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ mood })
    });
    setMood('');
    fetchHistory();
  };

  useEffect(() => { fetchHistory(); }, []);

  return (
    <div className="App">
      <h1>🌱 AI Wellness Dashboard</h1>
      <input 
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="How are you feeling?"
      />
      <button onClick={submitMood}>Submit Mood</button>

      <h2>History</h2>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>{item.timestamp}: {item.mood}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
