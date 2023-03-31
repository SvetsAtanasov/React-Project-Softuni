import { createContext, useEffect, useState } from "react";

export type Auth = {
  user: { username: string };
  error: string;
  token: string;
  login: (username: string, password: string) => any;
  //   register: (username: string, password: string) => void;
  //   logout: () => void;
};

export const AuthStore = createContext<Auth>({
  user: { username: "" },
  error: "",
  token: "",
  login: (username: string, password: string) => {},
  //   register: (username: string, password: string) => {},
  //   logout: () => {},
});

const { Provider } = AuthStore;

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({ username: "" });
  const [error, setError] = useState("");

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("http://localhost:7777/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        throw new Error(data.message);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return <Provider value={{ user, login, error, token }}>{children}</Provider>;
};
