import { createContext, useReducer } from "react";
import { reducer } from "../utils/utils";

export type Auth = {
  user: { username: string };
  payload: { error: any; success: any };
  login: (username: string, password: string) => any;
  register: (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => void;
  //   register: (username: string, password: string) => void;
  //   logout: () => void;
};

export const AuthStore = createContext<Auth>({
  user: { username: "" },
  payload: { error: "", success: "" },
  login: (username: string, password: string) => {},
  register: (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => {},
  //   register: (username: string, password: string) => {},
  //   logout: () => {},
});

const { Provider } = AuthStore;

export const AuthProvider = ({ children }: any) => {
  const [user, dispatchUser] = useReducer(reducer, {
    user: { username: "" },
  });

  const [payload, dispatchPayload] = useReducer(reducer, {
    error: undefined,
    success: undefined,
  });

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
        throw new Error(data);
      }

      localStorage.setItem("token", data);
    } catch (err: any) {
      dispatchPayload({
        type: "set_error",

        nextError: err.message,
      });

      setTimeout(() => {
        dispatchPayload({
          type: "set_error",

          nextError: undefined,
        });
      }, 0.1);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => {
    try {
      const res = await fetch("http://localhost:7777/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, repeatPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data);
      }

      localStorage.setItem("token", data);
    } catch (err: any) {
      dispatchPayload({
        type: "set_error",
        payload: {
          error: err.message,
        },
      });

      setTimeout(() => {
        dispatchPayload({
          type: "set_error",
          payload: {
            error: undefined,
          },
        });
      }, 0.1);
    }
  };

  return (
    <Provider value={{ user, login, payload, register }}>{children}</Provider>
  );
};
