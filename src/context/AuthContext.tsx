import { createContext, useState, useEffect } from "react";
import Router from "next/router";
import Cookies from "universal-cookie";
import api from "@/services/api";

type AuthProviderProps = {
  children: JSX.Element;
};

type User = {
  email: string;
  password: string;
};

type AuthTokens = {
  access: string;
  refresh: string;
};

type ContextDataProps = {
  loginUser: (email: string, password: string) => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<ContextDataProps>({} as ContextDataProps);

export default AuthContext;

export const cookies = new Cookies();

export function AuthProvider({ children }: AuthProviderProps) {
  function getInitialTokenData(): { access: string; refresh: string } | null {
    const accessToken = cookies.get("accessToken");
    const refreshToken = cookies.get("refreshToken");

    if (accessToken && refreshToken)
      return { access: accessToken, refresh: refreshToken };
    return null;
  }

  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
    getInitialTokenData()
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function updateToken() {
    if (authTokens) {
      const response = await api.post("/dj_rest_auth/token/refresh/", {
        refresh: authTokens.refresh,
      });

      const { data, status } = response;
      if (status === 200) {
        setAuthTokens((prevState) => {
          if (prevState) return { ...prevState, access: data.acess };
          return null;
        });
        cookies.set("accessToken", data.access, {
          maxAge: 60 * 60 * 30,
        });
      }
    }
  }

  useEffect(() => {
    if (authTokens) {
      api
        .get("/users/", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${authTokens.access}` },
        })
        .then((response) => {
          setUser(response.data[0]);
        });
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 1000 * 60 * 28);
    return () => clearInterval(intervalId);
  }, [authTokens, loading]);

  async function loginUser(email: string, password: string) {
    const response = await api.post("/dj_rest_auth/login/", {
      email,
      password,
    });
    const { data, status } = response;
    if (status === 200) {
      setAuthTokens({ access: data.access, refresh: data.refresh });
      setUser(data.user);
      cookies.set("accessToken", data.access, {
        maxAge: 60 * 60 * 30,
      });
      cookies.set("refreshToken", data.refresh, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    } else {
      const err = "Credenciais inválidas.";
      console.log(err);
    }
  }

  const contextData = {
    user,
    loginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
