import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { style } from "../../services/style-utils";
import { useEffect, useState } from "react";

export default function AnimatedBackground({
  imageSrc,
  bgColor,
  duration,
}: {
  imageSrc: ImageSourcePropType;
  bgColor: string;
  duration?: number;
}) {
  const [translateValue] = useState(new Animated.Value(0));

  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    Image.getSize(
      imageSrc.toString(),
      (width, height) => {
        setImageWidth(width);
        setImageHeight(height);
      },
      (err) => console.error(err)
    );

    Animated.loop(
      Animated.timing(translateValue, {
        toValue: 1,
        duration: duration ?? 2000,
        useNativeDriver: false,
        easing: Easing.linear,
      })
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        style.wFull,
        style.hFull,
        {
          position: "absolute",
          flex: 1,
          top: 0,
          left: 0,
          zIndex: -10,
          backgroundColor: bgColor,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          width: document.body.clientWidth + imageWidth,
          height: document.body.clientHeight + imageHeight,
          transform: [
            {
              translateX: translateValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -imageWidth],
              }),
            },
            {
              translateY: translateValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -imageHeight],
              }),
            },
          ],
        },
      ]}
    >
      <ImageBackground
        source={imageSrc}
        resizeMode="repeat"
        style={{ flex: 1, opacity: 0.2 }}
      ></ImageBackground>
    </Animated.View>
  );
}
