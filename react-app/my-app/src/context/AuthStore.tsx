import { createContext, useCallback, useReducer } from "react";
import { reducer } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

export type Auth = {
  user: { username: string };
  payload: { error: any; success: any };
  token: any;
  login: (username: string, password: string) => any;
  register: (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => void;
  dispatchToken: (obj: any) => void;
};

export const AuthStore = createContext<Auth>({
  user: { username: "" },
  payload: { error: "", success: "" },
  token: "",
  login: (username: string, password: string) => {},
  register: (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => {},
  dispatchToken: (obj: any) => {},
  //   register: (username: string, password: string) => {},
  //   logout: () => {},
});

const { Provider } = AuthStore;

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const [user, dispatchUser] = useReducer(reducer, {
    user: { username: "" },
  });
  const [payload, dispatchPayload] = useReducer(reducer, {
    error: undefined,
    success: undefined,
  });
  const [token, dispatchToken] = useReducer(reducer, {
    token: undefined,
  });

  const login = useCallback(async (username: string, password: string) => {
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

      dispatchToken({
        type: "set_token",
        nextToken: data,
      });
      navigate("/");
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
  }, []);

  const register = useCallback(
    async (
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
        dispatchToken({
          type: "set_token",
          nextToken: data,
        });
        navigate("/");
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
    },
    [navigate]
  );

  return (
    <Provider value={{ user, login, payload, register, token, dispatchToken }}>
      {children}
    </Provider>
  );
};
