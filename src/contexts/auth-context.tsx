import React, { createContext, ReactNode, useState } from "react";
import { Button } from "semantic-ui-react";
import { getCookie, setCookie } from "typescript-cookie";
import { UserForm } from "../components/user-form";
import axios, { AxiosResponse } from "axios";

interface IContext {
  loggedIn: boolean;
  logout?: () => Promise<void>;
  user?: User;
}

interface Profile {
  data: {
    id: string;
    attributes: {
      first_name: string;
      last_name: string;
      email: string;
      username: string;
    };
  };
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

export const AuthContext = createContext<IContext>({ loggedIn: false });

export const AuthProvider = (props: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const onLogin = async (email: string, password: string) => {
    try {
      const form = new FormData();
      form.append("email", email);
      form.append("password", password);
      await axios.post("http://127.0.0.1:8000/login/", form);
      setLoggedIn(true);
      setError(undefined);
      const resp: AxiosResponse<Profile> = await axios.get(
        "http://127.0.0.1:8000/profile/",
        { withCredentials: true }
      );
      const user: User = {
        ...resp.data.data.attributes,
        id: resp.data.data.id,
      };
      console.log("Profile", resp);
      setUser(user);
      console.log("Set user to", user);
    } catch (error) {
      console.error("Login failed", error);
      setLoggedIn(false);
      setError("Login failed.");
    }
  };

  const logout = async () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logout, user }}>
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
