import { Pressable, Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import RightArrow from "../../icons/rightArrow";
import ExpoIcon, { AllIconNames } from "../../icons/ExpoIcon";

export interface SettingsItemProps {
  icon: AllIconNames;
  label: string;
  hasRightArrow?: boolean;
  onPress?: () => void;
}

export default function SettingsItem({
  icon,
  label,
  hasRightArrow,
  onPress,
}: {} & SettingsItemProps) {
  return (
    <Pressable
      style={[
        style.wFull,
        style.flexRow,
        style.justifyBetween,
        style.itemsCenter,
        style.border,
        { padding: 20, borderWidth: 0, borderBottomWidth: 1 },
      ]}
      onPress={onPress}
    >
      <View style={[style.flexRow]}>
        <ExpoIcon name={icon} size={30}></ExpoIcon>
        <Text style={[style.textMd, { marginLeft: 15 }]}>{label}</Text>
      </View>
      {hasRightArrow && <RightArrow size={20}></RightArrow>}
    </Pressable>
  );
}
