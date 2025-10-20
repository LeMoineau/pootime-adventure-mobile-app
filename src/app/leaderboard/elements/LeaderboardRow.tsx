import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import PooCreatureBadge from "../../../common/components/misc/poo-creature/PooCreatureBadge";
import UserData from "../../../common/types/firebase/UserData";
import { colors } from "../../../common/utils/color-utils";

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
  return (
    <>
      <View style={[style.flexRow, style.border, { flex: 1 }]}>
        <View
          style={[
            style.hFull,
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            style.border,
            {
              borderWidth: 0,
              borderRightWidth: 1,
              backgroundColor:
                rank === 1
                  ? colors.yellow[400]
                  : rank === 2
                  ? colors.yellow[300]
                  : rank === 3
                  ? colors.yellow[200]
                  : colors.gray[50],
              width: 40,
            },
          ]}
        >
          <Text style={[style.textMd, style.textBold, {}]}>{rank}</Text>
        </View>
        <View
          style={[
            style.flexRow,
            style.wFull,
            style.justifyBetween,
            style.itemsCenter,
            {
              flex: 1,
              padding: 10,
              maxWidth: "100%",
              overflow: "hidden",
              backgroundColor: isYou ? colors.baseBackgroundColor : undefined,
            },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.itemsCenter,
              style.hFull,
              {
                flexGrow: 0,
                overflow: "hidden",
                maxWidth: "70%",
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
            <View style={[{ width: 10 }]}></View>
            <View style={[style.flexCol, {}]}>
              <Text
                style={[
                  { fontSize: 17, fontWeight: "600", overflow: "hidden" },
                ]}
                numberOfLines={1}
              >
                {userData.style.name}
              </Text>
              {isYou && (
                <Text
                  style={[
                    {
                      fontSize: 13,
                      overflow: "hidden",
                      opacity: 0.5,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {isYou && "(Vous)"}
                </Text>
              )}
            </View>
          </View>
          {trailing}
        </View>
      </View>
    </>
  );
}
