import { DefaultValues } from "../config/DefaultValues";
import Entities from "../config/game-data/Entities";
import {
  Entity,
  EntityBattleWinner,
  EntityState,
} from "../types/battle/entity-battle/EntityBattleTypes";
import { BattleReward } from "../types/battle/online-battle/BattleReward";
import { PlayerBattleState } from "../types/battle/PlayerBattleState";
import { UltiDetails } from "../types/Ultis";
import { MathUtils } from "./math-utils";

export namespace EntityBattleUtils {
  export function chooseEntity(): Entity {
    const choseEntityIndex = MathUtils.getRandomInt(Entities.nbEntities);
    let currentIndex = 0;
    for (let e of Entities.entities) {
      if (currentIndex === choseEntityIndex) return e.entity;
      currentIndex += e.number;
    }
    return Entities.entities[0].entity;
  }

  export function calculateNewStatesFromPlayerHit(
    entityState: EntityState,
    playerState: PlayerBattleState
  ): {
    newEntityState: EntityState;
    newPlayerState: PlayerBattleState;
  } {
    if (playerState.rage) {
      playerState.rage -= 1;
      if (playerState.rage <= 0) {
        delete playerState["rage"];
      }
    }
    return {
      newEntityState: {
        ...entityState,
        currentPv:
          entityState.currentPv -
          (playerState.rage ? playerState.attaque * 2 : playerState.attaque),
      },
      newPlayerState: {
        ...playerState,
        currentMana: playerState.currentMana + playerState.recupMana,
      },
    };
  }

  export function calculateNewStatesFromPlayerSpell(
    entityState: EntityState,
    playerState: PlayerBattleState,
    ulti: UltiDetails
  ): {
    newEntityState: EntityState;
    newPlayerState: PlayerBattleState;
  } {
    if (ulti.rage) {
      playerState.rage = ulti.rage;
    }
    return {
      newEntityState: {
        ...entityState,
        currentPv: ulti.damage
          ? entityState.currentPv - ulti.damage
          : entityState.currentPv,
      },
      newPlayerState: {
        ...playerState,
        currentMana: playerState.currentMana - ulti.mana,
      },
    };
  }

  export function calculateNewStatesFromEntityHit(
    entityState: EntityState,
    playerState: PlayerBattleState
  ): {
    newEntityState: EntityState;
    newPlayerState: PlayerBattleState;
  } {
    return {
      newEntityState: {
        ...entityState,
      },
      newPlayerState: {
        ...playerState,
        currentPv:
          playerState.currentPv - entityState.attaque / playerState.defense,
      },
    };
  }

  export function calculatePlayerRewards(
    winner: EntityBattleWinner,
    entity: Entity
  ): BattleReward {
    if (winner) {
      let rewards: BattleReward = [];
      rewards.push({ resource: "pooCoins", number: 100 + entity.level * 5 });
      if (entity.entityType === "sheep") {
        rewards.push({ resource: "wool", number: 100 + entity.level * 10 });
      }
      return rewards;
    } else {
      return [];
    }
  }
}
