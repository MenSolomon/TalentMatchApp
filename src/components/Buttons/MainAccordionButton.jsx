import { Box, Button, Icon, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import { selectCurrentBrowserSize } from "../../statemanager/slices/OtherComponentStatesSlice";

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

  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);

  return (
    <Box>
      <Button
        className="NavBarBtns"
        sx={{
          position: "relative",
          right: browserWidth >= 1024 ? "13%" : "21%",
          fontSize: ".7em",
          textTransform: "none",
          fontWeight: "600",
          // color: buttonColor,
          // textAlign: "left",
          width: browserWidth >= 1024 ? "10vw" : "40vw",
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
