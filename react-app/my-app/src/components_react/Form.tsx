import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Toast from "./Toast";

export type FormVariant = "login" | "register" | "create";
export type CustomFormProps = React.PropsWithChildren<{
  login?: (username: string, password: string) => void;
  register?: (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => void;
  title?: string;
  variant?: FormVariant;
  payload: { error: any; success: any };
}>;

const Form = ({
  login,
  register,
  title,
  variant = "login",
  payload,
}: CustomFormProps) => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const [registerFormData, setRegisterFormData] = useState<{
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

  const [createFormData, setCreateFormData] = useState<{
    name: string;
    age: number;
    description: string;
    location: string;
    image: string;
  }>({ name: "", age: 0, description: "", location: "", image: "" });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (variant === "login") {
      login!(formData.username, formData.password);
    } else if (variant === "register") {
      register!(
        registerFormData.username,
        registerFormData.email,
        registerFormData.password,
        registerFormData.repeatPassword
      );
    } else {
    }
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    if (variant === "login") {
      setFormData((values) => ({ ...values, [name]: value }));
    } else if (variant === "register") {
      setRegisterFormData((values) => ({ ...values, [name]: value }));
    } else {
      setCreateFormData((values) => ({ ...values, [name]: value }));
    }
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

  const registerBody = (
    <>
      <Container className="py-3 d-flex flex-column">
        <label>Username</label>
        <input
          className="px-2"
          name="username"
          value={registerFormData.username}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="py-3 d-flex flex-column">
        <label>Email</label>
        <input
          className="px-2"
          name="email"
          value={registerFormData.email}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="d-flex py-3 flex-column">
        <label>Password</label>
        <input
          className="px-2"
          name="password"
          value={registerFormData.password}
          onChange={handleChange}
          type="password"
        />
      </Container>

      <Container className="d-flex py-3 flex-column">
        <label>Repeat Password</label>
        <input
          className="px-2"
          name="repeatPassword"
          value={registerFormData.repeatPassword}
          onChange={handleChange}
          type="password"
        />
      </Container>

      <Button className="mt-auto mb-0" type="submit">
        Submit
      </Button>
    </>
  );

  const createPhotoFormBody = (
    <>
      <Container className="py-3 d-flex flex-column">
        <label>Name</label>
        <input
          className="px-2"
          name="name"
          value={createFormData.name}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="py-3 d-flex flex-column">
        <label>Age</label>
        <input
          className="px-2"
          name="age"
          value={createFormData.age}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="d-flex py-3 flex-column">
        <label>Description</label>
        <input
          className="px-2"
          name="description"
          value={createFormData.description}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="d-flex py-3 flex-column">
        <label>Location</label>
        <input
          className="px-2"
          name="location"
          value={createFormData.location}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="d-flex py-3 flex-column">
        <label>Image</label>
        <input
          className="px-2"
          name="image"
          value={createFormData.image}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Button className="mt-auto mb-0" type="submit">
        Submit
      </Button>
    </>
  );

  useEffect(() => {
    toast.error(payload.error);
  }, [payload.error]);

  return (
    <>
      <Toast />
      <Container className="mw-100 d-flex flex-column ">
        <form
          className="ms-auto me-auto p-3 form d-flex flex-column"
          onSubmit={handleSubmit}
        >
          <h1 className="px-2 text-center">{title}</h1>
          {variant === "login" ? loginFormBody : registerBody}
        </form>
      </Container>
    </>
  );
};

export default Form;
