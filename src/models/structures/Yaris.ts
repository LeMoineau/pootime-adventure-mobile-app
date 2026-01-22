import { Structure } from "./Structure";

export class Yaris extends Structure {
  constructor() {
    super({
      name: "La Yaris",
      description:
        "Endors-toi et laisse ta yaris te conduire vers des contrées encore inexplorées et te trouver des récompenses fabuleuses !",
      style: { position: [250, 180] },
      buildingCost: { metal: 1000, glass: 1000, snow: 100, wool: 500 },
      upgradeCosts: [
        { metal: 1500, pooCoins: 3000, glass: 1500 },
        { metal: 500, pooCoins: 3200, ink: 1500, cosmicPowder: 20 },
        {
          metal: 250,
          pooCoins: 5000,
          cosmicPowder: 35,
          wool: 5000,
          glass: 1000,
        },
        {
          pooCoins: 10000,
          cosmicPowder: 50,
          metal: 1500,
          glass: 1500,
          ink: 1500,
        },
      ],
    });
  }
}
