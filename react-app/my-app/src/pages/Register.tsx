import Form from "../components_react/Form";
import { AuthStore } from "../context/AuthStore";
import { useContext } from "react";

const RegisterPage = () => {
  const { register, payload } = useContext(AuthStore);

  return (
    <Form
      register={register}
      variant={"register"}
      title="Register"
      payload={payload}
    />
  );
};

export default RegisterPage;
