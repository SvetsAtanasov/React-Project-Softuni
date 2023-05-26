import {
  faCamera,
  faHouse,
  faSignIn,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

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

export type CustomPublicNavProps = React.PropsWithChildren<{
  isOpen: boolean;
  handleClose: () => void;
}>;

const PublicNav = ({ isOpen, handleClose }: CustomPublicNavProps) => {
  return (
    <>
      {navNotLogged.map((navLink: any, idx: number) => (
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
                  inverse
                  onClick={navLink.onClick}
                  className="me-3 icon"
                  icon={navLink.icon}
                />
                <span>{navLink.title}</span>
              </Container>
            ) : (
              <FontAwesomeIcon
                style={{ color: "#FFF" }}
                onClick={navLink.onClick}
                className="py-3 icon w-100"
                icon={navLink.icon}
              />
            )}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default PublicNav;
