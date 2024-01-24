import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";

export default function StandardButton({
  children,
  textColor,
  bgColor,
  viewStyle,
  textStyle,
  ...props
}: {
  children: string | React.ReactNode;
  textColor?: string;
  bgColor?: string;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & PressableProps) {
  return (
    <Pressable {...props}>
      <View
        style={[
          style.shadowMd,
          style.rounded,
          style.border,
          {
            paddingHorizontal: 30,
            paddingVertical: 15,
            backgroundColor: bgColor ?? colors.gray[100],
          },
          viewStyle,
        ]}
      >
        <Text
          style={[
            style.textMd,
            { color: textColor ?? colors.black },
            textStyle,
          ]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}
