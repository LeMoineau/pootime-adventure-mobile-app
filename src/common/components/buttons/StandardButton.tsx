import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import { style } from "../../services/style-utils";

export default function StandardButton({
  children,
  onClick,
  ...props
}: {
  children: string | React.ReactNode;
  onClick?: () => void;
} & PressableProps) {
  return (
    <Pressable {...props}>
      <View
        style={[
          style.shadowMd,
          {
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: "rgb(243 244 246)",
            borderRadius: 20,
          },
        ]}
      >
        <Text
          style={[
            style.textMd,
            {
              fontFamily: "arial",
            },
          ]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}
