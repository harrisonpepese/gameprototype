import { useAuthContext } from "@/contexts/auth";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const authContext = useAuthContext();
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const login = (e: any) => {
    e.preventDefault();
    console.log("login");
    if (username && password) authContext.login(username, password);
  };
  const gotoSingup = () => router.push("/singup");
  return (
    <Container>
      <form onSubmit={login}>
        <Stack spacing={2} padding={2}>
          <Typography>Login</Typography>
          <TextField
            placeholder="login"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">login</Button>
        </Stack>
      </form>
      <Button onClick={() => gotoSingup()}>Singup</Button>
    </Container>
  );
}
