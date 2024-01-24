import { Text, View } from "react-native";
import ColorSelector from "./ColorSelector";
import { style } from "../../../../common/utils/style-utils";
import { usePooCreatureStyleStore } from "../../../../common/stores/poo-creature-style.store";
import { ItemInStore } from "../../../../common/types/itemInStore";
import { useState } from "react";
import ConfirmModal from "../../../../common/components/modals/ConfirmModal";
import { colors } from "../../../../common/utils/color-utils";
import { useResourcesStore } from "../../../../common/stores/resources.store";
import PooCoinIcon from "../../../../common/components/icons/pooCoin";
import { useItemsUnlockedStore } from "../../../../common/stores/items-unlocked.store";

export default function BodyEditorView() {
  const { setBodyColor } = usePooCreatureStyleStore();
  const { spendPooCoin } = useResourcesStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<{
    color: string;
    price: number;
  }>({ color: colors.baseBodyColor, price: 0 });
  const { bodyColors, unlock } = useItemsUnlockedStore();

  return (
    <>
      <View
        style={[
          style.flexRow,
          style.wFull,
          style.justifyCenter,
          style.itemsCenter,
          { flexWrap: "wrap", padding: 10 },
        ]}
      >
        {ItemInStore.bodyColors.map((item, index) => {
          if (typeof item === "string") {
            return (
              <ColorSelector
                color={item}
                key={index}
                onRequestSelect={setBodyColor}
              ></ColorSelector>
            );
          } else if (bodyColors.includes(item.color)) {
            return (
              <ColorSelector
                color={item.color}
                key={index}
                onRequestSelect={setBodyColor}
              ></ColorSelector>
            );
          } else {
            return (
              <ColorSelector
                color={item.color}
                price={item.price}
                key={index}
                onRequestSelect={(c, p) => {
                  p && setCurrentTrade({ color: c, price: p });
                  setShowConfirmModal(true);
                }}
              ></ColorSelector>
            );
          }
        })}
      </View>
      <ConfirmModal
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        onConfirm={async () => {
          spendPooCoin(currentTrade.price, async () => {
            await setBodyColor(currentTrade.color);
            await unlock("bodyColors", currentTrade.color);
          });
          setCurrentTrade({ color: colors.baseBodyColor, price: 0 });
        }}
      >
        <View
          style={[
            style.flexRow,
            style.justifyCenter,
            style.flexWrap,
            style.itemsCenter,
          ]}
        >
          <Text>Voulez-vous dépenser {currentTrade.price} </Text>
          <PooCoinIcon></PooCoinIcon>
          <Text> pour la couleur </Text>
          <ColorSelector color={currentTrade.color} size={25}></ColorSelector>
          <Text>({currentTrade.color})</Text>
        </View>
      </ConfirmModal>
    </>
  );
}
