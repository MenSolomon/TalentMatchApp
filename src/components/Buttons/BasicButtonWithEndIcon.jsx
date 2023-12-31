import { Button, Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";

const BasicButtonWithEndIcon = ({
  style,
  innerText,
  type,
  endIcon,
  disabled,
  onClick,
  className,
}) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      // className={``}
      type={type}
      disabled={disabled}
      endIcon={<Icon>{endIcon}</Icon>}
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

export default BasicButtonWithEndIcon;
