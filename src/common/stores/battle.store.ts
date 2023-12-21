import { create } from "zustand";
import { Socket, io } from "socket.io-client";
import { Config } from "../config/env";
import { JSONObject } from "../types/JSONObject";
import { Room } from "../types/Room";

type Store = {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
  createARoom: () => void;
  joinARoom: (roomId: string) => void;
  whenPlayerJoinYourRoom: (callback: (room: Room) => void) => void;
  whenFindTheRoom: (callback: (room: Room) => void) => void;
  whenRoomCreated: (callback: (room: Room) => void) => void;
};

export const useBattleStore = create<Store>((set, get) => {
  const connect = () => {
    set({
      socket: io(Config.BATTLE_SERVER_URL!),
    });
  };

  const disconnect = () => {
    get().socket?.disconnect();
    set({
      socket: null,
    });
  };

  const createARoom = () => {
    get().socket?.emit("create-a-room");
  };

  const joinARoom = (roomId: string) => {
    get().socket?.emit("join-a-room", roomId);
  };

  const whenPlayerJoinYourRoom = (callback: (room: Room) => void) => {
    get().socket?.on("player-join-your-room", callback);
  };

  const whenFindTheRoom = (callback: (room: Room) => void) => {
    get().socket?.on("find-the-room", callback);
  };

  const whenRoomCreated = (callback: (room: Room) => void) => {
    get().socket?.on("room-created", callback);
  };

  return {
    socket: null,
    connect,
    disconnect,
    createARoom,
    joinARoom,
    whenPlayerJoinYourRoom,
    whenFindTheRoom,
    whenRoomCreated,
  };
});
