import { Structure } from "../../types/village/Structure";

export type StructureName = "toilet" | "yaris";

export const Structures: { [name in StructureName]: Structure } = {
  toilet: {
    type: "toilet",
    name: "Toilettes",
    description:
      "Le trône, d'où sort des récompenses en fonction du temps que tu prends à poser ta pêche",
    baseLevel: 1,
    style: { position: [20, 30] },
    upgradeCosts: [
      {
        fromLevel: 1,
        toLevel: 2,
        cost: { pooCoins: 1500, wool: 1000 },
      },
      {
        fromLevel: 2,
        toLevel: 3,
        cost: { pooCoins: 3200, wool: 1500, ink: 600 },
      },
      {
        fromLevel: 3,
        toLevel: 4,
        cost: { pooCoins: 5000, wool: 2000, ink: 1200, cosmicPowder: 5 },
      },
      {
        fromLevel: 4,
        toLevel: 5,
        cost: { pooCoins: 10000, wool: 5000, ink: 3500, cosmicPowder: 15 },
      },
    ],
  },
  yaris: {
    type: "yaris",
    name: "La Yaris",
    description:
      "Endors-toi et laisse ta yaris te conduire vers des contrées encore inexplorées et te trouver des récompenses fabuleuses !",
    style: { position: [250, 180] },
    buildingCost: { metal: 1000, glass: 1000, snow: 100, wool: 500 },
    upgradeCosts: [
      {
        fromLevel: 1,
        toLevel: 2,
        cost: { metal: 1500, pooCoins: 3000, glass: 1500 },
      },
      {
        fromLevel: 2,
        toLevel: 3,
        cost: { metal: 500, pooCoins: 3200, ink: 1500, cosmicPowder: 20 },
      },
      {
        fromLevel: 3,
        toLevel: 4,
        cost: {
          metal: 250,
          pooCoins: 5000,
          cosmicPowder: 35,
          wool: 5000,
          glass: 1000,
        },
      },
      {
        fromLevel: 4,
        toLevel: 5,
        cost: {
          pooCoins: 10000,
          cosmicPowder: 50,
          metal: 1500,
          glass: 1500,
          ink: 1500,
        },
      },
    ],
  },
};
