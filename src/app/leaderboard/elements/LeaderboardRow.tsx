import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import PooCreatureBadge from "../../../common/components/misc/poo-creature/PooCreatureBadge";
import UserData from "../../../common/types/firebase/UserData";
import { colors } from "../../../common/utils/color-utils";

export default function LeaderboardRow({
  userData,
  isYou,
  trailing,
}: {
  userData: UserData;
  isYou?: boolean;
  trailing: React.ReactNode;
}) {
  return (
    <>
      <View
        style={[
          style.flexRow,
          style.wFull,
          style.justifyBetween,
          style.itemsCenter,
          {
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
              flexGrow: 1,
              overflow: "hidden",
              width: "auto",
              maxWidth: "70%",
            },
          ]}
        >
          <PooCreatureBadge
            size={40}
            padding={7}
            useBodyColorForBackground
            bodyColor={userData.style.bodyColor}
            expression={userData.style.expression}
            head={userData.style.head}
          ></PooCreatureBadge>
          <View style={[{ width: 10 }]}></View>
          <Text
            style={[{ fontSize: 17, fontWeight: "600", overflow: "hidden" }]}
            numberOfLines={1}
          >
            {userData.style.name} {isYou && " (Vous)"}
          </Text>
        </View>
        {trailing}
      </View>
    </>
  );
}
