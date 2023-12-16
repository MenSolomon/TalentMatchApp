import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Close, HighlightOffOutlined, InfoOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  selectWarningAlertModalCounter,
  selectWarningAlertModalMessage,
  setWarningAlertModalMessage,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  height: "50vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "1vw",
  boxShadow: 24,

  p: 0.5,
};

export default function WarningAlertModal() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const warningAlertTrigger = useSelector(selectWarningAlertModalCounter);
  const warningAlertMessage = useSelector(selectWarningAlertModalMessage);

  useEffect(() => {
    if (warningAlertTrigger > 0) {
      setMessage(warningAlertMessage);
      setOpen(true);
    }
  }, [warningAlertTrigger]);

  const handleClose = () => {
    setOpen(false);
    dispatch(setWarningAlertModalMessage(""));
  };

  return (
    <div>
      {/* <Button>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{ borderRadius: "1vw" }}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade s in={open}>
          <Box sx={{ ...style, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                flex: ".45",
                background: "red",
                // #DD717B
                borderTopLeftRadius: "1vw",
                borderTopRightRadius: "1vw",
                display: "grid",
                placeContent: "center",
              }}
            >
              <InfoOutlined
                sx={{ width: "20vw", height: "15vh", color: "white" }}
              />
            </div>

            <div
              style={{
                flex: ".55",
                // background: "blue",
                paddingTop: "2vh",
                textAlign: "center",
                color: "black",
              }}
            >
              <h4>Oh snap!</h4>
              {/* <h6>Change a few things up and try submitting again.</h6> */}
              <h6>{message}</h6>
              <Button
                onClick={handleClose}
                sx={{
                  background: "red",
                  borderRadius: "2vw",
                  color: "white",
                  width: "10vw",
                  marginTop: "8%",
                }}
                endIcon={<Close sx={{ color: "white" }} />}
              >
                Close
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
