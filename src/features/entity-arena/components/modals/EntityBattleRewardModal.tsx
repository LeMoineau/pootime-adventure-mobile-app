import { ModalProps, Text } from "react-native";
import RewardModal from "../../../../common/components/modals/primitives/RewardModal";
import { BattleReward } from "../../../../common/types/battle/online-battle/BattleReward";
import { style } from "../../../../common/utils/style-utils";
import {
  Entity,
  EntityBattleWinner,
} from "../../../../common/types/battle/entity-battle/EntityBattleTypes";
import { colors } from "../../../../common/utils/color-utils";
import CustomModal from "../../../../common/components/modals/primitives/CustomModal";

export default function EntityBattleRewardModal({
  visible,
  entity,
  winner,
  rewards,
  onCollectingRewards,
  onRequestClose,
}: {
  visible: boolean;
  entity?: Entity;
  winner?: EntityBattleWinner;
  rewards: BattleReward;
  onCollectingRewards?: (rewards: BattleReward) => void;
  onRequestClose?: () => void;
}) {
  return (
    <CustomModal
      visible={visible}
      title="Mince !"
      desc="Vous avez perdu contre blabla"
      mainColor={colors.red[400]}
      actionsBtns={[
        { text: "Quitter", color: colors.gray[400] },
        { text: "Repartir !" },
      ]}
      onRequestClose={() => onRequestClose && onRequestClose()}
    ></CustomModal>
    // <RewardModal
    //   {...props}
    //   rewards={rewards}
    //   onCollectingRewards={onCollectingRewards}
    // >
    //   <Text
    //     style={[
    //       style.textMd,
    //       {
    //         marginBottom: 0,
    //         color: winner === "player" ? colors.green[500] : colors.red[500],
    //       },
    //     ]}
    //   >
    //     {winner === "player" ? "Hourra 🙌 !" : "Mince !"}
    //   </Text>
    //   <Text style={[]}>
    //     {winner === "player"
    //       ? `Vous avez battu ${entity?.name} !`
    //       : `${entity?.name} vous a terminé..!`}
    //   </Text>
    // </RewardModal>
  );
}
