import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCog } from "@fortawesome/free-solid-svg-icons";
import { AuthStore } from "../context/AuthStore";
import { ThemeStore } from "../context/ThemeStore";
import PrivateNav from "./PrivateNav";
import PublicNav from "./PublicNav";
import SettingsModal from "./widgets/SettingsModal";

const Navigation = () => {
  const { isAuth, logout, username } = useContext(AuthStore);
  const { theme } = useContext(ThemeStore);

  const [isOpen, setIsOpen] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const navRef = useRef<any>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenSettingsModal = () => {
    setOpenSettingsModal(true);
  };

  const handleCloseSettingsModal = () => {
    setOpenSettingsModal(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!navRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`main-nav ${theme === "light" ? "light" : ""} ${
        isOpen ? "opened" : ""
      } `}
    >
      <SettingsModal
        handleCloseModal={handleCloseSettingsModal}
        show={openSettingsModal}
      />

      <ul className="m-0 px-0 py-3 d-flex flex-column">
        <li>
          {username !== undefined && (
            <span className="username">{username}</span>
          )}
        </li>
        <li className="pb-3 toggle">
          <FontAwesomeIcon
            onClick={toggleOpen}
            className="py-3 icon w-100"
            icon={faBars}
          />
        </li>

        {isAuth ? (
          <PrivateNav
            isOpen={isOpen}
            handleClose={handleClose}
            logout={logout}
          />
        ) : (
          <PublicNav isOpen={isOpen} handleClose={handleClose} />
        )}

        <li className="mt-5  pb-3 toggle">
          <FontAwesomeIcon
            onClick={handleOpenSettingsModal}
            className="py-3 icon w-100"
            icon={faCog}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
