import { BattleReward } from "../../../../types/battle/BattleReward";
import { MonsterState } from "../../../../types/battle/entities/MonsterState";
import { Entity, EntityProps } from "../Entity";

export interface MonsterProps extends EntityProps {
  freqAttaque: number;
  rewards?: BattleReward;
}

export class Monster extends Entity {
  freqAttaque: number;
  rewards: BattleReward;

  constructor({ freqAttaque, rewards, ...stats }: MonsterProps) {
    super(stats);
    this.freqAttaque = freqAttaque;
    this.rewards = rewards ?? this.defaultReward;
  }

  get defaultReward(): BattleReward {
    throw new Error("not implemented");
  }

  toState(): MonsterState {
    return {
      currentPv: this.currentPv,
    };
  }
}
