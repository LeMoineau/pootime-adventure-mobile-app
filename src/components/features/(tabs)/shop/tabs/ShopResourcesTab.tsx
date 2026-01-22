import { ScrollView, View } from "react-native";
import { isSinglePriceShopItem } from "../../../../../types/shop/ShopItem";
import { style } from "../../../../../constants/style/styles";
import ConverterShopItem from "../components/ConverterShopItem";
import ShopItems from "../../../../../constants/shop/shop-items";
// import RewardedAds from "../../../common/components/ads/RewardedAds";
// import BannerAds from "../../../common/components/ads/BannerAds";

export default function ShopResourcesTab() {
  return (
    <ScrollView>
      <View
        style={[
          style.flexRow,
          { flex: 1, flexWrap: "wrap", padding: 10, gap: 10 },
        ]}
      >
        {/* <RewardedAds></RewardedAds> */}
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
        {/* <BannerAds></BannerAds> */}
      </View>
    </ScrollView>
  );
}
