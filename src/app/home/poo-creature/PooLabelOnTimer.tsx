import { Animated, Text } from "react-native";
import { style } from "../../../common/utils/style-utils";
import TimerField from "../../../common/components/fields/TimerField";
import { useState } from "react";
import { useResourcesStore } from "../../../common/stores/resources.store";
import PooingRewardModal from "../../../common/components/modals/PooingRewardModal";
import { CurveUtils } from "../../../common/utils/curve-utils";

export default function PooLabelOnTimer({
  scaleValue,
  isPooing,
  stopPooing,
}: {
  scaleValue: Animated.Value;
  isPooing: boolean;
  stopPooing?: (elapsedTime: number) => void;
}) {
  const { earn } = useResourcesStore();

  const [showRewardModal, toggleShowRewardModal] = useState(false);
  const [rewards, setRewards] = useState<
    | {
        star: number;
        pooCoins: number;
      }
    | undefined
  >(undefined);

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
            marginTop: 15,
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
            setRewards(CurveUtils.calculateRewardsPooing(t));
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
      {rewards && (
        <PooingRewardModal
          visible={showRewardModal}
          starEarn={rewards.star}
          pooCoinEarn={rewards.pooCoins}
          onRequestClose={async () => {
            await earn("stars", rewards.star);
            await earn("pooCoins", rewards.pooCoins);
            toggleShowRewardModal(false);
          }}
        ></PooingRewardModal>
      )}
    </>
  );
}
