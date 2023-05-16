import { createContext, useState } from "react";

export type Theme = {
  theme: string;
  handleChangeTheme: () => void;
};

export const ThemeStore = createContext<Theme>({
  theme: "",
  handleChangeTheme: () => {},
});

const { Provider } = ThemeStore;

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState("dark");

  const handleChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return <Provider value={{ theme, handleChangeTheme }}>{children}</Provider>;
};
