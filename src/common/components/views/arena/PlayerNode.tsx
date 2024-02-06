import { Animated } from "react-native";
import PooCreature from "../../misc/PooCreature";
import React, { useEffect } from "react";

export default function PlayerNode({
  playerNode,
  animValue,
}: {
  playerNode?: React.ReactNode;
  animValue: Animated.Value;
}) {
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: "50%",
          left: 30,
          marginTop: 20,
          transform: [
            {
              translateX: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 10],
              }),
            },
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              }),
            },
          ],
        },
      ]}
    >
      {playerNode ?? <PooCreature behind width={230}></PooCreature>}
    </Animated.View>
  );
}
