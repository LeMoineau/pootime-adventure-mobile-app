import { ModalProps, Text } from "react-native";
import RewardModal from "./RewardModal";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";

export default function BattleFinishRewardModal({
  starEarn,
  pooCoinEarn,
  winner,
  ...props
}: { starEarn: number; pooCoinEarn: number; winner?: boolean } & ModalProps) {
  return (
    <RewardModal starEarn={starEarn} pooCoinEarn={pooCoinEarn} {...props}>
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
