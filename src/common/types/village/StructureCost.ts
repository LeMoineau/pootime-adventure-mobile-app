import { Resources } from "../../config/game-data/Resources";

export type StructureCost = {
  [resource in Resources]?: number;
};

export type UpgradeCost = {
  cost: StructureCost;
} & UpgradeInfos;

export type UpgradeInfos = {
  fromLevel: number;
  toLevel: number;
};
