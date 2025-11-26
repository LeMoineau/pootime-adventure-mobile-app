import { ScrollView, Text, View } from "react-native";
import { useVillageStore } from "../../../../common/stores/village.store";
import { style } from "../../../../common/utils/style-utils";
import useStructure from "../../../village/hooks/use-structure";
import { useEffect } from "react";
import StructurePower from "../structure-power/StructurePower";

export default function StructureInfosMainTab() {
  const { selectedStructureName: structName, get } = useVillageStore();
  const { setStructName, structure } = useStructure();

  useEffect(() => {
    setStructName(structName);
  }, [structName]);

  return (
    <>
      <View
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { padding: 10, flex: 1 },
        ]}
      >
        {structName && get(structName).level <= 0 ? (
          <View style={[{ flex: 1 }]}>
            <Text>You need to build the structure to use it !</Text>
          </View>
        ) : (
          <ScrollView style={[{ width: "100%" }]}>
            <Text
              style={[{ fontSize: 15, fontWeight: "500", letterSpacing: 0.5 }]}
            >
              Power
            </Text>
            <Text style={[{ fontSize: 12, marginBottom: 10 }]}>
              {structure()?.description}
            </Text>
            {structName && (
              <StructurePower structName={structName}></StructurePower>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
}
