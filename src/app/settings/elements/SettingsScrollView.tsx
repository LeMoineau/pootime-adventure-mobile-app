import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import SettingsItem, { SettingsItemProps } from "./SettingsItem";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export function SettingsScrollView({
  title,
  items,
  ...props
}: { title?: string; items: SettingsItemProps[] } & ViewProps) {
  return (
    <View style={[style.wFull, { padding: 10 }, props.style]}>
      {title && (
        <Text style={[style.textMd, { marginBottom: 5, marginLeft: 10 }]}>
          {title}
        </Text>
      )}
      <View
        style={[
          style.wFull,
          style.border,
          style.shadowMd,
          style.roundedLg,
          style.overflowHidden,
          {
            backgroundColor: colors.white,
            // backgroundColor: "rgba(255, 255, 255, 0.7)",
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
