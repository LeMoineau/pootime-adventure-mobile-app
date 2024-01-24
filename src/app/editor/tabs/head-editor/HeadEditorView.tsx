import { Text, View } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import { usePooCreatureStyleStore } from "../../../../common/stores/poo-creature-style.store";
import { ItemInStore } from "../../../../common/types/itemInStore";
import { useState } from "react";
import ConfirmModal from "../../../../common/components/modals/ConfirmModal";
import { useResourcesStore } from "../../../../common/stores/resources.store";
import PooCoinIcon from "../../../../common/components/icons/pooCoin";
import { useItemsUnlockedStore } from "../../../../common/stores/items-unlocked.store";
import HeadSelector from "./HeadSelector";
import { DefaultValues } from "../../../../common/config/DefaultValues";
import { Resources } from "../../../../common/types/Resources";
import WoolIcon from "../../../../common/components/icons/sheep/wool";
import ResourceIcon from "../../../../common/components/icons/ResourceIcon";

export default function HeadEditorView() {
  const { setHead } = usePooCreatureStyleStore();
  const { spend } = useResourcesStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<{
    name: string;
    price: number;
    resource?: Resources;
  }>({ name: DefaultValues.PooHead, price: 0 });
  const { heads, unlock } = useItemsUnlockedStore();

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
          } else if (heads.includes(item.name)) {
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
                resource={item.resource}
                key={index}
                onRequestSelect={(name, price, resource) => {
                  price && setCurrentTrade({ name, price, resource });
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
          spend(
            currentTrade.resource ?? "pooCoins",
            currentTrade.price,
            async () => {
              await setHead(currentTrade.name);
              await unlock("heads", currentTrade.name);
            }
          );
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
          <ResourceIcon
            resource={currentTrade.resource ?? "pooCoins"}
            size={25}
          ></ResourceIcon>
          <Text> pour le visage </Text>
          <HeadSelector name={currentTrade.name} size={40}></HeadSelector>
        </View>
      </ConfirmModal>
    </>
  );
}
