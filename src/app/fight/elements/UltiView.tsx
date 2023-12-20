import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import StandardButton from "../../../common/components/buttons/StandardButton";

export default function UltiView({
  icon,
  title,
  desc,
  details,
  price,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  details: { mana: number; [key: string]: any };
  price: number;
}) {
  return (
    <View
      style={[
        style.borderBottom,
        style.flexRow,
        style.itemsCenter,
        {
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 20,
          paddingHorizontal: 10,
        },
      ]}
    >
      <View>{icon}</View>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text>{title}</Text>
        <Text>{desc}</Text>
        <View></View>
      </View>
      <StandardButton>{price}</StandardButton>
    </View>
  );
}
