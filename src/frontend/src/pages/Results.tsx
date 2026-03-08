import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResults, type ResultsResponse } from "../api";

export default function Results() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [results, setResults] = useState<ResultsResponse | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    getResults(sessionId).then(setResults);
  }, [sessionId]);

  if (!results) {
    return <div className="loading">Calculating your results...</div>;
  }

  return (
    <div className="results">
      <h1>Your Results</h1>
      <div className="iq-score">{results.iqEstimate}</div>
      <div className="iq-label">Estimated IQ Score</div>
      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">
            {results.correctCount}/{results.totalCount}
          </div>
          <div className="stat-label">Correct Answers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{results.rawPercent}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{results.percentile}th</div>
          <div className="stat-label">Percentile</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">18</div>
          <div className="stat-label">Questions</div>
        </div>
      </div>
      <button className="btn-primary" onClick={() => navigate("/")}>
        Take Again
      </button>
      <p className="disclaimer">
        This is an experimental assessment tool for educational purposes only.
        Scores are based on a simplified scoring model and should not be
        interpreted as a clinical IQ measurement. A validated IQ test requires
        professional administration and standardized norming.
      </p>
    </div>
  );
}
