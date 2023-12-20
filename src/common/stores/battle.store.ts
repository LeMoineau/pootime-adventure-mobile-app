import { create } from "zustand";
import { Socket, io } from "socket.io-client";
import { Config } from "../config/env";

type Store = {
  socket: Socket | null;
  connect: () => void;
};

export const useBattleStore = create<Store>((set, get) => {
  const connect = () => {
    set({
      socket: io(Config.BATTLE_SERVER_URL!),
    });
  };

  return {
    socket: null,
    connect,
  };
});
