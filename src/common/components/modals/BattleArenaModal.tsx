import { Modal, ModalProps } from "react-native";
import React from "react";
import BattleArena from "../../../app/battle/BattleArena";
import { ServerTypes } from "../../types/ServerTypes";

export default function BattleArenaModal({
  room,
  onBattleFinish,
  ...props
}: { room: ServerTypes.Room; onBattleFinish: () => void } & ModalProps) {
  return (
    <Modal animationType="slide" transparent {...props}>
      <BattleArena room={room} onBattleFinish={onBattleFinish}></BattleArena>
    </Modal>
  );
}
