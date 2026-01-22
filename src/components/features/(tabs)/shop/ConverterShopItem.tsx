import { View } from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { SinglePriceShopItem } from "../../../../types/shop/ShopItem";
import { isResourcesItemValue } from "../../../../types/shop/BuyableItem";
import { useResourcesStore } from "../../../../stores/resources.store";
import { isResourceItemValue } from "../../../../types/shop/UnlockableItems";
import { style } from "../../../../utils/style-utils";
import { colors } from "../../../../utils/color-utils";
import TextWithResourceIcon from "../../../common/text/TextWithResourceIcon";
import { MathUtils } from "../../../../utils/math-utils";
import StandardButton from "../../../common/buttons/StandardButton";
import ExpoIcon from "../../../common/icons/ExpoIcon";

export default function ConverterShopItem({
  shopItem,
}: {
  shopItem: SinglePriceShopItem;
}) {
  if (!isResourcesItemValue(shopItem.item)) {
    throw new Error(
      "cannot create converter shop item for none resources item value",
    );
  }

  const { get, spend, earn } = useResourcesStore();
  const [quantity, setQuantity] = useState(1);

  const maxQuantityPossible = Math.floor(
    get(shopItem.resource) / (shopItem.price === 0 ? 1 : shopItem.price),
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
            quantity * shopItem.item.number,
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
