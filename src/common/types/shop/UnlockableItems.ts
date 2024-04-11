import {
  BuyableItem,
  BuyableItemValue,
  ResourcesItem,
  ResourcesItemValue,
} from "./BuyableItem";

export type UnlockableItems =
  | "events"
  | "ultis"
  | "options"
  | StyleUnlockableItem;

export type StyleUnlockableItem = "bodyColors" | "heads" | "expressions";

export function isUnlockableItem(
  itemType: BuyableItem
): itemType is UnlockableItems {
  return (
    isStyleUnlockableItem(itemType) ||
    itemType === "events" ||
    itemType === "ultis" ||
    itemType === "options"
  );
}

export function isStyleUnlockableItem(
  itemType: BuyableItem
): itemType is StyleUnlockableItem {
  return (
    itemType === "bodyColors" ||
    itemType === "heads" ||
    itemType === "expressions"
  );
}

export function isResourcesItem(
  itemType: BuyableItem
): itemType is ResourcesItem {
  return itemType === "resources";
}

export function isResourceItemValue(
  item: BuyableItemValue
): item is ResourcesItemValue {
  return (item as any).resource !== undefined;
}

export function isStringItemValue(item: BuyableItemValue): item is string {
  return typeof item === "string";
}
