import assets from "../../../config/assets";
import { monsters } from "../../constants/battle/monsters";
import { ArrayUtils } from "../../utils/array-utils";
import { colors } from "../../utils/color-utils";
import { Gremlins } from "../entities/monsters/Gremlins";
import { Monster } from "../entities/monsters/Monster";
import { Poulpe } from "../entities/monsters/Poulpe";
import { Zone } from "./Zone";

export class Cosmos extends Zone {
  constructor() {
    super({
      name: "Le cosmos Rosé",
      desc: "Une plaine tranquille et verdoyante",
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
