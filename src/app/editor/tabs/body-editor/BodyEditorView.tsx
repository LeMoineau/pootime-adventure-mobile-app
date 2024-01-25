import { Text, View } from "react-native";
import ColorSelector from "./ColorSelector";
import { style } from "../../../../common/utils/style-utils";
import { usePooCreatureStyleStore } from "../../../../common/stores/poo-creature-style.store";
import { ItemInStore } from "../../../../common/types/itemInStore";
import { useState } from "react";
import ConfirmModal from "../../../../common/components/modals/primitives/ConfirmModal";
import { colors } from "../../../../common/utils/color-utils";
import { useResourcesStore } from "../../../../common/stores/resources.store";
import PooCoinIcon from "../../../../common/components/icons/pooCoin";
import { useItemsUnlockedStore } from "../../../../common/stores/items-unlocked.store";
import { DefaultValues } from "../../../../common/config/DefaultValues";

export default function BodyEditorView() {
  const { update } = usePooCreatureStyleStore();
  const { spend } = useResourcesStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<{
    color: string;
    price: number;
  }>({ color: DefaultValues.PooCreatureStyle.bodyColor, price: 0 });
  const { unlock, isUnlocked } = useItemsUnlockedStore();

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
                onRequestSelect={(color) => {
                  update("bodyColor", color);
                }}
              ></ColorSelector>
            );
          } else if (isUnlocked("bodyColors", item.color)) {
            return (
              <ColorSelector
                color={item.color}
                key={index}
                onRequestSelect={(color) => {
                  update("bodyColor", color);
                }}
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
          spend("pooCoins", currentTrade.price, async () => {
            await update("bodyColor", currentTrade.color);
            await unlock("bodyColors", currentTrade.color);
          });
          setCurrentTrade({
            color: DefaultValues.PooCreatureStyle.bodyColor,
            price: 0,
          });
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
