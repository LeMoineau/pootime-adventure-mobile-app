import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(callback: () => void) {
  useEffect(() => {
    const event = BackHandler.addEventListener("hardwareBackPress", () => {
      callback();
      return true;
    });

    return () => {
      event.remove();
    };
  }, []);

  return {};
}
