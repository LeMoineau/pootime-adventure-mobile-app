import {
  Animated,
  Easing,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import useTimer from "../../../../../common/hooks/use-timer";
import TabTitle from "../../text/TabTitle";
import useAnimatedValue from "../../../../../common/hooks/use-animated-value";
import { style } from "../../../../../common/utils/style-utils";
import { useEffect } from "react";
import { colors } from "../../../../../common/utils/color-utils";
import ConfirmModal from "../../../../../common/components/modals/primitives/ConfirmModal";
import useModals from "../../../../../common/hooks/use-modals";

export default function ToiletTimer({
  isPlaying,
  wantToStop,
  onCancelStoping,
  onConfirmStoping,
}: {
  isPlaying: boolean;
  wantToStop: boolean;
  onCancelStoping: () => void;
  onConfirmStoping?: (elapsedTime: number) => void;
}) {
  const { timeToString, elapsedTime, reset } = useTimer({ isPlaying });
  const { animValue, setEnabled } = useAnimatedValue({
    duration: 60000,
    easing: Easing.linear,
  });

  useEffect(() => {
    setEnabled(isPlaying);
  }, [isPlaying]);

  return (
    <>
      <View
        style={[
          style.flexCol,
          style.justifyCenter,
          { flex: 1, alignItems: "flex-start", paddingVertical: 10 },
        ]}
      >
        <TabTitle>Timer</TabTitle>
        <Text>Temps écoulé: {timeToString()}</Text>
        <View
          style={[
            style.overflowHidden,
            style.roundedFull,
            style.border,
            {
              flex: 1,
              width: "100%",
              backgroundColor: colors.white,
              height: 10,
            },
          ]}
        >
          <Animated.View
            style={[
              style.roundedFull,
              {
                position: "absolute",
                top: 0,
                left: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["-100%", "0%"],
                }),
                backgroundColor: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [colors.gray[200], colors.green[500]],
                }),
                width: "100%",
                height: "100%",
              },
            ]}
          ></Animated.View>
        </View>
      </View>
      <ConfirmModal
        visible={wantToStop}
        onRequestClose={() => onCancelStoping && onCancelStoping()}
        onConfirm={() => {
          onConfirmStoping && onConfirmStoping(elapsedTime);
          reset();
          animValue.setValue(0);
        }}
      >
        <Text style={[style.textCenter]}>
          Have you finish pooing ? (time under 1min don't earn anything)
        </Text>
      </ConfirmModal>
    </>
  );
}