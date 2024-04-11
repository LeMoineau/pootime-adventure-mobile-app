import { Text, View, useWindowDimensions } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import { usePooCreatureStyleStore } from "../../../../common/stores/poo-creature-style.store";
import { ItemInStore } from "../../../../common/types/itemInStore";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "../../../../common/components/modals/primitives/ConfirmModal";
import { useResourcesStore } from "../../../../common/stores/resources.store";
import { useItemsUnlockedStore } from "../../../../common/stores/items-unlocked.store";
import HeadSelector from "./HeadSelector";
import { DefaultValues } from "../../../../common/config/DefaultValues";
import { Resources } from "../../../../common/config/game-data/Resources";
import ResourceIcon from "../../../../common/components/icons/ResourceIcon";
import PooHeadPalette from "../../../../common/components/misc/poo-creature/PooHeadPalette";
import { usePooCreatureStatsStore } from "../../../../common/stores/poo-creature-stats.store";

export default function HeadEditorView() {
  const { level } = usePooCreatureStatsStore();
  const { update } = usePooCreatureStyleStore();
  const { spend } = useResourcesStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<{
    name: string;
    price: number;
    resource?: Resources;
  }>({ name: DefaultValues.PooCreatureStyle.head, price: 0 });
  const { unlock, isUnlocked } = useItemsUnlockedStore();

  return (
    <>
      <View style={[{ paddingHorizontal: 15, paddingTop: 10 }]}>
        <PooHeadPalette
          style={[
            style.flexRow,
            style.justifyCenter,
            style.rounded,
            style.overflowHidden,
            style.wFull,
            {
              flex: 1,
              minHeight: 20,
              height: 20,
            },
          ]}
          palette={DefaultValues.PooHeadPalette}
          resolution={DefaultValues.LevelMax}
          addMarkerOn={level - 1}
        ></PooHeadPalette>
      </View>

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
                  await update("head", h);
                }}
              ></HeadSelector>
            );
          } else if (isUnlocked("heads", item.name)) {
            return (
              <HeadSelector
                name={item.name}
                key={index}
                onRequestSelect={async (h) => {
                  await update("head", h);
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
              await update("head", currentTrade.name);
              await unlock("heads", currentTrade.name);
            }
          );
          setCurrentTrade({
            name: DefaultValues.PooCreatureStyle.head,
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
