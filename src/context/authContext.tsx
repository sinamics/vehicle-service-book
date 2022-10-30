import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { Cookies as ReactCookies } from "react-cookie";

import { api } from "@/plugins";
import { User } from "@/types";

const cookies = new ReactCookies();

type Props = PropsWithChildren & {};

export type LoginProps = {
  email: string;
  password: string;
};

export type SignupProps = LoginProps & {
  confirmPassword: string;
};

interface AuthContextType {
  user?: User;
  isAuthenticated: boolean;
  loading: boolean;
  error?: any;
  login: ({ email, password }: LoginProps) => void;
  signUp: ({ email, password, confirmPassword }: SignupProps) => void;
  logout: () => void;
  getUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  async function login({ email, password }: LoginProps) {
    setLoading(true);

    api
      .post("/auth/login", { email, password })
      .then(({ data }) => {
        cookies.set("access_token", data.access_token);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log("err: ", err);
        setError(err);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function signUp({ email, password, confirmPassword }: SignupProps) {
    setLoading(true);

    api
      .post("/auth/register", { email, password, confirmPassword })
      .then(({ data }) => {
        setUser(data);
        console.log("data: ", data);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function logout() {
    cookies.remove("access_token");
    setIsAuthenticated(false);
    setUser(undefined);
    window.location.href = "/";
  }

  function getUser() {
    api
      .get("/user")
      .then(({ data }) => {
        setUser(data);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log("err: ", err);
        setIsAuthenticated(false);
      });
  }

  const memoizedValue = useMemo(
    () => ({
      user,
      getUser,
      isAuthenticated,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [user, loading, error, isAuthenticated]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
