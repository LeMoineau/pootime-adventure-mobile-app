import { View } from "react-native";
import { style } from "../../constants/style/styles";
import PooBodyEditIcon from "../../components/common/icons/ui/pooBodyEdit";
import CustomPage from "../../components/common/navigation/CustomPage";
import PooCoinsConverterIcon from "../../components/common/icons/ui/pooCoinsConverter";
import ShopResourcesTab from "../../components/features/(tabs)/shop/tabs/ShopResourcesTab";
import ShopScrollView from "../../components/features/(tabs)/shop/ShopScrollView";
import ShopStyleTab from "../../components/features/(tabs)/shop/tabs/ShopStyleTab";
import useShopTransaction from "../../hooks/features/(tabs)/shop/use-shop-transaction";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import ResourceIcon from "../../components/common/icons/ResourceIcon";
import ShopAdsTab from "../../components/features/(tabs)/shop/tabs/ShopAdsTab";

export default function ShopTab() {
  const {
    isTransactioning,
    currentTransaction,
    cancelTransaction,
    beginTrade,
    buy,
    applyBuying,
  } = useShopTransaction();

  return (
    <CustomPage>
      <View
        style={[
          style.wFull,
          style.hFull,
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { paddingHorizontal: 10 },
        ]}
      >
        <ShopScrollView
          isTransactioning={isTransactioning}
          currentTransaction={currentTransaction}
          onModalCancel={cancelTransaction}
          onModalConfirm={async () => {
            if (!currentTransaction) return;
            await buy(currentTransaction);
            cancelTransaction();
          }}
          tabs={[
            {
              icon: <PooBodyEditIcon size={40}></PooBodyEditIcon>,
              tab: (
                <ShopStyleTab
                  onLockedItemPress={beginTrade}
                  onUnlockedItemPress={applyBuying}
                ></ShopStyleTab>
              ),
            },
            {
              icon: (
                <PooCoinsConverterIcon
                  size={40}
                  style={[{ transform: [{ translateY: 5 }] }]}
                ></PooCoinsConverterIcon>
              ),
              tab: <ShopResourcesTab></ShopResourcesTab>,
            },

            {
              icon: <ResourceIcon resource="stars" size={35}></ResourceIcon>,
              tab: <ShopAdsTab></ShopAdsTab>,
            },
          ]}
        ></ShopScrollView>
      </View>
    </CustomPage>
  );
}
