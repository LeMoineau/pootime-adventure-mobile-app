import { useNavigation } from "@react-navigation/native";
import PooCreature from "../../common/components/misc/poo-creature/PooCreature";
import Arena from "../../common/components/views/arena/Arena";
import useOnlineBattle from "../../common/hooks/battle/use-online-battle";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import { useResourcesStore } from "../../common/stores/resources.store";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import BattleFinishRewardModal from "./modals/BattleFinishRewardModal";
import { View } from "react-native";
import NodeShadow from "../../common/components/views/arena/elements/NodeShadow";
import { useEffect } from "react";

export default function OnlineArena() {
  const navigator: useNavigationType = useNavigation();
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
    reset,
    disconnect,
  } = useOnlineBattle();
  const { level, pv } = usePooCreatureStatsStore();
  const { name } = usePooCreatureStyleStore();
  const { earn } = useResourcesStore();

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
          rewards={[
            { resource: "stars", number: battleEnding[socketId].rewards.stars },
            {
              resource: "pooCoins",
              number: battleEnding[socketId].rewards.pooCoins,
            },
          ]}
          winner={battleEnding[socketId].victoryState === "winner"}
          onRequestClose={async () => {
            const starEarn = battleEnding[socketId].rewards.stars;
            const pooCoinEarn = battleEnding[socketId].rewards.pooCoins;
            earn("stars", starEarn);
            earn("pooCoins", pooCoinEarn);
            reset();
            navigator.navigate("App");
          }}
        ></BattleFinishRewardModal>
      )}
    </>
  );
}
