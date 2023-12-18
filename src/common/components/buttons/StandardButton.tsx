import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";

export default function StandardButton({
  children,
  textColor,
  bgColor,
  onClick,
  ...props
}: {
  children: string | React.ReactNode;
  textColor?: string;
  bgColor?: string;
  onClick?: () => void;
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
        ]}
      >
        <Text style={[style.textMd, { color: textColor ?? colors.black }]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}
