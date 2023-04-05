import { createContext, useEffect, useReducer, useState } from "react";
import { reducer } from "../utils/utils";

export type Auth = {
  user: { username: string };
  error: any;
  login: (username: string, password: string) => any;
  checkTokenValidity: (token: string) => any;
  //   register: (username: string, password: string) => void;
  //   logout: () => void;
};

export const AuthStore = createContext<Auth>({
  user: { username: "" },
  error: "",
  login: (username: string, password: string) => {},
  checkTokenValidity: (token: string) => {},
  //   register: (username: string, password: string) => {},
  //   logout: () => {},
});

const { Provider } = AuthStore;

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({ username: "" });
  // const [error, setError] = useState(undefined);

  const [error, dispatch] = useReducer(reducer, { error: undefined });

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

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
    } catch (err: any) {
      dispatch({ type: "set_error", nextError: err.message });
    }
  };

  const checkTokenValidity = async (token: string) => {
    try {
      const res = await fetch("http://localhost:7777/checkValidity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      });

      if (res.status === 401) localStorage.clear();
    } catch (err: any) {}
  };

  return (
    <Provider value={{ user, login, error, checkTokenValidity }}>
      {children}
    </Provider>
  );
};
