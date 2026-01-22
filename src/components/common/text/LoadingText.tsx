import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "../../../constants/style/colors";
import SkeletonText from "./SkeletonText";

export default function LoadingText({
  text,
  fontSize = 15,
  textStyle,
  skeletonStyle,
}: {
  text?: string;
  fontSize?: number;
  textStyle?: StyleProp<TextStyle>;
  skeletonStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <>
      {text ? (
        <Text style={[{ fontSize }, textStyle]}>{text}</Text>
      ) : (
        <SkeletonText {...{ fontSize, skeletonStyle }}></SkeletonText>
      )}
    </>
  );
}
