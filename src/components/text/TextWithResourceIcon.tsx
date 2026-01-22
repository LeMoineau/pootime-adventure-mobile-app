import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { Resources } from "../../config/constants/Resources";
import ResourceIcon from "../icons/ResourceIcon";
import { style as styleUtils } from "../../utils/style-utils";

export default function TextWithResourceIcon({
  text,
  resource,
  fontSize,
  textStyle,
  style,
}: {
  text: string | number;
  resource: Resources;
  fontSize?: number;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <>
      <View
        style={[
          styleUtils.flexRow,
          styleUtils.justifyCenter,
          styleUtils.itemsCenter,
          style,
        ]}
      >
        <Text style={[{ fontSize: fontSize ?? 15 }, textStyle]}>
          {`${text}${typeof text === "number" ? " " : ""}`}
        </Text>
        <ResourceIcon
          resource={resource}
          size={fontSize ? fontSize + 3 : 20}
        ></ResourceIcon>
      </View>
    </>
  );
}
