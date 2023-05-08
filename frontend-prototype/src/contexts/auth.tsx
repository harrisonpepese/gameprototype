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
  user?: string;
};
const defaultContext: AuthContextType = {
  login: (username: string, password: string) => null,
  logout: () => null,
  token: undefined,
  user: undefined,
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider({ children }: PropsWithChildren<any>) {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<string>();
  const router = useRouter();
  const login = (username: string, password: string) => {
    GameApi.post("/auth", { username, password }).then((res) => {
      const { access_token, username } = res.data;
      setToken(access_token);
      setUser(username);
      localStorage.setItem("token", access_token);
      localStorage.setItem("username", username);
      router.push("/");
    });
  };
  const logout = () => {
    setToken(undefined);
    setUser(undefined);
    localStorage.clear();
    router.push("/login");
  };
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
