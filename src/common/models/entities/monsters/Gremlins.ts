import { BattleReward } from "../../../../types/battle/BattleReward";
import { Monster, MonsterProps } from "./Monster";

export class Gremlins extends Monster {
  constructor({ ...stats }: {} & MonsterProps) {
    super(stats);
  }

  get defaultReward(): BattleReward {
    return [
      { resource: "cosmicPowder", number: 2 },
      { resource: "pooCoins", number: 150 + this.level * 10 },
    ];
  }
}
