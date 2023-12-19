export namespace DataInStorage {
  export interface Resources {
    stars: number;
    pooCoins: number;
  }

  export interface PooCreatureStyle {
    name: string;
    bodyColor: string;
    expression: string;
    head: string;
  }

  export interface ItemsUnlocked {
    bodyColors: { [color: string]: boolean };
    expressions: { [expression: string]: boolean };
  }
}
