import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

const useAnimatedValue = ({
  enableDuration,
  disableDuration,
  duration,
  delay,
}: {
  enableDuration?: number;
  disableDuration?: number;
  duration?: number;
  delay?: number;
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
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        useNativeDriver: false,
        duration: duration ?? disableDuration ?? 50,
        delay,
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
