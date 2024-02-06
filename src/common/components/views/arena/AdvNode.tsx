import { Animated, View } from "react-native";

export default function AdvNode({
  advNode,
  animValue,
}: {
  advNode: React.ReactNode;
  animValue: Animated.Value;
}) {
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: "50%",
          right: 30,
          marginBottom: 20,
          transform: [
            {
              translateX: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              }),
            },
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 10],
              }),
            },
          ],
        },
      ]}
    >
      {advNode}
    </Animated.View>
  );
}
