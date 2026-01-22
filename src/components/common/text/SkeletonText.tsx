import { StyleProp, View, ViewStyle } from "react-native";
import { colors } from "../../../utils/color-utils";

export default function SkeletonText({
  width = 30,
  fontSize = 15,
  skeletonStyle,
}: {
  width?: number;
  fontSize?: number;
  skeletonStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          width,
          height: fontSize,
          borderRadius: 5,
          backgroundColor: colors.gray[300],
        },
        skeletonStyle,
      ]}
    ></View>
  );
}
