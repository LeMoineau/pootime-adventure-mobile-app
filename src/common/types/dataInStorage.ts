export namespace DataInStorage {
  export interface Resources {
    stars: number;
    pooCoins: number;
  }

  export interface PooCreatureStyle {
    name: string;
    bodyColor: string;
  }

  export interface ItemsUnlocked {
    bodyColors: { [color: string]: boolean };
  }
}
