import { BattleReward } from "../../../../types/battle/BattleReward";
import { Monster, MonsterProps } from "./Monster";

export class Tank extends Monster {
  sad: boolean;

  constructor({ sad = false, ...stats }: { sad?: boolean } & MonsterProps) {
    super(stats);
    this.sad = sad;
  }

  get defaultReward(): BattleReward {
    return [
      { resource: "metal", number: 50 + this.level * 5 },
      { resource: "glass", number: 5 + this.level * 3 },
    ];
  }
}
