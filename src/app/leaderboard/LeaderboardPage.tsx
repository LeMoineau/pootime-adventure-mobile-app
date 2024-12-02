import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import { style } from "../../common/utils/style-utils";
import LeaderboardRow from "./elements/LeaderboardRow";
import RoundedScrollView from "../../common/components/views/rounded-scroll-view/RoundedScrollView";
import PooTropheeIcon from "../../common/components/icons/resources/PooTropheeIcon";
import PooCoinIcon from "../../common/components/icons/resources/pooCoin";
import useLeaderboard from "../../common/hooks/leaderboard/use-leaderboard";
import { useEffect, useState } from "react";
import LeaderboardBoard from "./elements/LeaderboardBoard";
import TextWithResourceIcon from "../../common/components/text/TextWithResourceIcon";
import { LeaderboardDirection } from "../../common/types/leaderboard/LeaderboardDirection";
import LeaderboardSubHeader from "./elements/LeaderboardSubHeader";
import { ItemsLeaderboardable } from "../../common/config/game-data/Leaderboard";
import { Resources } from "../../common/config/game-data/Resources";

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
        <LeaderboardSubHeader></LeaderboardSubHeader>
        <RoundedScrollView
          defaultTab={0}
          tabs={[
            {
              icon: <PooTropheeIcon height={35}></PooTropheeIcon>,
              title: "Classement par trophées",
              filterIcon: <PooTropheeIcon height={25}></PooTropheeIcon>,
              leaderboardName: "trophees" as ItemsLeaderboardable,
              resource: "pooTrophee" as Resources,
            },
            {
              icon: <PooCoinIcon height={35}></PooCoinIcon>,
              title: "Classement par pooCoins",
              filterIcon: <PooCoinIcon height={25}></PooCoinIcon>,
              leaderboardName: "pooCoins" as ItemsLeaderboardable,
              resource: "pooCoins" as Resources,
            },
          ].map(
            (
              { icon, title, filterIcon, leaderboardName, resource },
              index
            ) => ({
              icon,
              content: (
                <LeaderboardBoard
                  title={title}
                  boardDirection={boardsDirection[index]}
                  filterIcon={filterIcon}
                  onFilterPress={async (direction) => {
                    fetch(leaderboardName, direction).then(() => {
                      const newDirections: [
                        LeaderboardDirection,
                        LeaderboardDirection
                      ] = [...boardsDirection];
                      newDirections[index] = direction;
                      setBoardsDirection(newDirections);
                    });
                  }}
                  rows={getBoard(
                    `${leaderboardName}-${boardsDirection[index]}`
                  )}
                  item={(ud, index) => (
                    <LeaderboardRow
                      userData={ud}
                      key={index}
                      trailing={
                        <TextWithResourceIcon
                          key={`trophees-item-${index}`}
                          resource={resource}
                          text={ud.resources[resource]}
                          fontSize={20}
                          textStyle={[{ fontWeight: "500" }]}
                        ></TextWithResourceIcon>
                      }
                    ></LeaderboardRow>
                  )}
                ></LeaderboardBoard>
              ),
            })
          )}
        ></RoundedScrollView>
      </CustomPage>
    </>
  );
}
