import { Box, Button, Icon, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";

export const SideBarNavButtons = ({
  label,
  startIcon,
  endIcon,
  disabled,
  path,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { buttonColor } = themeProviderObject;

  return (
    <Button
      className="styleTextColor"
      sx={{
        position: "relative",
        right: "17%",
        fontSize: ".75em",
        fontWeight: "700",
        // textAlign: "left",
        // color:"red",
        // color: buttonColor,
        // textTransform: "none",
        // background: "red",
        textAlign: "left",
        // textAlign: "left",
        // width: "10vw",
      }}
      // onClick={() => {
      //   navigate(`${path}`);
      // }}
      startIcon={startIcon}
      endIcon={endIcon}
      // disabled={disabled}
    >
      {label}{" "}
    </Button>
  );
};
