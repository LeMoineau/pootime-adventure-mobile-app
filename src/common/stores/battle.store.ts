import { create } from "zustand";
import { Socket } from "socket.io-client";
import { ServerTypes } from "../types/ServerTypes";
import { SocketEvents } from "../types/SocketEvents";
import { UltiDetails } from "../types/Ultis";

type Store = {
  socket: Socket | null;
  isConnected: boolean;
  connect: (onSuccess?: () => void, onFailed?: () => void) => void;
  getSocketId: () => string;
  disconnect: () => void;
  createARoom: () => void;
  joinARoom: (roomId: string) => void;
  sendPlayerInfos: (
    style: ServerTypes.PlayerStyle,
    stats: ServerTypes.PlayerStats
  ) => void;
  hit: () => void;
  spell: (ulti: UltiDetails) => void;
  joinTheQueue: () => void;
  whenPlayerJoinYourRoom: (callback: (room: ServerTypes.Room) => void) => void;
  whenFindTheRoom: (callback: (room: ServerTypes.Room) => void) => void;
  whenRoomCreated: (callback: (room: ServerTypes.Room) => void) => void;
  whenRoomReady: (callback: (room: ServerTypes.Room) => void) => void;
  whenBattleBegin: (callback: () => void) => void;
  whenBattleStateUpdated: (
    callback: (updates: ServerTypes.BattleUpdatePayload) => void
  ) => void;
  whenBattleFinish: (
    callback: (battleEnding: ServerTypes.BattleEnding) => void
  ) => void;
};

export const useBattleStore = create<Store>((set, get) => {
  const connect = (onSuccess?: () => void, onFailed?: () => void) => {
    var io = require("socket.io-client/dist/socket.io");
    //https://pootime-adventure-battle-server.onrender.com/
    const socket = io("https://pootime-adventure-battle-server.onrender.com/", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      set({ isConnected: true });
      onSuccess && onSuccess();
    });
    socket.on("connect_error", () => {
      onFailed && onFailed();
    });
    set({
      socket: socket,
    });
  };

  const getSocketId = () => {
    return get().socket?.id!;
  };

  const disconnect = () => {
    get().socket?.disconnect();
    set({
      socket: null,
      isConnected: false,
    });
  };

  const createARoom = () => {
    get().socket?.emit(SocketEvents.CREATE_A_ROOM);
  };

  const joinARoom = (roomId: string) => {
    get().socket?.emit(SocketEvents.JOIN_A_ROOM, roomId);
  };

  const sendPlayerInfos = (
    style: ServerTypes.PlayerStyle,
    stats: ServerTypes.PlayerStats
  ) => {
    get().socket?.emit(SocketEvents.SEND_PLAYER_INFOS, style, stats);
  };

  const hit = () => {
    get().socket?.emit(SocketEvents.HIT);
  };

  const spell = (ulti: UltiDetails) => {
    get().socket?.emit(SocketEvents.SPELL, ulti);
  };

  const joinTheQueue = () => {
    get().socket?.emit(SocketEvents.JOIN_THE_QUEUE);
  };

  const whenPlayerJoinYourRoom = (
    callback: (room: ServerTypes.Room) => void
  ) => {
    get().socket?.on(SocketEvents.PLAYER_JOIN_YOUR_ROOM, callback);
  };

  const whenFindTheRoom = (callback: (room: ServerTypes.Room) => void) => {
    get().socket?.on(SocketEvents.FIND_THE_ROOM, callback);
  };

  const whenRoomCreated = (callback: (room: ServerTypes.Room) => void) => {
    get().socket?.on(SocketEvents.ROOM_CREATED, callback);
  };

  const whenRoomReady = (callback: (room: ServerTypes.Room) => void) => {
    get().socket?.on(SocketEvents.ROOM_READY, callback);
  };

  const whenBattleBegin = (callback: () => void) => {
    get().socket?.on(SocketEvents.BATTLE_BEGIN, callback);
  };

  const whenBattleStateUpdated = (
    callback: (updates: ServerTypes.BattleUpdatePayload) => void
  ) => {
    get().socket?.on(SocketEvents.UPDATE_BATTLE_STATE, callback);
  };

  const whenBattleFinish = (
    callback: (battleEnding: ServerTypes.BattleEnding) => void
  ) => {
    get().socket?.on(SocketEvents.BATTLE_FINISH, callback);
  };

  return {
    socket: null,
    isConnected: false,
    connect,
    getSocketId,
    disconnect,
    createARoom,
    joinARoom,
    sendPlayerInfos,
    hit,
    spell,
    joinTheQueue,
    whenPlayerJoinYourRoom,
    whenFindTheRoom,
    whenRoomCreated,
    whenRoomReady,
    whenBattleBegin,
    whenBattleStateUpdated,
    whenBattleFinish,
  };
});
