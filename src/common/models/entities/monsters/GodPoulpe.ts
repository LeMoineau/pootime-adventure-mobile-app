import { BattleReward } from "../../../types/battle/BattleReward";
import { Monster, MonsterProps } from "./Monster";

export class GodPoulpe extends Monster {
  constructor({ ...stats }: {} & MonsterProps) {
    super(stats);
  }

  get defaultReward(): BattleReward {
    return [
      { resource: "ink", number: 1000 },
      { resource: "cosmicPowder", number: 50 },
    ];
  }
}
