import { Text } from "react-native";
import InputField from "./InputField";
import { colors } from "../../utils/color-utils";

export default function FormInputField({
  label,
  errorText,
  textContentType,
  secureTextEntry,
  onBlur,
  onChange,
}: {
  label?: string;
  errorText?: string;
  textContentType?: "emailAddress" | "password" | "none" | "username";
  secureTextEntry?: boolean;
  onBlur?: (val: string) => void;
  onChange?: (val: string) => void;
}) {
  const isInError = () => {
    return errorText && errorText.length > 0;
  };

  return (
    <>
      {label && (
        <Text style={[{ paddingBottom: 5, paddingLeft: 10 }]}>{label}</Text>
      )}
      <InputField
        style={[{ flex: 1 }]}
        textInputStyle={[
          { backgroundColor: isInError() ? colors.red[100] : colors.white },
        ]}
        paddingVertical={10}
        paddingHorizontal={25}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        onBlur={(val) => {
          onBlur && onBlur(val);
        }}
        onChange={(val) => {
          onChange && onChange(val);
        }}
      ></InputField>
      {isInError() && (
        <Text style={[{ paddingTop: 5, paddingLeft: 10, color: colors.error }]}>
          {errorText}
        </Text>
      )}
    </>
  );
}
