import Form from "../components_react/Form";
import { AuthStore } from "../context/AuthStore";
import { useContext } from "react";

const LoginPage = () => {
  const { error, login } = useContext(AuthStore);

  return <Form login={login} error={error} title={"Login"} />;
};

export default LoginPage;
