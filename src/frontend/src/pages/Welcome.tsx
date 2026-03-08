import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSession } from "../api";

export default function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleStart() {
    setLoading(true);
    try {
      const session = await createSession();
      navigate(`/test/${session.id}`);
    } catch {
      alert("Failed to start session. Is the backend running?");
      setLoading(false);
    }
  }

  return (
    <div className="welcome">
      <h1>CognIQ</h1>
      <p className="subtitle">A Scientific Cognitive Assessment</p>
      <div className="info">
        <p>
          This test measures cognitive abilities through <strong>pattern recognition</strong>,{" "}
          <strong>fluid reasoning</strong>, and <strong>working memory</strong> tasks.
        </p>
        <br />
        <p><strong>18 questions</strong> of increasing difficulty</p>
        <p><strong>30-60 seconds</strong> per question</p>
        <p><strong>~10 minutes</strong> to complete</p>
        <br />
        <p>
          Answer each question before the timer runs out. Your score is based on accuracy.
        </p>
      </div>
      <button className="btn-primary" onClick={handleStart} disabled={loading}>
        {loading ? "Starting..." : "Start Test"}
      </button>
    </div>
  );
}
