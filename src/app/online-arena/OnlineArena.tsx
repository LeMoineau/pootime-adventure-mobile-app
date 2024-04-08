import { useNavigation, useRoute } from "@react-navigation/native";
import PooCreature from "../../common/components/misc/poo-creature/PooCreature";
import Arena from "../../common/components/views/arena/Arena";
import useOnlineBattle from "../../common/hooks/use-online-battle";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import { useResourcesStore } from "../../common/stores/resources.store";
import {
  useNavigationType,
  useRouteType,
} from "../../common/types/navigation/NavigationTypes";
import BattleFinishRewardModal from "./modals/BattleFinishRewardModal";
import { useBattleStore } from "../../common/stores/battle.store";

export default function OnlineArena() {
  const route: useRouteType<"OnlineArena"> = useRoute();
  const navigator: useNavigationType = useNavigation();
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
  } = useOnlineBattle({ room: route.params.room });
  const { disconnect } = useBattleStore();
  const { level, pv } = usePooCreatureStatsStore();
  const { name } = usePooCreatureStyleStore();
  const { earn } = useResourcesStore();

  return (
    <>
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
            disconnect();
            navigator.navigate("App");
          }}
        ></BattleFinishRewardModal>
      )}
    </>
  );
}
