import { Resources } from "../../config/constants/Resources";

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
