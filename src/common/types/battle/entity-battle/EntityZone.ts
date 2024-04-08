import { Entity } from "./EntityBattleTypes";

export interface EntityZone {
  name: string;
  mainColor: string;
  unlockLevel: number;
  entities: {
    entity: Entity;
    number: number;
  }[];
  nbEntities: number;
}
