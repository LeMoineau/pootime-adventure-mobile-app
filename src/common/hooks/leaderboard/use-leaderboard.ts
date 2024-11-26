import { useEffect, useState } from "react";
import { useUserData } from "../firebase/use-user-data";
import UserData from "../../types/firebase/UserData";

export default function useLeaderboard() {
  const { getUserDatasOrderBy } = useUserData();

  const [boards, setBoards] = useState<{ [key: string]: any }>({});

  useEffect(() => {}, []);

  const fetch = async (
    board: "trophees" | "pooCoins",
    direction: "asc" | "desc"
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

  const getBoard = (
    board: "trophees-asc" | "trophees-desc" | "pooCoins-asc" | "pooCoins-desc"
  ): UserData[] => {
    return boards[board] || [];
  };

  return { boards, getBoard, fetch };
}
