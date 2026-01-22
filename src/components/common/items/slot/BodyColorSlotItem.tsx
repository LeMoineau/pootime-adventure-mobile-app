import { View } from "react-native";
import { style } from "../../../../utils/style-utils";
import { colors } from "../../../../constants/style/colors";

export default function BodyColorSlotItem({ color }: { color: string }) {
  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        {
          width: 40,
          height: 40,
          backgroundColor: colors.gray[100],
          borderRadius: 5,
        },
      ]}
    >
      <View
        style={[
          style.roundedFull,
          {
            width: 20,
            height: 20,
            backgroundColor: color,
            transform: [{ rotateX: "20deg" }, { rotateY: "-20deg" }],
          },
        ]}
      ></View>
    </View>
  );
}
