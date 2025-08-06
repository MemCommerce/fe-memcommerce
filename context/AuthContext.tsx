import { createContext } from "react";

const AuthContext = createContext<{
  token: string | null;
  setToken: (token: string | null) => void;
  login: (newToken: string, refreshToken: string) => void;
  logOut: () => void;
}>({
  token: null,
  setToken: () => {},
  login: () => {},
  logOut: () => {},
});

export default AuthContext;
