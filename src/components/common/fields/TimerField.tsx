import { Text, TextProps } from "react-native";
import useTimer from "../../../hooks/common/use-timer";
import { useEffect } from "react";

export default function TimerField({
  isPlaying,
  onStop,
  ...props
}: {
  isPlaying: boolean;
  onStop?: (elapsedTime: number) => void;
} & TextProps) {
  const { elapsedTime, timeToString, reset } = useTimer({ isPlaying });

  useEffect(() => {
    if (!isPlaying) {
      elapsedTime > 0 && onStop && onStop(elapsedTime);
      reset();
    }
  }, [isPlaying]);

  return <Text {...props}>{timeToString() ?? " "}</Text>;
}
