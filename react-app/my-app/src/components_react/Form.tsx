import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Toast from "./Toast";

export type FormVariant = "login" | "register";
export type CustomFormProps = React.PropsWithChildren<{
  login: (username: string, password: string) => void;
  title?: string;
  error?: any;
}>;

const Form = ({ login, title, error }: CustomFormProps) => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    login(formData.username, formData.password);
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    toast.error(error.error);
  }, [error]);

  console.log(error);

  return (
    <>
      {error.error && <Toast />}
      <>
        <Container className="mw-100 d-flex flex-column ">
          <form
            className="ms-auto me-auto p-3 form d-flex flex-column"
            onSubmit={handleSubmit}
          >
            <h1 className="px-2 text-center">{title}</h1>

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
          </form>
        </Container>
      </>
    </>
  );
};

export default Form;
