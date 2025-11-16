import { PooCreatureStats } from "../PooCreatureStats";
import { PooCreatureStyle } from "../PooCreatureStyle";

export type BattleFinalState = {
  win: boolean;
  date: String;
  own: {
    uid?: string;
    style: PooCreatureStyle;
    stats: PooCreatureStats;
  };
  adv: {
    uid?: string;
    style: PooCreatureStyle;
    stats: PooCreatureStats;
  };
};
