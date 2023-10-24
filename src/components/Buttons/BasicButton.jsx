import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";

const BasicButton = ({ style, innerText }) => {
  // const themeProviderObject = useSelector(selectThemeProviderObject);
  // const { buttonColor } = themeProviderObject;

  return (
    <Button
      sx={{
        ...style,
        background: "#5585FE",
        borderRadius: ".5vw",
        color: "white",
        textTransform: "none",
        // color: buttonColor,
      }}
    >
      {innerText}
    </Button>
  );
};

export default BasicButton;
