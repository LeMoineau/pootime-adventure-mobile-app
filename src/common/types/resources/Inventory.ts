import { Resources } from "../../config/game-data/Resources";

export type Inventory = { [resource in Resources]: number };
