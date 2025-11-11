import { View } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import Slider from "@react-native-community/slider";
import { colors } from "../../../../common/utils/color-utils";
import { useState } from "react";
import { SinglePriceShopItem } from "../../../../common/types/shop/ShopItem";
import StandardButton from "../../../../common/components/buttons/StandardButton";
import ExpoIcon from "../../../../common/components/icons/ExpoIcon";
import TextWithResourceIcon from "../../../../common/components/text/TextWithResourceIcon";
import { useResourcesStore } from "../../../../common/stores/resources.store";
import { isResourcesItemValue } from "../../../../common/types/shop/BuyableItem";
import { isResourceItemValue } from "../../../../common/types/shop/UnlockableItems";
import { MathUtils } from "../../../../common/utils/math-utils";

export default function ConverterShopItem({
  shopItem,
}: {
  shopItem: SinglePriceShopItem;
}) {
  if (!isResourcesItemValue(shopItem.item)) {
    throw new Error(
      "cannot create converter shop item for none resources item value"
    );
  }

  const { get, spend, earn } = useResourcesStore();
  const [quantity, setQuantity] = useState(1);

  const maxQuantityPossible = Math.floor(
    get(shopItem.resource) / (shopItem.price === 0 ? 1 : shopItem.price)
  );
  const canBuyAtLeastOne = maxQuantityPossible >= 1;

  const handleBuy = () => {
    const item = shopItem.item;
    if (
      isResourceItemValue(item) &&
      get(shopItem.resource) >= quantity * shopItem.price
    ) {
      spend(shopItem.resource, quantity * shopItem.price, () => {
        earn(item.resource, quantity * item.number);
        setQuantity(1);
      });
    }
  };

  return (
    <View
      pointerEvents={canBuyAtLeastOne ? "auto" : "none"}
      style={[
        style.flexRow,
        style.wFull,
        style.border,
        {
          backgroundColor: colors.gray[100],
          borderRadius: 10,
          overflow: "hidden",
          opacity: canBuyAtLeastOne ? 1 : 0.6,
        },
      ]}
    >
      <View
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          {
            width: 60,
            height: 60,
            borderRightWidth: 1,
            borderRightColor: colors.gray[200],
            backgroundColor: colors.white,
          },
        ]}
      >
        <TextWithResourceIcon
          resource={shopItem.item.resource}
          text={`${MathUtils.convertToReduceStrFormat(
            quantity * shopItem.item.number
          )}`}
          style={{
            justifyContent: "flex-start",
            paddingLeft: 10,
          }}
        ></TextWithResourceIcon>
      </View>
      <View style={[style.flexCol, style.justifyCenter, { flex: 1 }]}>
        <TextWithResourceIcon
          resource={shopItem.resource}
          text={`x ${quantity * shopItem.price}`}
          style={{
            justifyContent: "flex-start",
            paddingLeft: 10,
          }}
        ></TextWithResourceIcon>
        <Slider
          style={{ width: "100%", height: 20 }}
          minimumValue={1}
          maximumValue={maxQuantityPossible}
          step={1}
          onValueChange={setQuantity}
        />
      </View>
      <View
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { paddingRight: 10 },
        ]}
      >
        <StandardButton
          prependIcon={
            <ExpoIcon
              name="cart"
              style={{ color: colors.white }}
              size={20}
            ></ExpoIcon>
          }
          bgColor={canBuyAtLeastOne ? colors.green[400] : colors.gray[400]}
          viewStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
          onPress={handleBuy}
        ></StandardButton>
      </View>
    </View>
  );
}
