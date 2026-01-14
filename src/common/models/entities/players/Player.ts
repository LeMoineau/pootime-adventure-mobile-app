import { PlayerState } from "../../../types/battle/entities/PlayerState";
import { Entity, EntityProps } from "../Entity";

export class Player extends Entity {
  constructor({ ...stats }: EntityProps) {
    super(stats);
  }

  toState(): PlayerState {
    return {
      currentPv: this.currentPv,
      currentMana: this.currentMana,
    };
  }
}
