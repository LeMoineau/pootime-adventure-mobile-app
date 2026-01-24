import { ScrollView, Text, View } from "react-native";
import { style } from "../../../../../constants/style/styles";
import RewardedAds from "../../../../common/ads/RewardedAds";

export default function ShopAdsTab() {
  return (
    <ScrollView>
      <View
        style={[
          style.flexRow,
          { flex: 1, flexWrap: "wrap", padding: 10, gap: 20, paddingTop: 20 },
        ]}
      >
        <Text>Regardez une publicité pour empocher des récompenses !</Text>
        <RewardedAds></RewardedAds>
        {/* <BannerAds></BannerAds> */}
      </View>
    </ScrollView>
  );
}
