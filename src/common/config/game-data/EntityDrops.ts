import { Entity } from "../../types/battle/entity-battle/EntityBattleTypes";
import { BattleReward } from "../../types/battle/online-battle/BattleReward";
import { EntityType } from "./EntityTypes";

export const EntityDrops: {
  [entity in EntityType]: (entity: Entity) => BattleReward;
} = {
  sheep: (e) => [
    { resource: "wool", number: 100 + e.level * 10 },
    { resource: "pooCoins", number: 50 + e.level * 5 },
  ],
  "god-poulpe": (e) => [
    { resource: "ink", number: 500 },
    { resource: "cosmicPowder", number: 20 },
  ],
  "horror-mask": (e) => [
    { resource: "glass", number: 500 },
    { resource: "cosmicPowder", number: 5 },
  ],
  gremlins: (e) => [
    { resource: "cosmicPowder", number: 2 },
    { resource: "pooCoins", number: 150 + e.level * 10 },
  ],
  pingoo: (e) => [
    { resource: "snow", number: 100 + e.level * 5 },
    { resource: "glass", number: 20 + e.level * 3 },
  ],
  poulpe: (e) => [{ resource: "ink", number: 100 + e.level * 10 }],
  tank: (e) => [
    { resource: "metal", number: 50 + e.level * 5 },
    { resource: "glass", number: 5 + e.level * 3 },
  ],
};
