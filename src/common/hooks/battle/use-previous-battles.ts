import { useEffect, useState } from "react";
import useStorage from "../use-storage";
import { StorageKeys } from "../../config/StorageKeys";

export default function usePreviousBattles() {
  const { getJson, saveJson } = useStorage();
  const [previousBattles, setPreviousBattles] = useState<any[]>([]);

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

  return { previousBattles, refreshPreviousBattles };
}
