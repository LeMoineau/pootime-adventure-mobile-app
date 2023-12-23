import { PooCreatureStyle as Style } from "./PooCreatureStyle";
import { PooCreatureStats as Stats } from "./PooCreatureStats";

export namespace DataInStorage {
  export interface Resources {
    stars: number;
    pooCoins: number;
  }

  export interface PooCreatureStyle extends Style {}

  export interface PooCreatureStats extends Stats {}

  export interface ItemsUnlocked {
    bodyColors: { [color: string]: boolean };
    heads: { [head: string]: boolean };
    expressions: { [expression: string]: boolean };
    ultis: { [ulti: string]: boolean };
  }
}
