import {
  Animated,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import PooCreature from "../../../common/components/misc/PooCreature";
import SmileExpression from "../../../common/components/icons/expressions/SmileExpression";
import { style } from "../../../common/utils/style-utils";
import { useEffect, useState } from "react";
import ClockCircularProgress from "../../../common/components/fields/ClockCircularProgress";
import PooLabelOnTimer from "./PooLabelOnTimer";
import PooLabelOnIdle from "./PooLabelOnIdle";
import { usePooCreatureStore } from "../../../common/stores/poo-creature.store";
import { DefaultValues } from "../../../common/types/defaultValues";

export default function PooCreatureButton() {
  const { width } = useWindowDimensions();
  const [isPlaying, setIsPlaying] = useState(false);
  const scaleValue = new Animated.Value(0);
  const { bodyColor, expression } = usePooCreatureStore();

  const showTimerAnim = Animated.spring(scaleValue, {
    toValue: 1,
    useNativeDriver: false,
    isInteraction: false,
  });
  const hideTimerAnim = Animated.spring(scaleValue, {
    toValue: 0,
    isInteraction: false,
    useNativeDriver: false,
  });

  useEffect(() => {
    if (isPlaying) {
      showTimerAnim.start();
    } else {
      scaleValue.setValue(1);
      hideTimerAnim.start();
    }
  }, [isPlaying]);

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => setIsPlaying(!isPlaying)}
        onLongPress={() => {}}
      >
        <View
          style={[
            style.wFull,
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            { padding: 20 },
          ]}
        >
          <Animated.View
            style={{
              transform: [
                {
                  scale: scaleValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.8],
                  }),
                },
              ],
            }}
          >
            <PooCreature
              width={(width * 1.7) / 3}
              bodyColor={bodyColor}
              expression={expression}
            ></PooCreature>
          </Animated.View>
          <Animated.View
            style={[
              style.wFull,
              {
                position: "absolute",
                top: 0,
                left: 0,
                transform: [
                  {
                    scale: scaleValue,
                  },
                ],
                opacity: scaleValue,
              },
            ]}
          >
            <ClockCircularProgress
              size={width - 40}
              isPlaying={isPlaying}
            ></ClockCircularProgress>
          </Animated.View>
          <View style={[style.wFull]}>
            <PooLabelOnIdle scaleValue={scaleValue}></PooLabelOnIdle>
            <PooLabelOnTimer
              scaleValue={scaleValue}
              isPooing={isPlaying}
            ></PooLabelOnTimer>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
