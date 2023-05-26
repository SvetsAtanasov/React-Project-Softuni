import {
  faCamera,
  faHouse,
  faPlusCircle,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export type CustomPrivateNavProps = React.PropsWithChildren<{
  isOpen: boolean;
  handleClose: () => void;
  logout: () => void;
}>;

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

const PrivateNav = ({ isOpen, handleClose, logout }: CustomPrivateNavProps) => {
  return (
    <>
      {navLogged.map((navLink: any, idx: number) => (
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
    </>
  );
};

export default PrivateNav;
