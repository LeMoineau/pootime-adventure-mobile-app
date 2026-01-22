import { Animated, Pressable, View } from "react-native";
import { colors } from "../../../../utils/color-utils";
import useAnimatedValue from "../../../../common/hooks/ui/use-animated-value";
import { useEffect, useState } from "react";
import { style } from "../../../../utils/style-utils";
import StandardButton from "../../../../components/buttons/StandardButton";
import ShopItemTypeView from "./shop-item/ShopItemTypeView";
import {
  isMultiResourcesTransaction,
  isSingleResourceTransaction,
  Transaction,
} from "../../../../types/shop/Transaction";
import ExpoIcon from "../../../../components/icons/ExpoIcon";
import TextWithResourceIcon from "../../../../components/text/TextWithResourceIcon";

export default function ShopBuyConfirmModal({
  isTransactioning,
  currentTransaction,
  cancelTransaction,
  confirmTransaction,
}: {
  isTransactioning: boolean;
  currentTransaction?: Transaction;
  cancelTransaction: () => void;
  confirmTransaction: (transaction: Transaction) => void;
}) {
  const { animValue, setEnabled } = useAnimatedValue({
    duration: 250,
    delay: 50,
  });

  useEffect(() => {
    setEnabled(isTransactioning);
  }, [isTransactioning]);

  return (
    <>
      <Pressable
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: isTransactioning ? "100%" : 0,
            zIndex: isTransactioning ? 5 : 0,
          },
        ]}
        onPress={() => {
          setEnabled(false);
          cancelTransaction();
        }}
      >
        <Animated.View
          style={[
            {
              width: "100%",
              height: "100%",
              backgroundColor: colors.black,
              opacity: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          ]}
        ></Animated.View>
      </Pressable>
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 7,
            paddingHorizontal: 10,
            opacity: animValue,
            transform: [
              {
                translateY: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [200, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View
          style={[
            style.border,
            {
              backgroundColor: colors.white,
              width: "100%",
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
              paddingVertical: 10,
            },
          ]}
        >
          {currentTransaction && (
            <View
              style={[
                style.flexRow,
                style.itemsCenter,
                {
                  flex: 1,
                  minHeight: 100,
                },
              ]}
            >
              <View style={[style.flexCol, { flex: 1 }]}>
                {isSingleResourceTransaction(currentTransaction) && (
                  <TextWithResourceIcon
                    fontSize={20}
                    textStyle={[{ fontWeight: "500" }]}
                    resource={currentTransaction.resource}
                    text={`${currentTransaction.price}`}
                  ></TextWithResourceIcon>
                )}
                {isMultiResourcesTransaction(currentTransaction) &&
                  currentTransaction.resources.map((r, index) => {
                    return (
                      <TextWithResourceIcon
                        fontSize={20}
                        textStyle={[{ fontWeight: "500" }]}
                        key={`transaction-price-${r}-${index}`}
                        resource={currentTransaction.resources[index]}
                        text={currentTransaction.prices[index]}
                      ></TextWithResourceIcon>
                    );
                  })}
              </View>
              <View>
                <ExpoIcon name="caret-right" size={40}></ExpoIcon>
              </View>
              <View
                style={[
                  { flex: 1 },
                  currentTransaction.itemType !== "heads"
                    ? [style.flexRow, style.justifyCenter, style.itemsCenter]
                    : {},
                ]}
              >
                <ShopItemTypeView
                  itemType={currentTransaction.itemType}
                  itemValue={currentTransaction.item}
                ></ShopItemTypeView>
              </View>
            </View>
          )}
          <View
            style={[
              style.flexRow,
              style.itemsCenter,
              { justifyContent: "space-around", paddingHorizontal: 10 },
            ]}
          >
            <StandardButton
              style={[{ flex: 1 }]}
              viewStyle={[
                style.roundedFull,
                { paddingVertical: 15, backgroundColor: colors.emerald[400] },
              ]}
              textStyle={[
                { fontSize: 15, fontWeight: "500", color: colors.white },
              ]}
              onPress={() =>
                currentTransaction && confirmTransaction(currentTransaction)
              }
            >
              Confirm
            </StandardButton>
            <View style={[{ width: 10 }]}></View>
            <StandardButton
              style={[{ flex: 1 }]}
              viewStyle={[
                style.roundedFull,
                { paddingVertical: 15, backgroundColor: colors.red[400] },
              ]}
              textStyle={[
                { fontSize: 15, fontWeight: "500", color: colors.white },
              ]}
              onPress={cancelTransaction}
            >
              Cancel
            </StandardButton>
          </View>
        </View>
      </Animated.View>
    </>
  );
}
