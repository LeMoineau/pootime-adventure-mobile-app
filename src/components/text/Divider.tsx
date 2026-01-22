import { StyleProp, View, ViewStyle } from "react-native";
import { style as StyleUtils } from "../../common/utils/style-utils";

export default function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        StyleUtils.border,
        { width: "100%", flex: 1, height: 1, maxHeight: 1 },
        style,
      ]}
    ></View>
  );
}
