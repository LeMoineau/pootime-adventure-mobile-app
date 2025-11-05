import { useEffect, useState } from "react";
import { UserDataWithUid } from "../../types/firebase/UserData";
import { LeaderboardDirection } from "../../types/leaderboard/LeaderboardDirection";
import { useUserDataTable } from "../firestore/use-user-data-table";

export default function useLeaderboard() {
  const { fetchManyOrderBy } = useUserDataTable();

  const [tropheesBoard, setTropheeBoard] = useState<{
    [key in LeaderboardDirection]?: UserDataWithUid[];
  }>({});
  const [pooCoinsBoard, setPooCoinsBoard] = useState<{
    [key in LeaderboardDirection]?: UserDataWithUid[];
  }>({});

  useEffect(() => {}, []);

  const fetchTropheesBoard = async (direction: LeaderboardDirection) => {
    if (!tropheesBoard[direction]) {
      const newBoard = await fetchManyOrderBy(
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
      const newBoard = await fetchManyOrderBy("resources.pooCoins", direction);
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
