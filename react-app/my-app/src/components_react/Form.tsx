import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState<{
    username: string | undefined;
    password: string | undefined;
  }>({ username: undefined, password: undefined });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(formData);
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        type="text"
      />

      <label>Password</label>
      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        type="password"
      />

      <input value={"Submit"} type="submit" />
    </form>
  );
};

export default Form;
