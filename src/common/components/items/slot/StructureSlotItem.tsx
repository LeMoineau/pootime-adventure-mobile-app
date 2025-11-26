import { Text, View } from "react-native";
import { StructureName } from "../../../common/config/constants/Structures";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../utils/color-utils";
import StructureIcon from "../../icons/StructureIcon";

export default function StructureSlotItem({
  structureName,
  level,
  showWhenNotBuilt,
}: {
  structureName: StructureName;
  level: number;
  showWhenNotBuilt?: boolean;
}) {
  if (level <= 0 && !showWhenNotBuilt) return <></>;
  return (
    <View
      style={[
        style.itemsCenter,
        style.justifyCenter,
        {
          width: 120,
          height: 120,
          backgroundColor: colors.villageGrass,
          borderRadius: 10,
          opacity: showWhenNotBuilt && level <= 0 ? 0.5 : 1,
        },
      ]}
    >
      <StructureIcon
        structureName={structureName}
        level={level}
        size={100}
      ></StructureIcon>
      <Text
        style={[
          showWhenNotBuilt && level <= 0 ? [] : style.textShadowMd,
          {
            position: "absolute",
            bottom: 5,
            right: 10,
            color: colors.white,
            fontWeight: "700",
          },
        ]}
      >
        Niv. {level}
      </Text>
    </View>
  );
}
