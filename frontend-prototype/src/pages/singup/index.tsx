import { Container, Stack, TextField, Typography } from "@mui/material";

export default function SingupPage() {
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
