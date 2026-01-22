import { BattleReward } from "../../../../types/battle/BattleReward";
import { Monster, MonsterProps } from "./Monster";

export class Poulpe extends Monster {
  constructor({ ...stats }: {} & MonsterProps) {
    super(stats);
  }

  get defaultReward(): BattleReward {
    return [{ resource: "ink", number: 100 + this.level * 10 }];
  }
}
