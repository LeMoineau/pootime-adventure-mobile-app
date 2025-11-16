import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { style } from "../../utils/style-utils";
import Divider from "./Divider";
import { colors } from "../../utils/color-utils";

export default function TitleWithDivider({
  viewStyle,
  textStyle,
  children,
  hideLeftDivider,
}: {
  textStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  hideLeftDivider?: boolean;
}) {
  return (
    <View style={[style.flexRow, style.itemsCenter, { gap: 10 }, viewStyle]}>
      {!hideLeftDivider && (
        <Divider style={{ backgroundColor: colors.black }}></Divider>
      )}
      <Text
        style={[{ textTransform: "uppercase", maxWidth: "90%" }, textStyle]}
      >
        {children}
      </Text>
      <Divider style={{ backgroundColor: colors.black }}></Divider>
    </View>
  );
}
