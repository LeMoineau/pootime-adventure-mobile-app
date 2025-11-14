import { StyleProp, Text, View, ViewStyle } from "react-native";
import { style } from "../../utils/style-utils";
import Divider from "./Divider";
import { colors } from "../../utils/color-utils";

export default function TitleWithDivider({
  viewStyle,
  textStyle,
  children,
}: {
  textStyle?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  return (
    <View style={[style.flexRow, style.itemsCenter, { gap: 10 }, viewStyle]}>
      <Divider style={{ backgroundColor: colors.black }}></Divider>
      <Text style={[{ textTransform: "uppercase" }, textStyle]}>
        {children}
      </Text>
      <Divider style={{ backgroundColor: colors.black }}></Divider>
    </View>
  );
}
