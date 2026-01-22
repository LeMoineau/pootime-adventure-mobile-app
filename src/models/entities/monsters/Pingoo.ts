import { BattleReward } from "../../../types/battle/BattleReward";
import { Monster, MonsterProps } from "./Monster";

export class Pingoo extends Monster {
  constructor({ ...stats }: {} & MonsterProps) {
    super(stats);
  }

  get defaultReward(): BattleReward {
    return [
      { resource: "snow", number: 100 + this.level * 5 },
      { resource: "glass", number: 20 + this.level * 3 },
    ];
  }
}
