import { Container } from "react-bootstrap";
import { ThemeStore } from "../context/ThemeStore";
import { useContext } from "react";

const Wrapper = ({ children }: any) => {
  const { theme } = useContext(ThemeStore);

  return (
    <Container
      className={`m-0 wrapper mw-100 position-relative ${
        theme === "light" ? "light" : ""
      }`}
    >
      {children}
    </Container>
  );
};

export default Wrapper;
