import { View } from "react-native";
import { style } from "../../utils/style-utils";
import PooBodyEditIcon from "../../components/icons/ui/pooBodyEdit";
import CustomPage from "../../components/navigation/CustomPage";
import PooCoinsConverterIcon from "../../components/icons/ui/pooCoinsConverter";
import ShopResourcesTab from "../../features/(tabs)/shop/components/tabs/ShopResourcesTab";
import ShopScrollView from "../../features/(tabs)/shop/components/ShopScrollView";
import ShopStyleTab from "../../features/(tabs)/shop/components/tabs/ShopStyleTab";
import useShopTransaction from "../../features/(tabs)/shop/hooks/use-shop-transaction";

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
          ]}
        ></ShopScrollView>
      </View>
    </CustomPage>
  );
}
