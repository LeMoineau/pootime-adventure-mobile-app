import React from "react";
import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { style } from "../../../constants/style/styles";
import { colors } from "../../../constants/style/colors";
import useAnimatedValue from "../../../hooks/common/ui/use-animated-value";

export default function StandardButton({
  children,
  textColor,
  bgColor,
  borderColor,
  viewStyle,
  textStyle,
  prependIcon,
  appendIcon,
  disablePressingAnimation,
  ...props
}: {
  children?: string | React.ReactNode;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  disablePressingAnimation?: boolean;
} & PressableProps) {
  const { animValue, setEnabled } = useAnimatedValue({ duration: 50 });

  return (
    <Pressable
      {...props}
      onPress={(evt) => {
        props.onPress && props.onPress(evt);
        !disablePressingAnimation && setEnabled(false);
      }}
      onTouchStart={(evt) => {
        props.onTouchStart && props.onTouchStart(evt);
        !disablePressingAnimation && setEnabled(true);
      }}
      onTouchEnd={(evt) => {
        props.onTouchEnd && props.onTouchEnd(evt);
        !disablePressingAnimation && setEnabled(false);
      }}
    >
      <Animated.View
        style={[
          style.shadowMd,
          style.rounded,
          style.flexRow,
          style.justifyBetween,
          style.itemsCenter,
          {
            paddingHorizontal: 30,
            paddingVertical: 20,
            backgroundColor: bgColor ?? colors.white,
          },
          borderColor ? [style.border, { borderColor }] : {},
          viewStyle,
          {
            transform: [
              {
                scale: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.95],
                }),
              },
            ],
          },
        ]}
      >
        {prependIcon}
        {children && typeof children === "string" ? (
          <Text
            style={[
              style.textMd,
              style.textCenter,
              { color: textColor ?? colors.black, flex: 1 },
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          <>{children}</>
        )}
        {appendIcon}
      </Animated.View>
    </Pressable>
  );
}
