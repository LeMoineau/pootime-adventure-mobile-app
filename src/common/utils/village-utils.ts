import { Structure } from "../types/village/Structure";
import { UpgradeCost } from "../types/village/StructureCost";
import { BattleReward } from "../types/battle/BattleReward";
import { StructureName, Structures } from "../config/constants/Structures";
import { Resources } from "../config/constants/Resources";

export namespace VillageUtils {
  export function getUpgradeCostOf(
    structureName: StructureName,
    currentLevel: number,
  ): UpgradeCost | undefined {
    return Structures[structureName].upgradeCosts.find(
      (c) => c.fromLevel === currentLevel,
    );
  }

  export function hasUpgradeFrom(
    structureName: StructureName,
    currentLevel: number,
  ): boolean {
    return getUpgradeCostOf(structureName, currentLevel) !== undefined;
  }

  export function iterateOnUpgradeCostOf(
    structureName: StructureName,
    currentLevel: number,
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
    toiletLevel: number,
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

  export function calculateYarisRewards(
    elapsedTime: number,
    yarisLevel: number,
  ): BattleReward {
    const calculateResourceReward = (
      value: number,
      resource: Resources,
    ): number => {
      return value > maxValues[resource]! ? maxValues[resource]! : value;
    };
    const maxValues: { [resource in Resources]?: number } = {
      pooCoins: 5000 + 500 * (yarisLevel - 1),
      wool: 6000 + 500 * (yarisLevel - 1),
      metal: 3000 + 500 * (yarisLevel - 1),
      snow: 3000 + 500 * (yarisLevel - 1),
      glass: 200 + 200 * (yarisLevel - 3),
      ink: 500 + 500 * (yarisLevel - 3),
      cosmicPowder: 30 + 20 * (yarisLevel - 4),
    };

    const elapsedMin = Math.floor(elapsedTime / 60000);
    if (elapsedMin < 15) return [];
    let rewards: BattleReward = [];

    rewards.push({
      resource: "pooCoins",
      number: calculateResourceReward(elapsedMin * 60, "pooCoins"),
    });
    rewards.push({
      resource: "wool",
      number: calculateResourceReward(elapsedMin * 40, "wool"),
    });
    rewards.push({
      resource: "metal",
      number: calculateResourceReward(elapsedMin * 7, "metal"),
    });
    rewards.push({
      resource: "snow",
      number: calculateResourceReward(elapsedMin * 10, "snow"),
    });
    if (yarisLevel >= 3) {
      rewards.push({
        resource: "glass",
        number: calculateResourceReward(elapsedMin * 10, "glass"),
      });
      rewards.push({
        resource: "ink",
        number: calculateResourceReward(elapsedMin * 15, "ink"),
      });
    }
    if (yarisLevel >= 4) {
      rewards.push({
        resource: "cosmicPowder",
        number: calculateResourceReward(elapsedMin * 2, "cosmicPowder"),
      });
    }
    return rewards;
  }
}
