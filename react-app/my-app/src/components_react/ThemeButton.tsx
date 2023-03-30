import { Button } from "react-bootstrap";
import { Store } from "../context/Store";
import { useContext } from "react";

const ThemeButton = () => {
  const { theme, changeTheme } = useContext(Store);

  const handleChangeTheme = () => {
    if (theme === "dark") {
      changeTheme("light");
    } else {
      changeTheme("dark");
    }
  };

  return (
    <Button
      className="position-absolute end-0"
      onClick={handleChangeTheme}
    >{`${theme} theme`}</Button>
  );
};

export default ThemeButton;
