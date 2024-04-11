import { Animated, Pressable, useWindowDimensions } from "react-native";
import { useBlurStore } from "../../stores/style/blur.store";
import { colors } from "../../utils/color-utils";
import { useEffect, useRef } from "react";

export default function Blur() {
  const { blurEnabled, disableBlur } = useBlurStore();
  const { width, height } = useWindowDimensions();

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (blurEnabled) {
      Animated.timing(opacity, {
        useNativeDriver: false,
        toValue: 0.5,
        delay: 50,
      }).start();
    } else {
      Animated.timing(opacity, {
        useNativeDriver: false,
        toValue: 0,
        delay: 50,
      }).start();
    }
  }, [blurEnabled]);

  return (
    <>
      {blurEnabled && (
        <Pressable
          onPress={disableBlur}
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              width,
              height,
              zIndex: 10,
            },
          ]}
        >
          <Animated.View
            style={[
              {
                opacity: opacity,
                backgroundColor: colors.black,
                width: "100%",
                height: "100%",
              },
            ]}
          ></Animated.View>
        </Pressable>
      )}
    </>
  );
}
