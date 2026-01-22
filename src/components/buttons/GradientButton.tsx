import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  Pressable,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { colors as colorsUtils } from "../../utils/color-utils";
import { style } from "../../utils/style-utils";
import { useEffect, useRef, useState } from "react";
import useAnimatedValue from "../../common/hooks/ui/use-animated-value";

export default function GradientButton({
  children,
  viewStyle,
  colors,
  onClick,
}: {
  children?: React.ReactNode;
  viewStyle?: StyleProp<ViewStyle>;
  colors?: string[];
  onClick?: () => void;
}) {
  const { animValue, setEnabled } = useAnimatedValue({ duration: 50 });

  return (
    <>
      <Animated.View
        style={[
          style.border,
          style.roundedSm,
          style.overflowHidden,
          {
            height: 70,
            flex: 1,
            borderColor: colors ? colors[0] : colorsUtils.gray[200],
            transform: [
              {
                scale: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.95],
                }),
              },
            ],
          },
          viewStyle,
        ]}
      >
        <Pressable
          onPress={() => {
            onClick && onClick();
            setEnabled(false);
          }}
          onTouchEnd={() => setEnabled(false)}
          onTouchStart={() => setEnabled(true)}
          style={[
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            { flex: 1 },
          ]}
        >
          <LinearGradient
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              },
            ]}
            colors={colors ?? [colorsUtils.gray[200], colorsUtils.white]}
          ></LinearGradient>
          {children}
        </Pressable>
      </Animated.View>
    </>
  );
}
