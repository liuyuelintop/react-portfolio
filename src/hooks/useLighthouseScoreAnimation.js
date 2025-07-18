import { useState, useEffect } from "react";

export function useLighthouseScoreAnimation(delay = 200) {
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowScores(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return showScores;
}