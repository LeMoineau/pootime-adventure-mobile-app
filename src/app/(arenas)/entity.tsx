import { useEffect } from "react";
import Arena from "../../common/components/views/arena/Arena";
import { colors } from "../../common/utils/color-utils";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import { useResourcesStore } from "../../common/stores/resources.store";
import EntityView from "../../features/entity-arena/components/EntityView";
import { useLocalSearchParams } from "expo-router";
import EntityZones from "../../common/config/constants/EntityZones";
import useEntityBattle from "../../features/entity-arena/hooks/use-entity-battle";
import * as NavigationBar from "expo-navigation-bar";
import useModal from "../../common/hooks/ui/use-modal";
import CustomRewardModal from "../../common/components/modals/primitives/CustomRewardModal";
import LoseAgainstEntityModal from "../../features/entity-arena/components/LoseAgainstEntityModal";
import WinAgainstEntityModal from "../../features/entity-arena/components/WinAgainstEntityModal";

export default function EntityArena() {
  const {
    pv,
    level,
    attaque,
    defense,
    mana,
    ultiSelected,
    resMana,
    recupMana,
    currentExp,
  } = usePooCreatureStatsStore();
  const { name } = usePooCreatureStyleStore();
  const { earnMany } = useResourcesStore();
  const {
    battleBegin,
    battleFinish,
    entity,
    currentEntityState,
    currentPlayerState,
    winner,
    rewards,
    startNewBattle,
    playerHit,
    playerSpell,
  } = useEntityBattle();
  const { modalContainer, openModal } = useModal();

  const { zoneIndex } = useLocalSearchParams<{ zoneIndex: string }>();

  useEffect(() => {
    if (zoneIndex) {
      startNewBattle(EntityZones[parseInt(zoneIndex)], {
        pv,
        level,
        attaque,
        defense,
        mana,
        recupMana,
        resMana,
        currentExp,
        ultiSelected,
      });
    }
  }, [zoneIndex]);

  useEffect(() => {
    if (battleFinish) {
      if (winner === "entity" && entity) {
        openModal(
          <LoseAgainstEntityModal
            {...{ entity, zoneIndex: parseInt(zoneIndex) }}
          ></LoseAgainstEntityModal>
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
              visible={true}
              rewards={rewards}
              onPressEarnBtn={() => {
                earnMany(rewards.map((r) => [r.resource, r.number]));
                openModal(winModal);
              }}
            ></CustomRewardModal>
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
      {entity && currentEntityState && currentPlayerState && (
        <Arena
          bgColor={colors.green[400]}
          onHit={playerHit}
          onSpell={playerSpell}
          battleBegin={battleBegin}
          advData={{
            name: entity.name,
            level: entity.level,
            currentPv: currentEntityState.currentPv,
            pv: entity.pv,
          }}
          playerData={{
            name,
            level,
            pv,
            currentPv: currentPlayerState.currentPv,
            currentMana: currentPlayerState.currentMana,
          }}
          advNode={
            <EntityView
              entity={entity}
              fainted={battleFinish && winner === "player"}
            ></EntityView>
          }
        ></Arena>
      )}
      {modalContainer}
    </>
  );
}
