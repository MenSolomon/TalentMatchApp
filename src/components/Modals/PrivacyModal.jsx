import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSubscriptionActive } from "../../statemanager/slices/LoginUserDataSlice";
import { Close, PolicyOutlined, Security } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90vh",
  width: "90vw",
  background: "white",

  borderRadius: "1vw",
  p: 5,
};

export default function PrivacyModal({
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
        startIcon={<Security style={{ color: "white" }} />}
      >
        Privacy
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="primaryTextColor  sm:width-[100vw] lg:width-[60vw]"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            Privacy
            {/* {loader.toString()} */}
            <IconButton style={{ float: "right" }} onClick={handleClose}>
              {" "}
              <Close />{" "}
            </IconButton>
          </Typography>

          {loader ? (
            <div
              style={{ height: "96%", overflowY: "scroll" }}
              name="termly-embed"
              data-id="e47ceaaa-b586-4ee2-8c3d-d42d0332ec6d"
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
