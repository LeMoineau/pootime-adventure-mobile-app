import { BattleReward } from "../../../types/battle/BattleReward";
import { Monster, MonsterProps } from "./Monster";

export class Sheep extends Monster {
  color: string;

  constructor({ color, ...stats }: { color: string } & MonsterProps) {
    super(stats);
    this.color = color;
  }

  get defaultReward(): BattleReward {
    return [
      { resource: "wool", number: 100 + this.level * 10 },
      { resource: "pooCoins", number: 50 + this.level * 5 },
    ];
  }
}
