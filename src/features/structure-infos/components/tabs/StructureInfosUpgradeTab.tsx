import { ScrollView, Text, View } from "react-native";
import StructureUpgradeButton from "../StructureUpgradeButton";
import { useEffect } from "react";
import { useVillageStore } from "../../../../common/stores/village.store";
import { useResourcesStore } from "../../../../common/stores/resources.store";
import useStructure from "../../../(tabs)/village/hooks/use-structure";
import { style } from "../../../../common/utils/style-utils";
import { colors } from "../../../../common/utils/color-utils";
import TextWithResourceIcon from "../../../../common/components/text/TextWithResourceIcon";
import { Resources } from "../../../../common/config/constants/Resources";

export default function StructureInfosUpgradeTab() {
  const { selectedStructureName: structName, get, upgrade } = useVillageStore();
  const { get: getResource, spendMany } = useResourcesStore();
  const { setStructName, iterateOnUpgradeCost, isLevelMax } = useStructure();

  useEffect(() => {
    setStructName(structName);
  }, [structName]);

  return (
    <>
      <ScrollView style={[{ padding: 10 }]}>
        <Text style={[{ fontSize: 15, fontWeight: "500", letterSpacing: 0.5 }]}>
          Amélioration
        </Text>
        <Text style={[{ fontSize: 12, marginBottom: 10 }]}>
          Ressources nécessaire pour le prochain niveau
        </Text>

        {/* NEEDED RESOURCES */}
        {!isLevelMax() && (
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
              {iterateOnUpgradeCost().map(([resource, val], index) => {
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
        )}

        {/* UPGRADE BUTTON */}
        <StructureUpgradeButton
          onUpgrade={async (upgradeCost) => {
            if (!structName) return;
            await spendMany(
              Object.keys(upgradeCost.cost) as Resources[],
              Object.values(upgradeCost.cost) as number[],
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
