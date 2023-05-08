import { AppBar, Toolbar } from "@mui/material";
import Link from "next/link";

export default function AppHeader() {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>Header</Toolbar>
        <Link href="/battle">battle</Link>
      </AppBar>
    </header>
  );
}
