import { useEffect, useState } from "react";
import { useUserData } from "../firebase/use-user-data";
import UserData, { UserDataWithUid } from "../../types/firebase/UserData";
import { LeaderboardDirection } from "../../types/leaderboard/LeaderboardDirection";
import { ItemsLeaderboardable } from "../../config/game-data/Leaderboard";
import { LeaderboardName } from "../../types/leaderboard/LeaderboardName";

export default function useLeaderboard() {
  const { getUserDatasOrderBy } = useUserData();

  const [boards, setBoards] = useState<{ [key: string]: any }>({});

  useEffect(() => {}, []);

  const fetch = async (
    board: ItemsLeaderboardable,
    direction: LeaderboardDirection
  ) => {
    const boardKey = `${board}-${direction}`;
    if (!boards[boardKey]) {
      const newBoard = await getUserDatasOrderBy(
        board === "trophees" ? "resources.pooTrophee" : "resources.pooCoins",
        direction
      );
      setBoards({
        ...boards,
        [boardKey]: newBoard,
      });
    }
  };

  const getBoard = (board: LeaderboardName): UserDataWithUid[] => {
    return boards[board] || [];
  };

  return { boards, getBoard, fetch };
}
