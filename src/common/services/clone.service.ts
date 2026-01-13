import { GodPoulpe } from "../models/entities/monsters/GodPoulpe";
import { Gremlins } from "../models/entities/monsters/Gremlins";
import { HorrorMask } from "../models/entities/monsters/HorrorMask";
import { Monster } from "../models/entities/monsters/Monster";
import { Pingoo } from "../models/entities/monsters/Pingoo";
import { Poulpe } from "../models/entities/monsters/Poulpe";
import { Sheep } from "../models/entities/monsters/Sheep";
import { Tank } from "../models/entities/monsters/Tank";

class CloneService {
  constructor() {}

  cloneMonster(monster: Monster): Monster {
    if (monster instanceof Sheep) {
      return new Sheep({ ...monster });
    } else if (monster instanceof Pingoo) {
      return new Pingoo({ ...monster });
    } else if (monster instanceof Tank) {
      return new Tank({ ...monster });
    } else if (monster instanceof Gremlins) {
      return new Gremlins({ ...monster });
    } else if (monster instanceof HorrorMask) {
      return new HorrorMask({ ...monster });
    } else if (monster instanceof Poulpe) {
      return new Poulpe({ ...monster });
    } else if (monster instanceof GodPoulpe) {
      return new GodPoulpe({ ...monster });
    }
    console.error(`type of monster ${monster} not found during cloning`);
    return new Monster({ ...monster });
  }
}

export default new CloneService();
