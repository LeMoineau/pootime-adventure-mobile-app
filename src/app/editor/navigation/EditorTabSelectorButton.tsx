import { colors } from "../../../common/utils/color-utils";
import React from "react";
import { Pressable } from "react-native";

export default function EditorTabSelectorButton({
  tabSelected,
  tabAssign,
  onPress,
  contentIcon,
}: {
  tabSelected: number;
  tabAssign: number;
  onPress: (tabAssign: number) => void;
  contentIcon: React.ReactNode;
}) {
  return (
    <Pressable
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor:
          tabSelected === tabAssign ? colors.blue[500] : colors.transparent,
        backgroundColor:
          tabSelected === tabAssign ? colors.gray[100] : colors.transparent,
      }}
      onPress={() => onPress(tabAssign)}
    >
      {contentIcon}
    </Pressable>
  );
}
