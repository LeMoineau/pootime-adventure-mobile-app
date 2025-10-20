import { Resources } from "../../config/constants/Resources";
import { BuyableItemValue } from "./BuyableItem";

export interface FreeShopItem {
  item: BuyableItemValue;
}

export interface SinglePriceShopItem extends FreeShopItem {
  resource: Resources;
  price: number;
}

export interface MultiPricesShopItem extends FreeShopItem {
  resources: Resources[];
  prices: number[];
}

export type ShopItem = FreeShopItem | SinglePriceShopItem | MultiPricesShopItem;

export function isFreeShopItem(shopItem: ShopItem): shopItem is FreeShopItem {
  return (
    (shopItem as any).price === undefined &&
    (shopItem as any).prices === undefined
  );
}

export function isSinglePriceShopItem(
  shopItem: ShopItem
): shopItem is SinglePriceShopItem {
  return (shopItem as any).price !== undefined;
}

export function isMultiPricesShopItem(
  shopItem: ShopItem
): shopItem is MultiPricesShopItem {
  return (shopItem as any).prices !== undefined;
}
