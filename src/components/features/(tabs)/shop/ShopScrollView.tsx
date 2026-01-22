import { Pressable, View } from "react-native";
import { useState } from "react";
import { Transaction } from "../../../../types/shop/Transaction";
import { style } from "../../../../constants/style/styles";
import { colors } from "../../../../constants/style/colors";
import ShopBuyConfirmModal from "./ShopBuyConfirmModal";

export default function ShopScrollView({
  tabs,
  defaultTabIndex,
  isTransactioning,
  currentTransaction,
  onModalCancel,
  onModalConfirm,
}: {
  defaultTabIndex?: number;
  tabs: { icon: React.ReactNode; tab: React.ReactNode }[];
  isTransactioning?: boolean;
  currentTransaction?: Transaction;
  onModalConfirm?: () => void;
  onModalCancel?: () => void;
}) {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
    defaultTabIndex ?? 0,
  );

  return (
    <>
      <View
        style={[
          style.border,
          style.flexCol,
          style.overflowHidden,
          {
            backgroundColor: colors.white,
            width: "100%",
            flex: 1,
            paddingTop: 0,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          },
        ]}
      >
        <ShopBuyConfirmModal
          isTransactioning={isTransactioning ?? false}
          currentTransaction={currentTransaction}
          cancelTransaction={() => onModalCancel && onModalCancel()}
          confirmTransaction={() => onModalConfirm && onModalConfirm()}
        ></ShopBuyConfirmModal>

        {/* HEADER TAB SELECTOR */}
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            {
              borderBottomWidth: 1,
              borderColor: colors.gray[200],
              backgroundColor: colors.gray[100],
            },
          ]}
        >
          {tabs.map(({ icon }, index) => (
            <Pressable
              key={`shop-tab-selector-${index}`}
              onPress={() => setSelectedTabIndex(index)}
              style={[
                style.flexRow,
                style.justifyCenter,
                style.itemsCenter,
                {
                  padding: 10,
                  height: "100%",
                  borderBottomWidth: 2,
                  borderColor:
                    selectedTabIndex === index
                      ? colors.blue[400]
                      : colors.transparent,
                },
              ]}
            >
              {icon}
            </Pressable>
          ))}
        </View>

        {/* TABS */}
        {tabs.map(({ tab }, index) => (
          <View
            key={`shop-tab-${index}`}
            style={[
              {
                flex: 1,
                display: selectedTabIndex === index ? "flex" : "none",
              },
            ]}
          >
            {tab}
          </View>
        ))}
      </View>
    </>
  );
}
