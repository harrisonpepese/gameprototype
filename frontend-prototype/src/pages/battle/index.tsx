import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function BattlePage() {
  const socket = io("localhost:3000/battle");
  const [isConnected, setConnected] = useState(false);
  const [battleId, setBattleId] = useState<string>();
  useEffect(() => {
    function onConnect() {
      setConnected(true);
    }
    function onDisconnect() {
      setConnected(true);
    }
    function whenFoundBattle(id: string) {
      setBattleId(id);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("battleFound", whenFoundBattle);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("battleFound", whenFoundBattle);
    };
  }, []);
  const findMatch = () => {
    console.log("findMatch");
    socket.emit("findMatch", "oi");
  };
  return (
    <Container>
      <Typography>Is connected: {isConnected ? "sim" : "não"}</Typography>
      <Button onClick={() => findMatch()}>Find Match</Button>
    </Container>
  );
}
