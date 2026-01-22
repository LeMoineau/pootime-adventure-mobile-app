import PooCreature from "../../components/misc/poo-creature/PooCreature";
import Arena from "../../components/views/arena/Arena";
import useOnlineBattle from "../../features/(arenas)/online-arena/hooks/use-online-battle";
import { usePooCreatureStatsStore } from "../../stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../stores/poo-creature-style.store";
import { useResourcesStore } from "../../stores/resources.store";
import { View } from "react-native";
import NodeShadow from "../../components/views/arena/elements/NodeShadow";
import { useEffect } from "react";
import { Resources } from "../../config/constants/Resources";
import BattleFinishRewardModal from "../../features/(arenas)/online-arena/components/BattleFinishRewardModal";
import { router } from "expo-router";

export default function OnlineArenaScreen() {
  const {
    socketId,
    isBattleBeginning,
    battleEnding,
    advState,
    advStyle,
    advStats,
    ownState,
    hit,
    spell,
    collectRewards,
    reset,
    disconnect,
  } = useOnlineBattle();
  const { level, pv } = usePooCreatureStatsStore();
  const { name } = usePooCreatureStyleStore();
  const { get } = useResourcesStore();

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <>
      <Arena
        battleBegin={isBattleBeginning}
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
            <>
              <PooCreature
                bodyColorProps={advStyle.bodyColor}
                expressionProps={advStyle.expression}
                headProps={advStyle.head}
                levelProps={advStats.level}
                width={180}
              ></PooCreature>
              <View style={[{ transform: [{ translateY: 90 }] }]}>
                <NodeShadow></NodeShadow>
              </View>
            </>
          )
        }
        noAdvNodeShadow
        onHit={() => {
          isBattleBeginning && hit();
        }}
        onSpell={(u) => {
          isBattleBeginning &&
            ownState?.currentMana &&
            ownState?.currentMana >= u.mana &&
            spell(u);
        }}
      ></Arena>
      {battleEnding && (
        <BattleFinishRewardModal
          visible={battleEnding !== undefined}
          rewards={
            battleEnding[socketId].rewards.pooTrophees !== undefined &&
            battleEnding[socketId].rewards.pooTrophees < 0 &&
            get("pooTrophee") <= 0
              ? []
              : Object.entries(battleEnding[socketId].rewards).map(
                  ([k, i]) => ({ resource: k as Resources, number: i }),
                )
          }
          winner={battleEnding[socketId].victoryState === "winner"}
          onPressEarnBtn={() => {
            collectRewards(battleEnding[socketId].rewards);
            reset();
            router.dismissTo("(tabs)/fight");
          }}
        ></BattleFinishRewardModal>
      )}
    </>
  );
}
