import { Box, Button, Icon, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SideBarNavButtons = ({
  label,
  startIcon,
  endIcon,
  disabled,
  path,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        sx={{
          position: "relative",
          right: "17%",
          fontSize: ".7em",
          fontWeight: "700",
          color: "#095F68",
          textTransform: "none",
          width: "10vw",
        }}
        onClick={() => {
          navigate(`${path}`);
        }}
        startIcon={startIcon}
        endIcon={endIcon}
        // disabled={disabled}
      >
        <span style={{ fontSize: "1.25em" }}>{label} </span>
      </Button>{" "}
    </Box>
  );
};
