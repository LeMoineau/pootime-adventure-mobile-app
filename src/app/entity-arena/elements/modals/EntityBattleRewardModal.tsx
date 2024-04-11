import { ModalProps, Text } from "react-native";
import RewardModal from "../../../../common/components/modals/primitives/RewardModal";
import { BattleReward } from "../../../../common/types/battle/online-battle/BattleReward";
import { style } from "../../../../common/utils/style-utils";
import {
  Entity,
  EntityBattleWinner,
} from "../../../../common/types/battle/entity-battle/EntityBattleTypes";
import { colors } from "../../../../common/utils/color-utils";

export default function EntityBattleRewardModal({
  entity,
  winner,
  rewards,
  onCollectingRewards,
  ...props
}: {
  entity?: Entity;
  winner?: EntityBattleWinner;
  rewards: BattleReward;
  onCollectingRewards?: (rewards: BattleReward) => void;
} & ModalProps) {
  return (
    <RewardModal
      {...props}
      rewards={rewards}
      onCollectingRewards={onCollectingRewards}
    >
      <Text
        style={[
          style.textMd,
          {
            marginBottom: 0,
            color: winner === "player" ? colors.green[500] : colors.red[500],
          },
        ]}
      >
        {winner === "player" ? "Hourra 🙌 !" : "Mince !"}
      </Text>
      <Text style={[]}>
        {winner === "player"
          ? `Vous avez battu ${entity?.name} !`
          : `${entity?.name} vous a terminé..!`}
      </Text>
    </RewardModal>
  );
}
