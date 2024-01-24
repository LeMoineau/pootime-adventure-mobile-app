import { ColorPalette } from "color-curves";
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

  export const SheepWoolPalette = new ColorPalette(
    '{"type":"back","overflow":"clamp","reverse":false,"translation":{"x":-0.817,"y":-0.182},"scale":{"x":1.753,"y":0.408},"rotation":0,"variation":"in-out","overshoot":16.15}',
    '{"type":"linear","overflow":"clamp","reverse":false,"translation":{"x":-0.33,"y":1.195},"scale":{"x":1.389,"y":-0.731},"rotation":0}',
    '{"start":0,"end":1}'
  );

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
