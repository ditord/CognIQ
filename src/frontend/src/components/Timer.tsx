import { useState, useEffect, useRef } from "react";

interface Props {
  seconds: number;
  onTimeout: () => void;
}

export default function Timer({ seconds, onTimeout }: Props) {
  const [remaining, setRemaining] = useState(seconds);
  const calledRef = useRef(false);

  useEffect(() => {
    setRemaining(seconds);
    calledRef.current = false;
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0 && !calledRef.current) {
      calledRef.current = true;
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setRemaining((r) => r - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining, onTimeout]);

  const className =
    remaining <= 5 ? "timer danger" : remaining <= 10 ? "timer warning" : "timer";

  return <div className={className}>{Math.max(0, remaining)}s</div>;
}
