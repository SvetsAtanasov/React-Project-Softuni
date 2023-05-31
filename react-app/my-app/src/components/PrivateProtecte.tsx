import { useContext } from "react";
import { AuthStore } from "../context/AuthStore";
import { Navigate, Outlet } from "react-router-dom";

const PrivateProtected = () => {
  const { isAuth } = useContext(AuthStore);

  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateProtected;
