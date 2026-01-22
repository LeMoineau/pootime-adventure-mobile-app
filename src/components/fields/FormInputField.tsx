import { Pressable, Text, View } from "react-native";
import InputField from "./InputField";
import { colors } from "../../utils/color-utils";
import { style } from "../../utils/style-utils";
import ExpoIcon from "../icons/ExpoIcon";
import { useState } from "react";

export default function FormInputField({
  label,
  errorText,
  textContentType,
  secureTextEntry,
  placeholder,
  showVisibilityBtn,
  onBlur,
  onChange,
}: {
  label?: string;
  errorText?: string;
  textContentType?: "emailAddress" | "password" | "none" | "username";
  secureTextEntry?: boolean;
  placeholder?: string;
  showVisibilityBtn?: boolean;
  onBlur?: (val: string) => void;
  onChange?: (val: string) => void;
}) {
  const [showHiddenVisible, setShowHiddenVisible] = useState(false);

  const isInError = () => {
    return errorText && errorText.length > 0;
  };

  return (
    <>
      <View style={[{ gap: 5 }]}>
        {label && <Text style={[{ fontWeight: "600" }]}>{label}</Text>}
        <InputField
          style={[{ flex: 0 }]}
          textInputStyle={[
            {
              backgroundColor: isInError() ? colors.red[50] : colors.gray[50],
              borderRadius: 5,
              borderColor: isInError() ? colors.red[300] : colors.gray[400],
              fontWeight: "400",
              fontSize: 15,
              paddingRight: showVisibilityBtn && secureTextEntry ? 40 : 10,
            },
          ]}
          paddingVertical={10}
          paddingHorizontal={15}
          textContentType={textContentType}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showHiddenVisible}
          onBlur={(val) => {
            typeof val === "string" && onBlur && onBlur(val);
          }}
          onChange={(val) => {
            onChange && onChange(val);
          }}
          appendIcon={
            showVisibilityBtn &&
            secureTextEntry && (
              <Pressable
                onPress={() => {
                  setShowHiddenVisible(!showHiddenVisible);
                }}
                style={[
                  style.hFull,
                  style.flexCol,
                  style.itemsCenter,
                  style.justifyCenter,
                  style.wFull,
                ]}
              >
                <ExpoIcon
                  name={showHiddenVisible ? "visibility-off" : "visibility"}
                  size={20}
                ></ExpoIcon>
              </Pressable>
            )
          }
        ></InputField>
        {isInError() && (
          <Text style={[{ color: colors.error }]}>{errorText}</Text>
        )}
      </View>
    </>
  );
}
