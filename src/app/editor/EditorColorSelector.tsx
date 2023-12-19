import PooCoinIcon from "../../common/components/icons/pooCoin";
import { colors } from "../../common/utils/color-utils";
import { style } from "./../../common/utils/style-utils";
import { Pressable, Text, View } from "react-native";

export default function EditorColorSelector({
  color,
  price,
  onRequestSelect,
  size,
}: {
  color: string;
  price?: number;
  onRequestSelect?: (color: string, price?: number) => void;
  size?: number;
}) {
  return (
    <Pressable onPress={() => onRequestSelect && onRequestSelect(color, price)}>
      <View
        style={[
          style.rounded,
          style.shadowMd,
          style.border,
          {
            width: size ?? 50,
            height: size ?? 50,
            backgroundColor: color,
            margin: 5,
            borderWidth: price ? 5 : 1,
            borderColor: price ? colors.red[400] : colors.gray[100],
          },
        ]}
      ></View>
      {price && (
        <View
          style={[
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transform: [{ rotateZ: "45deg" }],
            },
          ]}
        >
          <Text style={[style.textBold]}>{price} </Text>
          <PooCoinIcon size={20}></PooCoinIcon>
        </View>
      )}
    </Pressable>
  );
}
