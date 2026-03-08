interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
