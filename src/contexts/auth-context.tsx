import React, { createContext, ReactNode, useState } from "react";
import { Button, Message } from "semantic-ui-react";
import { getCookie, setCookie } from "typescript-cookie";
import { UserForm } from "../components/user-form";
import { PermissionDeniedError } from "../../exceptions";
import axios from "axios";

interface IContext {
  loggedIn: boolean;
  logout?: () => Promise<void>;
}

export const AuthContext = createContext<IContext>({ loggedIn: false });

export const AuthProvider = (props: { children?: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string|undefined>();

  const onLogin = async (email: string, password: string) => {
    try {
      const form = new FormData();
      form.append("email", email);
      form.append("password", password);
      await axios.post("http://127.0.0.1:8000/login/", form);
      setLoggedIn(true);
      setError(undefined);
    } catch(error) {
      console.error("Login failed", error);
      setLoggedIn(false);
      setError("Login failed.")
    }
  };

  const logout = async () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logout }}>
      {loggedIn ? (
        <>
          <Button as="a" onClick={logout}>
            logout
          </Button>
          {props.children}
        </>
      ) : (
        <UserForm error={error} onChange={onLogin} />
      )}
    </AuthContext.Provider>
  );
};
