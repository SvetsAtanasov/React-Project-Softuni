import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <>
      <Container>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Toast;
