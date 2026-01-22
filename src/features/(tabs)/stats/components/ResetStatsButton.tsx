import { Text, View } from "react-native";
import StandardButton from "../../../../components/buttons/StandardButton";
import ExpoIcon from "../../../../components/icons/ExpoIcon";
import useModals from "../../../../hooks/ui/use-modals";
import { useResourcesStore } from "../../../../common/stores/resources.store";
import { colors } from "../../../../utils/color-utils";
import { style } from "../../../../utils/style-utils";
import ResourceIcon from "../../../../components/icons/ResourceIcon";
import { usePooCreatureStatsStore } from "../../../../common/stores/poo-creature-stats.store";
import CustomConfirmModal from "../../../../components/modals/primitives/CustomConfirmModal";

export default function ResetStatsButton() {
  const { earn } = useResourcesStore();
  const { isVisible, show, hide } = useModals<"confirm">();
  const { calculateAllStarsSpent, resetData } = usePooCreatureStatsStore();
  return (
    <>
      <StandardButton
        style={[{ width: 150, height: "100%" }]}
        viewStyle={[style.roundedFull, { paddingVertical: 0, flex: 1 }]}
        textStyle={[{ fontSize: 17 }]}
        bgColor={colors.orange[400]}
        textColor={colors.white}
        onPress={() => {
          show("confirm");
        }}
        prependIcon={
          <ExpoIcon
            name="refresh-sharp"
            style={[{ color: colors.white }]}
            size={20}
          ></ExpoIcon>
        }
      >
        Reset
      </StandardButton>
      <CustomConfirmModal
        title="Réinitialiser ses stats"
        visible={isVisible("confirm")}
        onRequestClose={() => hide("confirm")}
        containerStyle={{ gap: 20 }}
        onConfirmBtnPress={() => {
          earn("stars", calculateAllStarsSpent());
          resetData();
        }}
      >
        <Text
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          Êtes-vous sûr de vouloir réinitialiser vos stats ? ( Vous allez
          récupérer {calculateAllStarsSpent()}{" "}
          <ResourceIcon size={12} resource="stars"></ResourceIcon> )
        </Text>
      </CustomConfirmModal>
    </>
  );
}
