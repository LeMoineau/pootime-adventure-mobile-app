import { StructureCost } from "../../types/village/StructureCost";

export interface StructureProps {
  name: string;
  description: string;
  style: {
    image?: string;
    position: [number, number];
  };
  buildingCost?: StructureCost;
  upgradeCosts: StructureCost[];
  baseLevel?: number;
}

export class Structure {
  name: string;
  description: string;
  style: {
    image?: string;
    position: [number, number];
  };
  buildingCost?: StructureCost;
  upgradeCosts: StructureCost[];
  baseLevel: number;
  currentLevel: number;

  constructor({
    name,
    description,
    style,
    buildingCost,
    upgradeCosts,
    baseLevel,
  }: StructureProps) {
    this.name = name;
    this.description = description;
    this.style = style;
    this.buildingCost = buildingCost;
    this.upgradeCosts = upgradeCosts;
    this.baseLevel = baseLevel ?? (this.buildable ? 0 : 1);
    this.currentLevel = this.baseLevel;
  }

  get buildable(): boolean {
    return !!this.buildingCost;
  }

  get upgradable(): boolean {
    return this.upgradeCosts.length >= this.currentLevel - 1;
  }

  upgrade() {
    this.currentLevel += 1;
  }
}
