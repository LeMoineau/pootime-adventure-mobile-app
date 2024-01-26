import { GestureResponderEvent, Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import PillButton from "../../buttons/PillButton";
import RightArrow from "../../icons/rightArrow";

export default function SettingsHeader({
  title,
  onPressBack,
}: {
  title: string;
  onPressBack?: (evt: GestureResponderEvent) => void;
}) {
  return (
    <View
      style={[
        style.wFull,
        style.flexRow,
        style.itemsCenter,
        {
          justifyContent: "flex-start",
          paddingVertical: 20,
          paddingHorizontal: 10,
        },
      ]}
    >
      <PillButton
        style={[{ marginRight: 5 }]}
        styleView={[{ padding: 10, borderWidth: 0 }]}
        onPress={onPressBack}
      >
        <RightArrow
          size={20}
          strokeWidth={10}
          style={[{ transform: [{ rotateZ: "180deg" }] }]}
        ></RightArrow>
      </PillButton>
      <Text style={[style.wFull, style.textLg, style.textBold]}>{title}</Text>
    </View>
  );
}
