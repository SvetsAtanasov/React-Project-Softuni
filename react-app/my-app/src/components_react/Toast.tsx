import { useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { AuthStore } from "../context/AuthStore";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const { payload } = useContext(AuthStore);

  useEffect(() => {
    toast.error(payload.error);
  }, [payload.error]);

  useEffect(() => {
    toast.success(payload.success);
  }, [payload.success]);

  return (
    <>
      <Container>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Toast;
