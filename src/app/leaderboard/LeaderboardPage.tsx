import { Pressable, ScrollView, Text, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import { style } from "../../common/utils/style-utils";
import LeaderboardRow from "./elements/LeaderboardRow";
import RoundedScrollView from "../../common/components/views/rounded-scroll-view/RoundedScrollView";
import PooCreatureBadge from "../../common/components/misc/poo-creature/PooCreatureBadge";
import StandardButton from "../../common/components/buttons/StandardButton";
import PooTropheeIcon from "../../common/components/icons/resources/PooTropheeIcon";
import PooCoinIcon from "../../common/components/icons/resources/pooCoin";
import { getAuth } from "firebase/auth";
import useLeaderboard from "../../common/hooks/leaderboard/use-leaderboard";
import { useEffect, useState } from "react";
import LeaderboardBoard from "./elements/LeaderboardBoard";
import TextWithResourceIcon from "../../common/components/text/TextWithResourceIcon";
import { LeaderboardName } from "../../common/types/leaderboard/LeaderboardName";
import { LeaderboardDirection } from "../../common/types/leaderboard/LeaderboardDirection";

export default function LeaderboardPage() {
  const { getBoard, fetch } = useLeaderboard();
  const [boardsDirection, setBoardsDirection] = useState<
    [LeaderboardDirection, LeaderboardDirection]
  >(["asc", "asc"]);

  useEffect(() => {
    fetch("trophees", "asc").then(async () => {
      await fetch("pooCoins", "asc");
      setBoardsDirection(["asc", "asc"]);
    });
  }, []);

  return (
    <>
      <CustomPage
        bgColor={colors.baseBackgroundColor}
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { padding: 0 },
        ]}
      >
        <View style={[{ paddingVertical: 20 }]}>
          <View style={[style.flexRow, {}]}>
            <PooCreatureBadge
              size={100}
              border
              useBodyColorForBackground
            ></PooCreatureBadge>
            <View style={[{}]}>
              <StandardButton
                style={[{ flex: 1, width: 150, marginTop: 15 }]}
                bgColor={colors.green[500]}
                viewStyle={[style.roundedFull, { paddingVertical: 15 }]}
                textColor={colors.white}
                textStyle={[{ fontSize: 17, fontWeight: "500" }]}
                onPress={async () => {
                  const currentUser = getAuth().currentUser;
                  const token = await currentUser?.getIdToken();
                  console.log(token);
                }}
              >
                Coucou
              </StandardButton>
            </View>
          </View>
        </View>
        <RoundedScrollView
          defaultTab={0}
          tabs={[
            {
              icon: <PooTropheeIcon height={35}></PooTropheeIcon>,
              content: (
                <LeaderboardBoard
                  title="Classement par trophées"
                  boardDirection={boardsDirection[0]}
                  filterIcon={<PooTropheeIcon height={25}></PooTropheeIcon>}
                  onFilterPress={async (direction) => {
                    await fetch("trophees", direction);
                    setBoardsDirection([direction, boardsDirection[0]]);
                  }}
                  rows={getBoard(`trophees-${boardsDirection[0]}`)}
                  item={(ud, index) => (
                    <LeaderboardRow
                      userData={ud}
                      key={index}
                      trailing={
                        <TextWithResourceIcon
                          key={`trophees-item-${index}`}
                          resource="pooTrophee"
                          text={ud.resources.pooTrophee}
                          fontSize={20}
                          textStyle={[{ fontWeight: "500" }]}
                        ></TextWithResourceIcon>
                      }
                    ></LeaderboardRow>
                  )}
                ></LeaderboardBoard>
              ),
            },
            {
              icon: <PooCoinIcon size={35}></PooCoinIcon>,
              content: (
                <LeaderboardBoard
                  title="Classement par pooCoins"
                  boardDirection={boardsDirection[1]}
                  filterIcon={<PooCoinIcon width={25}></PooCoinIcon>}
                  onFilterPress={async (direction) => {
                    await fetch("pooCoins", direction);
                    setBoardsDirection([boardsDirection[1], direction]);
                  }}
                  rows={getBoard(`pooCoins-${boardsDirection[1]}`)}
                  item={(ud, index) => (
                    <LeaderboardRow
                      userData={ud}
                      key={index}
                      trailing={
                        <TextWithResourceIcon
                          key={`pooCoins-item-${index}`}
                          resource="pooCoins"
                          text={ud.resources.pooCoins}
                          fontSize={20}
                          textStyle={[{ fontWeight: "500" }]}
                        ></TextWithResourceIcon>
                      }
                    ></LeaderboardRow>
                  )}
                ></LeaderboardBoard>
              ),
            },
          ]}
        ></RoundedScrollView>
      </CustomPage>
    </>
  );
}
