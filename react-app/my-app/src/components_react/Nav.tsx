import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import {
  faCamera,
  faHouse,
  faPlusCircle,
  faSignIn,
  faSignOut,
  faUserPlus,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { AuthStore } from "../context/AuthStore";

const navNotLogged = [
  {
    title: "Home",
    icon: faHouse,
    to: "/",
  },
  {
    title: "Catalog",
    icon: faCamera,
    to: "/catalog",
  },
  {
    title: "Login",
    icon: faSignIn,
    to: "/login",
  },
  {
    title: "Register",
    icon: faUserPlus,
    to: "/register",
  },
];

const navLogged = [
  {
    title: "Profile",
    icon: faUser,
    to: "/profile",
  },
  {
    title: "Home",
    icon: faHouse,
    to: "/",
  },
  {
    title: "Catalog",
    icon: faCamera,
    to: "/catalog",
  },
  {
    title: "Create",
    icon: faPlusCircle,
    to: "/create",
  },
];

const Navigation = () => {
  const { isAuth, logout, username } = useContext(AuthStore);

  const [isOpen, setIsOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<any>([]);
  const navRef = useRef<any>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    isAuth ? setNavLinks(navLogged) : setNavLinks(navNotLogged);
  }, [isAuth]);

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
    <nav ref={navRef} className={`main-nav ${isOpen ? "opened" : ""} `}>
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
        {navLinks.map((navLink: any, idx: number) => (
          <li key={idx} className={`pb-3  ${isOpen ? "px-2" : "px-1"}`}>
            <NavLink
              onClick={handleClose}
              style={({ isActive }) => {
                return isActive ? { background: "#49494b" } : {};
              }}
              to={navLink.to}
            >
              {isOpen ? (
                <Container className="px-4 m-0 d-flex align-items-center">
                  <FontAwesomeIcon
                    onClick={navLink.onClick}
                    className="me-3 icon"
                    icon={navLink.icon}
                  />
                  <span>{navLink.title}</span>
                </Container>
              ) : (
                <FontAwesomeIcon
                  onClick={navLink.onClick}
                  className="py-3 icon w-100"
                  icon={navLink.icon}
                />
              )}
            </NavLink>
          </li>
        ))}

        {isAuth && (
          <li className={`${isOpen ? "px-2" : "px-1"}`}>
            <Container className="logout">
              <FontAwesomeIcon
                onClick={() => {
                  logout();
                  handleClose();
                }}
                className="py-3 icon w-100"
                icon={faSignOut}
              />
            </Container>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
