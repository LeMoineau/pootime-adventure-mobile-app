import { useEffect } from "react";
import Arena from "../../common/components/views/arena/Arena";
import useEntityBattleStore from "../../common/stores/battle/entity-battle.store";
import { colors } from "../../common/utils/color-utils";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import { useResourcesStore } from "../../common/stores/resources.store";
import EntityView from "../../features/entity-arena/components/EntityView";
import EntityBattleRewardModal from "../../features/entity-arena/components/modals/EntityBattleRewardModal";
import { router, useLocalSearchParams } from "expo-router";
import EntityZones from "../../common/config/constants/EntityZones";

export default function EntityArena() {
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
    reset,
  } = useEntityBattleStore();
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
  const { earn } = useResourcesStore();

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
      {entity && winner && rewards && (
        <EntityBattleRewardModal
          visible={battleFinish}
          rewards={rewards}
          winner={winner}
          entity={entity}
          onCollectingRewards={(rewards) => {
            for (let r of rewards) {
              earn(r.resource, r.number);
            }
            reset();
            router.dismissTo("(tabs)/home");
          }}
        ></EntityBattleRewardModal>
      )}
    </>
  );
}
