import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { reducer } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import { requestHandler } from "../utils/utils";

export type Auth = {
  payload: { error: any; success: any };
  login: (username: string, password: string) => any;
  register: (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => void;
  isAuth: boolean;
  logout: () => void;
  username: string | undefined;
};

export const AuthStore = createContext<Auth>({
  payload: { error: "", success: "" },
  login: (username: string, password: string) => {},
  register: (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => {},
  isAuth: false,
  logout: () => {},
  username: undefined,
});

const { Provider } = AuthStore;

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | undefined>(undefined);
  const [payload, dispatchPayload] = useReducer(reducer, {
    error: undefined,
    success: undefined,
  });

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const checkIsAuth = useCallback(() => {
    const token = JSON.parse(localStorage.getItem("token")!);

    if (!token) setIsAuth(false);
  }, []);

  useEffect(() => {
    window.addEventListener("storage", checkIsAuth);

    return () => {
      window.removeEventListener("storage", checkIsAuth);
    };
  }, [checkIsAuth]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")!);

    if (token) setIsAuth(true);
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")!);

    if (token) setUsername(token.username);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await requestHandler(
        "POST",
        "http://localhost:7777/login",
        null,
        { username, password }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data);
      }

      setUsername(data.username);
      localStorage.setItem("token", JSON.stringify(data));
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
  };

  const register = useCallback(
    async (
      username: string,
      email: string,
      password: string,
      repeatPassword: string
    ) => {
      try {
        const res = await requestHandler(
          "POST",
          "http://localhost:7777/register",
          null,
          { username, email, password, repeatPassword }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data);
        }

        localStorage.setItem("token", data);
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

  const logout = useCallback(async () => {
    const tempToken = JSON.parse(localStorage.getItem("token")!);

    const res = await requestHandler(
      "POST",
      "http://localhost:7777/logout",
      tempToken
    );

    if (res.status === 401) {
      navigate("/");
    } else {
      navigate("/catalog");

      setUsername(undefined);
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("storage"));
    }
  }, []);

  return (
    <Provider
      value={{
        username,
        login,
        payload,
        register,
        isAuth,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};
