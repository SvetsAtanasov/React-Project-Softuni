import { createContext, useCallback, useContext } from "react";
import { AuthStore } from "./AuthStore";
import { request } from "./../utils/utils";

export type Home = {
  handleHomeRequest: () => void;
};

export const HomeStore = createContext<Home>({
  handleHomeRequest: () => {},
});

const { Provider } = HomeStore;

export const HomeProvider = ({ children }: any) => {
  const handleHomeRequest = useCallback(async () => {
    const tempToken = JSON.parse(localStorage.getItem("token")!);

    if (tempToken !== null) {
      const res = await request.get(
        "https://instagram-clone-api-nlh3.onrender.com",
        tempToken
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage"));
      }
    }
  }, []);

  return <Provider value={{ handleHomeRequest }}>{children}</Provider>;
};
