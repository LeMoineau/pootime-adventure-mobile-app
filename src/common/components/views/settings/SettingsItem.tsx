import { Pressable, Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import RightArrow from "../../icons/rightArrow";
import ExpoIcon, { AllIconNames } from "../../icons/ExpoIcon";
import { colors } from "../../../utils/color-utils";

export interface SettingsItemProps {
  icon?: AllIconNames;
  label: string;
  subLabel?: string;
  hasRightArrow?: boolean;
  onPress?: () => void;
}

export default function SettingsItem({
  icon,
  label,
  subLabel,
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
        { flex: 1, padding: 20, borderWidth: 0, borderBottomWidth: 1 },
      ]}
      onPress={onPress}
    >
      <View style={[style.flexRow, style.itemsCenter, { flex: 1 }]}>
        {icon && <ExpoIcon name={icon} size={30}></ExpoIcon>}
        <View style={[style.wFull, { marginLeft: icon ? 15 : 0 }]}>
          <Text style={[style.textMd]}>{label}</Text>
          {subLabel && (
            <Text style={[style.textSm, { color: colors.gray[500] }]}>
              {subLabel}
            </Text>
          )}
        </View>
      </View>
      {hasRightArrow && <RightArrow size={20}></RightArrow>}
    </Pressable>
  );
}
