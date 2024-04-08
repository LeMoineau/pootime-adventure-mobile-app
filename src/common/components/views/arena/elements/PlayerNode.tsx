import { Animated, View } from "react-native";
import PooCreature from "../../../misc/poo-creature/PooCreature";
import React, { useEffect } from "react";
import NodeShadow from "./NodeShadow";

export default function PlayerNode({
  playerNode,
  animValue,
  shadowColor,
}: {
  playerNode?: React.ReactNode;
  animValue: Animated.Value;
  shadowColor?: string;
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
      <View style={[{ transform: [{ translateY: 110 }] }]}>
        <NodeShadow shadowColor={shadowColor}></NodeShadow>
      </View>
    </Animated.View>
  );
}
