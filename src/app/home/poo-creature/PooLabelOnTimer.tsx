import { Animated, Text } from "react-native";
import { style } from "../../../common/utils/style-utils";
import TimerField from "../../../common/components/fields/TimerField";
import RewardModal from "../../../common/components/modals/RewardModal";
import { useState } from "react";
import usePooCurve from "../../../common/hooks/use-poo-curve";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { useShallow } from "zustand/react/shallow";
import useStorage from "../../../common/hooks/use-storage";
import { StorageKeys } from "../../../common/utils/storage-keys";

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
            opacity: scaleValue,
            backgroundColor: "white",
            borderRadius: 100,
            marginTop: 25,
            paddingVertical: 10,
            marginBottom: scaleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0],
            }),
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
            setElapsedTimePooing(t);
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
        onRequestClose={async () => {
          await earnStar(5);
          await earnPooCoin(1000);
          toggleShowRewardModal(false);
        }}
      ></RewardModal>
    </>
  );
}
