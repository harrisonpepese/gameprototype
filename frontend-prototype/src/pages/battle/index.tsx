import { useAuthContext } from "@/contexts/auth";
import { BattleProvider } from "@/contexts/battle";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function BattlePage() {
  return (
    <BattleProvider>
      <Container></Container>
    </BattleProvider>
  );
}
