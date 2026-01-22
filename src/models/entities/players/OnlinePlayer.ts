import { PooCreatureStyle } from "../../../types/PooCreatureStyle";
import { EntityProps } from "../Entity";
import { Player } from "./Player";

export class OnlinePlayer extends Player {
  constructor({ ...props }: PooCreatureStyle & EntityProps) {
    super({ ...props });
  }
}
