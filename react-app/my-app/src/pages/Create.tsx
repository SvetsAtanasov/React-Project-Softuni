import { useContext, useEffect } from "react";
import Form from "../components_react/Form";
import { PhotoStore } from "../context/PhotoStore";

const CreatePage = () => {
  const { handleGetCreatePhotoRoute } = useContext(PhotoStore);

  useEffect(() => {
    handleGetCreatePhotoRoute();
  }, [handleGetCreatePhotoRoute]);

  return <Form payload={{ error: "", success: "" }} variant={"create"} />;
};

export default CreatePage;
