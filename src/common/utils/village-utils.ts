import { StructureName, Structures } from "../config/game-data/Structures";
import { Resources } from "../config/game-data/Resources";
import { Structure } from "../types/village/Structure";
import { UpgradeCost } from "../types/village/StructureCost";
import { BattleReward } from "../types/battle/online-battle/BattleReward";

export namespace VillageUtils {
  export function getUpgradeCostOf(
    structureName: StructureName,
    currentLevel: number
  ): UpgradeCost | undefined {
    return Structures[structureName].upgradeCosts.find(
      (c) => c.fromLevel === currentLevel
    );
  }

  export function hasUpgradeFrom(
    structureName: StructureName,
    currentLevel: number
  ): boolean {
    return getUpgradeCostOf(structureName, currentLevel) !== undefined;
  }

  export function iterateOnUpgradeCostOf(
    structureName: StructureName,
    currentLevel: number
  ): [Resources, number][] {
    const cost = getUpgradeCostOf(structureName, currentLevel);
    if (!cost) return [];
    return Object.keys(cost.cost).map((r) => [
      r as Resources,
      cost.cost[r as Resources]!,
    ]);
  }

  export function getStructureData(structureName: StructureName): Structure {
    return Structures[structureName];
  }

  export function calculateToiletRewards(
    elapsedTime: number,
    toiletLevel: number
  ): BattleReward {
    let starEarn = 0;
    let pooCoinsEarn = 0;
    const limitMax = 2000 + 500 * (toiletLevel - 1);
    if (elapsedTime > 1 * 60) {
      pooCoinsEarn = Math.round((50 * toiletLevel * elapsedTime) / 60);
      starEarn = toiletLevel >= 5 ? 2 : 1;
    }
    return [
      { resource: "stars", number: starEarn },
      {
        resource: "pooCoins",
        number: pooCoinsEarn > limitMax ? limitMax : pooCoinsEarn,
      },
    ];
  }
}
