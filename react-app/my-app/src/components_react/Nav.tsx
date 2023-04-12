import { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import {
  faBook,
  faHouse,
  faPhotoVideo,
  faSignIn,
  faSignOut,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { AuthStore } from "../context/AuthStore";

const navNotLogged = [
  {
    title: "Home",
    icon: faBook,
    to: "/",
  },
  {
    title: "Catalog",
    icon: faHouse,
    to: "/about",
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
    title: "Home",
    icon: faBook,
    to: "/",
  },
  {
    title: "Catalog",
    icon: faHouse,
    to: "/catalog",
  },
  {
    title: "Create",
    icon: faPhotoVideo,
    to: "/create",
  },
  {
    title: "Logout",
    icon: faSignOut,
    to: "/logout",
  },
];

const Navigation = () => {
  const { dispatchToken, token } = useContext(AuthStore);
  const [isOpen, setIsOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(navNotLogged);
  const location = useLocation();

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (token.token) {
      localStorage.setItem("token", token.token);
      setNavLinks(navLogged);
    } else {
      setNavLinks(navNotLogged);
    }
  }, [token]);

  useEffect(() => {
    const tempToken = localStorage.getItem("token");

    dispatchToken({ type: "set_token", nextToken: tempToken });
  }, [location, dispatchToken]);

  return (
    <nav
      onMouseDown={handleOpen}
      className={`main-nav ${isOpen ? "opened" : ""} `}
    >
      <ul className="m-0 px-0 py-3 d-flex flex-column">
        {navLinks.map((navLink, idx) => (
          <li
            key={idx}
            className={`${idx !== navLinks.length - 1 ? "pb-3" : ""}`}
          >
            <NavLink
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => (prev = false));
              }}
              style={({ isActive }) => {
                return isActive ? { background: "#49494b" } : {};
              }}
              to={navLink.to}
            >
              {isOpen ? (
                <Container className="px-4 m-0 d-flex align-items-center">
                  <FontAwesomeIcon className="me-3 icon" icon={navLink.icon} />
                  <span>{navLink.title}</span>
                </Container>
              ) : (
                <FontAwesomeIcon
                  className="py-3 icon w-100"
                  icon={navLink.icon}
                />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
