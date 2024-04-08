import { View } from "react-native";
import { style } from "../../common/utils/style-utils";
import PooBodyEditIcon from "../../common/components/icons/ui/pooBodyEdit";
import CustomPage from "../../common/components/navigation/CustomPage";
import PooCoinsConverterIcon from "../../common/components/icons/ui/pooCoinsConverter";
import ShopScrollView from "./elements/scroll-view/ShopScrollView";
import ShopStyleTab from "./elements/scroll-view/tabs/ShopStyleTab";
import useShopTransaction from "../../common/hooks/use-shop-transaction";
import ShopResourcesTab from "./elements/scroll-view/tabs/ShopResourcesTab";

export default function ShopPage() {
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
              tab: (
                <ShopResourcesTab
                  onBuyableItemPress={beginTrade}
                ></ShopResourcesTab>
              ),
            },
          ]}
        ></ShopScrollView>
      </View>
    </CustomPage>
  );
}
