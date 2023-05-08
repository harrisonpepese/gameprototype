import { Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("localhost:3000/battle", {
  extraHeaders: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbWVjdXJhc3RlaXJvIiwic3ViIjoiNjQ1NDAwZjBkNTljNGE2OWMxNWMxOGRiIiwiaWF0IjoxNjgzMzAwNzM2LCJleHAiOjE2ODM1MTY3MzZ9.MvsGui3BVXE5H7c4PCZFq39TGx21yWlWN9gh6FsILDQ",
  },
});

export default function BattlePage() {
  const [isConnected, setConnected] = useState(false);
  const [isWaitingBattle, setWaitingBattle] = useState(false);
  const [battleId, setBattleId] = useState<string>();
  useEffect(() => {
    function onConnect() {
      console.log("connected");
      setConnected(true);
    }
    function onDisconnect() {
      console.log("disconnected");
      setConnected(false);
    }
    function whenWaitingBattle() {
      setWaitingBattle(true);
    }
    function whenFoundBattle(id: string) {
      setBattleId(id);
      setWaitingBattle(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("battleFound", whenFoundBattle);
    socket.on("wattingBattle", whenWaitingBattle);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("battleFound", whenFoundBattle);
      socket.off("wattingBattle", whenWaitingBattle);
    };
  }, []);
  const findMatch = () => {
    socket.emit("findMatch", "oi");
  };
  return (
    <Container>
      <Typography>Is connected: {isConnected ? "sim" : "não"}</Typography>
      <Typography>Battle id: {battleId}</Typography>
      <Button disabled={isWaitingBattle} onClick={() => findMatch()}>
        Find Match
      </Button>
    </Container>
  );
}
