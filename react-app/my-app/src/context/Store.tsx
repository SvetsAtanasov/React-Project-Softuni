import { createContext, useEffect, useState } from "react";

export const Store = createContext<{
  theme: string;
  changeTheme: (theme: string) => void;
}>({
  theme: "",
  changeTheme: (theme: string) => {},
});

const { Provider } = Store;

export const StoreProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    console.log("test");
    setTheme("dark");
  }, []);

  const changeTheme = (theme: string) => setTheme(theme);

  return <Provider value={{ theme, changeTheme }}>{children}</Provider>;
};
