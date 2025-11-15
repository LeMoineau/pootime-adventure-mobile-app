import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import { style } from "../../common/utils/style-utils";
import RoundedScrollView from "../../common/components/views/rounded-scroll-view/RoundedScrollView";
import PooTropheeIcon from "../../common/components/icons/resources/PooTropheeIcon";
import PooCoinIcon from "../../common/components/icons/resources/pooCoin";
import { useEffect, useState } from "react";
import LeaderboardBoard from "./elements/LeaderboardBoard";
import LeaderboardSubHeader from "./elements/LeaderboardSubHeader";
import { ItemsLeaderboardable } from "../../common/config/constants/Leaderboard";
import { Resources } from "../../common/config/constants/Resources";
import { useUserDataTable } from "../../common/hooks/firestore/use-user-data-table";
import { IdentifiedUserData } from "../../common/types/firebase/UserData";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import PooCreatureRankSubHeader from "../../common/components/misc/poo-creature/sub-headers/PooCreatureRankSubHeader";

const LEADERBOARD_TAB_INFOS = [
  {
    icon: <PooTropheeIcon height={35}></PooTropheeIcon>,
    title: "Classement par trophées",
    directionChangerIcon: <PooTropheeIcon height={25}></PooTropheeIcon>,
    leaderboardName: "trophees" as ItemsLeaderboardable,
    resource: "pooTrophee" as Resources,
  },
  {
    icon: <PooCoinIcon size={35}></PooCoinIcon>,
    title: "Classement par pooCoins",
    directionChangerIcon: <PooCoinIcon width={25}></PooCoinIcon>,
    leaderboardName: "pooCoins" as ItemsLeaderboardable,
    resource: "pooCoins" as Resources,
  },
];

export default function LeaderboardPage() {
  const { fetch, count } = useUserDataTable();
  const [leaderboards, setLeaderboards] = useState<
    {
      resource: Resources;
      items: { asc: IdentifiedUserData[]; desc: IdentifiedUserData[] };
    }[]
  >([]);
  const [leaderboardSize, setLeaderboardSize] = useState(0);

  useEffect(() => {
    count().then((size) => {
      setLeaderboardSize(size);
    });
    NavigationBar.setVisibilityAsync("visible");

    return () => {
      NavigationBar.setVisibilityAsync("hidden");
    };
  }, []);

  const handleTabChange = async (tabIndex: number) => {
    const targetResource = LEADERBOARD_TAB_INFOS[tabIndex].resource;
    const asc = await fetch({
      orderBy: {
        fieldPath: `resources.${LEADERBOARD_TAB_INFOS[tabIndex].resource}`,
        direction: "asc",
      },
    });
    const desc = await fetch({
      orderBy: {
        fieldPath: `resources.${LEADERBOARD_TAB_INFOS[tabIndex].resource}`,
        direction: "desc",
      },
    });
    setLeaderboards([
      ...leaderboards.filter((l) => l.resource !== targetResource),
      { resource: targetResource, items: { asc, desc } },
    ]);
  };

  return (
    <SafeAreaView
      edges={{ top: "off", bottom: "additive" }}
      style={[{ flex: 1 }]}
    >
      <CustomPage
        bgColor={colors.gray[100]}
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { padding: 0 },
        ]}
      >
        <View
          style={[
            style.wFull,
            { paddingTop: 20, backgroundColor: colors.baseBackgroundColor },
          ]}
        >
          <PooCreatureRankSubHeader></PooCreatureRankSubHeader>
        </View>
        <RoundedScrollView
          defaultTab={0}
          onTabChange={({ tabIndex }) => {
            handleTabChange(tabIndex);
          }}
          tabs={LEADERBOARD_TAB_INFOS.map(
            ({ icon, title, directionChangerIcon, resource }) => ({
              icon,
              content: (
                <LeaderboardBoard
                  title={title}
                  directionChangerIcon={directionChangerIcon}
                  resourceDescribed={resource}
                  leaderboardSize={leaderboardSize}
                  items={
                    leaderboards.find((l) => l.resource === resource)?.items
                  }
                ></LeaderboardBoard>
              ),
            })
          )}
        ></RoundedScrollView>
      </CustomPage>
    </SafeAreaView>
  );
}
