import { Animated, View } from "react-native";
import { colors } from "../../../../utils/color-utils";
import NodeShadow from "./NodeShadow";

export default function AdvNode({
  advNode,
  animValue,
  shadowColor,
}: {
  advNode: React.ReactNode;
  animValue: Animated.Value;
  shadowColor?: string;
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
      <View style={[{ zIndex: 1 }]}>{advNode}</View>
      <NodeShadow shadowColor={shadowColor}></NodeShadow>
    </Animated.View>
  );
}
