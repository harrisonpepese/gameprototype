import { io } from "socket.io-client";

export default function useSocket(baseUrl: string) {
  return io(baseUrl);
}
