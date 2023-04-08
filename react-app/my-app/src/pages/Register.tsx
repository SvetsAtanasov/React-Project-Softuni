import Form from "../components_react/Form";
import { AuthStore } from "../context/AuthStore";
import { useContext } from "react";

const RegisterPage = () => {
  const { register } = useContext(AuthStore);

  return <Form register={register} variant={"register"} title="Register" />;
};

export default RegisterPage;
