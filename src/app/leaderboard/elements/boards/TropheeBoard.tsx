import { Pressable, Text, View } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import LeaderboardRow from "../LeaderboardRow";
import ExpoIcon from "../../../../common/components/icons/ExpoIcon";
import { useState } from "react";
import PooTropheeIcon from "../../../../common/components/icons/resources/PooTropheeIcon";
import { colors } from "../../../../common/utils/color-utils";

export default function TropheeBoard() {
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
          <Text> Classement par trophées </Text>
          <Pressable
            style={[style.flexRow, style.itemsCenter, { paddingHorizontal: 5 }]}
            onPress={() => {
              setSortedAsc(!sortedAsc);
            }}
          >
            <PooTropheeIcon height={25}></PooTropheeIcon>
            <View style={[{ width: 10 }]}></View>
            <ExpoIcon
              name={sortedAsc ? "sort-asc" : "sort-desc"}
              size={20}
            ></ExpoIcon>
          </Pressable>
        </View>
        <LeaderboardRow></LeaderboardRow>
      </View>
    </>
  );
}
