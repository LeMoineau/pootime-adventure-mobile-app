import { Structure } from "./Structure";

export class Toilet extends Structure {
  constructor() {
    super({
      name: "Toilettes",
      description:
        "Le trône, d'où sort des récompenses en fonction du temps que tu prends à poser ta pêche",
      baseLevel: 1,
      style: { position: [20, 30] },
      upgradeCosts: [
        { pooCoins: 1500, wool: 1000 },
        { pooCoins: 3200, wool: 1500, ink: 600 },
        { pooCoins: 5000, wool: 2000, ink: 1200, cosmicPowder: 5 },
        { pooCoins: 10000, wool: 5000, ink: 3500, cosmicPowder: 15 },
      ],
    });
  }
}
