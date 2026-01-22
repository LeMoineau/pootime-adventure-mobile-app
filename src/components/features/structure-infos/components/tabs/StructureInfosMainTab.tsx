import { ScrollView, Text, View } from "react-native";

import { useEffect } from "react";
import StructurePower from "../structure-power/StructurePower";
import { useVillageStore } from "../../../../../stores/village.store";
import useStructure from "../../../(tabs)/village/hooks/use-structure";
import { style } from "../../../../../utils/style-utils";

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
            <Text style={{ textAlign: "center" }}>
              Vous devez avoir construit le bâtiment pour pouvoir l'utiliser !
            </Text>
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
