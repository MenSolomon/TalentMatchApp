import { Box, Button, Icon, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";

export const MainAccordionNavButton = ({
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
    <Box>
      <Button
        className="NavBarBtns"
        sx={{
          position: "relative",
          right: "13%",
          fontSize: ".7em",
          fontWeight: "700",
          // color: buttonColor,
          textTransform: "none",
          // textAlign: "left",
          width: "10vw",
        }}
        // onClick={() => {
        //   navigate(`${path}`);
        // }}
        startIcon={startIcon}
        endIcon={endIcon}
        // disabled={disabled}
      >
        <span style={{ fontSize: "1.25em", textAlign: "left" }}>{label} </span>
      </Button>{" "}
    </Box>
  );
};
