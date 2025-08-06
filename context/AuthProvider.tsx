import { useEffect, useState, type ReactNode } from "react";
import { redirect } from "next/navigation";
import AuthContext from "./AuthContext";
import { getTokens } from "@/app/api/auth";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedRefreshToken) {
      (async () => {
        try {
          const tokensData = await getTokens(storedRefreshToken);
          setToken(tokensData.access_token);
          localStorage.setItem("authToken", tokensData.access_token);
          localStorage.setItem("refreshToken", tokensData.refresh_token);
        } catch {
          logOut()
        }
      })();
    }
  }, []);

  const login = (newToken: string, newRefreshToken: string) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    redirect("/");
  };

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    redirect("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
