import { Animated, Pressable, useWindowDimensions, View } from "react-native";
import {
  isStringItemValue,
  isUnlockableItem,
} from "../../../../../types/shop/UnlockableItems";
import { style } from "../../../../../utils/style-utils";
import { colors } from "../../../../../constants/style/colors";
import { useResourcesStore } from "../../../../../stores/resources.store";
import { useItemsUnlockedStore } from "../../../../../stores/items-unlocked.store";
import TextWithResourceIcon from "../../../../common/text/TextWithResourceIcon";
import {
  FreeTransaction,
  Transaction,
} from "../../../../../types/shop/Transaction";
import ShopItemTypeView from "./ShopItemTypeView";
import useAnimatedValue from "../../../../../hooks/common/ui/use-animated-value";
import {
  BuyableItem,
  BuyableItemValue,
} from "../../../../../types/shop/BuyableItem";
import { Resources } from "../../../../../config/constants/Resources";

export default function ShopItemView({
  item,
  itemType,
  price,
  prices,
  resource,
  resources,
  onUnlockedItemPress,
  onLockedItemPress,
}: {
  item: BuyableItemValue;
  itemType: BuyableItem;
  price?: number;
  prices?: number[];
  resource?: Resources;
  resources?: Resources[];
  onUnlockedItemPress?: (transaction: FreeTransaction) => void;
  onLockedItemPress?: (transaction: Transaction) => void;
}) {
  const { get } = useResourcesStore();
  const itemsUnlockedStore = useItemsUnlockedStore();
  const { width } = useWindowDimensions();
  const { animValue, setEnabled } = useAnimatedValue({});

  const viewWidth = () => {
    return (width - 42 - 10 * 5) / 5;
  };

  const unlocked = () => {
    if (isUnlockableItem(itemType) && isStringItemValue(item)) {
      return (
        itemsUnlockedStore.isUnlocked(itemType, item) || (!price && !prices)
      );
    }
    return !price && !prices;
  };

  const purchasable = () => {
    if (resources && prices) {
      let index = 0;
      for (let r of resources) {
        if (get(r) < prices[index]) return false;
        index++;
      }
      return true;
    } else if (resource && price) {
      return get(resource) >= price;
    }
    return false;
  };

  return (
    <>
      <Animated.View
        style={[
          {
            transform: [
              {
                scale: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.95],
                }),
              },
            ],
          },
        ]}
      >
        <Pressable
          onPress={() => {
            setEnabled(false);
            if (unlocked()) {
              onUnlockedItemPress && onUnlockedItemPress({ item, itemType });
              return;
            }
            if (!onLockedItemPress) return;
            if (price && resource) {
              onLockedItemPress({
                item,
                itemType,
                price,
                resource,
              });
            } else if (prices && resources) {
              onLockedItemPress({
                item,
                itemType,
                prices,
                resources,
              });
            }
          }}
          onTouchStart={() => setEnabled(true)}
          onTouchEnd={() => setEnabled(false)}
          style={[
            style.border,
            style.overflowHidden,
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            {
              width: viewWidth(),
              height: viewWidth(),
              backgroundColor: unlocked()
                ? colors.gray[50]
                : purchasable()
                  ? colors.green[300]
                  : colors.red[300],
              borderColor: colors.gray[100],
              borderRadius: 10,
              margin: 5,
            },
          ]}
        >
          <ShopItemTypeView
            itemType={itemType}
            itemValue={item}
          ></ShopItemTypeView>
          {!unlocked() && (
            <View
              style={[
                {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  zIndex: 2,
                  backgroundColor: purchasable()
                    ? colors.green[400]
                    : colors.red[400],
                },
              ]}
            >
              <TextWithResourceIcon
                fontSize={12}
                textStyle={[{ fontWeight: "500" }]}
                text={price ? price : prices ? prices[0] : ""}
                resource={resource ?? (resources ? resources[0] : "pooCoins")}
              ></TextWithResourceIcon>
            </View>
          )}
        </Pressable>
      </Animated.View>
    </>
  );
}
