import { AnimatedCircularProgress } from "react-native-circular-progress";
import useTimer from "../../../hooks/common/use-timer";
import { useEffect, useRef, useState } from "react";
import { Easing } from "react-native";
import { useElapsedTime } from "use-elapsed-time";

export default function ClockCircularProgress({
  size,
  isPlaying,
}: {
  size?: number;
  isPlaying: boolean;
}) {
  const { seconds, reset } = useTimer({ isPlaying });

  useEffect(() => {
    !isPlaying && reset();
  }, [isPlaying]);

  return (
    <AnimatedCircularProgress
      size={size ?? 100}
      width={15}
      fill={(seconds / 60) * 100}
      tintColor="#00e0ff"
      rotation={180}
      easing={Easing.linear}
      delay={500}
      backgroundColor="#3d5875"
    />
  );
}
