import { ScrollView, Text, View } from "react-native";
import { isSinglePriceShopItem } from "../../../../../types/shop/ShopItem";
import { style } from "../../../../../constants/style/styles";
import ShopItems from "../../../../../constants/shop/shop-items";
import ConverterShopItem from "../ConverterShopItem";

export default function ShopResourcesTab() {
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
      </View>
    </ScrollView>
  );
}
