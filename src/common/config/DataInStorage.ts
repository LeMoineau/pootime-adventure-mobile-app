import { PooCreatureStyle as Style } from "../../types/PooCreatureStyle";
import { PooCreatureStats as Stats } from "../../types/PooCreatureStats";
import { StructureName } from "./constants/Structures";
import {
  StructureDetail,
  StructureDetailName,
} from "../../types/village/StructureDetail";

export namespace DataInStorage {
  export interface PooCreatureStyle extends Style {}

  export interface PooCreatureStats extends Stats {}

  export interface ItemsUnlocked {
    bodyColors: string[];
    heads: string[];
    expressions: string[];
    events: string[];
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
