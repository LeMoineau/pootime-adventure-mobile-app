import { ScrollView, Text, View } from "react-native";
import { useVillageStore } from "../../../common/stores/village.store";
import { useResourcesStore } from "../../../common/stores/resources.store";
import useStructure from "../../../features/village/hooks/use-structure";
import { useEffect } from "react";
import TabTitle from "../../../features/structure-infos/components/TabTitle";
import TabText from "../../../features/structure-infos/components/TabText";
import { style } from "../../../common/utils/style-utils";
import TextWithResourceIcon from "../../../common/components/text/TextWithResourceIcon";
import { colors } from "../../../common/utils/color-utils";
import TransferButton from "../../../common/components/buttons/TransferButton";
import { Resources } from "../../../common/config/constants/Resources";

export default function StructureInfosBuildTab() {
  const { selectedStructureName: structName, build } = useVillageStore();
  const { get: getResource, spendMany } = useResourcesStore();
  const { setStructName, structure, buildable, iterateOnBuildingCost } =
    useStructure();

  useEffect(() => {
    setStructName(structName);
  }, [structName]);

  return (
    <>
      <ScrollView style={[{ padding: 10 }]}>
        <TabTitle>Building</TabTitle>
        <TabText>Resources needed for building this structure</TabText>

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
            {iterateOnBuildingCost().map(([resource, val], index) => {
              return (
                <TextWithResourceIcon
                  key={`building-cost-${resource}-${index}`}
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

        {/* BUILD BUTTON */}
        <TransferButton
          bgColor={buildable() ? colors.orange[500] : colors.gray[400]}
          showConfirmModal
          confirmModalCondition={() => buildable()}
          onConfirm={async () => {
            const struct = structure();
            if (!struct || !struct.buildingCost || !structName) return;
            await spendMany(
              Object.keys(struct.buildingCost) as Resources[],
              Object.values(struct.buildingCost) as number[],
              async () => {
                await build(structName);
              }
            );
          }}
          confirmModalChildren={
            <View>
              <Text>Are you sure to build this mysterious structure ?</Text>
            </View>
          }
          leftChildren={
            <View
              style={[
                style.flexRow,
                style.justifyCenter,
                { flex: 1, flexWrap: "wrap" },
              ]}
            >
              {iterateOnBuildingCost().map(([resource, val], index) => (
                <TextWithResourceIcon
                  key={`building-cost-transfer-${resource}-${index}`}
                  resource={resource}
                  text={val}
                  textStyle={[{ color: colors.white }]}
                  style={[{ marginHorizontal: 5 }]}
                ></TextWithResourceIcon>
              ))}
            </View>
          }
          rightChildren={
            <Text
              style={[
                style.textCenter,
                { color: colors.white, fontSize: 17, flex: 1 },
              ]}
            >
              Level 1
            </Text>
          }
        ></TransferButton>
      </ScrollView>
    </>
  );
}
