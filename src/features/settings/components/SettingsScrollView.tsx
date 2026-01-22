import { Pressable, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import SettingsItem, { SettingsItemProps } from "./SettingsItem";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { useState } from "react";
import ExpoIcon from "../../../components/icons/ExpoIcon";

export function SettingsScrollView({
  title,
  items,
  actionChild,
  minimizable,
  ...props
}: {
  title?: string;
  items: SettingsItemProps[];
  actionChild?: React.ReactNode;
  minimizable?: boolean;
} & ViewProps) {
  const [minimized, setMinimized] = useState(false);

  return (
    <View style={[style.wFull, { marginBottom: 20 }, props.style]}>
      {title && (
        <View
          style={[
            style.flexRow,
            style.wFull,
            style.justifyBetween,
            style.itemsCenter,
          ]}
        >
          <Text
            style={[
              {
                marginLeft: 10,
                color: colors.black,
                fontSize: 17,
              },
            ]}
          >
            {title}
          </Text>
          {minimizable && (
            <Pressable
              style={[
                style.flexRow,
                {
                  padding: 10,
                  flex: 1,
                  justifyContent: "flex-end",
                },
              ]}
              onPress={() => {
                setMinimized(!minimized);
              }}
            >
              <ExpoIcon
                name={!minimized ? "chevron-down" : "chevron-up"}
                size={15}
              ></ExpoIcon>
            </Pressable>
          )}
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
            marginTop: minimizable ? 10 : 15,
            // backgroundColor: "rgba(255, 255, 255, 0.7)",
          },
        ]}
      >
        {minimized && (
          <View
            style={{
              borderBottomColor: colors.gray[200],
              borderBottomWidth: 1,
            }}
          ></View>
        )}
        {!minimized &&
          items.map((i, index) => {
            return <SettingsItem {...i} key={index}></SettingsItem>;
          })}
      </View>
    </View>
  );
}
