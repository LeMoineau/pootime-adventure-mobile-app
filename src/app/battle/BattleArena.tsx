import { Image, Pressable, Text, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import { colors } from "../../common/utils/color-utils";
import AnimatedBackground from "../../common/components/misc/AnimatedBackground";
import PooCreature from "../../common/components/misc/PooCreature";
import PVPanel from "./elements/PVPanel";
import { useEffect, useReducer, useState } from "react";
import { useBattleStore } from "../../common/stores/battle.store";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { ServerTypes } from "../../common/types/ServerTypes";
import { ServerUtils } from "../../common/utils/server-utils";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import ReadyGoText from "./elements/ReadyGoText";
import UltiButton from "./elements/UltiButton";
import { Ultis } from "../../common/types/Ultis";
import { useImmer } from "use-immer";
import BattleFinishRewardModal from "../../common/components/modals/BattleFinishRewardModal";
import { useResourcesStore } from "../../common/stores/resources.store";

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
  const { earnStar, earnPooCoin } = useResourcesStore();

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
      console.log(battleEnding);
    });

    sendPlayerInfos(
      ServerUtils.generatePlayerStyle(pooCreatureStyleStore),
      ServerUtils.generatePlayerStats(pooCreatureStatsStore)
    );
  }, [room]);

  return (
    <Pressable
      style={{ flex: 1 }}
      onPressIn={() => {
        battleBegin && hit();
      }}
    >
      <View
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, padding: 20, backgroundColor: colors.white },
        ]}
      >
        <AnimatedBackground
          imageUri="https://bigstones.fr/pootime-adventure/poofight.png"
          bgColor={colors.blue[500]}
        ></AnimatedBackground>
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            style.wFull,
            {
              justifyContent: "space-between",
              position: "absolute",
              top: 30,
              left: 0,
            },
          ]}
        >
          {advStyle && advStats && (
            <>
              <PVPanel
                pooName={pooCreatureStyleStore.name}
                pvMax={pooCreatureStatsStore.pv}
                currentPv={ownState?.currentPv ?? pooCreatureStatsStore.pv}
              ></PVPanel>
              <PVPanel
                pooName={advStyle.name}
                pvMax={advStats.pv}
                currentPv={advState?.currentPv ?? advStats.pv}
                right
              ></PVPanel>
            </>
          )}
        </View>
        <View
          style={[
            {
              position: "absolute",
              bottom: "50%",
              right: 30,
              marginBottom: 20,
            },
          ]}
        >
          <PooCreature width={180}></PooCreature>
        </View>
        <View
          style={[
            { position: "absolute", top: "50%", left: 30, marginTop: 20 },
          ]}
        >
          <PooCreature behind width={230}></PooCreature>
        </View>
        {pooCreatureStatsStore.ultiSelected && (
          <UltiButton
            ultiSelected={Ultis[pooCreatureStatsStore.ultiSelected]}
            currentMana={ownState?.currentMana ?? 0}
            onPress={(u) => {
              battleBegin &&
                ownState?.currentMana &&
                ownState?.currentMana >= u.details.mana &&
                spell(u.details);
            }}
          ></UltiButton>
        )}
        <ReadyGoText
          battleReady={advStyle !== undefined && advStats !== undefined}
          battleBegin={battleBegin}
        ></ReadyGoText>
      </View>
      {battleEnding && (
        <BattleFinishRewardModal
          visible={battleEnding !== undefined}
          starEarn={battleEnding[getSocketId()].rewards.stars}
          pooCoinEarn={battleEnding[getSocketId()].rewards.pooCoins}
          winner={battleEnding[getSocketId()].victoryState === "winner"}
          onRequestClose={async () => {
            await earnStar(battleEnding[getSocketId()].rewards.stars);
            await earnPooCoin(battleEnding[getSocketId()].rewards.pooCoins);
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
    </Pressable>
  );
}
