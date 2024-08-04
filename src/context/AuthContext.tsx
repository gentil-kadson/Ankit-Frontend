import { createContext, useState, useEffect } from "react";

type AuthProviderProps = {
  children: JSX.Element;
};

type User = {
  name: string;
  email: string;
};

const AuthContext = createContext<User | null>(null);

export default AuthContext;

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
