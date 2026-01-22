import { Monster } from "../entities/monsters/Monster";

export interface ZoneProps {
  name: string;
  desc: string;
  icon: any;
  unlockLevel: number;
  style?: {
    iconHeight?: number;
    mainColor?: string;
  };
}

export class Zone {
  name: string;
  desc: string;
  icon: any;
  unlockLevel: number;
  style: {
    iconHeight?: number;
    mainColor?: string;
  };

  constructor({ name, desc, icon, unlockLevel, style = {} }: ZoneProps) {
    this.name = name;
    this.desc = desc;
    this.icon = icon;
    this.unlockLevel = unlockLevel;
    this.style = style;
  }

  /**
   * Pick a monster of the zone
   */
  pickMonster(): Monster {
    throw new Error("not implemented");
  }
}
