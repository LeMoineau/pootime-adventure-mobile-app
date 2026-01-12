import { useEffect, useRef, useState } from "react";
import {
  Entity,
  EntityBattleWinner,
  EntityState,
} from "../../../common/types/battle/entity-battle/EntityBattleTypes";
import { EntityBattleUtils } from "../../../common/utils/entity-battle-utils";
import { PlayerBattleState } from "../../../common/types/battle/PlayerBattleState";
import { EntityZone } from "../../../common/types/battle/entity-battle/EntityZone";
import { PooCreatureStats } from "../../../common/types/PooCreatureStats";
import { UltiDetails } from "../../../common/types/Ultis";
import { BattleReward } from "../../../common/types/battle/online-battle/BattleReward";

export default function useEntityBattle() {
  const [entity, setEntity] = useState<Entity>();
  const [currentEntityState, setCurrentEntityState] = useState<EntityState>();
  const [currentPlayerState, setCurrentPlayerState] =
    useState<PlayerBattleState>();
  const [battleBegin, setBattleBegin] = useState(false);
  const [battleFinish, setBattleFinish] = useState(false);
  const [_entityTurn, setEntityTurn] = useState(0);

  const _intervalId = useRef<number>(undefined);
  const winner = useRef<EntityBattleWinner>(undefined);
  const rewards = useRef<BattleReward>(undefined);

  useEffect(() => {
    return () => {
      clearInterval(_intervalId.current);
    };
  }, []);

  useEffect(() => {
    entityHit();
  }, [_entityTurn]);

  const startNewBattle = (zone: EntityZone, playerStats: PooCreatureStats) => {
    const entity = EntityBattleUtils.chooseEntity(zone);
    setEntity(entity);
    setCurrentEntityState({
      currentPv: entity.pv,
      attaque: entity.attaque,
    });
    setCurrentPlayerState({
      ...playerStats,
      currentPv: playerStats.pv,
      currentMana: playerStats.mana,
    });
    setTimeout(() => {
      setBattleBegin(true);
      _intervalId.current = setInterval(() => {
        setEntityTurn((turn) => turn + 1);
      }, entity.freqAttaque);
    }, 3000);
  };

  const playerHit = () => {
    const { newEntityState, newPlayerState } =
      EntityBattleUtils.calculateNewStatesFromPlayerHit(
        currentEntityState!,
        currentPlayerState!
      );
    _updateBattleState(newEntityState, newPlayerState);
  };

  const playerSpell = (ulti: UltiDetails) => {
    const { newEntityState, newPlayerState } =
      EntityBattleUtils.calculateNewStatesFromPlayerSpell(
        currentEntityState!,
        currentPlayerState!,
        ulti
      );
    _updateBattleState(newEntityState, newPlayerState);
  };

  const entityHit = () => {
    if (!currentEntityState || !currentPlayerState) return;
    const { newEntityState, newPlayerState } =
      EntityBattleUtils.calculateNewStatesFromEntityHit(
        currentEntityState,
        currentPlayerState
      );
    _updateBattleState(newEntityState, newPlayerState);
  };

  const _updateBattleState = (
    newEntityState: EntityState,
    newPlayerState: PlayerBattleState
  ) => {
    setCurrentEntityState({ ...newEntityState });
    setCurrentPlayerState({ ...newPlayerState });
    _checkVictory(newEntityState, newPlayerState);
  };

  const _checkVictory = (
    entityState: EntityState,
    playerState: PlayerBattleState
  ) => {
    if (
      !battleFinish &&
      entity &&
      (entityState.currentPv <= 0 || playerState.currentPv <= 0)
    ) {
      winner.current = playerState.currentPv <= 0 ? "entity" : "player";
      rewards.current = EntityBattleUtils.calculatePlayerRewards(
        winner.current,
        entity
      );
      setBattleFinish(true);
      clearInterval(_intervalId.current);
    }
  };

  const reset = () => {
    setEntity(undefined);
    setCurrentEntityState(undefined);
    setCurrentPlayerState(undefined);
    setBattleBegin(false);
    setBattleFinish(false);
    winner.current = undefined;
    rewards.current = undefined;
    clearInterval(_intervalId.current);
  };

  return {
    entity,
    currentEntityState,
    currentPlayerState,
    battleBegin,
    battleFinish,
    winner: winner.current,
    rewards: rewards.current,
    startNewBattle,
    playerHit,
    playerSpell,
    entityHit,
    reset,
  };
}
