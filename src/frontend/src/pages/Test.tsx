import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNextItem, submitAnswer, type ItemResponse } from "../api";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";

export default function Test() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<ItemResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const fetchNext = useCallback(async () => {
    if (!sessionId) return;
    const result = await getNextItem(sessionId);
    if (result.done) {
      navigate(`/results/${sessionId}`);
      return;
    }
    setData(result);
    setTimerKey((k) => k + 1);
  }, [sessionId, navigate]);

  useEffect(() => {
    fetchNext();
  }, [fetchNext]);

  async function handleAnswer(selectedOption: number) {
    if (!sessionId || !data?.item || submitting) return;
    setSubmitting(true);
    try {
      await submitAnswer(sessionId, data.item.id, selectedOption);
      await fetchNext();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleTimeout() {
    // Submit -1 as a "no answer" when time runs out
    if (!sessionId || !data?.item || submitting) return;
    setSubmitting(true);
    try {
      await submitAnswer(sessionId, data.item.id, -1);
      await fetchNext();
    } finally {
      setSubmitting(false);
    }
  }

  if (!data || !data.item) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="test-container">
      <div className="test-header">
        <ProgressBar current={data.currentIndex} total={data.totalItems} />
        <Timer
          key={timerKey}
          seconds={data.item.timeLimit}
          onTimeout={handleTimeout}
        />
      </div>
      <QuestionCard
        item={data.item}
        onAnswer={handleAnswer}
        disabled={submitting}
      />
      <p className="question-number">
        Question {data.currentIndex + 1} of {data.totalItems}
      </p>
    </div>
  );
}
