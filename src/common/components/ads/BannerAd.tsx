import { Platform } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

const BANNER_AD_UNIT_ID = Platform.select({
  android: "ca-app-pub-3020955535400199/9303928963",
});

export default function GoogleBannerAd() {
  // if (false) {
  //   return (
  //     <BannerAd
  //       unitId={BANNER_AD_UNIT_ID!}
  //       size={BannerAdSize.FULL_BANNER}
  //       requestOptions={{
  //         requestNonPersonalizedAdsOnly: true,
  //       }}
  //       onAdLoaded={() => {
  //         console.log("Banner ad loaded");
  //       }}
  //       onAdFailedToLoad={(error) => {
  //         console.error("Banner ad failed to load", error);
  //       }}
  //     />
  //   );
  // }

  return <></>;
}
