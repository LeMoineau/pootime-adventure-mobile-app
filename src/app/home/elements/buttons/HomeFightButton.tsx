import { Pressable, Text, View } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import { colors } from "../../../../common/utils/color-utils";

export default function HomeFightButton({
  textContent,
  color,
  onPress,
}: {
  textContent: string;
  color: { [color: number]: string };
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[{ flexGrow: 1 }]}>
      <View
        style={[
          style.rounded,
          style.shadowMd,
          style.flexRow,
          style.justifyCenter,
          style.itemsCenter,
          {
            backgroundColor: color[400],
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderColor: color[500],
            borderWidth: 1,
            borderStyle: "solid",
          },
        ]}
      >
        <Text style={[style.textBold, style.textXl, { color: colors.white }]}>
          {textContent}
        </Text>
      </View>
    </Pressable>
  );
}
