import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = __DEV__
  ? "http://10.172.9.167:3000/"
  : "https://pootime-adventure-battle-server.onrender.com/";

export let globalSocket: Socket | undefined = undefined;

export function getSocket(): Socket {
  if (!globalSocket) {
    return refreshSocket();
  }
  return globalSocket;
}

export function refreshSocket(): Socket {
  //https://pootime-adventure-battle-server.onrender.com/
  globalSocket = io(SOCKET_SERVER_URL, {
    transports: ["websocket"],
  });
  return globalSocket;
}
