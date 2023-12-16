import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Close, HighlightOffOutlined, InfoOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  selectContactSupportModalCounter,
  selectContactSupportModalMessage,
  selectWarningAlertModalCounter,
  selectWarningAlertModalMessage,
  setWarningAlertModalMessage,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import { useDispatch, useSelector } from "react-redux";
import ContactSupportImage from "../../assets/images/CallSupportTech.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45vw",
  height: "64vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "1vw",
  boxShadow: 24,

  p: 0.5,
};

export default function ContactSupportModal() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const ContactSupportModalTrigger = useSelector(
    selectContactSupportModalCounter
  );
  const ContactSupportModalMessage = useSelector(
    selectContactSupportModalMessage
  );

  useEffect(() => {
    if (ContactSupportModalTrigger > 0) {
      setMessage(ContactSupportModalMessage);
      setOpen(true);
    }
  }, [ContactSupportModalTrigger]);

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
              className="background"
              style={{
                flex: ".45",
                // background: "red",
                // #DD717B
                borderTopLeftRadius: "1vw",
                borderTopRightRadius: "1vw",
                display: "grid",
                placeContent: "center",
              }}
            >
              <img src={ContactSupportImage} style={{ width: "150px" }} />
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
              {/* <Button
                onClick={handleClose}
                sx={{
                  background: "red",
                  borderRadius: "2vw",
                  color: "white",
                  width: "10vw",
                  marginTop: "3%",
                }}
                endIcon={<Close sx={{ color: "white" }} />}
              >
                Close
              </Button> */}
              <Button
                sx={{
                  width: "23vw",
                  background: "blue",
                  color: "white",
                  marginTop: "3%",

                  border: ".5vw",
                  // position: "absolute",
                  // bottom: 50,
                }}
              >
                Request Account Verification
              </Button>{" "}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
