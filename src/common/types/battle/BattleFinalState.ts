import { PooCreatureStats } from "../PooCreatureStats";
import { PooCreatureStyle } from "../PooCreatureStyle";

export type BattleFinalState = {
  win: boolean;
  date: String;
  own: {
    style: PooCreatureStyle;
    stats: PooCreatureStats;
  };
  adv: {
    style: PooCreatureStyle;
    stats: PooCreatureStats;
  };
};
