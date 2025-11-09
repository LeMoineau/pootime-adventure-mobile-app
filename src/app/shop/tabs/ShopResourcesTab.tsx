import { ScrollView, View } from "react-native";
import ShopItemView from "../elements/shop-item/ShopItemView";
import {
  isMultiPricesShopItem,
  isSinglePriceShopItem,
} from "../../../common/types/shop/ShopItem";
import { style } from "../../../common/utils/style-utils";
import { Transaction } from "../../../common/types/shop/Transaction";
import ShopItems from "../../../common/config/constants/ShopItems";
import BannerAd from "../../../common/components/ads/BannerAd";
import ConverterShopItem from "../elements/converter-item/ConverterShopItem";

export default function ShopResourcesTab({
  onBuyableItemPress,
}: {
  onBuyableItemPress?: (transaction: Transaction) => void;
}) {
  return (
    <ScrollView>
      <View
        style={[
          style.flexRow,
          { flex: 1, flexWrap: "wrap", padding: 10, gap: 10 },
        ]}
      >
        {ShopItems.resources!.items.map((shopItem, index) => {
          return isSinglePriceShopItem(shopItem) ? (
            <ConverterShopItem
              shopItem={shopItem}
              key={index}
            ></ConverterShopItem>
          ) : (
            <></>
          );
        })}
        <BannerAd></BannerAd>
      </View>
    </ScrollView>
  );
}
