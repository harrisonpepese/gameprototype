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

export const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider({ children }: PropsWithChildren<any>) {
  const [token, setToken] = useState<string>();
  const router = useRouter();
  const login = (username: string, password: string) => {
    GameApi.post("/auth", { username, password }).then((res) => {
      const { access_token } = res.data;
      setToken(access_token);
      router.push("/");
    });
  };
  const logout = () => {
    setToken(undefined);
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
