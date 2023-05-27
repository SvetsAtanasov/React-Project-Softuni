import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { AuthStore } from "../context/AuthStore";
import { ThemeStore } from "../context/ThemeStore";
import PrivateNav from "./PrivateNav";
import PublicNav from "./PublicNav";

const Navigation = () => {
  const { isAuth, logout, username } = useContext(AuthStore);
  const { handleChangeTheme, theme } = useContext(ThemeStore);

  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<any>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
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
            onClick={handleChangeTheme}
            className="py-3 icon w-100"
            icon={theme === "dark" ? faMoon : faSun}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
