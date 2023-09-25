import { Button } from "@mui/material";
import "@fontsource/material-icons";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";

const NavBarButton = ({ ButtonName, ButtonImage, path }) => {
  const navigate = useNavigate();

  // For now all the menu buttons navigate to the homepage
  const handleNavigate = () => {
    navigate(`/`);
  };

  return (
    <Button
      style={{
        fontSize: ".8em",
        fontWeight: "600",
        textTransform: "none",
      }}
      startIcon={<Icon>{ButtonImage}</Icon>}
      onClick={handleNavigate}
    >
      {ButtonName}
    </Button>
  );
};

export default NavBarButton;
