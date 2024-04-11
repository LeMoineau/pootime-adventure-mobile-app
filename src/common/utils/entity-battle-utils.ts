import { EntityDrops } from "../config/game-data/EntityDrops";
import {
  Entity,
  EntityBattleWinner,
  EntityState,
} from "../types/battle/entity-battle/EntityBattleTypes";
import { EntityZone } from "../types/battle/entity-battle/EntityZone";
import { BattleReward } from "../types/battle/online-battle/BattleReward";
import { PlayerBattleState } from "../types/battle/PlayerBattleState";
import { UltiDetails } from "../types/Ultis";
import { MathUtils } from "./math-utils";

export namespace EntityBattleUtils {
  export function chooseEntity(zone: EntityZone): Entity {
    const choseEntityIndex = MathUtils.getRandomInt(zone.nbEntities);
    let currentIndex = 0;
    for (let e of zone.entities) {
      if (
        currentIndex <= choseEntityIndex &&
        currentIndex + e.number > choseEntityIndex
      )
        return e.entity;
      currentIndex += e.number;
    }
    return zone.entities[1].entity;
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
    if (winner === "player") {
      if (entity.rewards) {
        return entity.rewards;
      }
      return EntityDrops[entity.entityType](entity);
    } else {
      return [];
    }
  }
}
