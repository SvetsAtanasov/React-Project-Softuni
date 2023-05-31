import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthStore } from "../context/AuthStore";

const PublicProtected = () => {
  const { isAuth } = useContext(AuthStore);

  return !isAuth ? <Outlet /> : <Navigate to={"/"} />;
};

export default PublicProtected;
