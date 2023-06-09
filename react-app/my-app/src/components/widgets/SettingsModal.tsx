import { Button, Modal, ModalProps, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ThemeStore } from "../../context/ThemeStore";
import { useContext, useState } from "react";
import { AuthStore } from "../../context/AuthStore";
import { Form } from "react-bootstrap";

type CustomSettingsModalProps = React.PropsWithChildren<{
  handleCloseModal: () => void;
}>;

const SettingsModal = ({
  show,
  handleCloseModal,
  ...props
}: ModalProps & CustomSettingsModalProps) => {
  const { handleChangeTheme, theme } = useContext(ThemeStore);
  const { isAuth } = useContext(AuthStore);

  const [checked, setChecked] = useState(false);

  const handleSetChecked = () => {
    handleChangeTheme();
    setChecked(!checked);
  };

  return (
    <Modal onHide={handleCloseModal} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!isAuth && (
          <Alert show={true} variant={"warning"}>
            Any changes made are not saved, if you are not logged in!
          </Alert>
        )}
        <div className="d-flex flex-column align-items-start">
          <span>Choose your theme:</span>

          <div className="w-100 d-flex align-items-center justify-content center">
            <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} />
            <span className="ms-2">{theme === "dark" ? "Dark" : "Light"}</span>

            <Form.Check
              className="ms-auto"
              checked={checked}
              type="switch"
              onChange={handleSetChecked}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button className="w-25" onClick={handleCloseModal}>
          Close
        </Button>

        <Button disabled={!isAuth} className="w-25">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
