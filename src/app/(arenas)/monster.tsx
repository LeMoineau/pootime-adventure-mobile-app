import { useEffect } from "react";
import Arena from "../../components/views/arena/Arena";
import { colors } from "../../utils/color-utils";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import { useResourcesStore } from "../../common/stores/resources.store";
import { useLocalSearchParams } from "expo-router";
import useMonsterBattle from "../../features/(arenas)/entity-arena/hooks/use-monster-battle";
import * as NavigationBar from "expo-navigation-bar";
import useModal from "../../common/hooks/ui/use-modal";
import CustomRewardModal from "../../components/modals/primitives/CustomRewardModal";
import LoseAgainstEntityModal from "../../features/(arenas)/entity-arena/components/LoseAgainstEntityModal";
import WinAgainstEntityModal from "../../features/(arenas)/entity-arena/components/WinAgainstEntityModal";
import { zones } from "../../constants/battle/adventure-zones";
import MonsterView from "../../features/(arenas)/entity-arena/components/MonsterView";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";

export default function MonsterArena() {
  const { level, pv } = usePooCreatureStatsStore();
  const { name } = usePooCreatureStyleStore();
  const { earnMany } = useResourcesStore();
  const {
    monster,
    battleBegin,
    battleFinish,
    currentMonsterState,
    currentPlayerState,
    winner,
    rewards,
    startNewBattle,
    playerHit,
    playerSpell,
  } = useMonsterBattle();
  const { modalContainer, openModal } = useModal();

  const { zoneIndex } = useLocalSearchParams<{ zoneIndex: string }>();

  useEffect(() => {
    if (zoneIndex) {
      startNewBattle(zones[parseInt(zoneIndex)]);
    }
  }, [zoneIndex]);

  useEffect(() => {
    if (battleFinish) {
      if (winner === "monster" && monster) {
        openModal(
          <LoseAgainstEntityModal
            {...{ monster, zoneIndex: parseInt(zoneIndex) }}
          ></LoseAgainstEntityModal>,
        );
      } else if (winner === "player") {
        const winModal = (
          <WinAgainstEntityModal
            zoneIndex={parseInt(zoneIndex)}
          ></WinAgainstEntityModal>
        );
        if (rewards && rewards.length > 0) {
          openModal(
            <CustomRewardModal
              title="Victoire !"
              desc={`Voici votre récompense pour avoir battu ${monster?.name} !`}
              visible={true}
              rewards={rewards}
              onPressEarnBtn={() => {
                earnMany(rewards.map((r) => [r.resource, r.number]));
                openModal(winModal);
              }}
            ></CustomRewardModal>,
          );
        } else {
          openModal(winModal);
        }
      }
    }
  }, [battleFinish]);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");

    return () => {
      NavigationBar.setVisibilityAsync("visible");
    };
  }, []);

  return (
    <>
      {monster && currentMonsterState && currentPlayerState && (
        <Arena
          bgColor={colors.green[400]}
          onHit={playerHit}
          onSpell={playerSpell}
          battleBegin={battleBegin}
          advData={{
            name: monster.name,
            level: monster.level,
            currentPv: currentMonsterState.currentPv,
            pv: monster.pv,
          }}
          playerData={{
            name,
            level,
            pv,
            currentPv: currentPlayerState.currentPv,
            currentMana: currentPlayerState.currentMana,
          }}
          advNode={
            <MonsterView
              monster={monster}
              fainted={battleFinish && winner === "player"}
            ></MonsterView>
          }
        ></Arena>
      )}
      {modalContainer}
    </>
  );
}
