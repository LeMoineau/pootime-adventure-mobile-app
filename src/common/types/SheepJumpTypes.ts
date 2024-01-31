import { colors } from "../utils/color-utils";

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

  export const SheepNames = [
    "Cheap",
    "A Sheep",
    "B Sheep",
    "Sans Nom",
    "Perdu",
    "X2000 Cyborg",
    "MoutMout",
    "Ton Mou",
  ];

  export const Audrey: Sheep = {
    name: "Audrey",
    color: colors.yellow[300],
    level: 100,
    pv: 9999999,
    attaque: 99999999,
    freqAttaque: 5000,
  };
}
