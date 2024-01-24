export namespace SheepJumpTypes {
  export interface Sheep {
    name: string;
    color: string;
    level: number;
    pv: number;
    attaque: number;
    freqAttaque: number;
  }

  export interface SheepState {
    currentPv: number;
    attaque: number;
    [detail: string]: any;
  }

  export interface PlayerState {
    currentPv: number;
    currentMana: number;
    attaque: number;
    recupMana: number;
    [detail: string]: any;
  }
}
