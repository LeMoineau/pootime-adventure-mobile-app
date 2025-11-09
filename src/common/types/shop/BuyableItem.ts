import { Resources } from "../../config/constants/Resources";
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

export function isResourcesItemValue(
  shopItemValue: BuyableItemValue
): shopItemValue is ResourcesItemValue {
  return (
    (shopItemValue as any).resource !== undefined &&
    (shopItemValue as any).number !== undefined
  );
}
