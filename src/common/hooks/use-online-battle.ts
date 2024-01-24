import { useEffect, useState } from "react";
import { useBattleStore } from "../stores/battle.store";
import { useImmer } from "use-immer";
import { ServerTypes } from "../types/ServerTypes";
import { usePooCreatureStatsStore } from "../stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../stores/poo-creature-style.store";

const useOnlineBattle = ({ room }: { room: ServerTypes.Room }) => {
  const {
    getSocketId,
    sendPlayerInfos,
    hit,
    spell,
    whenRoomReady,
    whenBattleBegin,
    whenBattleStateUpdated,
    whenBattleFinish,
  } = useBattleStore();
  const pooCreatureStatsStore = usePooCreatureStatsStore();
  const pooCreatureStyleStore = usePooCreatureStyleStore();

  const [advStyle, setAdvStyle] = useState<ServerTypes.PlayerStyle>();
  const [advStats, setAdvStats] = useState<ServerTypes.PlayerStats>();
  const [battleBegin, setBattleBegin] = useState<boolean>(false);
  const [battleEnding, updateBattleEnding] = useImmer<
    ServerTypes.BattleEnding | undefined
  >(undefined);

  const [advState, updateAdvState] = useImmer<
    ServerTypes.PlayerState | undefined
  >(undefined);
  const [ownState, updateOwnState] = useImmer<
    ServerTypes.PlayerState | undefined
  >(undefined);

  const socketId = getSocketId();

  useEffect(() => {
    whenRoomReady((r) => {
      for (let p of r.players) {
        if (r.battleState[p] === undefined) {
          continue;
        }
        if (p !== socketId) {
          setAdvStyle(r.battleState[p].style);
          setAdvStats(r.battleState[p].stats);
          updateAdvState(r.battleState[p].currentState);
        } else {
          updateOwnState(r.battleState[p].currentState);
        }
      }
    });

    whenBattleBegin(() => {
      setBattleBegin(true);
    });

    whenBattleStateUpdated((updates) => {
      for (let u of updates) {
        if (u.target === socketId) {
          updateOwnState((state) => {
            return { ...state, ...u.update };
          });
        } else {
          updateAdvState((state) => {
            return { ...state, ...u.update };
          });
        }
      }
    });

    whenBattleFinish((battleEnding) => {
      updateBattleEnding(battleEnding);
    });

    sendPlayerInfos({ ...pooCreatureStyleStore }, { ...pooCreatureStatsStore });
  }, [room]);

  const reset = () => {
    setBattleBegin(false);
    updateBattleEnding(undefined);
    setAdvStyle(undefined);
    setAdvStats(undefined);
    updateAdvState(undefined);
    updateOwnState(undefined);
  };

  return {
    socketId,
    advStyle,
    advStats,
    battleBegin,
    battleEnding,
    advState,
    ownState,
    hit,
    spell,
    reset,
  };
};

export default useOnlineBattle;
