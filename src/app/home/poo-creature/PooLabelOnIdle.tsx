import { Animated, Text } from "react-native";
import { style } from "../../../common/utils/style-utils";
import ProgressBar from "../../../common/components/fields/ProgressBar";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import LevelProgressBar from "../../../common/components/fields/LevelProgressBar";

export default function PooLabelOnIdle({
  scaleValue,
}: {
  scaleValue: Animated.Value;
}) {
  const { name } = usePooCreatureStyleStore();

  return (
    <>
      <Animated.View
        style={[
          style.wFull,
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: scaleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        <Text
          style={[
            style.textLg,
            style.overflowHidden,
            {
              marginTop: 5,
              marginBottom: 5,
              fontWeight: "bold",
              textAlign: "center",
              maxHeight: 40,
              maxWidth: "90%",
            },
          ]}
        >
          {name}
        </Text>
        <LevelProgressBar height={20}></LevelProgressBar>
      </Animated.View>
    </>
  );
}
