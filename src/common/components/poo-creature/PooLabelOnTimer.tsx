import { Animated, Text } from "react-native";
import { style } from "../../utils/style-utils";
import TimerField from "../fields/TimerField";
import RewardModal from "../modals/RewardModal";
import { useState } from "react";
import usePooCurve from "../../hooks/use-poo-curve";
import { useResourcesStore } from "../../stores/resources.store";
import { useShallow } from "zustand/react/shallow";

export default function PooLabelOnTimer({
  scaleValue,
  isPooing,
  stopPooing,
}: {
  scaleValue: Animated.Value;
  isPooing: boolean;
  stopPooing?: (elapsedTime: number) => void;
}) {
  const [showRewardModal, toggleShowRewardModal] = useState(false);
  const [elapsedTimePooing, setElapsedTimePooing] = useState(0);
  const { starEarn, pooCoinEarn } = usePooCurve({
    elapsedTime: elapsedTimePooing,
  });
  const { earnStar, earnPooCoin } = useResourcesStore();

  return (
    <>
      <Animated.View
        style={[
          style.wFull,
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          style.shadowMd,
          {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: scaleValue,
            backgroundColor: "white",
            borderRadius: 100,
            marginTop: 25,
            paddingVertical: 10,
          },
        ]}
      >
        <Text
          style={[
            style.textSm,
            style.overflowHidden,
            {
              textAlign: "center",
              color: "orange",
            },
          ]}
        >
          Currently Pooing...
        </Text>
        <TimerField
          style={[
            style.text2Xl,
            style.overflowHidden,
            {
              textAlign: "center",
            },
          ]}
          isPlaying={isPooing}
          onStop={(t) => {
            stopPooing && stopPooing(t);
            setElapsedTimePooing(60 * 60);
            toggleShowRewardModal(true);
          }}
        ></TimerField>
        <Text
          style={[
            style.textSm,
            style.overflowHidden,
            {
              textAlign: "center",
              color: "grey",
            },
          ]}
        >
          Tap to stop and earn your rewards
        </Text>
      </Animated.View>
      <RewardModal
        visible={showRewardModal}
        starEarn={starEarn}
        pooCoinEarn={pooCoinEarn}
        onRequestClose={() => {
          earnStar(starEarn);
          earnPooCoin(pooCoinEarn);
          toggleShowRewardModal(false);
        }}
      ></RewardModal>
    </>
  );
}
