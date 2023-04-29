import { useContext, useEffect } from "react";
import Form from "../components_react/Form";
import { PhotoStore } from "../context/PhotoStore";
import { AuthStore } from "../context/AuthStore";

const CreatePage = () => {
  const { handleGetCreatePhotoRoute, handleCreatePhoto } =
    useContext(PhotoStore);

  // useEffect(() => {
  //   handleGetCreatePhotoRoute(
  //     dispatchToken({ type: "set_token", nextToken: undefined }),
  //     token
  //   );
  // }, [handleGetCreatePhotoRoute]);

  return (
    <Form
      create={handleCreatePhoto}
      payload={{ error: "", success: "" }}
      variant={"create"}
    />
  );
};

export default CreatePage;
