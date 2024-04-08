import { PooCreatureStats } from "../PooCreatureStats";

export interface PlayerBattleState
  extends Omit<PooCreatureStats, "currentExp"> {
  [bonus: string]: any;
}
