import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AlertSnackBar({
  severity,
  open,
  handleClose,
  icon,
  message,
}) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        icon={<icon fontSize="inherit" />}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
