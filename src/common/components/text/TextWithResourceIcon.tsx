import { StyleProp, Text, TextStyle, View } from "react-native";
import { Resources } from "../../types/Resources";
import ResourceIcon from "../icons/ResourceIcon";
import { style } from "../../utils/style-utils";

export default function TextWithResourceIcon({
  text,
  resource,
  fontSize,
  textStyle,
}: {
  text: string;
  resource: Resources;
  fontSize?: number;
  textStyle?: StyleProp<TextStyle>;
}) {
  return (
    <>
      <View style={[style.flexRow, style.justifyCenter, style.itemsCenter]}>
        <Text style={[{ fontSize: fontSize ?? 15 }, textStyle]}>{text} </Text>
        <ResourceIcon
          resource={resource}
          size={fontSize ? fontSize + 3 : 20}
        ></ResourceIcon>
      </View>
    </>
  );
}
