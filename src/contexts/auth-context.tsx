import React, { createContext, ReactNode, useState } from "react";
import { Button } from "semantic-ui-react";
import { getCookie, setCookie } from "typescript-cookie";
import { UserForm } from "../components/user-form";

interface IContext {
  user?: string | undefined;
  logout?: () => Promise<void>;
}

export const AuthContext = createContext<IContext>({});

export const AuthProvider = (props: { children?: ReactNode }) => {
  const [user, setUser] = useState<string | undefined>();

  const onLogin = (username: string, password: string) => {
    setUser(username);
  };

  const logout = async () => {
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {user ? (
        <>
          <Button as="a" onClick={logout}>
            logout
          </Button>
          {props.children}
        </>
      ) : (
        <UserForm onChange={onLogin} />
      )}
    </AuthContext.Provider>
  );
};
