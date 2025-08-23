'use client';

import { useState } from 'react';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);

    try {
    const res = await fetch('/api/generateIdea', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt }),
});

      const data = await res.json();
      setIdea(data);
    } catch (err) {
      console.error(err);
      setIdea({ error: 'Error al generar idea' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Generador de ideas</h1>

      <input
        type="text"
        placeholder="Escribe tu prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />

      <button onClick={handleGenerate} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        {loading ? 'Generando...' : 'Generar idea'}
      </button>

      {idea && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Resultado:</h2>
          <pre>{JSON.stringify(idea, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
