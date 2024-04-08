import { ScrollView, View } from "react-native";
import ShopItemView from "../../item-view/ShopItemView";
import {
  isMultiPricesShopItem,
  isSinglePriceShopItem,
} from "../../../../../common/types/shop/ShopItem";
import { style } from "../../../../../common/utils/style-utils";
import { Transaction } from "../../../../../common/types/shop/Transaction";
import ShopItems from "../../../../../common/config/game-data/ShopItems";

export default function ShopResourcesTab({
  onBuyableItemPress,
}: {
  onBuyableItemPress?: (transaction: Transaction) => void;
}) {
  return (
    <ScrollView>
      <View style={[style.flexRow, { flex: 1, flexWrap: "wrap", padding: 10 }]}>
        {ShopItems.resources!.items.map((shopItem, index) => {
          return (
            <ShopItemView
              item={shopItem.item}
              itemType={"resources"}
              key={`shop-section-resources-${index}`}
              onLockedItemPress={(transaction) =>
                onBuyableItemPress && onBuyableItemPress(transaction)
              }
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
    </ScrollView>
  );
}
