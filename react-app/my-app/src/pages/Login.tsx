import Form from "../components_react/Form";
import { AuthStore } from "../context/AuthStore";
import { useContext } from "react";

const LoginPage = () => {
  const { login } = useContext(AuthStore);

  return <Form login={login} title={"Login"} />;
};

export default LoginPage;
