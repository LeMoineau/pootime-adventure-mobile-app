import { BattleReward } from "../../../../types/battle/BattleReward";
import { Monster, MonsterProps } from "./Monster";

export class HorrorMask extends Monster {
  constructor({ ...stats }: {} & MonsterProps) {
    super(stats);
  }

  get defaultReward(): BattleReward {
    return [
      { resource: "glass", number: 500 },
      { resource: "cosmicPowder", number: 5 },
    ];
  }
}
