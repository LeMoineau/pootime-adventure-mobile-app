import {
  Animated,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import PooCreature from "../../../common/components/misc/poo-creature/PooCreature";
import { style } from "../../../common/utils/style-utils";
import { useEffect, useState } from "react";
import ClockCircularProgress from "../../../common/components/fields/ClockCircularProgress";
import PooLabelOnTimer from "./PooLabelOnTimer";
import PooLabelOnIdle from "./PooLabelOnIdle";
import PooingConfirmModal from "../../../common/components/modals/pooing/PooingConfirmModal";
import useModals from "../../../common/hooks/use-modals";

export default function PooCreatureHandler() {
  const { height } = useWindowDimensions();
  const [isPlaying, setIsPlaying] = useState(false);
  const scaleValue = new Animated.Value(0);

  const { isVisible, show, hide } = useModals<"confirm-stop-pooing">();

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
        onPress={() => {
          if (isPlaying) {
            show("confirm-stop-pooing");
          } else {
            setIsPlaying(true);
          }
        }}
        onLongPress={() => {}}
      >
        <View
          style={[
            style.wFull,
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
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
            <PooCreature height={height * 0.35}></PooCreature>
          </Animated.View>
          <Animated.View
            style={[
              style.wFull,
              style.flexCol,
              style.justifyCenter,
              style.itemsCenter,
              style.wFull,
              {
                position: "absolute",
                top: 0,
                left: 0,
                height: height * 0.35,

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
              size={height * 0.35}
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

      <PooingConfirmModal
        visible={isVisible("confirm-stop-pooing")}
        onConfirm={() => setIsPlaying(false)}
        onRequestClose={() => hide("confirm-stop-pooing")}
      ></PooingConfirmModal>
    </>
  );
}
