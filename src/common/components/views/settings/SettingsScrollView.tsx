import { View } from "react-native";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../utils/color-utils";
import SettingsItem, { SettingsItemProps } from "./SettingsItem";

export function SettingsScrollView({ items }: { items: SettingsItemProps[] }) {
  return (
    <View
      style={[
        style.wFull,
        style.border,
        style.shadowMd,
        style.roundedLg,
        style.overflowHidden,
        {
          backgroundColor: colors.white,
        },
      ]}
    >
      {items.map((i, index) => {
        return <SettingsItem {...i} key={index}></SettingsItem>;
      })}
    </View>
  );
}
