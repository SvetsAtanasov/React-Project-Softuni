import { useContext, useState } from "react";
import { PhotoStore } from "../../context/PhotoStore";
import { Button, Container } from "react-bootstrap";
import Form from "../Form";

const CreatePostForm = () => {
  const { handleCreatePhoto } = useContext(PhotoStore);

  const [formData, setFormData] = useState<{
    name: string;
    age: number;
    description: string;
    location: string;
    image: string;
  }>({ name: "", age: 0, description: "", location: "", image: "" });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };

  const createPhotoFormBody = (
    <>
      <Container className="py-3 d-flex flex-column">
        <label>Name</label>
        <input
          className="px-2"
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="py-3 d-flex flex-column">
        <label>Age</label>
        <input
          className="px-2"
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="d-flex py-3 flex-column">
        <label>Description</label>
        <input
          className="px-2"
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="d-flex py-3 flex-column">
        <label>Location</label>
        <input
          className="px-2"
          name="location"
          value={formData.location}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Container className="d-flex py-3 flex-column">
        <label>Image</label>
        <input
          className="px-2"
          name="image"
          value={formData.image}
          onChange={handleChange}
          type="text"
        />
      </Container>

      <Button className="mt-auto mb-0" type="submit">
        Submit
      </Button>
    </>
  );

  return (
    <Form
      payload={{ error: "Error", success: undefined }}
      body={createPhotoFormBody}
      handleSubmitForm={() => handleCreatePhoto({ ...formData })}
    />
  );
};

export default CreatePostForm;
