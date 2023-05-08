import GameApi from "@/utils/game-api";

export const login = async (username: string, password: string) => {
  const res = await GameApi.post("/auht", { username, password });
  return res.data;
};
