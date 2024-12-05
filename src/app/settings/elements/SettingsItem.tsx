import { Pressable, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import RightArrow from "../../../common/components/icons/rightArrow";
import ExpoIcon, {
  AllIconNames,
} from "../../../common/components/icons/ExpoIcon";
import { colors } from "../../../common/utils/color-utils";

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
        {
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: colors.gray[50],
          borderRadius: 10,
          marginBottom: 15,
        },
      ]}
      onPress={onPress}
    >
      <View
        style={[style.flexRow, style.itemsCenter, style.hFull, { flex: 1 }]}
      >
        {icon && <ExpoIcon name={icon} size={20}></ExpoIcon>}
        <View style={[style.wFull, style.hFull, { marginLeft: icon ? 15 : 0 }]}>
          <Text style={[{ color: colors.black, fontSize: 17 }]}>{label}</Text>
          {subLabel && (
            <Text style={[style.textSm, { color: colors.black, opacity: 0.5 }]}>
              {subLabel}
            </Text>
          )}
        </View>
      </View>
      {hasRightArrow && <RightArrow size={15}></RightArrow>}
    </Pressable>
  );
}
