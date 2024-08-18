import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import api from "@/services/api";

import { User } from "@/services/UserService";
import AuthService from "@/services/AuthService";
import { HTTP_200_OK, HTTP_201_CREATED } from "@/utils/constants";

type AuthProviderProps = {
  children: JSX.Element;
};

type AuthTokens = {
  access: string;
  refresh: string;
};

type ContextDataProps = {
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ status: any; message: string }>;
  loginUserByGoogle: (code: string) => Promise<any>;
  logoutUser: () => void;
  setUser: (user: User | null) => void;
  user: User | null;
};

const AuthContext = createContext<ContextDataProps>({} as ContextDataProps);

export default AuthContext;

export const cookies = new Cookies();

const ACCESS_TOKEN_EXPIRE_TIME = 60 * 30;
const REFRESH_TOKEN_EXPIRE_TIME = 60 * 60 * 24 * 3;

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
          maxAge: ACCESS_TOKEN_EXPIRE_TIME,
        });
      }
    }
  }

  useEffect(() => {
    if (authTokens) {
      api
        .get("/users/", {
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
    }, 1000 * 60 * 20);
    return () => clearInterval(intervalId);
  }, [authTokens, loading]);

  function logoutUser() {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    setUser(null);
  }

  async function loginUserByGoogle(code: string) {
    const authService = new AuthService();
    const response = await authService.loginUserByGoogle(code);

    if (
      response.status === HTTP_201_CREATED ||
      response.status === HTTP_200_OK
    ) {
      setAuthTokens({
        access: response.data.access,
        refresh: response.data.refresh,
      });
      setUser(response.data.user);
      cookies.set("accessToken", response.data.access, {
        maxAge: ACCESS_TOKEN_EXPIRE_TIME,
      });
      cookies.set("refreshToken", response.data.refresh, {
        maxAge: REFRESH_TOKEN_EXPIRE_TIME,
      });
    }
    return response;
  }

  async function loginUser(email: string, password: string) {
    const authService = new AuthService();
    const response = await authService.loginUser({
      email,
      password,
    });
    const { data, status } = response;
    if (status === 200) {
      setAuthTokens({ access: data.access, refresh: data.refresh });
      setUser(data.user);
      cookies.set("accessToken", data.access, {
        maxAge: ACCESS_TOKEN_EXPIRE_TIME,
      });
      cookies.set("refreshToken", data.refresh, {
        maxAge: REFRESH_TOKEN_EXPIRE_TIME,
      });
      return { status, message: "Usuário criado com sucesso" };
    } else {
      return { status, message: "Credenciais inválidas" };
    }
  }

  const contextData = {
    user,
    setUser,
    loginUser,
    loginUserByGoogle,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
