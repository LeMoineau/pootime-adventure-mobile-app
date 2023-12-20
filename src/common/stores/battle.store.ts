import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { ArrayUtils } from "../utils/array-utils";
import { DataInStorage } from "../types/dataInStorage";
import { Socket, io } from "socket.io-client";

type Store = {
  socket: Socket;
};

export const useBattleStore = create<Store>((set, get) => {
  const { getJson, addItemInObjectInJson, saveJson } = useStorage();

  return {
    socket: io("http://localhost:3000"),
  };
});
