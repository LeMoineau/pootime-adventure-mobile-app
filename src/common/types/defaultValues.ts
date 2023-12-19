import { colors } from "../utils/color-utils";
import { JSONObject } from "./JSONObject";

export namespace DefaultValues {
  export const PooCreatureName = "Mr. Poopoo";
  export const PooCreatureBodyColor = colors.baseBodyColor;
  export const PooFace =
    "https://bigstones.fr/pootime-adventure/expressions/smile.png";
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
  };
}
