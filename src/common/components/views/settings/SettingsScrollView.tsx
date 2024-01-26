import { View } from "react-native";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../utils/color-utils";
import SettingsItem, { SettingsItemProps } from "./SettingsItem";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export function SettingsScrollView({
  items,
  ...props
}: { items: SettingsItemProps[] } & ViewProps) {
  return (
    <View style={[style.wFull, { flex: 1, padding: 10 }, props.style]}>
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
    </View>
  );
}
