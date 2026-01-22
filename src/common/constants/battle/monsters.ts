import { GodPoulpe } from "../../../models/entities/monsters/GodPoulpe";
import { Gremlins } from "../../../models/entities/monsters/Gremlins";
import { HorrorMask } from "../../../models/entities/monsters/HorrorMask";
import { Pingoo } from "../../../models/entities/monsters/Pingoo";
import { Poulpe } from "../../../models/entities/monsters/Poulpe";
import { Sheep } from "../../../models/entities/monsters/Sheep";
import { Tank } from "../../../models/entities/monsters/Tank";
import { colors } from "../../../utils/color-utils";

/**
const xpNeededForNextLevel = (l) => {return Math.round(1.5 + l * 1.2)}
const starAvailable = (l) => {
    let starsRemaining = 0;
    for (let i = 1; i < l; i++) {
      starsRemaining += xpNeededForNextLevel(i);
    }
    return [starsRemaining, starsRemaining + xpNeededForNextLevel(l) - 1];
}
*/

/**
Default stats:
    pv: 20,
    attaque: 1,
    defense: 1,
    mana: 0,
    resMana: 0,
    recupMana: 0,
 */

export const monsters = [
  new Sheep({
    name: "Audrey",
    pv: 9999999,
    attaque: 9999999,
    defense: 99999999,
    mana: 99999999,
    recupMana: 99999999,
    resMana: 99999999,
    color: colors.yellow[300],
    freqAttaque: 5000,
    rewards: [
      { resource: "wool", number: 10000 },
      { resource: "pooCoins", number: 10000 },
      { resource: "stars", number: 10 },
    ],
  }),
  new Sheep({
    name: "Cheap",
    pv: 20,
    attaque: 2,
    defense: 2,
    color: colors.yellow[100],
    freqAttaque: 1000,
  }),
  new Sheep({
    name: "A Sheep",
    pv: 30,
    attaque: 3,
    defense: 3,
    color: colors.green[300],
    freqAttaque: 500,
  }),
  new Sheep({
    name: "B Sheep",
    pv: 60,
    attaque: 3,
    defense: 2,
    color: colors.green[500],
    freqAttaque: 1500,
  }),
  new Sheep({
    name: "Perdu",
    pv: 60,
    attaque: 10,
    defense: 2,
    color: colors.gray[50],
    freqAttaque: 2500,
  }),
  new Sheep({
    name: "Sans Nom",
    pv: 50,
    attaque: 3,
    defense: 2,
    color: colors.white,
    freqAttaque: 1000,
  }),
  new Sheep({
    name: "X2000 Cyborg",
    pv: 100,
    attaque: 5,
    color: colors.gray[500],
    freqAttaque: 200,
    rewards: [
      { resource: "wool", number: 2 },
      { resource: "metal", number: 10 },
    ],
  }),
  new Sheep({
    name: "MoutMout",
    pv: 40,
    attaque: 5,
    defense: 3,
    color: colors.red[400],
    freqAttaque: 1000,
  }),
  new GodPoulpe({
    name: "LouisLePoulpe",
    level: 100,
    pv: 750,
    attaque: 50,
    defense: 50,
    mana: 100,
    recupMana: 40,
    resMana: 50,
    freqAttaque: 1000,
  }),
  new Pingoo({
    name: "AgentPingoo",
    pv: 500,
    attaque: 50,
    resMana: 50,
    freqAttaque: 1000,
    rewards: [
      { resource: "snow", number: 500 },
      { resource: "glass", number: 100 },
    ],
  }),
  new Pingoo({
    name: "RenéDu78",
    pv: 75,
    attaque: 25,
    freqAttaque: 1500,
  }),
  new Tank({
    name: "B.N.Tank",
    pv: 100,
    attaque: 50,
    defense: 10,
    freqAttaque: 2000,
  }),
  new Pingoo({
    name: "ClubPinguin",
    pv: 65,
    attaque: 5,
    resMana: 10,
    freqAttaque: 1250,
  }),
  new Tank({
    name: "Franky",
    pv: 150,
    attaque: 10,
    defense: 10,
    resMana: 10,
    freqAttaque: 500,
  }),
  new Pingoo({
    name: "GrosNez!",
    pv: 85,
    attaque: 25,
    defense: 3,
    resMana: 10,
    freqAttaque: 1000,
  }),
  new Tank({
    name: "Tankky",
    sad: true,
    level: 1,
    attaque: 10000,
    freqAttaque: 5000,
    rewards: [{ resource: "metal", number: 1 }],
  }),
  new Tank({
    name: "Tankker",
    pv: 200,
    attaque: 10,
    defense: 20,
    freqAttaque: 500,
  }),
  new Gremlins({
    name: "Gremlins",
    pv: 165,
    attaque: 30,
    resMana: 5,
    freqAttaque: 750,
  }),
  new HorrorMask({
    name: "Un Masque.",
    level: 0,
    pv: 500,
    attaque: 0,
    freqAttaque: 10000,
  }),
  new Poulpe({
    name: "PoulpySWAG",
    pv: 150,
    attaque: 20,
    defense: 10,
    freqAttaque: 1000,
  }),
];
