import { useEffect, useRef, useState } from "react";
import { Animated, Easing, EasingFunction } from "react-native";

const useAnimatedValue = ({
  enableDuration,
  disableDuration,
  duration,
  delay,
  easing,
}: {
  enableDuration?: number;
  disableDuration?: number;
  duration?: number;
  delay?: number;
  easing?: EasingFunction;
}) => {
  const [enable, setEnabled] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (enable) {
      Animated.timing(animValue, {
        toValue: 1,
        useNativeDriver: false,
        duration: duration ?? enableDuration ?? 50,
        delay,
        easing,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        useNativeDriver: false,
        duration: duration ?? disableDuration ?? 50,
        delay,
        easing,
      }).start();
    }
  }, [enable]);

  return {
    animValue,
    enable,
    setEnabled,
  };
};

export default useAnimatedValue;
