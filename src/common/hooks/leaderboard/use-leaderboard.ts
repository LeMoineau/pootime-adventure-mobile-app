import { useEffect, useState } from "react";
import { useUserData } from "../firebase/use-user-data";
import { UserDataWithUid } from "../../types/firebase/UserData";
import { LeaderboardDirection } from "../../types/leaderboard/LeaderboardDirection";

export default function useLeaderboard() {
  const { getUserDatasOrderBy } = useUserData();

  const [tropheesBoard, setTropheeBoard] = useState<{
    [key in LeaderboardDirection]?: UserDataWithUid[];
  }>({});
  const [pooCoinsBoard, setPooCoinsBoard] = useState<{
    [key in LeaderboardDirection]?: UserDataWithUid[];
  }>({});

  useEffect(() => {}, []);

  const fetchTropheesBoard = async (direction: LeaderboardDirection) => {
    if (!tropheesBoard[direction]) {
      const newBoard = await getUserDatasOrderBy(
        "resources.pooTrophee",
        direction
      );
      setTropheeBoard({
        ...tropheesBoard,
        [direction]: newBoard,
      });
    }
  };

  const fetchPooCoinsBoard = async (direction: LeaderboardDirection) => {
    if (!pooCoinsBoard[direction]) {
      const newBoard = await getUserDatasOrderBy(
        "resources.pooCoins",
        direction
      );
      setPooCoinsBoard({
        ...pooCoinsBoard,
        [direction]: newBoard,
      });
    }
  };

  return {
    pooCoinsBoard,
    tropheesBoard,
    fetchTropheesBoard,
    fetchPooCoinsBoard,
  };
}
