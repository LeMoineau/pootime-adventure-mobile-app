import { ModalProps, Text } from "react-native";
import RewardModal from "../../../common/components/modals/primitives/RewardModal";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import { BattleReward } from "../../../common/types/online-arena/BattleReward";

export default function BattleFinishRewardModal({
  winner,
  rewards,
  ...props
}: { winner?: boolean; rewards: BattleReward } & ModalProps) {
  return (
    <RewardModal rewards={rewards} {...props}>
      <Text
        style={[
          style.textLg,
          style.textBold,
          style.textCenter,
          {
            marginTop: 10,
            marginBottom: 20,
            color: winner ? colors.green[500] : colors.red[500],
          },
        ]}
      >
        {winner
          ? "You'rrrre the WINNER ! 🎊"
          : "Oups.. Vous avez glissé chef!.. 🥀"}
      </Text>
      <Text style={[style.textSm, style.textCenter]}>
        {winner
          ? "Bravo ! Voici la récompense de votre incroyable réussite !"
          : "Pour vous consoler, voici un maigre lot mais n'abandonnez pas, la prochaine sera la bonne !"}
      </Text>
    </RewardModal>
  );
}
