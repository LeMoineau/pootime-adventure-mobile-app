import { useState } from "react";
import { FreeTransaction, Transaction } from "../types/shop/Transaction";
import {
  isMultiPricesShopItem,
  isSinglePriceShopItem,
} from "../types/shop/ShopItem";
import { useItemsUnlockedStore } from "../stores/items-unlocked.store";
import { useResourcesStore } from "../stores/resources.store";
import { usePooCreatureStyleStore } from "../stores/poo-creature-style.store";
import {
  isResourceItemValue,
  isResourcesItem,
  isStringItemValue,
  isStyleUnlockableItem,
  isUnlockableItem,
} from "../types/shop/UnlockableItems";
import { convertUnlockedItemToStyleKeys } from "../types/poo-creature-style/StyleKeys";

const useShopTransaction = () => {
  const [isTransactioning, setIsTransactioning] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>();

  const { unlock } = useItemsUnlockedStore();
  const { spend, spendMany, earn } = useResourcesStore();
  const { update } = usePooCreatureStyleStore();

  const beginTrade = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsTransactioning(true);
  };

  const cancelTransaction = () => {
    setIsTransactioning(false);
    // setCurrentTransaction(undefined);
  };

  const buy = async (transaction: Transaction) => {
    if (isSinglePriceShopItem(transaction)) {
      await spend(transaction.resource, transaction.price, async () => {
        await unlockBuying(transaction);
        await applyBuying(transaction);
      });
    } else if (isMultiPricesShopItem(transaction)) {
      await spendMany(transaction.resources, transaction.prices, async () => {
        await unlockBuying(transaction);
        await applyBuying(transaction);
      });
    }
  };

  const unlockBuying = async (transaction: Transaction) => {
    if (
      isUnlockableItem(transaction.itemType) &&
      isStringItemValue(transaction.item)
    ) {
      await unlock(transaction.itemType, transaction.item);
    }
  };

  const applyBuying = async (transaction: FreeTransaction) => {
    if (
      isStyleUnlockableItem(transaction.itemType) &&
      isStringItemValue(transaction.item)
    ) {
      await update(
        convertUnlockedItemToStyleKeys(transaction.itemType),
        transaction.item
      );
    } else if (
      isResourcesItem(transaction.itemType) &&
      isResourceItemValue(transaction.item)
    ) {
      await earn(transaction.item.resource, transaction.item.number);
    }
  };

  return {
    isTransactioning,
    currentTransaction,
    beginTrade,
    cancelTransaction,
    buy,
    applyBuying,
  };
};

export default useShopTransaction;
