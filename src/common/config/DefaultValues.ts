import { colors } from "../utils/color-utils";
import { DataInStorage } from "../types/dataInStorage";

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

  //ItemUnlocked
  export const ItemsUnlocked: DataInStorage.ItemsUnlocked = {
    bodyColors: {},
    heads: {},
    expressions: {},
    ultis: {},
    events: {},
  };

  //UI
  export const MaxNameCharacters = 10;
}
