import { ScrollView, Text, View } from "react-native";
import { colors } from "../../../../common/utils/color-utils";
import { style } from "../../../../common/utils/style-utils";
import StandardButton from "../../../../common/components/buttons/StandardButton";
import ExpoIcon from "../../../../common/components/icons/ExpoIcon";
import { useVillageStore } from "../../../../common/stores/village.store";
import { VillageUtils } from "../../../../common/utils/village-utils";
import TextWithResourceIcon from "../../../../common/components/text/TextWithResourceIcon";
import { useResourcesStore } from "../../../../common/stores/resources.store";
import StructureUpgradeButton from "../buttons/StructureUpgradeButton";
import { Resources } from "../../../../common/config/game-data/Resources";

export default function StructureInfosUpgradeTab() {
  const { selectedStructureName: structName, get, upgrade } = useVillageStore();
  const { get: getResource, spendMany } = useResourcesStore();

  return (
    <>
      <ScrollView style={[{ padding: 10 }]}>
        <Text style={[{ fontSize: 15, fontWeight: "500", letterSpacing: 0.5 }]}>
          Upgrade
        </Text>
        <Text style={[{ fontSize: 12, marginBottom: 10 }]}>
          Resources needed for next upgrade
        </Text>

        {/* NEEDED RESOURCES */}
        <View
          style={[
            style.border,
            style.roundedSm,
            {
              padding: 10,
              backgroundColor: colors.gray[200],
              borderColor: colors.gray[300],
              marginVertical: 10,
            },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.justifyCenter,
              style.itemsCenter,
              { flexWrap: "wrap" },
            ]}
          >
            {structName &&
              VillageUtils.iterateOnUpgradeCostOf(
                structName,
                get(structName).level
              ).map(([resource, val], index) => {
                return (
                  <TextWithResourceIcon
                    key={`upgrade-cost-${resource}-${index}`}
                    resource={resource}
                    text={`${getResource(resource)}/${val} `}
                    textStyle={[
                      {
                        color:
                          getResource(resource) >= val
                            ? colors.green[500]
                            : colors.red[500],
                      },
                    ]}
                    style={[{ flex: 1, minWidth: 150, marginVertical: 5 }]}
                  ></TextWithResourceIcon>
                );
              })}
          </View>
        </View>

        {/* UPGRADE BUTTON */}
        <StructureUpgradeButton
          onUpgrade={async (upgradeCost) => {
            if (!structName) return;
            await spendMany(
              Object.keys(upgradeCost.cost) as Resources[],
              Object.values(upgradeCost.cost),
              async () => {
                await upgrade(structName, upgradeCost);
              }
            );
          }}
        ></StructureUpgradeButton>
      </ScrollView>
    </>
  );
}
