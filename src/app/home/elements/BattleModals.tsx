import { View } from "react-native";
import FightButton from "./FightButton";
import PrivateFightModal from "../../../common/components/modals/PrivateFightModal";
import BattleArenaModal from "../../../common/components/modals/BattleArenaModal";
import { useState } from "react";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import { useBattleStore } from "../../../common/stores/battle.store";
import { ServerTypes } from "../../../common/types/ServerTypes";
import WaitForFightModal from "../../../common/components/modals/WaitForFightModal";

export default function BattleModals() {
  const [showPrivateModal, setShowPrivateModal] = useState(false);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [showBattleArena, setShowBattleArena] = useState(false);

  const [room, setRoom] = useState<ServerTypes.Room | null>(null);

  const { connect, disconnect, joinTheQueue } = useBattleStore();
  return (
    <>
      <View style={[style.flexRow]}>
        <FightButton
          textContent="Battle!"
          color={colors.yellow}
          onPress={() => {
            connect();
            setShowBattleModal(true);
            joinTheQueue();
          }}
        ></FightButton>
        <View style={{ width: 10 }}></View>
        <FightButton
          textContent="Private"
          color={colors.blue}
          onPress={() => {
            connect();
            setShowPrivateModal(true);
          }}
        ></FightButton>
      </View>
      <WaitForFightModal
        visible={showBattleModal}
        onRequestClose={() => {
          disconnect();
          setShowBattleModal(false);
        }}
        openRoom={(room) => {
          setRoom(room);
          setShowBattleModal(false);
          setShowBattleArena(true);
        }}
      ></WaitForFightModal>
      <PrivateFightModal
        visible={showPrivateModal}
        onRequestClose={() => {
          disconnect();
          setShowPrivateModal(false);
        }}
        openRoom={(room) => {
          setRoom(room);
          setShowPrivateModal(false);
          setShowBattleArena(true);
        }}
      ></PrivateFightModal>
      {room && (
        <BattleArenaModal
          visible={showBattleArena}
          onBattleFinish={() => {
            setShowBattleArena(false);
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
