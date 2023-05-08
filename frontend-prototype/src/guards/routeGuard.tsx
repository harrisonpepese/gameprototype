import { useAuthContext } from "@/contexts/auth";

const isBrowser = () => typeof window !== "undefined";

export default function RouteGuard({ router, children }: any) {
  const authContext = useAuthContext();
  const isAuthenticated: boolean = authContext.token ? true : false;
  const unprotectedRoutes = ["login", "singup"];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push("login");
  }
  return children;
}
