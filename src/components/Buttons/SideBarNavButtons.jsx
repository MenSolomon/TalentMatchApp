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
          right: "14%",
          fontSize: ".7em",
          fontWeight: "700",
          textTransform: "none",
        }}
        onClick={() => {
          navigate(`${path}`);
        }}
        startIcon={startIcon}
        endIcon={endIcon}
        // disabled={disabled}
      >
        <span style={{ fontSize: "1.1em" }}>{label} </span>
      </Button>{" "}
    </Box>
  );
};
