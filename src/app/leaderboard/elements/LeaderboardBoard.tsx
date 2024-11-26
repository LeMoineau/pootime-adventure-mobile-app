import { Pressable, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import PooTropheeIcon from "../../../common/components/icons/resources/PooTropheeIcon";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import LeaderboardRow from "./LeaderboardRow";
import React, { useState } from "react";
import UserData from "../../../common/types/firebase/UserData";

export default function LeaderboardBoard({
  title,
  rows,
  filterIcon,
  item,
}: {
  title: string;
  rows: UserData[];
  filterIcon: React.ReactNode;
  item: (userData: UserData) => React.ReactNode;
}) {
  const [sortedAsc, setSortedAsc] = useState(false);

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
              setSortedAsc(!sortedAsc);
            }}
          >
            {filterIcon}
            <View style={[{ width: 10 }]}></View>
            <ExpoIcon
              name={sortedAsc ? "sort-asc" : "sort-desc"}
              size={20}
            ></ExpoIcon>
          </Pressable>
        </View>
        {rows.map(item)}
      </View>
    </>
  );
}
