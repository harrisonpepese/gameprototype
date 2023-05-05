import { Container, Stack, TextField, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Container>
      <Stack spacing={2} padding={2}>
        <Typography>Login</Typography>
        <TextField placeholder="login" />
        <TextField placeholder="password" />
      </Stack>
    </Container>
  );
}
