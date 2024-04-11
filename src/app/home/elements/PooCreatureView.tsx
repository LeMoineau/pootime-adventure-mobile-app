import {
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import PooCreature from "../../../common/components/misc/poo-creature/PooCreature";
import { style } from "../../../common/utils/style-utils";
import LevelProgressBar from "../../../common/components/fields/LevelProgressBar";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import useAnimatedValue from "../../../common/hooks/use-animated-value";

export default function PooCreatureView() {
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
