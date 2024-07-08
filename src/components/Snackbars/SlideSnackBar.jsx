import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function TransitionsSnackbar({
  open,
  onClose,
  message,
  Transition = Fade,
}) {
  return (
    <Snackbar
      className="cardBackground primaryTextColor"
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      message={message}
      key={Transition.name}
      autoHideDuration={1200}
    />
  );
}
