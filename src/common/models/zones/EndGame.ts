import assets from "../../config/assets";
import { monsters } from "../../constants/battle/monsters";
import { ArrayUtils } from "../../utils/array-utils";
import { colors } from "../../utils/color-utils";
import { GodPoulpe } from "../entities/monsters/GodPoulpe";
import { Monster } from "../entities/monsters/Monster";
import { Zone } from "./Zone";

export class EndGame extends Zone {
  constructor() {
    super({
      name: "The EndGame",
      desc: "Une plaine tranquille et verdoyante",
      icon: assets.godPoulpeZone,
      unlockLevel: 12,
      style: {
        iconHeight: 350,
        mainColor: colors.yellow[400],
      },
    });
  }

  pickMonster(): Monster {
    const population = [...monsters.filter((m) => m instanceof GodPoulpe)];
    return ArrayUtils.getRandomItem(population);
  }
}
