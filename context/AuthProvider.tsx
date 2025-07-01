import { useEffect, useState, type ReactNode } from "react";
import { redirect } from "next/navigation";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
    redirect("/");
  };

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    redirect("/login");
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
