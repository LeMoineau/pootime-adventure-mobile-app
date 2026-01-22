import { Animated, Easing, Text, View } from "react-native";
import useTimer from "../../../../../hooks/common/use-timer";
import TabTitle from "../../TabTitle";
import useAnimatedValue from "../../../../../hooks/common/ui/use-animated-value";
import { style } from "../../../../../constants/style/styles";
import { useEffect } from "react";
import { colors } from "../../../../../constants/style/colors";
import CustomConfirmModal from "../../../../common/modals/primitives/CustomConfirmModal";

export default function ToiletTimer({
  isPlaying,
  alreadyElapsedTime,
  wantToStop,
  onCancelStoping,
  onConfirmStoping,
}: {
  isPlaying: boolean;
  alreadyElapsedTime?: number;
  wantToStop: boolean;
  onCancelStoping: () => void;
  onConfirmStoping?: (elapsedTime: number) => void;
}) {
  const { timeToString, elapsedTime, reset } = useTimer({
    isPlaying,
    startAt: alreadyElapsedTime ?? undefined,
  });
  const { animValue, setEnabled } = useAnimatedValue({
    duration: alreadyElapsedTime ? 60000 - alreadyElapsedTime : 60000,
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
              minHeight: 10,
              marginTop: 10,
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
                  outputRange: [
                    alreadyElapsedTime
                      ? `${-1 * (100 - (alreadyElapsedTime / 60000) * 100)}%`
                      : "-100%",
                    "0%",
                  ],
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
      <CustomConfirmModal
        visible={wantToStop}
        desc={`Avez-vous fini de "faire vos affaires" ? (En dessous de 1 minute, vous ne récupérez aucune récompense)`}
        onConfirmBtnPress={() => {
          onConfirmStoping &&
            onConfirmStoping(
              elapsedTime +
                (alreadyElapsedTime ? alreadyElapsedTime / 1000 : 0),
            );
          reset();
          animValue.setValue(0);
        }}
        containerStyle={{ gap: 20 }}
        onRequestClose={() => onCancelStoping && onCancelStoping()}
      ></CustomConfirmModal>
    </>
  );
}
