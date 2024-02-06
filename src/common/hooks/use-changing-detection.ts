import { useEffect, useRef } from "react";

const useChangingDetection = <T>(
  currentValue: T,
  onChange?: (previousValue: T, changedValue: T) => void
) => {
  const previousValue = useRef<T>(currentValue);

  useEffect(() => {
    if (typeof currentValue === "object") {
      for (let key in currentValue) {
        if (currentValue[key] !== previousValue.current[key]) {
          report();
        }
      }
    } else {
      if (currentValue !== previousValue.current) {
        report();
      }
    }
    previousValue.current = currentValue;
  }, [currentValue]);

  const report = () => {
    onChange && onChange(previousValue.current, currentValue);
  };

  return {
    previousValue,
  };
};

export default useChangingDetection;
