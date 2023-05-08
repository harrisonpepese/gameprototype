import AppHeader from "@/components/header";
import { AuthProvider } from "@/contexts/auth";
import RouteGuard from "@/guards/routeGuard";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProvider>
      <CssBaseline />
      <AppHeader></AppHeader>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
