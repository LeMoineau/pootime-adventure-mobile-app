import { create } from "zustand";
import { UltiDetails } from "../../types/Ultis";
import { BattleReward } from "../../types/battle/online-battle/BattleReward";
import {
  Entity,
  EntityBattleWinner,
  EntityState,
} from "../../types/battle/entity-battle/EntityBattleTypes";
import { EntityBattleUtils } from "../../utils/entity-battle-utils";
import { PlayerBattleState } from "../../types/battle/PlayerBattleState";
import { PooCreatureStats } from "../../types/PooCreatureStats";
import { EntityZone } from "../../types/battle/entity-battle/EntityZone";

type Store = {
  entity?: Entity;
  currentEntityState?: EntityState;
  currentPlayerState?: PlayerBattleState;
  battleBegin: boolean;
  battleFinish: boolean;
  winner: EntityBattleWinner | undefined;
  rewards: BattleReward | undefined;
  startNewBattle: (zone: EntityZone, playerStats: PooCreatureStats) => void;
  playerHit: () => void;
  playerSpell: (ulti: UltiDetails) => void;
  entityHit: () => void;
  reset: () => void;
};

const useEntityBattleStore = create<Store>((set, get) => {
  let _intervalId: NodeJS.Timeout | undefined = undefined;

  const startNewBattle = (zone: EntityZone, playerStats: PooCreatureStats) => {
    set({
      entity: EntityBattleUtils.chooseEntity(zone),
    });
    set({
      currentEntityState: {
        currentPv: get().entity!.pv,
        attaque: get().entity!.attaque,
      },
      currentPlayerState: {
        ...playerStats,
        currentPv: playerStats.pv,
      },
    });
    setTimeout(() => {
      set({ battleBegin: true });
      _intervalId = setInterval(() => {
        entityHit();
      }, get().entity!.freqAttaque);
    }, 3000);
  };

  const playerHit = () => {
    const { newEntityState, newPlayerState } =
      EntityBattleUtils.calculateNewStatesFromPlayerHit(
        get().currentEntityState!,
        get().currentPlayerState!
      );
    set({
      currentEntityState: newEntityState,
      currentPlayerState: newPlayerState,
    });
    _checkVictory();
  };

  const playerSpell = (ulti: UltiDetails) => {
    const { newEntityState, newPlayerState } =
      EntityBattleUtils.calculateNewStatesFromPlayerSpell(
        get().currentEntityState!,
        get().currentPlayerState!,
        ulti
      );
    set({
      currentEntityState: newEntityState,
      currentPlayerState: newPlayerState,
    });
    _checkVictory();
  };

  const entityHit = () => {
    const { newEntityState, newPlayerState } =
      EntityBattleUtils.calculateNewStatesFromEntityHit(
        get().currentEntityState!,
        get().currentPlayerState!
      );
    set({
      currentEntityState: newEntityState,
      currentPlayerState: newPlayerState,
    });
    _checkVictory();
  };

  const _checkVictory = () => {
    if (
      get().currentEntityState!.currentPv <= 0 ||
      get().currentPlayerState!.currentPv <= 0
    ) {
      set({
        winner: get().currentPlayerState!.currentPv <= 0 ? "entity" : "player",
      });
      set({
        rewards: EntityBattleUtils.calculatePlayerRewards(
          get().winner!,
          get().entity!
        ),
        battleFinish: true,
      });
      _intervalId && clearInterval(_intervalId);
    }
  };

  const reset = () => {
    set({
      entity: undefined,
      currentEntityState: undefined,
      currentPlayerState: undefined,
      battleBegin: false,
      battleFinish: false,
      winner: undefined,
      rewards: undefined,
    });
  };

  return {
    sheep: undefined,
    currentEntityState: undefined,
    currentPlayerState: undefined,
    battleBegin: false,
    battleFinish: false,
    winner: undefined,
    rewards: undefined,
    startNewBattle,
    playerHit,
    playerSpell,
    entityHit,
    reset,
  };
});

export default useEntityBattleStore;
