import { ModalProps, Text } from "react-native";
import RewardModal from "./primitives/RewardModal";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";
import { usePooCreatureStyleStore } from "../../stores/poo-creature-style.store";

export default function PooingRewardModal({
  starEarn,
  pooCoinEarn,
  ...props
}: { starEarn: number; pooCoinEarn: number } & ModalProps) {
  const { name } = usePooCreatureStyleStore();
  return (
    <RewardModal starEarn={starEarn} pooCoinEarn={pooCoinEarn} {...props}>
      <Text
        style={[
          style.textXl,
          style.textBold,
          { marginTop: 10, marginBottom: 20, color: colors.violet[500] },
        ]}
      >
        Congratulation 🎉
      </Text>
      <Text style={[style.textSm, style.textCenter]}>
        Vous avez posé une belle pêche !
      </Text>
      <Text style={[style.textSm, style.textCenter]}>
        Voici ce que <Text style={[style.textBold]}>{name}</Text> a trouvé
        pendant ce temps là !
      </Text>
    </RewardModal>
  );
}
