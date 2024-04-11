import { Text } from "react-native";

export default function TabText({ children }: { children?: string }) {
  return <Text style={[{ fontSize: 12, marginBottom: 10 }]}>{children}</Text>;
}
