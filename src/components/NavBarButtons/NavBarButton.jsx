import { Button } from "@mui/material";
import "@fontsource/material-icons";
import Icon from "@mui/material/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";

const NavBarButton = ({ ButtonName, ButtonImage, path, buttonStyle }) => {
  const navigate = useNavigate();

  // For now all the menu buttons navigate to the homepage
  const handleNavigate = () => {
    navigate(`/`);
  };

  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { buttonColor } = themeProviderObject;

  // Use createtheme from api to create theme for page

  return (
    <NavLink to={path}>
      <Button
        className="NavBarBtns"
        style={{
          ...buttonStyle,
          fontSize: ".9em",
          fontWeight: "600",
          textTransform: "none",
          paddingRight: "5vw",
          // color: buttonColor,
        }}
        startIcon={<Icon>{ButtonImage}</Icon>}
        onClick={handleNavigate}
      >
        {ButtonName}
      </Button>
    </NavLink>
  );
};

export default NavBarButton;
