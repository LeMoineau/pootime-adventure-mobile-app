import { Text, View } from "react-native";
import EditorColorSelector from "./EditorColorSelector";
import { style } from "./../../common/utils/style-utils";
import { usePooCreatureStore } from "../../common/stores/poo-creature.store";
import { bodyColors } from "../../common/types/bodyColors";
import { useState } from "react";
import ConfirmModal from "../../common/components/modals/ConfirmModal";
import { colors } from "../../common/utils/color-utils";
import { useResourcesStore } from "../../common/stores/resources.store";
import PooCoinIcon from "../../common/components/icons/pooCoin";
import useStorage from "../../common/hooks/use-storage";
import { StorageKeys } from "../../common/utils/storage-keys";
import { useItemsUnlockedStore } from "../../common/stores/items-unlocked.store";

export default function BodyEditorView() {
  const { setBodyColor } = usePooCreatureStore();
  const { spendPooCoin } = useResourcesStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<{
    color: string;
    price: number;
  }>({ color: colors.baseBodyColor, price: 0 });
  const { bodyColorsUnlocked, unlockBodyColors } = useItemsUnlockedStore();

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
        {bodyColors.map((item, index) => {
          if (typeof item === "string") {
            return (
              <EditorColorSelector
                color={item}
                key={index}
                onRequestSelect={setBodyColor}
              ></EditorColorSelector>
            );
          } else if (bodyColorsUnlocked.includes(item.color)) {
            return (
              <EditorColorSelector
                color={item.color}
                key={index}
                onRequestSelect={setBodyColor}
              ></EditorColorSelector>
            );
          } else {
            return (
              <EditorColorSelector
                color={item.color}
                price={item.price}
                key={index}
                onRequestSelect={(c, p) => {
                  p && setCurrentTrade({ color: c, price: p });
                  setShowConfirmModal(true);
                }}
              ></EditorColorSelector>
            );
          }
        })}
      </View>
      <ConfirmModal
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        onConfirm={async () => {
          spendPooCoin(currentTrade.price, () => {
            setBodyColor(currentTrade.color);
            unlockBodyColors(currentTrade.color);
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
          <EditorColorSelector
            color={currentTrade.color}
            size={25}
          ></EditorColorSelector>
          <Text>({currentTrade.color})</Text>
        </View>
      </ConfirmModal>
    </>
  );
}
