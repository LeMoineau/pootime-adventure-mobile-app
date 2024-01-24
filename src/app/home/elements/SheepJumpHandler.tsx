import { View } from "react-native";
import StandardButton from "../../../common/components/buttons/StandardButton";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import useSheepJumpStore from "../../../common/stores/sheep-jump.store";
import SheepJumpModal from "../../../common/components/modals/SheepJumpModal";
import { usePooCreatureStatsStore } from "../../../common/stores/poo-creature-stats.store";

export default function SheepJumpHandler() {
  const { sheep, showSheepJumpModal, startSheepJump } = useSheepJumpStore();
  const playerStats = usePooCreatureStatsStore();

  return (
    <View style={[style.wFull]}>
      <StandardButton
        onPress={() => startSheepJump(playerStats)}
        style={[style.wFull, { marginTop: 15 }]}
        viewStyle={[
          { borderColor: colors.pink[300], backgroundColor: colors.pink[200] },
        ]}
        textStyle={[
          style.textXl,
          style.textBold,
          style.textCenter,
          { color: colors.white },
        ]}
      >
        Saute-Mouton
      </StandardButton>
      <SheepJumpModal visible={showSheepJumpModal}></SheepJumpModal>
    </View>
  );
}
