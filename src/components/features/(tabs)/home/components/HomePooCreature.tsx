import { Animated, Pressable, Text, useWindowDimensions } from "react-native";
import { usePooCreatureStyleStore } from "../../../../../stores/poo-creature-style.store";
import { style } from "../../../../../utils/style-utils";
import useAnimatedValue from "../../../../../hooks/ui/use-animated-value";
import PooCreature from "../../../../common/misc/poo-creature/PooCreature";
import LevelProgressBar from "../../../../common/fields/LevelProgressBar";

export default function HomePooCreature() {
  const { height } = useWindowDimensions();
  const { name } = usePooCreatureStyleStore();
  const { animValue, setEnabled } = useAnimatedValue({});

  return (
    <>
      <Pressable
        onTouchStart={() => setEnabled(true)}
        onTouchEnd={() => setEnabled(false)}
      >
        <Animated.View
          style={[
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            {
              transform: [
                {
                  scale: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.95],
                  }),
                },
              ],
            },
          ]}
        >
          <PooCreature height={height * 0.35}></PooCreature>
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
      </Pressable>
    </>
  );
}
