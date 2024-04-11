import { useElapsedTime } from "use-elapsed-time";

/**
 * elapsedTime en secondes
 */
const useTimer = ({
  isPlaying,
  onUpdate,
  startAt,
}: {
  isPlaying: boolean;
  onUpdate?: () => void;
  startAt?: number;
}) => {
  const { elapsedTime, reset } = useElapsedTime({
    isPlaying,
    onUpdate,
  });

  const minutes = Math.floor(
    elapsedTime / 60 + Math.floor(startAt ? startAt / 60000 : 0)
  );
  const seconds = Math.floor(
    (elapsedTime + (startAt ? startAt / 1000 : 0)) % 60
  );
  const ms = Math.floor(((elapsedTime % 1) * 1000 + (startAt ?? 0)) % 1000);

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
