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

  export interface PooCreatureStats {
    level: number;
    currentExp: number;
    attaque: number;
    defense: number;
    pv: number;
    mana: number;
    resMana: number;
    recupMana: number;
    ultiSelected: string;
  }

  export interface ItemsUnlocked {
    bodyColors: { [color: string]: boolean };
    expressions: { [expression: string]: boolean };
    ultis: { [ulti: string]: boolean };
  }
}
