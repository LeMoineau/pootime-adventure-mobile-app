import { StructureName, Structures } from "../config/game-data/Structures";
import { Resources } from "../config/game-data/Resources";
import { Structure } from "../types/village/Structure";
import { UpgradeCost } from "../types/village/StructureCost";

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
}
