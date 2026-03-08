import { useState } from "react";

interface Props {
  item: {
    id: string;
    domain: string;
    difficulty: number;
    prompt: string;
    options: string[];
  };
  onAnswer: (selectedOption: number) => void;
  disabled: boolean;
}

export default function QuestionCard({ item, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleClick(index: number) {
    if (disabled) return;
    setSelected(index);
    onAnswer(index);
  }

  return (
    <div className="question-card">
      <div className="question-meta">
        <span className="badge">{item.domain.replace("-", " ")}</span>
        <span className="badge">Difficulty {item.difficulty}</span>
      </div>
      <div className="question-prompt">{item.prompt}</div>
      <div className="options">
        {item.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${selected === index ? "selected" : ""}`}
            onClick={() => handleClick(index)}
            disabled={disabled}
          >
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>
    </div>
  );
}
