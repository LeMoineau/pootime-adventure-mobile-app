import assets from "../../config/assets";
import { monsters } from "../../constants/battle/monsters";
import { ArrayUtils } from "../../utils/array-utils";
import { colors } from "../../constants/style/colors";
import { Gremlins } from "../entities/monsters/Gremlins";
import { Monster } from "../entities/monsters/Monster";
import { Poulpe } from "../entities/monsters/Poulpe";
import { Zone } from "./Zone";

export class Cosmos extends Zone {
  constructor() {
    super({
      name: "Le cosmos Rosé",
      desc: "Dans un univers teinté de rose et de violet, des poulpes et d'autres effroyables créatures y ont établi demeure",
      icon: assets.cosmosZone,
      unlockLevel: 9,
      style: {
        iconHeight: 280,
        mainColor: colors.pink[300],
      },
    });
  }

  pickMonster(): Monster {
    const population = [
      ...monsters.filter((m) => m instanceof Poulpe || m instanceof Gremlins),
    ];
    return ArrayUtils.getRandomItem(population);
  }
}
