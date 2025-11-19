import { PooCreatureStats } from "../../PooCreatureStats";
import { PooCreatureStyle } from "../../PooCreatureStyle";

export namespace ServerTypes {
  //Room
  export type SocketId = string;
  export type RoomId = string;
  export interface Room {
    id: RoomId;
    owner: SocketId;
    players: SocketId[];
    battleState: {
      [socketId: SocketId]: {
        style: PlayerStyle;
        stats: PlayerStats;
        currentState: PlayerState;
      };
    };
  }

  //Player
  export interface PlayerStyle extends PooCreatureStyle {}
  export interface PlayerStats extends Omit<PooCreatureStats, "currentExp"> {}
  export interface PlayerState {
    currentPv: number;
    currentMana: number;
    [detail: string]: any;
  }

  //Update Battle
  export interface BattleUpdate {
    target: SocketId;
    update: { [key: string]: any };
  }
  export type BattleUpdatePayload = BattleUpdate[];
  export interface BattleRewards {
    pooCoins: number;
    stars?: number;
    pooTrophees?: number;
  }
  export type PlayerVictoryState = "winner" | "loser";
  export interface BattleEnding {
    [socketId: SocketId]: {
      victoryState: PlayerVictoryState;
      rewards: BattleRewards;
    };
  }
}
