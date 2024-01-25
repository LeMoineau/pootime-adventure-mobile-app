import { ActivityIndicator, Text, View } from "react-native";
import FightButton from "./FightButton";
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
  const { connect, isConnected, disconnect, joinTheQueue } = useBattleStore();

  const { isVisible, show, hide } = useModals<
    "private-battle" | "battle-waiting" | "battle-arena" | "server-waiting"
  >();
  const [room, setRoom] = useState<ServerTypes.Room | null>(null);

  useEffect(() => {
    connect();
    if (!isConnected()) {
      let _intervalId = setInterval(() => {
        connect();
        if (isConnected()) {
          clearInterval(_intervalId);
        }
      }, 5000);
    }
  }, []);
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
            connect();
            isConnected() ? show("battle-waiting") : show("server-waiting");
            joinTheQueue();
          }}
        ></FightButton>
        <View style={{ width: 15 }}></View>
        <FightButton
          textContent="Private"
          color={colors.blue}
          onPress={() => {
            connect();
            isConnected() ? show("private-battle") : show("server-waiting");
          }}
        ></FightButton>
      </View>
      <PlainModal
        visible={isVisible("server-waiting")}
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
        visible={isVisible("battle-waiting")}
        onRequestClose={() => {
          disconnect();
          hide("battle-waiting");
        }}
        openRoom={(room) => {
          setRoom(room);
          hide("battle-waiting");
          show("battle-arena");
        }}
      ></WaitForFightModal>
      <PrivateFightModal
        visible={isVisible("private-battle")}
        onRequestClose={() => {
          disconnect();
          hide("private-battle");
        }}
        openRoom={(room) => {
          setRoom(room);
          hide("private-battle");
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
