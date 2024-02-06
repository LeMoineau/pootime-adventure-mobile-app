import { Text, View } from "react-native";
import StandardButton from "../../../common/components/buttons/StandardButton";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import ConfirmModal from "../../../common/components/modals/primitives/ConfirmModal";
import useModals from "../../../common/hooks/use-modals";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { colors } from "../../../common/utils/color-utils";
import { style } from "../../../common/utils/style-utils";
import ResourceIcon from "../../../common/components/icons/ResourceIcon";
import { usePooCreatureStatsStore } from "../../../common/stores/poo-creature-stats.store";

export default function ResetStatsButton() {
  const { earn } = useResourcesStore();
  const { isVisible, show, hide } = useModals<"confirm">();
  const { calculateAllStarsSpent, resetData } = usePooCreatureStatsStore();
  return (
    <>
      <StandardButton
        style={[{ marginTop: 10 }]}
        viewStyle={[style.roundedFull, {}]}
        textStyle={[]}
        bgColor={colors.orange[400]}
        textColor={colors.white}
        onPress={() => {
          show("confirm");
        }}
      >
        <ExpoIcon name="exchange" size={20}></ExpoIcon> Reset stats
      </StandardButton>
      <ConfirmModal
        visible={isVisible("confirm")}
        onRequestClose={() => hide("confirm")}
        onConfirm={async () => {
          await earn("stars", calculateAllStarsSpent());
          await resetData();
        }}
      >
        <View
          style={[
            style.flexRow,
            style.flexWrap,
            style.justifyCenter,
            style.itemsCenter,
            style.wFull,
          ]}
        >
          <Text>Are you sure to reset all your statistics ?</Text>
          <Text>(You will earn {calculateAllStarsSpent()} </Text>
          <ResourceIcon size={20} resource="stars"></ResourceIcon>
          <Text>)</Text>
        </View>
      </ConfirmModal>
    </>
  );
}
