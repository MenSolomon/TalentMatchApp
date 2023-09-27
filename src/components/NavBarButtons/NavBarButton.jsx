import { Button } from "@mui/material";
import "@fontsource/material-icons";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";

const NavBarButton = ({ ButtonName, ButtonImage, path, buttonStyle }) => {
  const navigate = useNavigate();

  // For now all the menu buttons navigate to the homepage
  const handleNavigate = () => {
    navigate(`/`);
  };

  // Use createtheme from api to create theme for page

  return (
    <Button
      style={{
        ...buttonStyle,
        fontSize: ".9em",
        fontWeight: "600",
        textTransform: "none",
        paddingRight: "5vw",
      }}
      startIcon={<Icon>{ButtonImage}</Icon>}
      onClick={handleNavigate}
    >
      {ButtonName}
    </Button>
  );
};

export default NavBarButton;
