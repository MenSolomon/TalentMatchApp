import * as React from "react";
import Button from "@mui/material/Button";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Chip } from "@mui/material";

function SingleSnackBarToBeWritten() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("Scout notified");
  };

  return (
    <React.Fragment>
      <div onClick={handleClick}>
        <Chip sx={{ cursor: "pointer" }} label={"Remind"} color="primary" />{" "}
      </div>
    </React.Fragment>
  );
}

export default function RemindScoutSnackbar() {
  return (
    <SnackbarProvider maxSnack={3}>
      <SingleSnackBarToBeWritten />
    </SnackbarProvider>
  );
}
