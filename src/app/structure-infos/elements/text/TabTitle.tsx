import { Text } from "react-native";

export default function TabTitle({ children }: { children?: string }) {
  return (
    <Text style={[{ fontSize: 15, fontWeight: "500", letterSpacing: 0.5 }]}>
      {children}
    </Text>
  );
}
