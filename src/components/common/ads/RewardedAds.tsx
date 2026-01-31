import { useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import StandardButton from "../buttons/StandardButton";
import { colors } from "../../../constants/style/colors";
import ExpoIcon from "../icons/ExpoIcon";
import useModal from "../../../hooks/common/ui/use-modal";
import CustomRewardModal from "../modals/primitives/CustomRewardModal";
import CustomModal from "../modals/primitives/CustomModal";
import { BattleReward } from "../../../types/battle/BattleReward";
import adsRewardsService from "../../../services/ads-rewards.service";
import { useResourcesStore } from "../../../stores/resources.store";

const REWARDED_AD_ID_ANDROID = "ca-app-pub-3020955535400199/9415609606";

/**
 * Button which open on ad on pressing and give rewards after watching it
 * @returns
 */
export default function RewardedAds() {
  const [adLoading, setAdLoading] = useState(false);
  const { modalContainer, openModal, popModal } = useModal();
  const earnMany = useResourcesStore((state) => state.earnMany);

  const rewardModal = (reward: BattleReward) => (
    <CustomRewardModal
      visible
      title="Récompenses"
      desc="Voici les récompenses que vous empochez après avoir regardé cette publicité !"
      rewards={reward}
      onPressEarnBtn={(rewards) => {
        earnMany(rewards.map((r) => [r.resource, r.number]));
      }}
      onRequestClose={popModal}
    ></CustomRewardModal>
  );

  const errorModal = (
    message: string = "Une erreur est survenue pendant le chargement de la publicité...",
  ) => (
    <CustomModal
      visible
      title="Mince..."
      desc={message}
      onRequestClose={popModal}
    ></CustomModal>
  );

  const showAd = () => {
    if (__DEV__) {
      openModal(rewardModal(adsRewardsService.generateNewReward()));
      return;
    }
    // setAdLoading(true);
    // import("react-native-google-mobile-ads").then(
    //   ({ RewardedAd, RewardedAdEventType }) => {
    //     const adUnitId = Platform.select({
    //       android: REWARDED_AD_ID_ANDROID,
    //     });

    //     if (!adUnitId) {
    //       setAdLoading(false);
    //       openModal(
    //         errorModal(
    //           "Aucun identifiant de publicité n'a été trouvé pour votre appareil...",
    //         ),
    //       );
    //       return;
    //     }

    //     const rewarded = RewardedAd.createForAdRequest(adUnitId);

    //     const unsubscribeLoaded = rewarded.addAdEventListener(
    //       RewardedAdEventType.LOADED,
    //       () => {
    //         rewarded.show({ immersiveModeEnabled: true });
    //         setAdLoading(false);
    //       },
    //     );
    //     const unsubscribeEarned = rewarded.addAdEventListener(
    //       RewardedAdEventType.EARNED_REWARD,
    //       () => {
    //         openModal(rewardModal(adsRewardsService.generateNewReward()));
    //       },
    //     );

    //     // Start loading the rewarded ad straight away
    //     rewarded.load();

    //     /**
    //      * Normalement pas nécessaire puisque {rewarded} est recréé à chaque press
    //      */
    //     // Unsubscribe from events on unmount
    //     // unsubscribeEvents.current = [unsubscribeLoaded, unsubscribeEarned];
    //   },
    // );
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <StandardButton
        onPress={() => {
          if (!adLoading) showAd();
        }}
        style={{ width: "100%" }}
        bgColor={!adLoading ? colors.primary : colors.gray[400]}
        prependIcon={
          <ExpoIcon
            name="star-o"
            style={{ color: colors.white }}
            size={20}
          ></ExpoIcon>
        }
        appendIcon={
          !adLoading ? (
            <ExpoIcon
              name="chevron-forward"
              style={{ color: colors.white }}
              size={20}
            ></ExpoIcon>
          ) : (
            <ActivityIndicator color={colors.white}></ActivityIndicator>
          )
        }
        viewStyle={{ paddingHorizontal: 20 }}
        textStyle={{
          textAlign: "left",
          fontSize: 15,
          fontWeight: 500,
          color: colors.white,
          paddingLeft: 10,
        }}
      >
        Récupérer une récompense
      </StandardButton>
      {modalContainer}
    </View>
  );
}
