import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { selectCircularLoadBackdropTriggerState } from "../../statemanager/slices/OtherComponentStatesSlice";
import { useDispatch, useSelector } from "react-redux";

export default function BasicBackdrop({ message }) {
  const backdropOpen = useSelector(selectCircularLoadBackdropTriggerState);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={{
          color: "#5585FE",
          zIndex: 10000,
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
        }}
        open={backdropOpen}
        // onClick={handleClose}
      >
        <CircularProgress size="4em" color="inherit" />
        <Typography>{message}</Typography>
      </Backdrop>
    </div>
  );
}
