import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Toast from "./Toast";

export type CustomFormProps = React.PropsWithChildren<{
  handleSubmitForm: () => void;
  body: any;
  title?: string;
  payload: { error: any; success: any };
}>;

const Form = ({ handleSubmitForm, body, title, payload }: CustomFormProps) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    handleSubmitForm();
  };

  useEffect(() => {
    toast.error(payload.error);
  }, [payload.error]);

  return (
    <>
      <Toast />
      <Container className="mw-100 d-flex flex-column ">
        <form
          method="POST"
          className="ms-auto me-auto p-3 form d-flex flex-column"
          onSubmit={handleSubmit}
        >
          <h1 className="px-2 text-center">{title}</h1>
          {body}
        </form>
      </Container>
    </>
  );
};

export default Form;
