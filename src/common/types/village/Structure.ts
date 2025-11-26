import { StructureName } from "../../common/config/constants/Structures";
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
