import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSnackbarMessage,
  selectSnackbarTriggerCounter,
  setSnackbarMessage,
  setSnackbarTriggerCounter,
  setSnackbarTriggerCounterToZero,
} from "../../statemanager/slices/OtherComponentStatesSlice";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default function BasicSnackBar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const snackbarTriggered = useSelector(selectSnackbarTriggerCounter);
  const snackbarMessage = useSelector(selectSnackbarMessage);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };
  // useEffect(() => {
  //   if (warningAlertTrigger > 0) {
  //     setMessage(warningAlertMessage);
  //     setOpen(true);
  //   }
  // }, [warningAlertTrigger]);

  // const handleClose = () => {
  //   setOpen(false);
  //   dispatch(setWarningAlertModalMessage(""));
  // };

  useEffect(() => {
    if (snackbarTriggered > 0) {
      setTransition(() => TransitionRight);
      setOpen(true);
    }
  }, [snackbarTriggered]);

  const handleClose = () => {
    setOpen(false);
    dispatch(setSnackbarMessage(""));
    dispatch(setSnackbarTriggerCounterToZero());
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
      message={snackbarMessage}
      key={transition ? transition.name : ""}
    />
  );
}
