import { Animated, Text, useWindowDimensions } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import { useEffect, useState } from "react";
import { colors } from "../../../../common/utils/color-utils";

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
          style.textCenter,
          {
            position: "absolute",
            top: "50%",
            left: 0,
            width,
            color: colors.white,
            fontSize: 70,
            textShadowColor: colors.black,
            textShadowRadius: 5,
            textShadowOffset: { width: 0, height: 2 },
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
              { translateY: "-50%" },
            ],
          },
        ]}
      >
        READY?
      </Animated.Text>
      <Animated.Text
        style={[
          style.textBold,
          style.textCenter,
          {
            position: "absolute",
            top: "50%",
            left: 0,
            width,
            opacity: animValueGo,
            color: colors.white,
            fontSize: 70,
            textShadowColor: colors.black,
            textShadowRadius: 5,
            textShadowOffset: { width: 0, height: 2 },
            transform: [
              {
                scale: animValueGo.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 2],
                }),
              },
              { translateY: "-50%" },
            ],
          },
        ]}
      >
        GO!!!
      </Animated.Text>
    </>
  );
}
