import { StyleProp, Text, TextStyle } from "react-native";

export default function TabText({
  children,
  style,
}: {
  children?: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text style={[{ fontSize: 12, marginBottom: 10 }, style]}>{children}</Text>
  );
}
