import { Animated, Text, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { useEffect } from "react";
import { colors } from "../../../common/utils/color-utils";

export default function ReadyGoText({
  battleReady,
  battleBegin,
}: {
  battleReady: boolean;
  battleBegin: boolean;
}) {
  const { width } = useWindowDimensions();
  const translateValueReady = new Animated.Value(0);
  const animValueGo = new Animated.Value(0);

  useEffect(() => {
    if (!battleReady) {
      return;
    }
    Animated.spring(translateValueReady, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, [battleReady]);

  useEffect(() => {
    if (!battleBegin) {
      return;
    }
    translateValueReady.setValue(1);
    Animated.sequence([
      Animated.timing(translateValueReady, {
        toValue: 2,
        useNativeDriver: false,
        duration: 500,
      }),
      Animated.timing(animValueGo, {
        toValue: 1,
        useNativeDriver: false,
        duration: 200,
      }),
      Animated.delay(2000),
      Animated.timing(animValueGo, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
      }),
    ]).start(() => {
      translateValueReady.setValue(0);
    });
  }, [battleBegin]);

  return (
    <>
      <Animated.Text
        style={[
          style.textBold,
          style.text2Xl,
          style.wFull,
          style.textCenter,
          style.textShadowMd,
          {
            position: "absolute",
            top: "50%",
            left: 0,
            color: colors.white,
            opacity: translateValueReady.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0, 1, 0],
            }),
            transform: [
              {
                translateX: translateValueReady.interpolate({
                  inputRange: [0, 2],
                  outputRange: [width / 2, -width / 2],
                }),
              },
            ],
          },
        ]}
      >
        READY?
      </Animated.Text>
      <Animated.Text
        style={[
          style.textBold,
          style.text2Xl,
          style.wFull,
          style.textCenter,
          style.textShadowMd,
          {
            position: "absolute",
            top: "50%",
            left: 0,
            opacity: animValueGo,
            color: colors.white,
            transform: [
              {
                scale: animValueGo.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 2],
                }),
              },
            ],
          },
        ]}
      >
        GO!!!
      </Animated.Text>
    </>
  );
}
