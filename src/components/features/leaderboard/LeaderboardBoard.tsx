import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../constants/style/colors";
import ExpoIcon from "../../common/icons/ExpoIcon";
import React, { useState } from "react";
import { IdentifiedUserData } from "../../../types/firebase/UserData";
import { LeaderboardDirection } from "../../../types/leaderboard/LeaderboardDirection";
import TextWithResourceIcon from "../../common/text/TextWithResourceIcon";
import { useAuthentication } from "../../../hooks/common/firebase/use-authentification";
import { MathUtils } from "../../../utils/math-utils";
import { Resources } from "../../../config/constants/Resources";
import LeaderboardRow from "./LeaderboardRow";

export default function LeaderboardBoard({
  title,
  directionChangerIcon,
  onDirectionChange,
  resourceDescribed,
  items,
  leaderboardSize,
  loading,
}: {
  title: string;
  directionChangerIcon: React.ReactNode;
  onDirectionChange?: (newDirection: LeaderboardDirection) => void;
  resourceDescribed: Resources;
  items?: { asc: IdentifiedUserData[]; desc: IdentifiedUserData[] };
  leaderboardSize: number;
  loading?: boolean;
}) {
  const { user } = useAuthentication();
  const [direction, setDirection] = useState<LeaderboardDirection>("desc");

  const calculateRank = (index: number) => {
    if (index > 0 && items) {
      let _index = index;
      while (
        _index > 0 &&
        items[direction][_index].resources[resourceDescribed] ===
          items[direction][_index - 1].resources[resourceDescribed]
      ) {
        _index -= 1;
      }
      return direction === "asc" ? leaderboardSize - _index : _index + 1;
    } else {
      return direction === "asc" ? leaderboardSize - index : index + 1;
    }
  };

  return (
    <View>
      <Pressable
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
        onPress={() => {
          const newDirection = direction === "asc" ? "desc" : "asc";
          setDirection(newDirection);
          onDirectionChange && onDirectionChange(newDirection);
        }}
      >
        <Text> {title} </Text>
        <View
          style={[style.flexRow, style.itemsCenter, { paddingHorizontal: 5 }]}
        >
          {directionChangerIcon}
          <View style={[{ width: 10 }]}></View>
          <ExpoIcon
            name={direction === "asc" ? "sort-asc" : "sort-desc"}
            size={20}
          ></ExpoIcon>
        </View>
      </Pressable>
      {loading ? (
        <View style={[{ paddingTop: 20 }]}>
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      ) : (
        (items?.[direction] ?? []).map((ud, index) => (
          <LeaderboardRow
            rank={calculateRank(index)}
            userData={ud}
            key={index}
            isYou={ud.uid === user?.uid}
            trailing={
              <TextWithResourceIcon
                key={`trophees-item-${index}`}
                resource={resourceDescribed}
                text={MathUtils.convertToReduceStrFormat(
                  ud.resources[resourceDescribed],
                )}
                fontSize={20}
                textStyle={[
                  {
                    fontWeight: "800",
                    color: colors.gray[50],
                    textShadowRadius: 2,
                    textShadowColor: colors.black,
                    textShadowOffset: { width: 0, height: 1 },
                    marginRight: 5,
                  },
                ]}
              ></TextWithResourceIcon>
            }
          ></LeaderboardRow>
        ))
      )}
    </View>
  );
}
