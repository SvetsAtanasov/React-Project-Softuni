import { useState, useContext } from "react";
import Form from "../Form";
import { Button, Container } from "react-bootstrap";
import { AuthStore } from "../../context/AuthStore";

const RegisterForm = () => {
  const { register, payload } = useContext(AuthStore);

  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
  }>({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };

  const registerFormBody = (
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

      <Container className="py-3 d-flex flex-column">
        <label>Email</label>
        <input
          className="px-2"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="d-flex py-3 flex-column">
        <label>Password</label>
        <input
          className="px-2"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
        />
      </Container>

      <Container className="d-flex py-3 flex-column">
        <label>Repeat Password</label>
        <input
          className="px-2"
          name="repeatPassword"
          value={formData.repeatPassword}
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
      body={registerFormBody}
      handleSubmitForm={() =>
        register(
          formData.username,
          formData.email,
          formData.password,
          formData.repeatPassword
        )
      }
    />
  );
};

export default RegisterForm;
