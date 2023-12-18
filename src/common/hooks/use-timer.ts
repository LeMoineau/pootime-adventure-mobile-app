import { useEffect, useState } from "react";
import { useElapsedTime } from "use-elapsed-time";

const useTimer = ({
  isPlaying,
  onUpdate,
}: {
  isPlaying: boolean;
  onUpdate?: () => void;
}) => {
  const { elapsedTime, reset } = useElapsedTime({
    isPlaying,
    onUpdate,
  });

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = Math.floor(elapsedTime) % 60;
  const ms = Math.floor((elapsedTime % 1) * 1000);

  const timeToString = () => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(ms).padStart(3, "0")}`;
  };

  return {
    elapsedTime,
    minutes,
    seconds,
    ms,
    timeToString,
    reset,
  };
};

export default useTimer;
