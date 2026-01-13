import { ModalProps, Text } from "react-native";
import { usePooCreatureStyleStore } from "../../../../../common/stores/poo-creature-style.store";
import RewardModal from "../../../../../common/components/modals/primitives/RewardModal";
import { style } from "../../../../../common/utils/style-utils";
import { colors } from "../../../../../common/utils/color-utils";
import { BattleReward } from "../../../../../common/types/battle/BattleReward";

export default function PooingRewardModal({
  rewards,
  onCollectingRewards,
  ...props
}: {
  rewards: BattleReward;
  onCollectingRewards: (rewards: BattleReward) => void;
} & ModalProps) {
  const { name } = usePooCreatureStyleStore();

  const emptyReward = () => {
    for (let r of rewards) {
      if (r.number > 0) return false;
    }
    return true;
  };

  return (
    <RewardModal
      rewards={rewards}
      onCollectingRewards={onCollectingRewards}
      {...props}
    >
      <Text
        style={[
          style.textXl,
          style.textBold,
          {
            marginTop: 10,
            marginBottom: 20,
            color: emptyReward() ? colors.red[400] : colors.green[500],
          },
        ]}
      >
        {emptyReward() ? "Mince..." : "Congratulation 🎉"}
      </Text>
      {emptyReward() ? (
        <Text style={[style.textCenter]}>
          Il semblerait que vous ne soyez pas resté assez longtemps aux
          toilettes... 👀
        </Text>
      ) : (
        <>
          <Text style={[style.textSm, style.textCenter]}>
            Vous avez posé une belle pêche !
          </Text>
          <Text style={[style.textSm, style.textCenter]}>
            Voici ce que <Text style={[style.textBold]}>{name}</Text> a trouvé
            pendant ce temps là !
          </Text>
        </>
      )}
    </RewardModal>
  );
}
