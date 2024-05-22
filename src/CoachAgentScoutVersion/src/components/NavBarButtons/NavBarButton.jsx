import { Button } from "@mui/material";
import "@fontsource/material-icons";
import Icon from "@mui/material/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import {
  Analytics,
  CompareArrows,
  Dashboard,
  DoorBack,
  Forum,
  Help,
  Home,
  Inbox,
  Monitor,
  MoveToInbox,
  People,
  Settings,
  Star,
} from "@mui/icons-material";

const NavBarButton = ({ ButtonName, ButtonImage, path, buttonStyle }) => {
  const navigate = useNavigate();

  // For now all the menu buttons navigate to the homepage
  const handleNavigate = () => {
    navigate(`/`);
  };

  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { buttonColor } = themeProviderObject;

  // Use createtheme from api to create theme for page

  // <FontAwesomeIcon icon={solid("people-group")} />;

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
        // startIcon={
        //   ButtonName !== "Players" ? (
        //     <Icon>{ButtonImage}</Icon>
        //   ) : (
        //     <FontAwesomeIcon icon={faPeopleGroup} />
        //   )
        // }

        startIcon={
          ButtonName === "Home" ? (
            <Home sx={{ color: buttonColor }} />
          ) : ButtonName === "Dashboard" ? (
            <Dashboard sx={{ color: buttonColor }} />
          ) : ButtonName === "Players" ? (
            <FontAwesomeIcon
              icon={faPeopleGroup}
              style={{ color: buttonColor }}
            />
          ) : ButtonName === "Messages" ? (
            <Forum sx={{ color: buttonColor }} />
          ) : ButtonName === "Connections" ? (
            <People sx={{ color: buttonColor }} />
          ) : ButtonName === "Analytics" ? (
            <Monitor sx={{ color: buttonColor }} />
          ) : ButtonName === "Help" ? (
            <Help sx={{ color: buttonColor }} />
          ) : ButtonName === "Settings" ? (
            <Settings sx={{ color: buttonColor }} />
          ) : ButtonName === "Logout" ? (
            <DoorBack sx={{ color: buttonColor }} />
          ) : (
            <Star sx={{ color: buttonColor }} />
          )
        }
        onClick={handleNavigate}
      >
        {ButtonName}
      </Button>
    </NavLink>
  );
};

export default NavBarButton;
