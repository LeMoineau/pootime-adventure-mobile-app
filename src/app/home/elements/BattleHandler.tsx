import { ActivityIndicator, Text, View } from "react-native";
import FightButton from "./HomeFightButton";
import PrivateFightModal from "../../../common/components/modals/online-battle/PrivateFightModal";
import BattleArenaModal from "../../../common/components/modals/online-battle/BattleArenaModal";
import { useEffect, useState } from "react";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import { useBattleStore } from "../../../common/stores/battle.store";
import { ServerTypes } from "../../../common/types/ServerTypes";
import WaitForFightModal from "../../../common/components/modals/online-battle/WaitForFightModal";
import PlainModal from "../../../common/components/modals/primitives/PlainModal";
import useModals from "../../../common/hooks/use-modals";

export default function BattleHandler() {
  const { isConnected, connect, disconnect, joinTheQueue } = useBattleStore();
  const { isVisible, show, hide } = useModals<
    "private-battle" | "battle-waiting" | "battle-arena" | "server-waiting"
  >();

  const [room, setRoom] = useState<ServerTypes.Room | null>(null);

  return (
    <>
      <View
        style={[
          style.flexRow,
          style.justifyBetween,
          style.wFull,
          { marginTop: 15 },
        ]}
      >
        <FightButton
          textContent="Battle!"
          color={colors.yellow}
          onPress={() => {
            show("server-waiting");
            connect(() => {
              if (!isVisible("server-waiting")) {
                disconnect();
                return;
              }
              show("battle-waiting");
              joinTheQueue();
            });
          }}
        ></FightButton>
        <View style={{ width: 15 }}></View>
        <FightButton
          textContent="Private"
          color={colors.blue}
          onPress={() => {
            show("server-waiting");
            connect(() => {
              if (!isVisible("server-waiting")) {
                disconnect();
                return;
              }
              show("private-battle");
            });
          }}
        ></FightButton>
      </View>
      <PlainModal
        visible={!isConnected && isVisible("server-waiting")}
        onRequestClose={() => {
          hide("server-waiting");
        }}
      >
        <Text style={[style.textCenter, style.textMd, {}]}>
          Lancement des Serveurs
        </Text>
        <Text style={[style.textCenter, style.textSm, { marginBottom: 10 }]}>
          Temps d'attente estimé : 2 minutes
        </Text>
        <ActivityIndicator size={"large"} />
        <Text style={[style.textCenter, { marginTop: 10 }]}>
          Un peu de patience, les serveurs (gratuits) se lancent... ça chauffe !
        </Text>
      </PlainModal>
      <WaitForFightModal
        visible={isVisible("server-waiting") && isVisible("battle-waiting")}
        onRequestClose={() => {
          disconnect();
          hide("battle-waiting");
          hide("server-waiting");
        }}
        openRoom={(room) => {
          setRoom(room);
          hide("battle-waiting");
          hide("server-waiting");
          show("battle-arena");
        }}
      ></WaitForFightModal>
      <PrivateFightModal
        visible={isVisible("server-waiting") && isVisible("private-battle")}
        onRequestClose={() => {
          disconnect();
          hide("private-battle");
          hide("server-waiting");
        }}
        openRoom={(room) => {
          setRoom(room);
          hide("private-battle");
          hide("server-waiting");
          show("battle-arena");
        }}
      ></PrivateFightModal>
      {room && (
        <BattleArenaModal
          visible={isVisible("battle-arena")}
          onBattleFinish={() => {
            hide("battle-arena");
            disconnect();
            setTimeout(() => {
              setRoom(null);
            }, 500);
          }}
          room={room}
        ></BattleArenaModal>
      )}
    </>
  );
}
