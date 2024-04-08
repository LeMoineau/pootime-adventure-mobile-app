import { Entity } from "../../types/battle/entity-battle/EntityBattleTypes";
import { colors } from "../../utils/color-utils";

export type EntityName =
  | "Audrey"
  | "Cheap"
  | "ASheep"
  | "BSheep"
  | "SansNom"
  | "Perdu"
  | "X2000Cyborg"
  | "MoutMout";

const Entities: { [name in EntityName]: Entity } = {
  Audrey: {
    name: "Audrey",
    entityType: "sheep",
    color: colors.yellow[300],
    level: 100,
    pv: 9999999,
    attaque: 99999999,
    freqAttaque: 5000,
  },
  Cheap: {
    name: "Cheap",
    entityType: "sheep",
    color: colors.yellow[100],
    level: 1,
    pv: 20,
    attaque: 2,
    freqAttaque: 1000,
  },
  ASheep: {
    name: "A Sheep",
    entityType: "sheep",
    color: colors.green[300],
    level: 3,
    pv: 25,
    attaque: 2,
    freqAttaque: 500,
  },
  BSheep: {
    name: "A Sheep",
    entityType: "sheep",
    color: colors.green[300],
    level: 3,
    pv: 25,
    attaque: 2,
    freqAttaque: 500,
  },
  Perdu: {
    name: "A Sheep",
    entityType: "sheep",
    color: colors.green[300],
    level: 3,
    pv: 25,
    attaque: 2,
    freqAttaque: 500,
  },
  SansNom: {
    name: "Sans Nom",
    entityType: "sheep",
    color: colors.white,
    level: 4,
    pv: 50,
    attaque: 15,
    freqAttaque: 1000,
  },
  X2000Cyborg: {
    name: "A Sheep",
    entityType: "sheep",
    color: colors.gray[500],
    level: 2000,
    pv: 100,
    attaque: 5,
    freqAttaque: 200,
  },
  MoutMout: {
    name: "A Sheep",
    entityType: "sheep",
    color: colors.green[300],
    level: 3,
    pv: 25,
    attaque: 2,
    freqAttaque: 500,
  },
};

export default Entities;
