import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSubscriptionActive } from "../../statemanager/slices/LoginUserDataSlice";
import { Close, PolicyOutlined } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90vh",
  width: "90vw",

  // bgcolor: "background.paper",
  background:"white",
  borderRadius: "1vw",
  p: 5,
};

export default function TermsAndConditionsModal({
  playerName,
  playerId,
  currentAccountOwner,
}) {
  const subscriptionStatus = useSelector(selectIsSubscriptionActive);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setLoader(false);
    setOpen(false);
  };
  const [loader, setLoader] = React.useState(false);
  const [DisableButton, setDisableButton] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const embedScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://app.termly.io/embed-policy.min.js";
        script.async = true;
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          reject(new Error("Failed to load the script"));
        };
        document.body.appendChild(script);
      });
    };

    if (open) {
      embedScript()
        .then(() => {
          setLoader(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [open]);

  return (
    <div>
      <Button
        sx={{
          textTransform: "none",
          fontWeight: "900",
          marginRight: "1vw",
          color: "white",
          background: "#5585FE",
        }}
        onClick={handleOpen}
        startIcon={<PolicyOutlined style={{ color: "white" }} />}
      >
        Terms and conditions
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="primaryTextColor " >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            Terms and conditions
            {/* {loader.toString()} */}
            <IconButton style={{ float: "right" }} onClick={handleClose}>
              {" "}
              <Close />{" "}
            </IconButton>
          </Typography>

          {loader ? (
            <div
              className="primaryTextColor"
              style={{ height: "96%", overflowY: "scroll" }}
              name="termly-embed"
              data-id="f0d6e2b6-5b19-4947-9333-2190a5c7940c"
              data-type="iframe"
            ></div>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {" "}
              <CircularProgress />{" "}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
