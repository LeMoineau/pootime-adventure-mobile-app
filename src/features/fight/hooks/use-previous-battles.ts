import { useEffect, useState } from "react";
import useStorage from "../../../common/hooks/use-storage";
import { BattleFinalState } from "../../../common/types/battle/BattleFinalState";
import { StorageKeys } from "../../../common/constants/storage-keys";

export default function usePreviousBattles() {
  const { getJson, saveJson } = useStorage();
  const [previousBattles, setPreviousBattles] = useState<BattleFinalState[]>(
    []
  );

  useEffect(() => {
    _loadPreviousBattles();
  }, []);

  const _loadPreviousBattles = () => {
    getJson(StorageKeys.PREVIOUS_BATTLES).then((res) => {
      if (res && Array.isArray(res)) {
        setPreviousBattles(res);
      }
    });
  };

  const refreshPreviousBattles = () => {
    _loadPreviousBattles();
  };

  const pushPreviousBattle = (newBattle: BattleFinalState) => {
    saveJson(StorageKeys.PREVIOUS_BATTLES, [newBattle, ...previousBattles]);
    setPreviousBattles([newBattle, ...previousBattles]);
  };

  return { previousBattles, refreshPreviousBattles, pushPreviousBattle };
}
