import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import { ItemInStore } from "../../../common/types/itemInStore";
import { useState } from "react";
import ConfirmModal from "../../../common/components/modals/ConfirmModal";
import { useResourcesStore } from "../../../common/stores/resources.store";
import PooCoinIcon from "../../../common/components/icons/pooCoin";
import { useItemsUnlockedStore } from "../../../common/stores/items-unlocked.store";
import HeadSelector from "./HeadSelector";
import { DefaultValues } from "../../../common/config/DefaultValues";

export default function HeadEditorView() {
  const { setHead } = usePooCreatureStyleStore();
  const { spendPooCoin } = useResourcesStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<{
    name: string;
    price: number;
  }>({ name: DefaultValues.PooHead, price: 0 });
  const { headsUnlocked, unlockHead } = useItemsUnlockedStore();

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
        {ItemInStore.heads.map((item, index) => {
          if (typeof item === "string") {
            return (
              <HeadSelector
                name={item}
                key={index}
                onRequestSelect={async (h) => {
                  await setHead(h);
                }}
              ></HeadSelector>
            );
          } else if (headsUnlocked.includes(item.name)) {
            return (
              <HeadSelector
                name={item.name}
                key={index}
                onRequestSelect={async (h) => {
                  await setHead(h);
                }}
              ></HeadSelector>
            );
          } else {
            return (
              <HeadSelector
                name={item.name}
                price={item.price}
                key={index}
                onRequestSelect={(e, p) => {
                  p && setCurrentTrade({ name: e, price: p });
                  setShowConfirmModal(true);
                }}
              ></HeadSelector>
            );
          }
        })}
      </View>
      <ConfirmModal
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        onConfirm={async () => {
          spendPooCoin(currentTrade.price, async () => {
            await setHead(currentTrade.name);
            await unlockHead(currentTrade.name);
          });
          setCurrentTrade({ name: DefaultValues.PooHead, price: 0 });
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
          <Text> pour le visage </Text>
          <HeadSelector name={currentTrade.name} size={40}></HeadSelector>
        </View>
      </ConfirmModal>
    </>
  );
}
