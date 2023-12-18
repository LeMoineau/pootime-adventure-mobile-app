import { useEffect, useState } from "react";

const usePooCurve = ({ elapsedTime }: { elapsedTime: number }) => {
  const [starEarn, setStarEarn] = useState(0);
  const [pooCoinEarn, setPooCoinEarn] = useState(0);

  useEffect(() => {
    calculateEarnings(elapsedTime);
  }, [elapsedTime]);

  const calculateEarnings = (elapsedTime: number) => {
    if (elapsedTime > 0 && elapsedTime < 5 * 60) {
      setStarEarn(0);
      setPooCoinEarn(0);
    } else if (elapsedTime < 10 * 60) {
      setStarEarn(1);
      setPooCoinEarn(Math.floor(100 - (elapsedTime / 60 - 5) * 10));
    } else {
      setStarEarn(Math.floor(Math.exp((elapsedTime / 60 - 10) / 30)));
      setPooCoinEarn(Math.floor(20 * Math.exp((elapsedTime / 60 - 10) / 20)));
    }
  };

  return {
    calculateEarnings,
    starEarn,
    pooCoinEarn,
  };
};

export default usePooCurve;
