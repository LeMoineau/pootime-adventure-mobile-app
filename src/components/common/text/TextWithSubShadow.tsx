import { StyleProp, Text, TextStyle } from "react-native";
import { style as styleUtils } from "../../../constants/style/styles";
import { colors } from "../../../constants/style/colors";
import React from "react";

export default function TextWithSubShadow({
  style,
  children,
}: {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}) {
  return (
    <Text
      style={[
        styleUtils.textLg,
        styleUtils.textBold,
        {
          color: colors.white,
          textShadowColor: colors.black,
          textShadowRadius: 3,
          textShadowOffset: { width: 0, height: 1 },
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
