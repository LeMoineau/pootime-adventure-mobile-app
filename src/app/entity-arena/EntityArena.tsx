import { useEffect } from "react";
import Arena from "../../common/components/views/arena/Arena";
import useEntityBattleStore from "../../common/stores/battle/entity-battle.store";
import { colors } from "../../common/utils/color-utils";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import { CutSheepIcon } from "../../common/components/icons/sheep/cutSheep";
import SheepIcon from "../../common/components/icons/sheep/sheep";
import EntityBattleRewardModal from "./modals/EntityBattleRewardModal";
import { EntityBattleUtils } from "../../common/utils/entity-battle-utils";
import { useResourcesStore } from "../../common/stores/resources.store";
import EntityZones from "../../common/config/game-data/EntityZones";
import {
  useNavigationType,
  useRouteType,
} from "../../common/types/navigation/NavigationTypes";
import { useNavigation, useRoute } from "@react-navigation/native";

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
  const route: useRouteType<"EntityArena"> = useRoute();
  const navigator: useNavigationType = useNavigation();

  useEffect(() => {
    startNewBattle(EntityZones[route.params.zoneIndex], {
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
            battleFinish && winner === "player" ? (
              <CutSheepIcon woolColor={entity.color} ratio={0.5}></CutSheepIcon>
            ) : (
              <SheepIcon woolColor={entity.color} ratio={0.5}></SheepIcon>
            )
          }
        ></Arena>
      )}
      {entity && winner && rewards && (
        <EntityBattleRewardModal
          visible={battleFinish}
          rewards={rewards}
          entity={entity}
          onCollectingRewards={(rewards) => {
            for (let r of rewards) {
              earn(r.resource, r.number);
            }
            reset();
            navigator.goBack();
          }}
        ></EntityBattleRewardModal>
      )}
    </>
  );
}
