import { Text, View } from "react-native";
import StandardButton from "../../../common/components/buttons/StandardButton";
import { colors } from "../../../common/utils/color-utils";
import { style } from "../../../common/utils/style-utils";
import { VillageUtils } from "../../../common/utils/village-utils";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { useVillageStore } from "../../../common/stores/village.store";
import TextWithResourceIcon from "../../../common/components/text/TextWithResourceIcon";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import useModals from "../../../common/hooks/ui/use-modals";
import { UpgradeCost } from "../../../common/types/village/StructureCost";
import { useEffect } from "react";
import useStructure from "../../(tabs)/village/hooks/use-structure";
import CustomConfirmModal from "../../../common/components/modals/primitives/CustomConfirmModal";

export default function StructureUpgradeButton({
  onUpgrade,
}: {
  onUpgrade?: (cost: UpgradeCost) => void;
}) {
  const { selectedStructureName: structName, get } = useVillageStore();
  const { get: getResource } = useResourcesStore();
  const { isVisible, show, hide } = useModals<"confirm">();
  const { setStructName, isLevelMax, upgradable, iterateOnUpgradeCost } =
    useStructure();

  const buyable = (): boolean => {
    if (!structName) return false;
    const costs = VillageUtils.iterateOnUpgradeCostOf(
      structName,
      get(structName).level
    );
    for (let [resource, val] of costs) {
      if (getResource(resource) < val) return false;
    }
    return true;
  };

  useEffect(() => {
    setStructName(structName);
  }, [structName]);

  return (
    <>
      {isLevelMax() ? (
        <StandardButton
          style={[{ flex: 1, marginTop: 15 }]}
          bgColor={colors.green[500]}
          viewStyle={[style.roundedFull, { paddingVertical: 15 }]}
          textColor={colors.white}
          textStyle={[{ fontSize: 17, fontWeight: "500" }]}
        >
          Level MAX
        </StandardButton>
      ) : (
        <StandardButton
          style={[{ flex: 1, marginTop: 15 }]}
          bgColor={upgradable() ? colors.green[500] : colors.gray[400]}
          viewStyle={[style.roundedFull, { paddingVertical: 15 }]}
          onPress={() => upgradable() && show("confirm")}
        >
          <View
            style={[
              style.flexRow,
              style.itemsCenter,
              { flex: 1, justifyContent: "space-around" },
            ]}
          >
            <View
              style={[
                style.flexRow,
                style.justifyCenter,
                style.itemsCenter,
                { flex: 1, flexWrap: "wrap" },
              ]}
            >
              {iterateOnUpgradeCost().map(([resource, val], index) => {
                return (
                  <TextWithResourceIcon
                    key={`upgrade-cost-transfer-${resource}-${index}`}
                    resource={resource}
                    text={val}
                    textStyle={[{ color: colors.white }]}
                    style={[{ marginHorizontal: 5 }]}
                  ></TextWithResourceIcon>
                );
              })}
            </View>
            <ExpoIcon
              name="caret-right"
              size={20}
              style={[{ color: colors.white }]}
            ></ExpoIcon>
            <Text
              style={[
                style.textCenter,
                { color: colors.white, fontSize: 17, flex: 1 },
              ]}
            >
              {structName &&
                `Level ${
                  VillageUtils.getUpgradeCostOf(
                    structName,
                    get(structName).level
                  )?.toLevel
                }`}
            </Text>
          </View>
        </StandardButton>
      )}
      {structName && (
        <CustomConfirmModal
          visible={isVisible("confirm")}
          title="Améliorer"
          desc={`Êtes-vous sûr de vouloir améliorer le bâtiment "${
            VillageUtils.getStructureData(structName).name
          }" ?`}
          onRequestClose={() => hide("confirm")}
          onConfirmBtnPress={() => {
            structName &&
              onUpgrade &&
              onUpgrade(
                VillageUtils.getUpgradeCostOf(
                  structName,
                  get(structName).level
                )!
              );
          }}
        ></CustomConfirmModal>
      )}
    </>
  );
}
