import { colors } from "../../../../constants/style/colors";
import { BattleReward } from "../../../../types/battle/BattleReward";
import CustomRewardModal from "../../../common/modals/primitives/CustomRewardModal";

export default function BattleFinishRewardModal({
  visible,
  winner,
  rewards,
  onPressEarnBtn,
}: {
  visible: boolean;
  winner?: boolean;
  rewards: BattleReward;
  onPressEarnBtn?: () => void;
}) {
  return (
    <CustomRewardModal
      visible={visible}
      title={winner ? "Gagner ! 🎊" : "Perdu... 🥀"}
      desc={
        winner
          ? "Bravo ! Voici la récompense de votre incroyable réussite !"
          : "Pour vous consoler, voici un maigre lot mais n'abandonnez pas, la prochaine sera la bonne !"
      }
      mainColor={winner ? colors.green[400] : colors.red[400]}
      rewards={rewards}
      onPressEarnBtn={onPressEarnBtn}
    ></CustomRewardModal>
  );
}
