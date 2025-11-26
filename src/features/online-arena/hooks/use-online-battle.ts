import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { ServerTypes } from "../../../common/types/battle/online-battle/ServerTypes";
import { SocketEvents } from "../../../common/types/SocketEvents";
import { UltiDetails } from "../../../common/types/Ultis";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import { usePooCreatureStatsStore } from "../../../common/stores/poo-creature-stats.store";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { getSocket } from "../../../common/config/socket";

const useOnlineBattle = () => {
  const socket = getSocket();
  const style = usePooCreatureStyleStore();
  const stats = usePooCreatureStatsStore();
  const { earn, get } = useResourcesStore();

  const [advStyle, setAdvStyle] = useState<ServerTypes.PlayerStyle>();
  const [advStats, setAdvStats] = useState<ServerTypes.PlayerStats>();
  const [isBattleBeginning, setIsBattleBeginning] = useState<boolean>(false);
  const [battleEnding, updateBattleEnding] = useState<
    ServerTypes.BattleEnding | undefined
  >(undefined);
  const [advState, updateAdvState] = useImmer<
    ServerTypes.PlayerState | undefined
  >(undefined);
  const [ownState, updateOwnState] = useImmer<
    ServerTypes.PlayerState | undefined
  >(undefined);

  useEffect(() => {
    socket.on(SocketEvents.ROOM_READY, _roomReady);
    socket.on(SocketEvents.BATTLE_BEGIN, _battleBegin);
    socket.on(SocketEvents.UPDATE_BATTLE_STATE, _battleStateUpdate);
    socket.on(SocketEvents.BATTLE_FINISH, _battleFinish);

    socket.emit(SocketEvents.SEND_PLAYER_INFOS, { ...style }, { ...stats });

    return () => {
      socket.off(SocketEvents.ROOM_READY, _roomReady);
      socket.off(SocketEvents.BATTLE_BEGIN, _battleBegin);
      socket.off(SocketEvents.UPDATE_BATTLE_STATE, _battleStateUpdate);
      socket.off(SocketEvents.BATTLE_FINISH, _battleFinish);
    };
  }, [socket]);

  const _roomReady = (r: ServerTypes.Room) => {
    console.log("room ready", r);
    for (let p of r.players) {
      if (r.battleState[p] === undefined) {
        continue;
      }
      if (p !== socket.id) {
        setAdvStyle(r.battleState[p].style);
        setAdvStats(r.battleState[p].stats);
        updateAdvState(r.battleState[p].currentState);
      } else {
        updateOwnState(r.battleState[p].currentState);
      }
    }
  };

  const _battleBegin = () => {
    setIsBattleBeginning(true);
  };

  const _battleStateUpdate = (updates: ServerTypes.BattleUpdatePayload) => {
    for (let u of updates) {
      if (u.target === socket.id) {
        updateOwnState((state) => {
          return { ...state, ...u.update };
        });
      } else {
        updateAdvState((state) => {
          return { ...state, ...u.update };
        });
      }
    }
  };

  const _battleFinish = (battleEnding: ServerTypes.BattleEnding) => {
    console.log("battle finish", battleEnding);
    updateBattleEnding(battleEnding);
  };

  const hit = () => {
    socket.emit(SocketEvents.HIT);
  };

  const spell = (ulti: UltiDetails) => {
    socket.emit(SocketEvents.SPELL, ulti);
  };

  const collectRewards = (rewards: ServerTypes.BattleRewards) => {
    //pour empecher la generation infini de ressource
    if (
      rewards.pooTrophees === undefined ||
      rewards.pooTrophees >= 0 ||
      get("pooTrophee") > 0
    ) {
      earn("pooCoins", rewards.pooCoins);
      if (rewards.stars) {
        earn("stars", rewards.stars);
      }
      if (rewards.pooTrophees) {
        if (get("pooTrophee") + rewards.pooTrophees < 0) {
          earn("pooTrophee", -get("pooTrophee"));
        } else {
          earn("pooTrophee", rewards.pooTrophees);
        }
      }
    }
  };

  const reset = () => {
    setIsBattleBeginning(false);
    updateBattleEnding(undefined);
    setAdvStyle(undefined);
    setAdvStats(undefined);
    updateAdvState(undefined);
    updateOwnState(undefined);
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return {
    socketId: socket.id!,
    advStyle,
    advStats,
    isBattleBeginning,
    battleEnding,
    advState,
    ownState,
    hit,
    spell,
    collectRewards,
    reset,
    disconnect,
  };
};

export default useOnlineBattle;
