import { useEffect, useState } from "react";
import { ServerTypes } from "../../../../types/battle/online-battle/ServerTypes";
import { Socket } from "socket.io-client";
import { SocketEvents } from "../../../../types/SocketEvents";
import useModals from "../../../../common/hooks/ui/use-modals";
import { BattleFinalState } from "../../../../types/battle/BattleFinalState";
import { usePooCreatureStyleStore } from "../../../../common/stores/poo-creature-style.store";
import { usePooCreatureStatsStore } from "../../../../common/stores/poo-creature-stats.store";
import { DateUtils } from "../../../../common/utils/date-utils";
import { useResourcesStore } from "../../../../common/stores/resources.store";
import { router } from "expo-router";
import { globalSocket, refreshSocket } from "../../../../config/socket";

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
  const style = usePooCreatureStyleStore();
  const stats = usePooCreatureStatsStore();
  const { get } = useResourcesStore();
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
    socket?.emit(SocketEvents.JOIN_THE_QUEUE, get("pooTrophee"));
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
    router.push("/(arenas)/online");
    hide("battle-waiting");
    hide("private-battle");
  };

  const _roomCreated = (room: ServerTypes.Room) => {
    setRoom(room);
  };

  const _playerJoinYourRoom = (room: ServerTypes.Room) => {
    setRoom(room);
    router.push("/(arenas)/online");
    hide("private-battle");
  };

  const _battleFinish = (
    battleEnding: ServerTypes.BattleEnding,
    finalRoomState: ServerTypes.Room,
  ) => {
    resetRoom();
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

  const resetRoom = () => {
    setRoom(undefined);
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
    resetRoom,
  };
}
