import { PooCreatureStats } from "../PooCreatureStats";

export interface PlayerBattleState
  extends Omit<PooCreatureStats, "currentExp"> {
  currentPv: number;
  [bonus: string]: any;
}
