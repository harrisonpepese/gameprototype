import GameApi from "@/utils/game-api";
import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  login: (username: string, password: string) => void;
  logout: () => void;
  token?: string;
};
const defaultContext: AuthContextType = {
  login: (username: string, password: string) => null,
  logout: () => null,
  token: undefined,
};
const isBrowser = () => typeof window !== "undefined";
export const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider({ children }: PropsWithChildren<any>) {
  let tokenLocalStorage: string | null = "";
  if (typeof window !== "undefined") {
    tokenLocalStorage = localStorage.getItem("session");
  }
  const [token, setToken] = useState(
    tokenLocalStorage ? tokenLocalStorage : defaultContext.token
  );

  const router = useRouter();
  const unprotectedRoutes = ["/login", "/signup"];
  const pathIsProtected = !unprotectedRoutes.includes(router.pathname);

  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    if (!token && pathIsProtected) {
      router.push("/login");
    }
    if (token && !pathIsProtected) {
      router.push("/");
    }
  }, [token, router, pathIsProtected]);

  const login = (username: string, password: string) => {
    GameApi.post("/auth", { username, password }).then((res) => {
      const { access_token } = res.data;
      localStorage.setItem("session", access_token);
      setToken(access_token);
      router.push("/");
    });
  };
  const logout = () => {
    setToken(undefined);
    localStorage.removeItem("session");
    router.push("/login");
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
