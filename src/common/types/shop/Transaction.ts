import { Resources } from "../../config/constants/Resources";
import { BuyableItemValue } from "./BuyableItem";
import { BuyableItem } from "./UnlockableItems";

export interface FreeTransaction {
  item: BuyableItemValue;
  itemType: BuyableItem;
}

export interface SingleResourceTransaction extends FreeTransaction {
  price: number;
  resource: Resources;
}

export interface MultiResourcesTransaction extends FreeTransaction {
  prices: number[];
  resources: Resources[];
}

export type Transaction =
  | FreeTransaction
  | SingleResourceTransaction
  | MultiResourcesTransaction;

export function isSingleResourceTransaction(
  transaction: Transaction
): transaction is SingleResourceTransaction {
  return (transaction as any).price !== undefined;
}

export function isMultiResourcesTransaction(
  transaction: Transaction
): transaction is MultiResourcesTransaction {
  return (transaction as any).prices !== undefined;
}
