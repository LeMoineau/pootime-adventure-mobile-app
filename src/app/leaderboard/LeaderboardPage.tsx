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
import { useEffect } from "react";
import LeaderboardBoard from "./elements/LeaderboardBoard";
import TextWithResourceIcon from "../../common/components/text/TextWithResourceIcon";

export default function LeaderboardPage() {
  const { getBoard, fetch } = useLeaderboard();

  useEffect(() => {
    fetch("trophees", "asc").then(async () => {
      await fetch("pooCoins", "asc");
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
                  filterIcon={<PooTropheeIcon height={25}></PooTropheeIcon>}
                  rows={getBoard("trophees-asc")}
                  item={(ud) => (
                    <LeaderboardRow
                      userData={ud}
                      trailing={
                        <TextWithResourceIcon
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
                  filterIcon={<PooCoinIcon width={25}></PooCoinIcon>}
                  rows={getBoard("pooCoins-asc")}
                  item={(ud) => (
                    <LeaderboardRow
                      userData={ud}
                      trailing={
                        <TextWithResourceIcon
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
