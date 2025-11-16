import { useEffect, useState } from "react";
import { ServerTypes } from "../../types/battle/online-battle/ServerTypes";
import { Socket } from "socket.io-client";
import { globalSocket, refreshSocket } from "../../config/socket";
import { SocketEvents } from "../../types/SocketEvents";
import useModals from "../use-modals";
import { useNavigationType } from "../../types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { BattleFinalState } from "../../types/battle/BattleFinalState";
import { usePooCreatureStyleStore } from "../../stores/poo-creature-style.store";
import { usePooCreatureStatsStore } from "../../stores/poo-creature-stats.store";
import { DateUtils } from "../../utils/date-utils";

export default function useBattleRooms(props?: {
  onBattleFinish?: (newBattle: BattleFinalState) => void;
}) {
  const { isVisible, show, hide } = useModals<
    | "waiting-server-for-queue"
    | "waiting-server-for-private"
    | "private-battle"
    | "battle-waiting"
    | "battle-arena"
  >();
  const navigator: useNavigationType = useNavigation();
  const style = usePooCreatureStyleStore();
  const stats = usePooCreatureStatsStore();
  const [socket, setSocket] = useState<Socket | undefined>(globalSocket);
  const [room, setRoom] = useState<ServerTypes.Room>();

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", _connected);
    socket.on(SocketEvents.FIND_THE_ROOM, _findTheRoom);
    socket.on(SocketEvents.ROOM_CREATED, _roomCreated);
    socket.on(SocketEvents.PLAYER_JOIN_YOUR_ROOM, _playerJoinYourRoom);
    socket.on(SocketEvents.BATTLE_FINISH, _battleFinish);

    return () => {
      socket.off("connect", _connected);
      socket.off(SocketEvents.FIND_THE_ROOM, _findTheRoom);
      socket.off(SocketEvents.ROOM_CREATED, _roomCreated);
      socket.off(SocketEvents.PLAYER_JOIN_YOUR_ROOM, _playerJoinYourRoom);
      socket.off(SocketEvents.BATTLE_FINISH, _battleFinish);
    };
  }, [socket]);

  const connect = () => {
    setSocket(refreshSocket());
  };

  const disconnect = () => {
    socket?.disconnect();
    setSocket(undefined);
  };

  const _connected = () => {
    if (isVisible("waiting-server-for-queue")) {
      _joinBattleQueue();
    } else if (isVisible("waiting-server-for-private")) {
      _showPrivateModal();
    }
  };

  const _joinBattleQueue = () => {
    socket?.emit(SocketEvents.JOIN_THE_QUEUE);
    hide("waiting-server-for-queue");
    show("battle-waiting");
  };

  const _showPrivateModal = () => {
    hide("waiting-server-for-private");
    show("private-battle");
  };

  const _findTheRoom = (room: ServerTypes.Room) => {
    console.log("find the room", room);
    setRoom(room);
    navigator.navigate("OnlineArena", { room });
    hide("battle-waiting");
    hide("private-battle");
  };

  const _roomCreated = (room: ServerTypes.Room) => {
    setRoom(room);
  };

  const _playerJoinYourRoom = (room: ServerTypes.Room) => {
    setRoom(room);
    navigator.navigate("OnlineArena", { room });
    hide("private-battle");
  };

  const _battleFinish = (
    battleEnding: ServerTypes.BattleEnding,
    finalRoomState: ServerTypes.Room
  ) => {
    console.log("battle finished", room, battleEnding);
    // disconnect();
    if (socket && socket.id && props?.onBattleFinish) {
      const advSocketId = finalRoomState.players.find((p) => p !== socket.id)!;
      props.onBattleFinish({
        win: battleEnding[socket.id].victoryState === "winner",
        date: DateUtils.toDDMMYYYFormat(new Date()),
        own: { style, stats },
        adv: {
          style: finalRoomState.battleState[advSocketId].style,
          stats: {
            ...finalRoomState.battleState[advSocketId].stats,
            currentExp: 0,
          },
        },
      });
    }
  };

  const createARoom = () => {
    socket?.emit(SocketEvents.CREATE_A_ROOM);
  };

  const joinARoom = (roomCode: string) => {
    socket?.emit(SocketEvents.JOIN_A_ROOM, roomCode);
  };

  return {
    socket: socket,
    isConnected: !!socket,
    room,
    connect,
    disconnect,
    isVisible,
    show,
    hide,
    createARoom,
    joinARoom,
  };
}
