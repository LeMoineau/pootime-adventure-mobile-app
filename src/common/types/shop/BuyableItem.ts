import { Resources } from "../../config/game-data/Resources";
import { UnlockableItems } from "./UnlockableItems";

export type BuyableItem = UnlockableItems | ResourcesItem;

export type BuyableItemValue = UnlockableItemValue | ResourcesItemValue;

export type UnlockableItemValue = PooBodyColor | PooHeadName | PooExpressionUrl;

export type PooBodyColor = string;
export type PooHeadName =
  | "classic"
  | "flower"
  | "sheepWithEar"
  | "sheep"
  | "sheepQueen"
  | "pingoo"
  | "poulpe"
  | "aureoledClassic";
export type PooExpressionUrl = string;

export type ResourcesItemValue = { resource: Resources; number: number };
export type ResourcesItem = "resources";
