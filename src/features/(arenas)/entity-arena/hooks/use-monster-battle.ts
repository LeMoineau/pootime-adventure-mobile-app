import { useEffect, useRef, useState } from "react";
import { EntityBattleWinner } from "../../../../common/types/battle/entity-battle/EntityBattleTypes";
import { BattleReward } from "../../../../common/types/battle/BattleReward";
import { Zone } from "../../../../common/models/zones/Zone";
import { Monster } from "../../../../common/models/entities/monsters/Monster";
import { MonsterState } from "../../../../common/types/battle/entities/MonsterState";
import { PlayerState } from "../../../../common/types/battle/entities/PlayerState";
import { Player } from "../../../../common/models/entities/players/Player";
import { usePooCreatureStatsStore } from "../../../../common/stores/poo-creature-stats.store";
import cloneService from "../../../../common/services/clone.service";

export default function useMonsterBattle() {
  const {
    pv,
    level,
    attaque,
    defense,
    mana,
    ultiSelected,
    resMana,
    recupMana,
  } = usePooCreatureStatsStore();
  const [currentMonsterState, setMonsterState] = useState<MonsterState>();
  const [currentPlayerState, setPlayerState] = useState<PlayerState>();
  const [battleBegin, setBattleBegin] = useState(false);
  const [battleFinish, setBattleFinish] = useState(false);
  const [_monsterTurn, setMonsterTurn] = useState(0);

  const _intervalId = useRef<number>(undefined);
  const player = useRef<Player>(undefined);
  const monster = useRef<Monster>(undefined);
  const winner = useRef<EntityBattleWinner>(undefined);
  const rewards = useRef<BattleReward>(undefined);

  useEffect(() => {
    return () => {
      clearInterval(_intervalId.current);
    };
  }, []);

  useEffect(() => {
    if (monster.current && player.current) {
      monster.current.hit(player.current);
      _updateBattleState(monster.current.toState(), player.current.toState());
    }
  }, [_monsterTurn]);

  const startNewBattle = (zone: Zone) => {
    monster.current = cloneService.cloneMonster(zone.pickMonster());
    player.current = new Player({
      name: "player",
      pv,
      level,
      attaque,
      defense,
      mana,
      ultiSelected,
      resMana,
      recupMana,
    });
    setMonsterState(monster.current.toState());
    setPlayerState(player.current.toState());
    setTimeout(() => {
      setBattleBegin(true);
      if (monster.current) {
        _intervalId.current = setInterval(() => {
          setMonsterTurn((turn) => turn + 1);
        }, monster.current.freqAttaque);
      }
    }, 3000);
  };

  const playerHit = () => {
    if (monster.current && player.current) {
      player.current.hit(monster.current);
      _updateBattleState(monster.current.toState(), player.current.toState());
    }
  };

  const playerSpell = () => {
    if (monster.current && player.current) {
      player.current.spell(monster.current);
      _updateBattleState(monster.current.toState(), player.current.toState());
    }
  };

  const _updateBattleState = (
    newEntityState: MonsterState,
    newPlayerState: PlayerState
  ) => {
    setMonsterState(newEntityState);
    setPlayerState(newPlayerState);
    _checkVictory(newEntityState, newPlayerState);
  };

  const _checkVictory = (
    entityState: MonsterState,
    playerState: PlayerState
  ) => {
    if (
      !battleFinish &&
      monster.current &&
      (entityState.currentPv <= 0 || playerState.currentPv <= 0)
    ) {
      winner.current = playerState.currentPv <= 0 ? "monster" : "player";
      rewards.current =
        winner.current === "player" ? monster.current.rewards : [];
      setBattleFinish(true);
      clearInterval(_intervalId.current);
    }
  };

  const reset = () => {
    monster.current = undefined;
    player.current = undefined;
    setMonsterState(undefined);
    setPlayerState(undefined);
    setBattleBegin(false);
    setBattleFinish(false);
    winner.current = undefined;
    rewards.current = undefined;
    clearInterval(_intervalId.current);
  };

  return {
    monster: monster.current,
    currentMonsterState,
    currentPlayerState,
    battleBegin,
    battleFinish,
    winner: winner.current,
    rewards: rewards.current,
    startNewBattle,
    playerHit,
    playerSpell,
    reset,
  };
}
