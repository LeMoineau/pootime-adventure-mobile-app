import { ScrollView, View } from "react-native";
import PooCreature from "../../../../../common/components/misc/poo-creature/PooCreature";
import ShopItemView from "../../item-view/ShopItemView";
import ShopSectionTitle from "../../ShopSectionTitle";
import {
  BuyableItem,
  isStyleUnlockableItem,
} from "../../../../../common/types/shop/UnlockableItems";
import { style } from "../../../../../common/utils/style-utils";
import {
  isMultiPricesShopItem,
  isSinglePriceShopItem,
} from "../../../../../common/types/shop/ShopItem";
import { colors } from "../../../../../common/utils/color-utils";
import {
  FreeTransaction,
  Transaction,
} from "../../../../../common/types/shop/Transaction";
import ShopItems from "../../../../../common/config/game-data/ShopItems";

export default function ShopStyleTab({
  onUnlockedItemPress,
  onLockedItemPress,
}: {
  onUnlockedItemPress: (transaction: FreeTransaction) => void;
  onLockedItemPress: (transaction: Transaction) => void;
}) {
  return (
    <>
      <View style={[{ flex: 1 }]}>
        <View
          style={[
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            {
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: colors.gray[100],
              backgroundColor: colors.gray[50],
            },
          ]}
        >
          <PooCreature width={150}></PooCreature>
        </View>
        <ScrollView style={[{ flex: 1 }]}>
          {Object.keys(ShopItems).map((section, indexSection) => {
            const itemType = section as BuyableItem;
            if (!isStyleUnlockableItem(itemType)) {
              return (
                <View key={`shop-section-${section}-${indexSection}`}></View>
              );
            }
            return (
              <View key={`shop-section-${section}-${indexSection}`}>
                <ShopSectionTitle>
                  {ShopItems[itemType]?.sectionTitle}
                </ShopSectionTitle>
                <View
                  style={[
                    style.flexRow,
                    style.itemsCenter,
                    { flexWrap: "wrap" },
                  ]}
                >
                  {ShopItems[itemType]?.items.map((shopItem, indexItem) => {
                    return (
                      <ShopItemView
                        key={`shop-item-${section}-${indexSection}-${indexItem}`}
                        onLockedItemPress={(transaction) =>
                          onLockedItemPress(transaction)
                        }
                        onUnlockedItemPress={(transaction) =>
                          onUnlockedItemPress(transaction)
                        }
                        item={shopItem.item}
                        itemType={itemType}
                        {...(isSinglePriceShopItem(shopItem)
                          ? {
                              price: shopItem.price,
                              resource: shopItem.resource,
                            }
                          : isMultiPricesShopItem(shopItem)
                          ? {
                              prices: shopItem.prices,
                              resources: shopItem.resources,
                            }
                          : {})}
                      ></ShopItemView>
                    );
                  })}
                </View>
              </View>
            );
          })}
          <View style={[{ height: 50 }]}></View>
        </ScrollView>
      </View>
    </>
  );
}
