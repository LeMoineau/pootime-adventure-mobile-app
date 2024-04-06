import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

const useAnimatedValue = ({
  enableDuration,
  disableDuration,
  duration,
}: {
  enableDuration?: number;
  disableDuration?: number;
  duration?: number;
}) => {
  const [enable, setEnabled] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (enable) {
      Animated.timing(animValue, {
        toValue: 1,
        useNativeDriver: false,
        duration: duration ?? enableDuration ?? 50,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        useNativeDriver: false,
        duration: duration ?? disableDuration ?? 50,
      }).start();
    }
  }, [enable]);

  return {
    animValue,
    setEnabled,
  };
};

export default useAnimatedValue;
