import { colors } from "../../../utils/color-utils";
import { BattleReward } from "../online-battle/BattleReward";
export type EntityType = "sheep";

export interface Entity {
  name: string;
  entityType: EntityType;
  color?: string;
  level: number;
  pv: number;
  attaque: number;
  freqAttaque: number;
  rewards?: BattleReward;
}

export type EntityBattleWinner = "player" | "entity";

export interface EntityState {
  currentPv: number;
  attaque: number;
  [detail: string]: any;
}

export interface PlayerStateInEntityBattle {
  currentPv: number;
  currentMana: number;
  attaque: number;
  defense: number;
  recupMana: number;
  [detail: string]: any;
}
