import { useState, useContext } from "react";
import Form from "../Form";
import { Button, Container } from "react-bootstrap";
import { AuthStore } from "../../context/AuthStore";

const LoginForm = () => {
  const { login, payload } = useContext(AuthStore);

  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };

  const loginFormBody = (
    <>
      <Container className="py-3 d-flex flex-column">
        <label>Username</label>
        <input
          className="px-2"
          name="username"
          value={formData.username}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="d-flex flex-column">
        <label>Password</label>
        <input
          className="px-2"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
        />
      </Container>

      <Button className="mt-auto mb-0" type="submit">
        Submit
      </Button>
    </>
  );

  return (
    <Form
      payload={payload}
      title="Login"
      handleSubmitForm={() => login(formData.username, formData.password)}
      body={loginFormBody}
    />
  );
};

export default LoginForm;
