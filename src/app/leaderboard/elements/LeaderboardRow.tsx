import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import PooCreatureBadge from "../../../common/components/misc/poo-creature/PooCreatureBadge";
import UserData from "../../../common/types/firebase/UserData";
import { colors } from "../../../common/utils/color-utils";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";

export default function LeaderboardRow({
  userData,
  isYou,
  trailing,
  rank,
}: {
  userData: UserData;
  isYou?: boolean;
  trailing: React.ReactNode;
  rank: number;
}) {
  const { name } = usePooCreatureStyleStore();

  return (
    <>
      <View
        style={[
          style.flexRow,
          style.border,
          style.itemsCenter,
          style.wFull,
          {
            borderLeftWidth: 0,
            borderRightWidth: 0,
            flex: 1,
            paddingHorizontal: 10,
            gap: 15,
            maxWidth: "100%",
            boxSizing: "border-box",
            backgroundColor: isYou ? colors.gray[100] : colors.transparent,
          },
        ]}
      >
        <View
          style={[
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            {
              backgroundColor:
                rank === 1
                  ? colors.yellow[400]
                  : rank === 2
                  ? colors.yellow[300]
                  : rank === 3
                  ? colors.yellow[200]
                  : colors.transparent,
              width: 50,
              height: 50,
              borderRadius: 7,
              overflow: "hidden",
              boxSizing: "border-box",
              flex: 0,
            },
          ]}
        >
          <Text
            style={[
              style.textMd,
              style.textBold,
              {
                color: rank > 3 ? colors.white : colors.gray[50],
                fontWeight: 900,
                textShadowRadius: 2,
                textShadowColor: colors.black,
                textShadowOffset: { width: 0, height: rank > 3 ? 0 : 1 },
              },
            ]}
          >
            {rank}
          </Text>
        </View>
        <View
          style={[
            style.flexRow,
            style.justifyBetween,
            style.itemsCenter,
            {
              flex: 1,
              paddingVertical: 10,
              overflow: "hidden",
              boxSizing: "border-box",
              maxWidth: "100%",
              gap: 10,
            },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.itemsCenter,
              style.hFull,
              {
                flex: 1,
                gap: 10,
                boxSizing: "border-box",
                overflow: "hidden",
              },
            ]}
          >
            <PooCreatureBadge
              size={40}
              padding={7}
              useBodyColorForBackground
              bodyColor={isYou ? undefined : userData.style.bodyColor}
              expression={isYou ? undefined : userData.style.expression}
              head={isYou ? undefined : userData.style.head}
            ></PooCreatureBadge>
            <Text
              style={[{ fontSize: 17, fontWeight: "600", overflow: "hidden" }]}
              numberOfLines={1}
            >
              {isYou ? name : userData.style.name}
            </Text>
          </View>
          <View
            style={[
              {
                backgroundColor: colors.gray[300],
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 5,
                boxSizing: "border-box",
              },
            ]}
          >
            {trailing}
          </View>
        </View>
      </View>
    </>
  );
}
