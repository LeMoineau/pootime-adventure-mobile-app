import { Text, View } from "react-native";

export default function PlainButton({ children }: { children?: string }) {
  return (
    <>
      <View>
        <Text>{children}</Text>
      </View>
    </>
  );
}
