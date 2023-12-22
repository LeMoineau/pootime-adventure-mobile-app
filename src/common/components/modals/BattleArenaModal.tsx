import { Modal, ModalProps, Pressable, Text, View } from "react-native";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";
import React, { useState } from "react";
import { useBattleStore } from "../../stores/battle.store";
import PlusIcon from "../icons/plus";
import InputField from "../fields/InputField";
import PillButton from "../buttons/PillButton";
import { Room } from "../../types/Room";
import PooCreature from "../misc/PooCreature";
import AnimatedBackground from "../misc/AnimatedBackground";
import ProgressBar from "../fields/ProgressBar";
import BattleArena from "../../../app/battle/BattleArena";

export default function BattleArenaModal({
  room,
  ...props
}: { room: Room } & ModalProps) {
  return (
    <Modal animationType="slide" transparent {...props}>
      <BattleArena room={room}></BattleArena>
    </Modal>
  );
}
