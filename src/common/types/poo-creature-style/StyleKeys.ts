import { BuyableItem } from "../shop/UnlockableItems";

export type StyleKeys = "bodyColor" | "head" | "name" | "expression";

export function convertUnlockedItemToStyleKeys(
  itemType: BuyableItem
): StyleKeys {
  if (itemType === "bodyColors") {
    return "bodyColor";
  } else if (itemType === "heads") {
    return "head";
  } else {
    return "expression";
  }
}
