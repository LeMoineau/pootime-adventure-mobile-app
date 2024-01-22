import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import { ItemInStore } from "../../../common/types/itemInStore";
import { useState } from "react";
import ConfirmModal from "../../../common/components/modals/ConfirmModal";
import { useResourcesStore } from "../../../common/stores/resources.store";
import PooCoinIcon from "../../../common/components/icons/pooCoin";
import { useItemsUnlockedStore } from "../../../common/stores/items-unlocked.store";
import FaceSelector from "./FaceSelector";
import { DefaultValues } from "../../../common/config/DefaultValues";

export default function FaceEditorView() {
  const { setExpression } = usePooCreatureStyleStore();
  const { spendPooCoin } = useResourcesStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<{
    expression: string;
    price: number;
  }>({ expression: DefaultValues.PooFace, price: 0 });
  const { expressionUnlocked, unlockExpression } = useItemsUnlockedStore();

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
        {ItemInStore.expressions.map((item, index) => {
          if (typeof item === "string") {
            return (
              <FaceSelector
                uri={item}
                key={index}
                onRequestSelect={async (u) => {
                  await setExpression(u);
                }}
              ></FaceSelector>
            );
          } else if (expressionUnlocked.includes(item.uri)) {
            return (
              <FaceSelector
                uri={item.uri}
                key={index}
                onRequestSelect={async (u) => {
                  await setExpression(u);
                }}
              ></FaceSelector>
            );
          } else {
            return (
              <FaceSelector
                uri={item.uri}
                price={item.price}
                key={index}
                onRequestSelect={(e, p) => {
                  p && setCurrentTrade({ expression: e, price: p });
                  setShowConfirmModal(true);
                }}
              ></FaceSelector>
            );
          }
        })}
      </View>
      <ConfirmModal
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        onConfirm={async () => {
          spendPooCoin(currentTrade.price, async () => {
            await setExpression(currentTrade.expression);
            await unlockExpression(currentTrade.expression);
          });
          setCurrentTrade({ expression: DefaultValues.PooFace, price: 0 });
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
          <FaceSelector uri={currentTrade.expression} size={40}></FaceSelector>
        </View>
      </ConfirmModal>
    </>
  );
}
