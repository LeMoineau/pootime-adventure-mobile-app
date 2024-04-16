import { colors } from "../utils/color-utils";
import { ColorPalette } from "color-curves";
import { Inventory } from "../types/resources/Inventory";
import { DataInStorage } from "./DataInStorage";

export namespace DefaultValues {
  //Style
  export const PooCreatureStyle: DataInStorage.PooCreatureStyle = {
    name: "Mr. Poopoo",
    bodyColor: colors.baseBodyColor,
    head: "classic",
    expression: "https://bigstones.fr/pootime-adventure/expressions/smile.png",
  };

  //Stats
  export const PooCreatureStats: DataInStorage.PooCreatureStats = {
    level: 1,
    currentExp: 0,
    attaque: 1,
    defense: 1,
    pv: 20,
    mana: 0,
    resMana: 0,
    recupMana: 0,
    ultiSelected: "",
  };

  //PooHeadColor
  export const LevelMax = 20;
  export const ColorCurveSaturation = 100;
  export const ColorCurveLightnesse = 69;
  export const PooHeadColor = "#c8a000";

  //Resources
  export const Resources: DataInStorage.Resources = {
    stars: 5,
    pooCoins: 250,
    wool: 0,
  };
  export const Inventory: Inventory = {
    stars: 5,
    pooCoins: 250,
    wool: 0,
    snow: 0,
    metal: 0,
    glass: 0,
    ink: 0,
    cosmicPowder: 0,
  };

  //ItemUnlocked
  export const ItemsUnlocked: DataInStorage.ItemsUnlocked = {
    bodyColors: {},
    heads: {},
    expressions: {},
    ultis: {},
    events: {},
    options: { dev: false },
  };

  //UI
  export const MaxNameCharacters = 10;

  //Color Palette
  export const SheepWoolPalette = new ColorPalette(
    '{"type":"back","overflow":"clamp","reverse":false,"translation":{"x":-0.817,"y":-0.182},"scale":{"x":1.753,"y":0.408},"rotation":0,"variation":"in-out","overshoot":16.15}',
    '{"type":"linear","overflow":"clamp","reverse":false,"translation":{"x":-0.33,"y":1.195},"scale":{"x":1.389,"y":-0.731},"rotation":0}',
    '{"start":0,"end":1}'
  );
  export const PooHeadPalette = new ColorPalette(
    '{"type":"arc","overflow":"clamp","reverse":false,"translation":{"x":0,"y":0},"scale":{"x":1,"y":1},"rotation":6.66,"angleStart":0,"angleEnd":6.283,"angleOffset":0,"radius":0.5}',
    '{"type":"linear","overflow":"clamp","reverse":false,"translation":{"x":-0.025,"y":0.624},"scale":{"x":1.078,"y":0.007},"rotation":0}',
    '{"start":0,"end":1}'
  );

  export const VillageName = "Poo Land";

  export const Village: DataInStorage.Village = {
    name: VillageName,
    structures: {
      toilet: { level: 1, details: {} },
      yaris: { level: 1, details: {} },
    },
  };
}
