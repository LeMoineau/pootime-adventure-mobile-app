import { colors } from "../utils/color-utils";
import { JSONObject } from "../types/JSONObject";

export namespace DefaultValues {
  //Style
  export const PooCreatureName = "Mr. Poopoo";
  export const PooCreatureBodyColor = colors.baseBodyColor;
  export const PooHead = "classic";
  export const PooFace =
    "https://bigstones.fr/pootime-adventure/expressions/smile.png";

  //Stats
  export const Level = 1;
  export const CurrentExp = 0;
  export const Attaque = 1;
  export const Defense = 1;
  export const PV = 20;
  export const Mana = 0;
  export const ResMana = 0;
  export const RecupMana = 0;
  export const PooCreatureStats: JSONObject = {
    level: Level,
    currentExp: CurrentExp,
    attaque: Attaque,
    defense: Defense,
    pv: PV,
    mana: Mana,
    resMana: ResMana,
    recupMana: RecupMana,
    ultiSelected: "",
  };

  //PooHeadColor
  export const LevelMax = 20;
  export const ColorCurveSaturation = 100;
  export const ColorCurveLightnesse = 69;
  export const PooHeadColor = "#c8a000";

  //Resources
  export const Star = 5;
  export const PooCoins = 250;
}
