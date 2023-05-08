import { Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function SingupPage() {
  const [username, setUsername] = useState();
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  return (
    <Container>
      <Stack spacing={2} padding={2}>
        <Typography>Singup</Typography>
        <TextField placeholder="username" />
        <TextField placeholder="fullname" />
        <TextField placeholder="email" />
        <TextField placeholder="password" />
        <TextField placeholder="re-password" />
      </Stack>
    </Container>
  );
}
