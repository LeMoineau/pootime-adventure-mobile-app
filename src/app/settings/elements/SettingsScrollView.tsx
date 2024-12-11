import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import SettingsItem, { SettingsItemProps } from "./SettingsItem";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export function SettingsScrollView({
  title,
  items,
  actionChild,
  ...props
}: {
  title?: string;
  items: SettingsItemProps[];
  actionChild?: React.ReactNode;
} & ViewProps) {
  return (
    <View style={[style.wFull, { marginBottom: 20 }, props.style]}>
      {title && (
        <View style={[style.flexRow, style.wFull, style.justifyBetween, {}]}>
          <Text
            style={[
              {
                marginBottom: 15,
                marginLeft: 10,
                color: colors.black,
                fontSize: 17,
              },
            ]}
          >
            {title}
          </Text>
          {actionChild}
        </View>
      )}
      <View
        style={[
          style.wFull,
          style.shadowMd,
          style.overflowHidden,
          {
            backgroundColor: colors.white,
            paddingHorizontal: 10,
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
