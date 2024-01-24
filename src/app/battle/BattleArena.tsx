import PooCreature from "../../common/components/misc/PooCreature";
import { useEffect, useState } from "react";
import { useBattleStore } from "../../common/stores/battle.store";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { ServerTypes } from "../../common/types/ServerTypes";
import { ServerUtils } from "../../common/utils/server-utils";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import { useImmer } from "use-immer";
import BattleFinishRewardModal from "../../common/components/modals/BattleFinishRewardModal";
import { useResourcesStore } from "../../common/stores/resources.store";
import Arena from "../../common/components/misc/Arena";

export default function BattleArena({
  room,
  onBattleFinish,
}: {
  room: ServerTypes.Room;
  onBattleFinish: () => void;
}) {
  const {
    getSocketId,
    sendPlayerInfos,
    hit,
    spell,
    whenRoomReady,
    whenBattleBegin,
    whenBattleStateUpdated,
    whenBattleFinish,
  } = useBattleStore();
  const pooCreatureStatsStore = usePooCreatureStatsStore();
  const pooCreatureStyleStore = usePooCreatureStyleStore();
  const { earn } = useResourcesStore();

  const [advStyle, setAdvStyle] = useState<ServerTypes.PlayerStyle>();
  const [advStats, setAdvStats] = useState<ServerTypes.PlayerStats>();
  const [battleBegin, setBattleBegin] = useState<boolean>(false);
  const [battleEnding, updateBattleEnding] = useImmer<
    ServerTypes.BattleEnding | undefined
  >(undefined);

  const [advState, updateAdvState] = useImmer<
    ServerTypes.PlayerState | undefined
  >(undefined);
  const [ownState, updateOwnState] = useImmer<
    ServerTypes.PlayerState | undefined
  >(undefined);

  useEffect(() => {
    whenRoomReady((r) => {
      for (let p of r.players) {
        if (r.battleState[p] === undefined) {
          continue;
        }
        if (p !== getSocketId()) {
          setAdvStyle(r.battleState[p].style);
          setAdvStats(r.battleState[p].stats);
          updateAdvState(r.battleState[p].currentState);
        } else {
          updateOwnState(r.battleState[p].currentState);
        }
      }
    });

    whenBattleBegin(() => {
      setBattleBegin(true);
    });

    whenBattleStateUpdated((updates) => {
      for (let u of updates) {
        u.target === getSocketId()
          ? updateOwnState((state) => {
              for (let k of Object.keys(u.update)) {
                state![k] = u.update[k];
              }
              return state;
            })
          : updateAdvState((state) => {
              for (let k of Object.keys(u.update)) {
                state![k] = u.update[k];
              }
              return state;
            });
      }
    });

    whenBattleFinish((battleEnding) => {
      updateBattleEnding(battleEnding);
    });

    sendPlayerInfos(
      ServerUtils.generatePlayerStyle(pooCreatureStyleStore),
      ServerUtils.generatePlayerStats(pooCreatureStatsStore)
    );
  }, [room]);

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
            level: pooCreatureStatsStore.level,
            name: pooCreatureStyleStore.name,
            pv: pooCreatureStatsStore.pv,
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
          starEarn={battleEnding[getSocketId()].rewards.stars}
          pooCoinEarn={battleEnding[getSocketId()].rewards.pooCoins}
          winner={battleEnding[getSocketId()].victoryState === "winner"}
          onRequestClose={async () => {
            await earn("stars", battleEnding[getSocketId()].rewards.stars);
            await earn(
              "pooCoins",
              battleEnding[getSocketId()].rewards.pooCoins
            );
            setBattleBegin(false);
            updateBattleEnding(undefined);
            setAdvStyle(undefined);
            setAdvStats(undefined);
            updateAdvState(undefined);
            updateOwnState(undefined);
            onBattleFinish();
          }}
        ></BattleFinishRewardModal>
      )}
    </>
  );
}
