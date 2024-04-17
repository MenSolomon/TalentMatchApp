import { Button, Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";

const BasicButton = ({
  style,
  innerText,
  type,
  disabled,
  onClick,
  className,
}) => {
  // const themeProviderObject = useSelector(selectThemeProviderObject);
  // const { buttonColor } = themeProviderObject;

  return (
    <Button
      disabled={disabled}
      className={className}
      onClick={onClick}
      type={type}
      sx={{
        ...style,
        background: "#5585FE",
        borderRadius: ".5vw",
        color: "white",
        textTransform: "none",
        fontWeight: "bold",

        // color: buttonColor,
      }}>
      {innerText}
    </Button>
  );
};

export default BasicButton;
