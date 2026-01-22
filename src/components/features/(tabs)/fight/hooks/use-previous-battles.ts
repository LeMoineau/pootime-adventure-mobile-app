import { useEffect, useState } from "react";
import useStorage from "../../../../../hooks/common/use-storage";
import { BattleFinalState } from "../../../../../types/battle/BattleFinalState";
import { StorageKeys } from "../../../../../constants/storage-keys";

export default function usePreviousBattles(props?: {
  maxPreviousBattleSize: number;
}) {
  const { getJson, saveJson } = useStorage();
  const [previousBattles, setPreviousBattles] = useState<BattleFinalState[]>(
    [],
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
    let newList = [newBattle, ...previousBattles];
    if (
      props?.maxPreviousBattleSize !== undefined &&
      previousBattles.length >= props.maxPreviousBattleSize
    ) {
      newList = newList.splice(0, props.maxPreviousBattleSize);
    }
    saveJson(StorageKeys.PREVIOUS_BATTLES, newList);
    setPreviousBattles(newList);
  };

  return { previousBattles, refreshPreviousBattles, pushPreviousBattle };
}
