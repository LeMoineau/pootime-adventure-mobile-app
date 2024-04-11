import { StructureName } from "../../config/game-data/Structures";
import { Resources } from "../../config/game-data/Resources";
import { StructureCost, UpgradeCost } from "./StructureCost";

export interface Structure {
  type: StructureName;
  name: string;
  description: string;
  style: {
    image?: string;
    position: StructurePosition;
  };
  buildingCost?: StructureCost;
  upgradeCosts: UpgradeCost[];
  baseLevel?: number;
}

export type StructurePosition = [number, number];
