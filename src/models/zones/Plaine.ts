import assets from "../../config/assets";
import { monsters } from "../../common/constants/battle/monsters";
import { ArrayUtils } from "../../utils/array-utils";
import { colors } from "../../utils/color-utils";
import { Monster } from "../entities/monsters/Monster";
import { Sheep } from "../entities/monsters/Sheep";
import { Zone } from "./Zone";

export class Plaine extends Zone {
  constructor() {
    super({
      name: "La plaine Irlandaise",
      desc: "Une plaine tranquille et verdoyante",
      icon: assets.sheepZone,
      unlockLevel: 0,
      style: {
        iconHeight: 200,
        mainColor: colors.green[300],
      },
    });
  }

  pickMonster(): Monster {
    const population = [...monsters.filter((m) => m instanceof Sheep)];
    return ArrayUtils.getRandomItem(population);
  }
}
