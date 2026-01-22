import { View } from "react-native";
import { StructureName } from "../../../config/constants/Structures";
import { useVillageStore } from "../../../stores/village.store";
import ToiletIcon from "./village/toilet/Toilet";
import UnderConstructionIcon from "./village/under-construction/UnderConstruction";
import YarisIcon from "./village/yaris/Yaris";
import { style } from "../../../utils/style-utils";

export default function StructureIcon({
  structureName,
  level,
  size,
}: {
  structureName: StructureName;
  level: number;
  size?: number;
}) {
  const { get } = useVillageStore();
  if (get(structureName).level <= 0)
    return (
      <>
        <View
          style={[
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            { width: size ?? 100, height: size ?? 100 },
          ]}
        >
          <UnderConstructionIcon height={50}></UnderConstructionIcon>
        </View>
      </>
    );
  return (
    <>
      <View
        style={[
          style.flexCol,
          style.itemsCenter,
          style.justifyCenter,
          {
            width: size ?? 100,
            height: size ?? 100,
          },
        ]}
      >
        {structureName === "toilet" && (
          <ToiletIcon gold={level >= 5} height={size ?? 100}></ToiletIcon>
        )}
        {structureName === "yaris" && (
          <YarisIcon gold={false} width={size ?? 100}></YarisIcon>
        )}
      </View>
    </>
  );
}
