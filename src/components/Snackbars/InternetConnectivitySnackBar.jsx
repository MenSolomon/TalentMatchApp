import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const CustomSnackbar = styled(Snackbar)(({ theme, variant }) => ({
  "& .MuiSnackbarContent-root": {
    backgroundColor:
      variant === "success"
        ? theme.palette.success.main
        : variant === "error"
        ? theme.palette.error.main
        : theme.palette.background.paper,
    color: theme.palette.primary.contrastText,
  },
}));

export default function InternetTransitionsSnackbar({
  open,
  onClose,
  message,
  autoHideDuration,
  Transition = Fade,
  variant = "normal", // default to "normal"
}) {
  return (
    <CustomSnackbar
      variant={variant}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      key={Transition.name}
      autoHideDuration={autoHideDuration}
    >
      {variant === "success" || variant === "error" ? (
        <Alert onClose={onClose} severity={variant}>
          {message}
        </Alert>
      ) : (
        <div>{message}</div>
      )}
    </CustomSnackbar>
  );
}
