import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Close, HighlightOffOutlined, InfoOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicButtonWithEndIcon from "../../../../components/Buttons/BasicButtonWithEndIcon";
import { selectPlayerSelectedByClubOrScoutInPlayerManagement } from "../../../../statemanager/slices/PlayersInAgencySlice";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../Firebase/Firebase";
import {
  setSnackbarMessage,
  setSnackbarTriggerCounter,
} from "../../../../statemanager/slices/OtherComponentStatesSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35vw",
  height: "54vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "1vw",
  boxShadow: 24,
  p: 0.5,
};

export default function ConfirmClubExitModal() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const userLoginObject = useSelector(selectUserDetailsObject);
  const selectedPlayerInManagementObject = useSelector(
    selectPlayerSelectedByClubOrScoutInPlayerManagement
  );
  const {
    firstName,
    surName,
    id,
    contractEndDate,
    contractStartDate,
    clubName,
  } = selectedPlayerInManagementObject;

  const handleConfirmPlayerExit = async () => {
    try {
      const userObjectRef = doc(db, `users_db`, userLoginObject?.accountId);
      const playerObjectInjectionRef = doc(db, `players_database`, id);
      // Update player's club to free agent
      await updateDoc(playerObjectInjectionRef, {
        clubName: "Free agent",
        contractEndDate: "",
        contractStartDate: "",
        jerseyNumber: "",
        Club_History: arrayUnion({
          teamName: clubName,
          dateLeft: contractEndDate,
          dateJoined: contractStartDate,
        }),
      });

      // Remove player from players in possession Id...

      await updateDoc(userObjectRef, {
        playersInPossession: arrayRemove({ playerId: id }),
      });
      dispatch(
        setSnackbarMessage(
          `${firstName} ${surName} successfully exited from your club`
        )
      );
      dispatch(setSnackbarTriggerCounter());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <BasicButtonWithEndIcon
          innerText="Exit club "
          style={{ width: "9vw", height: "6vh", marginBottom: "1.5vh" }}
          endIcon={"logout"}
        />
      </div>
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
          <Box
            sx={{
              ...style,
              display: "flex",
              flexDirection: "column",
              color: "black",
            }}
          >
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
                flex: ".25",
                // background: "blue",
                paddingTop: "2vh",
                textAlign: "center",
                color: "black",
              }}
            >
              <h5>
                Are you sure you want to remove{" "}
                <span
                  style={{
                    fontWeight: "800",
                    fontStyle: "italic",
                    textDecoration: "underline",
                  }}
                >{`${firstName} ${surName}  `}</span>{" "}
                from your squad?
              </h5>
              {/* <h6>Change a few things up and try submitting again.</h6> */}
              <h6>
                <b>Discalimer:</b> If you accept, {`${firstName} ${surName}  `}{" "}
                will no longer be {userLoginObject?.club}'s player and as such
                will be a free agent on the platform with immediate effect.{" "}
              </h6>
            </div>

            <div
              style={{
                flex: ".2",
                // background: "blue",
                paddingTop: "2vh",
                justifyContent: "center",
                display: "flex",
                color: "black",
                gap: "1vw",
              }}
            >
              <Button
                onClick={() => {
                  handleConfirmPlayerExit();
                  handleClose();
                }}
                sx={{
                  background: "green",
                  borderRadius: "2vw",
                  color: "white",
                  width: "10vw",
                  marginTop: "8%",
                }}
                endIcon={<Close sx={{ color: "white" }} />}
              >
                I accept
              </Button>

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
                Cancel
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
