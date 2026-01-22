import { View } from "react-native";
import { style } from "../../../../constants/style/styles";
import { colors } from "../../../../constants/style/colors";
import { Image } from "expo-image";

export default function ExpressionSlotItem({
  expression,
}: {
  expression: string;
}) {
  return (
    <View
      style={[
        style.flexRow,
        style.justifyCenter,
        style.itemsCenter,
        {
          width: 50,
          height: 50,
          backgroundColor: colors.gray[100],
          borderRadius: 5,
          overflow: "hidden",
        },
      ]}
    >
      <Image
        source={{ uri: expression }}
        contentFit="cover"
        style={{
          width: 90,
          height: 90,
          transform: [{ translateY: 20 }],
        }}
      ></Image>
    </View>
  );
}
