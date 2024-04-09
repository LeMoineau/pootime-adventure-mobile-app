import { Resources } from "../Resources";

export interface Structure {
  name: string;
  style: {
    image?: string;
    position: StructurePosition;
    size: number;
  };
  buildingCost: StructureCost;
}

export type StructurePosition = [number, number];

export type StructureCost = {
  [resource in Resources]?: number;
};
