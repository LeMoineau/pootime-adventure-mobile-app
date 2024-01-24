import PooCreature from "../../common/components/misc/PooCreature";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { ServerTypes } from "../../common/types/ServerTypes";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import BattleFinishRewardModal from "../../common/components/modals/BattleFinishRewardModal";
import { useResourcesStore } from "../../common/stores/resources.store";
import Arena from "../../common/components/misc/Arena";
import useOnlineBattle from "../../common/hooks/use-online-battle";

export default function BattleArena({
  room,
  onBattleFinish,
}: {
  room: ServerTypes.Room;
  onBattleFinish: () => void;
}) {
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
    </>
  );
}
