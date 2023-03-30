import { createContext, useEffect, useState } from "react";

// export type Auth = {
//   user: { username: string; email: string; token: string };
//   login: (username: string, password: string) => any;
//   //   register: (username: string, password: string) => void;
//   //   logout: () => void;
// };

// export const AuthStore = createContext<Auth>({
//   user: { username: "", email: "", token: "" },
//   login: (username: string, password: string) => {},
//   //   register: (username: string, password: string) => {},
//   //   logout: () => {},
// });

// const { Provider } = AuthStore;

// export const AuthProvider = ({ children }: any) => {
//   const [token, setToken] = useState("");
//   const [user, setUser] = useState({ username: "", password: "" });

//   const login = (username: string, password: string) => {
//     setToken()
//   };

//   useEffect(() => {}, [token]);

//   return <Provider value={{ user, setUser }}>{children}</Provider>;
// };
