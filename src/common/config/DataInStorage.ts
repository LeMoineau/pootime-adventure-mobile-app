import { PooCreatureStyle as Style } from "./../types/PooCreatureStyle";
import { PooCreatureStats as Stats } from "./../types/PooCreatureStats";
import { StructureName } from "./game-data/Structures";
import {
  StructureDetail,
  StructureDetailName,
} from "../types/village/StructureDetail";

export namespace DataInStorage {
  export interface Resources {
    stars: number;
    pooCoins: number;
    wool: number;
  }

  export interface PooCreatureStyle extends Style {}

  export interface PooCreatureStats extends Stats {}

  export interface ItemsUnlocked {
    bodyColors: { [color: string]: boolean };
    heads: { [head: string]: boolean };
    expressions: { [expression: string]: boolean };
    ultis: { [ulti: string]: boolean };
    events: { [event: string]: boolean };
    options: { [option: string]: any };
  }

  export type Village = {
    name: string;
    structures: {
      [structureName in StructureName]: Structure;
    };
  };

  export type Structure = {
    level: number;
    details: { [detail in StructureDetailName]?: StructureDetail };
  };
}
