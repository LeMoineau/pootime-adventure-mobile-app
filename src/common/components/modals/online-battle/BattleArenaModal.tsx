import { Modal, ModalProps } from "react-native";
import React from "react";
import { ServerTypes } from "../../../types/ServerTypes";
import useOnlineBattle from "../../../hooks/use-online-battle";
import { usePooCreatureStatsStore } from "../../../stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../../stores/poo-creature-style.store";
import { useResourcesStore } from "../../../stores/resources.store";
import Arena from "../../views/arena/Arena";
import PooCreature from "../../misc/PooCreature";
import BattleFinishRewardModal from "./BattleFinishRewardModal";

export default function BattleArenaModal({
  room,
  onBattleFinish,
  ...props
}: { room: ServerTypes.Room; onBattleFinish: () => void } & ModalProps) {
  const {
    socketId,
    battleBegin,
    battleEnding,
    advState,
    advStyle,
    advStats,
    ownState,
    hit,
    spell,
    reset,
  } = useOnlineBattle({ room });
  const { level, pv } = usePooCreatureStatsStore();
  const { name } = usePooCreatureStyleStore();
  const { earn } = useResourcesStore();

  return (
    <Modal animationType="slide" transparent {...props}>
      <Arena
        battleBegin={battleBegin}
        advData={
          advState &&
          advStyle &&
          advStats && {
            level: advStats?.level,
            name: advStyle?.name,
            pv: advStats?.pv,
            currentPv: advState?.currentPv,
          }
        }
        playerData={
          ownState && {
            level: level,
            name: name,
            pv: pv,
            currentPv: ownState?.currentPv,
            currentMana: ownState?.currentMana,
          }
        }
        advNode={
          advStyle &&
          advStats && (
            <PooCreature
              bodyColorProps={advStyle.bodyColor}
              expressionProps={advStyle.expression}
              headProps={advStyle.head}
              levelProps={advStats.level}
              width={180}
            ></PooCreature>
          )
        }
        onHit={() => {
          battleBegin && hit();
        }}
        onSpell={(u) => {
          battleBegin &&
            ownState?.currentMana &&
            ownState?.currentMana >= u.mana &&
            spell(u);
        }}
      ></Arena>
      {battleEnding && (
        <BattleFinishRewardModal
          visible={battleEnding !== undefined}
          starEarn={battleEnding[socketId].rewards.stars}
          pooCoinEarn={battleEnding[socketId].rewards.pooCoins}
          winner={battleEnding[socketId].victoryState === "winner"}
          onRequestClose={async () => {
            await earn("stars", battleEnding[socketId].rewards.stars);
            await earn("pooCoins", battleEnding[socketId].rewards.pooCoins);
            reset();
            onBattleFinish();
          }}
        ></BattleFinishRewardModal>
      )}
    </Modal>
  );
}
