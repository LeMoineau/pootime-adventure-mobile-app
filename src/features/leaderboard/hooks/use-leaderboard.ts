import { useEffect, useState } from "react";
import { useUserDataTable } from "../../../common/hooks/firestore/use-user-data-table";
import { LeaderboardDirection } from "../../../common/types/leaderboard/LeaderboardDirection";
import { IdentifiedUserData } from "../../../common/types/firebase/UserData";

export default function useLeaderboard() {
  const { fetch } = useUserDataTable();

  const [tropheesBoard, setTropheeBoard] = useState<{
    [key in LeaderboardDirection]?: IdentifiedUserData[];
  }>({});
  const [pooCoinsBoard, setPooCoinsBoard] = useState<{
    [key in LeaderboardDirection]?: IdentifiedUserData[];
  }>({});

  useEffect(() => {}, []);

  const fetchTropheesBoard = async (direction: LeaderboardDirection) => {
    if (!tropheesBoard[direction]) {
      const newBoard = await fetch({
        orderBy: { fieldPath: "resources.pooTrophee", direction },
      });
      setTropheeBoard({
        ...tropheesBoard,
        [direction]: newBoard,
      });
    }
  };

  const fetchPooCoinsBoard = async (direction: LeaderboardDirection) => {
    if (!pooCoinsBoard[direction]) {
      const newBoard = await fetch({
        orderBy: { fieldPath: "resources.pooCoins", direction },
      });
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
