import { colors } from "../../../../constants/style/colors";
import { BattleReward } from "../../../../types/battle/BattleReward";
import CustomModal from "../../../common/modals/primitives/CustomModal";
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
  const title = winner ? "Gagner ! 🎊" : "Perdu... 🥀";
  const desc = winner
    ? "Bravo ! Voici la récompense de votre incroyable réussite !"
    : "Pour vous consoler, voici un maigre lot mais n'abandonnez pas, la prochaine sera la bonne !";
  const bgColor = winner ? colors.green[400] : colors.red[400];

  return rewards.length > 0 ? (
    <CustomRewardModal
      visible={visible}
      title={title}
      desc={desc}
      mainColor={bgColor}
      rewards={rewards}
      onPressEarnBtn={onPressEarnBtn}
    ></CustomRewardModal>
  ) : (
    <CustomModal
      visible={visible}
      title={title}
      desc={
        !winner
          ? "Vous ne pouvez plus tomber plus bas... Mais vous ne pouvez donc que remonter !"
          : desc
      }
      closeWhenPressingTransparentOverlay
      mainColor={bgColor}
      onRequestClose={onPressEarnBtn}
    ></CustomModal>
  );
}
