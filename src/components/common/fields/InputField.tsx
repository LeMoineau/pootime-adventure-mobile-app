import React, { useState } from "react";
import { StyleProp, TextInput, TextStyle, View } from "react-native";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../constants/style/colors";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export default function InputField({
  onChange,
  placeholder,
  defaultValue,
  appendIcon,
  paddingVertical,
  paddingHorizontal,
  textInputStyle,
  textContentType,
  secureTextEntry,
  onBlur,
  ...props
}: {
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  appendIcon?: React.ReactNode;
  paddingVertical?: number;
  paddingHorizontal?: number;
  textInputStyle?: StyleProp<TextStyle>;
  textContentType?: "none" | "username" | "password" | "emailAddress";
  secureTextEntry?: boolean;
  onBlur?: (value: string) => void;
} & ViewProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  return (
    <View style={{ flex: 1 }} {...props}>
      <TextInput
        style={[
          style.wFull,
          style.roundedFull,
          style.shadowMd,
          style.textMd,
          style.border,
          {
            height: paddingVertical ? "auto" : 35,
            fontWeight: "600",
            backgroundColor: colors.white,
            paddingHorizontal: paddingHorizontal ?? 15,
            paddingVertical: paddingVertical ?? 0,
          },
          textInputStyle,
        ]}
        onChangeText={(val) => {
          setValue(val);
          onChange && onChange(val);
        }}
        onEndEditing={(e) => {
          onBlur && onBlur(e.nativeEvent.text);
        }}
        placeholder={placeholder}
        value={value}
        textContentType={textContentType ?? "none"}
        secureTextEntry={secureTextEntry}
      ></TextInput>
      {appendIcon && (
        <View
          style={[
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            {
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: 35,
            },
          ]}
        >
          {appendIcon}
        </View>
      )}
    </View>
  );
}
