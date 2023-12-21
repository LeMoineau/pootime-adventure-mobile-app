import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  ImageSourcePropType,
  View,
  useWindowDimensions,
} from "react-native";
import { style } from "../../utils/style-utils";
import { useEffect, useState } from "react";
import PooCoinIcon from "../icons/pooCoin";

export default function AnimatedBackground({
  imageUri,
  bgColor,
  duration,
}: {
  imageUri: string;
  bgColor: string;
  duration?: number;
}) {
  const { width, height } = useWindowDimensions();

  const [translateValue] = useState(new Animated.Value(0));

  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    Image.getSize(
      imageUri,
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

  const images = [];
  // for (let i = 0; i < width / imageWidth + 1; i++) {
  //   for (let j = 0; j < height / imageHeight + 1; j++) {
  //     images.push(
  //       <PooCoinIcon width={imageWidth} height={imageHeight}></PooCoinIcon>
  //     );
  //   }
  // }

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -10,
          backgroundColor: bgColor,
          width: width + imageWidth,
          height: height + imageHeight,
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
      <Image
        source={{ uri: imageUri }}
        style={{
          width: width + imageWidth,
          height: height + imageHeight,
          opacity: 0.2,
        }}
        resizeMode="repeat"
      ></Image>
      {/* <View style={[style.flexRow, style.flexWrap, style.wFull, style.hFull]}>
        {images.map((i, index) => {
          return <View key={index}>{i}</View>;
        })}
      </View> */}

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "red",
          width: imageWidth,
          height: imageHeight,
        }}
      ></View>
    </Animated.View>
  );
}
