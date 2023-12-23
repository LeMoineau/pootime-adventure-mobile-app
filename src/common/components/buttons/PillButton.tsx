import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { style } from "../../utils/style-utils";

export default function PillButton({
  children,
  stylePressable,
  styleView,
  ...props
}: {
  children?: React.ReactNode;
  stylePressable?: StyleProp<ViewStyle>;
  styleView?: StyleProp<ViewStyle>;
} & PressableProps) {
  return (
    <Pressable style={[stylePressable]} {...props}>
      <View style={[style.roundedFull, style.border, styleView]}>
        {children}
      </View>
    </Pressable>
  );
}
