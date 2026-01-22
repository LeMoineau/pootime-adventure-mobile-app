import assets from "../../config/assets";
import { monsters } from "../../common/constants/battle/monsters";
import { ArrayUtils } from "../../utils/array-utils";
import { colors } from "../../utils/color-utils";
import { Monster } from "../entities/monsters/Monster";
import { Pingoo } from "../entities/monsters/Pingoo";
import { Tank } from "../entities/monsters/Tank";
import { Zone } from "./Zone";

export class Banquise extends Zone {
  constructor() {
    super({
      name: "Expédition à la banquise",
      desc: "Une plaine tranquille et verdoyante",
      icon: assets.banquiseZone,
      unlockLevel: 5,
      style: {
        iconHeight: 280,
        mainColor: colors.blue[200],
      },
    });
  }

  pickMonster(): Monster {
    const population = [
      ...monsters.filter((m) => m instanceof Pingoo || m instanceof Tank),
    ];
    return ArrayUtils.getRandomItem(population);
  }
}
