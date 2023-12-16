import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";
import { selectCircularLoadBackdropTriggerState } from "../../statemanager/slices/OtherComponentStatesSlice";
import { useSelector } from "react-redux";

export default function BasicBackdrop() {
  const backdropOpen = useSelector(selectCircularLoadBackdropTriggerState);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: "#5585FE", zIndex: 10000 }}
        open={backdropOpen}
        // onClick={handleClose}
      >
        <CircularProgress size="4em" color="inherit" />
      </Backdrop>
    </div>
  );
}
