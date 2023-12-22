import { View } from "react-native";
import FightButton from "./elements/FightButton";
import PrivateFightModal from "../../common/components/modals/PrivateFightModal";
import BattleArenaModal from "../../common/components/modals/BattleArenaModal";
import { useState } from "react";
import { style } from "../../common/utils/style-utils";
import { colors } from "../../common/utils/color-utils";
import { Room } from "../../common/types/Room";
import { useBattleStore } from "../../common/stores/battle.store";

export default function BattleHome() {
  const [showPrivateModal, setShowPrivateModal] = useState(false);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [showBattleArena, setShowBattleArena] = useState(false);

  const [room, setRoom] = useState<Room | null>(null);

  const { connect, disconnect } = useBattleStore();
  return (
    <>
      <View style={[style.flexRow]}>
        <FightButton
          textContent="Battle!"
          color={colors.yellow}
          onPress={() => {}}
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
          onRequestClose={() => {
            setShowBattleArena(false);
          }}
          room={room}
        ></BattleArenaModal>
      )}
      <BattleArenaModal
        visible={false}
        onRequestClose={() => {
          setShowBattleArena(false);
        }}
        room={{} as Room}
      ></BattleArenaModal>
    </>
  );
}
