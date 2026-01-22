import { PooCreatureStats } from "../PooCreatureStats";

export interface PlayerBattleState
  extends Omit<PooCreatureStats, "currentExp"> {
  currentPv: number;
  currentMana: number;
  [bonus: string]: any;
}
