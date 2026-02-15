import { useState } from 'react';

type ItemOption = { id: string; label: string };
type Item = { id: string; prompt: string; options: ItemOption[]; timeLimitSeconds: number };

type Score = {
  answered: number;
  total: number;
  correct: number;
  percent: number;
  prototypeScoreBand: string;
};

const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000';

export function App() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [item, setItem] = useState<Item | null>(null);
  const [score, setScore] = useState<Score | null>(null);
  const [status, setStatus] = useState('Start a session to begin the prototype test.');

  const loadNext = async (id: string) => {
    const response = await fetch(`${apiBase}/api/sessions/${id}/items/next`);
    const data = await response.json();
    if (data.done) {
      const scoreResponse = await fetch(`${apiBase}/api/sessions/${id}/score`);
      setScore(await scoreResponse.json());
      setItem(null);
      setStatus('Session complete.');
      return;
    }
    setItem(data.item);
  };

  const start = async () => {
    const response = await fetch(`${apiBase}/api/sessions`, { method: 'POST' });
    const data = await response.json();
    setSessionId(data.sessionId);
    setScore(null);
    setStatus(`Session ${String(data.sessionId).slice(0, 8)} started.`);
    await loadNext(data.sessionId);
  };

  const submitAnswer = async (optionId: string) => {
    if (!sessionId || !item) return;
    await fetch(`${apiBase}/api/sessions/${sessionId}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId: item.id, optionId })
    });
    await loadNext(sessionId);
  };

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>CognIQ (Option A Prototype)</h1>
      <p>{status}</p>
      <button onClick={start}>Start Session</button>

      {item ? (
        <section>
          <h2>{item.prompt}</h2>
          <p>Time limit: {item.timeLimitSeconds}s</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {item.options.map((option) => (
              <button key={option.id} onClick={() => submitAnswer(option.id)}>
                {option.id}: {option.label}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {score ? (
        <section>
          <h3>Result</h3>
          <p>
            Correct: {score.correct}/{score.total} ({score.percent}%)
          </p>
          <p>Band: {score.prototypeScoreBand}</p>
        </section>
      ) : null}
    </main>
  );
}
