import { Socket } from "socket.io-client";
import socket from "@/services/socket";
import { useState, createContext, PropsWithChildren, useEffect } from "react";

type BattleContextType = {
  io?: Socket;
  battle: any;
};

const defaultContext: BattleContextType = {
  io: undefined,
  battle: {},
};
const _socket = socket("http://localhost:3000");
export const BattleContext = createContext<BattleContextType>(defaultContext);
export function BattleProvider({ children }: PropsWithChildren<any>) {
  const [battle, setBattle] = useState();
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      console.log(localToken);
      _socket.io.opts.extraHeaders = { authorization: localToken };
      _socket.disconnect().connect();
    }
  }, []);

  return (
    <BattleContext.Provider value={{ battle, io: _socket }}>
      {children}
    </BattleContext.Provider>
  );
}
