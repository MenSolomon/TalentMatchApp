import { Button, Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";

const BasicButton = ({ style, innerText, type, endIcon }) => {
  // const themeProviderObject = useSelector(selectThemeProviderObject);
  // const { buttonColor } = themeProviderObject;

  return (
    <Button
      type={type}
      sx={{
        ...style,
        background: "#5585FE",
        borderRadius: ".5vw",
        color: "white",
        textTransform: "none",
        fontWeight: "bold",

        // color: buttonColor,
      }}
    >
      {innerText}
    </Button>
  );
};

export default BasicButton;
