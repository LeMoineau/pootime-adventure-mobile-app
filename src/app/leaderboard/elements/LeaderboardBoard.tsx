import { Pressable, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import React, { useState } from "react";
import UserData, {
  UserDataWithUid,
} from "../../../common/types/firebase/UserData";
import { LeaderboardDirection } from "../../../common/types/leaderboard/LeaderboardDirection";

export default function LeaderboardBoard({
  boardDirection,
  title,
  rows,
  filterIcon,
  onFilterPress,
  item,
}: {
  boardDirection: LeaderboardDirection;
  title: string;
  rows: UserDataWithUid[];
  filterIcon: React.ReactNode;
  onFilterPress?: (newDirection: LeaderboardDirection) => void;
  item: (userData: UserDataWithUid, index: number) => React.ReactNode;
}) {
  return (
    <>
      <View>
        <View
          style={[
            style.flexRow,
            style.justifyBetween,
            style.itemsCenter,
            style.wFull,
            style.borderBottom,
            {
              height: 40,
              paddingHorizontal: 10,
              backgroundColor: colors.gray[100],
            },
          ]}
        >
          <Text> {title} </Text>
          <Pressable
            style={[style.flexRow, style.itemsCenter, { paddingHorizontal: 5 }]}
            onPress={() => {
              onFilterPress &&
                onFilterPress(boardDirection === "asc" ? "desc" : "asc");
            }}
          >
            {filterIcon}
            <View style={[{ width: 10 }]}></View>
            <ExpoIcon
              name={boardDirection === "asc" ? "sort-asc" : "sort-desc"}
              size={20}
            ></ExpoIcon>
          </Pressable>
        </View>
        {rows.map(item)}
      </View>
    </>
  );
}
